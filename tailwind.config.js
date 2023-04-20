/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    // screens: {
    //   'sm': '600px'
    // },
    transitionTimingFunction: {
      "custom-trans": "cubic-bezier(0.68, -0.55, 0.265, 1.35)",
    },
    keyframes: {
      timeout: {
        "0%": { right: 0 },
        "100%": { right: "100%" },
      },
    },
    extend: {},
  },
  plugins: [],
};
