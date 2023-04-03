<template>
    <h1 class="text-big brutalist-shadow px-big py-small my-huge">Fitness</h1>
    <div class="brutalist-shadow p-huge">
        <UiCategoryContainer link="/fitness/bmi-calculator">
            <CalculatorsFitnessBmiCalc />
        </UiCategoryContainer>
    </div>
    <h2 class="text-big brutalist-shadow px-big py-small my-huge">Fitness</h2>
    <div class="brutalist-shadow p-huge">
        <UiCategoryContainer link="/fitness/body-fat-calculator">
            <CalculatorsFitnessBodyFatCalc />
        </UiCategoryContainer>
    </div>

    <h2 class="text-big brutalist-shadow px-big py-small my-huge">Fitness</h2>
</template>

<script setup>
useHead({
    title: "Pretty Calculators - Fitness",
    meta: [
        { hid: "title", name: "title", content: "Pretty Calculators - Fitness" },
        {
            hid: "description",
            name: "description",
            content:
                "Achieve your fitness goals with ease using Pretty Calculators' collection of beautifully designed fitness calculators. From tracking your calorie intake to determining your BMI and ideal weight, our tools are perfect for anyone looking to improve their health and wellness. Browse our selection of easy-to-use fitness calculators today and start your journey to a healthier you",
        },
        { hid: "og-title", property: "og:title", content: "Pretty Calculators - Fitness" },
        {
            hid: "og:description",
            property: "og:description",
            content:
                "Achieve your fitness goals with ease using Pretty Calculators' collection of beautifully designed fitness calculators. From tracking your calorie intake to determining your BMI and ideal weight, our tools are perfect for anyone looking to improve their health and wellness. Browse our selection of easy-to-use fitness calculators today and start your journey to a healthier you",
        },
    ],
});

</script>
