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
          ? 'bg-transparent border-transparent' 
          : 'bg-white border-b border-gray-200'
      }`}
    >
      <div className="max-w-[1400px] mx-auto px-6 py-5 flex items-center justify-between">
        <Link 
          href="/" 
          className={`font-display text-2xl font-semibold tracking-tight transition-colors duration-300 ${
            isTransparent ? 'text-white' : 'text-black'
          }`}
        >
          Dancing with Lions
        </Link>

        <nav className="hidden md:flex items-center gap-8">
          <Link 
            href="/essays" 
            className={`text-sm transition-colors ${
              isTransparent ? 'text-white hover:text-white/70' : 'text-gray-600 hover:text-black'
            }`}
          >
            Essays
          </Link>
          <Link 
            href="/about" 
            className={`text-sm transition-colors ${
              isTransparent ? 'text-white hover:text-white/70' : 'text-gray-600 hover:text-black'
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
            <span className={`w-full h-0.5 transition-all ${isTransparent ? 'bg-white' : 'bg-black'} ${menuOpen ? 'rotate-45 translate-y-2' : ''}`} />
            <span className={`w-full h-0.5 transition-all ${isTransparent ? 'bg-white' : 'bg-black'} ${menuOpen ? 'opacity-0' : ''}`} />
            <span className={`w-full h-0.5 transition-all ${isTransparent ? 'bg-white' : 'bg-black'} ${menuOpen ? '-rotate-45 -translate-y-2' : ''}`} />
          </div>
        </button>
      </div>

      {menuOpen && (
        <nav className="md:hidden bg-white border-t border-gray-200 px-6 py-4 space-y-4">
          <Link 
            href="/essays" 
            className="block text-lg"
            onClick={() => setMenuOpen(false)}
          >
            Essays
          </Link>
          <Link 
            href="/about" 
            className="block text-lg"
            onClick={() => setMenuOpen(false)}
          >
            About
          </Link>
        </nav>
      )}
    </header>
  )
}
