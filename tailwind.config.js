/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        lavender: {
          DEFAULT: '#E9D5FF',
          light: '#F3E8FF',
          dark: '#D8B4FE'
        },
        blush: {
          DEFAULT: '#FED7D7',
          light: '#FEE2E2',
          dark: '#FECACA'
        },
        mint: {
          DEFAULT: '#C7F3D9',
          light: '#D1FAE5',
          dark: '#A7F3D0'
        },
        peach: {
          DEFAULT: '#FEF3C7',
          light: '#FEF9C3',
          dark: '#FDE68A'
        },
        bgLight: {
          DEFAULT: '#F8FAFC',
          white: '#FDFDFD'
        },
        text: {
          dark: '#1E293B',
          gray: '#475569',
          light: '#64748B'
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['Playfair Display', 'Georgia', 'serif'],
      },
      backgroundImage: {
        'pastel-gradient': 'linear-gradient(135deg, #E9D5FF 0%, #FED7D7 50%, #C7F3D9 100%)',
        'soft-gradient': 'linear-gradient(180deg, #F8FAFC 0%, #FDFDFD 100%)',
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        }
      },
      scrollBehavior: {
        smooth: 'smooth',
      }
    },
  },
  plugins: [],
}
