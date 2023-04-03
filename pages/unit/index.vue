<template>
    <h1 class="text-big brutalist-shadow px-big py-small my-huge">Unit</h1>
    <div class="brutalist-shadow p-huge">
        <UiCategoryContainer link="/unit/temperature-converter">
            <CalculatorsUnitTemperatureCalc />
        </UiCategoryContainer>
    </div>
    <h2 class="text-big brutalist-shadow px-big py-small my-huge">Unit</h2>
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
