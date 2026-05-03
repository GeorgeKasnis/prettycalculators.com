<template>
    <UiCalcPage title="Fahrenheit to Celsius" category="unit" description-title="Convert Fahrenheit to Celsius instantly">
        <template #calc>
            <CalculatorsUnitFahrToCelsiusCalc />
        </template>
        <template #facts>
            <CalcFact label="Formula" value="(°F − 32) × 5/9" />
            <CalcFact label="Body temperature" value="98.6°F = 37°C" />
            <CalcFact label="Freezing point" value="32°F = 0°C" />
        </template>
        <template #description>
            <p>Easily convert temperatures from Fahrenheit (°F) to Celsius (°C) with our Fahrenheit to Celsius Calculator. This versatile tool streamlines temperature conversion, providing you with precise Celsius values from Fahrenheit inputs.</p>
            <p>
                Temperature conversion plays a crucial role in various domains, from international travel to scientific research. Our calculator simplifies this task by requiring you to input the temperature value in Fahrenheit. Once entered, it promptly calculates and displays the equivalent
                temperature in Celsius.
            </p>
            <p>Imagine you're traveling abroad and need to interpret temperature forecasts in Celsius, but you're more familiar with Fahrenheit. With our calculator, you can effortlessly convert the provided Celsius temperatures to Fahrenheit, making travel planning a breeze.</p>
            <p>Whether you're a globetrotter preparing for international adventures, a researcher working with diverse temperature scales, or simply curious about temperature conversions, our Fahrenheit to Celsius Calculator is an invaluable tool.</p>
        </template>
        <template #example>
            <p>Suppose you have a temperature of 75°F that you'd like to convert to Celsius. Enter "75" in the Fahrenheit input field, click "Calculate," and you'll discover that the equivalent temperature in Celsius is 23.9°C.</p>
        </template>
    </UiCalcPage>
</template>

<script setup>
definePageMeta({ layout: 'brutalist' })
useCalcSEO(
    "Pretty Calculators | Fahrenheit to Celsius Converter - Quick and Accurate Temperature Conversion",
    "Easily convert between Fahrenheit and Celsius with Pretty Calculators' beautifully designed temperature converter calculator. Our tool makes it simple to convert temperatures accurately, helping you to plan for weather conditions, travel to different countries, or work with temperature-sensitive materials. Whether you're a scientist, traveler, or just looking to learn more about temperature conversions, our Fahrenheit to Celsius converter is perfect for anyone interested in making quick and accurate temperature conversions. Try it out today on Pretty Calculators."
)
</script>
