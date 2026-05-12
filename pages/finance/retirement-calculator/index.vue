<template>
    <UiCalcPage title="Retirement Calculator" category="finance" description-title="How much will you have when you retire?">
        <template #calc>
            <CalculatorsFinanceRetirementCalc />
        </template>
        <template #facts>
            <CalcFact label="4% rule"           value="Safe annual withdrawal rate" />
            <CalcFact label="401k limit 2025"   value="$23,500/yr (under 50)" />
            <CalcFact label="IRA limit 2025"    value="$7,000/yr (under 50)" />
            <CalcFact label="Target"            value="25× annual expenses" />
        </template>
        <template #description>
            <p>
                The <strong>Retirement Calculator</strong> projects how much you'll have saved by retirement based on your current age, retirement age, existing savings, monthly contributions, and expected annual return. It also shows the monthly income that balance could sustain using the 4% safe withdrawal rule — one of the most widely cited guidelines in retirement planning.
            </p>
            <p>
                The 4% rule states that if you withdraw 4% of your portfolio in the first year of retirement and adjust for inflation each year after, your portfolio has historically lasted 30+ years in most market scenarios (based on US historical data from the Trinity Study).
            </p>
            <p>
                Key milestones to know:
            </p>
            <ul>
                <li><strong>25× rule</strong> — to retire, you need approximately 25 times your annual expenses saved. $50,000/year in expenses = $1.25M needed.</li>
                <li><strong>Start early</strong> — starting at 25 vs 35 with the same contribution can result in a portfolio more than twice as large by age 65 due to compounding.</li>
                <li><strong>Employer match</strong> — always contribute at least enough to capture a full 401(k) employer match. It's an immediate 50–100% return on that money.</li>
            </ul>
        </template>
        <template #example>
            <p>
                <strong>Scenario:</strong> Age 30, retirement at 65, $15,000 current savings, $600/month contribution, 7% annual return.
            </p>
            <p>
                35 years of compounding at 7% monthly. Final balance: approximately <strong>$1.34M</strong>.
            </p>
            <p>
                Total contributed: $15,000 + ($600 × 420 months) = <em>$267,000</em>. Investment growth: ~$1.07M. Monthly income at 4% withdrawal: approximately <strong>$4,467/month</strong>.
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
    { q: "How much do I need to retire?", a: "The most widely used rule: you need 25× your annual retirement expenses saved. If you expect to spend $60,000/year in retirement, you need $1.5M. This is based on the 4% safe withdrawal rate — the percentage of your portfolio you can withdraw annually with a high probability the money lasts 30+ years. Use this calculator to see if your current savings trajectory hits that target." },
    { q: "What is the 4% rule?", a: "The 4% rule comes from the Trinity Study (1998): if you withdraw 4% of your portfolio in the first year of retirement and adjust for inflation each year after, your portfolio historically survived 30 years in ~96% of scenarios based on US market data. It's a guideline, not a guarantee — many financial planners now suggest 3–3.5% for retirements longer than 30 years or in today's lower-return environment." },
    { q: "What return rate should I use for retirement planning?", a: "For a stock-heavy portfolio (80%+ equities), 7% is a commonly used real (inflation-adjusted) return assumption. For a balanced portfolio (60/40 stocks/bonds), 5–6% real is reasonable. Using nominal returns (not adjusted for inflation) of 8–10% works if you also plan to adjust your spending for inflation in retirement. Conservative planners often use 5–6% nominal to build in a safety margin." },
    { q: "How much should I save per month for retirement?", a: "A common target: save 15% of gross income for retirement, including any employer match. At age 25 earning $60,000/year, 15% = $750/month. Starting later means saving more. A rough rule: the percentage of income you should save equals half your age when you started saving (so starting at 30 means saving 15%+). This calculator lets you experiment with different monthly amounts to find your number." },
    { q: "What is a 401k and how much can I contribute in 2025?", a: "A 401(k) is a US employer-sponsored retirement account where contributions reduce your taxable income. The 2025 contribution limit is $23,500 for those under 50, and $31,000 for those 50+ (catch-up contributions). Many employers match contributions up to a percentage of salary — typically 3–6%. Always contribute at least enough to get the full employer match; it's free money." },
    { q: "What is the difference between a Roth IRA and a traditional IRA?", a: "Traditional IRA: contributions may be tax-deductible (reduces taxable income now), but withdrawals in retirement are taxed as ordinary income. Roth IRA: contributions are made after tax (no immediate deduction), but withdrawals in retirement — including all growth — are completely tax-free. The 2025 IRA contribution limit is $7,000 ($8,000 if 50+). Roth is generally better for younger, lower-income earners; traditional for higher earners who expect a lower tax rate in retirement." },
    { q: "When can I retire early?", a: "You can technically retire at any age if your savings cover your expenses indefinitely. The FIRE movement (Financial Independence, Retire Early) targets a 25× expenses portfolio. For a 40-year retirement instead of 30, many planners suggest a 3.5% withdrawal rate (need 28× expenses). Early retirement has Social Security implications too — you can claim at 62 at a reduced benefit, or wait until 70 for the maximum. Use this calculator to see when your portfolio crosses your target." },
    { q: "How does starting to save early affect retirement?", a: "Dramatically. Saving $500/month from age 25 to 65 at 7% returns produces roughly $1.3M. Starting the same contributions at 35 produces only ~$610K — less than half, with only 10 fewer years of contributions. The first 10 years of compounding create growth that can never be fully recovered by saving more later. Time in the market is the single most powerful variable in retirement planning." },
]

useCalcSEO(
    "Retirement Calculator — Project Your Savings & Monthly Income",
    "Free retirement calculator. Enter your age, retirement age, current savings, and monthly contribution to project your retirement balance and monthly income using the 4% rule.",
    faqs
)

useHead({
    script: [{
        type: 'application/ld+json',
        innerHTML: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'HowTo',
            name: 'How to Project Your Retirement Savings',
            description: 'Calculate how much you will have at retirement and what monthly income it can sustain.',
            step: [
                { '@type': 'HowToStep', position: 1, name: 'Enter your current and retirement age', text: 'Type your current age and the age at which you plan to retire.' },
                { '@type': 'HowToStep', position: 2, name: 'Enter your current savings', text: 'Enter how much you have already saved for retirement. Enter 0 if you are starting fresh.' },
                { '@type': 'HowToStep', position: 3, name: 'Enter your monthly contribution', text: 'Enter how much you contribute to retirement accounts each month, including employer match.' },
                { '@type': 'HowToStep', position: 4, name: 'Set your expected annual return', text: 'Enter the expected annual return. Use 7% for a stock-heavy portfolio, 5–6% for a balanced portfolio.' },
                { '@type': 'HowToStep', position: 5, name: 'Click Calculate', text: 'See your projected retirement balance, total contributed, investment growth, and estimated monthly income using the 4% rule.' },
            ],
        }),
    }],
})
</script>
