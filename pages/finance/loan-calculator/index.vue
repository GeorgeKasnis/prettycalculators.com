<template>
    <UiCalcPage title="Loan Calculator" category="finance" description-title="Monthly payment, total interest & payoff date">
        <template #calc>
            <CalculatorsFinanceLoanCalc />
        </template>
        <template #facts>
            <CalcFact label="Personal loan avg"  value="~12% APR (US, 2025)" />
            <CalcFact label="Auto loan avg"      value="~7–9% APR (2025)" />
            <CalcFact label="Formula"            value="M = P·r(1+r)ⁿ / [(1+r)ⁿ−1]" />
            <CalcFact label="Rule of thumb"      value="Total interest ≈ rate × years / 2" />
        </template>
        <template #description>
            <p>
                The <strong>Loan Calculator</strong> tells you exactly what your monthly payment will be on any fixed-rate loan — personal loans, auto loans, student loans, or any instalment debt. Enter the amount, rate, and term and you instantly see your monthly payment, total interest paid over the life of the loan, and the total cost.
            </p>
            <p>
                The formula behind fixed-rate loans is amortisation: every payment covers the interest accrued that month first, with the remainder reducing the principal. Early payments are mostly interest; later payments are mostly principal. The result is a fixed monthly amount that pays the loan off to exactly zero at the end of the term.
            </p>
            <p>
                Two levers have the biggest impact on total interest:
            </p>
            <ul>
                <li><strong>Interest rate</strong> — even 1–2% difference is significant. On a $20,000 loan over 5 years, 7% vs 10% is about $1,600 in extra interest.</li>
                <li><strong>Term length</strong> — a shorter term means higher monthly payments but dramatically less interest. Extending from 3 to 5 years lowers your payment but increases total interest by 60–80%.</li>
            </ul>
        </template>
        <template #example>
            <p>
                <strong>Scenario:</strong> $15,000 personal loan at 9% APR over 3 years.
            </p>
            <p>
                Monthly rate r = 9% ÷ 12 = 0.75%. n = 36 payments.
                M = 15,000 × [0.0075 × 1.0075³⁶] / [1.0075³⁶ − 1] ≈ <strong>$477/month</strong>.
            </p>
            <p>
                Total paid: $477 × 36 = $17,172. Total interest: <em>$2,172</em>. Extending to 5 years drops the payment to ~$311 but raises total interest to ~$3,645.
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
    { q: "How is a loan monthly payment calculated?", a: "Fixed-rate loans use the amortisation formula: M = P × [r(1+r)ⁿ] / [(1+r)ⁿ−1], where P is the loan principal, r is the monthly interest rate (annual rate ÷ 12), and n is the total number of monthly payments. The formula ensures each equal payment covers that month's interest plus a growing slice of principal, reaching zero at the final payment." },
    { q: "What is a good interest rate for a personal loan?", a: "In 2025, average personal loan APRs in the US range from 7–36%. Borrowers with credit scores above 740 typically qualify for 7–12%. Scores of 670–739 see 12–20%. Below 670, rates often exceed 20–30%. Credit unions and online lenders tend to offer lower rates than traditional banks. Always compare APR — not just the monthly payment — across at least 3 lenders." },
    { q: "What is the monthly payment on a $10,000 loan?", a: "At 8% APR for 3 years: ~$313/month, total interest ~$1,267. At 8% for 5 years: ~$203/month, total interest ~$2,166. At 15% APR for 3 years: ~$347/month, total interest ~$2,484. The rate and term together determine your payment — always run both scenarios before signing." },
    { q: "Should I choose a shorter or longer loan term?", a: "Shorter terms mean higher monthly payments but significantly less total interest. Longer terms free up monthly cash flow but cost more overall. A practical rule: choose the shortest term whose monthly payment is comfortably under 15% of your take-home pay. Use our <a href=\"/finance/debt-payoff-calculator\">debt payoff calculator</a> to model extra payments on a longer-term loan if flexibility matters." },
    { q: "What is the difference between APR and interest rate?", a: "The interest rate is the base cost of borrowing. APR (Annual Percentage Rate) includes the interest rate plus any origination fees, broker fees, or other charges, expressed as a yearly rate. APR is the true cost of the loan and what you should compare across lenders. On a $10,000 loan with a 1% origination fee (~$100), a stated 8% rate becomes roughly 8.5% APR on a 3-year term." },
    { q: "How much does a $30,000 auto loan cost per month?", a: "At 7% APR for 5 years: ~$594/month, total interest ~$5,640. At 9% for 5 years: ~$623/month, total interest ~$7,380. At 7% for 6 years: ~$513/month but total interest rises to ~$6,936. Auto loan rates vary by lender, credit score, and whether the vehicle is new or used — used car loans typically carry 1–3% higher rates." },
    { q: "Can I pay off a loan early?", a: "Most personal and auto loans allow early payoff without penalty (check your agreement for prepayment penalties, which are rare but exist). Paying extra each month reduces principal faster, shortening the term and cutting total interest. Even an extra $50/month on a $15,000 loan at 9% over 5 years saves about $400 in interest and pays it off 3 months early." },
    { q: "What credit score do I need for a loan?", a: "Most lenders require a minimum score of 580–620 for approval, but rates above 670 become competitive. Above 740 you'll qualify for the best rates. Below 580, options are limited to credit unions, secured loans, or lenders specialising in bad credit (often with APRs of 25–36%). Improving your score by even 30–50 points before applying can save hundreds in interest." },
]

useCalcSEO(
    "Loan Calculator — Monthly Payment, Total Interest & Payoff Date",
    "Free loan calculator for personal loans, auto loans, and any fixed-rate instalment debt. Enter amount, rate, and term to see your monthly payment, total interest, and payoff date.",
    faqs
)

useHead({
    script: [{
        type: 'application/ld+json',
        innerHTML: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'HowTo',
            name: 'How to Calculate Your Loan Monthly Payment',
            description: 'Find your monthly payment and total cost for any fixed-rate loan.',
            step: [
                { '@type': 'HowToStep', position: 1, name: 'Enter the loan amount', text: 'Type the total amount you are borrowing.' },
                { '@type': 'HowToStep', position: 2, name: 'Enter the annual interest rate', text: 'Enter the APR as a percentage — check your loan offer or lender quote.' },
                { '@type': 'HowToStep', position: 3, name: 'Enter the loan term in years', text: 'Enter how many years you have to repay the loan.' },
                { '@type': 'HowToStep', position: 4, name: 'Click Calculate', text: 'See your monthly payment, total interest paid, total cost, and estimated payoff date.' },
            ],
        }),
    }],
})
</script>
