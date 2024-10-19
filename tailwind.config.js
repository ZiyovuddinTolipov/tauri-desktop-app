/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}", // React komponentlari joylashgan joy
  ],
  theme: {
    extend: {
      colors: {
        primary: '#1E1E2F', // Asosiy fon rangi
        secondary: '#2D2D44', // Ikkinchi darajali fon rangi
        accent: '#4A90E2', // Aksent rangi
        light: '#FFFFFF', // Oq rang
        dark: '#000000', // Qora rang
        lightText: '#000000', // Light mode uchun matn rangi
        darkText: '#FFFFFF', // Dark mode uchun matn rangi
      },
    },
  },
  plugins: [],
}
