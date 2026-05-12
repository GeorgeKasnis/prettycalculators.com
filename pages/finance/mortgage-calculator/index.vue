<template>
    <UiCalcPage title="Mortgage Calculator" category="finance" description-title="Monthly payment with taxes, insurance & PMI">
        <template #calc>
            <CalculatorsFinanceMortgageCalc />
        </template>
        <template #facts>
            <CalcFact label="PMI threshold"   value="< 20% down payment" />
            <CalcFact label="PMI rate"        value="~0.5–1.5%/yr" />
            <CalcFact label="US avg rate"     value="~7% (30-yr, 2025)" />
            <CalcFact label="Rule of thumb"   value="28% of gross income" />
        </template>
        <template #description>
            <p>
                The <strong>Mortgage Calculator</strong> breaks down your full monthly housing cost — not just principal and interest, but also property taxes, home insurance, and PMI (private mortgage insurance if your down payment is under 20%). This is the number that actually matters for your budget.
            </p>
            <p>
                Four components make up your total monthly payment:
            </p>
            <ul>
                <li><strong>Principal & Interest (P&I)</strong> — the loan repayment itself, calculated using standard amortisation</li>
                <li><strong>Property tax</strong> — varies by state: ~0.5% in Hawaii, ~2.2% in New Jersey; the US average is ~1.1%</li>
                <li><strong>Home insurance</strong> — typically $1,000–$2,000/year; enter your actual quote</li>
                <li><strong>PMI</strong> — automatically calculated at 1%/year if your down payment is below 20%; drops off once you reach 20% equity</li>
            </ul>
            <p>
                The amortisation table below shows how much of your original loan remains at key years, and how your equity grows over the life of the mortgage.
            </p>
        </template>
        <template #example>
            <p>
                <strong>Scenario:</strong> $400,000 home, $80,000 down (20%), 30-year fixed at 7%, 1.2% property tax, $1,200/year insurance.
            </p>
            <p>
                Loan: $320,000. Monthly P&I = $320,000 × [0.005833 × 1.005833³⁶⁰] / [1.005833³⁶⁰ − 1] ≈ <strong>$2,129</strong>.
            </p>
            <p>
                Property tax: $400,000 × 1.2% ÷ 12 = <em>$400/mo</em>.
                Insurance: $1,200 ÷ 12 = <em>$100/mo</em>. PMI: <em>$0</em> (20% down).
            </p>
            <p>
                <strong>Total monthly: $2,629</strong>. Total interest over 30 years: ~$446,000.
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
    { q: "How is a mortgage monthly payment calculated?", a: "Monthly P&I uses the amortisation formula: M = P × [r(1+r)ⁿ] / [(1+r)ⁿ−1], where P is the loan amount, r is the monthly interest rate (annual rate ÷ 12), and n is the number of payments. On a $300,000 loan at 7% for 30 years: monthly rate = 0.5833%, 360 payments, M ≈ $1,996/month." },
    { q: "What is PMI and when do I have to pay it?", a: "PMI (Private Mortgage Insurance) is required by conventional lenders when your down payment is less than 20% of the home price. It protects the lender — not you — against default. PMI typically costs 0.5–1.5% of the loan amount annually. On a $280,000 loan at 1%, that's $233/month. PMI can be removed once you reach 20% equity." },
    { q: "What is a good mortgage rate right now?", a: "In 2025, 30-year fixed mortgage rates in the US are approximately 6.5–7.5% for well-qualified buyers. 15-year rates are typically 0.5–0.75% lower. Rates vary by credit score, loan type (conventional vs FHA vs VA), down payment, and lender. Shopping 3+ lenders typically saves 0.25–0.5%, which equals tens of thousands over the loan life." },
    { q: "What is the mortgage calculator for California?", a: "California has no state income tax deduction for mortgage interest (for state taxes), but property tax is relatively low at ~0.71% average (Prop 13 limits increases). For a $700,000 home (California median) at 7% with 20% down ($140,000) on a 30-year: loan = $560,000, P&I ≈ $3,725/mo, taxes ≈ $415/mo, insurance ≈ $150/mo. Total ≈ $4,290/mo." },
    { q: "What is the mortgage calculator for Texas?", a: "Texas has no state income tax but has above-average property taxes, typically 1.6–2.5%. For a $350,000 Texas home at 7%, 10% down ($35,000), 30-year: loan = $315,000, P&I ≈ $2,095/mo, PMI ≈ $262/mo (< 20% down), taxes at 2% ≈ $583/mo, insurance ≈ $125/mo. Total ≈ $3,065/mo." },
    { q: "Should I choose a 15-year or 30-year mortgage?", a: "A 15-year mortgage has a lower interest rate (typically 0.5–0.75% less) and builds equity twice as fast, but monthly payments are about 40–50% higher. A 30-year has lower payments, giving more cash flow flexibility. Rule of thumb: if the 15-year payment is under 28% of gross monthly income and you're otherwise financially stable, the interest savings are substantial. On a $300,000 loan at 7% vs 6.25%: 30-yr costs $418K in interest vs 15-yr at $159K." },
    { q: "What is an FHA mortgage and how does the calculator apply?", a: "FHA loans allow down payments as low as 3.5% and have more flexible credit requirements. They require MIP (Mortgage Insurance Premium) instead of PMI — upfront MIP of 1.75% (typically financed into the loan) plus annual MIP of 0.55–1.05% depending on term and LTV. Use this calculator with your FHA loan amount and enter the annual MIP rate in the PMI field (the calculator applies it the same way)." },
    { q: "How much house can I afford?", a: "The common guideline is the 28/36 rule: your monthly housing cost (P&I + taxes + insurance + PMI) should not exceed 28% of gross monthly income, and total debt payments (including car, student loans, etc.) should not exceed 36%. At $80,000/year gross ($6,667/month), your maximum housing payment is ~$1,867/month. Use our <a href=\"/finance/savings-goal-calculator\">savings goal calculator</a> to plan how long it will take to build your down payment." },
    { q: "What happens if I make extra mortgage payments?", a: "Extra payments go entirely toward principal, shortening your loan term and reducing total interest dramatically. On a $300,000 30-year loan at 7%, paying an extra $200/month saves approximately $70,000 in interest and pays off the loan 6 years early. The earlier in the loan you start extra payments, the greater the impact." },
    { q: "What is the monthly payment on a $250,000 mortgage at 7%?", a: "At 7% for 30 years: monthly P&I ≈ $1,663. Over the full term, total interest paid is approximately $348,000 — more than the original loan. Over 15 years at 6.25%: monthly P&I ≈ $2,144, total interest ≈ $136,000. The difference in total interest between 15 and 30 years is staggering." },
    { q: "How much down payment do I need to avoid PMI?", a: "You need at least 20% down to avoid PMI on a conventional loan. For a $350,000 home, that's $70,000 down. If 20% isn't possible, some lenders offer 'piggyback loans' (80/10/10) to avoid PMI, though these come with a second mortgage. With an FHA loan, MIP is required regardless of down payment." },
    { q: "How does my credit score affect my mortgage rate?", a: "Credit score has a significant impact. In 2025, a borrower with a 760+ score might qualify for 6.8% on a 30-year fixed; a 680 score might pay 7.3–7.5%; a 620 score might pay 7.8%+. On a $300,000 loan, the difference between 6.8% and 7.5% is about $130/month and roughly $47,000 in total interest over 30 years." },
]

