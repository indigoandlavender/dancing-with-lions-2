'use client'

import { useState, useEffect, useCallback } from 'react'
import Image from 'next/image'
import Link from 'next/link'

interface Slide {
  type: 'image' | 'title' | 'credits'
  imageUrl?: string
  caption?: string
  text?: string
  title?: string
  subtitle?: string
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

  // Parse body text by [IMAGE:X] markers
  const parseBodyText = (body: string): Map<number, string> => {
    const textMap = new Map<number, string>()
    
    // Replace <br> tags with spaces, clean up
    const cleanBody = body
      .replace(/<br><br>/g, ' ')
      .replace(/<br>/g, ' ')
      .replace(/\s+/g, ' ')
      .trim()
    
    // Split by [IMAGE:X] pattern
    const parts = cleanBody.split(/\[IMAGE:\d+\]/)
    const markers = cleanBody.match(/\[IMAGE:(\d+)\]/g) || []
    
    // Text before first marker goes to hero (index 0)
    if (parts[0]?.trim()) {
      textMap.set(0, truncateText(parts[0].trim(), 180))
    }
    
    // Map remaining text to their image indices
    markers.forEach((marker, idx) => {
      const imageNum = parseInt(marker.match(/\d+/)?.[0] || '0')
      const textContent = parts[idx + 1]?.trim()
      if (textContent) {
        textMap.set(imageNum, truncateText(textContent, 180))
      }
    })
    
    return textMap
  }

  // Truncate text to character limit, ending at word boundary
  const truncateText = (text: string, maxLength: number): string => {
    if (text.length <= maxLength) return text
    const truncated = text.substring(0, maxLength)
    const lastSpace = truncated.lastIndexOf(' ')
    return truncated.substring(0, lastSpace) + '...'
  }

  const bodyTextMap = parseBodyText(essay.body)

  // Build slides array
  const slides: Slide[] = []

  // Slide 1: Hero image with intro text
  if (essay.heroImage) {
    slides.push({
      type: 'image',
      imageUrl: essay.heroImage,
      caption: essay.heroCaption,
      text: bodyTextMap.get(0),
    })
  }

  // Slide 2: Title
  slides.push({
    type: 'title',
    title: essay.title,
    subtitle: essay.subtitle,
  })

  // Slides 3+: All images from Images tab, in order, with corresponding text
  const sortedImages = [...images].sort((a, b) => a.image_order - b.image_order)
  sortedImages.forEach((img, idx) => {
    if (img.image_url) {
      slides.push({
        type: 'image',
        imageUrl: img.image_url,
        caption: img.caption,
        text: bodyTextMap.get(idx + 1), // IMAGE:1 corresponds to first image in Images tab
      })
    }
  })

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

  const nextSlide = useCallback(() => {
    if (currentSlide < totalSlides - 1) {
      setCurrentSlide(currentSlide + 1)
    }
  }, [currentSlide, totalSlides])

  const prevSlide = useCallback(() => {
    if (currentSlide > 0) {
      setCurrentSlide(currentSlide - 1)
    }
  }, [currentSlide])

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
        className="h-full flex-shrink-0"
        style={{ width: '100vw' }}
      >
        {slide.type === 'image' && slide.imageUrl && (
          <div className="relative w-full h-full bg-black">
            <Image
              src={slide.imageUrl}
              alt={slide.caption || ''}
              fill
              className="object-contain"
              priority={index < 3}
            />
            {/* Gradient overlay for text readability */}
            <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/90 via-black/50 to-transparent" />
            
            {/* Caption - title of the image */}
            {slide.caption && (
              <p className="absolute bottom-24 left-8 right-8 text-white text-xl md:text-2xl italic uppercase tracking-wide font-light">
                {slide.caption}
              </p>
            )}
            
            {/* Body text overlay - short excerpt */}
            {slide.text && (
              <div className="absolute bottom-8 left-8 right-8 max-w-2xl">
                <p className="text-white/70 text-sm leading-relaxed" style={{ fontFamily: 'IBM Plex Mono, monospace' }}>
                  {slide.text}
                </p>
              </div>
            )}
          </div>
        )}

