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
            fontFamily: {
                mono: ['"Space Mono"', 'monospace'],
                grotesk: ['"Space Grotesk"', 'sans-serif'],
            },
            colors: {
                lightblue: "#6A5ACD",
                bluevioloet: "#8A2BE2",
                lightpurple: "#9370DB",
                lightorchid: "#BA55D3",
                darkmagenta: "#8B008B",
                Indigo: "#4B0082",
                Purple: "#800080",
                grey: "#A0A0A0",
                main: "#e3d2fa",
                lavender: "#ddd6ff",
                "lavender-dark": "#b8acf6",
                brut: "#0a0a0a",
                ink: "#0a0a0a",
                cream: "#fafafa",
                "brut-yellow": "#f5e642",
                yellow: "#f5e642",
                "cat-math": "#f5e642",
                "cat-unit": "#d4f5d4",
                "cat-other": "#ffd6d6",
                "btn-red": "#ffb3b3",
            },
            boxShadow: {
                brut: "5px 5px 0px #0a0a0a",
                "brut-lg": "8px 8px 0px #0a0a0a",
                brutal: "5px 5px 0px #0a0a0a",
                "brutal-lg": "8px 8px 0px #0a0a0a",
                "brutal-lavender": "7px 7px 0 #ddd6ff",
            },
            borderWidth: {
                3: "3px",
            },
        },
    },
    plugins: [
        function ({ addVariant }) {
            addVariant("all-not-first", "& > *+*");
            addVariant("child", "& > *");
            addVariant("child-hover", "& > *:hover");
        },
        require('@tailwindcss/line-clamp'),
        require('tailwind-scrollbar'),
    ],
};
