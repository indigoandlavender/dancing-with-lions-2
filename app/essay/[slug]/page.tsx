import { notFound } from 'next/navigation'
import Image from 'next/image'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import EssayBody from '@/components/EssayBody'
import { getEssayBySlug, Essay } from '@/lib/sheets'

export const dynamic = 'force-dynamic'
export const revalidate = 0

// Fallback essay for demo when sheets not connected
const fallbackEssay: Essay = {
  slug: 'the-barbary-lion',
  title: 'The Barbary Lion',
  subtitle: 'Forty survived in the king\'s garden',
  category: 'RETURNS',
  readTime: '8 min',
  year: '2025',
  heroImage: '',
  heroCaption: 'Atlas Mountains, Morocco',
  excerpt: '',
  textBy: 'J. Laurent',
  imagesBy: 'Midjourney',
  body: `Roman emperors shipped thousands of them from the Atlas Mountains to die in the Colosseum. For centuries, the Barbary lion was the lion — the beast that faced gladiators, that decorated imperial standards, that Europeans imagined when they imagined lions.

They were larger than their African cousins. The males carried darker, fuller manes that extended down their bellies. They lived in the mountains, not the savannah — hunting deer and wild boar in the cedar forests of the Atlas.

By the early twentieth century, they were nearly gone. Hunted for sport, for protection, for spectacle. The French colonial administration offered bounties. The rifles got more accurate. The forests shrank.

> The last wild Barbary lion was photographed from an airplane in 1925. A pilot looked down and saw the end of an era.

That pilot was Marcelin Flandrin, flying reconnaissance over the Atlas. He spotted the lion in a clearing and photographed it from above. The image is blurry, barely recognizable — a tawny smudge against rock and scrub. But the date is certain. After that, nothing.

Except the king had lions. The Sultan of Morocco had always kept lions — symbols of royal power, gifts from tribal leaders, confiscations from private collections. When the wild population collapsed, the royal menagerie in Rabat held the last survivors.

Forty lions. Maybe fewer. Inbred, captive, but alive.

For decades, they existed in a kind of limbo. Not quite wild, not quite saved. The zoo bred them carefully, trying to maintain what genetic diversity remained. Scientists debated whether they were "pure" Barbary lions or mixed with other subspecies. The arguments continue.

But something shifted. Conservation geneticists began mapping their DNA. Breeding programs expanded to zoos in Europe. And in Morocco, a quiet plan took shape: return the lion to the Atlas.

The rewilding project isn't finished. It may take decades. The forests need to recover first. The prey populations need to stabilize. The politics need to align.

But the direction is set. The lion that Rome dragged to the arena, that colonialism hunted to the edge of extinction, that survived only because a king kept them in his garden — that lion might walk the Atlas again.

Not a rescue. Not a miracle. Just time doing its strange work.`,
  sources: `Yamaguchi, N., et al. "The Barbary lion and the Cape lion: extinct subspecies or mythological entities?" Mammal Review, 2008.

Black, S., et al. "Genetic structure of Barbary lions: implications for conservation." Conservation Genetics, 2013.

Hemmer, H. "The phylogeny of the tiger and other Panthera species." Carnivore, 1978.

Archives of the Rabat Zoological Gardens, personal correspondence.`,
  organizations: `Rabat Zoo Conservation Program — Coordinates the international Barbary lion studbook
rabatzoo.ma

IUCN Cat Specialist Group — Oversees felid conservation science globally
catsg.org`,
  published: 'true',
  featured: 'true',
  order: '1',
}

async function getEssay(slug: string): Promise<Essay | null> {
  try {
    const essay = await getEssayBySlug(slug)
    if (essay) return essay
  } catch (error) {
    console.error('Error fetching essay:', error)
  }
  
  // Return fallback if slug matches
  if (slug === 'the-barbary-lion') {
    return fallbackEssay
  }
  
  return null
}

export default async function EssayPage({ 
  params 
}: { 
  params: { slug: string } 
}) {
  const essay = await getEssay(params.slug)
  
  if (!essay) {
    notFound()
  }

  return (
    <main className="min-h-screen bg-white">
      <Header />
      
      {/* Hero Image - Full Bleed */}
      <div className="w-full h-[70vh] bg-gray-200 relative overflow-hidden">
        {essay.heroImage ? (
          <Image
            src={essay.heroImage}
            alt={essay.title}
            fill
            className="object-cover"
            priority
          />
        ) : (
          <div className="absolute inset-0 bg-gradient-to-br from-gray-300 to-gray-400" />
        )}
        {essay.heroCaption && (
          <p className="absolute bottom-4 left-6 text-sm text-white/80 uppercase tracking-wider">
            {essay.heroCaption}
          </p>
        )}
      </div>

      {/* Article Header */}
      <article className="max-w-content mx-auto px-6 py-16">
        {/* Meta */}
        <div className="flex items-center gap-4 text-meta uppercase tracking-[0.15em] text-gray-500 mb-6">
          <span className="text-accent font-semibold">{essay.category}</span>
          <span>·</span>
          <span>{essay.readTime} read</span>
        </div>

        {/* Title */}
        <h1 className="font-display text-title font-bold leading-[0.95] mb-4">
          {essay.title}
        </h1>

        {/* Subtitle */}
        <p className="font-display text-subtitle italic text-gray-600 mb-12">
          {essay.subtitle}
        </p>

        {/* Divider */}
        <hr className="border-t-2 border-black mb-12" />

        {/* Body */}
        <EssayBody content={essay.body} />

        {/* Sources */}
        {essay.sources && (
          <>
            <hr className="border-t border-gray-200 my-12" />
            <section>
              <h2 className="font-display text-lg font-bold uppercase tracking-wider mb-6">
                Sources
              </h2>
              <div className="text-sm text-gray-600 space-y-2 whitespace-pre-line">
                {essay.sources}
              </div>
            </section>
          </>
        )}

        {/* Organizations */}
        {essay.organizations && (
          <>
            <hr className="border-t border-gray-200 my-12" />
            <section>
              <h2 className="font-display text-lg font-bold uppercase tracking-wider mb-6">
                The Work Continues
              </h2>
              <div className="text-sm text-gray-600 space-y-4 whitespace-pre-line">
                {essay.organizations}
              </div>
            </section>
          </>
        )}

        {/* Credits */}
        <hr className="border-t border-gray-200 my-12" />
        <footer className="flex flex-wrap gap-x-8 gap-y-2 text-sm text-gray-500">
          <span>Text — {essay.textBy}</span>
          <span>Images — {essay.imagesBy}</span>
          <span>{essay.year}</span>
        </footer>
      </article>

      <Footer />
    </main>
  )
}
