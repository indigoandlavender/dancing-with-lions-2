import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        background: '#ffffff',
        foreground: '#000000',
        accent: '#C93C20',
        gray: {
          100: '#fafafa',
          200: '#e5e5e5',
          400: '#999999',
          600: '#666666',
        }
      },
      fontFamily: {
        sans: ['var(--font-space-grotesk)', 'Space Grotesk', 'sans-serif'],
        display: ['var(--font-space-grotesk)', 'Space Grotesk', 'sans-serif'],
      },
      fontSize: {
        'hero': ['clamp(4rem, 15vw, 12rem)', { lineHeight: '0.85', letterSpacing: '-0.04em' }],
        'title': ['clamp(3rem, 10vw, 8rem)', { lineHeight: '0.9', letterSpacing: '-0.03em' }],
        'subtitle': ['clamp(1.5rem, 4vw, 2.5rem)', { lineHeight: '1.1', letterSpacing: '-0.02em' }],
        'body-lg': ['1.25rem', { lineHeight: '1.7' }],
        'body': ['1.125rem', { lineHeight: '1.8' }],
        'meta': ['0.6875rem', { lineHeight: '1.4', letterSpacing: '0.12em' }],
      },
      spacing: {
        'section': 'clamp(80px, 15vh, 160px)',
      },
      maxWidth: {
        'content': '680px',
        'wide': '1200px',
      }
    },
  },
  plugins: [],
}
export default config
