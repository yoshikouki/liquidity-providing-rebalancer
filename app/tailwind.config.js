/**
 * @type {import('@types/tailwindcss/tailwind-config').TailwindConfig}
 */

module.exports = {
  content: ["./src/**/*.{html,js,jsx,ts,tsx}"],
  theme: {
    extend: {},
    container: {
      center: true,
    },
  },
  daisyui: {
    themes: ["halloween"],
  },
  plugins: [require("@tailwindcss/typography"), require("daisyui")],
};
