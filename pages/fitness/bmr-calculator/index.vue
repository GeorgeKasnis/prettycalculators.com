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
    "BMR Calculator — Free Basal Metabolic Rate Calculator",
    "Calculate your Basal Metabolic Rate (BMR) — calories burned at rest. Uses the Mifflin-St Jeor formula. Enter age, weight, height, and gender. Free & instant.",
    [
        { q: "What is BMR?", a: "BMR (Basal Metabolic Rate) is the number of calories your body burns at complete rest to maintain basic functions like breathing, circulation, and cell production." },
        { q: "How is BMR calculated?", a: "This calculator uses the Mifflin-St Jeor equation: (10 × weight kg) + (6.25 × height cm) − (5 × age) + 5 for men, or −161 for women. It is considered the most accurate formula for most adults." },
        { q: "What is the average BMR?", a: "The average BMR for adults is roughly 1,400–1,800 calories per day, though it varies based on age, weight, height, and sex." },
        { q: "Does BMR decrease with age?", a: "Yes, BMR typically decreases by about 1–2% per decade after age 20 as muscle mass naturally declines." },
    ]
)
</script>
