import { Metadata } from 'next';
import { getStories } from '@/lib/sheets';
import StoryCard from '@/components/StoryCard';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://dancingwiththelions.com';

export const metadata: Metadata = {
  title: 'Stories',
  description: 'Deep-dive articles exploring the symbiosis of conservation, culture, and technology across Africa, the Middle East, and Asia.',
  keywords: ['conservation stories', 'wildlife articles', 'cultural preservation', 'indigenous knowledge', 'environmental symbiosis'],
  openGraph: {
    title: 'Stories | Dancing with Lions',
    description: 'Deep-dive articles exploring the symbiosis of conservation, culture, and technology across Africa, the Middle East, and Asia.',
    url: `${siteUrl}/stories`,
    siteName: 'Dancing with Lions',
    locale: 'en_GB',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Stories | Dancing with Lions',
    description: 'Deep-dive articles exploring conservation and cultural preservation.',
  },
  alternates: {
    canonical: `${siteUrl}/stories`,
  },
};

export default async function StoriesPage() {
  const stories = await getStories();
  
  const sortedStories = stories.sort((a, b) => {
    const orderA = parseInt(a.order) || 999;
    const orderB = parseInt(b.order) || 999;
    return orderA - orderB;
  });

  // Breadcrumb Schema
  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: siteUrl,
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Stories',
        item: `${siteUrl}/stories`,
      },
    ],
  };

  // CollectionPage Schema
  const collectionSchema = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: 'Stories | Dancing with Lions',
    description: 'Deep-dive articles exploring conservation and cultural preservation.',
    url: `${siteUrl}/stories`,
    mainEntity: {
      '@type': 'ItemList',
      numberOfItems: sortedStories.length,
      itemListElement: sortedStories.slice(0, 20).map((story, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        url: `${siteUrl}/story/${story.slug}`,
        name: story.title,
      })),
    },
  };

  return (
    <main className="min-h-screen bg-white">
      <Header />
      
      {/* Schema Markup */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionSchema) }}
      />

      {/* Page Header */}
      <section className="border-b-2 border-black">
        <div className="max-w-[1400px] mx-auto px-6 py-16">
          <h1 className="font-display text-[clamp(3rem,10vw,6rem)] font-bold leading-[0.9] tracking-[-0.03em]">
            STORIES
          </h1>
          <p className="mt-6 font-display text-xl italic text-gray-600 max-w-2xl">
            The ancient wisdom, modern technology, and living bonds between cultures and their wild companions.
          </p>
        </div>
      </section>

      {/* Stories Grid */}
      <section className="max-w-[1400px] mx-auto px-6 py-16">
        {sortedStories.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12">
            {sortedStories.map((story) => (
              <StoryCard key={story.slug} story={story} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <p className="text-gray-600">Stories coming soon.</p>
          </div>
        )}
      </section>

      <Footer />
    </main>
  );
}
