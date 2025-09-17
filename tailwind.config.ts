import type { Config } from 'tailwindcss'

const config: Config = {
  darkMode: 'class',
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Primary brand colors
        'sin-orange': '#FF8A00',
        'sin-yellow': '#FFD600',
        'sin-red': '#FF3D00',
        
        // Theme colors
        background: 'rgb(var(--background) / <alpha-value>)',
        foreground: 'rgb(var(--foreground) / <alpha-value>)',
        card: 'rgb(var(--card) / <alpha-value>)',
        'card-foreground': 'rgb(var(--card-foreground) / <alpha-value>)',
        muted: 'rgb(var(--muted) / <alpha-value>)',
        'muted-foreground': 'rgb(var(--muted-foreground) / <alpha-value>)',
        border: 'rgb(var(--border) / <alpha-value>)',
      },
      backgroundImage: {
        // Use perceptual OKLab interpolation to avoid hard banding between stops
        'rainbow-gradient': 'linear-gradient(in oklab, #ff0000 0%, #ff7a00 14%, #ffd600 28%, #48ff00 42%, #00ffd5 57%, #002bff 71%, #7a00ff 85%, #ff00c8 100%)',
      },
      fontFamily: {
        sans: ['OpenDyslexic', 'var(--font-inter)', 'Helvetica Neue', 'Arial', 'sans-serif'],
        opendyslexic: ['OpenDyslexic', 'var(--font-inter)', 'Helvetica Neue', 'Arial', 'sans-serif'],
      },
      fontSize: {
        'xs': ['0.8rem', { lineHeight: '1.3' }],
        'sm': ['0.875rem', { lineHeight: '1.3' }],
        'base': ['1rem', { lineHeight: '1.6' }],
        'lg': ['1.25rem', { lineHeight: '1.6' }],
        'xl': ['1.563rem', { lineHeight: '1.3' }],
        '2xl': ['1.953rem', { lineHeight: '1.3' }],
        '3xl': ['2.441rem', { lineHeight: '1.3' }],
        '4xl': ['3.052rem', { lineHeight: '1.3' }],
      },
      letterSpacing: {
        'body': '0.01em',
        'heading': '0.005em',
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in',
        'slide-up': 'slideUp 0.3s ease-out',
        'float': 'float 20s ease-in-out infinite',
        'float-delayed': 'float 20s ease-in-out infinite 5s',
        'float-slow': 'float 30s ease-in-out infinite',
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'shimmer': 'shimmer 8s linear infinite',
        'glow': 'glow 2s ease-in-out infinite',
        'slide-in-left': 'slideInLeft 0.5s ease-out',
        'slide-in-right': 'slideInRight 0.5s ease-out',
        'bounce-in': 'bounceIn 0.5s cubic-bezier(0.68, -0.55, 0.265, 1.55)',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        float: {
          '0%, 100%': { transform: 'translate(0, 0) rotate(0deg)' },
          '33%': { transform: 'translate(30px, -30px) rotate(1deg)' },
          '66%': { transform: 'translate(-20px, 20px) rotate(-1deg)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-1000px 0' },
          '100%': { backgroundPosition: '1000px 0' },
        },
        glow: {
          '0%, 100%': { opacity: '1', transform: 'scale(1)' },
          '50%': { opacity: '0.8', transform: 'scale(1.05)' },
        },
        slideInLeft: {
          '0%': { transform: 'translateX(-100%)', opacity: '0' },
          '100%': { transform: 'translateX(0)', opacity: '1' },
        },
        slideInRight: {
          '0%': { transform: 'translateX(100%)', opacity: '0' },
          '100%': { transform: 'translateX(0)', opacity: '1' },
        },
        bounceIn: {
          '0%': { opacity: '0', transform: 'scale(0.3)' },
          '50%': { opacity: '1', transform: 'scale(1.05)' },
          '70%': { transform: 'scale(0.9)' },
          '100%': { transform: 'scale(1)' },
        },
      },
      backdropBlur: {
        xs: '2px',
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
}

export default config