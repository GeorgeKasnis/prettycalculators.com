<template>
    <div class="w-full p-small">
        <div class="max-w-xl mx-auto w-full">
            <CalculatorsFitnessBmiCalc />
            <CalculatorsMathPercentageCalc />
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


