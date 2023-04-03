// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    postcss: {
        plugins: {
            tailwindcss: {},
            autoprefixer: {},
        },
    },

    modules: ["@nuxtjs/device"],

    device: {
        refreshOnResize: true,
    },

    runtimeConfig: {
        public: {
            siteUrl: process.env.NUXT_PUBLIC_SITE_URL || "https://www.prettycalculators.com/",
        },
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
                { name: "google-site-verification", content: "zF5qj09ziYy_arXAmoNcsI7R4HKtGaiDVXA6jJbxqOA" },
                {
                    property: "og:image",
                    content: "/og-image.png",
                },
                {
                    property: "og:image:type",
                    content: "image/jpeg",
                },
                {
                    property: "og:image:width",
                    content: "1200",
                },
                {
                    property: "og:image:height",
                    content: "630",
                },
                {
                    property: "og:image:alt",
                    content: "www.prettycalculators.com",
                },
            ],
            htmlAttrs: {
                lang: "en",
            },
            link: [
                { rel: "sitemap", type: "application/xml", href: "/sitemap.xml" },
                { rel: "icon", href: "/favicon.ico" },
                { rel: "icon", href: "/android-icon-36x36.png", sizes: "36x36" },
                { rel: "icon", href: "/android-icon-42x42.png", sizes: "42x42" },
                { rel: "icon", href: "/android-icon-72x72.png", sizes: "72x72" },
                { rel: "icon", href: "/android-icon-72x72.png", sizes: "72x72" },
                { rel: "icon", href: "/android-icon-96x96.png", sizes: "96x96" },
                { rel: "icon", href: "/android-icon-144x144.png", sizes: "144x144" },
                { rel: "icon", href: "/android-icon-192x192.png", sizes: "192x192" },
                { rel: "icon", href: "/apple-icon-57x57.png", sizes: "57x57" },
                { rel: "icon", href: "/apple-icon-60x60.png", sizes: "60x60" },
                { rel: "icon", href: "/apple-icon-72x72.png", sizes: "72x72" },
                { rel: "icon", href: "/apple-icon-76x76.png", sizes: "76x76" },
                { rel: "icon", href: "/apple-icon-114x114.png", sizes: "114x114" },
                { rel: "icon", href: "/apple-icon-120x120.png", sizes: "120x120" },
                { rel: "icon", href: "/apple-icon-144x144.png", sizes: "144x144" },
                { rel: "icon", href: "/apple-icon-152x152.png", sizes: "152x152" },
                { rel: "icon", href: "/apple-icon-180x180.png", sizes: "180x180" },
                { rel: "icon", href: "/apple-icon-180x180.png", sizes: "180x180" },
                { rel: "icon", href: "/apple-icon.png" },
                { rel: "icon", href: "/favicon-16x16.png", sizes: "16x16" },
                { rel: "icon", href: "/favicon-32x32.png", sizes: "32x32" },
                { rel: "icon", href: "/favicon-96x96.png", sizes: "96x96" },
                { rel: "icon", href: "/ms-icon-70x70.png", sizes: "70x70" },
                { rel: "icon", href: "/ms-icon-144x144.png", sizes: "144x144" },
                { rel: "icon", href: "/ms-icon-150x150.png", sizes: "150x150" },
                { rel: "icon", href: "/ms-icon-310x310.png", sizes: "310x310" },
            ],
        },
    },

    vite: {
        define: {
            "process.env.DEBUG": false,
        },
    },
});
