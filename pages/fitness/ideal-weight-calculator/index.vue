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
    </UiCalcPage>
</template>

<script setup>
definePageMeta({ layout: 'brutalist' })
useCalcSEO(
    "Ideal Weight Calculator — Find Your Healthy Weight by Height",
    "Find your ideal weight by height and gender using four formulas: Hamwi, Devine, Robinson, and Miller. Free ideal weight calculator — results in seconds.",
    [
        { q: "How is ideal weight calculated?", a: "This calculator uses four formulas: Hamwi, Devine, Robinson, and Miller. Each produces slightly different results based on height and gender, giving you a range to aim for." },
        { q: "Is ideal weight the same as healthy weight?", a: "Ideal weight formulas provide a general target. Your doctor may recommend a different range based on your body composition, age, muscle mass, and personal health history." },
        { q: "Does ideal weight differ for men and women?", a: "Yes. Most ideal weight formulas produce different results for men and women at the same height, because men typically have more muscle mass and bone density." },
    ]
)
</script>
