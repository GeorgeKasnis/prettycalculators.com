// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    postcss: {
        plugins: {
            tailwindcss: {},
            autoprefixer: {},
        },
    },

    modules: ["nuxt-gtag"],

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
            link: [
                { rel: "icon", href: "/favicons/favicon.ico" },
                { rel: "icon", href: "/favicons/android-icon-36x36.png", sizes: "36x36" },
                { rel: "icon", href: "/favicons/android-icon-42x42.png", sizes: "42x42" },
                { rel: "icon", href: "/favicons/android-icon-72x72.png", sizes: "72x72" },
                { rel: "icon", href: "/favicons/android-icon-72x72.png", sizes: "72x72" },
                { rel: "icon", href: "/favicons/android-icon-96x96.png", sizes: "96x96" },
                { rel: "icon", href: "/favicons/android-icon-144x144.png", sizes: "144x144" },
                { rel: "icon", href: "/favicons/android-icon-192x192.png", sizes: "192x192" },
                { rel: "icon", href: "/favicons/apple-icon-57x57.png", sizes: "57x57" },
                { rel: "icon", href: "/favicons/apple-icon-60x60.png", sizes: "60x60" },
                { rel: "icon", href: "/favicons/apple-icon-72x72.png", sizes: "72x72" },
                { rel: "icon", href: "/favicons/apple-icon-76x76.png", sizes: "76x76" },
                { rel: "icon", href: "/favicons/apple-icon-114x114.png", sizes: "114x114" },
                { rel: "icon", href: "/favicons/apple-icon-120x120.png", sizes: "120x120" },
                { rel: "icon", href: "/favicons/apple-icon-144x144.png", sizes: "144x144" },
                { rel: "icon", href: "/favicons/apple-icon-152x152.png", sizes: "152x152" },
                { rel: "icon", href: "/favicons/apple-icon-180x180.png", sizes: "180x180" },
                { rel: "icon", href: "/favicons/apple-icon-180x180.png", sizes: "180x180" },
                { rel: "icon", href: "/favicons/apple-icon.png" },
                { rel: "icon", href: "/favicons/favicon-16x16.png", sizes: "16x16" },
                { rel: "icon", href: "/favicons/favicon-32x32.png", sizes: "32x32" },
                { rel: "icon", href: "/favicons/favicon-96x96.png", sizes: "96x96" },
                { rel: "icon", href: "/favicons/ms-icon-70x70.png", sizes: "70x70" },
                { rel: "icon", href: "/favicons/ms-icon-144x144.png", sizes: "144x144" },
                { rel: "icon", href: "/favicons/ms-icon-150x150.png", sizes: "150x150" },
                { rel: "icon", href: "/favicons/ms-icon-310x310.png", sizes: "310x310" },
            ],
        },
    },

    vite: {
        define: {
            "process.env.DEBUG": false,
        },
    },
});
