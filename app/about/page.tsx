import Header from '@/components/Header'
import Footer from '@/components/Footer'

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-white">
      <Header />
      
      <article className="max-w-content mx-auto px-6 py-20">
        {/* Title */}
        <h1 className="font-display text-title font-bold leading-[0.95] mb-12">
          About
        </h1>

        <div className="essay-content">
          <p>
            Dancing with Lions is a publication about the stories behind places — 
            mythology, hidden history, cultural connections. The layer underneath 
            tourism that makes places make sense.
          </p>

          <p>
            Roman emperors shipped Barbary lions from the Atlas to die in the 
            Colosseum. Escaped slaves climbed Le Morne because the cliffs were 
            too sheer for the French to follow. Berber engineers carved thirty 
            kilometers of tunnels through rock, in the dark, listening for water.
          </p>

          <p>
            These aren't obscure facts. You can find them on Wikipedia. But the 
            telling matters. The rhythm, the tension, the reveal — that's the craft. 
            That's what makes someone read to the end and send the link to a friend.
          </p>

          <p>
            We're not preservationists. We're not activists. We're not carrying 
            anyone's burden. We're storytellers who do the digging. We go into the 
            archives, the footnotes, the conversations, the places — and we pull 
            out the story that makes someone say "I had no idea."
          </p>

          <p>
            Every claim has receipts. Sources in the footer. The stories are alive, 
            but the facts are solid.
          </p>

          <hr className="border-t border-gray-200 my-12" />

          <h2 className="font-display text-2xl font-bold mb-6" id="contact">
            Contact
          </h2>

          <p>
            Editorial inquiries: <a href="mailto:editor@dancingwithlions.com" className="text-accent hover:underline">editor@dancingwithlions.com</a>
          </p>

          <p className="text-gray-500 text-sm mt-8">
            Based in Marrakech.
          </p>
        </div>
      </article>

      <Footer />
    </main>
  )
}
