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
  const essay = await getEssayBySlug(params.slug)
  
  if (!essay) {
    notFound()
  }

  const images = await getEssayImages(params.slug)

  return <EssaySlideshow essay={essay} images={images} />
}
