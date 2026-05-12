<template>
    <UiCalcPage title="KG to LBS Converter" category="unit" description-title="Convert kilograms and pounds instantly">
        <template #calc>
            <CalculatorsUnitKgToLbsCalc />
        </template>
        <template #facts>
            <CalcFact label="1 kg"    value="2.2046 lbs" />
            <CalcFact label="1 lb"    value="0.4536 kg" />
            <CalcFact label="1 stone" value="6.35 kg" />
            <CalcFact label="100 lbs" value="45.36 kg" />
        </template>
        <template #description>
            <p>
                The <strong>KG to LBS Converter</strong> converts in both directions — type kilograms to get pounds, or type pounds to get kilograms. It also shows the equivalent in stones and pounds (used in the UK and Ireland for body weight).
            </p>
            <p>
                The exact conversion is: <strong>1 kilogram = 2.20462 pounds</strong>. Going the other way, 1 pound = 0.453592 kilograms.
            </p>
            <p>This conversion is used constantly in:</p>
            <ul>
                <li><strong>Fitness & bodyweight</strong> — Gym equipment in the US uses lbs; most of the world uses kg.</li>
                <li><strong>Food & cooking</strong> — US recipes use lbs/oz while international recipes use grams/kg.</li>
                <li><strong>Shipping & parcels</strong> — Courier services often quote in different units by country.</li>
                <li><strong>Medical</strong> — Patient weight is recorded in kg in most countries, lbs in the US.</li>
            </ul>
        </template>
        <template #example>
            <p>
                Convert <strong>75 kg</strong> to pounds (a common body weight).
            </p>
            <p>
                75 × 2.20462 = <strong>165.35 lbs</strong>.
            </p>
            <p>
                In stones: 165.35 ÷ 14 = 11 stone 11.35 lbs ≈ <strong>11 st 11 lb</strong>.
            </p>
            <p>
                Going the other way: to convert 180 lbs to kg, divide by 2.20462: 180 ÷ 2.20462 ≈ <strong>81.65 kg</strong>.
            </p>
        </template>
        <template #faq>
            <CalcFaq :faqs="faqs" />
        </template>
    </UiCalcPage>
</template>

<script setup>
definePageMeta({ layout: 'brutalist' })

const faqs = [
    { q: "How many lbs is 1 kg?", a: "1 kilogram equals 2.20462 pounds. For a quick estimate, multiply kg by 2.2." },
    { q: "How do I convert kg to lbs?", a: "Multiply kilograms by 2.20462. For example, 70 kg × 2.20462 = 154.32 lbs." },
    { q: "How many kg is 150 lbs?", a: "150 lbs ÷ 2.20462 = 68.04 kg." },
    { q: "What is 1 stone in kg?", a: "1 stone = 14 pounds = 6.35029 kg. For example, 11 stone = 69.85 kg." },
    { q: "How many lbs is 80 kg?", a: "80 kg × 2.20462 = 176.37 lbs." },
    { q: "How many kg is 200 lbs?", a: "200 lbs ÷ 2.20462 = 90.72 kg." },
    { q: "What is 10 stone in kg?", a: "10 stone = 140 pounds. 140 ÷ 2.20462 = 63.5 kg." },
    { q: "What is 12 stone in lbs and kg?", a: "12 stone = 168 lbs. 168 ÷ 2.20462 = 76.2 kg. Stones are most commonly used in the UK and Ireland for body weight." },
    { q: "How much is 100 kg in lbs?", a: "100 kg × 2.20462 = 220.46 lbs. A useful benchmark: 100 kg is just over 220 lbs or just under 15 stone 11 lbs." },
    { q: "Why do gyms in the UK use both kg and lbs on equipment?", a: "Gym equipment in the UK is often imported from or designed for the US market, which uses pounds. UK gyms may label weights in both units to accommodate members familiar with either system. Barbell plates in competitive powerlifting and weightlifting are measured in kg internationally, but many commercial gym plates are marked in lbs or both." },
]

useCalcSEO(
    "KG to LBS Converter — Kilograms to Pounds",
    "Free kg to lbs converter. Type kilograms to get pounds or pounds to get kg — instant bidirectional conversion. Also shows stones and pounds.",
    faqs
)

useHead({
    script: [{
        type: 'application/ld+json',
        innerHTML: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'HowTo',
            name: 'How to Convert Kilograms to Pounds',
            description: 'Convert between kg and lbs in either direction, with stones output included.',
            step: [
                { '@type': 'HowToStep', position: 1, name: 'Enter kilograms or pounds', text: 'Type a value in kg to get pounds, or type pounds to get kg — the converter works in both directions.' },
                { '@type': 'HowToStep', position: 2, name: 'Read your result', text: 'The converted weight appears instantly in lbs (and kg), with the stones equivalent also shown.' },
            ],
        }),
    }],
})
</script>
