import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { getIndices } from '@/lib/sheets'

export const dynamic = 'force-dynamic'
export const revalidate = 0

export default async function IndicesPage() {
  const indices = await getIndices()
  
  return (
    <main className="min-h-screen bg-white">
      <Header />
      
      {/* Hero */}
      <section className="border-b-2 border-black pt-24">
        <div className="max-w-[1400px] mx-auto px-6 py-16 md:py-24">
          <h1 className="font-black text-[clamp(3rem,12vw,10rem)] leading-[0.85] tracking-[-0.04em] uppercase">
            Index
          </h1>
          <p className="mt-8 text-xl text-gray-600 max-w-2xl">
            Metrics we track over time. Living data on the state of hospitality and tourism.
          </p>
        </div>
      </section>

      {/* Indices */}
      <section className="border-b-2 border-black">
        <div className="max-w-[1400px] mx-auto px-6 py-16 md:py-24">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {indices.map((index) => (
              <div key={index.index_id} className="border-2 border-black p-8">
                <div className="flex items-start justify-between mb-4">
                  <h2 className="font-bold text-xl uppercase tracking-tight">
                    {index.name}
                  </h2>
                  {index.current_value && (
                    <div className="text-right">
                      <p className="font-black text-4xl text-accent">{index.current_value}</p>
                      {index.change && (
                        <p className={`text-sm font-bold ${index.change.startsWith('+') ? 'text-red-600' : 'text-green-600'}`}>
                          {index.change}
                        </p>
                      )}
                    </div>
                  )}
                </div>
                <p className="text-gray-600 mb-4">
                  {index.description}
                </p>
                {index.last_updated && (
                  <p className="text-xs text-gray-400 uppercase tracking-wider">
                    Last updated: {index.last_updated}
                  </p>
                )}
                {!index.current_value && (
                  <p className="text-sm text-gray-500 italic">Data collection in progress</p>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Methodology Note */}
      <section className="border-b-2 border-black bg-gray-100">
        <div className="max-w-[1400px] mx-auto px-6 py-16 md:py-24">
          <div className="max-w-3xl">
            <h2 className="font-black text-2xl md:text-3xl uppercase tracking-tight mb-6">
              Methodology
            </h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              Our indices are built from multiple data sources: review platform sentiment analysis, forum monitoring, industry reports, and primary research. Each index has a documented methodology available upon request.
            </p>
            <p className="text-gray-700 leading-relaxed">
              We update indices monthly or quarterly depending on data availability. Historical data is preserved to track trends over time.
            </p>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
