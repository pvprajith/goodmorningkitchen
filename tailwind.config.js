/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./pages/**/*.{js,jsx}", "./components/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        brand: "#689f38",    // earthy green from logo
        accent: "#fbc02d",   // warm yellow-orange
        choco:  "#5c3b2e",   // brown text
        cream:  "#faf7ef"    // light background
      },
      boxShadow: {
        card: "0 6px 20px rgba(0,0,0,0.08)"
      }
    }
  },
  plugins: []
};
