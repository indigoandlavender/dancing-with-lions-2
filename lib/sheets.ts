import { google } from 'googleapis';

const SPREADSHEET_ID = process.env.DWL_SPREADSHEET_ID;

async function getAuthClient() {
  // Support both base64 encoded service account (like Slow Morocco) and individual credentials
  if (process.env.GOOGLE_SERVICE_ACCOUNT_BASE64) {
    const serviceAccount = JSON.parse(
      Buffer.from(process.env.GOOGLE_SERVICE_ACCOUNT_BASE64, 'base64').toString()
    );
    const auth = new google.auth.GoogleAuth({
      credentials: serviceAccount,
      scopes: ['https://www.googleapis.com/auth/spreadsheets.readonly'],
    });
    return auth;
  }
  
  // Fallback to individual credentials
  const auth = new google.auth.GoogleAuth({
    credentials: {
      client_email: process.env.GOOGLE_CLIENT_EMAIL,
      private_key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
    },
    scopes: ['https://www.googleapis.com/auth/spreadsheets.readonly'],
  });
  return auth;
}

export interface EssayImage {
  essay_slug: string;
  image_order: number;
  image_url: string;
  caption: string;
  type: 'contained' | 'full-bleed';
}

export async function getEssayImages(slug: string): Promise<EssayImage[]> {
  try {
    const auth = await getAuthClient();
    const sheets = google.sheets({ version: 'v4', auth });
    
    const response = await sheets.spreadsheets.values.get({
      spreadsheetId: SPREADSHEET_ID,
      range: 'Images!A:E',
    });

    const rows = response.data.values;
    if (!rows || rows.length < 2) return [];

    const headers = rows[0];
    const images = rows.slice(1)
      .map((row) => ({
        essay_slug: row[0] || '',
        image_order: parseInt(row[1]) || 0,
        image_url: row[2] || '',
        caption: row[3] || '',
        type: (row[4] || 'contained') as 'contained' | 'full-bleed',
      }))
      .filter((img) => img.essay_slug === slug && img.image_url)
      .sort((a, b) => a.image_order - b.image_order);

    return images;
  } catch (error) {
    console.error('Error fetching essay images:', error);
    return [];
  }
}

export async function getEssays() {
  try {
    const auth = await getAuthClient();
    const sheets = google.sheets({ version: 'v4', auth });
    
    const response = await sheets.spreadsheets.values.get({
      spreadsheetId: SPREADSHEET_ID,
      range: 'Essays!A:Q',
    });

    const rows = response.data.values;
    if (!rows || rows.length < 2) {
      console.log('No data found in Essays sheet');
      return [];
    }

    console.log('Found', rows.length - 1, 'essays in sheet');

    const headers = rows[0];
    console.log('Headers:', headers);
    
    const essays = rows.slice(1).map((row) => {
      const essay: Record<string, string> = {};
      headers.forEach((header: string, index: number) => {
        let value = row[index] || '';
        if (typeof value === 'string') {
          value = value.replace(/<br>/g, '\n');
        }
        essay[header] = value;
      });
      return essay;
    });

    console.log('First essay slug:', essays[0]?.slug);
    console.log('First essay published value:', essays[0]?.published, typeof essays[0]?.published);

    // If no essays, return empty array
    if (essays.length === 0) return [];
    
    // Filter for published essays - handle various formats
    return essays.filter((essay) => {
      const pub = String(essay.published || '').toLowerCase().trim();
      return pub === 'true' || pub === 'yes' || pub === '1';
    });
  } catch (error) {
    console.error('Error fetching essays:', error);
    return [];
  }
}

export async function getEssayBySlug(slug: string) {
  const essays = await getEssays();
  return essays.find((essay) => essay.slug === slug) || null;
}

export async function getFeaturedEssays() {
  const essays = await getEssays();
  return essays
    .filter((essay) => {
      const featured = String(essay.featured || '').toLowerCase().trim();
      return featured === 'true' || featured === 'yes' || featured === '1';
    })
    .sort((a, b) => (Number(a.order) || 999) - (Number(b.order) || 999));
}

