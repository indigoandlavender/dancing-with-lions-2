import { google } from 'googleapis';

const NEXUS_SHEET_ID = process.env.NEXUS_SHEET_ID;

async function getAuthClient() {
  const auth = new google.auth.GoogleAuth({
    credentials: {
      client_email: process.env.GOOGLE_CLIENT_EMAIL,
      private_key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
    },
    scopes: ['https://www.googleapis.com/auth/spreadsheets.readonly'],
  });
  return auth;
}

export interface LegalPage {
  slug: string;
  title: string;
  content: string;
}

export interface FooterConfig {
  copyrightText: string;
  footerLinks: { label: string; url: string }[];
}

export async function getLegalPages(): Promise<LegalPage[]> {
  try {
    const auth = await getAuthClient();
    const sheets = google.sheets({ version: 'v4', auth });
    
    const response = await sheets.spreadsheets.values.get({
      spreadsheetId: NEXUS_SHEET_ID,
      range: 'Legal!A:C',
    });

    const rows = response.data.values;
    if (!rows || rows.length < 2) return [];

    return rows.slice(1).map((row) => ({
      slug: row[0] || '',
      title: row[1] || '',
      content: (row[2] || '').replace(/<br>/g, '\n'),
    }));
  } catch (error) {
    console.error('Error fetching legal pages:', error);
    return [];
  }
}

export async function getLegalPageBySlug(slug: string): Promise<LegalPage | null> {
  const pages = await getLegalPages();
  return pages.find((page) => page.slug === slug) || null;
}

export async function getFooterConfig(): Promise<FooterConfig> {
  try {
    const auth = await getAuthClient();
    const sheets = google.sheets({ version: 'v4', auth });
    
    const response = await sheets.spreadsheets.values.get({
      spreadsheetId: NEXUS_SHEET_ID,
      range: 'Footer!A:B',
    });

    const rows = response.data.values;
    if (!rows || rows.length < 2) {
      return {
        copyrightText: `© ${new Date().getFullYear()} Dancing with Lions`,
        footerLinks: [],
      };
    }

    const config: Record<string, string> = {};
    rows.forEach((row) => {
      if (row[0] && row[1]) {
        config[row[0]] = row[1];
      }
    });

    const linksString = config['footer_links'] || '';
    const footerLinks = linksString
      .split(',')
      .filter(Boolean)
      .map((link) => {
        const [label, url] = link.split('|');
        return { label: label?.trim() || '', url: url?.trim() || '' };
      })
      .filter((link) => link.label && link.url);

    return {
      copyrightText: config['copyright_text'] || `© ${new Date().getFullYear()} Dancing with Lions`,
      footerLinks,
    };
  } catch (error) {
    console.error('Error fetching footer config:', error);
    return {
      copyrightText: `© ${new Date().getFullYear()} Dancing with Lions`,
      footerLinks: [
        { label: 'Privacy', url: '/privacy' },
        { label: 'Terms', url: '/terms' },
      ],
    };
  }
}
