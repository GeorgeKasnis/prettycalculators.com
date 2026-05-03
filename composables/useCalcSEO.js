const SITE = 'https://www.prettycalculators.com'

export const useCalcSEO = (title, description) => {
    const route = useRoute()
    const canonical = `${SITE}${route.path}`

    useHead({
        title,
        link: [
            { rel: 'canonical', href: canonical },
        ],
        meta: [
            { hid: 'title',                name: 'title',                content: title },
            { hid: 'description',          name: 'description',          content: description },
            { hid: 'og:type',              property: 'og:type',          content: 'website' },
            { hid: 'og:site_name',         property: 'og:site_name',     content: 'Pretty Calculators' },
            { hid: 'og:url',               property: 'og:url',           content: canonical },
            { hid: 'og-title',             property: 'og:title',         content: title },
            { hid: 'og:description',       property: 'og:description',   content: description },
            { hid: 'twitter:card',         name: 'twitter:card',         content: 'summary_large_image' },
            { hid: 'twitter:title',        name: 'twitter:title',        content: title },
            { hid: 'twitter:description',  name: 'twitter:description',  content: description },
        ],
    })
}
