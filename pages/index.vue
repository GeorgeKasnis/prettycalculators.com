<template>
    <div class="w-full p-small h-full grid grid-cols-1 lg:grid-cols-3 gap-big">
        <div class="border-2 border-b brutalist-shadow p-big">
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
        <div class="border-2 border-b brutalist-shadow p-big">
            <h2 class="text-big font-bold">Math</h2>
            <div class="p-small">
                <nuxt-link to="/math/percentage-calculator" class="hover:font-bold">Percentage Calculator</nuxt-link>
            </div>
        </div>
        <div class="border-2 border-b brutalist-shadow p-big">
            <h2 class="text-big font-bold">Unit</h2>
            <div class="p-small">
                <nuxt-link to="/unit/temperature-converter" class="hover:font-bold">Temperature Converter</nuxt-link>
            </div>
        </div>
    </div>
</template>

<script setup>
useHead({
    title: "Pretty Calculators",
    meta: [
        { hid: "title", name: "title", content: "Pretty Calculators" },
        { hid: "description", name: "description", content: "Pretty Calculators" },
        { hid: "og-title", property: "og:title", content: "Pretty Calculators" },
        { hid: "og:description", property: "og:description", content: "Pretty Calculators" },
    ],
});
</script>
