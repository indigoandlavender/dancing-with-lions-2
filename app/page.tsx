import Link from 'next/link'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { getStories, getOpinions } from '@/lib/sheets'

export const dynamic = 'force-dynamic'
export const revalidate = 0

export default async function Home() {
  const stories = await getStories()
  const opinions = await getOpinions()
  
  const sortedStories = stories.sort((a, b) => (Number(a.order) || 999) - (Number(b.order) || 999))
  const featuredStories = sortedStories.slice(0, 3)
  
  const sortedOpinions = opinions.sort((a, b) => (Number(a.order) || 999) - (Number(b.order) || 999))
  const featuredOpinion = sortedOpinions[0]
  
  return (
    <main className="min-h-screen bg-white">
      <Header />
      
      {/* Hero */}
      <section className="min-h-[70vh] flex flex-col justify-center border-b-2 border-black pt-24">
        <div className="max-w-[1400px] mx-auto px-6 py-16 md:py-24">
          <h1 className="font-black text-[clamp(3rem,12vw,10rem)] leading-[0.85] tracking-[-0.04em] uppercase">
            <span className="block">Dancing</span>
            <span className="block">With <span className="text-accent">Lions</span></span>
          </h1>
          <div className="mt-8">
            <p className="text-xl md:text-2xl text-gray-600 max-w-2xl">
              A think tank documenting the crisis in hospitality and tourism.
            </p>
          </div>
        </div>
      </section>

      {/* The Numbers */}
      <section className="border-b-2 border-black bg-black text-white">
        <div className="max-w-[1400px] mx-auto px-6 py-16 md:py-24">
          <p className="text-xs uppercase tracking-[0.2em] text-accent font-medium mb-12">
            The Crisis
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
            <div>
              <p className="font-black text-5xl md:text-6xl text-accent">100%</p>
              <p className="mt-2 text-gray-400">Annual turnover in hotels. Complete staff replacement. Every year.</p>
            </div>
            <div>
              <p className="font-black text-5xl md:text-6xl text-accent">87%</p>
              <p className="mt-2 text-gray-400">Of hospitality workers report being bullied by customers.</p>
            </div>
            <div>
              <p className="font-black text-5xl md:text-6xl text-accent">↑↑↑</p>
              <p className="mt-2 text-gray-400">Tourist expectations. Five-star experience at budget prices.</p>
            </div>
            <div>
              <p className="font-black text-5xl md:text-6xl text-accent">GDP</p>
              <p className="mt-2 text-gray-400">What tourism bureaus measure. Volume. Not the coral dying or the workers leaving.</p>
            </div>
          </div>
          <div className="max-w-3xl">
            <p className="text-2xl md:text-3xl font-bold leading-tight">
              Something has to give.
            </p>
          </div>
        </div>
      </section>

      {/* What We Do */}
      <section className="border-b-2 border-black">
        <div className="max-w-[1400px] mx-auto px-6 py-16 md:py-24">
          <p className="text-xs uppercase tracking-[0.2em] text-accent font-medium mb-6">
            What We Do
          </p>
          <h2 className="font-black text-[clamp(2rem,5vw,4rem)] leading-[0.95] tracking-tight uppercase mb-12">
            Research. Data. The Question.
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div>
              <h3 className="font-bold text-xl uppercase tracking-tight mb-4">Research</h3>
              <p className="text-gray-600 leading-relaxed">
                Original data nobody else is compiling. Sentiment analysis from reviews and forums. Industry deep-dives. The numbers behind the crisis.
              </p>
              <Link href="/research" className="inline-block mt-4 text-sm font-bold uppercase tracking-wider border-b-2 border-black pb-1 hover:border-accent hover:text-accent transition-colors">
                View Research
              </Link>
            </div>
            <div>
              <h3 className="font-bold text-xl uppercase tracking-tight mb-4">Index</h3>
              <p className="text-gray-600 leading-relaxed">
                Metrics we track over time. Host burnout. Overtourism pressure. Greenwash scores. Living data, updated regularly.
              </p>
              <Link href="/indices" className="inline-block mt-4 text-sm font-bold uppercase tracking-wider border-b-2 border-black pb-1 hover:border-accent hover:text-accent transition-colors">
                View Index
              </Link>
            </div>
            <div>
              <h3 className="font-bold text-xl uppercase tracking-tight mb-4">Opinion</h3>
              <p className="text-gray-600 leading-relaxed">
                Positions backed by data. What the research means. What's broken and what might work.
              </p>
              <Link href="/opinion" className="inline-block mt-4 text-sm font-bold uppercase tracking-wider border-b-2 border-black pb-1 hover:border-accent hover:text-accent transition-colors">
                View Opinions
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* The Question */}
      <section className="border-b-2 border-black bg-gray-100">
        <div className="max-w-[1400px] mx-auto px-6 py-16 md:py-24">
          <div className="max-w-3xl">
            <h2 className="font-black text-[clamp(2rem,5vw,4rem)] leading-[0.95] tracking-tight uppercase mb-8">
              Is there a better way?
            </h2>
            <p className="text-xl leading-relaxed text-gray-700 mb-6">
              We are all responsible for this toxic environment. Every single one of us. Pointing fingers is futile.
            </p>
            <p className="text-xl leading-relaxed text-gray-700 mb-6">
              Travel is not just Instagram filtered photos. Flip them over and you'll see the tears behind the smiles. The housekeeper who can't afford rent. The guide performing enthusiasm for the hundredth time. The reef they're standing on, bleaching.
            </p>
            <p className="text-xl leading-relaxed text-gray-700">
              Dancing with Lions doesn't pretend to have the solution. We gather the data. We document what we see. We ask the question.
            </p>
          </div>
        </div>
      </section>

      {/* Featured Opinion */}
      {featuredOpinion && (
        <section className="border-b-2 border-black">
          <div className="max-w-[1400px] mx-auto px-6 py-16 md:py-24">
            <div className="max-w-3xl">
              <p className="text-xs uppercase tracking-[0.2em] text-accent font-medium mb-6">
                Latest Opinion
              </p>
              <Link href={`/opinion/${featuredOpinion.slug}`} className="group">
                <h2 className="font-black text-[clamp(1.75rem,4vw,3rem)] leading-[0.95] tracking-tight uppercase mb-6 group-hover:text-accent transition-colors">
                  {featuredOpinion.title}
                </h2>
                <p className="text-xl text-gray-600 mb-6 leading-relaxed">
                  {featuredOpinion.excerpt}
                </p>
                <span className="inline-block text-sm font-bold uppercase tracking-wider border-b-2 border-black pb-1 group-hover:border-accent group-hover:text-accent transition-colors">
                  Read Position
                </span>
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* Stories Preview */}
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
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {featuredStories.map((story) => (
                <Link 
                  key={story.slug} 
                  href={`/story/${story.slug}`}
                  className="group"
                >
                  <p className="text-xs uppercase tracking-[0.15em] text-gray-500 mb-2">
                    {story.category}
                  </p>
                  <h3 className="font-bold text-xl leading-tight mb-3 group-hover:text-accent transition-colors">
                    {story.title}
                  </h3>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    {story.excerpt}
                  </p>
                </Link>
              ))}
            </div>
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
              Research updates. New data. The question, ongoing. No spam.
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
