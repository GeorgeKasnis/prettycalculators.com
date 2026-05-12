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
        <template #faq>
            <CalcFaq :faqs="faqs" />
        </template>
    </UiCalcPage>
</template>

<script setup>
definePageMeta({ layout: 'brutalist' })

const faqs = [
    { q: "How do I convert Fahrenheit to Celsius?", a: "Subtract 32 then multiply by 5/9: °C = (°F − 32) × 5/9. For example, 98.6°F = (98.6 − 32) × 5/9 = 37°C." },
    { q: "What is 98.6°F in Celsius?", a: "98.6°F is 37°C — normal human body temperature." },
    { q: "What is 32°F in Celsius?", a: "32°F is 0°C — the freezing point of water." },
    { q: "What is 212°F in Celsius?", a: "212°F is 100°C — the boiling point of water at sea level." },
    { q: "What is 350°F in Celsius?", a: "350°F is approximately 177°C — a common moderate baking temperature. Many recipes specify 350°F (175–180°C) for cakes, cookies, and casseroles." },
    { q: "What is 400°F in Celsius?", a: "400°F is approximately 204°C — a hot oven temperature used for roasting, pizza, and achieving crispy results. Often rounded to 200°C in metric recipes." },
    { q: "What is 72°F in Celsius?", a: "72°F is approximately 22.2°C — a comfortable indoor room temperature. Many thermostats in the US are set around 68–72°F (20–22°C) for year-round comfort." },
    { q: "What is a quick way to convert Fahrenheit to Celsius in your head?", a: "A handy mental shortcut: subtract 30 from the Fahrenheit temperature, then halve the result. Example: 80°F → 80−30 = 50, ÷2 = 25°C (exact: 26.7°C). It's slightly off at the extremes but useful for everyday weather and cooking estimates." },
    { q: "What is 104°F in Celsius?", a: "104°F is 40°C — a high fever temperature requiring immediate medical attention. Normal body temperature is 37°C (98.6°F), and a fever is generally defined as above 38°C (100.4°F)." },
    { q: "Why is Fahrenheit still used in the United States?", a: "The US adopted the Fahrenheit scale in the colonial era and never transitioned to Celsius, which became part of the international metric system in the 20th century. Cultural inertia, infrastructure costs, and public familiarity have prevented a switch. Science, medicine, and international business in the US use Celsius and metric units; everyday life uses Fahrenheit and imperial measures." },
]

useCalcSEO(
    "Fahrenheit to Celsius Converter — °F to °C Free",
    "Convert Fahrenheit to Celsius instantly. Enter °F to get °C using the formula (°F − 32) × 5/9. Free temperature converter — no sign-up, no ads, just results.",
    faqs
)

useHead({
    script: [{
        type: 'application/ld+json',
        innerHTML: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'HowTo',
            name: 'How to Convert Fahrenheit to Celsius',
            description: 'Convert any temperature from °F to °C using the standard formula.',
            step: [
                { '@type': 'HowToStep', position: 1, name: 'Enter the temperature in Fahrenheit', text: 'Type the °F value you want to convert into the input field.' },
                { '@type': 'HowToStep', position: 2, name: 'Get your Celsius result', text: 'The equivalent temperature in °C appears instantly using the formula (°F − 32) × 5/9.' },
            ],
        }),
    }],
})
</script>
