import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { getLegalPageBySlug } from '@/lib/nexus'

export const dynamic = 'force-dynamic'
export const revalidate = 0

export default async function PrivacyPage() {
  const page = await getLegalPageBySlug('privacy')

  return (
    <main className="min-h-screen bg-white">
      <Header />
      
      {/* Page Header */}
      <section className="border-b border-gray-200">
        <div className="max-w-[1400px] mx-auto px-6 py-12">
          <h1 className="font-display text-3xl font-bold">
            {page?.title || 'Privacy Policy'}
          </h1>
        </div>
      </section>

      {/* Content */}
      <section className="max-w-content mx-auto px-6 py-12">
        <div className="prose prose-gray max-w-none">
          {page?.content ? (
            <div 
              className="text-gray-600 leading-relaxed whitespace-pre-line"
              dangerouslySetInnerHTML={{ __html: page.content }}
            />
          ) : (
            <p className="text-gray-600">
              Privacy policy content will be loaded from Nexus.
            </p>
          )}
        </div>
      </section>

      <Footer />
    </main>
  )
}
