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
    </UiCalcPage>
</template>

<script setup>
definePageMeta({ layout: 'brutalist' })
useCalcSEO(
    "Percentage Calculator — Calculate % Online Free",
    "Free percentage calculator. Find what % one number is of another, calculate percentage increase/decrease, or work out X% of a number. Fast and accurate.",
    [
        { q: "How do I calculate a percentage?", a: "To find what percentage A is of B: (A ÷ B) × 100. For example, 30 out of 150 is (30 ÷ 150) × 100 = 20%." },
        { q: "How do I calculate a percentage increase?", a: "Percentage increase = ((New Value − Old Value) ÷ Old Value) × 100. For example, going from 80 to 100 is ((100 − 80) ÷ 80) × 100 = 25% increase." },
        { q: "How do I find X% of a number?", a: "Multiply the number by the percentage, then divide by 100. For example, 15% of 200 = (200 × 15) ÷ 100 = 30." },
        { q: "How do I calculate a percentage decrease?", a: "Percentage decrease = ((Old Value − New Value) ÷ Old Value) × 100. For example, from 100 to 75 is ((100 − 75) ÷ 100) × 100 = 25% decrease." },
    ]
)
</script>
