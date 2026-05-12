<template>
    <UiCalcPage title="Percentage Calculator" category="math" description-title="Calculate any percentage in seconds">
        <template #calc>
            <CalculatorsMathPercentageCalc />
        </template>
        <template #facts>
            <CalcFact label="Formula" value="(P ÷ 100) × N" />
            <CalcFact label="Example" value="15% of 200 = 30" />
            <CalcFact label="Common uses" value="Discounts, tax, tips" />
        </template>
        <template #description>
            <p>Unlock the convenience of rapid percentage calculations with our Percentage Calculator. This versatile tool simplifies the process of determining percentages for a wide range of applications.</p>
            <p>
                A Percentage Calculator is a handy utility that finds its use in various scenarios, including calculating discounts, tax rates, interest rates, and countless other situations where percentages play a crucial role. This calculator operates by taking two values as input and
                delivering a precise percentage as output.
            </p>
            <p>The nature of the two input values can vary depending on your specific calculation needs. For instance, when calculating a discount, you would input the original price and the discount percentage.</p>
            <p>
                Once you input the values, our calculator handles the calculations swiftly and provides you with the percentage result. This proves invaluable when you require quick and accurate calculations or when dealing with large and complex numbers that are challenging to compute manually.
            </p>
            <p>Whether you're a shopper looking to determine the final cost after applying a discount, a financial analyst working with interest rates, or a student tackling math problems involving percentages, our Percentage Calculator is a reliable companion.</p>
        </template>
        <template #example>
            <p><b>1.</b> Calculating a 15% discount on an item priced at $80:</p>
            <p>Discount Amount = Original Price x Discount Percentage</p>
            <p>Discount Amount = $80 x 0.15 = $12</p>
            <p>So, a 15% discount on an $80 item amounts to $12 saved.</p>
            <p><b>2.</b> Calculating a 7.5% tax on a purchase worth $500:</p>
            <p>Tax Amount = Purchase Price x Tax Percentage</p>
            <p>Tax Amount = $500 x 0.075 = $37.50</p>
            <p>Thus, a 7.5% tax on a $500 purchase equals $37.50.</p>
        </template>
        <template #faq>
            <CalcFaq :faqs="faqs" />
        </template>
    </UiCalcPage>
</template>

<script setup>
definePageMeta({ layout: 'brutalist' })

const faqs = [
    { q: "How do I calculate a percentage?", a: "To find what percentage A is of B: (A ÷ B) × 100. For example, 30 out of 150 is (30 ÷ 150) × 100 = 20%." },
    { q: "How do I calculate a percentage increase?", a: "Percentage increase = ((New Value − Old Value) ÷ Old Value) × 100. For example, going from 80 to 100 is ((100 − 80) ÷ 80) × 100 = 25% increase." },
    { q: "How do I find X% of a number?", a: "Multiply the number by the percentage, then divide by 100. For example, 15% of 200 = (200 × 15) ÷ 100 = 30." },
    { q: "How do I calculate a percentage decrease?", a: "Percentage decrease = ((Old Value − New Value) ÷ Old Value) × 100. For example, from 100 to 75 is ((100 − 75) ÷ 100) × 100 = 25% decrease." },
    { q: "What is 20% of 150?", a: "20% of 150 = (150 × 20) ÷ 100 = 30. Quick mental shortcut: 10% of 150 = 15, then double it = 30." },
    { q: "What percentage is 45 out of 60?", a: "45 ÷ 60 × 100 = 75%. So 45 is 75% of 60." },
    { q: "How do I calculate a 10% tip on a $47 bill?", a: "10% of $47 = $4.70. For 15%: $4.70 + half of $4.70 = $4.70 + $2.35 = $7.05. For 20%: double the 10% = $9.40. The 10% shortcut (move the decimal one place left) is the fastest mental calculation." },
    { q: "What is a 30% discount on $200?", a: "30% of $200 = $60. So the discounted price is $200 − $60 = $140. Alternatively: the sale price is 70% of original = 0.70 × $200 = $140." },
    { q: "How do I reverse a percentage to find the original price?", a: "If a price after a 20% discount is $80, find the original: $80 ÷ 0.80 = $100. The formula is: Original = Final ÷ (1 − discount%). Never make the mistake of adding 20% back: $80 × 1.20 = $96, which is wrong." },
    { q: "What is 150% of 80?", a: "150% of 80 = (80 × 150) ÷ 100 = 120. Percentages above 100% simply mean more than the whole — 150% means 1.5 times the number. 200% of 80 = 160 (double)." },
]

useCalcSEO(
    "Percentage Calculator — Calculate % Online Free",
    "Free percentage calculator. Find what % one number is of another, calculate percentage increase/decrease, or work out X% of a number. Fast and accurate.",
    faqs
)

useHead({
    script: [{
        type: 'application/ld+json',
        innerHTML: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'HowTo',
            name: 'How to Calculate a Percentage',
            description: 'Find what percentage one number is of another, or calculate a percentage increase or decrease.',
            step: [
                { '@type': 'HowToStep', position: 1, name: 'Choose the calculation type', text: 'Select whether you want to find X% of a number, what % one number is of another, or a percentage change.' },
                { '@type': 'HowToStep', position: 2, name: 'Enter your values', text: 'Input the relevant numbers into the fields provided.' },
                { '@type': 'HowToStep', position: 3, name: 'Click Calculate', text: 'Your percentage result appears instantly.' },
            ],
        }),
    }],
})
</script>
