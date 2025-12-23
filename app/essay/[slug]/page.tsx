import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import EssayBody from '@/components/EssayBody'
import { getEssayBySlug, getEssays, getEssayImages } from '@/lib/sheets'

export const dynamic = 'force-dynamic'
export const revalidate = 0

export async function generateStaticParams() {
  const essays = await getEssays()
  return essays.map((essay) => ({
    slug: essay.slug,
  }))
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

  // Fetch images for this essay
  const images = await getEssayImages(params.slug)

  const sources = essay.sources
    ? essay.sources.split(';;').filter(Boolean)
    : []

  const organizations = essay.organizations
    ? essay.organizations.split(';;').filter(Boolean).map((org: string) => {
        const [name, description, url] = org.split('|')
        return { name, description, url }
      })
    : []

  // Parse tags (comma-separated)
  const tags = essay.tags
    ? essay.tags.split(',').map((tag: string) => tag.trim()).filter(Boolean)
    : []

  return (
    <main className="min-h-screen bg-white">
      <Header transparent />
      
      <div className="w-full h-screen relative">
        {essay.heroImage ? (
          <Image
            src={essay.heroImage}
            alt={essay.title}
            fill
            className="object-cover"
            priority
          />
        ) : (
          <div className="absolute inset-0 bg-gradient-to-br from-gray-300 to-gray-400" />
        )}
        {essay.heroCaption && (
          <p className="absolute bottom-4 left-6 text-sm text-white/80 uppercase tracking-wider">
            {essay.heroCaption}
          </p>
        )}
      </div>

      <article className="max-w-content mx-auto px-6 py-16">
        <h1 className="text-[clamp(3rem,10vw,6rem)] font-black leading-[0.9] tracking-tight mb-6">
          {essay.title}
        </h1>

        {essay.subtitle && (
          <p className="text-xl text-gray-500 mb-12">
            {essay.subtitle}
          </p>
        )}

        <hr className="border-t-2 border-black mb-12" />

        <EssayBody content={essay.body} images={images} />

        {sources.length > 0 && (
          <>
            <hr className="border-t border-gray-200 my-12" />
            <section>
              <h2 className="font-display text-lg font-bold uppercase tracking-wider mb-6">
                Sources
              </h2>
              <div className="text-sm text-gray-600 space-y-2">
                {sources.map((source: string, index: number) => (
                  <p key={index}>{source}</p>
                ))}
              </div>
            </section>
          </>
        )}

        {organizations.length > 0 && (
          <>
            <hr className="border-t border-gray-200 my-12" />
            <section>
              <h2 className="font-display text-lg font-bold uppercase tracking-wider mb-6">
                The Work Continues
              </h2>
              <div className="space-y-6">
                {organizations.map((org, index) => (
                  <div key={index} className="text-sm">
                    <p className="font-semibold text-black">{org.name}</p>
                    {org.description && (
                      <p className="text-gray-600">{org.description}</p>
                    )}
                    {org.url && (
                      <a 
                        href={`https://${org.url}`} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-accent hover:underline"
                      >
                        {org.url}
                      </a>
                    )}
                  </div>
                ))}
              </div>
            </section>
          </>
        )}

        {tags.length > 0 && (
          <>
            <hr className="border-t border-gray-200 my-12" />
            <section>
              <div className="flex flex-wrap gap-3">
                {tags.map((tag: string, index: number) => (
                  <Link
                    key={index}
                    href={`/essays?tag=${encodeURIComponent(tag)}`}
                    className="text-xs uppercase tracking-[0.15em] text-gray-500 hover:text-black transition-colors"
                  >
                    {tag}
                  </Link>
                ))}
              </div>
            </section>
          </>
        )}

        <hr className="border-t border-gray-200 my-12" />
        <footer className="flex flex-wrap gap-x-8 gap-y-2 text-sm text-gray-500">
          {essay.textBy && <span>Text — {essay.textBy}</span>}
          {essay.imagesBy && <span>Images — {essay.imagesBy}</span>}
          {essay.year && <span>{essay.year}</span>}
        </footer>
      </article>

      <Footer />
    </main>
  )
}
