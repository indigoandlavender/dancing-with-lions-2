import Link from 'next/link'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

async function getAllEssays() {
  // This would fetch from Google Sheets
  return [
    {
      slug: 'the-barbary-lion',
      title: 'The Barbary Lion',
      subtitle: 'Forty survived in the king\'s garden',
      category: 'RETURNS',
      excerpt: 'Roman emperors shipped thousands of them from the Atlas to die in the Colosseum.',
    },
    {
      slug: 'the-sahara-remembers',
      title: 'How the Sahara Remembers',
      subtitle: 'The navigation system that predates GPS by two thousand years',
      category: 'SYSTEMS',
      excerpt: 'Satellite navigation fails in sandstorms. The stars don\'t.',
    },
    {
      slug: 'the-gnawa',
      title: 'The Gnawa',
      subtitle: 'The gods that crossed the ocean twice',
      category: 'ESSAYS',
      excerpt: 'Enslaved West Africans kept their gods alive by hiding them inside Sufism.',
    },
    {
      slug: 'le-morne',
      title: 'Le Morne',
      subtitle: 'They chose the cliff over the whip',
      category: 'ESSAYS',
      excerpt: 'The maroons thought the soldiers had come to capture them. They jumped.',
    },
    {
      slug: 'the-khettara',
      title: 'The Khettara',
      subtitle: 'Thirty kilometers of tunnels, carved in the dark',
      category: 'SYSTEMS',
      excerpt: 'They could hear water through stone.',
    },
    {
      slug: 'imchil',
      title: 'The Imchil Wedding Market',
      subtitle: 'Where the lakes fell in love',
      category: 'ESSAYS',
      excerpt: 'Once a year, the High Atlas becomes a matchmaking festival.',
    },
  ]
}

export default async function EssaysPage() {
  const essays = await getAllEssays()

  return (
    <main className="min-h-screen bg-white">
      <Header />
      
      <section className="max-w-[1400px] mx-auto px-6 py-16">
        {/* Page Title */}
        <h1 className="font-display text-title font-bold leading-[0.95] mb-4">
          Essays
        </h1>
        <p className="font-display text-xl italic text-gray-600 mb-12">
          The stories underneath the map.
        </p>

        <hr className="border-t-2 border-black mb-12" />

        {/* Essays Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-16">
          {essays.map((essay) => (
            <article key={essay.slug} className="group">
              <Link href={`/essay/${essay.slug}`} className="block">
                {/* Image */}
                <div className="aspect-[16/10] bg-gray-100 mb-5 overflow-hidden">
                  <div className="w-full h-full bg-gradient-to-br from-gray-200 to-gray-300 group-hover:scale-105 transition-transform duration-700" />
                </div>
                
                {/* Category */}
                <span className="text-meta uppercase tracking-[0.15em] text-accent font-semibold">
                  {essay.category}
                </span>
                
                {/* Title */}
                <h2 className="font-display text-2xl md:text-3xl font-bold leading-tight mt-2 mb-2 group-hover:text-accent transition-colors">
                  {essay.title}
                </h2>
                
                {/* Subtitle */}
                <p className="font-display text-lg italic text-gray-500 mb-3">
                  {essay.subtitle}
                </p>

                {/* Excerpt */}
                <p className="text-gray-600 leading-relaxed">
                  {essay.excerpt}
                </p>
              </Link>
            </article>
          ))}
        </div>
      </section>

      <Footer />
    </main>
  )
}
