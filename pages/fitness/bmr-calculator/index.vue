<template>
    <UiCalcPage title="BMR Calculator" category="fitness" description-title="How many calories your body burns at rest">
        <template #calc>
            <CalculatorsFitnessBmrCalc />
        </template>
        <template #facts>
            <CalcFact label="Formula" value="Harris-Benedict" />
            <CalcFact label="Accuracy" value="± 10%" />
            <CalcFact label="Inputs" value="Gender, age, weight, height" />
        </template>
        <template #description>
            <p>
                A <span class="font-bold">Basal Metabolic Rate (BMR) calculator</span> is a valuable tool that helps estimate the number of calories your body burns while at rest. It's a fundamental component in understanding your overall energy expenditure. By taking into account essential
                factors like <span class="font-bold">age, weight, height, and gender</span>, this calculator provides insights into your body's fundamental caloric needs. The calculation method for <span class="font-bold">BMR</span> depends on your gender.
            </p>
            <p>If you are a <span class="font-bold">male</span>, the BMR is calculated as follows:</p>
            <p>[<span class="font-bold">BMR</span> = 88.362 + (13.397 * weight in kilograms) + (4.799 * height in centimeters) - (5.677 * age in years)]</p>
            <p>If you are a <span class="font-bold">female</span>, the BMR calculation is slightly different:</p>
            <p>[<span class="font-bold">BMR</span> = 447.593 + (9.247 * weight in kilograms) + (3.098 * height in centimeters) - (4.33 * age in years)]</p>
            <p>
                Whether you're male or female, it's essential to note that <span class="font-bold">BMR</span> is an estimate and may vary among individuals due to factors like muscle mass, body composition, genetics, and more. It serves as a valuable starting point, best used alongside guidance
                from a healthcare professional to gain a more accurate understanding of your specific calorie requirements and health objectives.
            </p>
            <p><span class="font-bold">BMR</span> represents the number of calories your body requires to maintain essential physiological functions, such as breathing, circulation, and cell production, when at rest. It signifies the energy needed to sustain life in a state of complete rest.</p>
        </template>
        <template #example>
            <p>For example, let's consider a <span class="font-bold">30-year-old female</span> who <span class="font-bold">weighs 65 kilograms</span> and is <span class="font-bold">1.65 meters tall</span>. Substituting these values into the formula for a female:</p>
            <p>[<span class="font-bold">BMR</span> = 447.593 + (9.247 * 65) + (3.098 * 165) - (4.33 * 30)]</p>
            <p>Simplifying this equation:</p>
            <p>[<span class="font-bold">BMR</span> = 447.593 + 601.055 + 511.77 - 129.9]</p>
            <p>[<span class="font-bold">BMR</span> = 1430]</p>
            <p>Therefore, this individual's estimated <span class="font-bold">BMR</span> is approximately <span class="font-bold">1430 calories per day</span>. This represents the number of calories her body requires to maintain essential functions in a state of complete rest.</p>
            <p>
                Understanding your <span class="font-bold">BMR</span> serves as a foundational step in determining your daily calorie needs. To maintain, gain, or lose weight, you must take into account your activity level and total daily energy expenditure (TDEE). By factoring in physical
                activity, you can calculate the number of calories needed to maintain your current weight or reach your desired objectives. Nonetheless, it's crucial to bear in mind that <span class="font-bold">BMR</span> is a starting point, and consulting with a healthcare professional or
                registered dietitian is highly recommended for personalized guidance on your nutritional and health journey.
            </p>
        </template>
    </UiCalcPage>
</template>

<script setup>
definePageMeta({ layout: 'brutalist' })
useCalcSEO(
    "BMR Calculator — Metric & Imperial | Basal Metabolic Rate",
    "Free BMR calculator in metric (kg, cm) or imperial (lbs, ft, in). Uses the revised Harris-Benedict formula to estimate calories your body burns at rest.",
    [
        { q: "What is BMR?", a: "BMR (Basal Metabolic Rate) is the number of calories your body burns at complete rest to maintain basic functions like breathing, circulation, and cell production." },
        { q: "How is BMR calculated?", a: "This calculator uses the revised Harris-Benedict equation. For men: 88.362 + (13.397 × kg) + (4.799 × cm) − (5.677 × age). For women: 447.593 + (9.247 × kg) + (3.098 × cm) − (4.33 × age). Imperial inputs are converted to metric before the formula is applied." },
        { q: "How do I calculate BMR in pounds and inches?", a: "Select Imperial using the toggle at the bottom-left of the screen. Enter your weight in lbs and height in feet and inches — the calculator converts to kg and cm automatically before applying the Harris-Benedict formula." },
        { q: "What is the average BMR?", a: "The average BMR for adults is roughly 1,400–1,800 calories per day, though it varies based on age, weight, height, and sex." },
        { q: "Does BMR decrease with age?", a: "Yes, BMR typically decreases by about 1–2% per decade after age 20 as muscle mass naturally declines. This is mainly due to loss of lean muscle tissue." },
    ]
)

useHead({
    script: [{
        type: 'application/ld+json',
        innerHTML: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'HowTo',
            name: 'How to Calculate Your Basal Metabolic Rate (BMR)',
            description: 'Calculate your BMR using the revised Harris-Benedict formula in metric or imperial units.',
            step: [
                { '@type': 'HowToStep', position: 1, name: 'Choose your unit system', text: 'Use the Metric / Imperial toggle at the bottom-left of the screen to choose kg/cm or lbs/ft/in.' },
                { '@type': 'HowToStep', position: 2, name: 'Select your gender', text: 'Choose Male or Female — the BMR formula differs between sexes.' },
                { '@type': 'HowToStep', position: 3, name: 'Enter weight and height', text: 'Metric: weight in kg, height in cm. Imperial: weight in lbs, height in feet and inches separately.' },
                { '@type': 'HowToStep', position: 4, name: 'Enter your age', text: 'Enter your age in years.' },
                { '@type': 'HowToStep', position: 5, name: 'Click Calculate', text: 'Your estimated BMR in kcal/day appears instantly.' },
            ],
        }),
    }],
})
</script>
