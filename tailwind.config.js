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
        // APEX AI Professional Colors - Salesforce Inspired
        'apex-blue': '#0176d3',
        'apex-blue-light': '#1b96ff',
        'apex-blue-dark': '#014486',
        'apex-teal': '#032d60',
        'apex-accent': '#ff6b35',
        'apex-success': '#04844b',
        'apex-warning': '#ffb75d',
        'apex-dark': '#080707',
        'apex-slate': '#16181d',
        'apex-gray': '#243238',
        'apex-light': '#394b53',
        'apex-border': '#3e5389',
        // Legacy support
        'neon-blue': '#0176d3',
        'neon-green': '#04844b',
        'neon-purple': '#5867dd',
        'neon-pink': '#ff6b35',
        'rockstar-dark': '#080707',
        'rockstar-gray': '#16181d',
        'rockstar-light': '#243238',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
        'neon-glow': 'linear-gradient(45deg, #00bfff, #00ff88, #bf00ff)',
      },
      boxShadow: {
        'apex-glow': '0 0 20px rgba(1, 118, 211, 0.3)',
        'apex-glow-strong': '0 0 30px rgba(1, 118, 211, 0.5), 0 0 60px rgba(1, 118, 211, 0.3)',
        'apex-success': '0 0 20px rgba(4, 132, 75, 0.3)',
        'apex-accent': '0 0 20px rgba(255, 107, 53, 0.3)',
        'professional': '0 10px 25px rgba(0, 0, 0, 0.15), 0 4px 10px rgba(0, 0, 0, 0.1)',
      },
      animation: {
        'pulse-professional': 'pulse-professional 3s ease-in-out infinite',
        'glow-subtle': 'glow-subtle 2s ease-in-out infinite alternate',
        'slide-up': 'slide-up 0.5s ease-out',
      },
      keyframes: {
        'pulse-professional': {
          '0%, 100%': { boxShadow: '0 0 20px rgba(1, 118, 211, 0.2)' },
          '50%': { boxShadow: '0 0 30px rgba(1, 118, 211, 0.4)' },
        },
        'glow-subtle': {
          '0%': { textShadow: '0 0 10px rgba(1, 118, 211, 0.3)' },
          '100%': { textShadow: '0 0 15px rgba(1, 118, 211, 0.5)' },
        },
        'slide-up': {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
      },
    },
  },
  plugins: [],
}