<template>
    <UiCalcPage title="Compound Interest Calculator" category="finance" description-title="How your money grows with compounding">
        <template #calc>
            <CalculatorsFinanceCompoundInterestCalc />
        </template>
        <template #facts>
            <CalcFact label="Rule of 72"      value="72 ÷ rate = years to double" />
            <CalcFact label="Best frequency"  value="Daily > monthly > annually" />
            <CalcFact label="UK ISA rate"     value="~4–5% (2025)" />
            <CalcFact label="US HYSA rate"    value="~4.5–5.2% (2025)" />
        </template>
        <template #description>
            <p>
                The <strong>Compound Interest Calculator</strong> shows exactly how much your savings or investment grows when interest is reinvested over time — the core principle behind every savings account, ISA, and index fund in the world. Unlike simple interest, compound interest earns <em>interest on interest</em>, which accelerates growth dramatically over long periods.
            </p>
            <p>
                Three variables drive compound growth:
            </p>
            <ul>
                <li><strong>Rate</strong> — a UK Cash ISA at 4.5% and a US S&amp;P 500 index fund averaging 10% produce wildly different outcomes over 20 years.</li>
                <li><strong>Frequency</strong> — daily compounding beats monthly, which beats annual. The difference is modest on short timescales but meaningful over decades.</li>
                <li><strong>Contributions</strong> — adding even a small monthly amount (£100 / $200) often matters more than the compounding frequency, especially early on.</li>
            </ul>
            <p>
                This calculator runs a <strong>month-by-month simulation</strong> so your monthly contributions are applied accurately, not approximated with a closed-form formula.
            </p>
        </template>
        <template #example>
            <p>
                <strong>Scenario:</strong> £10,000 starting balance, 5% annual rate, monthly compounding, £300/month contributions, 10 years.
            </p>
            <p>
                Monthly rate ≈ 0.4167%. After 120 months the balance grows to approximately <strong>£69,700</strong>.
            </p>
            <p>
                Total contributed: £10,000 + (£300 × 120) = <strong>£46,000</strong>. Interest earned: <em>£23,700</em> — over half a year's contributions generated purely from compounding.
            </p>
            <p>
                Run the same numbers at 7% (closer to a global equity index fund long-term average) and the final balance jumps to around <strong>£77,200</strong>, earning £31,200 in interest.
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
    { q: "How does compound interest work?", a: "Compound interest means you earn interest on both your original principal and the interest already accumulated. For example, £1,000 at 5% annual interest earns £50 in year 1, then £52.50 in year 2 (5% of £1,050), and so on. Over long periods this snowball effect creates dramatically more wealth than simple interest." },
    { q: "How much does £10,000 grow with compound interest?", a: "At 5% annual rate compounded monthly with no additional contributions, £10,000 grows to approximately £16,470 in 10 years and £27,126 in 20 years. Add £200/month and those figures jump to roughly £42,000 and £95,000 respectively. The longer the timeframe, the more compounding dominates." },
    { q: "What is a good compound interest rate for UK savings?", a: "In 2025, UK Cash ISAs offer 4–5%, easy-access savings accounts 4.5–5%, and fixed-rate bonds up to 5.5%. Stocks and Shares ISAs tracking a global index have historically averaged 7–9% annually over 10-year rolling periods, though with more volatility than a cash account." },
    { q: "What is the difference between APR and APY (AER in the UK)?", a: "APR (Annual Percentage Rate) is the stated rate before compounding. APY (Annual Percentage Yield) — called AER in the UK — is the effective rate after compounding is applied. A 5% APR compounded monthly becomes a 5.12% AER. Always compare savings accounts using AER/APY, not APR." },
    { q: "What is the Rule of 72?", a: "The Rule of 72 is a quick mental shortcut: divide 72 by your annual interest rate to find the approximate number of years to double your money. At 6% it takes about 12 years (72 ÷ 6). At 9% it takes 8 years. At 4% (common for UK savings), about 18 years." },
    { q: "Does compounding frequency really matter?", a: "Yes, but the impact is smaller than most people expect. £10,000 at 5% for 10 years: annually → £16,289; monthly → £16,470; daily → £16,487. The difference between monthly and daily is only £17 on £10,000. Contribution amount and rate matter far more than compounding frequency." },
    { q: "How much do I need to save to have $100,000 in 10 years?", a: "At 5% annual rate compounded monthly with no starting balance, you'd need to save approximately $643/month. If you start with $10,000, that drops to about $447/month. Use the calculator to model your exact starting balance and rate." },
    { q: "What compound interest rate does the S&P 500 return?", a: "The S&P 500 has historically returned about 10% annually before inflation, or roughly 7% after inflation (real return). Over any specific 10-year window results vary widely — from as low as 1% to over 17% annualised. Index funds are not savings accounts; short-term volatility is real." },
    { q: "How much does £500 a month grow in 20 years at 5%?", a: "Starting from £0, £500/month at 5% compounded monthly for 20 years grows to approximately £206,000. Total contributions would be £120,000; interest earned ≈ £86,000. The last 5 years generate roughly as much interest as the first 15 combined — the classic compounding acceleration effect." },
    { q: "Is compound interest better than simple interest?", a: "Always, over long periods. On £10,000 at 5% for 20 years: simple interest = £10,000 + (£500 × 20) = £20,000. Compound interest (monthly) ≈ £27,126 — nearly 36% more. The advantage grows larger with higher rates and longer timeframes." },
    { q: "At what interest rate does money double in 10 years?", a: "Using the Rule of 72: 72 ÷ 10 years = 7.2% annual rate. To double in 10 years you need roughly 7.2% compounded annually. At 5% it takes about 14 years; at 10% about 7 years. Stocks and Shares ISAs or global index funds have historically approached or exceeded this rate over 10-year periods." },
]

useCalcSEO(
    "Compound Interest Calculator — Daily, Monthly & Yearly Growth",
    "Free compound interest calculator with monthly contributions. See how £1,000, £10,000 or $50,000 grows over time with daily, monthly or annual compounding. Works for UK ISAs, US savings accounts and investments.",
    faqs
)

useHead({
    script: [{
        type: 'application/ld+json',
        innerHTML: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'HowTo',
            name: 'How to Calculate Compound Interest',
            description: 'Use the compound interest calculator to project the growth of any savings or investment over time.',
            step: [
                { '@type': 'HowToStep', position: 1, name: 'Enter your starting amount', text: 'Type your initial deposit or investment. This is the principal that begins compounding immediately.' },
                { '@type': 'HowToStep', position: 2, name: 'Set the annual interest rate', text: 'Enter the annual rate as a percentage — for example, 5 for 5%. Check your bank\'s AER or your investment\'s historical average.' },
                { '@type': 'HowToStep', position: 3, name: 'Set the time period and compounding frequency', text: 'Enter the number of years and choose how often interest compounds — daily, monthly, quarterly, or annually.' },
                { '@type': 'HowToStep', position: 4, name: 'Add a monthly contribution (optional)', text: 'Enter a regular monthly deposit to see how contributions accelerate your balance over time.' },
                { '@type': 'HowToStep', position: 5, name: 'Click Calculate', text: 'Your final balance, total interest earned, total contributions, and effective APY all appear instantly.' },
            ],
        }),
    }],
})
</script>
