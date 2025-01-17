module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'], // Adjust paths as needed
  theme: {
    extend: {},
  },
  plugins: [require('@tailwindcss/line-clamp')], // Add the line-clamp plugin here
};
