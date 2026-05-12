<template>
    <UiCalcPage title="Ideal Weight Calculator" category="fitness" description-title="Find a healthy weight target for your height">
        <template #calc>
            <CalculatorsFitnessIdealWeightCalc />
        </template>
        <template #facts>
            <CalcFact label="Formula" value="Hamwi" />
            <CalcFact label="Base (male)" value="48 kg" unit="at 5 ft" />
            <CalcFact label="Base (female)" value="45.5 kg" unit="at 5 ft" />
        </template>
        <template #description>
            <p>
                An <span class="font-bold">Ideal Weight Calculator</span> estimates the weight range that is considered healthy for your <span class="font-bold">height and gender</span>. It uses the <span class="font-bold">Hamwi formula</span>, one of the most widely used clinical methods,
                which sets a base weight for a height of 5 feet (152.4 cm) and adds a fixed amount per additional inch of height.
            </p>
            <p>For <span class="font-bold">males</span>:</p>
            <p>[<span class="font-bold">Ideal Weight</span> = 48 kg + 2.7 kg for every inch over 5 feet]</p>
            <p>For <span class="font-bold">females</span>:</p>
            <p>[<span class="font-bold">Ideal Weight</span> = 45.5 kg + 2.2 kg for every inch over 5 feet]</p>
            <p>
                Height in centimetres is automatically converted to feet and inches for the calculation. Keep in mind that ideal weight is a general guideline — factors like <span class="font-bold">muscle mass, bone density, age, and body composition</span> all play a role in what a healthy
                weight looks like for you personally. Use this result alongside your BMI and body fat percentage for a more complete picture.
            </p>
        </template>
        <template #example>
            <p>Let's take a <span class="font-bold">female</span> who is <span class="font-bold">168 cm tall</span> (approximately 5 feet 6 inches).</p>
            <p>Step 1 — convert height to inches over 5 feet:</p>
            <p>168 cm − 152.4 cm = 15.6 cm ÷ 2.54 = <span class="font-bold">6.14 inches over 5 feet</span></p>
            <p>Step 2 — apply the Hamwi formula for females:</p>
            <p>[<span class="font-bold">Ideal Weight</span> = 45.5 + (2.2 × 6.14) = 45.5 + 13.5 = <span class="font-bold">59.0 kg</span>]</p>
            <p>
                So a woman who is 168 cm tall has an estimated ideal weight of around <span class="font-bold">59 kg</span>. This is a starting point — not a strict target. A healthy weight range varies by individual, and consulting a healthcare professional is always recommended for
                personalised guidance.
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
    { q: "How is ideal weight calculated?", a: "This calculator uses the Hamwi formula: for men, 48 kg + 2.7 kg per inch over 5 feet; for women, 45.5 kg + 2.2 kg per inch over 5 feet. Height in cm is automatically converted to feet and inches." },
    { q: "How do I get my ideal weight in pounds?", a: "Select Imperial using the toggle at the bottom-left of the screen. Enter your height in feet and inches, and your ideal weight result will be shown in lbs instead of kg." },
    { q: "Is ideal weight the same as healthy weight?", a: "Ideal weight formulas provide a general guideline. Your doctor may recommend a different range based on your body composition, age, muscle mass, and personal health history." },
    { q: "Does ideal weight differ for men and women?", a: "Yes. The Hamwi formula uses different base weights and per-inch additions for men and women, because men typically carry more muscle mass and bone density." },
    { q: "What if I am shorter than 5 feet?", a: "The Hamwi formula bases ideal weight at exactly 5 feet (152.4 cm). For heights below 5 feet, the calculator uses the base weight (48 kg for men, 45.5 kg for women) without subtracting, providing a floor estimate." },
    { q: "What is the ideal weight for a 5'6\" woman?", a: "Using the Hamwi formula: 45.5 + (2.2 × 6 inches) = 45.5 + 13.2 = 58.7 kg (about 129 lbs). This is a clinical estimate — healthy weight ranges are broader, and factors like muscle mass and frame size matter." },
    { q: "What is the ideal weight for a 6'0\" man?", a: "Using the Hamwi formula: 48 + (2.7 × 12 inches) = 48 + 32.4 = 80.4 kg (about 177 lbs). A 6-foot man in the normal BMI range (18.5–24.9) would weigh between 60 and 82 kg, so the Hamwi result sits near the upper end of that range." },
    { q: "Why is my ideal weight different from what the BMI calculator says?", a: "The Hamwi ideal weight formula and BMI use different approaches. BMI gives a range (18.5–24.9 is 'normal'), while Hamwi gives a single point estimate. Hamwi's single target often falls around BMI 21–22 for most heights. If you have more muscle than average, a slightly higher weight is still healthy." },
    { q: "How do I reach my ideal weight safely?", a: "A safe rate of weight loss is 0.5–1 kg per week, achieved through a daily calorie deficit of 500–1,000 kcal below TDEE. Combining moderate cardio with resistance training preserves muscle while losing fat, keeping your metabolism higher than diet alone would." },
    { q: "Is the ideal weight formula accurate for older adults?", a: "The Hamwi formula was developed primarily for clinical use in adults of working age. Research suggests that for adults over 65, a slightly higher BMI (23–27) is associated with better outcomes. Older adults may carry less muscle and more visceral fat at the same ideal weight number, so consult a doctor before using this as a weight-loss target." },
]

useCalcSEO(
    "Ideal Weight Calculator — Metric & Imperial | Hamwi Formula",
    "Find your ideal body weight by height and gender using the Hamwi formula. Supports metric (cm → kg) and imperial (ft/in → lbs). Free & instant.",
    faqs
)

useHead({
    script: [{
        type: 'application/ld+json',
        innerHTML: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'HowTo',
            name: 'How to Find Your Ideal Weight',
            description: 'Calculate ideal body weight by height and gender using the Hamwi formula.',
            step: [
                { '@type': 'HowToStep', position: 1, name: 'Choose your unit system', text: 'Use the Metric / Imperial toggle at the bottom-left. Metric gives result in kg, Imperial gives result in lbs.' },
                { '@type': 'HowToStep', position: 2, name: 'Select gender', text: 'Ideal weight differs for men and women at the same height.' },
                { '@type': 'HowToStep', position: 3, name: 'Enter your height', text: 'Metric: height in centimetres. Imperial: feet and inches separately.' },
                { '@type': 'HowToStep', position: 4, name: 'Click Calculate', text: 'Your estimated ideal body weight appears in kg (metric) or lbs (imperial).' },
                { '@type': 'HowToStep', position: 5, name: 'Interpret your result', text: 'Use this as a guideline alongside your BMI and body fat percentage — not as a strict target.' },
            ],
        }),
    }],
})
</script>
