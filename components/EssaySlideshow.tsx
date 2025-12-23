'use client'

import { useState, useEffect, useCallback } from 'react'
import Image from 'next/image'
import Link from 'next/link'

interface Slide {
  type: 'image' | 'text' | 'title' | 'credits'
  imageUrl?: string
  caption?: string
  title?: string
  subtitle?: string
  content?: string
  textBy?: string
  imagesBy?: string
  year?: string
  tags?: string[]
  sources?: string[]
  organizations?: { name: string; description?: string; url?: string }[]
}

interface EssaySlideshowProps {
  essay: {
    title: string
    subtitle?: string
    heroImage?: string
    heroCaption?: string
    body: string
    textBy?: string
    imagesBy?: string
    year?: string
    tags?: string
    sources?: string
    organizations?: string
  }
  images: {
    image_url: string
    caption: string
    image_order: number
  }[]
}

export default function EssaySlideshow({ essay, images }: EssaySlideshowProps) {
  const [currentSlide, setCurrentSlide] = useState(0)

  // Build slides array
  const slides: Slide[] = []

  // Slide 1: Hero image
  if (essay.heroImage) {
    slides.push({
      type: 'image',
      imageUrl: essay.heroImage,
      caption: essay.heroCaption,
    })
  }

  // Slide 2: Title
  slides.push({
    type: 'title',
    title: essay.title,
    subtitle: essay.subtitle,
  })

  // Parse body into paragraphs
  const paragraphs = essay.body
    .split('\n\n')
    .map(p => p.trim())
    .filter(p => p.length > 0)

  // Interleave text and images
  const sortedImages = [...images].sort((a, b) => a.image_order - b.image_order)
  
  let imageIndex = 0
  paragraphs.forEach((paragraph, i) => {
    // Add text slide (group 2-3 paragraphs together)
    if (i % 2 === 0) {
      const nextParagraph = paragraphs[i + 1] || ''
      slides.push({
        type: 'text',
        content: paragraph + (nextParagraph ? '\n\n' + nextParagraph : ''),
      })
    }
    
    // Add image after every 2 paragraphs
    if (i % 2 === 1 && sortedImages[imageIndex]) {
      slides.push({
        type: 'image',
        imageUrl: sortedImages[imageIndex].image_url,
        caption: sortedImages[imageIndex].caption,
      })
      imageIndex++
    }
  })

  // Add remaining images
  while (imageIndex < sortedImages.length) {
    slides.push({
      type: 'image',
      imageUrl: sortedImages[imageIndex].image_url,
      caption: sortedImages[imageIndex].caption,
    })
    imageIndex++
  }

  // Parse tags, sources, organizations for credits slide
  const tags = essay.tags
    ? essay.tags.split(',').map(t => t.trim()).filter(Boolean)
    : []

  const sources = essay.sources
    ? essay.sources.split(';;').filter(Boolean)
    : []

  const organizations = essay.organizations
    ? essay.organizations.split(';;').filter(Boolean).map(org => {
        const [name, description, url] = org.split('|')
        return { name, description, url }
      })
    : []

  // Final slide: Credits
  slides.push({
    type: 'credits',
    textBy: essay.textBy,
    imagesBy: essay.imagesBy,
    year: essay.year,
    tags,
    sources,
    organizations,
  })

  const totalSlides = slides.length

  const goToSlide = useCallback((index: number) => {
    setCurrentSlide(index)
  }, [])

  const nextSlide = useCallback(() => {
    if (currentSlide < totalSlides - 1) {
      goToSlide(currentSlide + 1)
    }
  }, [currentSlide, totalSlides, goToSlide])

  const prevSlide = useCallback(() => {
    if (currentSlide > 0) {
      goToSlide(currentSlide - 1)
    }
  }, [currentSlide, goToSlide])

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight' || e.key === ' ') {
        e.preventDefault()
        nextSlide()
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault()
        prevSlide()
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [nextSlide, prevSlide])

  const renderSlide = (slide: Slide, index: number) => {
    return (
      <div 
        key={index}
        className="w-full h-full flex-shrink-0"
      >
        {slide.type === 'image' && slide.imageUrl && (
          <div className="relative w-full h-full bg-black">
            <Image
              src={slide.imageUrl}
              alt={slide.caption || ''}
              fill
              className="object-cover"
              priority={index < 3}
            />
            {slide.caption && (
              <p className="absolute bottom-20 left-6 right-6 text-white/70 text-sm max-w-2xl">
                {slide.caption}
              </p>
            )}
          </div>
        )}

        {slide.type === 'title' && (
          <div className="w-full h-full flex items-center justify-center bg-white">
            <div className="max-w-4xl px-8 text-center">
              <h1 className="text-[clamp(3rem,10vw,8rem)] font-black leading-[0.85] tracking-tight uppercase text-black">
                {slide.title}
              </h1>
              {slide.subtitle && (
                <p className="mt-8 text-xl text-gray-500 tracking-wide uppercase">
                  {slide.subtitle}
                </p>
              )}
            </div>
          </div>
        )}

        {slide.type === 'text' && (
          <div className="w-full h-full flex items-center justify-center bg-white">
            <div className="max-w-2xl px-8">
              <p className="text-xl leading-relaxed text-gray-800 whitespace-pre-line" style={{ fontFamily: 'IBM Plex Mono, monospace' }}>
                {slide.content}
              </p>
            </div>
          </div>
        )}

        {slide.type === 'credits' && (
          <div className="w-full h-full flex items-center justify-center bg-white">
            <div className="max-w-2xl px-8 text-center">
              <div className="space-y-8">
                <div className="flex justify-center gap-12 text-sm text-gray-500">
                  {slide.textBy && <span>Text — {slide.textBy}</span>}
                  {slide.imagesBy && <span>Images — {slide.imagesBy}</span>}
                  {slide.year && <span>{slide.year}</span>}
                </div>

                {slide.tags && slide.tags.length > 0 && (
                  <div className="flex flex-wrap justify-center gap-3">
                    {slide.tags.map((tag, i) => (
                      <span key={i} className="text-xs uppercase tracking-[0.15em] text-gray-400">
                        {tag}
                      </span>
                    ))}
                  </div>
                )}

                {slide.sources && slide.sources.length > 0 && (
                  <div className="pt-8 border-t border-gray-200">
                    <h3 className="text-xs uppercase tracking-widest text-gray-400 mb-4">Sources</h3>
                    <div className="text-xs text-gray-500 space-y-1">
                      {slide.sources.map((source, i) => (
                        <p key={i}>{source}</p>
                      ))}
                    </div>
                  </div>
                )}

                {slide.organizations && slide.organizations.length > 0 && (
                  <div className="pt-8 border-t border-gray-200">
                    <h3 className="text-xs uppercase tracking-widest text-gray-400 mb-4">The Work Continues</h3>
                    <div className="space-y-4">
                      {slide.organizations.map((org, i) => (
                        <div key={i} className="text-sm">
                          <p className="font-semibold text-black">{org.name}</p>
                          {org.url && (
                            <a 
                              href={`https://${org.url}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-gray-500 hover:text-black"
                            >
                              {org.url}
                            </a>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                <div className="pt-12">
                  <Link
                    href="/essays"
                    className="inline-block px-8 py-3 bg-black text-white text-sm uppercase tracking-widest hover:bg-gray-800 transition-colors"
                  >
                    All Essays
                  </Link>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    )
  }

  return (
    <div className="fixed inset-0 bg-black overflow-hidden">
      {/* Navigation arrows */}
      {currentSlide > 0 && (
        <button
          onClick={prevSlide}
          className="absolute left-6 top-1/2 -translate-y-1/2 z-50 w-12 h-12 flex items-center justify-center text-white/60 hover:text-white transition-colors"
          aria-label="Previous slide"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M15 18l-6-6 6-6" />
          </svg>
        </button>
      )}
      
      {currentSlide < totalSlides - 1 && (
        <button
          onClick={nextSlide}
          className="absolute right-6 top-1/2 -translate-y-1/2 z-50 w-12 h-12 flex items-center justify-center text-white/60 hover:text-white transition-colors"
          aria-label="Next slide"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M9 18l6-6-6-6" />
          </svg>
        </button>
      )}

      {/* Page indicator */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-50 text-white/60 text-sm tracking-widest">
        <span className="font-bold text-white">{currentSlide + 1}</span>
        <span className="mx-2">of</span>
        <span>{totalSlides}</span>
      </div>

      {/* Close/Exit button */}
      <Link
        href="/essays"
        className="absolute top-6 right-6 z-50 text-white/60 hover:text-white transition-colors text-sm uppercase tracking-widest"
      >
        Close
      </Link>

      {/* Logo */}
      <Link
        href="/"
        className="absolute top-6 left-6 z-50 text-white/80 hover:text-white transition-colors font-black text-xl tracking-tight"
        style={{ fontFamily: 'Inter, sans-serif' }}
      >
        Dancing with Lions
      </Link>

      {/* Slides container - horizontal scroll */}
      <div 
        className="flex h-full transition-transform duration-700 ease-out"
        style={{ 
          width: `${totalSlides * 100}%`,
          transform: `translateX(-${currentSlide * (100 / totalSlides)}%)`
        }}
      >
        {slides.map((slide, index) => renderSlide(slide, index))}
      </div>

      {/* Click areas for navigation */}
      <div 
        className="absolute inset-y-0 left-0 w-1/4 cursor-pointer z-40"
        onClick={prevSlide}
      />
      <div 
        className="absolute inset-y-0 right-0 w-1/4 cursor-pointer z-40"
        onClick={nextSlide}
      />
    </div>
  )
}
