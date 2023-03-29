<template>
    <h2 class="text-big brutalist-shadow p-big my-huge">Fitness</h2>
    <UiCategoryContainer link="fitness/bmi-calculator">
        <CalculatorsFitnessBmiCalc />
    </UiCategoryContainer>
    <h2 class="text-big brutalist-shadow p-big my-huge">Fitness</h2>
</template>

<script setup>
useHead({
    title: "Pretty Calculators - Fitness",
    meta: [
        { hid: "title", name: "title", content: "Pretty Calculators - Fitness" },
        { hid: "description", name: "description", content: "Pretty Calculators - Fitness" },
        { hid: "og-title", property: "og:title", content: "Pretty Calculators - Fitness" },
        { hid: "og:description", property: "og:description", content: "Pretty Calculators - Fitness" },
    ],
});
</script>
