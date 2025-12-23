import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { getLegalPage } from '@/lib/nexus'

export const dynamic = 'force-dynamic'

export default async function PrivacyPage() {
  const page = await getLegalPage('privacy')

  return (
    <main className="min-h-screen bg-white">
      <Header />
      
      <article className="max-w-content mx-auto px-6 py-20">
        <h1 className="font-display text-4xl font-bold mb-8">
          {page?.title || 'Privacy Policy'}
        </h1>
        
        <div className="prose prose-lg max-w-none text-gray-700 whitespace-pre-line">
          {page?.content || (
            <>
              <p>
                Dancing with Lions respects your privacy. We collect minimal data 
                necessary to operate this publication.
              </p>
              <h2 className="font-display text-xl font-bold mt-8 mb-4">What We Collect</h2>
              <p>
                If you subscribe to our newsletter, we collect your email address. 
                That's it. We don't track you across the web, sell your data, or 
                share it with third parties.
              </p>
              <h2 className="font-display text-xl font-bold mt-8 mb-4">Analytics</h2>
              <p>
                We may use privacy-respecting analytics to understand how people 
                use this site. This data is aggregated and anonymous.
              </p>
              <h2 className="font-display text-xl font-bold mt-8 mb-4">Contact</h2>
              <p>
                Questions? Email editor@dancingwithlions.com
              </p>
            </>
          )}
        </div>

        {page?.lastUpdated && (
          <p className="text-sm text-gray-500 mt-12">
            Last updated: {page.lastUpdated}
          </p>
        )}
      </article>

      <Footer />
    </main>
  )
}
