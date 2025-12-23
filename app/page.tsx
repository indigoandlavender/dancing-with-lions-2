import Link from 'next/link'
import Image from 'next/image'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import EssayCard from '@/components/EssayCard'
import { getEssays } from '@/lib/sheets'

export const dynamic = 'force-dynamic'
export const revalidate = 0

export default async function Home() {
  const essays = await getEssays()
  const sortedEssays = essays.sort((a, b) => (Number(a.order) || 999) - (Number(b.order) || 999))
  const [featured, ...rest] = sortedEssays
  
  return (
    <main className="min-h-screen bg-white">
      <Header />
      
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

      {featured && (
        <section className="max-w-[1400px] mx-auto px-6 py-12 border-b-2 border-black">
          <Link href={`/essay/${featured.slug}`} className="group grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
            <div className="aspect-[4/5] relative overflow-hidden bg-gray-100">
              {featured.heroImage ? (
                <Image
                  src={featured.heroImage}
                  alt={featured.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                />
              ) : (
                <div className="absolute inset-0 bg-gradient-to-br from-gray-200 to-gray-300 group-hover:scale-105 transition-transform duration-700" />
              )}
            </div>
            
            <div className="flex flex-col justify-center">
              <h2 className="font-display text-[clamp(2.5rem,6vw,4rem)] font-bold leading-[0.95] mb-4 group-hover:text-accent transition-colors">
                {featured.title}
              </h2>
              
              <p className="font-display text-[clamp(1.25rem,2.5vw,1.75rem)] italic text-gray-600 mb-6">
                {featured.subtitle}
              </p>
              
              <p className="text-lg text-gray-700 leading-relaxed max-w-xl">
                {featured.excerpt}
              </p>
              
              <p className="mt-8 text-sm font-medium uppercase tracking-wider text-accent">
                Read essay →
              </p>
            </div>
          </Link>
        </section>
      )}

      {rest.length > 0 && (
        <section className="max-w-[1400px] mx-auto px-6 py-16">
          <h2 className="font-display text-2xl font-bold uppercase tracking-wider mb-12">
            More Essays
          </h2>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12">
            {rest.map((essay) => (
              <EssayCard
                key={essay.slug}
                slug={essay.slug}
                title={essay.title}
                subtitle={essay.subtitle}
                heroImage={essay.heroImage}
              />
            ))}
          </div>
        </section>
      )}

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
