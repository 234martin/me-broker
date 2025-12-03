/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#1F2937',      // dark high-end base
        secondary: '#F59E0B',    // gold accent
        accent: '#E5E7EB',       // light gray for contrast
      },
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui'],
        serif: ['Merriweather', 'serif'],
      },
    },
  },
  plugins: [],
}
