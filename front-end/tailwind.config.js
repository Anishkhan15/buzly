module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'], // Adjust paths as needed
  theme: {
    extend: {
      animation: {
        'spin-slow': 'spin-slow 8s linear infinite', // Custom slow spin animation
      },
      keyframes: {
        'spin-slow': {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' },
        },
      },
    },
  },
  
  plugins: [require('@tailwindcss/line-clamp')], // Add the line-clamp plugin here
};
