<template>
    <div class="h-full flex flex-col">
        <h1 class="text-small font-bold mb-small">Calculator List</h1>
        <div class="w-full h-full grid grid-cols-1 lg:grid-cols-4 gap-big flex-1">
            <CategoryCardsFitness />
            <CategoryCardsMath />
            <CategoryCardsUnit />
            <CategoryCardsOther />
        </div>
        <p class="border-b brutalist-shadow p-big mt-big">
            Discover a wide range of powerful and easy-to-use calculators for fitness, math, unit conversions, and more on our site. Our calculators are designed to help you quickly and accurately perform complex calculations, saving you time and effort. Whether you're a student, professional, or
            enthusiast, our selection of calculators will make your life easier. Start exploring today and see how our calculators can transform the way you work and learn.
        </p>
    </div>
</template>

<script setup>
useHead({
    title: "Pretty Calculators",
    meta: [
        { hid: "title", name: "title", content: "Pretty Calculators" },
        {
            hid: "description",
            name: "description",
            content:
                "Discover a collection of beautifully designed calculators for all your everyday needs on Pretty Calculators. From fitness and health to math and conversions, our easy-to-use calculators are perfect for anyone looking to simplify their calculations. Browse our selection today and see how Pretty Calculators can help make your life easier",
        },
        { hid: "og-title", property: "og:title", content: "Pretty Calculators" },
        {
            hid: "og:description",
            property: "og:description",
            content:
                "Discover a collection of beautifully designed calculators for all your everyday needs on Pretty Calculators. From fitness and health to math and conversions, our easy-to-use calculators are perfect for anyone looking to simplify their calculations. Browse our selection today and see how Pretty Calculators can help make your life easier",
        },
    ],
});
</script>
