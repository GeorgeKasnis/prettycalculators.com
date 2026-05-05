<template>
    <UiCalcPage title="Savings Goal Calculator" category="finance" description-title="How long to save £10,000, £20,000 — or any target">
        <template #calc>
            <CalculatorsFinanceSavingsGoalCalc />
        </template>
        <template #facts>
            <CalcFact label="UK house deposit"  value="avg £53,000 (2025)" />
            <CalcFact label="Emergency fund"    value="3–6 months expenses" />
            <CalcFact label="High-yield savings" value="4–5% UK / US (2025)" />
            <CalcFact label="Power of starting" value="earlier = less monthly" />
        </template>
        <template #description>
            <p>
                The <strong>Savings Goal Calculator</strong> answers the question everyone has: <em>if I save £X per month, how long until I reach my goal?</em> Enter your target amount, current savings, monthly contribution, and interest rate — and get back the exact month and year you'll hit that number.
            </p>
            <p>
                Interest rate matters more than most people expect. Saving £400/month into a current account earning 0% takes years longer than the same £400 in a high-yield ISA or savings account at 4.5%. The calculator models this precisely with a month-by-month simulation.
            </p>
            <p>
                Common uses:
            </p>
            <ul>
                <li>House deposit savings plan (UK: average first-time buyer deposit is £53,000)</li>
                <li>Emergency fund target (3–6 months of expenses)</li>
                <li>Holiday, wedding, or car savings</li>
                <li>"How much do I need to save to retire by X age?"</li>
            </ul>
        </template>
        <template #example>
            <p>
                <strong>Goal:</strong> Save a £20,000 house deposit starting from £3,000, contributing £500/month into a 4.5% annual-rate ISA.
            </p>
            <p>
                Without interest: (£20,000 − £3,000) ÷ £500 = 34 months. With 4.5% interest compounding monthly, the balance grows slightly faster — goal reached in approximately <strong>31 months</strong>, saving 3 months of contributions.
            </p>
            <p>
                If you can push contributions to £700/month, that drops to roughly <strong>22 months</strong> — over a year faster, for £200 more per month.
            </p>
        </template>
    </UiCalcPage>
</template>

<script setup>
definePageMeta({ layout: 'brutalist' })
useCalcSEO(
    "Savings Goal Calculator — How Long to Save £10,000, £20,000 or More",
    "Free savings goal calculator. Enter your target, monthly savings, and interest rate to find out exactly when you'll reach your goal. Works for house deposits, emergency funds, and any savings target in £ or $.",
    [
        { q: "How long does it take to save £10,000?", a: "At £300/month with no interest it takes about 33 months (2 yr 9 mo). Add a 4.5% savings rate and it drops to roughly 31 months. At £500/month: about 19 months. The exact timeline depends on how much you already have saved and your account's interest rate — enter your numbers above for a precise answer." },
        { q: "How long does it take to save £20,000 for a house deposit?", a: "At £500/month with £2,000 already saved at 4.5% interest: approximately 33 months (under 3 years). At £700/month: about 24 months. The UK average first-time buyer deposit is around £53,000 in 2025, which at £700/month and 4.5% interest takes roughly 5.5 years from zero." },
        { q: "How much should I save each month to reach my goal faster?", a: "The single biggest lever is contribution amount, not interest rate. Doubling your monthly contribution roughly halves the time to your goal. Interest compounding helps most over longer periods (5+ years). To reach a goal faster, focus first on increasing your monthly saving, then on maximising your interest rate." },
        { q: "What is the best savings account rate in the UK in 2025?", a: "In 2025, UK easy-access savings accounts offer 4.5–5%, fixed-rate bonds up to 5.5%, and Cash ISAs 4–5%. Regular saver accounts can offer 6–8% but cap monthly deposits (typically £200–500). For large balances, a fixed-rate ISA or bond usually offers the best rate." },
        { q: "How much should I have saved by age 30?", a: "A common guideline is to have 1× your annual salary saved by 30. For a £30,000 salary that means £30,000. If you're behind, contributing £400–600/month into a high-yield account or Stocks and Shares ISA from your mid-20s can close the gap — use this calculator with your current savings and monthly contribution to see your timeline." },
        { q: "How long to save $10,000 in the US?", a: "At $300/month with no existing savings and 4.8% APY (typical US HYSA in 2025): about 31 months. At $500/month: about 19 months. At $200/month: about 47 months. Starting with $1,000 already saved shaves a few months off each figure." },
        { q: "Does the interest rate on a savings account really matter?", a: "For short goals (under 2 years), interest rate has a small effect — the difference between 0% and 5% on a 1-year save of £500/month is only about £150. Over 5 years it's £1,500+. For house deposits and longer goals, maximising your savings rate (ISA, HYSA) is genuinely worthwhile." },
        { q: "What is a realistic savings rate (%) for UK savers?", a: "In 2025: easy-access ISAs and savings accounts typically offer 4–5.5%. If your savings pot will be invested in a Stocks and Shares ISA for 5+ years, a 7–8% long-run average is a commonly cited planning figure (though returns vary year to year). Use 0% to see the no-interest baseline." },
    ]
)

useHead({
    script: [{
        type: 'application/ld+json',
        innerHTML: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'HowTo',
            name: 'How to Plan Your Savings Goal',
            description: 'Use the savings goal calculator to find out when you will reach a savings target based on contributions and interest.',
            step: [
                { '@type': 'HowToStep', position: 1, name: 'Enter your savings goal', text: 'Type the target amount you want to reach — for example, £10,000 for an emergency fund or £50,000 for a house deposit.' },
                { '@type': 'HowToStep', position: 2, name: 'Enter your current savings', text: 'If you already have money saved toward this goal, enter it here. Leave blank or enter 0 if you\'re starting from scratch.' },
                { '@type': 'HowToStep', position: 3, name: 'Enter your monthly contribution', text: 'How much you plan to add each month. This is the most important variable — increasing it has the biggest impact on your timeline.' },
                { '@type': 'HowToStep', position: 4, name: 'Enter an interest rate (optional)', text: 'Enter the annual interest rate of your savings account or ISA. Use 0 to see the baseline with no interest.' },
                { '@type': 'HowToStep', position: 5, name: 'Click Calculate', text: 'See how many months until you reach your goal, the exact calendar date, total amount saved, and interest earned.' },
            ],
        }),
    }],
})
</script>
