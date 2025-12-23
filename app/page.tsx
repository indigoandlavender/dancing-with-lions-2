import Link from 'next/link'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { getFeaturedEssays as getEssaysFromSheets, Essay } from '@/lib/sheets'

export const dynamic = 'force-dynamic'
export const revalidate = 0

// Fallback data if sheets not connected
const fallbackEssays = [
  {
    slug: 'the-barbary-lion',
    title: 'The Barbary Lion',
    subtitle: 'Forty survived in the king\'s garden',
    category: 'RETURNS',
    heroImage: '',
    heroCaption: '',
    excerpt: 'Roman emperors shipped thousands of them from the Atlas to die in the Colosseum. The last wild one was photographed from an airplane in 1925. A pilot looked down and saw the end of an era.',
    body: '',
    readTime: '8 min',
    year: '2025',
    textBy: 'J. Laurent',
    imagesBy: 'Midjourney',
    sources: '',
    organizations: '',
    published: 'true',
    featured: 'true',
    order: '1',
  },
  {
    slug: 'the-sahara-remembers',
    title: 'How the Sahara Remembers',
    subtitle: 'The navigation system that predates GPS by two thousand years',
    category: 'SYSTEMS',
    heroImage: '',
    heroCaption: '',
    excerpt: 'Satellite navigation fails in sandstorms. The stars don\'t.',
    body: '',
    readTime: '7 min',
    year: '2025',
    textBy: 'J. Laurent',
    imagesBy: 'Midjourney',
    sources: '',
    organizations: '',
    published: 'true',
    featured: 'false',
    order: '2',
  },
  {
    slug: 'the-gnawa',
    title: 'The Gnawa',
    subtitle: 'The gods that crossed the ocean twice',
    category: 'ESSAYS',
    heroImage: '',
    heroCaption: '',
    excerpt: 'Enslaved West Africans kept their gods alive by hiding them inside Sufism.',
    body: '',
    readTime: '9 min',
    year: '2025',
    textBy: 'J. Laurent',
    imagesBy: 'Midjourney',
    sources: '',
    organizations: '',
    published: 'true',
    featured: 'false',
    order: '3',
  },
  {
    slug: 'le-morne',
    title: 'Le Morne',
    subtitle: 'They chose the cliff over the whip',
    category: 'ESSAYS',
    heroImage: '',
    heroCaption: '',
    excerpt: 'The maroons thought the soldiers had come to capture them. They jumped.',
    body: '',
    readTime: '6 min',
    year: '2025',
    textBy: 'J. Laurent',
    imagesBy: 'Midjourney',
    sources: '',
    organizations: '',
    published: 'true',
    featured: 'false',
    order: '4',
  },
] as Essay[]

async function getFeaturedEssays(): Promise<Essay[]> {
  try {
    const essays = await getEssaysFromSheets()
    return essays.length > 0 ? essays : fallbackEssays
  } catch {
    return fallbackEssays
  }
}

