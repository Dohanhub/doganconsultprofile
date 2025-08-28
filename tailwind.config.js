/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './gaming/**/*.{js,ts,jsx,tsx,mdx}',
    './agents/**/*.{js,ts,jsx,tsx,mdx}'
  ],
  theme: {
    extend: {
      colors: {
        // DoganConsult Gaming Paradise Theme
        primary: {
          50: '#f0f4f8',
          100: '#d9e2ec',
          200: '#bcccdc',
          300: '#9fb3c8',
          400: '#829ab1',
          500: '#627d98',
          600: '#486581',
          700: '#334e68',
          800: '#243b53',
          900: '#102a43',
          DEFAULT: '#0F2C4C' // Navy blue
        },
        background: {
          DEFAULT: '#0E1621',
          light: '#1a2332',
          dark: '#0a0f16'
        },
        gaming: {
          magic: '#8b5cf6',
          battle: '#ef4444',
          debate: '#f59e0b',
          strategy: '#10b981',
          technical: '#3b82f6',
          professional: '#6366f1'
        },
        magical: {
          potion: '#a855f7',
          spell: '#ec4899',
          charm: '#06b6d4',
          aura: '#84cc16'
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        gaming: ['Orbitron', 'monospace'],
        magical: ['Cinzel', 'serif']
      },
      animation: {
        'magic-sparkle': 'sparkle 2s ease-in-out infinite',
        'battle-pulse': 'pulse 1s ease-in-out infinite',
        'debate-bounce': 'bounce 1.5s ease-in-out infinite',
        'strategy-float': 'float 3s ease-in-out infinite',
        'technical-glow': 'glow 2s ease-in-out infinite'
      },
      keyframes: {
        sparkle: {
          '0%, 100%': { opacity: 1, transform: 'scale(1)' },
          '50%': { opacity: 0.5, transform: 'scale(1.2)' }
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' }
        },
        glow: {
          '0%, 100%': { boxShadow: '0 0 5px rgba(59, 130, 246, 0.5)' },
          '50%': { boxShadow: '0 0 20px rgba(59, 130, 246, 0.8)' }
        }
      },
      backgroundImage: {
        'gaming-gradient': 'linear-gradient(135deg, #0F2C4C 0%, #1a2332 50%, #0E1621 100%)',
        'magical-gradient': 'linear-gradient(135deg, #8b5cf6 0%, #a855f7 50%, #ec4899 100%)',
        'battle-gradient': 'linear-gradient(135deg, #ef4444 0%, #dc2626 50%, #b91c1c 100%)',
        'strategy-gradient': 'linear-gradient(135deg, #10b981 0%, #059669 50%, #047857 100%)'
      }
    }
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/typography'),
    require('@tailwindcss/aspect-ratio')
  ]
}
