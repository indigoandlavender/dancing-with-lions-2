import Link from 'next/link'
import Image from 'next/image'

interface EssayCardProps {
  slug: string
  title: string
  subtitle: string
  heroImage?: string
  featured?: boolean
}

export default function EssayCard({ 
  slug, 
  title, 
  subtitle, 
  heroImage,
  featured = false 
}: EssayCardProps) {
  return (
    <article className="group">
      <Link href={`/essay/${slug}`} className="block">
        <div className={`relative overflow-hidden bg-gray-100 ${featured ? 'aspect-[4/5]' : 'aspect-[3/4]'}`}>
          {heroImage ? (
            <Image
              src={heroImage}
              alt={title}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-700"
            />
          ) : (
            <div className="absolute inset-0 bg-gradient-to-br from-gray-200 to-gray-300 group-hover:scale-105 transition-transform duration-700" />
          )}
        </div>
        
        <h3 
          className={`font-black uppercase tracking-tight leading-none mt-4 mb-2 group-hover:text-[#C93C20] transition-colors ${featured ? 'text-3xl' : 'text-2xl'}`}
          style={{ fontFamily: 'Inter, sans-serif' }}
        >
          {title}
        </h3>
        
        {subtitle && (
          <p className="text-sm text-gray-500 uppercase tracking-wide">
            {subtitle}
          </p>
        )}
      </Link>
    </article>
  )
}
