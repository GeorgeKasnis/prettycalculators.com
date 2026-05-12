<template>
    <UiCalcPage title="Inches to CM Converter" category="unit" description-title="Convert inches and centimetres instantly">
        <template #calc>
            <CalculatorsUnitInchesToCmCalc />
        </template>
        <template #facts>
            <CalcFact label="1 inch"  value="2.54 cm" />
            <CalcFact label="1 foot"  value="30.48 cm" />
            <CalcFact label="1 yard"  value="91.44 cm" />
            <CalcFact label="1 metre" value="39.37 inches" />
        </template>
        <template #description>
            <p>
                The <strong>Inches to Centimetres Converter</strong> converts in both directions — type inches to get centimetres, or type centimetres to get inches. The conversion updates live as you type, with no button needed.
            </p>
            <p>
                The relationship between inches and centimetres is exact: <strong>1 inch = 2.54 centimetres</strong>, defined internationally since 1959. Going the other way, 1 centimetre = 0.3937 inches.
            </p>
            <p>Common uses:</p>
            <ul>
                <li><strong>Height</strong> — Converting personal height between imperial (5'11") and metric (180 cm) systems.</li>
                <li><strong>Screen sizes</strong> — TV and monitor sizes are measured diagonally in inches; EU specs often list cm.</li>
                <li><strong>Clothing</strong> — Waist, chest, and inseam measurements vary between US (inches) and EU (cm) sizing.</li>
                <li><strong>DIY & construction</strong> — Building materials and tools often use different unit systems by country.</li>
            </ul>
        </template>
        <template #example>
            <p>
                Convert <strong>5 feet 11 inches</strong> to centimetres (a common height).
            </p>
            <p>
                First, convert to total inches: 5 × 12 + 11 = <strong>71 inches</strong>.
            </p>
            <p>
                Then multiply: 71 × 2.54 = <strong>180.34 cm</strong>.
            </p>
            <p>
                Going the other way: to convert 180 cm to inches, divide by 2.54: 180 ÷ 2.54 ≈ 70.87 inches = 5 feet 10.87 inches ≈ <strong>5'11"</strong>.
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
    { q: "How many cm is 1 inch?", a: "1 inch is exactly 2.54 centimetres. This is an internationally defined conversion that has been exact since 1959." },
    { q: "How do I convert inches to cm?", a: "Multiply the number of inches by 2.54. For example, 12 inches × 2.54 = 30.48 cm. To go from cm to inches, divide by 2.54." },
    { q: "How many inches is 5 cm?", a: "5 cm ÷ 2.54 = 1.969 inches, or roughly 2 inches." },
    { q: "What is 6 feet in cm?", a: "6 feet = 72 inches. 72 × 2.54 = 182.88 cm." },
    { q: "How many cm is 5'7\"?", a: "5 feet 7 inches = 67 inches total. 67 × 2.54 = 170.18 cm." },
    { q: "How many cm is 5'10\"?", a: "5 feet 10 inches = 70 inches total. 70 × 2.54 = 177.8 cm." },
    { q: "How many inches is 160 cm?", a: "160 ÷ 2.54 = 62.99 inches = 5 feet 3 inches (rounded). 160 cm is approximately 5'3\"." },
    { q: "How many inches is 170 cm?", a: "170 ÷ 2.54 = 66.93 inches = 5 feet 6.93 inches ≈ 5'7\". 170 cm is close to 5 feet 7 inches." },
    { q: "How do I convert my TV screen size from inches to cm?", a: "Multiply the diagonal screen size in inches by 2.54. A 55-inch TV has a diagonal of 55 × 2.54 = 139.7 cm. A 65-inch TV is 165.1 cm diagonally. Note that screen size describes the diagonal, not the width or height of the display." },
    { q: "Why does the US use inches while most of the world uses centimetres?", a: "The US retained the imperial system (inches, feet, yards) following independence, while the rest of the world progressively adopted the metric system through the 18th–20th centuries. The US has made voluntary efforts toward metrication but daily life remains imperial. This means conversions are commonly needed for international commerce, science, and travel." },
]

useCalcSEO(
    "Inches to CM Converter — Centimetres to Inches",
    "Free inches to cm converter. Type inches to get centimetres or cm to get inches — instant bidirectional conversion with a handy reference table.",
    faqs
)

useHead({
    script: [{
        type: 'application/ld+json',
        innerHTML: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'HowTo',
            name: 'How to Convert Inches to Centimetres',
            description: 'Convert between inches and centimetres in either direction instantly.',
            step: [
                { '@type': 'HowToStep', position: 1, name: 'Enter inches or centimetres', text: 'Type a value in inches to get centimetres, or type centimetres to get inches — the converter works in both directions.' },
                { '@type': 'HowToStep', position: 2, name: 'Read your result', text: 'The converted value appears instantly. 1 inch = 2.54 cm exactly.' },
            ],
        }),
    }],
})
</script>
