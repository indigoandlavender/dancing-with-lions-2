import Header from '@/components/Header'
import Footer from '@/components/Footer'

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-white">
      <Header />
      
      {/* Page Header */}
      <section className="border-b-2 border-black">
        <div className="max-w-[1400px] mx-auto px-6 py-16 md:py-24">
          <h1 className="font-display text-[clamp(3rem,10vw,6rem)] font-bold leading-[0.9] tracking-[-0.03em]">
            ABOUT
          </h1>
        </div>
      </section>

      {/* Content */}
      <section className="max-w-content mx-auto px-6 py-16">
        <div className="prose prose-lg">
          <p className="text-xl leading-relaxed text-gray-700 mb-8">
            <strong className="font-display">Dancing with Lions</strong> is a publication about 
            the stories behind places — mythology, hidden history, cultural connections. 
            The layer underneath tourism that makes places make sense.
          </p>
          
          <p className="text-lg leading-relaxed text-gray-600 mb-8">
            We cover everywhere the knowledge lives — from the Atlas Mountains to the Silk Road, 
            from the Sahara to the Himalaya. Not travel tips. Not top-ten lists. Just the stories 
            that make you understand why places haunt you after you leave.
          </p>

          <hr className="border-t border-gray-200 my-12" />

          <h2 className="font-display text-2xl font-bold mb-6">The Name</h2>
          
          <p className="text-lg leading-relaxed text-gray-600 mb-8">
            "Dancing with lions" means engaging with power and culture on its own terms. 
            Not conquering. Not saving. Not romanticizing. Just witnessing — respecting 
            the rhythm without imposing your own.
          </p>
          
          <p className="text-lg leading-relaxed text-gray-600 mb-8">
            The Barbary lion vanished from the Atlas Mountains in the 1960s, but forty 
            survive in Rabat Zoo from the royal menagerie. The last visual proof of a 
            wild Barbary lion is a 1925 aerial photograph taken by a French pilot on the 
            Casablanca-Dakar route. He looked down, saw a lion walking through the rocks, 
            and photographed the end of an era.
          </p>

          <hr className="border-t border-gray-200 my-12" />

          <h2 className="font-display text-2xl font-bold mb-6" id="contact">Contact</h2>
          
          <p className="text-lg leading-relaxed text-gray-600">
            Editorial — Marrakech<br />
            Inquiries — <a href="mailto:editor@dancingwiththelions.com" className="text-accent hover:underline">editor@dancingwiththelions.com</a>
          </p>
        </div>
      </section>

      <Footer />
    </main>
  )
}
