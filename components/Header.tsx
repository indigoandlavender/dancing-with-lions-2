'use client'

import Link from 'next/link'
import { useState } from 'react'

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <header className="border-b border-gray-200">
      <div className="max-w-[1400px] mx-auto px-6 py-4 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-3 group">
          <svg 
            width="32" 
            height="32" 
            viewBox="0 0 100 100" 
            className="text-accent"
            fill="currentColor"
          >
            <path d="M50 5C35 5 25 15 20 25C15 35 15 45 20 55L15 60C10 55 5 60 5 70C5 80 15 85 20 80L25 75C30 85 40 95 50 95C60 95 70 85 75 75L80 80C85 85 95 80 95 70C95 60 90 55 85 60L80 55C85 45 85 35 80 25C75 15 65 5 50 5ZM35 40C38 40 40 43 40 47C40 51 38 55 35 55C32 55 30 51 30 47C30 43 32 40 35 40ZM65 40C68 40 70 43 70 47C70 51 68 55 65 55C62 55 60 51 60 47C60 43 62 40 65 40ZM50 60C45 60 40 65 40 70C45 75 55 75 60 70C60 65 55 60 50 60Z"/>
          </svg>
          <span className="font-display text-lg font-bold tracking-tight">
            DANCING WITH LIONS
          </span>
        </Link>

        <nav className="hidden md:flex items-center gap-8">
          <Link 
            href="/essays" 
            className="text-sm font-medium uppercase tracking-wider hover:text-accent transition-colors"
          >
            Essays
          </Link>
          <Link 
            href="/about" 
            className="text-sm font-medium uppercase tracking-wider hover:text-accent transition-colors"
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
            <span className={`w-full h-0.5 bg-black transition-transform ${menuOpen ? 'rotate-45 translate-y-2' : ''}`} />
            <span className={`w-full h-0.5 bg-black transition-opacity ${menuOpen ? 'opacity-0' : ''}`} />
            <span className={`w-full h-0.5 bg-black transition-transform ${menuOpen ? '-rotate-45 -translate-y-2' : ''}`} />
          </div>
        </button>
      </div>

      {menuOpen && (
        <nav className="md:hidden border-t border-gray-200 px-6 py-4 space-y-4">
          <Link 
            href="/essays" 
            className="block text-lg font-medium"
            onClick={() => setMenuOpen(false)}
          >
            Essays
          </Link>
          <Link 
            href="/about" 
            className="block text-lg font-medium"
            onClick={() => setMenuOpen(false)}
          >
            About
          </Link>
        </nav>
      )}
    </header>
  )
}
