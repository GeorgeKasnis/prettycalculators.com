<template>
    <UiCalcPage title="Income Tax Calculator" category="finance" description-title="2025 US federal income tax estimate">
        <template #calc>
            <CalculatorsFinanceIncomeTaxCalc />
        </template>
        <template #facts>
            <CalcFact label="Standard deduction"  value="$15,000 single (2025)" />
            <CalcFact label="Married deduction"   value="$30,000 MFJ (2025)" />
            <CalcFact label="Top bracket"         value="37% over $626k (single)" />
            <CalcFact label="Lowest bracket"      value="10% up to $11,925" />
        </template>
        <template #description>
            <p>
                The <strong>Income Tax Calculator</strong> estimates your 2025 US federal income tax based on your gross income and filing status. It applies the standard deduction automatically and uses the current federal tax brackets to show your federal tax, effective tax rate, marginal rate, and after-tax take-home income.
            </p>
            <p>
                The US federal tax system is <em>progressive</em>: only the income within each bracket is taxed at that bracket's rate. Earning $50,000 does not mean all $50,000 is taxed at 22% — only the portion of taxable income above $48,475 is taxed at 22%. The lower brackets still apply to the income below that threshold.
            </p>
            <p>
                This calculator uses the standard deduction ($15,000 for single filers in 2025). If you itemise deductions, your actual tax may be lower. State income taxes are not included.
            </p>
        </template>
        <template #example>
            <p>
                <strong>Scenario:</strong> $75,000 gross income, single filer, standard deduction.
            </p>
            <p>
                Taxable income: $75,000 − $15,000 = <strong>$60,000</strong>.
            </p>
            <p>
                Tax calculation: 10% on first $11,925 = $1,193. 12% on $11,926–$48,475 = $4,386. 22% on $48,476–$60,000 = $2,535.
                <strong>Total federal tax ≈ $8,114</strong>. Effective rate ≈ 10.8%. Marginal rate: 22%. After-tax income: ~$66,886.
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
    { q: "How does the US federal income tax work?", a: "The US uses a progressive tax system with seven brackets (10%, 12%, 22%, 24%, 32%, 35%, 37%). Each bracket rate applies only to income within that range — not to your total income. First, subtract your standard deduction from gross income to get taxable income. Then apply each bracket's rate to the portion of taxable income that falls within it. Sum all layers to get your total federal tax." },
    { q: "What is the standard deduction for 2025?", a: "The 2025 standard deduction is $15,000 for single filers, $30,000 for married filing jointly, and $22,500 for head of household. You subtract this from your gross income before calculating taxes. If your itemised deductions (mortgage interest, state taxes, charitable donations, etc.) exceed the standard deduction, you should itemise instead — but the standard deduction is simpler and is what most people use." },
    { q: "What is the difference between effective and marginal tax rate?", a: "The marginal rate is the rate applied to your last dollar of income — the highest bracket you fall into. The effective rate is your total tax divided by your total income — what you actually pay on average. A single filer earning $75,000 has a 22% marginal rate but an effective rate of about 10.8%. The effective rate is what you actually pay; the marginal rate tells you the cost of earning one more dollar." },
    { q: "How much federal income tax do I pay on $50,000?", a: "Single filer, 2025: taxable income = $50,000 − $15,000 standard deduction = $35,000. Tax: 10% on $11,925 = $1,193; 12% on $23,075 = $2,769. Total federal tax ≈ $3,962. Effective rate ≈ 7.9%. After-tax income ≈ $46,038, or about $3,837/month. Note: Social Security (6.2%) and Medicare (1.45%) FICA taxes are additional." },
    { q: "Does this include state income tax?", a: "No — this calculator covers US federal income tax only. State income tax varies significantly: nine states have no income tax (Florida, Texas, Nevada, Washington, Wyoming, South Dakota, Alaska, Tennessee, New Hampshire). California tops the list at up to 13.3%. Most states have rates of 3–6%. Use your state tax agency's website for state-specific calculations." },
    { q: "What are FICA taxes?", a: "FICA (Federal Insurance Contributions Act) taxes fund Social Security and Medicare. In 2025: Social Security tax is 6.2% on wages up to $176,100 (the wage base limit); Medicare tax is 1.45% on all wages, plus an additional 0.9% on income over $200,000 (single) or $250,000 (married). Both are paid on top of federal income tax and are not included in this calculator, which focuses on income tax only." },
    { q: "What is the 2025 federal tax bracket for married filing jointly?", a: "Married filing jointly brackets for 2025 taxable income: 10% up to $23,850; 12% on $23,851–$96,950; 22% on $96,951–$206,700; 24% on $206,701–$394,600; 32% on $394,601–$501,050; 35% on $501,051–$751,600; 37% above $751,600. The standard deduction is $30,000, meaning a married couple earning $100,000 gross has taxable income of $70,000, with most of it in the 12% bracket." },
    { q: "How can I reduce my income tax?", a: "Legitimate strategies: maximise pre-tax retirement contributions (401k up to $23,500, traditional IRA up to $7,000 in 2025) — each dollar contributed reduces your taxable income by one dollar. Contribute to an HSA if you have a high-deductible health plan ($4,300 single, $8,550 family in 2025). Itemise deductions if they exceed the standard deduction. Consider timing income and deductions across tax years. Consult a CPA for complex situations." },
]

useCalcSEO(
    "Income Tax Calculator — 2025 US Federal Tax Estimate",
    "Free 2025 US federal income tax calculator. Enter your income and filing status to see your federal tax, effective rate, marginal rate, and after-tax take-home income.",
    faqs
)

useHead({
    script: [{
        type: 'application/ld+json',
        innerHTML: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'HowTo',
            name: 'How to Estimate Your 2025 Federal Income Tax',
            description: 'Calculate your US federal income tax using 2025 tax brackets and the standard deduction.',
            step: [
                { '@type': 'HowToStep', position: 1, name: 'Enter your annual income', text: 'Type your gross annual income before any deductions.' },
                { '@type': 'HowToStep', position: 2, name: 'Select your filing status', text: 'Choose Single, Married Filing Jointly, or Head of Household. This determines your tax brackets and standard deduction.' },
                { '@type': 'HowToStep', position: 3, name: 'Click Calculate', text: 'See your estimated federal tax, effective rate, marginal rate, after-tax income, and monthly take-home.' },
            ],
        }),
    }],
})
</script>
