/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // Chrientmip brand colors
        chrient: {
          dark: '#4C4C4C',
          gold: '#FFBA4C',
          'gold-light': '#FFD080',
          'gold-dark': '#E6A030',
        },
        // Dark mode palette
        surface: {
          50: '#fafafa',
          100: '#f5f5f5',
          200: '#e5e5e5',
          300: '#d4d4d4',
          400: '#a3a3a3',
          500: '#737373',
          600: '#525252',
          700: '#404040',
          800: '#262626',
          900: '#171717',
          950: '#0a0a0a',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
        mono: ['JetBrains Mono', 'Consolas', 'monospace'],
      },
      boxShadow: {
        'glow': '0 0 20px rgba(255, 186, 76, 0.3)',
        'glow-lg': '0 0 40px rgba(255, 186, 76, 0.4)',
      },
      animation: {
        'pulse-gold': 'pulse-gold 2s ease-in-out infinite',
        'shake': 'shake 0.5s ease-in-out',
      },
      keyframes: {
        'pulse-gold': {
          '0%, 100%': { boxShadow: '0 0 10px rgba(255, 186, 76, 0.3)' },
          '50%': { boxShadow: '0 0 25px rgba(255, 186, 76, 0.6)' },
        },
        'shake': {
          '0%, 100%': { transform: 'translateX(0)' },
          '25%': { transform: 'translateX(-5px)' },
          '75%': { transform: 'translateX(5px)' },
        }
      }
    },
  },
  plugins: [],
}
