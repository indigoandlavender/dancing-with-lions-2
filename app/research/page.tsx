import Header from '@/components/Header'
import Footer from '@/components/Footer'
import Link from 'next/link'
import { getResearch } from '@/lib/sheets'

export const dynamic = 'force-dynamic'
export const revalidate = 0

export default async function ResearchPage() {
  const research = await getResearch()
  const sortedResearch = research.sort((a, b) => (Number(a.order) || 999) - (Number(b.order) || 999))
  
  return (
    <main className="min-h-screen bg-white">
      <Header />
      
      {/* Hero */}
      <section className="border-b-2 border-black pt-24">
        <div className="max-w-[1400px] mx-auto px-6 py-16 md:py-24">
          <h1 className="font-black text-[clamp(3rem,12vw,10rem)] leading-[0.85] tracking-[-0.04em] uppercase">
            Research
          </h1>
          <p className="mt-8 text-xl text-gray-600 max-w-2xl">
            Original data nobody else is compiling. Sentiment analysis, forum research, industry deep-dives. The numbers behind the crisis.
          </p>
        </div>
      </section>

      {/* Research List */}
      <section className="border-b-2 border-black">
        <div className="max-w-[1400px] mx-auto px-6 py-16 md:py-24">
          {sortedResearch.length > 0 ? (
            <div className="space-y-16">
              {sortedResearch.map((item) => (
                <article key={item.slug} className="border-b border-gray-200 pb-16 last:border-0">
                  <Link href={`/research/${item.slug}`} className="group">
                    <p className="text-xs uppercase tracking-[0.2em] text-accent font-medium mb-4">
                      {item.category}
                    </p>
                    <h2 className="font-black text-3xl md:text-4xl uppercase tracking-tight mb-4 group-hover:text-accent transition-colors">
                      {item.title}
                    </h2>
                    <p className="text-xl text-gray-600 mb-4">
                      {item.subtitle}
                    </p>
                    <p className="text-gray-700 leading-relaxed mb-6 max-w-3xl">
                      {item.excerpt}
                    </p>
                    {item.key_findings && (
                      <div className="flex flex-wrap gap-2 mb-6">
                        {item.key_findings.split('|').map((finding, i) => (
                          <span key={i} className="px-3 py-1 bg-gray-100 text-sm text-gray-700">
                            {finding.trim()}
                          </span>
                        ))}
                      </div>
                    )}
                    <span className="inline-block text-sm font-bold uppercase tracking-wider border-b-2 border-black pb-1 group-hover:border-accent group-hover:text-accent transition-colors">
                      Read Report
                    </span>
                  </Link>
                </article>
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <p className="text-xl text-gray-600 mb-4">Research reports coming soon.</p>
              <p className="text-gray-500">We're gathering the data. Sign up for Field Notes to be notified.</p>
            </div>
          )}
        </div>
      </section>

      {/* Coming Soon */}
      <section className="border-b-2 border-black bg-gray-100">
        <div className="max-w-[1400px] mx-auto px-6 py-16 md:py-24">
          <h2 className="font-black text-2xl md:text-3xl uppercase tracking-tight mb-8">
            In Progress
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white p-6 border-2 border-black">
              <h3 className="font-bold text-lg mb-2">Host Burnout Analysis</h3>
              <p className="text-gray-600 text-sm">Sentiment analysis of 10,000+ reviews from Airbnb host forums and hospitality communities.</p>
            </div>
            <div className="bg-white p-6 border-2 border-black">
              <h3 className="font-bold text-lg mb-2">Overtourism Mapping</h3>
              <p className="text-gray-600 text-sm">Visitor volume vs. local infrastructure capacity across 50 destinations.</p>
            </div>
            <div className="bg-white p-6 border-2 border-black">
              <h3 className="font-bold text-lg mb-2">Greenwash Audit</h3>
              <p className="text-gray-600 text-sm">Gap analysis between eco-marketing claims and actual certification/practice data.</p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
