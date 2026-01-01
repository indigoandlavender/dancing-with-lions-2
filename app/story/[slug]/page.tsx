import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { Metadata } from 'next';
import { getStories, getStoryBySlug, getStoryImages } from '@/lib/sheets';
import StoryBody from '@/components/StoryBody';
import Gallery from '@/components/Gallery';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://dancingwithlions.com';

interface PageProps {
  params: { slug: string };
}

export async function generateStaticParams() {
  const stories = await getStories();
  return stories.map((story) => ({ slug: story.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const story = await getStoryBySlug(params.slug);
  if (!story) return { title: 'Story Not Found' };
  
  const title = `${story.title} | Dancing with Lions`;
  const description = story.excerpt || story.subtitle || story.title;
  
  return {
    title: story.title,
    description,
    openGraph: {
      title,
      description,
      images: story.heroImage ? [{ url: story.heroImage }] : undefined,
    },
  };
}

export default async function StoryPage({ params }: PageProps) {
  const story = await getStoryBySlug(params.slug);
  
  if (!story) {
    notFound();
  }

  const galleryImages = await getStoryImages(params.slug);

  // Parse sources (separated by ;;)
  const sources = story.sources
    ? story.sources.split(';;').map((s) => s.trim()).filter(Boolean)
    : [];

  return (
    <main className="min-h-screen bg-white">
      {/* Minimal Header */}
      <header className="border-b-2 border-black">
        <div className="max-w-[1400px] mx-auto px-6 py-6">
          <Link href="/" className="font-black text-2xl md:text-3xl tracking-tight uppercase">
            Dancing with Lions
          </Link>
        </div>
      </header>

      {/* Hero Image */}
      {story.heroImage && (
        <section className="relative w-full h-[60vh] md:h-[70vh]">
          <Image
            src={story.heroImage}
            alt={story.title}
            fill
            className="object-cover"
            priority
          />
          {story.heroCaption && (
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-6">
              <p className="text-white/80 text-sm max-w-4xl mx-auto">
                {story.heroCaption}
              </p>
            </div>
          )}
        </section>
      )}

      {/* Article */}
      <article className="max-w-3xl mx-auto px-6 py-16">
        {/* Meta */}
        {story.category && (
          <p className="text-xs uppercase tracking-[0.15em] text-gray-500 mb-4">
            {story.category}
          </p>
        )}

        {/* Title */}
        <h1 className="font-black text-4xl md:text-5xl leading-[0.95] tracking-tight mb-4">
          {story.title}
        </h1>

        {/* Subtitle */}
        {story.subtitle && (
          <p className="text-xl text-gray-600 italic mb-8">
            {story.subtitle}
          </p>
        )}

        <hr className="border-gray-200 mb-12" />

        {/* Body */}
        <StoryBody content={story.body} />

        {/* Gallery */}
        {galleryImages.length > 0 && (
          <>
            <hr className="border-gray-200 my-12" />
            <Gallery images={galleryImages} />
          </>
        )}

        {/* Sources */}
        {sources.length > 0 && (
          <>
            <hr className="border-gray-200 my-12" />
            <div className="text-sm text-gray-600">
              <h3 className="uppercase tracking-wide text-xs font-medium mb-4">Sources</h3>
              <ul className="space-y-2">
                {sources.map((source, index) => (
                  <li key={index}>{source}</li>
                ))}
              </ul>
            </div>
          </>
        )}

        {/* Footer */}
        <hr className="border-gray-200 my-12" />
        <footer className="text-sm text-gray-500 flex flex-wrap gap-x-4 gap-y-1">
          {story.textBy && <span>Text — {story.textBy}</span>}
          {story.imagesBy && <span>Images — {story.imagesBy}</span>}
          {story.year && <span>{story.year}</span>}
        </footer>

        {/* Back Link */}
        <div className="mt-12">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-black transition-colors"
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
              <polyline points="10,3 5,8 10,13" />
            </svg>
            Back
          </Link>
        </div>
      </article>

      {/* Minimal Footer */}
      <footer className="border-t-2 border-black">
        <div className="max-w-[1400px] mx-auto px-6 py-6 flex justify-between items-center">
          <p className="text-sm text-gray-500">
            © {new Date().getFullYear()}
          </p>
          <p className="text-sm text-gray-500">
            Marrakech
          </p>
        </div>
      </footer>
    </main>
  );
}
