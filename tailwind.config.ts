import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    fontFamily: {
      serif: ['Times New Roman', 'Times', 'serif'],
    },
    colors: {
      yellow: '#F5F5DB',
      black: '#000',
      white: '#fff',
      transparent: 'transparent',
      red: '#FF0000',
    },
    extend: {
      screens: {
        l: '1024px',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      transitionProperty: {
        height: 'height',
        maxHeight: 'max-height',
        width: 'width',
        spacing: 'margin, padding',
        scale: 'transform',
      },
    },
  },
  plugins: [],
}
export default config
