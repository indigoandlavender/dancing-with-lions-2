import Link from 'next/link';
import Image from 'next/image';
import { Story } from '@/lib/sheets';

interface StoryCardProps {
  story: Story;
}

export default function StoryCard({ story }: StoryCardProps) {
  return (
    <Link href={`/story/${story.slug}`} className="group block">
      {/* Image */}
      <div className="relative aspect-[4/5] mb-4 overflow-hidden bg-gray-100">
        {story.heroImage ? (
          <Image
            src={story.heroImage}
            alt={story.title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <span className="text-gray-400 text-sm">No image</span>
          </div>
        )}
      </div>

      {/* Content */}
      <div>
        {story.category && (
          <span className="text-meta uppercase tracking-wide text-gray-600 mb-2 block">
            {story.category}
          </span>
        )}
        <h3 className="font-display text-xl text-foreground mb-2 group-hover:text-accent transition-colors tracking-tight">
          {story.title}
        </h3>
        {story.excerpt && (
          <p className="text-sm text-gray-600 line-clamp-2">
            {story.excerpt}
          </p>
        )}
      </div>
    </Link>
  );
}