// ==================== STORIES (Articles) ====================

export interface Story {
  slug: string;
  title: string;
  subtitle: string;
  category: string;
  heroImage: string;
  heroCaption: string;
  excerpt: string;
  body: string;
  readTime: string;
  year: string;
  textBy: string;
  imagesBy: string;
  sources: string;
  tags?: string;
  published: string;
  featured: string;
  order: string;
}

export async function getStories(): Promise<Story[]> {
  try {
    const auth = await getAuthClient();
    const sheets = google.sheets({ version: 'v4', auth });
    
    const response = await sheets.spreadsheets.values.get({
      spreadsheetId: SPREADSHEET_ID,
      range: 'Stories!A:Q',
    });

    const rows = response.data.values;
    console.log('Stories rows found:', rows?.length || 0);
    if (!rows || rows.length < 2) {
      console.log('No stories data found');
      return [];
    }

    const headers = rows[0];
    console.log('Stories headers:', headers);
    
    const stories = rows.slice(1).map((row) => {
      const story: Record<string, string> = {};
      headers.forEach((header: string, index: number) => {
        let value = row[index] || '';
        if (typeof value === 'string') {
          value = value.replace(/<br>/g, '\n');
        }
        story[header] = value;
      });
      return story as unknown as Story;
    });

    console.log('Stories before filter:', stories.length);
    console.log('First story published value:', stories[0]?.published);

    const filtered = stories.filter((story) => {
      const pub = String(story.published || '').toLowerCase().trim();
      return pub === 'true' || pub === 'yes' || pub === '1';
    });
    
    console.log('Stories after filter:', filtered.length);
    return filtered;
  } catch (error) {
    console.error('Error fetching stories:', error);
    return [];
  }
}

export async function getStoryBySlug(slug: string): Promise<Story | null> {
  const stories = await getStories();
  return stories.find((story) => story.slug === slug) || null;
}

export async function getFeaturedStories(): Promise<Story[]> {
  const stories = await getStories();
  return stories
    .filter((story) => {
      const featured = String(story.featured || '').toLowerCase().trim();
      return featured === 'true' || featured === 'yes' || featured === '1';
    })
    .sort((a, b) => (Number(a.order) || 999) - (Number(b.order) || 999));
}

// ==================== STORY IMAGES ====================

export interface StoryImage {
  story_slug: string;
  image_order: number;
  image_url: string;
  caption: string;
}

export async function getStoryImages(slug: string): Promise<StoryImage[]> {
  try {
    const auth = await getAuthClient();
    const sheets = google.sheets({ version: 'v4', auth });
    
    const response = await sheets.spreadsheets.values.get({
      spreadsheetId: SPREADSHEET_ID,
      range: 'Story_Images!A:D',
    });

    const rows = response.data.values;
    if (!rows || rows.length < 2) return [];

    const images = rows.slice(1)
      .map((row) => ({
        story_slug: row[0] || '',
        image_order: parseInt(row[1]) || 0,
        image_url: row[2] || '',
        caption: row[3] || '',
      }))
      .filter((img) => img.story_slug === slug && img.image_url)
      .sort((a, b) => a.image_order - b.image_order);

    return images;
  } catch (error) {
    console.error('Error fetching story images:', error);
    return [];
  }
}

// ==================== OPINION ====================

export interface Opinion {
  slug: string;
  title: string;
  subtitle: string;
  excerpt: string;
  body: string;
  readTime: string;
  year: string;
  textBy: string;
  sources: string;
  tags?: string;
  published: string;
  featured: string;
  order: string;
}

