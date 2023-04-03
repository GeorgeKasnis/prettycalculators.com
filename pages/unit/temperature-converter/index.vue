<template>
    <UiBaseContainer>
        <CalculatorsUnitTemperatureCalc />
        <UiCalcDescription>
            <template v-slot:description>
                This page contains two temperature converters that allow you to easily convert between Celsius (°C) and Fahrenheit (°F) temperatures. Simply input the temperature value in either Celsius or Fahrenheit, and the corresponding value in the other unit will be calculated and displayed for
                you.
            </template>
            <template v-slot:example
                >Let's say you want to convert a temperature of 25°C to Fahrenheit. You would enter "25" in the Celsius input field of the first calculator, click "Calculate", and the corresponding Fahrenheit temperature, which is 77°F, would be displayed. If you wanted to convert the
                Fahrenheit temperature 75°F to Celsius, you would enter "75" in the Fahrenheit input field of the second calculator, click "Calculate", and the corresponding Celsius temperature, which is 23.9°C, would be displayed.</template
            >
        </UiCalcDescription>
    </UiBaseContainer>
</template>

<script setup>
useHead({
    title: "Pretty Calculators - Temperature Converter",
    meta: [
        { hid: "title", name: "title", content: "Pretty Calculators - Temperature Converter" },
        { hid: "description", name: "description", content: "Easily convert between Celsius and Fahrenheit with Pretty Calculators' beautifully designed temperature converter calculator. Our tool makes it simple to convert temperatures accurately, helping you to plan for weather conditions, travel to different countries, or work with temperature-sensitive materials. Whether you're a scientist, traveler, or just looking to learn more about temperature conversions, our temperature converter calculator is perfect for anyone interested in making quick and accurate temperature conversions. Try it out today on Pretty Calculators." },
        { hid: "og-title", property: "og:title", content: "Pretty Calculators - Temperature Converter" },
        { hid: "og:description", property: "og:description", content: "Easily convert between Celsius and Fahrenheit with Pretty Calculators' beautifully designed temperature converter calculator. Our tool makes it simple to convert temperatures accurately, helping you to plan for weather conditions, travel to different countries, or work with temperature-sensitive materials. Whether you're a scientist, traveler, or just looking to learn more about temperature conversions, our temperature converter calculator is perfect for anyone interested in making quick and accurate temperature conversions. Try it out today on Pretty Calculators." },
    ],
});
</script>
