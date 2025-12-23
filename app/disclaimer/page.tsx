import { notFound } from 'next/navigation'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { getLegalPage } from '@/lib/nexus'

export const dynamic = 'force-dynamic'
export const revalidate = 0

export const metadata = {
  title: 'Disclaimer — Dancing with Lions',
}

export default async function DisclaimerPage() {
  const page = await getLegalPage('disclaimer')
  
  if (!page) {
    notFound()
  }

  return (
    <main className="min-h-screen bg-white">
      <Header />
      
      <article className="max-w-content mx-auto px-6 py-24">
        <h1 className="text-4xl font-black tracking-tight mb-8">{page.title}</h1>
        
        <div className="prose prose-lg max-w-none space-y-8 text-gray-700">
          {page.sections.map((section, index) => (
            <section key={index}>
              <h2 className="text-xl font-bold text-black mt-8 mb-4">{section.title}</h2>
              <p>{section.content}</p>
            </section>
          ))}
        </div>
      </article>

      <Footer />
    </main>
  )
}
