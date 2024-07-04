/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./pages/**/*.{html,jsx}"],
  theme: {
    extend: {},
  },
  plugins: [
    require("daisyui"),
  ],
  daisyui: {
    themes: false,
    prefix: "d-",
    logs: true
  },
  prefix: "tw-"
}