export default async function Home() {
  const essays = await getFeaturedEssays()
  const [featured, ...rest] = essays
  
  return (
    <main className="min-h-screen bg-white">
      <Header />
      
      {/* Masthead */}
      <section className="border-b-2 border-black">
        <div className="max-w-[1400px] mx-auto px-6 py-16 md:py-24">
          <h1 className="font-display text-[clamp(3.5rem,12vw,10rem)] font-bold leading-[0.85] tracking-[-0.03em]">
            <span className="block">DANCING</span>
            <span className="block">WITH <span className="text-accent">LIONS</span></span>
          </h1>
          <p className="mt-8 font-display text-[clamp(1.25rem,3vw,2rem)] italic text-gray-600 max-w-2xl">
            The stories underneath the map.
          </p>
        </div>
      </section>

      {/* Main Grid - NYT Style Hierarchical */}
      <section className="max-w-[1400px] mx-auto px-6 py-12">
        <div className="grid grid-cols-12 gap-6 lg:gap-8">
          
          {/* Featured Story - Spans 8 columns on desktop */}
          <article className="col-span-12 lg:col-span-8 border-b-2 lg:border-b-0 lg:border-r-2 border-black pb-8 lg:pb-0 lg:pr-8">
            <Link href={`/essay/${featured.slug}`} className="group block">
              {/* Image */}
              <div className="aspect-[16/10] bg-gray-100 mb-6 overflow-hidden">
                <div className="w-full h-full bg-gradient-to-br from-gray-200 to-gray-300 group-hover:scale-105 transition-transform duration-700" />
              </div>
              
              {/* Category */}
              <span className="text-meta uppercase tracking-[0.15em] text-accent font-semibold">
                {featured.category}
              </span>
              
              {/* Title */}
              <h2 className="font-display text-[clamp(2rem,5vw,3.5rem)] font-bold leading-[1] mt-3 mb-4 group-hover:text-accent transition-colors">
                {featured.title}
              </h2>
              
              {/* Subtitle */}
              <p className="font-display text-[clamp(1.1rem,2vw,1.5rem)] italic text-gray-600 mb-4">
                {featured.subtitle}
              </p>
              
              {/* Excerpt */}
              <p className="text-body-lg text-gray-700 max-w-2xl leading-relaxed">
                {featured.excerpt}
              </p>
            </Link>
          </article>

          {/* Secondary Stories - 4 columns, stacked */}
          <div className="col-span-12 lg:col-span-4 space-y-8">
            {rest.slice(0, 3).map((essay, index) => (
              <article 
                key={essay.slug} 
                className={`${index < 2 ? 'border-b border-gray-200 pb-8' : ''}`}
              >
                <Link href={`/essay/${essay.slug}`} className="group block">
                  {/* Category */}
                  <span className="text-meta uppercase tracking-[0.15em] text-gray-500 font-medium">
                    {essay.category}
                  </span>
                  
                  {/* Title */}
                  <h3 className="font-display text-[clamp(1.25rem,2.5vw,1.75rem)] font-bold leading-[1.1] mt-2 mb-2 group-hover:text-accent transition-colors">
                    {essay.title}
                  </h3>
                  
                  {/* Subtitle */}
                  <p className="font-display text-base italic text-gray-500">
                    {essay.subtitle}
                  </p>
                </Link>
              </article>
            ))}
          </div>
        </div>

        {/* Divider */}
        <div className="border-t-2 border-black my-12" />

        {/* More Stories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {rest.slice(3).map((essay) => (
            <article key={essay.slug} className="group">
              <Link href={`/essay/${essay.slug}`} className="block">
                {/* Image */}
                <div className="aspect-[4/3] bg-gray-100 mb-4 overflow-hidden">
                  <div className="w-full h-full bg-gradient-to-br from-gray-200 to-gray-300 group-hover:scale-105 transition-transform duration-700" />
                </div>
                
                {/* Category */}
                <span className="text-meta uppercase tracking-[0.15em] text-gray-500 font-medium">
                  {essay.category}
                </span>
                
                {/* Title */}
                <h3 className="font-display text-xl font-bold leading-tight mt-2 mb-2 group-hover:text-accent transition-colors">
                  {essay.title}
                </h3>
                
                {/* Subtitle */}
                <p className="font-display text-base italic text-gray-500">
                  {essay.subtitle}
                </p>
              </Link>
            </article>
          ))}
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="bg-black text-white py-20">
        <div className="max-w-[1400px] mx-auto px-6">
          <div className="max-w-2xl">
            <h2 className="font-display text-[clamp(2rem,5vw,3.5rem)] font-bold leading-[1] mb-4">
              FIELD NOTES
            </h2>
            <p className="text-lg text-gray-300 mb-8">
              Occasional dispatches from the archive. No spam, no frequency promises. 
              Just stories worth your time.
            </p>
            <form className="flex gap-4 flex-col sm:flex-row">
              <input 
                type="email" 
                placeholder="Your email"
                className="flex-1 px-4 py-3 bg-transparent border-2 border-white text-white placeholder-gray-500 focus:outline-none focus:border-accent"
              />
              <button 
                type="submit"
                className="px-8 py-3 bg-accent text-white font-semibold uppercase tracking-wider hover:bg-white hover:text-black transition-colors"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
