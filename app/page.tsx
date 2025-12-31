import Link from 'next/link'
import Image from 'next/image'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { getEssays, getStories, getOpinions } from '@/lib/sheets'

export const dynamic = 'force-dynamic'
export const revalidate = 0

export default async function Home() {
  const essays = await getEssays()
  const stories = await getStories()
  const opinions = await getOpinions()
  
  const sortedEssays = essays.sort((a, b) => (Number(a.order) || 999) - (Number(b.order) || 999))
  const [featuredEssay, ...restEssays] = sortedEssays
  
  const sortedStories = stories.sort((a, b) => (Number(a.order) || 999) - (Number(b.order) || 999))
  const featuredStories = sortedStories.slice(0, 4)
  
  const sortedOpinions = opinions.sort((a, b) => (Number(a.order) || 999) - (Number(b.order) || 999))
  const featuredOpinion = sortedOpinions[0]
  
  return (
    <main className="min-h-screen bg-white">
      <Header />
      
      {/* Hero Section - Bold Statement */}
      <section className="min-h-[90vh] flex flex-col justify-center border-b-2 border-black pt-24">
        <div className="max-w-[1400px] mx-auto px-6 py-16 md:py-24">
          <h1 className="font-black text-[clamp(4rem,15vw,14rem)] leading-[0.85] tracking-[-0.04em] uppercase">
            <span className="block">Dancing</span>
            <span className="block">With <span className="text-accent">Lions</span></span>
          </h1>
          <div className="mt-12 max-w-2xl">
            <p className="text-xl md:text-2xl leading-relaxed text-gray-600">
              There is a way to travel that doesn't leave wreckage behind.
            </p>
            <p className="mt-4 text-lg text-gray-500">
              Where the people who welcome you can still afford to live there. Where the animals you came to see aren't dying for your photograph. Where the culture you admire isn't being performed for your consumption.
            </p>
          </div>
        </div>
      </section>

      {/* Thesis Strip */}
      <section className="bg-black text-white py-8 border-b-2 border-black">
        <div className="max-w-[1400px] mx-auto px-6">
          <p className="text-sm md:text-base uppercase tracking-[0.2em] text-center">
            It exists. We find it. We name what threatens it.
          </p>
        </div>
      </section>

      {/* Featured Essay */}
      {featuredEssay && (
        <section className="border-b-2 border-black">
          <div className="grid grid-cols-1 lg:grid-cols-2">
            {/* Image */}
            <div className="aspect-[4/5] lg:aspect-auto relative overflow-hidden bg-gray-100">
              {featuredEssay.heroImage ? (
                <Image
                  src={featuredEssay.heroImage}
                  alt={featuredEssay.title}
                  fill
                  className="object-cover"
                  priority
                />
              ) : (
                <div className="absolute inset-0 bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center">
                  <span className="text-white/20 font-black text-6xl uppercase tracking-tight">DWL</span>
                </div>
              )}
            </div>
            
            {/* Content */}
            <div className="flex flex-col justify-center p-8 md:p-12 lg:p-16">
              <p className="text-xs uppercase tracking-[0.2em] text-accent font-medium mb-6">
                Featured Essay
              </p>
              
              <Link href={`/essay/${featuredEssay.slug}`} className="group">
                <h2 className="font-black text-[clamp(2rem,5vw,4rem)] leading-[0.95] tracking-tight uppercase mb-4 group-hover:text-accent transition-colors">
                  {featuredEssay.title}
                </h2>
                
                <p className="text-xl md:text-2xl text-gray-600 mb-6 leading-relaxed">
                  {featuredEssay.subtitle}
                </p>
                
                <p className="text-gray-700 leading-relaxed max-w-xl mb-8">
                  {featuredEssay.excerpt}
                </p>
                
                <span className="inline-block text-sm font-bold uppercase tracking-wider border-b-2 border-black pb-1 group-hover:border-accent group-hover:text-accent transition-colors">
                  Read Essay
                </span>
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* The Goal */}
      <section className="border-b-2 border-black bg-gray-100">
        <div className="max-w-[1400px] mx-auto px-6 py-16 md:py-24">
          <div className="max-w-3xl">
            <h2 className="font-black text-[clamp(1.75rem,4vw,3rem)] leading-[1] tracking-tight uppercase mb-8">
              Is there a better way?
            </h2>
            <p className="text-xl leading-relaxed text-gray-700 mb-6">
              To travel without taking. To witness without extracting. To arrive as a guest — not a customer, not a content creator, not a problem to be managed — but as someone who came to see, and was seen in return.
            </p>
            <p className="text-lg leading-relaxed text-gray-600">
              We document the places where this still happens. The hosts who remember what hospitality meant before it became an industry. The conservation that actually conserves. The communities that thrive because travelers came — not despite them.
            </p>
          </div>
        </div>
      </section>

      {/* Featured Opinion - The Position */}
      {featuredOpinion && (
        <section className="border-b-2 border-black bg-gray-100">
          <div className="max-w-[1400px] mx-auto px-6 py-16 md:py-24">
            <div className="max-w-3xl">
              <p className="text-xs uppercase tracking-[0.2em] text-accent font-medium mb-6">
                Opinion
              </p>
              <Link href={`/opinion/${featuredOpinion.slug}`} className="group">
                <h2 className="font-black text-[clamp(1.75rem,4vw,3rem)] leading-[0.95] tracking-tight uppercase mb-6 group-hover:text-accent transition-colors">
                  {featuredOpinion.title}
                </h2>
                <p className="text-xl md:text-2xl text-gray-600 mb-6 leading-relaxed italic">
                  "{featuredOpinion.excerpt}"
                </p>
                <span className="inline-block text-sm font-bold uppercase tracking-wider border-b-2 border-black pb-1 group-hover:border-accent group-hover:text-accent transition-colors">
                  Read Position
                </span>
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* Stories Grid */}
      {featuredStories.length > 0 && (
        <section className="border-b-2 border-black">
          <div className="max-w-[1400px] mx-auto px-6 py-16 md:py-24">
            <div className="flex justify-between items-end mb-12">
              <div>
                <p className="text-xs uppercase tracking-[0.2em] text-gray-500 mb-2">Documentation</p>
                <h2 className="font-black text-3xl md:text-4xl uppercase tracking-tight">
                  Stories
                </h2>
              </div>
              <Link 
                href="/stories" 
                className="text-sm font-bold uppercase tracking-wider border-b-2 border-black pb-1 hover:border-accent hover:text-accent transition-colors hidden md:block"
              >
                View All
              </Link>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {featuredStories.map((story) => (
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
                  
                  <h3 className="font-bold text-lg leading-tight group-hover:text-accent transition-colors">
                    {story.title}
                  </h3>
                </Link>
              ))}
            </div>
            
            <Link 
              href="/stories" 
              className="mt-8 text-sm font-bold uppercase tracking-wider border-b-2 border-black pb-1 hover:border-accent hover:text-accent transition-colors md:hidden inline-block"
            >
              View All Stories
            </Link>
          </div>
        </section>
      )}

      {/* More Essays */}
      {restEssays.length > 0 && (
        <section className="border-b-2 border-black">
          <div className="max-w-[1400px] mx-auto px-6 py-16 md:py-24">
            <div className="flex justify-between items-end mb-12">
              <h2 className="font-black text-3xl md:text-4xl uppercase tracking-tight">
                Essays
              </h2>
              <Link 
                href="/essays" 
                className="text-sm font-bold uppercase tracking-wider border-b-2 border-black pb-1 hover:border-accent hover:text-accent transition-colors hidden md:block"
              >
                View All
              </Link>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12">
              {restEssays.slice(0, 6).map((essay) => (
                <Link 
                  key={essay.slug} 
                  href={`/essay/${essay.slug}`}
                  className="group"
                >
                  <div className="aspect-[16/10] relative overflow-hidden bg-gray-100 mb-4">
                    {essay.heroImage ? (
                      <Image
                        src={essay.heroImage}
                        alt={essay.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    ) : (
                      <div className="absolute inset-0 bg-gradient-to-br from-gray-200 to-gray-300 group-hover:scale-105 transition-transform duration-500" />
                    )}
                  </div>
                  
                  <h3 className="font-bold text-xl leading-tight mb-2 group-hover:text-accent transition-colors">
                    {essay.title}
                  </h3>
                  
                  <p className="text-gray-600 leading-relaxed text-sm">
                    {essay.subtitle}
                  </p>
                </Link>
              ))}
            </div>
            
            {restEssays.length > 6 && (
              <div className="mt-12 text-center">
                <Link 
                  href="/essays" 
                  className="inline-block text-sm font-bold uppercase tracking-wider border-b-2 border-black pb-1 hover:border-accent hover:text-accent transition-colors"
                >
                  View All Essays
                </Link>
              </div>
            )}
          </div>
        </section>
      )}

      {/* Newsletter */}
      <section className="bg-black text-white py-20 md:py-32">
        <div className="max-w-[1400px] mx-auto px-6">
          <div className="max-w-2xl">
            <h2 className="font-black text-[clamp(2.5rem,6vw,5rem)] leading-[0.9] tracking-tight uppercase mb-6">
              Field Notes
            </h2>
            <p className="text-lg text-gray-300 mb-8 leading-relaxed">
              Occasional dispatches from the archive. No spam. Just stories worth your time.
            </p>
            <form className="flex gap-4 flex-col sm:flex-row">
              <input 
                type="email" 
                placeholder="Your email"
                className="flex-1 px-4 py-4 bg-transparent border-2 border-white text-white placeholder-gray-500 focus:outline-none focus:border-accent"
              />
              <button 
                type="submit"
                className="px-8 py-4 bg-white text-black font-bold uppercase tracking-wider hover:bg-accent hover:text-white transition-colors"
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
