import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { getLegalPage } from '@/lib/nexus'

export const dynamic = 'force-dynamic'

export default async function TermsPage() {
  const page = await getLegalPage('terms')

  return (
    <main className="min-h-screen bg-white">
      <Header />
      
      <article className="max-w-content mx-auto px-6 py-20">
        <h1 className="font-display text-4xl font-bold mb-8">
          {page?.title || 'Terms of Use'}
        </h1>
        
        <div className="prose prose-lg max-w-none text-gray-700 whitespace-pre-line">
          {page?.content || (
            <>
              <p>
                By using Dancing with Lions, you agree to these terms.
              </p>
              <h2 className="font-display text-xl font-bold mt-8 mb-4">Content</h2>
              <p>
                All content on this site is protected by copyright. You may share 
                links to our essays, but please don't republish full articles 
                without permission.
              </p>
              <h2 className="font-display text-xl font-bold mt-8 mb-4">Accuracy</h2>
              <p>
                We strive for accuracy and cite our sources. If you spot an error, 
                please let us know at editor@dancingwithlions.com.
              </p>
              <h2 className="font-display text-xl font-bold mt-8 mb-4">Images</h2>
              <p>
                Images on this site are a mix of commissioned photography and 
                AI-generated imagery created specifically for these essays. 
                They are not stock photos.
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
