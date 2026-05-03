<template>
    <UiCalcPage title="Celsius to Fahrenheit" category="unit" description-title="Convert Celsius to Fahrenheit instantly">
        <template #calc>
            <CalculatorsUnitCelsiusToFahrCalc />
        </template>
        <template #facts>
            <CalcFact label="Formula" value="(°C × 9/5) + 32" />
            <CalcFact label="Freezing point" value="0°C = 32°F" />
            <CalcFact label="Boiling point" value="100°C = 212°F" />
        </template>
        <template #description>
            <p>Effortlessly convert temperatures from Celsius (°C) to Fahrenheit (°F) with our Celsius to Fahrenheit Calculator. This user-friendly tool streamlines the conversion process, allowing you to obtain Fahrenheit values quickly and accurately.</p>
            <p>
                Temperature conversion is a common task for various applications, including weather forecasting, cooking, and scientific research. Our calculator simplifies this task by requiring you to input the temperature value in Celsius, after which it promptly calculates and displays the
                equivalent temperature in Fahrenheit.
            </p>
            <p>Imagine you're cooking a recipe that specifies temperatures in Celsius, but your oven is marked in Fahrenheit. With our calculator, you can effortlessly convert the recipe's Celsius temperatures to Fahrenheit, ensuring your culinary endeavors are a success.</p>
            <p>Whether you're a chef seeking precise cooking temperatures, a traveler deciphering weather forecasts, or a scientist conducting experiments, our Celsius to Fahrenheit Calculator is a valuable companion.</p>
        </template>
        <template #example>
            <p>Suppose you have a temperature of 25°C that you'd like to convert to Fahrenheit. Simply enter "25" in the Celsius input field, click "Calculate," and you'll see that the equivalent temperature in Fahrenheit is 77°F.</p>
        </template>
    </UiCalcPage>
</template>

<script setup>
definePageMeta({ layout: 'brutalist' })
useCalcSEO(
    "Pretty Calculators - Celsius to Fahrenheit Converter",
    "Easily convert Celsius to Fahrenheit with Pretty Calculators' beautifully designed temperature converter calculator. Our tool makes it simple to convert temperatures accurately, helping you to plan for weather conditions, travel to different countries, or work with temperature-sensitive materials. Whether you're a scientist, traveler, or just looking to learn more about temperature conversions, our Celsius to Fahrenheit converter calculator is perfect for anyone interested in making quick and accurate temperature conversions. Try it out today on Pretty Calculators."
)
</script>
