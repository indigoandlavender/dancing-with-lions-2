import { Metadata } from 'next'
import { getStories } from '@/lib/sheets'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import Link from 'next/link'
import Image from 'next/image'

export const dynamic = 'force-dynamic'
export const revalidate = 0

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://dancingwithlions.com'

export const metadata: Metadata = {
  title: 'Stories',
  description: 'Short-form cultural intelligence — the facts, connections, and hidden history behind places.',
  openGraph: {
    title: 'Stories | Dancing with Lions',
    description: 'Short-form cultural intelligence — the facts, connections, and hidden history behind places.',
    url: `${siteUrl}/stories`,
  },
}

export default async function StoriesPage() {
  const stories = await getStories()
  
  const sortedStories = stories.sort((a, b) => {
    const orderA = parseInt(a.order) || 999
    const orderB = parseInt(b.order) || 999
    return orderA - orderB
  })

  // Group stories by category
  const categories = [...new Set(sortedStories.map(s => s.category).filter(Boolean))]
  
  // Breadcrumb Schema
  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: siteUrl,
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Stories',
        item: `${siteUrl}/stories`,
      },
    ],
  }

  return (
    <main className="min-h-screen bg-white">
      <Header />
      
      {/* Schema Markup */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      {/* Hero */}
      <section className="border-b-2 border-black pt-24">
        <div className="max-w-[1400px] mx-auto px-6 py-16 md:py-24">
          <h1 className="font-black text-[clamp(3rem,12vw,10rem)] leading-[0.85] tracking-[-0.04em] uppercase">
            Stories
          </h1>
          <p className="mt-8 text-xl md:text-2xl text-gray-600 max-w-2xl leading-relaxed">
            Short-form cultural intelligence. The facts, connections, and hidden history 
            that make places make sense.
          </p>
        </div>
      </section>

      {/* Category Filter */}
      {categories.length > 0 && (
        <section className="border-b-2 border-black">
          <div className="max-w-[1400px] mx-auto px-6 py-6">
            <div className="flex flex-wrap gap-4">
              <span className="text-xs font-bold uppercase tracking-[0.15em] text-gray-500 py-2">
                Categories:
              </span>
              {categories.map((category) => (
                <button 
                  key={category}
                  className="text-xs font-bold uppercase tracking-[0.15em] py-2 px-4 border-2 border-black hover:bg-black hover:text-white transition-colors"
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Stories Grid */}
      <section className="border-b-2 border-black">
        <div className="max-w-[1400px] mx-auto px-6 py-16 md:py-24">
          {sortedStories.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {sortedStories.map((story) => (
                <Link 
                  key={story.slug} 
                  href={`/story/${story.slug}`}
                  className="group"
                >
                  <div className="aspect-[4/5] relative overflow-hidden bg-gray-100 mb-4">
                    {story.heroImage ? (
                      <Image
                        src={story.heroImage}
                        alt={story.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    ) : (
                      <div className="absolute inset-0 bg-gradient-to-br from-gray-200 to-gray-300 group-hover:scale-105 transition-transform duration-500" />
                    )}
                  </div>
                  
                  <p className="text-xs uppercase tracking-[0.15em] text-gray-500 mb-2">
                    {story.category}
                  </p>
                  
                  <h2 className="font-bold text-lg leading-tight group-hover:text-accent transition-colors">
                    {story.title}
                  </h2>
                </Link>
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <p className="text-gray-600 text-lg">
                Stories coming soon.
              </p>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </main>
  )
}
