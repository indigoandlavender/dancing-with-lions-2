import { Metadata } from 'next'
import { getOpinions } from '@/lib/sheets'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import Link from 'next/link'

export const dynamic = 'force-dynamic'
export const revalidate = 0

export const metadata: Metadata = {
  title: 'Opinion',
  description: 'Perspective on hospitality, tourism, conservation, and care. What is broken. What is imbalanced. What could change.',
}

export default async function OpinionPage() {
  const opinions = await getOpinions()
  
  // Sort by order
  const sortedOpinions = opinions.sort((a, b) => (parseInt(a.order) || 999) - (parseInt(b.order) || 999))

  return (
    <main className="min-h-screen bg-white">
      <Header />
      
      {/* Hero */}
      <section className="border-b-2 border-black pt-24">
        <div className="max-w-[1400px] mx-auto px-6 py-16 md:py-24">
          <h1 className="font-black text-[clamp(3rem,12vw,10rem)] leading-[0.85] tracking-[-0.04em] uppercase">
            Opinion
          </h1>
          <p className="mt-8 text-xl md:text-2xl text-gray-600 max-w-2xl leading-relaxed">
            Perspective on hospitality, tourism, conservation, and care. 
            Not controversy — clarity. The mirror held up.
          </p>
        </div>
      </section>

      {/* Opinion List - Text only, NYT style */}
      <section className="border-b-2 border-black">
        <div className="max-w-[900px] mx-auto px-6 py-16 md:py-24">
          {sortedOpinions.length > 0 ? (
            <div className="space-y-16">
              {sortedOpinions.map((opinion, index) => (
                <article key={opinion.slug} className={index > 0 ? 'pt-16 border-t border-gray-200' : ''}>
                  <Link href={`/opinion/${opinion.slug}`} className="group block">
                    <h2 className="font-black text-3xl md:text-4xl leading-[1.1] tracking-tight mb-4 group-hover:text-accent transition-colors">
                      {opinion.title}
                    </h2>
                    
                    <p className="text-xl md:text-2xl text-gray-600 leading-relaxed mb-4">
                      {opinion.subtitle}
                    </p>
                    
                    <p className="text-gray-700 leading-relaxed mb-6">
                      {opinion.excerpt}
                    </p>
                    
                    <div className="flex items-center gap-4 text-sm text-gray-500">
                      <span>{opinion.textBy}</span>
                      <span>·</span>
                      <span>{opinion.readTime}</span>
                    </div>
                  </Link>
                </article>
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <p className="text-gray-600 text-lg">
                Opinion pieces coming soon.
              </p>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </main>
  )
}
