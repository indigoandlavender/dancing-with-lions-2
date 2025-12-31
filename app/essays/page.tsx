import Header from '@/components/Header'
import Footer from '@/components/Footer'
import Link from 'next/link'
import Image from 'next/image'
import { getEssays } from '@/lib/sheets'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Essays',
  description: 'In-depth essays on traditional knowledge systems, cultural heritage, and conservation across Africa, the Middle East, and Asia.',
}

export const dynamic = 'force-dynamic'
export const revalidate = 0

export default async function EssaysPage() {
  const essays = await getEssays()
  const sortedEssays = essays.sort((a, b) => (Number(a.order) || 999) - (Number(b.order) || 999))

  return (
    <main className="min-h-screen bg-white">
      <Header />
      
      {/* Hero */}
      <section className="border-b-2 border-black pt-24">
        <div className="max-w-[1400px] mx-auto px-6 py-16 md:py-24">
          <h1 className="font-black text-[clamp(3rem,12vw,10rem)] leading-[0.85] tracking-[-0.04em] uppercase">
            Essays
          </h1>
          <p className="mt-8 text-xl md:text-2xl text-gray-600 max-w-2xl leading-relaxed">
            In-depth explorations of traditional knowledge systems, cultural heritage, 
            and the people who preserve them.
          </p>
        </div>
      </section>

      {/* Essays Grid */}
      <section className="border-b-2 border-black">
        <div className="max-w-[1400px] mx-auto px-6 py-16 md:py-24">
          {sortedEssays.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12">
              {sortedEssays.map((essay) => (
                <Link 
                  key={essay.slug} 
                  href={`/essay/${essay.slug}`}
                  className="group"
                >
                  <div className="aspect-[4/5] relative overflow-hidden bg-gray-100 mb-4">
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
                  
                  <h2 className="font-bold text-xl leading-tight mb-2 group-hover:text-accent transition-colors">
                    {essay.title}
                  </h2>
                  
                  <p className="text-gray-600 leading-relaxed text-sm">
                    {essay.subtitle}
                  </p>
                </Link>
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <p className="text-gray-600 text-lg">
                Essays coming soon.
              </p>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </main>
  )
}
