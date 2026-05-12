<template>
    <UiCalcPage title="Investment Calculator" category="finance" description-title="Grow your money with compound returns & monthly contributions">
        <template #calc>
            <CalculatorsFinanceInvestmentCalc />
        </template>
        <template #facts>
            <CalcFact label="S&P 500 avg return"  value="~10%/yr (historical)" />
            <CalcFact label="Global index avg"    value="~7–9%/yr (real)" />
            <CalcFact label="Rule of 72"          value="72 ÷ rate = years to double" />
            <CalcFact label="Inflation adj."      value="Subtract ~3% from nominal rate" />
        </template>
        <template #description>
            <p>
                The <strong>Investment Calculator</strong> projects how your money grows over time using compound returns and optional monthly contributions. Whether you're investing in an index fund, ETF, stocks, or a high-yield savings account, the same mathematics applies: returns compound on top of previous returns, accelerating growth the longer you stay invested.
            </p>
            <p>
                Three variables drive investment outcomes:
            </p>
            <ul>
                <li><strong>Initial amount</strong> — the starting principal. A larger lump sum means more capital compounding from day one.</li>
                <li><strong>Annual return</strong> — the S&P 500 has averaged ~10% annually before inflation historically. A globally diversified index fund averages ~7–9%. Cash savings accounts in 2025 offer ~4–5%.</li>
                <li><strong>Time</strong> — the most powerful variable. Doubling your time in the market has a far greater effect than doubling your initial investment.</li>
            </ul>
            <p>
                Monthly contributions often matter more than the initial investment, especially over 10+ year periods. Consistency beats timing.
            </p>
        </template>
        <template #example>
            <p>
                <strong>Scenario:</strong> $10,000 initial, 8% annual return, $300/month contributions, 20 years.
            </p>
            <p>
                Monthly rate: 8% ÷ 12 ≈ 0.667%. After 240 months, the balance grows to approximately <strong>$224,000</strong>.
            </p>
            <p>
                Total contributed: $10,000 + ($300 × 240) = <strong>$82,000</strong>. Investment growth: <em>~$142,000</em> — nearly twice the amount you put in, generated purely from compounding returns.
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
    { q: "What return rate should I use in the investment calculator?", a: "For a US stock index fund (S&P 500), 10% is the historical nominal average, or ~7% after inflation. For a global equity index, use 7–9% nominal. For bonds, 3–5%. For a high-yield savings account in 2025, 4.5–5.2%. For a balanced 60/40 portfolio, ~7% is a reasonable long-run estimate. Using 6–7% gives a conservative but realistic picture for equity-heavy long-term investing." },
    { q: "How much does $10,000 grow to in 10 years?", a: "At 7% annual return: $10,000 grows to ~$19,672 — roughly doubling. At 10%: ~$25,937. Add $200/month at 7%: the total reaches ~$53,000. The monthly contributions matter enormously over a 10-year period, often contributing more to the final balance than the initial lump sum." },
    { q: "What is ROI and how is it calculated?", a: "ROI (Return on Investment) is the total percentage gain on money invested. ROI = (Total Return ÷ Total Invested) × 100. If you invest $50,000 total (principal + contributions) and end with $120,000, your ROI is 140%. Note this is a simple total ROI, not an annualised figure — for comparing investments over different time periods, use CAGR (Compound Annual Growth Rate) instead." },
    { q: "What is the Rule of 72?", a: "The Rule of 72 is a mental shortcut: divide 72 by your expected annual return to find roughly how many years it takes to double your money. At 8%: 72 ÷ 8 = 9 years. At 6%: 12 years. At 10%: 7.2 years. It's an approximation (more accurate between 6–10%), but useful for quick planning without a calculator." },
    { q: "Is it better to invest a lump sum or monthly?", a: "Mathematically, investing a lump sum immediately outperforms dollar-cost averaging (DCA) about two-thirds of the time, because more money is invested earlier and compounding starts sooner. However, DCA — investing a fixed amount monthly — removes the risk of investing everything at a market peak and is psychologically easier for most people. Both strategies dramatically outperform waiting on the sidelines." },
    { q: "How does inflation affect investment returns?", a: "Inflation erodes purchasing power over time. If your investment earns 8% nominally and inflation runs at 3%, your real return is about 5%. For long-term planning, it's worth running the calculator twice: once with your nominal expected return, and once with a 3% lower rate to see inflation-adjusted outcomes. Over 20+ years, the difference is significant." },
    { q: "What is the difference between stocks and bonds for returns?", a: "Historically, US stocks (S&P 500) have returned ~10%/year nominal, with high short-term volatility. Long-term government bonds have returned ~3–5%, with much lower volatility. A classic 60% stocks / 40% bonds portfolio has historically returned ~7–8% with considerably smoother year-to-year performance. As a rule: the longer your time horizon, the more volatility you can afford, and the higher your allocation to equities can reasonably be." },
    { q: "How much do I need to invest to have $1,000,000?", a: "At 8% annual return: starting from zero, you need to invest ~$685/month for 30 years. With a $50,000 head start, that drops to ~$415/month. At 10% return: ~$440/month from zero. At 6% return: ~$995/month from zero. The combination of return rate and time horizon is what determines the required monthly contribution — use this calculator to find your specific number." },
]

useCalcSEO(
    "Investment Calculator — Compound Growth with Monthly Contributions",
    "Free investment calculator. Enter your initial amount, annual return, and monthly contribution to project your investment portfolio over any time period. Works for stocks, ETFs, index funds, and savings accounts.",
    faqs
)

useHead({
    script: [{
        type: 'application/ld+json',
        innerHTML: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'HowTo',
            name: 'How to Project Your Investment Growth',
            description: 'Calculate how much your investments will be worth over time with compound returns.',
            step: [
                { '@type': 'HowToStep', position: 1, name: 'Enter your initial investment', text: 'Type the amount you are starting with. Leave at zero if you are starting from scratch.' },
                { '@type': 'HowToStep', position: 2, name: 'Enter the expected annual return', text: 'Enter the annual return rate as a percentage. Use 7–10% for equity index funds, 4–5% for savings accounts.' },
                { '@type': 'HowToStep', position: 3, name: 'Enter the time period', text: 'Enter how many years you plan to invest.' },
                { '@type': 'HowToStep', position: 4, name: 'Add a monthly contribution (optional)', text: 'Enter a regular monthly deposit to see how consistent contributions accelerate growth.' },
                { '@type': 'HowToStep', position: 5, name: 'Click Calculate', text: 'See your projected final value, total invested, total return, and ROI percentage.' },
            ],
        }),
    }],
})
</script>
