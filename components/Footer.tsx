import Link from 'next/link'

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-white border-t-2 border-black">
      <div className="max-w-[1400px] mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          <div className="md:col-span-2">
            <Link 
              href="/" 
              className="font-black text-3xl tracking-tight mb-4 block"
              style={{ fontFamily: 'Inter, sans-serif' }}
            >
              Dancing with Lions
            </Link>
            <p className="text-gray-600 max-w-sm leading-relaxed">
              The stories underneath the map. Mythology, hidden history, 
              cultural connections — the layer beneath the guidebook.
            </p>
          </div>

          <div>
            <h4 className="font-bold text-sm uppercase tracking-wider mb-4">
              Essays
            </h4>
            <ul className="space-y-2 text-gray-600">
              <li>
                <Link href="/essays" className="hover:text-black transition-colors">
                  All Essays
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-sm uppercase tracking-wider mb-4">
              About
            </h4>
            <ul className="space-y-2 text-gray-600">
              <li>
                <Link href="/about" className="hover:text-black transition-colors">
                  The Publication
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="border-t border-gray-200">
        <div className="max-w-[1400px] mx-auto px-6 py-4 flex flex-col sm:flex-row justify-between items-center gap-4 text-sm text-gray-500">
          <p>© {currentYear} Dancing with Lions. All rights reserved.</p>
          <div className="flex gap-6">
            <Link href="/privacy" className="hover:text-black transition-colors">
              Privacy
            </Link>
            <Link href="/terms" className="hover:text-black transition-colors">
              Terms
            </Link>
            <Link href="/disclaimer" className="hover:text-black transition-colors">
              Disclaimer
            </Link>
            <Link href="/intellectual-property" className="hover:text-black transition-colors">
              IP
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
