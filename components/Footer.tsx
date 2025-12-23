import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="bg-white border-t-2 border-black">
      {/* Main Footer */}
      <div className="max-w-[1400px] mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          
          {/* Brand */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <svg 
                width="28" 
                height="28" 
                viewBox="0 0 100 100" 
                className="text-accent"
                fill="currentColor"
              >
                <path d="M50 5C35 5 25 15 20 25C15 35 15 45 20 55L15 60C10 55 5 60 5 70C5 80 15 85 20 80L25 75C30 85 40 95 50 95C60 95 70 85 75 75L80 80C85 85 95 80 95 70C95 60 90 55 85 60L80 55C85 45 85 35 80 25C75 15 65 5 50 5ZM35 40C38 40 40 43 40 47C40 51 38 55 35 55C32 55 30 51 30 47C30 43 32 40 35 40ZM65 40C68 40 70 43 70 47C70 51 68 55 65 55C62 55 60 51 60 47C60 43 62 40 65 40ZM50 60C45 60 40 65 40 70C45 75 55 75 60 70C60 65 55 60 50 60Z"/>
              </svg>
              <span className="font-display text-lg font-bold">DANCING WITH LIONS</span>
            </div>
            <p className="text-gray-600 max-w-sm leading-relaxed">
              The stories underneath the map. Mythology, hidden history, 
              cultural connections — the layer beneath the guidebook.
            </p>
          </div>

          {/* Essays */}
          <div>
            <h4 className="font-display font-bold text-sm uppercase tracking-wider mb-4">
              Essays
            </h4>
            <ul className="space-y-2 text-gray-600">
              <li>
                <Link href="/essays?category=returns" className="hover:text-accent transition-colors">
                  Returns
                </Link>
              </li>
              <li>
                <Link href="/essays?category=systems" className="hover:text-accent transition-colors">
                  Systems
                </Link>
              </li>
              <li>
                <Link href="/essays?category=essays" className="hover:text-accent transition-colors">
                  All Essays
                </Link>
              </li>
            </ul>
          </div>

          {/* About */}
          <div>
            <h4 className="font-display font-bold text-sm uppercase tracking-wider mb-4">
              About
            </h4>
            <ul className="space-y-2 text-gray-600">
              <li>
                <Link href="/about" className="hover:text-accent transition-colors">
                  The Publication
                </Link>
              </li>
              <li>
                <Link href="/about#contact" className="hover:text-accent transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Legal Bar */}
      <div className="border-t border-gray-200">
        <div className="max-w-[1400px] mx-auto px-6 py-4 flex flex-col sm:flex-row justify-between items-center gap-4 text-sm text-gray-500">
          <p>© {new Date().getFullYear()} Dancing with Lions</p>
          <div className="flex gap-6">
            <Link href="/privacy" className="hover:text-black transition-colors">
              Privacy
            </Link>
            <Link href="/terms" className="hover:text-black transition-colors">
              Terms
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
