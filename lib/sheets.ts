import { google } from 'googleapis'

const SPREADSHEET_ID = process.env.DWL_SPREADSHEET_ID
const SHEET_NAME = 'Essays'

async function getAuthClient() {
  const credentials = {
    client_email: process.env.GOOGLE_CLIENT_EMAIL,
    private_key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
  }

  const auth = new google.auth.GoogleAuth({
    credentials,
    scopes: ['https://www.googleapis.com/auth/spreadsheets.readonly'],
  })

  return auth
}

function rowToEssay(row: any[], headers: string[]): Essay | null {
  if (!row || row.length === 0) return null

  const essay: any = {}
  headers.forEach((header, index) => {
    essay[header] = row[index] || ''
  })

  // Only return published essays
  const published = String(essay.published || '').toLowerCase().trim()
  if (published !== 'true' && published !== 'yes' && published !== '1') {
    return null
  }

  return essay as Essay
}

export interface Essay {
  slug: string
  title: string
  subtitle: string
  category: string
  heroImage: string
  heroCaption: string
  excerpt: string
  body: string
  readTime: string
  year: string
  textBy: string
  imagesBy: string
  sources: string
  organizations: string
  published: string
  featured: string
  order: string
}

export async function getEssays(): Promise<Essay[]> {
  try {
    const auth = await getAuthClient()
    const sheets = google.sheets({ version: 'v4', auth })

    const response = await sheets.spreadsheets.values.get({
      spreadsheetId: SPREADSHEET_ID,
      range: `${SHEET_NAME}!A:Q`,
    })

    const rows = response.data.values
    if (!rows || rows.length < 2) return []

    const headers = rows[0].map((h: string) => h.trim())
    const essays = rows
      .slice(1)
      .map((row) => rowToEssay(row, headers))
      .filter((essay): essay is Essay => essay !== null)
      .sort((a, b) => {
        // Featured first, then by order
        if (a.featured === 'true' && b.featured !== 'true') return -1
        if (b.featured === 'true' && a.featured !== 'true') return 1
        return (parseInt(a.order) || 999) - (parseInt(b.order) || 999)
      })

    return essays
  } catch (error) {
    console.error('Error fetching essays:', error)
    return []
  }
}

export async function getEssayBySlug(slug: string): Promise<Essay | null> {
  const essays = await getEssays()
  return essays.find((essay) => essay.slug === slug) || null
}

export async function getFeaturedEssays(): Promise<Essay[]> {
  const essays = await getEssays()
  return essays.slice(0, 6) // Return first 6 for homepage
}
