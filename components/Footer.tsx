import Link from 'next/link'

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-white border-t-2 border-black">
      {/* Main Footer */}
      <div className="max-w-[1400px] mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12">
          {/* Brand */}
          <div className="md:col-span-5">
            <Link 
              href="/" 
              className="font-black text-3xl tracking-tight uppercase block mb-4"
            >
              Dancing with Lions
            </Link>
            <p className="text-gray-600 max-w-sm leading-relaxed mb-6">
              Cultural intelligence for conservation, protection, and preservation. 
              Documenting traditional knowledge systems across Africa, the Middle East, and Asia.
            </p>
            <p className="text-sm text-gray-500">
              Editorial — Marrakech
            </p>
          </div>

          {/* Spacer */}
          <div className="md:col-span-1" />

          {/* Content */}
          <div className="md:col-span-2">
            <h4 className="font-bold text-xs uppercase tracking-[0.15em] mb-4">
              Content
            </h4>
            <ul className="space-y-3">
              <li>
                <Link href="/essays" className="text-gray-600 hover:text-black transition-colors">
                  Essays
                </Link>
              </li>
              <li>
                <Link href="/stories" className="text-gray-600 hover:text-black transition-colors">
                  Stories
                </Link>
              </li>
              <li>
                <Link href="/opinion" className="text-gray-600 hover:text-black transition-colors">
                  Opinion
                </Link>
              </li>
            </ul>
          </div>

          {/* About */}
          <div className="md:col-span-2">
            <h4 className="font-bold text-xs uppercase tracking-[0.15em] mb-4">
              About
            </h4>
            <ul className="space-y-3">
              <li>
                <Link href="/about" className="text-gray-600 hover:text-black transition-colors">
                  The Publication
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-gray-600 hover:text-black transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Related Projects */}
          <div className="md:col-span-2">
            <h4 className="font-bold text-xs uppercase tracking-[0.15em] mb-4">
              Related
            </h4>
            <ul className="space-y-3">
              <li>
                <a 
                  href="https://slowmorocco.com" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-gray-600 hover:text-black transition-colors"
                >
                  Slow World
                </a>
              </li>
              <li>
                <a 
                  href="https://houseofweaves.com" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-gray-600 hover:text-black transition-colors"
                >
                  House of Weaves
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Legal Bar */}
      <div className="border-t-2 border-black">
        <div className="max-w-[1400px] mx-auto px-6 py-4 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-gray-500">
            © {currentYear} Dancing with Lions. All rights reserved.
          </p>
          <div className="flex gap-6 text-sm text-gray-500">
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
