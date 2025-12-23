import Header from '@/components/Header'
import Footer from '@/components/Footer'
import EssayCard from '@/components/EssayCard'
import { getEssays } from '@/lib/sheets'

export const dynamic = 'force-dynamic'
export const revalidate = 0

export default async function EssaysPage() {
  const essays = await getEssays()
  const sortedEssays = essays.sort((a, b) => (Number(a.order) || 999) - (Number(b.order) || 999))

  return (
    <main className="min-h-screen bg-white">
      <Header />
      
      <section className="border-b-2 border-black">
        <div className="max-w-[1400px] mx-auto px-6 py-16">
          <h1 className="font-display text-[clamp(3rem,10vw,6rem)] font-bold leading-[0.9] tracking-[-0.03em]">
            ESSAYS
          </h1>
          <p className="mt-6 font-display text-xl italic text-gray-600 max-w-2xl">
            Mythology, hidden history, cultural connections — the layer beneath the guidebook.
          </p>
        </div>
      </section>

      <section className="max-w-[1400px] mx-auto px-6 py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12">
          {sortedEssays.map((essay) => (
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

      <Footer />
    </main>
  )
}
