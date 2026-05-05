<template>
    <UiCalcPage title="Debt Payoff Calculator" category="finance" description-title="How long until you're debt-free — and what extra payments save">
        <template #calc>
            <CalculatorsFinanceDebtPayoffCalc />
        </template>
        <template #facts>
            <CalcFact label="UK credit card APR" value="~20–30% (avg)" />
            <CalcFact label="US avg credit card"  value="~22% APR (2025)" />
            <CalcFact label="Extra £50/month"     value="saves months/years" />
            <CalcFact label="Min payment trap"    value="adds years of interest" />
        </template>
        <template #description>
            <p>
                The <strong>Debt Payoff Calculator</strong> tells you exactly how long it will take to pay off any debt — credit card, personal loan, or overdraft — and shows how much interest you'll pay in total. Enter an extra monthly payment to instantly see how many months and pounds (or dollars) you save by paying more than the minimum.
            </p>
            <p>
                The most important insight from this calculator is usually the interest cost of slow payoff. On a <strong>£5,000 credit card at 24% APR</strong>, paying the minimum each month can keep you in debt for over 10 years and cost more than the original balance in interest. Adding even £50/month can cut years off that timeline.
            </p>
            <p>
                The calculator runs a <strong>month-by-month amortisation</strong>: each month interest accrues on the remaining balance, your payment comes off, and the cycle repeats. This is the exact method banks use.
            </p>
        </template>
        <template #example>
            <p>
                <strong>Scenario:</strong> £8,000 credit card balance, 22% APR, £250/month payment.
            </p>
            <p>
                Monthly interest rate: 22% ÷ 12 = 1.833%. First month interest: <em>£146.67</em>. Payment reduces balance by £103.33.
            </p>
            <p>
                At £250/month it takes approximately <strong>42 months (3.5 years)</strong> to pay off, with roughly <strong>£2,350 in total interest</strong>.
            </p>
            <p>
                Add £100/month (£350 total): payoff drops to about <strong>28 months (2 yr 4 mo)</strong>, saving over <strong>£700 in interest</strong> and 14 months of payments.
            </p>
        </template>
    </UiCalcPage>
</template>

<script setup>
definePageMeta({ layout: 'brutalist' })
useCalcSEO(
    "Debt Payoff Calculator — Credit Card & Loan Payoff Timeline",
    "Free debt payoff calculator. See how long to pay off credit cards, loans, or any debt, and how much interest extra payments save. Works for UK and US debt at any APR.",
    [
        { q: "How long does it take to pay off £10,000 of credit card debt?", a: "It depends on your APR and monthly payment. At 22% APR paying £250/month: about 55 months (4 yr 7 mo) with roughly £3,700 in interest. Increase to £400/month and it drops to about 30 months (2 yr 6 mo), saving over £1,600 in interest. Use the calculator to model your exact balance and rate." },
        { q: "What happens if I only pay the minimum on my credit card?", a: "Minimum payments are typically 1–3% of the balance. At this rate, a £3,000 balance at 20% APR could take 15+ years to pay off and cost more than the original debt in interest. The calculator shows this clearly — most people are shocked by the result." },
        { q: "How much does an extra £50 a month save on debt?", a: "It varies by balance and rate, but extra payments have a disproportionate impact. On a £5,000 debt at 22% APR with £150/month base payment, adding £50/month saves roughly 12 months and £400–£600 in interest. The higher your APR, the more each extra pound saves." },
        { q: "What is APR and how does it affect my debt payoff?", a: "APR (Annual Percentage Rate) is the yearly interest rate on your debt. A higher APR means more of each payment goes to interest rather than reducing your balance. At 10% APR, most of your £200 payment clears principal. At 30% APR, nearly half of it goes to interest first." },
        { q: "How do I pay off credit card debt fast in the UK?", a: "The fastest methods are: (1) Transfer to a 0% balance transfer card — many UK cards offer 20–30 months interest-free, during which every payment goes to principal. (2) Pay more than the minimum — even an extra £30–50/month makes a substantial difference. (3) Use the debt avalanche: pay off the highest-APR debt first to minimise total interest." },
        { q: "What is the debt avalanche vs snowball method?", a: "The avalanche method pays off the highest-interest debt first, saving the most money mathematically. The snowball method pays off the smallest balance first for psychological wins and momentum. Both work — avalanche saves more money, snowball is easier to stick with. This calculator models single-debt payoff; for multiple debts, list them in order of priority." },
        { q: "How long to pay off $5,000 in credit card debt?", a: "At 20% APR paying $150/month, about 42 months (3.5 years) with roughly $1,250 in interest. At $250/month: about 24 months (2 years), saving over $600 in interest. The calculator lets you model any combination of balance, rate, and payment." },
        { q: "What if my monthly payment is less than the interest?", a: "If your payment is equal to or less than the monthly interest charge, your balance will never decrease — it will grow. The calculator flags this as 'Never — increase payment.' This is called a negative amortisation situation and you must increase your payment immediately." },
    ]
)

useHead({
    script: [{
        type: 'application/ld+json',
        innerHTML: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'HowTo',
            name: 'How to Calculate Your Debt Payoff Timeline',
            description: 'Use the debt payoff calculator to find out how long it takes to clear any debt and how much extra payments save.',
            step: [
                { '@type': 'HowToStep', position: 1, name: 'Enter your debt balance', text: 'Type the current outstanding balance on your credit card, loan, or overdraft.' },
                { '@type': 'HowToStep', position: 2, name: 'Enter the interest rate (APR)', text: 'Enter your annual percentage rate. Find this on your credit card statement or loan agreement.' },
                { '@type': 'HowToStep', position: 3, name: 'Enter your monthly payment', text: 'Enter how much you plan to pay each month. Must be more than the minimum interest to make progress.' },
                { '@type': 'HowToStep', position: 4, name: 'Add an extra payment (optional)', text: 'Enter any additional amount you could pay monthly to see how much time and interest you would save.' },
                { '@type': 'HowToStep', position: 5, name: 'Click Calculate', text: 'See your payoff timeline, total interest cost, and how much the extra payment saves.' },
            ],
        }),
    }],
})
</script>
