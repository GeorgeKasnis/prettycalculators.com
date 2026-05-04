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
    </UiCalcPage>
</template>

<script setup>
definePageMeta({ layout: 'brutalist' })
useCalcSEO(
    "Inches to CM Converter — Centimetres to Inches",
    "Free inches to cm converter. Type inches to get centimetres or cm to get inches — instant bidirectional conversion with a handy reference table.",
    [
        { q: "How many cm is 1 inch?", a: "1 inch is exactly 2.54 centimetres. This is an internationally defined conversion that has been exact since 1959." },
        { q: "How do I convert inches to cm?", a: "Multiply the number of inches by 2.54. For example, 12 inches × 2.54 = 30.48 cm. To go from cm to inches, divide by 2.54." },
        { q: "How many inches is 5 cm?", a: "5 cm ÷ 2.54 = 1.969 inches, or roughly 2 inches." },
        { q: "What is 6 feet in cm?", a: "6 feet = 72 inches. 72 × 2.54 = 182.88 cm." },
    ]
)
</script>
