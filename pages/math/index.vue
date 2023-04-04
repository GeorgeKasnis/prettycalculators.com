<template>
    <h1 class="text-big brutalist-shadow px-big py-small my-huge">Math</h1>
    <div class="brutalist-shadow p-huge mobile:p-small">
        <UiCategoryContainer link="/math/percentage-calculator">
            <CalculatorsMathPercentageCalc />
        </UiCategoryContainer>
    </div>
    <h2 class="text-big brutalist-shadow px-big py-small my-huge">Math</h2>
</template>

<script setup>
useHead({
    title: "Pretty Calculators - Math",
    meta: [
        { hid: "title", name: "title", content: "Pretty Calculators - Math" },
        {
            hid: "description",
            name: "description",
            content:
                "Simplify your math calculations with Pretty Calculators' collection of beautifully designed math calculators. From basic arithmetic to complex equations, our tools are perfect for students, teachers, and anyone who needs to perform calculations quickly and accurately. Whether you're studying for exams or just need help with everyday math, our math calculators are the perfect solution. Browse our selection today and see how Pretty Calculators can make your life easier.",
        },
        { hid: "og-title", property: "og:title", content: "Pretty Calculators - Math" },
        {
            hid: "og:description",
            property: "og:description",
            content:
                "Simplify your math calculations with Pretty Calculators' collection of beautifully designed math calculators. From basic arithmetic to complex equations, our tools are perfect for students, teachers, and anyone who needs to perform calculations quickly and accurately. Whether you're studying for exams or just need help with everyday math, our math calculators are the perfect solution. Browse our selection today and see how Pretty Calculators can make your life easier.",
        },
    ],
});
</script>
