import Header from '@/components/Header'
import Footer from '@/components/Footer'

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
          <p className="mt-8 text-xl text-gray-600 max-w-2xl">
            A think tank documenting the crisis in hospitality and tourism.
          </p>
        </div>
      </section>

      {/* The Crisis */}
      <section className="border-b-2 border-black bg-black text-white">
        <div className="max-w-[1400px] mx-auto px-6 py-16 md:py-24">
          <div className="max-w-3xl">
            <p className="text-xs uppercase tracking-[0.2em] text-accent font-medium mb-6">
              The Crisis
            </p>
            <h2 className="font-black text-[clamp(1.75rem,4vw,3rem)] leading-[1] tracking-tight uppercase mb-8">
              Something has to give.
            </h2>
            <p className="text-xl leading-relaxed text-gray-300 mb-6">
              100% annual turnover in hotels. 87% of hospitality workers bullied by customers. Tourist expectations rising — five-star experience at budget prices. Tourism bureaus chasing volume, GDP, the macro numbers. Overtourism drowning destinations. The coral dying. The lions disappearing.
            </p>
            <p className="text-lg leading-relaxed text-gray-400">
              We are all responsible. Every single one of us — the travelers, the hosts, the platforms, the bureaus. Pointing fingers is futile.
            </p>
          </div>
        </div>
      </section>

      {/* Who We Are */}
      <section className="border-b-2 border-black">
        <div className="max-w-[1400px] mx-auto px-6 py-16 md:py-24">
          <div className="max-w-3xl">
            <p className="text-xs uppercase tracking-[0.2em] text-accent font-medium mb-6">
              Who We Are
            </p>
            <h2 className="font-black text-3xl md:text-4xl uppercase tracking-tight mb-8">
              Observers
            </h2>
            <p className="text-lg leading-relaxed text-gray-700 mb-6">
              Dancing with Lions doesn't pretend to have the solution. We are observers.
            </p>
            <p className="text-lg leading-relaxed text-gray-700 mb-6">
              Our founding members work in hospitality and feel the pain. We are travelers sick of the performative culture — the hospitality that's on the menu but never on the plate.
            </p>
            <p className="text-lg leading-relaxed text-gray-700">
              We gather the data nobody else is compiling. We document what we see. We ask if there's a better way.
            </p>
          </div>
        </div>
      </section>

      {/* What We Do */}
      <section className="border-b-2 border-black bg-gray-100">
        <div className="max-w-[1400px] mx-auto px-6 py-16 md:py-24">
          <div className="max-w-3xl">
            <p className="text-xs uppercase tracking-[0.2em] text-accent font-medium mb-6">
              What We Do
            </p>
            <h2 className="font-black text-3xl md:text-4xl uppercase tracking-tight mb-8">
              Research. Data. The Question.
            </h2>
            <div className="space-y-8">
              <div>
                <h3 className="font-bold text-xl mb-2">Research</h3>
                <p className="text-gray-700 leading-relaxed">
                  Original data nobody else is compiling. Sentiment analysis from Booking, Airbnb, TripAdvisor reviews. Forum scraping — what hosts and workers are really saying. Industry deep-dives. The numbers behind the crisis.
                </p>
              </div>
              <div>
                <h3 className="font-bold text-xl mb-2">Index</h3>
                <p className="text-gray-700 leading-relaxed">
                  Metrics we track over time. Host burnout. Overtourism pressure. Greenwash scores. Living data, updated regularly, so we can see what's getting better and what's getting worse.
                </p>
              </div>
              <div>
                <h3 className="font-bold text-xl mb-2">Stories</h3>
                <p className="text-gray-700 leading-relaxed">
                  Visual documentation of the research. Beautiful writing, beautiful images. The data made human.
                </p>
              </div>
              <div>
                <h3 className="font-bold text-xl mb-2">Opinion</h3>
                <p className="text-gray-700 leading-relaxed">
                  Positions backed by data. What the research means. What's broken and what might work.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* The Question */}
      <section className="border-b-2 border-black">
        <div className="max-w-[1400px] mx-auto px-6 py-16 md:py-24">
          <div className="max-w-3xl">
            <p className="text-xs uppercase tracking-[0.2em] text-accent font-medium mb-6">
              The Question
            </p>
            <h2 className="font-black text-[clamp(2rem,5vw,4rem)] leading-[0.95] tracking-tight uppercase mb-8">
              Is there a better way?
            </h2>
            <p className="text-xl leading-relaxed text-gray-700 mb-6">
              Travel is not just Instagram filtered photos. Flip them over and you'll see the tears behind the smiles. The housekeeper who can't afford rent. The guide performing enthusiasm for the hundredth time. The reef they're standing on, bleaching.
            </p>
            <p className="text-xl leading-relaxed text-gray-700">
              There must be a better way. To travel. To host. To share a place without destroying it. To welcome someone without burning out. We don't have the answer. But we're paying attention to the people who might.
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
              The Barbary lion vanished from the Atlas Mountains in the 1960s. Forty survive in Rabat Zoo — descendants of the royal menagerie. The last photograph of a wild Barbary lion was taken in 1925 by a French pilot. He looked down, saw a lion walking through the rocks, and photographed the end of an era.
            </p>
            <p className="text-lg leading-relaxed text-gray-700 mb-6">
              But that's not the end of the story. Conservationists are working to return the Barbary lion to the Atlas. The extinct is becoming the returning.
            </p>
            <p className="text-lg leading-relaxed text-gray-700">
              "Dancing with lions" means engaging with something powerful on its own terms. Not conquering. Not saving. Not romanticizing. Just paying attention — and asking if there's a better way.
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
                For press inquiries, data partnerships, research collaboration, or if you've found a better way and want to share it.
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
              Research updates. New data. The question, ongoing. No spam.
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
