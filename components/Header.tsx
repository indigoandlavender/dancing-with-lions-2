'use client'

import Link from 'next/link'
import { useState, useEffect } from 'react'

interface HeaderProps {
  transparent?: boolean
}

export default function Header({ transparent = false }: HeaderProps) {
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    if (!transparent) return

    const handleScroll = () => {
      setScrolled(window.scrollY > 100)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [transparent])

  const isTransparent = transparent && !scrolled && !menuOpen

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isTransparent 
          ? 'bg-transparent' 
          : 'bg-white border-b-2 border-black'
      }`}
    >
      <div className="max-w-[1400px] mx-auto px-6 py-4 flex items-center justify-between">
        <Link 
          href="/" 
          className={`font-black text-2xl md:text-3xl tracking-tight uppercase transition-colors duration-300 ${
            isTransparent ? 'text-white' : 'text-black'
          }`}
        >
          Dancing with Lions
        </Link>

        <nav className="hidden md:flex items-center gap-8">
          <Link 
            href="/essays" 
            className={`text-xs font-bold uppercase tracking-[0.15em] transition-colors ${
              isTransparent ? 'text-white hover:text-white/70' : 'text-black hover:text-accent'
            }`}
          >
            Essays
          </Link>
          <Link 
            href="/stories" 
            className={`text-xs font-bold uppercase tracking-[0.15em] transition-colors ${
              isTransparent ? 'text-white hover:text-white/70' : 'text-black hover:text-accent'
            }`}
          >
            Stories
          </Link>
          <Link 
            href="/opinion" 
            className={`text-xs font-bold uppercase tracking-[0.15em] transition-colors ${
              isTransparent ? 'text-white hover:text-white/70' : 'text-black hover:text-accent'
            }`}
          >
            Opinion
          </Link>
          <Link 
            href="/about" 
            className={`text-xs font-bold uppercase tracking-[0.15em] transition-colors ${
              isTransparent ? 'text-white hover:text-white/70' : 'text-black hover:text-accent'
            }`}
          >
            About
          </Link>
        </nav>

        <button 
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden p-2"
          aria-label="Toggle menu"
        >
          <div className="w-6 h-5 flex flex-col justify-between">
            <span className={`w-full h-0.5 transition-all origin-center ${isTransparent ? 'bg-white' : 'bg-black'} ${menuOpen ? 'rotate-45 translate-y-[9px]' : ''}`} />
            <span className={`w-full h-0.5 transition-all ${isTransparent ? 'bg-white' : 'bg-black'} ${menuOpen ? 'opacity-0' : ''}`} />
            <span className={`w-full h-0.5 transition-all origin-center ${isTransparent ? 'bg-white' : 'bg-black'} ${menuOpen ? '-rotate-45 -translate-y-[9px]' : ''}`} />
          </div>
        </button>
      </div>

      {/* Mobile Menu */}
      <div className={`md:hidden bg-white border-b-2 border-black overflow-hidden transition-all duration-300 ${
        menuOpen ? 'max-h-64' : 'max-h-0'
      }`}>
        <nav className="px-6 py-6 space-y-4">
          <Link 
            href="/essays" 
            className="block text-lg font-bold uppercase tracking-wider"
            onClick={() => setMenuOpen(false)}
          >
            Essays
          </Link>
          <Link 
            href="/stories" 
            className="block text-lg font-bold uppercase tracking-wider"
            onClick={() => setMenuOpen(false)}
          >
            Stories
          </Link>
          <Link 
            href="/opinion" 
            className="block text-lg font-bold uppercase tracking-wider"
            onClick={() => setMenuOpen(false)}
          >
            Opinion
          </Link>
          <Link 
            href="/about" 
            className="block text-lg font-bold uppercase tracking-wider"
            onClick={() => setMenuOpen(false)}
          >
            About
          </Link>
        </nav>
      </div>
    </header>
  )
}
