<template>
    <UiCalcPage title="Credit Card Payoff Calculator" category="finance" description-title="Pay off your balance & see how much minimum payments cost you">
        <template #calc>
            <CalculatorsFinanceCreditCardPayoffCalc />
        </template>
        <template #facts>
            <CalcFact label="Avg US CC APR"    value="~22–24% (2025)" />
            <CalcFact label="Min payment trap" value="Often just 1–2% of balance" />
            <CalcFact label="Best strategy"    value="Avalanche (highest rate first)" />
            <CalcFact label="Interest formula" value="Daily rate × balance × days" />
        </template>
        <template #description>
            <p>
                The <strong>Credit Card Payoff Calculator</strong> shows you exactly how long it will take to pay off your credit card balance, how much interest you'll pay in total, and — critically — how much longer and more expensive it is if you only make the minimum payment each month.
            </p>
            <p>
                Credit card minimum payments are designed to keep you in debt as long as possible. A typical minimum payment of 1% of the balance plus interest means it can take <em>decades</em> to pay off a $5,000 balance at 22% APR — at a cost of thousands in interest. Making even a modest fixed payment dramatically accelerates payoff.
            </p>
            <p>
                Two proven payoff strategies:
            </p>
            <ul>
                <li><strong>Avalanche</strong> — pay minimums on all cards, put every extra dollar toward the highest-APR card. Saves the most money.</li>
                <li><strong>Snowball</strong> — pay minimums on all cards, put extra toward the smallest balance. Builds momentum faster, may cost slightly more in interest.</li>
            </ul>
        </template>
        <template #example>
            <p>
                <strong>Scenario:</strong> $5,000 balance at 22.99% APR. Monthly payment: $150.
            </p>
            <p>
                Monthly interest rate: 22.99% ÷ 12 ≈ 1.916%. At $150/month: payoff in approximately <strong>42 months</strong>, total interest ~$1,254.
            </p>
            <p>
                Minimum payment (~$75 at start): payoff takes well over <em>10 years</em>, total interest exceeds $4,000 — almost doubling the original debt.
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
    { q: "How long does it take to pay off a credit card?", a: "It depends entirely on your balance, interest rate, and monthly payment. At $5,000 and 22% APR, paying $200/month takes about 30 months with ~$880 in interest. Paying only the minimum (roughly 2% of balance) stretches this to over 10 years with $4,000+ in interest. The minimum payment is the most expensive way to pay off a credit card." },
    { q: "What is the minimum credit card payment?", a: "Most card issuers calculate the minimum as either a flat amount (often $25–35) or a percentage of the balance — typically 1–2% plus that month's interest and fees — whichever is greater. On a $5,000 balance at 22% APR, the minimum might be around $115–130. This number shrinks each month as the balance decreases, which is what makes minimum-only payoff so slow." },
    { q: "What is the fastest way to pay off credit card debt?", a: "Pay as much above the minimum as possible, consistently. If you have multiple cards, use the avalanche method: pay minimums on all cards, then put every spare dollar toward the card with the highest APR. This minimises total interest paid. The snowball method (targeting smallest balance first) is psychologically easier for some people and can improve consistency." },
    { q: "Should I pay off my credit card in full every month?", a: "Yes — if you can. Paying the full statement balance by the due date avoids all interest charges entirely. Credit cards are interest-free tools when paid in full. Interest only accrues when you carry a balance. If that's not currently possible, paying significantly more than the minimum is the next best step." },
    { q: "How much does credit card interest cost per month?", a: "Credit card interest accrues daily. Daily rate = APR ÷ 365. On a $5,000 balance at 22.99% APR, the daily rate is ≈0.063%. Monthly interest ≈ $5,000 × 22.99% ÷ 12 ≈ $96. This means your first minimum payment of ~$125 only reduces the balance by about $29. The rest goes to the lender." },
    { q: "What is the avalanche vs snowball method?", a: "Avalanche: pay minimums on all debts, then put all extra money toward the highest-interest debt first. This saves the most money overall. Snowball: pay minimums on all debts, then target the smallest balance regardless of rate. This gives quicker wins and can help with motivation. Mathematically, avalanche wins; behaviourally, snowball helps people stick to the plan. Either beats paying minimums only." },
    { q: "Can I negotiate a lower credit card APR?", a: "Yes — and it works more often than people think. Call your card issuer, mention your payment history, and ask for a rate reduction. Cardholders with a good track record (on-time payments, long account history) have a reasonable chance. Even reducing 24% APR to 20% on a $5,000 balance saves about $200 over 3 years. It costs nothing to ask." },
    { q: "Is a balance transfer worth it?", a: "A 0% APR balance transfer offer can save hundreds in interest — but check the transfer fee (typically 3–5% of the balance) and the length of the intro period (usually 12–21 months). On $5,000 at 22.99%, a 15-month 0% transfer with a 3% fee ($150) saves roughly $750 in interest if you pay off the balance before the promo ends. Always have a payoff plan before transferring." },
]

useCalcSEO(
    "Credit Card Payoff Calculator — See the True Cost of Minimum Payments",
    "Free credit card payoff calculator. Enter your balance, APR, and monthly payment to see exactly when you'll be debt-free and how much interest you'll pay vs. making only the minimum payment.",
    faqs
)

useHead({
    script: [{
        type: 'application/ld+json',
        innerHTML: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'HowTo',
            name: 'How to Calculate Credit Card Payoff Time',
            description: 'Find out how long it takes to pay off your credit card and how much interest you will pay.',
            step: [
                { '@type': 'HowToStep', position: 1, name: 'Enter your card balance', text: 'Type the current balance on your credit card.' },
                { '@type': 'HowToStep', position: 2, name: 'Enter your APR', text: 'Enter the annual percentage rate from your card statement — usually listed as the Purchase APR.' },
                { '@type': 'HowToStep', position: 3, name: 'Enter your monthly payment', text: 'Enter how much you plan to pay each month. Try different amounts to see the impact.' },
                { '@type': 'HowToStep', position: 4, name: 'Click Calculate', text: 'See your payoff timeline, total interest, the estimated minimum payment, and how much longer minimum-only payments would take.' },
            ],
        }),
    }],
})
</script>
