import { google } from 'googleapis';

const SPREADSHEET_ID = process.env.DWL_SPREADSHEET_ID;

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

export async function getEssays() {
  try {
    const auth = await getAuthClient();
    const sheets = google.sheets({ version: 'v4', auth });
    
    const response = await sheets.spreadsheets.values.get({
      spreadsheetId: SPREADSHEET_ID,
      range: 'Essays!A:Q',
    });

    const rows = response.data.values;
    if (!rows || rows.length < 2) return [];

    const headers = rows[0];
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
