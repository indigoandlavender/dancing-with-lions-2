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
