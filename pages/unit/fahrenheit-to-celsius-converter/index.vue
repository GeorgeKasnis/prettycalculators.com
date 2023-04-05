<template>
    <UiBaseContainer>
        <CalculatorsUnitFahrToCelsiusCalc />
        <UiCalcDescription>
            <template v-slot:description>
                This page contains a temperature converter that allows you to easily convert temperatures from Fahrenheit (°F) to Celsius (°C). Simply input the temperature value in Fahrenheit, and the corresponding Celsius value will be calculated and displayed for you.
            </template>
            <template v-slot:example> Let's say you want to convert a temperature of 75°F to Celsius. You would enter "75" in the Fahrenheit input field, click "Calculate", and the corresponding Celsius temperature, which is 23.9°C, would be displayed. </template>
        </UiCalcDescription>
    </UiBaseContainer>
</template>

<script setup>
useHead({
    title: "Pretty Calculators | Fahrenheit to Celsius Converter - Quick and Accurate Temperature Conversion",
    meta: [
        { hid: "title", name: "title", content: "Pretty Calculators | Fahrenheit to Celsius Converter - Quick and Accurate Temperature Conversion" },
        {
            hid: "description",
            name: "description",
            content:
                "Easily convert between Fahrenheit and Celsius with Pretty Calculators' beautifully designed temperature converter calculator. Our tool makes it simple to convert temperatures accurately, helping you to plan for weather conditions, travel to different countries, or work with temperature-sensitive materials. Whether you're a scientist, traveler, or just looking to learn more about temperature conversions, our Fahrenheit to Celsius converter is perfect for anyone interested in making quick and accurate temperature conversions. Try it out today on Pretty Calculators.",
        },
        { hid: "og-title", property: "og:title", content: "Pretty Calculators | Fahrenheit to Celsius Converter - Quick and Accurate Temperature Conversion" },
        {
            hid: "og:description",
            property: "og:description",
            content:
                "Easily convert between Fahrenheit and Celsius with Pretty Calculators' beautifully designed temperature converter calculator. Our tool makes it simple to convert temperatures accurately, helping you to plan for weather conditions, travel to different countries, or work with temperature-sensitive materials. Whether you're a scientist, traveler, or just looking to learn more about temperature conversions, our Fahrenheit to Celsius converter is perfect for anyone interested in making quick and accurate temperature conversions. Try it out today on Pretty Calculators.",
        },
    ],
});
</script>
