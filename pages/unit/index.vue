<template>
    <UiCategoryContainer>
        <template v-slot:main>
            <CategoryCardsUnit hasH1="true" class="mb-big" />
            <p>
                Converting between units can be a tricky task, but with our free unit converter tools, it's easy to convert between Celsius and Fahrenheit, as well as many other common unit conversions. Our unit converter tools allow you to quickly and easily convert between different units of
                measurement, including length, volume, weight, temperature, and more. With our Celsius to Fahrenheit and Fahrenheit to Celsius calculators, you can easily convert temperatures between these two units with accuracy and ease. Whether you're a student, a scientist, or just looking to
                make everyday life easier, our unit converter tools are perfect for all your conversion needs. Start using our unit converter tools today to take the first step towards effortless conversions!
            </p>
        </template>
        <template v-slot:recommended>
            <CategoryCardsFitness class="mb-big" />
            <CategoryCardsMath class="mb-big" />
            <CategoryCardsOther class="mb-big" />
        </template>
    </UiCategoryContainer>
</template>

<script setup>
useHead({
    title: "Pretty Calculators - Unit",
    meta: [
        { hid: "title", name: "title", content: "Pretty Calculators - Unit" },
        {
            hid: "description",
            name: "description",
            content:
                "Convert units easily and accurately with Pretty Calculators' collection of beautifully designed unit calculators. Our tools make it simple to convert between different units of measurement, such as length, weight, and temperature, helping you to save time and avoid mistakes. Whether you're traveling, cooking, or just need to convert units for work or school, our unit calculators are the perfect solution. Browse our selection today and see how Pretty Calculators can make your life easier.",
        },
        { hid: "og-title", property: "og:title", content: "Pretty Calculators - Unit" },
        {
            hid: "og:description",
            property: "og:description",
            content:
                "Convert units easily and accurately with Pretty Calculators' collection of beautifully designed unit calculators. Our tools make it simple to convert between different units of measurement, such as length, weight, and temperature, helping you to save time and avoid mistakes. Whether you're traveling, cooking, or just need to convert units for work or school, our unit calculators are the perfect solution. Browse our selection today and see how Pretty Calculators can make your life easier.",
        },
    ],
});
</script>
