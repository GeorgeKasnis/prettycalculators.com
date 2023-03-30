/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["./components/**/*.{js,vue,ts}", "./layouts/**/*.vue", "./pages/**/*.vue", "./plugins/**/*.{js,ts}", "./nuxt.config.{js,ts}", "./app.vue"],
    theme: {
        extend: {
            screens: {
                tablet: { max: "1199px" },
                mobile: { max: "767px" },
            },
            spacing: {
                small: "1rem",
                big: "2rem",
                huge: "4rem",
            },
            fontSize: {
                small: "1rem",
                big: "2rem",
                huge: "4rem",
            },
            colors: {
                lightblue: "#6A5ACD",
                bluevioloet: "#8A2BE2",
                lightpurple: "#9370DB",
                lightorchid: "#BA55D3",
                darkmagenta: "#8B008B",
                Indigo: "#4B0082",
                Purple: "#800080",
            },
        },
    },
    plugins: [
        function ({ addVariant }) {
            addVariant("all-not-first", "& > *+*");
            addVariant("child", "& > *");
            addVariant("child-hover", "& > *:hover");
        },
    ],
};
