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
        <template #faq>
            <CalcFaq :faqs="faqs" />
        </template>
    </UiCalcPage>
</template>

<script setup>
definePageMeta({ layout: 'brutalist' })

const faqs = [
    { q: "How do I convert Celsius to Fahrenheit?", a: "Multiply by 9/5 then add 32: °F = (°C × 9/5) + 32. For example, 100°C = (100 × 1.8) + 32 = 212°F." },
    { q: "What is 0°C in Fahrenheit?", a: "0°C is 32°F — the freezing point of water." },
    { q: "What is 100°C in Fahrenheit?", a: "100°C is 212°F — the boiling point of water at sea level." },
    { q: "At what temperature are Celsius and Fahrenheit equal?", a: "Celsius and Fahrenheit are equal at −40°. Both scales read −40 at this point." },
    { q: "What is 37°C in Fahrenheit?", a: "37°C is 98.6°F — normal human body temperature. A fever is typically above 38°C (100.4°F)." },
    { q: "What is 20°C in Fahrenheit?", a: "20°C is 68°F — a mild, comfortable room temperature often described as 'room temperature' in lab settings and cooking." },
    { q: "What is 180°C in Fahrenheit?", a: "180°C is 356°F — a common baking temperature for cakes, muffins, and moderate oven cooking. Many recipes specify 180°C / 356°F / Gas Mark 4." },
    { q: "What is 200°C in Fahrenheit?", a: "200°C is 392°F — a high oven temperature used for roasting vegetables, cooking pizza, and achieving a crisp finish on meats. Often labelled 'hot oven' in recipes." },
    { q: "What is a quick trick to convert Celsius to Fahrenheit in your head?", a: "A useful mental shortcut: double the Celsius temperature and add 30. It's not exact but gives a close estimate for everyday temperatures. Example: 25°C → 25×2 + 30 = 80°F (exact: 77°F). For body temperature and weather, this is accurate enough for a quick check." },
    { q: "Why do the US and UK use different temperature scales?", a: "The US uses Fahrenheit (°F), introduced by Daniel Fahrenheit in 1724 and never replaced. The UK and most of the world use Celsius (°C), adopted as part of the metric system. The UK formally switched to Celsius for weather and official purposes in the 1960s–70s, though Fahrenheit is still understood culturally. Scientific contexts worldwide use Celsius or Kelvin." },
]

useCalcSEO(
    "Celsius to Fahrenheit Converter — °C to °F Free",
    "Convert Celsius to Fahrenheit instantly. Enter °C to get °F using the formula (°C × 9/5) + 32. Free temperature converter — no sign-up, no ads, just results.",
    faqs
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
