import Link from 'next/link'
import Image from 'next/image'
import { getStories } from '@/lib/sheets'

export const dynamic = 'force-dynamic'
export const revalidate = 0

export default async function Home() {
  const stories = await getStories()
  
  const sortedStories = stories.sort((a, b) => (Number(a.order) || 999) - (Number(b.order) || 999))
  
  return (
    <main className="min-h-screen bg-white">
      {/* Minimal Header - Just the name */}
      <header className="border-b-2 border-black">
        <div className="max-w-[1400px] mx-auto px-6 py-6">
          <h1 className="font-black text-2xl md:text-3xl tracking-tight uppercase">
            Dancing with Lions
          </h1>
        </div>
      </header>

      {/* Stories Grid */}
      <section>
        <div className="max-w-[1400px] mx-auto px-6 py-12 md:py-16">
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
                      <div className="absolute inset-0 bg-gradient-to-br from-gray-200 to-gray-300" />
                    )}
                  </div>
                  
                  {story.category && (
                    <p className="text-xs uppercase tracking-[0.15em] text-gray-500 mb-2">
                      {story.category}
                    </p>
                  )}
                  
                  <h2 className="font-bold text-lg leading-tight group-hover:text-accent transition-colors">
                    {story.title}
                  </h2>
                </Link>
              ))}
            </div>
          ) : (
            <div className="text-center py-24">
              <p className="text-gray-500">
                Collecting.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Minimal Footer */}
      <footer className="border-t-2 border-black">
        <div className="max-w-[1400px] mx-auto px-6 py-6 flex justify-between items-center">
          <p className="text-sm text-gray-500">
            © {new Date().getFullYear()}
          </p>
          <p className="text-sm text-gray-500">
            Marrakech
          </p>
        </div>
      </footer>
    </main>
  )
}
