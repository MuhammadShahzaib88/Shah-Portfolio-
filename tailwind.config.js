/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: '#6366f1',
        secondary: '#8b5cf6',
        accent: '#06b6d4',
        success: '#10b981',
        warning: '#f59e0b',
        danger: '#ef4444',
        'bg-primary': '#0a0a0a',
        'bg-secondary': '#111111',
        'bg-card': '#1a1a1a',
        'text-primary': '#f1f5f9',
        'text-muted': '#94a3b8',
      },
      fontFamily: {
        display: ['Playfair Display', 'serif'],
        heading: ['Space Grotesk', 'sans-serif'],
        body: ['Inter', 'sans-serif'],
        code: ['Fira Code', 'monospace'],
      },
      backgroundImage: {
        'grad-1': 'linear-gradient(135deg, #6366f1, #8b5cf6)',
        'grad-2': 'linear-gradient(135deg, #06b6d4, #6366f1)',
        'grad-3': 'linear-gradient(135deg, #8b5cf6, #ec4899)',
      },
      animation: {
        'spin-slow': 'spin 8s linear infinite',
        'float': 'float 3s ease-in-out infinite',
        'pulse-glow': 'pulseGlow 2s ease-in-out infinite',
        'gradient': 'gradientShift 4s ease infinite',
        'marquee': 'marquee 30s linear infinite',
        'marquee-reverse': 'marqueeReverse 30s linear infinite',
        'glitch': 'glitch 5s infinite',
        'bounce-slow': 'bounce 2s infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        pulseGlow: {
          '0%, 100%': { boxShadow: '0 0 20px rgba(99,102,241,0.3)' },
          '50%': { boxShadow: '0 0 40px rgba(99,102,241,0.6)' },
        },
        gradientShift: {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
        marquee: {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        marqueeReverse: {
          '0%': { transform: 'translateX(-50%)' },
          '100%': { transform: 'translateX(0%)' },
        },
        glitch: {
          '0%, 90%, 100%': { transform: 'translate(0)', filter: 'none' },
          '92%': { transform: 'translate(-2px, 1px)', filter: 'hue-rotate(90deg)' },
          '94%': { transform: 'translate(2px, -1px)', filter: 'hue-rotate(-90deg)' },
          '96%': { transform: 'translate(-1px, 2px)', filter: 'none' },
          '98%': { transform: 'translate(1px, -1px)', filter: 'hue-rotate(45deg)' },
        },
      },
      boxShadow: {
        'glow': '0 0 20px rgba(99,102,241,0.5)',
        'glow-accent': '0 0 20px rgba(6,182,212,0.5)',
        'glow-lg': '0 0 40px rgba(99,102,241,0.4)',
        'card': '0 20px 60px rgba(0,0,0,0.3)',
      },
      backdropBlur: {
        xs: '2px',
      },
    },
  },
  plugins: [],
}
