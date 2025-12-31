import { notFound } from 'next/navigation';
import Link from 'next/link';
import { Metadata } from 'next';
import { getOpinions, getOpinionBySlug } from '@/lib/sheets';
import StoryBody from '@/components/StoryBody';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://dancingwiththelions.com';

interface PageProps {
  params: { slug: string };
}

export async function generateStaticParams() {
  const opinions = await getOpinions();
  return opinions.map((opinion) => ({ slug: opinion.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const opinion = await getOpinionBySlug(params.slug);
  if (!opinion) return { title: 'Opinion Not Found' };
  
  const title = `${opinion.title} | Dancing with Lions`;
  const description = opinion.excerpt || opinion.subtitle || `Read "${opinion.title}" — an opinion piece on conservation, hospitality, and care.`;
  const url = `${siteUrl}/opinion/${opinion.slug}`;
  
  return {
    title: opinion.title,
    description,
    keywords: opinion.tags ? opinion.tags.split(',').map(t => t.trim()) : undefined,
    authors: opinion.textBy ? [{ name: opinion.textBy }] : undefined,
    openGraph: {
      title,
      description,
      url,
      siteName: 'Dancing with Lions',
      locale: 'en_GB',
      type: 'article',
      authors: opinion.textBy ? [opinion.textBy] : undefined,
      section: 'Opinion',
      publishedTime: opinion.year ? `${opinion.year}-01-01` : undefined,
    },
    twitter: {
      card: 'summary',
      title,
      description,
    },
    alternates: {
      canonical: url,
    },
  };
}

export default async function OpinionPage({ params }: PageProps) {
  const opinion = await getOpinionBySlug(params.slug);
  
  if (!opinion) {
    notFound();
  }

  // Parse sources (separated by ;;)
  const sources = opinion.sources
    ? opinion.sources.split(';;').map((s) => s.trim()).filter(Boolean)
    : [];

  // Calculate word count for schema
  const wordCount = opinion.body ? opinion.body.split(/\s+/).length : 0;
  
  // Parse read time for schema
  const readTimeMatch = opinion.readTime?.match(/(\d+)/);
  const readTimeISO = readTimeMatch ? `PT${readTimeMatch[1]}M` : undefined;

  // Article Schema
  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'OpinionNewsArticle',
    headline: opinion.title,
    description: opinion.excerpt || opinion.subtitle,
    author: opinion.textBy ? {
      '@type': 'Person',
      name: opinion.textBy,
    } : undefined,
    publisher: {
      '@type': 'Organization',
      name: 'Dancing with Lions',
      logo: {
        '@type': 'ImageObject',
        url: `${siteUrl}/favicon.svg`,
      },
    },
    datePublished: opinion.year ? `${opinion.year}-01-01` : undefined,
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `${siteUrl}/opinion/${opinion.slug}`,
    },
    articleSection: 'Opinion',
    wordCount: wordCount > 0 ? wordCount : undefined,
    timeRequired: readTimeISO,
  };

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
        name: 'Opinion',
        item: `${siteUrl}/opinion`,
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: opinion.title,
        item: `${siteUrl}/opinion/${opinion.slug}`,
      },
    ],
  };

  return (
    <main className="min-h-screen bg-white">
      <Header />
      
      {/* Schema Markup */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      {/* Article - no hero image for Opinion */}
      <article className="max-w-3xl mx-auto px-6 pt-32 pb-16">
        {/* Breadcrumb Navigation */}
        <nav className="text-sm text-gray-600 mb-8" aria-label="Breadcrumb">
          <ol className="flex items-center gap-2">
            <li><Link href="/" className="hover:text-accent transition-colors">Home</Link></li>
            <li>/</li>
            <li><Link href="/opinion" className="hover:text-accent transition-colors">Opinion</Link></li>
            <li>/</li>
            <li className="text-foreground">{opinion.title}</li>
          </ol>
        </nav>

        {/* Meta */}
        <div className="flex items-center gap-3 text-meta text-gray-600 mb-6">
          <span className="uppercase tracking-wide">Opinion</span>
          <span>·</span>
          {opinion.readTime && <span>{opinion.readTime} read</span>}
        </div>

        {/* Title */}
        <h1 className="font-black text-4xl md:text-5xl lg:text-6xl leading-[0.95] tracking-tight mb-4">
          {opinion.title}
        </h1>

        {/* Subtitle */}
        {opinion.subtitle && (
          <p className="text-xl md:text-2xl text-gray-600 leading-relaxed mb-8">
            {opinion.subtitle}
          </p>
        )}

        <hr className="border-gray-200 mb-12" />

        {/* Body */}
        <StoryBody content={opinion.body} />

        {/* Sources */}
        {sources.length > 0 && (
          <>
            <hr className="border-gray-200 my-12" />
            <div className="text-sm text-gray-600">
              <h3 className="uppercase tracking-wide text-meta font-medium mb-4">Sources</h3>
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
        <footer className="text-sm text-gray-600 flex flex-wrap gap-x-4 gap-y-1">
          {opinion.textBy && <span>Text — {opinion.textBy}</span>}
          {opinion.year && <span>{opinion.year}</span>}
        </footer>

        {/* Back Link */}
        <div className="mt-12">
          <Link
            href="/opinion"
            className="inline-flex items-center gap-2 text-sm text-gray-600 hover:text-accent transition-colors"
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
              <polyline points="10,3 5,8 10,13" />
            </svg>
            All Opinion
          </Link>
        </div>
      </article>
      
      <Footer />
    </main>
  );
}
