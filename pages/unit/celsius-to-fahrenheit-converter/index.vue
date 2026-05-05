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
    "Celsius to Fahrenheit Converter — °C to °F Free",
    "Convert Celsius to Fahrenheit instantly. Enter °C to get °F using the formula (°C × 9/5) + 32. Free temperature converter — no sign-up, no ads, just results.",
    [
        { q: "How do I convert Celsius to Fahrenheit?", a: "Multiply by 9/5 then add 32: °F = (°C × 9/5) + 32. For example, 100°C = (100 × 1.8) + 32 = 212°F." },
        { q: "What is 0°C in Fahrenheit?", a: "0°C is 32°F — the freezing point of water." },
        { q: "What is 100°C in Fahrenheit?", a: "100°C is 212°F — the boiling point of water at sea level." },
        { q: "At what temperature are Celsius and Fahrenheit equal?", a: "Celsius and Fahrenheit are equal at −40°. Both scales read −40 at this point." },
    ]
)

useHead({
    script: [{
        type: 'application/ld+json',
        innerHTML: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'HowTo',
            name: 'How to Convert Celsius to Fahrenheit',
            description: 'Convert any temperature from °C to °F using the standard formula.',
            step: [
                { '@type': 'HowToStep', position: 1, name: 'Enter the temperature in Celsius', text: 'Type the °C value you want to convert into the input field.' },
                { '@type': 'HowToStep', position: 2, name: 'Get your Fahrenheit result', text: 'The equivalent temperature in °F appears instantly using the formula (°C × 9/5) + 32.' },
            ],
        }),
    }],
})
</script>
