<template>
    <UiCalcPage title="Feet to Meters Converter" category="unit" description-title="Convert feet & inches to meters and centimeters">
        <template #calc>
            <CalculatorsUnitFeetToMetersCalc />
        </template>
        <template #facts>
            <CalcFact label="1 foot"    value="0.3048 m" />
            <CalcFact label="1 meter"   value="3.2808 ft" />
            <CalcFact label="1 inch"    value="2.54 cm" />
            <CalcFact label="6 ft 0 in" value="1.828 m" />
        </template>
        <template #description>
            <p>
                The <strong>Feet to Meters Converter</strong> converts in both directions — enter feet and inches to get meters, or enter meters to get feet and inches. It also shows the equivalent in centimeters.
            </p>
            <p>
                The exact conversion is: <strong>1 foot = 0.3048 meters</strong> (defined exactly by international agreement since 1959). Going the other way, 1 meter = 3.28084 feet.
            </p>
            <p>This conversion is used constantly for:</p>
            <ul>
                <li><strong>Height</strong> — People in the US and UK state height in feet and inches; the rest of the world uses centimeters and meters.</li>
                <li><strong>Construction & real estate</strong> — Room sizes, ceiling heights, and lot sizes are quoted in different units depending on country.</li>
                <li><strong>Sports</strong> — Athletics events use meters; American football field dimensions use yards and feet.</li>
                <li><strong>Aviation</strong> — Altitude is measured in feet worldwide, even in countries that use the metric system.</li>
            </ul>
        </template>
        <template #example>
            <p>Convert <strong>5 feet 11 inches</strong> to meters (a common adult male height).</p>
            <p>Total inches = (5 × 12) + 11 = 71 inches. 71 × 0.0254 = <strong>1.8034 m</strong> (180.34 cm).</p>
            <p>Going the other way: convert <strong>1.75 m</strong> to feet. 1.75 / 0.3048 = 5.741 feet = <strong>5 ft 8.9 in</strong>.</p>
        </template>
        <template #faq>
            <CalcFaq :faqs="faqs" />
        </template>
    </UiCalcPage>
</template>

<script setup>
definePageMeta({ layout: 'brutalist' })

const faqs = [
    { q: "How many meters is 1 foot?", a: "1 foot = 0.3048 meters exactly. This is the international definition established in 1959. For quick estimates, divide feet by 3.28 to get meters." },
    { q: "How do I convert feet to meters?", a: "Multiply feet by 0.3048. For example, 6 feet × 0.3048 = 1.8288 meters. If you have feet and inches, convert everything to decimal feet first: 6 ft 3 in = 6.25 ft. Then × 0.3048 = 1.905 m." },
    { q: "How tall is 5 feet 7 inches in meters?", a: "5 ft 7 in = 67 total inches. 67 × 0.0254 = 1.7018 m (170.18 cm)." },
    { q: "How tall is 6 feet in meters?", a: "6 feet × 0.3048 = 1.8288 meters (182.88 cm). Often rounded to 1.83 m." },
    { q: "How many feet is 1.8 meters?", a: "1.8 / 0.3048 = 5.906 feet = 5 feet 10.9 inches. Often rounded to 5 ft 11 in." },
    { q: "How many feet is 1.7 meters?", a: "1.7 / 0.3048 = 5.577 feet = 5 feet 6.9 inches — approximately 5 ft 7 in." },
    { q: "How tall is 170 cm in feet?", a: "170 cm = 1.70 m. 1.70 / 0.3048 = 5.577 ft = 5 feet 6.9 inches — roughly 5 ft 7 in." },
    { q: "Why does aviation use feet instead of meters?", a: "Altitude in aviation is universally measured in feet, even in countries that use the metric system, because the international standard (established in the 1940s–50s) was built around US/UK practices. Changing now would require a global overhaul of all avionics, charts, and training — so it persists by convention. Flight levels are also stated in feet (FL350 = 35,000 ft)." },
    { q: "What is 5 foot 10 in meters?", a: "5 ft 10 in = 70 inches. 70 × 0.0254 = 1.778 m (177.8 cm)." },
    { q: "How many cm is 5 feet?", a: "5 feet × 30.48 cm/ft = 152.4 cm. Each foot is 30.48 cm, and each inch is 2.54 cm." },
]

useCalcSEO(
    "Feet to Meters Converter — ft & in to m",
    "Free feet to meters converter. Enter feet and inches to get meters and cm, or meters to get feet and inches. Instant bidirectional conversion.",
    faqs
)

useHead({
    script: [{
        type: 'application/ld+json',
        innerHTML: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'HowTo',
            name: 'How to Convert Feet to Meters',
            description: 'Convert between feet and inches and meters in either direction.',
            step: [
                { '@type': 'HowToStep', position: 1, name: 'Enter feet and inches or meters', text: 'Type feet and inches at the top to get meters, or type meters at the bottom to get feet and inches.' },
                { '@type': 'HowToStep', position: 2, name: 'Read the result', text: 'The converted value appears instantly. Centimeters are also shown.' },
            ],
        }),
    }],
})
</script>