useCalcSEO(
    "Mortgage Calculator — Monthly Payment with Taxes, Insurance & PMI",
    "Free mortgage calculator with property tax, home insurance, and PMI. See your full monthly housing cost and amortisation schedule. Works for any US state, FHA, and conventional loans.",
    faqs
)

useHead({
    script: [{
        type: 'application/ld+json',
        innerHTML: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'HowTo',
            name: 'How to Calculate Your Monthly Mortgage Payment',
            description: 'Find your full monthly housing cost including principal, interest, taxes, insurance, and PMI.',
            step: [
                { '@type': 'HowToStep', position: 1, name: 'Enter the home price and down payment', text: 'Type the purchase price of the home and how much you plan to put down. The loan amount is calculated automatically.' },
                { '@type': 'HowToStep', position: 2, name: 'Select your loan term and interest rate', text: 'Choose 10, 15, 20, or 30 years and enter the annual interest rate you have been quoted.' },
                { '@type': 'HowToStep', position: 3, name: 'Enter property tax and insurance', text: 'Enter your local property tax rate as a percentage of home value, and your annual insurance premium in dollars. Both can be estimated if you don\'t have exact figures.' },
                { '@type': 'HowToStep', position: 4, name: 'Click Calculate', text: 'See your full monthly breakdown — P&I, taxes, insurance, PMI — plus total interest paid over the loan and an equity table at key years.' },
            ],
        }),
    }],
})
</script>
