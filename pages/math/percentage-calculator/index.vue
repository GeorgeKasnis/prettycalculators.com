<template>
    <UiBaseContainer>
        <CalculatorsMathPercentageCalc />
        <UiCalcDescription>
            <template v-slot:description>
                <p>A Percentage Calculator is a tool that allows you to calculate percentages quickly and easily.</p>
                <p>It can be used for a variety of purposes, including calculating discounts, tax rates, interest rates, and many other applications that involve percentages. The calculator works by taking two values as input and providing a percentage as output.</p>
                <p>The two values that you input could be anything, depending on what you are trying to calculate. For example, if you are calculating a discount, the two values would be the original price and the discount percentage.</p>
                <p>Once you input the values, the calculator will do the math for you and provide you with the percentage result. This can be particularly useful if you need to make quick calculations or if you are dealing with large or complex numbers that are difficult to calculate manually.</p>
            </template>
            <template v-slot:example>15% of 80 is 12.</template>
        </UiCalcDescription>
    </UiBaseContainer>
</template>


<script setup>
useHead({
    title: "Pretty Calculators - Percentage Calculator",
    meta: [
        { hid: "title", name: "title", content: "Pretty Calculators - Percentage Calculator" },
        { hid: "description", name: "description", content: "Pretty Calculators - Percentage Calculator" },
        { hid: "og-title", property: "og:title", content: "Pretty Calculators - Percentage Calculator" },
        { hid: "og:description", property: "og:description", content: "Pretty Calculators - Percentage Calculator" },
    ],
});
</script>
