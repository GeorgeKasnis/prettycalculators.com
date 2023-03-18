// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    postcss: {
        plugins: {
            tailwindcss: {},
            autoprefixer: {},
        },
    },

    modules: ["nuxt-simple-sitemap","nuxt-gtag"],

    gtag: {
        id: 'G-C5PBQPTJG5'
      },

    // sitemap: {
    //   siteUrl: 'https://www.prettybmicalculator.com/',
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
                { name: 'google-site-verification', content: 'b5AARVPsG9JCuwRHUo9IB40kdShrFEuIT0Dqv3nvRgU' }
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
