// tailwind.config.js
export default {
  content: [
    './src/**/*.{astro,html,js,jsx,ts,tsx,vue,svelte}', // scan Astro and components
  ],
  theme: {
    extend: {
      fontFamily: {
        serif: ['Cormorant', 'serif'],
        mono: ['Source Code Pro', 'monospace'],
      },
      colors: {
        prussianBlue: '#003153',
      },
    },
  },
  plugins: [],
}
