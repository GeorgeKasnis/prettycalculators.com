/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./components/**/*.{js,vue,ts}", "./layouts/**/*.vue", "./pages/**/*.vue", "./plugins/**/*.{js,ts}", "./nuxt.config.{js,ts}", "./app.vue"],
  theme: {
    extend: {
      spacing: {
        small: "1rem",
        big: "2rem",
      },
      colors: {
        "lightblue": "#6A5ACD",
        "bluevioloet": "#8A2BE2",
        "lightpurple": "#9370DB",
        "lightorchid": "#BA55D3",
        "darkmagenta": "#8B008B",
        Indigo: "#4B0082",
        Purple: "#800080",
      },
    },
  },
  plugins: [],
};
