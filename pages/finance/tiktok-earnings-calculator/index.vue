<template>
    <UiCalcPage title="TikTok Earnings Calculator" category="finance" description-title="Estimate your TikTok Creator Fund and brand deal income">
        <template #calc>
            <CalculatorsFinanceTiktokCalc />
        </template>
        <template #facts>
            <CalcFact label="Creator Fund"   value="$0.02 – $0.05" unit="per 1K views" />
            <CalcFact label="Brand deals"    value="$200 – $25K"   unit="per post" />
            <CalcFact label="Followers need" value="10K+"          unit="to monetise" />
            <CalcFact label="Top earners"    value="Brand deals"   unit="dominate income" />
        </template>
        <template #description>
            <p>
                The <strong>TikTok Earnings Calculator</strong> estimates your monthly income from two sources: the <strong>TikTok Creator Fund</strong> (ad revenue share on views) and <strong>brand deal sponsorships</strong> (paid partnerships based on your follower count).
            </p>
            <p>
                Understanding both streams matters because they behave very differently:
            </p>
            <ul>
                <li><strong>Creator Fund</strong> — TikTok pays roughly $0.02–$0.05 per 1,000 views in the US and UK, less in other markets. This scales with views but is generally low compared to YouTube AdSense. The fund rate has also been declining as more creators join.</li>
                <li><strong>Brand deals</strong> — Sponsored posts are where most TikTok creators actually make money. Rates depend almost entirely on follower count and niche authority. A micro-creator with 50K followers can charge $500–$2,000 per post; creators above 1M can command $5,000–$25,000+.</li>
            </ul>
            <p>
                The total estimate assumes approximately <strong>2 sponsored posts per month</strong> — a realistic minimum for an active creator. Many creators do more, especially in niches like beauty, fashion, and fitness.
            </p>
        </template>
        <template #example>
            <p>
                A lifestyle creator in the <strong>EU</strong> with <strong>200,000 followers</strong> and <strong>800,000 monthly views</strong>.
            </p>
            <p>
                <strong>Creator Fund:</strong> EU RPM $0.01–$0.03. (800,000 / 1,000) × $0.01 = $8 to × $0.03 = <strong>$8 – $24/month</strong>.
            </p>
            <p>
                <strong>Brand deals:</strong> 100K–500K tier = $1,500–$5,000 per post × 2 posts = <strong>$3,000 – $10,000/month</strong>.
            </p>
            <p>
                <strong>Total estimate: $3,008 – $10,024/month.</strong>
            </p>
            <p>
                This illustrates why brand deals dominate TikTok income — the Creator Fund alone is rarely enough to build a full-time income.
            </p>
        </template>
        <template #faq>
            <CalcFaq :faqs="faqs" />
        </template>
    </UiCalcPage>
</template>

<script setup>
definePageMeta({ layout: 'brutalist' })

const faqs = [
    { q: "How much does TikTok pay per 1,000 views?", a: "TikTok's Creator Fund pays approximately $0.02–$0.05 per 1,000 views in the US and UK, and $0.01–$0.03 in Europe. Rates are lower in smaller markets like Greece. These rates have been declining as the creator pool grows." },
    { q: "How much does TikTok pay per 1,000 views in the UK?", a: "TikTok Creator Fund pays approximately $0.02–$0.04 per 1,000 views in the UK. At 1 million views per month, that's roughly $20–$40 from the fund alone. Brand deals are where UK creators typically earn serious money." },
    { q: "How much do TikTok creators earn from brand deals?", a: "Brand deal rates depend on follower count: nano (1K–10K) earns $50–$200 per post; micro (10K–50K) earns $200–$800; mid-tier (100K–500K) earns $1,500–$5,000; top creators (1M+) can earn $5,000–$25,000+ per sponsored post." },
    { q: "How many followers do you need to make money on TikTok?", a: "You need at least 10,000 followers and 100,000 views in the last 30 days to join the TikTok Creator Fund. For meaningful brand deal income, most creators start seeing opportunities around 50,000–100,000 followers." },
    { q: "How much does TikTok pay in Greece?", a: "TikTok Creator Fund rates in Greece are among the lowest in Europe — approximately $0.005–$0.02 per 1,000 views. Greek creators typically earn more through brand deals with local brands than through the Creator Fund." },
    { q: "Is TikTok or YouTube better for earning money?", a: "YouTube generally pays more per view through AdSense (especially in finance/tech niches), while TikTok's Creator Fund pays much less per view. However, TikTok's viral potential means views can scale faster. Most serious creators build income on both platforms." },
    { q: "How much can a TikTok account with 100K followers earn?", a: "At 100K followers you're in the micro-tier. Creator Fund income at 500K monthly views: roughly $10–$25/month. Brand deal income: $500–$1,500 per sponsored post. At 2 posts/month that's $1,000–$3,000 in brand deals. Total realistic monthly income: $1,010–$3,025. Most of this comes from brands, not the fund." },
    { q: "Does TikTok still pay through the Creator Fund?", a: "TikTok replaced the original Creator Fund with the Creativity Programme (now called Creator Rewards Programme) in some markets in 2024–2025. The new programme pays significantly more per view for videos over 1 minute that qualify — up to $0.50 per 1,000 views for high-performing content. Eligibility requires 10K+ followers and meeting quality thresholds." },
    { q: "What niches make the most money on TikTok?", a: "Finance, business, health/wellness, and B2B content attract the highest-value brand deals because advertisers in these sectors have larger budgets. Beauty and fashion also pay well due to product deal volume. Gaming and meme content may get high views but attract lower CPM brand deals. Niche authority matters more than raw follower count for brand deal rates." },
    { q: "How do I calculate my TikTok engagement rate?", a: "Engagement rate = (likes + comments + shares) ÷ total views × 100. A healthy TikTok engagement rate is 5–10%. Brands often pay more per post to creators with higher engagement rates even at lower follower counts, because engaged audiences convert better for advertisers." },
]

useCalcSEO(
    "TikTok Earnings Calculator — Creator Fund & Brand Deal Estimator",
    "Free TikTok earnings calculator. Enter monthly views, follower count, and country to estimate your Creator Fund income and brand deal value. Supports US, UK, EU, Greece and more.",
    faqs
)

useHead({
    script: [{
        type: 'application/ld+json',
        innerHTML: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'HowTo',
            name: 'How to Estimate Your TikTok Earnings',
            description: 'Calculate your TikTok Creator Fund income and brand deal value based on views, followers, and country.',
            step: [
                { '@type': 'HowToStep', position: 1, name: 'Enter your monthly views', text: 'Type your average monthly view count. Find this in your TikTok Analytics under Creator Tools.' },
                { '@type': 'HowToStep', position: 2, name: 'Enter your follower count', text: 'Your follower count determines your brand deal rate tier.' },
                { '@type': 'HowToStep', position: 3, name: 'Select your audience country', text: 'Choose the primary country your audience is in. US and UK yield the highest Creator Fund rates.' },
                { '@type': 'HowToStep', position: 4, name: 'Click Calculate', text: 'Your estimated Creator Fund income, brand deal value per post, and monthly total appear as a realistic range.' },
            ],
        }),
    }],
})
</script>
