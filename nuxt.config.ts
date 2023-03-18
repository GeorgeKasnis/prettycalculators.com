// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    postcss: {
        plugins: {
            tailwindcss: {},
            autoprefixer: {},
        },
    },

    modules: ["nuxt-simple-sitemap"],

    // sitemap: {
    //   siteUrl: 'http://localhost:3000/',
    // },

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
        },
    },

    vite: {
        define: {
            "process.env.DEBUG": false,
        },
    },
});
