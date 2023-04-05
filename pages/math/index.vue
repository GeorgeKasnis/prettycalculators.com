<template>
    <UiCategoryContainer>
        <template v-slot:main>
            <CategoryCardsMath hasH1="true" class="mb-big" />
            <p>
                Looking for a reliable way to calculate percentages, ratios, or other mathematical equations? Our free math calculator tools can help you solve equations quickly and accurately. Whether you need to calculate percentages, convert units of measurement, or determine the area of a shape,
                our calculators can provide you with precise results. Our percentage calculator is just one example of the many tools we offer, allowing you to quickly calculate percentages for any number or value. With our user-friendly interface, you can easily input your data and receive accurate
                calculations in seconds. Start using our math calculator tools today to take the first step towards solving complex equations with ease!
            </p>
        </template>
        <template v-slot:recommended>
            <CategoryCardsFitness class="mb-big" />
            <CategoryCardsUnit class="mb-big" />
            <CategoryCardsOther class="mb-big" />
        </template>
    </UiCategoryContainer>
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
