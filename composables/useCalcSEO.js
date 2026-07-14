const SITE = 'https://prettycalculators.com'

const APP_CATEGORY_MAP = {
    fitness: 'HealthApplication',
    math:    'EducationalApplication',
    unit:    'UtilitiesApplication',
    other:   'UtilitiesApplication',
    tools:   'UtilitiesApplication',
    finance: 'FinancialApplication',
}

export const useCalcSEO = (title, description, faqs = []) => {
    const route = useRoute()
    const path = route.path.replace(/\/+$/, '') || '/'
    const canonical = `${SITE}${path}`

    const segments = path.split('/').filter(Boolean)
    const categorySlug = segments[0] ?? ''
    const categoryLabel = categorySlug.charAt(0).toUpperCase() + categorySlug.slice(1)
    const appCategory = APP_CATEGORY_MAP[categorySlug] ?? 'UtilitiesApplication'
    const shortName = title.replace(/^Pretty Calculators\s*[-—]\s*/i, '')

    const scripts = [
        {
            type: 'application/ld+json',
            innerHTML: JSON.stringify({
                '@context': 'https://schema.org',
                '@type': 'WebApplication',
                name: shortName,
                description,
                url: canonical,
                applicationCategory: appCategory,
                operatingSystem: 'Web',
                offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
                provider: { '@type': 'Organization', name: 'Pretty Calculators', url: SITE },
            }),
        },
        {
            type: 'application/ld+json',
            innerHTML: JSON.stringify({
                '@context': 'https://schema.org',
                '@type': 'BreadcrumbList',
                itemListElement: [
                    { '@type': 'ListItem', position: 1, name: 'Home',        item: `${SITE}/` },
                    { '@type': 'ListItem', position: 2, name: categoryLabel, item: `${SITE}/${categorySlug}` },
                    { '@type': 'ListItem', position: 3, name: shortName,     item: canonical },
                ],
            }),
        },
    ]

    if (faqs.length) {
        scripts.push({
            type: 'application/ld+json',
            innerHTML: JSON.stringify({
                '@context': 'https://schema.org',
                '@type': 'FAQPage',
                mainEntity: faqs.map(faq => ({
                    '@type': 'Question',
                    name: faq.q,
                    acceptedAnswer: { '@type': 'Answer', text: faq.a },
                })),
            }),
        })
    }

    useHead({
        title,
        link: [{ rel: 'canonical', href: canonical }],
        script: scripts,
        meta: [
            { hid: 'title',               name: 'title',               content: title },
            { hid: 'description',         name: 'description',         content: description },
            { hid: 'og:type',             property: 'og:type',         content: 'website' },
            { hid: 'og:site_name',        property: 'og:site_name',    content: 'Pretty Calculators' },
            { hid: 'og:url',              property: 'og:url',          content: canonical },
            { hid: 'og-title',            property: 'og:title',        content: title },
            { hid: 'og:description',      property: 'og:description',  content: description },
            { hid: 'twitter:card',        name: 'twitter:card',        content: 'summary_large_image' },
            { hid: 'twitter:title',       name: 'twitter:title',       content: title },
            { hid: 'twitter:description', name: 'twitter:description', content: description },
        ],
    })
}
