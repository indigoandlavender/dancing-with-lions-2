import { notFound } from 'next/navigation'
import { getEssayBySlug, getEssays, getEssayImages } from '@/lib/sheets'
import EssaySlideshow from '@/components/EssaySlideshow'

export const dynamic = 'force-dynamic'
export const revalidate = 0

export async function generateStaticParams() {
  const essays = await getEssays()
  return essays.map((essay) => ({
    slug: essay.slug,
  }))
}

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const essay = await getEssayBySlug(params.slug)
  if (!essay) return { title: 'Essay Not Found' }
  
  return {
    title: `${essay.title} — Dancing with Lions`,
    description: essay.subtitle || essay.title,
  }
}

export default async function EssayPage({ 
  params 
}: { 
  params: { slug: string } 
}) {
  const essayData = await getEssayBySlug(params.slug)
  
  if (!essayData) {
    notFound()
  }

  const images = await getEssayImages(params.slug)

  // Map to expected shape
  const essay = {
    title: essayData.title || '',
    subtitle: essayData.subtitle,
    heroImage: essayData.heroImage,
    heroCaption: essayData.heroCaption,
    body: essayData.body || '',
    textBy: essayData.textBy,
    imagesBy: essayData.imagesBy,
    year: essayData.year,
    tags: essayData.Tags, // Capital T in sheet
    sources: essayData.sources,
    organizations: essayData.organizations,
  }

  return <EssaySlideshow essay={essay} images={images} />
}
