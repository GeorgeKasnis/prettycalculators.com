<template>
    <UiCalcPage title="YouTube Earnings Calculator" category="finance" description-title="Estimate how much your channel makes from ads">
        <template #calc>
            <CalculatorsFinanceYoutubeCalc />
        </template>
        <template #facts>
            <CalcFact label="Revenue model" value="CPM / RPM" />
            <CalcFact label="US RPM range"  value="$4 – $8" />
            <CalcFact label="Finance niche" value="2.5× multiplier" />
            <CalcFact label="Paid per"      value="1,000 views" />
        </template>
        <template #description>
            <p>
                The <strong>YouTube Earnings Calculator</strong> estimates how much ad revenue your channel generates each month and year based on your view count, content niche, and audience location. YouTube pays creators through <strong>AdSense RPM</strong> — revenue per thousand monetised views — which varies significantly by country and topic.
            </p>
            <p>
                Two factors drive earnings more than raw view count:
            </p>
            <ul>
                <li><strong>Country</strong> — US and UK audiences generate the highest RPM ($4–$9) because advertisers pay more to reach those markets. Greek or other smaller-market audiences typically yield $1–$3 RPM.</li>
                <li><strong>Niche</strong> — Finance and business channels earn 2–3× more per view than gaming or entertainment, because financial advertisers (banks, brokerages, insurance) bid heavily for that audience.</li>
            </ul>
            <p>
                This calculator multiplies your monthly views by the estimated RPM for your country and niche to give a realistic earnings <strong>range</strong> — not a single figure — because real RPM fluctuates with ad market conditions, seasonality (Q4 pays more), and video performance.
            </p>
        </template>
        <template #example>
            <p>
                A tech channel in the <strong>UK</strong> with <strong>500,000 monthly views</strong>.
            </p>
            <p>
                UK base RPM: $5–$9. Tech niche multiplier: ×1.8.
            </p>
            <p>
                Effective RPM: <em>$9 – $16.20</em>
            </p>
            <p>
                Monthly earnings: <em>(500,000 / 1,000) × $9 = $4,500</em> to <em>500 × $16.20 = $8,100</em>
            </p>
            <p>
                Estimated monthly: <strong>$4,500 – $8,100</strong>. Yearly: <strong>$54,000 – $97,200</strong>.
            </p>
            <p>
                Note: this is <em>gross AdSense revenue before YouTube's 45% cut</em>. Your actual payout is roughly 55% of the gross figure. The calculator shows gross to match what YouTube Studio reports as "estimated revenue."
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
    { q: "How much does YouTube pay per 1,000 views?", a: "YouTube pays through RPM (revenue per thousand views), which varies by country and niche. US channels typically earn $4–$8 RPM, UK channels $5–$9, EU average $2–$4, and smaller markets like Greece $1–$3. Finance and business niches can 2–3× these figures." },
    { q: "How much does YouTube pay per 1,000 views in the UK?", a: "UK YouTube channels earn approximately $5–$9 RPM on average. Finance and tech channels in the UK can reach $10–$20+ RPM. These are gross figures — YouTube takes a 45% cut, so your payout is roughly 55% of RPM." },
    { q: "How much does YouTube pay per 1,000 views in Greece?", a: "Greek YouTube channels typically earn $1–$3 RPM, as advertiser demand and CPM rates in Greece are lower than in the US or UK. Niche matters: a Greek finance channel will earn significantly more than a Greek gaming channel." },
    { q: "What is YouTube RPM vs CPM?", a: "CPM is what advertisers pay per 1,000 ad impressions. RPM is what the creator receives per 1,000 video views — it's lower than CPM because not every view shows an ad, and YouTube takes a 45% revenue share. RPM is the number that matters for your earnings." },
    { q: "Which YouTube niche earns the most money?", a: "Finance, investing, and business channels earn the most — often 2–3× more per view than average. Tech and software come second. Gaming and entertainment niches typically earn the least per view, though high view volumes can still generate substantial income." },
    { q: "How accurate is this YouTube earnings calculator?", a: "The calculator gives a realistic range based on typical RPM data by country and niche. Actual earnings vary by season (Q4 pays 30–50% more), individual video performance, ad formats, and audience engagement. Use it as a planning estimate, not a guarantee." },
    { q: "How much does YouTube pay for 1 million views?", a: "At a typical US RPM of $5, 1 million views earns $5,000 gross — after YouTube's 45% cut, your payout is approximately $2,750. For a finance channel at $12 RPM: $12,000 gross → $6,600 payout. For a gaming channel in Greece at $1.5 RPM: $1,500 gross → $825 payout. Niche and location drive the 8× spread between extremes." },
    { q: "How many subscribers do you need to monetise on YouTube?", a: "To join the YouTube Partner Programme you need 1,000 subscribers and 4,000 watch hours in the past 12 months (or 10 million YouTube Shorts views in 90 days). Once monetised, your earnings scale with views and RPM, not subscriber count directly." },
    { q: "Why is my YouTube RPM so low?", a: "Low RPM is usually caused by: audience in low-CPM markets (non-English speaking or developing countries), content in low-value niches (gaming, vlogs, memes), high proportion of mobile viewers (mobile ads pay less than desktop), or most views coming from non-monetised regions. Improving RPM means either shifting niche, targeting English-speaking audiences, or creating longer videos where multiple ads can show." },
    { q: "Does YouTube pay more in Q4?", a: "Yes — Q4 (October–December) consistently pays 30–60% more per view than Q1–Q3, because advertisers spend more before the holiday shopping season. Many YouTubers earn 25–35% of their annual AdSense revenue in Q4 alone. Q1 is typically the lowest-earning quarter as advertiser budgets reset." },
]

useCalcSEO(
    "YouTube Earnings Calculator — Estimate Ad Revenue by Country & Niche",
    "Free YouTube earnings calculator. Enter monthly views, content niche, and audience country to estimate monthly and yearly AdSense revenue. Supports US, UK, EU, Greece and more.",
    faqs
)

useHead({
    script: [{
        type: 'application/ld+json',
        innerHTML: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'HowTo',
            name: 'How to Estimate Your YouTube Ad Earnings',
            description: 'Calculate your estimated YouTube AdSense revenue based on views, niche, and audience country.',
            step: [
                { '@type': 'HowToStep', position: 1, name: 'Enter your monthly views', text: 'Type your average monthly view count. Find this in YouTube Studio under Analytics → Overview.' },
                { '@type': 'HowToStep', position: 2, name: 'Select your content niche', text: 'Choose the category that best matches your content. Finance and tech niches command higher ad rates than gaming or entertainment.' },
                { '@type': 'HowToStep', position: 3, name: 'Select your audience country', text: 'Choose the primary country your viewers are in. US and UK audiences generate the highest RPM.' },
                { '@type': 'HowToStep', position: 4, name: 'Click Calculate', text: 'Your estimated monthly and yearly earnings range appears, based on typical RPM for your country and niche combination.' },
            ],
        }),
    }],
})
</script>
