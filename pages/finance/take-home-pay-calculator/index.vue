<template>
    <UiCalcPage title="Take-Home Pay Calculator" category="finance" description-title="US 2025 federal & state taxes — your actual paycheck">
        <template #calc>
            <CalculatorsFinanceTakeHomePayCalc />
        </template>
        <template #facts>
            <CalcFact label="No state income tax" value="TX, FL, NV + 7 others" />
            <CalcFact label="FICA total"           value="7.65% on most wages" />
            <CalcFact label="Highest state tax"    value="California (up to 13.3%)" />
            <CalcFact label="Standard deduction"   value="$15,000 (single, 2025)" />
        </template>
        <template #description>
            <p>
                The <strong>Take-Home Pay Calculator</strong> estimates your actual paycheck after US federal income tax, state income tax, Social Security, and Medicare. Enter your annual salary, filing status, and state to see a breakdown of every deduction and your real monthly take-home.
            </p>
            <p>
                Your total deductions include four components:
            </p>
            <ul>
                <li><strong>Federal income tax</strong> — progressive brackets from 10% to 37%, applied after the standard deduction ($15,000 for single filers in 2025).</li>
                <li><strong>State income tax</strong> — ranges from 0% (Texas, Florida, Nevada, and 6 others) to 13.3% (California's top bracket). All 50 states and D.C. are modelled.</li>
                <li><strong>Social Security</strong> — 6.2% on wages up to $176,100 (2025 wage base).</li>
                <li><strong>Medicare</strong> — 1.45% on all wages, plus an additional 0.9% on wages over $200,000.</li>
            </ul>
            <p>
                This is an estimate. It does not include 401(k) contributions, health insurance premiums, city/local taxes, or other pre-tax deductions that reduce your taxable income.
            </p>
        </template>
        <template #example>
            <p>
                <strong>Scenario:</strong> $75,000 annual salary, single filer, Texas (no state income tax).
            </p>
            <p>
                Federal taxable income: $75,000 − $15,000 standard deduction = $60,000.
                Federal tax: 10% of first $11,925 + 12% of next $36,550 + 22% of remaining $11,525 = $1,192.50 + $4,386 + $2,535.50 = <em>$8,114</em>.
            </p>
            <p>
                Social Security: $75,000 × 6.2% = $4,650. Medicare: $75,000 × 1.45% = $1,087.50.
            </p>
            <p>
                Total deductions: $13,851. Annual take-home: <strong>$61,149</strong>. Monthly take-home: <strong>$5,096</strong>. Effective total rate: ~18.5%.
            </p>
        </template>
    </UiCalcPage>
</template>

<script setup>
definePageMeta({ layout: 'brutalist' })
useCalcSEO(
    "Take-Home Pay Calculator 2025 — US Federal & State Tax Estimator",
    "Free US take-home pay calculator. Enter your salary, filing status, and state to see your federal tax, state tax, FICA deductions, and real monthly paycheck. All 50 states supported.",
    [
        { q: "How much is $50,000 a year after taxes?", a: "For a single filer in Texas (no state tax): federal tax is about $4,614, FICA $3,825. Total deductions ~$8,439. Annual take-home: roughly $41,561 ($3,463/month). In California, add ~$2,300 in state income tax, giving about $39,300 annual take-home ($3,275/month)." },
        { q: "How much is $75,000 a year after taxes?", a: "Single filer in Texas: federal tax ~$8,114, FICA ~$5,738. Total deductions ~$13,852. Take-home: about $61,148 ($5,096/month). In New York, adding ~$4,200 state tax drops take-home to roughly $56,900 ($4,742/month). In California: roughly $55,500 ($4,625/month)." },
        { q: "How much is $100,000 a year after taxes?", a: "Single filer in Texas: federal tax ~$17,414, FICA ~$7,650. Take-home: about $74,936 ($6,245/month). In California: state tax adds roughly $7,000+, bringing take-home to around $67,500 ($5,625/month). High-tax states like New York, New Jersey, and Minnesota significantly reduce the $100K paycheck." },
        { q: "Which states have no income tax?", a: "Nine states have no individual income tax: Alaska, Florida, Nevada, New Hampshire (no tax on wages), South Dakota, Tennessee (no tax on wages), Texas, Washington, and Wyoming. If you live and work in one of these states, your take-home pay is significantly higher than in California or New York for the same salary." },
        { q: "What is FICA tax and how much is it?", a: "FICA stands for Federal Insurance Contributions Act and covers Social Security (6.2%, up to $176,100 of wages in 2025) and Medicare (1.45% with no cap). Most employees pay a combined 7.65% FICA. Your employer matches this amount. High earners over $200,000 also pay an Additional Medicare Tax of 0.9% on amounts above that threshold." },
        { q: "How does filing status affect take-home pay?", a: "Filing status affects your standard deduction and tax bracket thresholds. Married Filing Jointly gets a $30,000 standard deduction (vs $15,000 for single), and all bracket thresholds are doubled, meaning the same total household income typically results in a lower effective tax rate. Head of Household falls between the two." },
        { q: "How much California income tax will I pay on $80,000?", a: "For a single filer with $80,000 salary in California: state income tax is approximately $4,000–$4,500 (after the California standard deduction of $5,202). Federal income tax adds about $9,700. FICA adds $6,120. Estimated California take-home on $80K: roughly $59,700–$60,000 annually ($4,975–$5,000/month)." },
        { q: "Is this calculator accurate for W-2 employees?", a: "It gives a close estimate for standard W-2 employees with no pre-tax deductions. Your actual paycheck will differ if you contribute to a 401(k), HSA, FSA, or pay health insurance premiums through payroll — all of which reduce your taxable income. Self-employed workers also pay the employer half of FICA (another 7.65%), effectively doubling the FICA burden." },
    ]
)

useHead({
    script: [{
        type: 'application/ld+json',
        innerHTML: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'HowTo',
            name: 'How to Calculate Your US Take-Home Pay',
            description: 'Estimate your after-tax paycheck by entering your salary, filing status, and state.',
            step: [
                { '@type': 'HowToStep', position: 1, name: 'Enter your annual salary', text: 'Type your gross annual salary — the number on your offer letter or W-2 box 1, before any deductions.' },
                { '@type': 'HowToStep', position: 2, name: 'Select your filing status', text: 'Choose Single, Married Filing Jointly, Head of Household, or Married Filing Separately. This determines your standard deduction and bracket thresholds.' },
                { '@type': 'HowToStep', position: 3, name: 'Select your state', text: 'Choose the state where you live and work. Nine states have no income tax — selecting them will show $0 state tax.' },
                { '@type': 'HowToStep', position: 4, name: 'Click Calculate', text: 'Your federal tax, state tax, Social Security, Medicare, monthly take-home, and annual take-home all appear with your effective total tax rate.' },
            ],
        }),
    }],
})
</script>