        {slide.type === 'title' && (
          <div className="w-full h-full flex items-center justify-center bg-black">
            <div className="max-w-5xl px-8 text-center">
              <h1 className="text-[clamp(3rem,12vw,9rem)] font-black leading-[0.85] tracking-tight uppercase text-white">
                {slide.title}
              </h1>
              {slide.subtitle && (
                <p className="mt-8 text-xl text-white/60 tracking-wide uppercase">
                  {slide.subtitle}
                </p>
              )}
            </div>
          </div>
        )}

        {slide.type === 'credits' && (
          <div className="w-full h-full flex items-center justify-center bg-black">
            <div className="max-w-2xl px-8 text-center">
              <div className="space-y-8">
                <div className="flex justify-center gap-12 text-sm text-white/60">
                  {slide.textBy && <span>Text — {slide.textBy}</span>}
                  {slide.imagesBy && <span>Images — {slide.imagesBy}</span>}
                  {slide.year && <span>{slide.year}</span>}
                </div>

                {slide.tags && slide.tags.length > 0 && (
                  <div className="flex flex-wrap justify-center gap-3">
                    {slide.tags.map((tag, i) => (
                      <span key={i} className="text-xs uppercase tracking-[0.15em] text-white/40">
                        {tag}
                      </span>
                    ))}
                  </div>
                )}

                {slide.sources && slide.sources.length > 0 && (
                  <div className="pt-8 border-t border-white/20">
                    <h3 className="text-xs uppercase tracking-widest text-white/40 mb-4">Sources</h3>
                    <div className="text-xs text-white/50 space-y-1">
                      {slide.sources.map((source, i) => (
                        <p key={i}>{source}</p>
                      ))}
                    </div>
                  </div>
                )}

                {slide.organizations && slide.organizations.length > 0 && (
                  <div className="pt-8 border-t border-white/20">
                    <h3 className="text-xs uppercase tracking-widest text-white/40 mb-4">The Work Continues</h3>
                    <div className="space-y-4">
                      {slide.organizations.map((org, i) => (
                        <div key={i} className="text-sm">
                          <p className="font-semibold text-white">{org.name}</p>
                          {org.url && (
                            <a 
                              href={`https://${org.url}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-[#C93C20] hover:text-[#E04D2D]"
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
                    className="inline-block px-8 py-3 bg-white text-black text-sm uppercase tracking-widest hover:bg-white/90 transition-colors"
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
          className="absolute left-6 top-1/2 -translate-y-1/2 z-50 w-12 h-12 flex items-center justify-center text-white/50 hover:text-white transition-colors"
          aria-label="Previous slide"
        >
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M15 18l-6-6 6-6" />
          </svg>
        </button>
      )}
      
      {currentSlide < totalSlides - 1 && (
        <button
          onClick={nextSlide}
          className="absolute right-6 top-1/2 -translate-y-1/2 z-50 w-12 h-12 flex items-center justify-center text-white/50 hover:text-white transition-colors"
          aria-label="Next slide"
        >
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M9 18l6-6-6-6" />
          </svg>
        </button>
      )}

      {/* Page indicator */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-50 text-white/50 text-sm tracking-widest">
        <span className="font-bold text-white">{currentSlide + 1}</span>
        <span className="mx-2">of</span>
        <span>{totalSlides}</span>
      </div>

      {/* Close/Exit button */}
      <Link
        href="/essays"
        className="absolute top-6 right-6 z-50 text-white/50 hover:text-white transition-colors text-sm uppercase tracking-widest"
      >
        Close
      </Link>

      {/* Logo */}
      <Link
        href="/"
        className="absolute top-6 left-6 z-50 text-white/70 hover:text-white transition-colors font-black text-xl tracking-tight"
        style={{ fontFamily: 'Inter, sans-serif' }}
      >
        Dancing with Lions
      </Link>

      {/* Slides container - horizontal scroll */}
      <div 
        className="flex h-full transition-transform duration-700 ease-out"
        style={{ 
          transform: `translateX(-${currentSlide * 100}vw)`
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
