/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        // RockstarAI Custom Colors
        'neon-blue': '#00bfff',
        'neon-green': '#00ff88',
        'neon-purple': '#bf00ff',
        'neon-pink': '#ff0080',
        'rockstar-dark': '#0a0a0a',
        'rockstar-gray': '#1a1a1a',
        'rockstar-light': '#2a2a2a',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
        'neon-glow': 'linear-gradient(45deg, #00bfff, #00ff88, #bf00ff)',
      },
      boxShadow: {
        'neon-blue': '0 0 20px #00bfff, 0 0 40px #00bfff, 0 0 60px #00bfff',
        'neon-green': '0 0 20px #00ff88, 0 0 40px #00ff88, 0 0 60px #00ff88',
        'neon-purple': '0 0 20px #bf00ff, 0 0 40px #bf00ff, 0 0 60px #bf00ff',
        'rockstar-glow': '0 0 30px rgba(0, 191, 255, 0.3), 0 0 60px rgba(0, 255, 136, 0.2)',
      },
      animation: {
        'pulse-neon': 'pulse-neon 2s ease-in-out infinite alternate',
        'glow': 'glow 2s ease-in-out infinite alternate',
      },
      keyframes: {
        'pulse-neon': {
          '0%': { boxShadow: '0 0 20px #00bfff' },
          '100%': { boxShadow: '0 0 20px #00bfff, 0 0 40px #00bfff, 0 0 60px #00bfff' },
        },
        'glow': {
          '0%': { textShadow: '0 0 10px #00bfff' },
          '100%': { textShadow: '0 0 10px #00bfff, 0 0 20px #00bfff, 0 0 30px #00bfff' },
        },
      },
    },
  },
  plugins: [],
}