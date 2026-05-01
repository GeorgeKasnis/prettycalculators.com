<template>
    <UiCalcPage title="Ideal Weight Calculator" category="fitness">
        <template #calc>
            <CalculatorsFitnessIdealWeightCalc />
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
    "Pretty Calculators - Ideal Weight Calculator",
    "Find your ideal weight based on your height and gender with Pretty Calculators' free Ideal Weight Calculator. Using the Hamwi formula, our easy-to-use tool gives you a healthy weight target in seconds. Perfect for anyone tracking their fitness goals or starting a new health journey."
)
</script>
