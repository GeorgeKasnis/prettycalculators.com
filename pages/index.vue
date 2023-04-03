<template>
    <div>
        <div class="w-full h-full grid grid-cols-1 lg:grid-cols-4 gap-big">
            <div class="border-2 border-b brutalist-shadow p-big min-h-[20rem] tablet:min-h-[none]">
                <h1 class="text-big font-bold">Fitness</h1>
                <div class="p-small">
                    <div>
                        <nuxt-link to="/fitness/bmi-calculator" class="hover:font-bold">BMI Calculator</nuxt-link>
                    </div>
                    <div>
                        <nuxt-link to="/fitness/body-fat-calculator" class="hover:font-bold">Body Fat Calculator</nuxt-link>
                    </div>
                </div>
            </div>
            <div class="border-2 border-b brutalist-shadow p-big min-h-[20rem]">
                <h2 class="text-big font-bold">Math</h2>
                <div class="p-small">
                    <nuxt-link to="/math/percentage-calculator" class="hover:font-bold">Percentage Calculator</nuxt-link>
                </div>
            </div>
            <div class="border-2 border-b brutalist-shadow p-big min-h-[20rem]">
                <h2 class="text-big font-bold">Unit</h2>
                <div class="p-small">
                    <nuxt-link to="/unit/temperature-converter" class="hover:font-bold">Temperature Converter</nuxt-link>
                </div>
            </div>
            <div class="border-2 border-b brutalist-shadow p-big min-h-[20rem]">
                <h2 class="text-big font-bold">Other</h2>
                <div class="p-small">
                    <nuxt-link to="/other/aqua-calculator" class="hover:font-bold">Aqua Calculator</nuxt-link>
                </div>
            </div>
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
