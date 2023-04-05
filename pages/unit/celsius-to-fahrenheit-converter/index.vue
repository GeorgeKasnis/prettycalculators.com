<template>
    <UiBaseContainer>
        <CalculatorsUnitCelsiusToFahrCalc />
        <UiCalcDescription>
            <template v-slot:description>
                This page contains a temperature converter that allows you to easily convert temperatures from Celsius (°C) to Fahrenheit (°F). Simply input the temperature value in Celsius, and the corresponding Fahrenheit value will be calculated and displayed for you.
            </template>
            <template v-slot:example> Let's say you want to convert a temperature of 25°C to Fahrenheit. You would enter "25" in the Celsius input field, click "Calculate", and the corresponding Fahrenheit temperature, which is 77°F, would be displayed. </template>
        </UiCalcDescription>
    </UiBaseContainer>
</template>

<script setup>
useHead({
    title: "Pretty Calculators - Celsius to Fahrenheit Converter",
    meta: [
        { hid: "title", name: "title", content: "Pretty Calculators - Celsius to Fahrenheit Converter" },
        {
            hid: "description",
            name: "description",
            content:
                "Easily convert Celsius to Fahrenheit with Pretty Calculators' beautifully designed temperature converter calculator. Our tool makes it simple to convert temperatures accurately, helping you to plan for weather conditions, travel to different countries, or work with temperature-sensitive materials. Whether you're a scientist, traveler, or just looking to learn more about temperature conversions, our Celsius to Fahrenheit converter calculator is perfect for anyone interested in making quick and accurate temperature conversions. Try it out today on Pretty Calculators.",
        },
        { hid: "og-title", property: "og:title", content: "Pretty Calculators - Celsius to Fahrenheit Converter" },
        {
            hid: "og:description",
            property: "og:description",
            content:
                "Easily convert Celsius to Fahrenheit with Pretty Calculators' beautifully designed temperature converter calculator. Our tool makes it simple to convert temperatures accurately, helping you to plan for weather conditions, travel to different countries, or work with temperature-sensitive materials. Whether you're a scientist, traveler, or just looking to learn more about temperature conversions, our Celsius to Fahrenheit converter calculator is perfect for anyone interested in making quick and accurate temperature conversions. Try it out today on Pretty Calculators.",
        },
    ],
});
</script>
