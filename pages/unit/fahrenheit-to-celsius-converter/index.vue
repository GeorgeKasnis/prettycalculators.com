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
    "Fahrenheit to Celsius Converter — °F to °C Free",
    "Convert Fahrenheit to Celsius instantly. Enter °F to get °C using the formula (°F − 32) × 5/9. Free temperature converter — no sign-up, no ads, just results.",
    [
        { q: "How do I convert Fahrenheit to Celsius?", a: "Subtract 32 then multiply by 5/9: °C = (°F − 32) × 5/9. For example, 98.6°F = (98.6 − 32) × 5/9 = 37°C." },
        { q: "What is 98.6°F in Celsius?", a: "98.6°F is 37°C — normal human body temperature." },
        { q: "What is 32°F in Celsius?", a: "32°F is 0°C — the freezing point of water." },
        { q: "What is 212°F in Celsius?", a: "212°F is 100°C — the boiling point of water at sea level." },
    ]
)
</script>
