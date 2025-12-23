import { NextResponse } from 'next/server'
import { getEssays } from '@/lib/sheets'

export const dynamic = 'force-dynamic'
export const revalidate = 0

export async function GET() {
  try {
    const essays = await getEssays()
    return NextResponse.json(essays)
  } catch (error) {
    console.error('Error in essays API:', error)
    return NextResponse.json({ error: 'Failed to fetch essays' }, { status: 500 })
  }
}
