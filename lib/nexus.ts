import { google } from 'googleapis'

const NEXUS_SPREADSHEET_ID = process.env.NEXUS_SHEET_ID || '1x0iiBTRZUck7MhIv5IM42Lck01MsRqwX'
const SITE_ID = 'dancing-with-lions'

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

export interface LegalPage {
  title: string
  content: string
  lastUpdated: string
}

export async function getLegalPage(pageType: 'privacy' | 'terms' | 'ip'): Promise<LegalPage | null> {
  try {
    const auth = await getAuthClient()
    const sheets = google.sheets({ version: 'v4', auth })

    // Try to fetch from Nexus Legal tab
    const response = await sheets.spreadsheets.values.get({
      spreadsheetId: NEXUS_SPREADSHEET_ID,
      range: 'Legal!A:D',
    })

    const rows = response.data.values
    if (!rows || rows.length < 2) return null

    const headers = rows[0]
    const pageRow = rows.slice(1).find((row) => row[0]?.toLowerCase() === pageType)
    
    if (!pageRow) return null

    return {
      title: pageRow[1] || '',
      content: pageRow[2]?.replace(/<br>/g, '\n') || '',
      lastUpdated: pageRow[3] || '',
    }
  } catch (error) {
    console.error('Error fetching legal page from Nexus:', error)
    return null
  }
}

export async function getSiteConfig() {
  try {
    const auth = await getAuthClient()
    const sheets = google.sheets({ version: 'v4', auth })

    const response = await sheets.spreadsheets.values.get({
      spreadsheetId: NEXUS_SPREADSHEET_ID,
      range: 'Sites!A:Z',
    })

    const rows = response.data.values
    if (!rows || rows.length < 2) return null

    const headers = rows[0]
    const siteRow = rows.slice(1).find((row) => row[0] === SITE_ID)
    
    if (!siteRow) return null

    const config: any = {}
    headers.forEach((header: string, index: number) => {
      config[header] = siteRow[index] || ''
    })

    return config
  } catch (error) {
    console.error('Error fetching site config from Nexus:', error)
    return null
  }
}
