// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    postcss: {
        plugins: {
            tailwindcss: {},
            autoprefixer: {},
        },
    },

    modules: ["nuxt-simple-sitemap"],

    sitemap: {
        siteUrl: "https://www.prettybmicalculator.com/",
    },

    css: ["~/assets/css/index.css", "vuetify/lib/styles/main.sass"],

    app: {
        head: {
            meta: [
                {
                    name: "viewport",
                    content: "width=device-width, initial-scale=1",
                },
                {
                    charset: "utf-8",
                },
            ],
            htmlAttrs: {
                lang: "en",
            },
            script: [
                {
                    src: "https://www.googletagmanager.com/gtag/js?id=G-C5PBQPTJG5",
                    async: true,
                },
                {
                    src: "/ga.js",
                    async: true,
                },
            ],
        },
    },

    plugins: [
        { src: "~/plugins/google-analytics.js", mode: "client" },
      ],

    vite: {
        define: {
            "process.env.DEBUG": false,
        },
    },
});
