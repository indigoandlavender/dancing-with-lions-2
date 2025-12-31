import Header from '@/components/Header'
import Footer from '@/components/Footer'
import Link from 'next/link'

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-white">
      <Header />
      
      {/* Hero */}
      <section className="border-b-2 border-black pt-24">
        <div className="max-w-[1400px] mx-auto px-6 py-16 md:py-24">
          <h1 className="font-black text-[clamp(3rem,12vw,10rem)] leading-[0.85] tracking-[-0.04em] uppercase">
            About
          </h1>
        </div>
      </section>

      {/* The Thesis */}
      <section className="border-b-2 border-black bg-black text-white">
        <div className="max-w-[1400px] mx-auto px-6 py-16 md:py-24">
          <div className="max-w-3xl">
            <p className="text-xs uppercase tracking-[0.2em] text-accent font-medium mb-6">
              The Thesis
            </p>
            <h2 className="font-black text-[clamp(1.75rem,4vw,3rem)] leading-[1] tracking-tight uppercase mb-8">
              The successes. The threats. Without flinching.
            </h2>
            <p className="text-xl md:text-2xl leading-relaxed text-gray-300">
              Tourism that doesn't hurt people, animals, or culture. It exists. We document who's doing it right.
            </p>
            <p className="mt-6 text-lg leading-relaxed text-gray-400">
              And we document the threats. The systems that extract. The models that break people. 
              The conservation that's actually poaching in disguise. Looking at what's wrong in the face, without flinching.
            </p>
          </div>
        </div>
      </section>

      {/* The Mission */}
      <section className="border-b-2 border-black">
        <div className="max-w-[1400px] mx-auto px-6 py-16 md:py-24">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24">
            <div>
              <p className="text-xs uppercase tracking-[0.2em] text-accent font-medium mb-6">
                The Mission
              </p>
              <h2 className="font-black text-[clamp(2rem,4vw,3.5rem)] leading-[0.95] tracking-tight uppercase">
                People.<br />
                Animals.<br />
                Culture.
              </h2>
            </div>
            <div className="flex flex-col justify-center">
              <p className="text-xl md:text-2xl leading-relaxed text-gray-700 mb-6">
                Tourism that doesn't hurt.
              </p>
              <p className="text-lg leading-relaxed text-gray-600">
                We document the successes — conservation models that work, hospitality cultures 
                that sustain their people, heritage that lives instead of being extracted. 
                And we document the threats — looking at what's wrong in the face, without flinching.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* The Three Pillars */}
      <section className="border-b-2 border-black">
        <div className="grid grid-cols-1 md:grid-cols-3">
          <div className="border-b-2 md:border-b-0 md:border-r-2 border-black p-8 md:p-12">
            <h3 className="font-black text-2xl uppercase tracking-tight mb-4">People</h3>
            <p className="text-gray-600 leading-relaxed">
              Hospitality that sustains its workers. Businesses where staff stay, grow, 
              and aren't burned through. The ancient contract restored.
            </p>
          </div>
          <div className="border-b-2 md:border-b-0 md:border-r-2 border-black p-8 md:p-12">
            <h3 className="font-black text-2xl uppercase tracking-tight mb-4">Animals</h3>
            <p className="text-gray-600 leading-relaxed">
              Conservation that works. Community models, rewilding successes, wildlife 
              returning. Tourism that funds protection, not extraction.
            </p>
          </div>
          <div className="p-8 md:p-12">
            <h3 className="font-black text-2xl uppercase tracking-tight mb-4">Culture</h3>
            <p className="text-gray-600 leading-relaxed">
              Heritage that lives. Traditions practiced, not performed. Communities 
              benefiting from their own culture, not displaced by it.
            </p>
          </div>
        </div>
      </section>

      {/* The Position */}
      <section className="border-b-2 border-black bg-gray-100">
        <div className="max-w-[1400px] mx-auto px-6 py-16 md:py-24">
          <div className="max-w-3xl">
            <p className="text-xs uppercase tracking-[0.2em] text-accent font-medium mb-6">
              The Position
            </p>
            <h2 className="font-black text-3xl md:text-4xl uppercase tracking-tight mb-8">
              Without flinching
            </h2>
            <p className="text-lg leading-relaxed text-gray-700 mb-6">
              Dancing with Lions is not neutral. We document what's working — and we name what's broken. 
              The conservation projects that are actually poaching operations. The cultural tourism that 
              displaces communities. The hospitality industry burning through workers at 74% annual turnover.
            </p>
            <p className="text-lg leading-relaxed text-gray-700 mb-6">
              Eighty-two percent of hospitality workers face abuse. Wildlife tourism that funds extinction. 
              Heritage sites that exclude the people who built them. We look at it. We document it. We don't look away.
            </p>
            <p className="text-lg leading-relaxed text-gray-700">
              <strong>The successes exist. So do the threats. Both get named.</strong>
            </p>
          </div>
        </div>
      </section>

      {/* The Name */}
      <section className="border-b-2 border-black">
        <div className="max-w-[1400px] mx-auto px-6 py-16 md:py-24">
          <div className="max-w-3xl">
            <p className="text-xs uppercase tracking-[0.2em] text-accent font-medium mb-6">
              The Name
            </p>
            <h2 className="font-black text-3xl md:text-4xl uppercase tracking-tight mb-8">
              Why "Dancing with Lions"
            </h2>
            <p className="text-lg leading-relaxed text-gray-700 mb-6">
              The Barbary lion vanished from the Atlas Mountains in the 1960s. Forty survive 
              in Rabat Zoo — descendants of the royal menagerie, kept for centuries. The last 
              photograph of a wild Barbary lion was taken in 1925 by a French pilot on the 
              Casablanca-Dakar route. He looked down, saw a lion walking through the rocks, 
              and photographed the end of an era.
            </p>
            <p className="text-lg leading-relaxed text-gray-700 mb-6">
              But that's not the end of the story. Conservationists are now working to return 
              the Barbary lion to the Atlas. The extinct is becoming the returning.
            </p>
            <p className="text-lg leading-relaxed text-gray-700">
              "Dancing with lions" means engaging with power and culture on its own terms. 
              Not conquering. Not saving. Not romanticizing. Witnessing — respecting the 
              rhythm without imposing your own.
            </p>
          </div>
        </div>
      </section>

      {/* The Scope */}
      <section className="border-b-2 border-black">
        <div className="max-w-[1400px] mx-auto px-6 py-16 md:py-24">
          <p className="text-xs uppercase tracking-[0.2em] text-accent font-medium mb-6">
            The Scope
          </p>
          <h2 className="font-black text-3xl md:text-4xl uppercase tracking-tight mb-12">
            What We Cover
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div>
              <h3 className="font-bold text-lg mb-3">North Africa</h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                Morocco, Tunisia, Egypt. Irrigation systems, desert navigation, Islamic geometry, textiles.
              </p>
            </div>
            <div>
              <h3 className="font-bold text-lg mb-3">East Africa</h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                Kenya, Ethiopia, Tanzania. Coffee origin, pastoralist cultures, conservation models, Swahili trade.
              </p>
            </div>
            <div>
              <h3 className="font-bold text-lg mb-3">Southern Africa</h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                Namibia, Botswana, South Africa. Rewilding, community conservation, San knowledge.
              </p>
            </div>
            <div>
              <h3 className="font-bold text-lg mb-3">West Africa</h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                Senegal, Mali, Ghana. Griots, gold routes, indigo dyeing, kente, music lineages.
              </p>
            </div>
            <div>
              <h3 className="font-bold text-lg mb-3">Middle East</h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                Oman, Jordan, Yemen. Frankincense, Bedouin navigation, falaj water systems, pearl diving.
              </p>
            </div>
            <div>
              <h3 className="font-bold text-lg mb-3">Central Asia</h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                Uzbekistan, Kyrgyzstan, Tajikistan. Silk Road crafts, ceramics, felt-making, eagle hunting.
              </p>
            </div>
            <div>
              <h3 className="font-bold text-lg mb-3">South Asia</h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                Pakistan, India, Nepal. Himalayan routes, Kashmir textiles, block printing, spice systems.
              </p>
            </div>
            <div>
              <h3 className="font-bold text-lg mb-3">Southeast Asia</h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                Indonesia, Vietnam, Myanmar. Rice engineering, lacquerware, fermentation, boat-building.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Founder */}
      <section className="border-b-2 border-black">
        <div className="max-w-[1400px] mx-auto px-6 py-16 md:py-24">
          <div className="max-w-3xl">
            <p className="text-xs uppercase tracking-[0.2em] text-accent font-medium mb-6">
              Founder
            </p>
            <h2 className="font-black text-3xl md:text-4xl uppercase tracking-tight mb-8">
              Jacqueline Ng
            </h2>
            <p className="text-lg leading-relaxed text-gray-700 mb-6">
              Mauritian-born. Canadian-trained. Based in Marrakech.
            </p>
            <p className="text-lg leading-relaxed text-gray-700 mb-6">
              Thirteen years in Morocco. Former marketing executive turned cultural intelligence 
              researcher. Documenting tourism that doesn't hurt — and building it herself.
            </p>
            <p className="text-lg leading-relaxed text-gray-700">
              Her work includes <Link href="https://houseofweaves.com" className="text-accent hover:underline">House of Weaves</Link> (ethnographic 
              textile archive), <Link href="https://slowmorocco.com" className="text-accent hover:underline">Slow World</Link> (cultural journeys 
              across five countries), and <Link href="/stories" className="text-accent hover:underline">the documentation archive</Link> (70+ 
              stories of systems, returns, and traditions).
            </p>
          </div>
        </div>
      </section>

      {/* Contact */}
      <section className="border-b-2 border-black">
        <div className="max-w-[1400px] mx-auto px-6 py-16 md:py-24">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div>
              <p className="text-xs uppercase tracking-[0.2em] text-accent font-medium mb-6">
                Contact
              </p>
              <h2 className="font-black text-3xl md:text-4xl uppercase tracking-tight mb-8">
                Get in Touch
              </h2>
              <p className="text-lg text-gray-600">
                Editorial — Marrakech
              </p>
              <p className="text-lg mt-4">
                <a 
                  href="mailto:editor@dancingwithlions.com" 
                  className="text-accent hover:underline"
                >
                  editor@dancingwithlions.com
                </a>
              </p>
            </div>
            <div className="flex flex-col justify-center">
              <p className="text-lg leading-relaxed text-gray-600">
                For press inquiries, collaboration proposals, or research partnerships.
              </p>
            </div>
          </div>
        </div>
      </section>

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
