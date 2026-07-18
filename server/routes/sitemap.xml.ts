export default defineEventHandler(async (event) => {
    setResponseHeader(event, 'Content-Type', 'application/xml; charset=utf-8')
    setResponseHeader(event, 'Cache-Control', 'public, max-age=3600, s-maxage=3600')

    const config = useRuntimeConfig()
    const base = 'https://prettycalculators.com'
    const today = new Date().toISOString().split('T')[0]
    // bump manually when calculator pages meaningfully change — a lastmod that
    // changes every day teaches Google to distrust it
    const staticLastmod = '2026-07-14'

    const staticUrls = [
        { loc: '/',             changefreq: 'weekly',  priority: '1.0' },
        { loc: '/fitness',      changefreq: 'weekly',  priority: '0.9' },
        { loc: '/math',         changefreq: 'weekly',  priority: '0.9' },
        { loc: '/finance',      changefreq: 'weekly',  priority: '0.9' },
        { loc: '/other',        changefreq: 'weekly',  priority: '0.9' },
        { loc: '/tools',        changefreq: 'weekly',  priority: '0.9' },
        { loc: '/blog',         changefreq: 'weekly',  priority: '0.8' },
        { loc: '/tips',         changefreq: 'weekly',  priority: '0.7' },

        { loc: '/fitness/bmi-calculator',           changefreq: 'monthly', priority: '0.85' },
        { loc: '/fitness/body-fat-calculator',      changefreq: 'monthly', priority: '0.85' },
        { loc: '/fitness/bmr-calculator',           changefreq: 'monthly', priority: '0.85' },
        { loc: '/fitness/tdee-calculator',          changefreq: 'monthly', priority: '0.85' },
        { loc: '/fitness/ideal-weight-calculator',  changefreq: 'monthly', priority: '0.85' },
        { loc: '/fitness/one-rep-max-calculator',   changefreq: 'monthly', priority: '0.85' },
        { loc: '/fitness/protein-calculator',       changefreq: 'monthly', priority: '0.85' },
        { loc: '/fitness/macro-calculator',         changefreq: 'monthly', priority: '0.85' },
        { loc: '/fitness/pace-calculator',           changefreq: 'monthly', priority: '0.85' },
        { loc: '/fitness/calories-burned-calculator', changefreq: 'monthly', priority: '0.85' },
        { loc: '/fitness/lean-body-mass-calculator',   changefreq: 'monthly', priority: '0.85' },
        { loc: '/fitness/calorie-deficit-calculator',  changefreq: 'monthly', priority: '0.85' },
        { loc: '/fitness/vo2-max-calculator',          changefreq: 'monthly', priority: '0.85' },
        { loc: '/fitness/heart-rate-zone-calculator',  changefreq: 'monthly', priority: '0.85' },
        { loc: '/fitness/water-intake-calculator',     changefreq: 'monthly', priority: '0.85' },

        { loc: '/math/percentage-calculator',       changefreq: 'monthly', priority: '0.85' },
        { loc: '/math/fraction-calculator',         changefreq: 'monthly', priority: '0.85' },
        { loc: '/math/average-calculator',          changefreq: 'monthly', priority: '0.85' },
        { loc: '/math/quadratic-formula-calculator',changefreq: 'monthly', priority: '0.85' },
        { loc: '/math/ratio-calculator',            changefreq: 'monthly', priority: '0.85' },
        { loc: '/math/standard-deviation-calculator',  changefreq: 'monthly', priority: '0.85' },
        { loc: '/math/cosine-similarity-calculator',   changefreq: 'monthly', priority: '0.85' },
        { loc: '/math/dot-product-calculator',         changefreq: 'monthly', priority: '0.85' },
        { loc: '/math/random-number-generator',        changefreq: 'monthly', priority: '0.85' },
        { loc: '/math/manhattan-distance-calculator',  changefreq: 'monthly', priority: '0.85' },
        { loc: '/math/euclidean-distance-calculator',  changefreq: 'monthly', priority: '0.85' },
        { loc: '/math/chebyshev-distance-calculator',  changefreq: 'monthly', priority: '0.85' },
        { loc: '/math/hamming-distance-calculator',    changefreq: 'monthly', priority: '0.85' },
        { loc: '/math/minkowski-distance-calculator',  changefreq: 'monthly', priority: '0.85' },
        { loc: '/math/gpa-calculator',                    changefreq: 'monthly', priority: '0.85' },
        { loc: '/math/lcm-gcf-calculator',                changefreq: 'monthly', priority: '0.85' },
        { loc: '/math/scientific-notation-calculator',    changefreq: 'monthly', priority: '0.85' },

        { loc: '/unit/celsius-to-fahrenheit-converter', changefreq: 'monthly', priority: '0.85' },
        { loc: '/unit/fahrenheit-to-celsius-converter', changefreq: 'monthly', priority: '0.85' },
        { loc: '/unit/miles-to-kilometers',             changefreq: 'monthly', priority: '0.85' },
        { loc: '/unit/kilometers-to-miles',             changefreq: 'monthly', priority: '0.85' },
        { loc: '/unit/inches-to-cm-converter',          changefreq: 'monthly', priority: '0.85' },
        { loc: '/unit/kg-to-lbs-converter',             changefreq: 'monthly', priority: '0.85' },
        { loc: '/unit/feet-to-meters-converter',        changefreq: 'monthly', priority: '0.85' },

        { loc: '/finance/compound-interest-calculator',    changefreq: 'monthly', priority: '0.85' },
        { loc: '/finance/mortgage-calculator',            changefreq: 'monthly', priority: '0.85' },
        { loc: '/finance/loan-calculator',                changefreq: 'monthly', priority: '0.85' },
        { loc: '/finance/credit-card-payoff-calculator',  changefreq: 'monthly', priority: '0.85' },
        { loc: '/finance/investment-calculator',          changefreq: 'monthly', priority: '0.85' },
        { loc: '/finance/retirement-calculator',          changefreq: 'monthly', priority: '0.85' },
        { loc: '/finance/income-tax-calculator',          changefreq: 'monthly', priority: '0.85' },
        { loc: '/finance/salary-to-hourly-calculator',    changefreq: 'monthly', priority: '0.85' },
        { loc: '/finance/roi-calculator',                 changefreq: 'monthly', priority: '0.85' },
        { loc: '/finance/break-even-calculator',          changefreq: 'monthly', priority: '0.85' },
        { loc: '/finance/vat-calculator',                 changefreq: 'monthly', priority: '0.85' },
        { loc: '/finance/net-worth-calculator',           changefreq: 'monthly', priority: '0.85' },
        { loc: '/finance/savings-goal-calculator',        changefreq: 'monthly', priority: '0.85' },
        { loc: '/finance/debt-payoff-calculator',         changefreq: 'monthly', priority: '0.85' },
        { loc: '/finance/take-home-pay-calculator',       changefreq: 'monthly', priority: '0.85' },
        { loc: '/finance/youtube-earnings-calculator',    changefreq: 'monthly', priority: '0.85' },
        { loc: '/finance/tiktok-earnings-calculator',     changefreq: 'monthly', priority: '0.85' },

        { loc: '/other/aqua-calculator',                changefreq: 'monthly', priority: '0.85' },
        { loc: '/other/age-calculator',                 changefreq: 'monthly', priority: '0.85' },
        { loc: '/tools/px-to-rem-calculator',           changefreq: 'monthly', priority: '0.85' },
        { loc: '/tools/image-compressor',               changefreq: 'monthly', priority: '0.85' },
        { loc: '/tools/qr-code-generator',              changefreq: 'monthly', priority: '0.85' },
        { loc: '/tools/json-formatter',                 changefreq: 'monthly', priority: '0.85' },
        { loc: '/tools/unix-timestamp-converter',       changefreq: 'monthly', priority: '0.85' },
        { loc: '/tools/aspect-ratio-calculator',        changefreq: 'monthly', priority: '0.85' },
        { loc: '/tools/css-clamp-calculator',           changefreq: 'monthly', priority: '0.85' },
        { loc: '/tools/password-generator',             changefreq: 'monthly', priority: '0.85' },
        { loc: '/tools/diff-checker',                   changefreq: 'monthly', priority: '0.85' },
        { loc: '/tools/color-contrast-checker',         changefreq: 'monthly', priority: '0.85' },
        { loc: '/tools/lorem-ipsum-generator',          changefreq: 'monthly', priority: '0.85' },
        { loc: '/tools/url-encoder-decoder',            changefreq: 'monthly', priority: '0.85' },
        { loc: '/tools/text-case-converter',            changefreq: 'monthly', priority: '0.85' },
        { loc: '/tools/csv-to-json-converter',          changefreq: 'monthly', priority: '0.85' },
        { loc: '/tools/base64-encoder-decoder',         changefreq: 'monthly', priority: '0.85' },
        { loc: '/tools/uuid-generator',                 changefreq: 'monthly', priority: '0.85' },
        { loc: '/tools/hex-to-rgb-converter',           changefreq: 'monthly', priority: '0.85' },
        { loc: '/tools/hash-generator',                 changefreq: 'monthly', priority: '0.85' },
        { loc: '/other/pizza-calculator',               changefreq: 'monthly', priority: '0.85' },
        { loc: '/other/tip-calculator',                 changefreq: 'monthly', priority: '0.85' },
        { loc: '/other/sleep-calculator',               changefreq: 'monthly', priority: '0.85' },
        { loc: '/tools/word-counter',                   changefreq: 'monthly', priority: '0.85' },
        { loc: '/other/pregnancy-due-date-calculator',  changefreq: 'monthly', priority: '0.85' },
        { loc: '/other/ovulation-calculator',           changefreq: 'monthly', priority: '0.85' },
        { loc: '/other/discount-calculator',            changefreq: 'monthly', priority: '0.85' },
        { loc: '/other/reading-time-calculator',        changefreq: 'monthly', priority: '0.85' },

        { loc: '/terms-of-use',    changefreq: 'yearly',   priority: '0.3' },
        { loc: '/privacy-policy', changefreq: 'yearly',   priority: '0.3' },
        { loc: '/about',          changefreq: 'monthly',  priority: '0.3' },
        { loc: '/contact',        changefreq: 'monthly',  priority: '0.3' },
    ]

    // Fetch blog post slugs and last-modified dates from Contentful
    let blogEntries: Array<{ slug: string; updatedAt: string }> = []
    try {
        const data = await $fetch<any>(
            `${config.public.API_URL}&content_type=blog&select=fields.slug,sys.updatedAt&limit=1000`
        )
        blogEntries = (data.items ?? []).map((item: any) => ({
            slug: item.fields.slug,
            updatedAt: (item.sys.updatedAt ?? today).split('T')[0],
        }))
    } catch {}

    const toUrl = (loc: string, lastmod: string, changefreq: string, priority: string) =>
        `  <url>\n    <loc>${base}${loc}</loc>\n    <lastmod>${lastmod}</lastmod>\n    <changefreq>${changefreq}</changefreq>\n    <priority>${priority}</priority>\n  </url>`

    const staticXml = staticUrls.map(u => toUrl(u.loc, staticLastmod, u.changefreq, u.priority)).join('\n')

    const blogXml = blogEntries
        .map(({ slug, updatedAt }) => toUrl(`/blog/${slug}`, updatedAt, 'monthly', '0.75'))
        .join('\n')

    return `<?xml version="1.0" encoding="utf-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${staticXml}
${blogXml}
</urlset>`
})