export async function getOpinions(): Promise<Opinion[]> {
  try {
    const auth = await getAuthClient();
    const sheets = google.sheets({ version: 'v4', auth });
    
    const response = await sheets.spreadsheets.values.get({
      spreadsheetId: SPREADSHEET_ID,
      range: 'Opinion!A:M',
    });

    const rows = response.data.values;
    console.log('Opinion rows found:', rows?.length || 0);
    if (!rows || rows.length < 2) {
      console.log('No opinion data found');
      return [];
    }

    const headers = rows[0];
    console.log('Opinion headers:', headers);
    
    const opinions = rows.slice(1).map((row) => {
      const opinion: Record<string, string> = {};
      headers.forEach((header: string, index: number) => {
        let value = row[index] || '';
        if (typeof value === 'string') {
          value = value.replace(/<br>/g, '\n');
        }
        opinion[header] = value;
      });
      return opinion as unknown as Opinion;
    });

    console.log('Opinions before filter:', opinions.length);

    const filtered = opinions.filter((opinion) => {
      const pub = String(opinion.published || '').toLowerCase().trim();
      return pub === 'true' || pub === 'yes' || pub === '1';
    });
    
    console.log('Opinions after filter:', filtered.length);
    return filtered;
  } catch (error) {
    console.error('Error fetching opinions:', error);
    return [];
  }
}

export async function getOpinionBySlug(slug: string): Promise<Opinion | null> {
  const opinions = await getOpinions();
  return opinions.find((opinion) => opinion.slug === slug) || null;
}

// ==================== RESEARCH ====================

export interface Research {
  slug: string;
  title: string;
  subtitle: string;
  category: string;
  excerpt: string;
  body: string;
  data_sources: string;
  key_findings: string;
  methodology: string;
  published: string;
  featured: string;
  order: string;
}

export async function getResearch(): Promise<Research[]> {
  try {
    const auth = await getAuthClient();
    const sheets = google.sheets({ version: 'v4', auth });
    
    const response = await sheets.spreadsheets.values.get({
      spreadsheetId: SPREADSHEET_ID,
      range: 'Research!A:L',
    });

    const rows = response.data.values;
    if (!rows || rows.length < 2) {
      console.log('No research data found');
      return [];
    }

    const headers = rows[0];
    
    const research = rows.slice(1).map((row) => {
      const item: Record<string, string> = {};
      headers.forEach((header: string, index: number) => {
        let value = row[index] || '';
        if (typeof value === 'string') {
          value = value.replace(/<br>/g, '\n');
        }
        item[header] = value;
      });
      return item as unknown as Research;
    });

    const filtered = research.filter((item) => {
      const pub = String(item.published || '').toLowerCase().trim();
      return pub === 'true' || pub === 'yes' || pub === '1';
    });
    
    return filtered;
  } catch (error) {
    console.error('Error fetching research:', error);
    return [];
  }
}

export async function getResearchBySlug(slug: string): Promise<Research | null> {
  const research = await getResearch();
  return research.find((item) => item.slug === slug) || null;
}

// ==================== INDEX ====================

export interface Index {
  index_id: string;
  name: string;
  description: string;
  current_value: string;
  previous_value: string;
  change: string;
  data_sources: string;
  methodology: string;
  last_updated: string;
  published: string;
}

export async function getIndices(): Promise<Index[]> {
  try {
    const auth = await getAuthClient();
    const sheets = google.sheets({ version: 'v4', auth });
    
    const response = await sheets.spreadsheets.values.get({
      spreadsheetId: SPREADSHEET_ID,
      range: 'Index!A:J',
    });

    const rows = response.data.values;
    if (!rows || rows.length < 2) {
      console.log('No index data found');
      return [];
    }

    const headers = rows[0];
    
    const indices = rows.slice(1).map((row) => {
      const item: Record<string, string> = {};
      headers.forEach((header: string, index: number) => {
        item[header] = row[index] || '';
      });
      return item as unknown as Index;
    });

    // Return all indices (even unpublished ones for now, to show "in progress")
    return indices;
  } catch (error) {
    console.error('Error fetching indices:', error);
    return [];
  }
}
