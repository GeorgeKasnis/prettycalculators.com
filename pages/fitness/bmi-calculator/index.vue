<template>
    <UiCalcPage title="BMI Calculator" category="fitness" description-title="Your weight relative to height, measured">
        <template #calc>
            <CalculatorsFitnessBmiCalc />
        </template>
        <template #facts>
            <CalcFact label="Formula (metric)" value="kg / m²" />
            <CalcFact label="Formula (imperial)" value="(lbs × 703) / in²" />
            <CalcFact label="Healthy range" value="18.5 – 24.9" />
            <CalcFact label="Overweight" value="25 – 29.9" />
            <CalcFact label="Obese" value="≥ 30" />
        </template>
        <template #description>
            <p>
                The <strong>BMI calculator</strong> (Body Mass Index calculator) estimates your body fat based on your height and weight. It works in both <strong>metric (kg, cm)</strong> and <strong>imperial (lbs, feet, inches)</strong> units and instantly tells you whether you fall in the underweight, normal, overweight, or obese range.
            </p>

            <h3>BMI categories — reference chart</h3>
            <table class="bmi-table">
                <thead>
                    <tr><th>BMI Range</th><th>Category</th><th>Health Risk</th></tr>
                </thead>
                <tbody>
                    <tr><td>Below 18.5</td><td><strong>Underweight</strong></td><td>Nutritional deficiency risk</td></tr>
                    <tr><td>18.5 – 24.9</td><td><strong>Normal weight</strong></td><td>Lowest risk</td></tr>
                    <tr><td>25.0 – 29.9</td><td><strong>Overweight</strong></td><td>Moderate risk</td></tr>
                    <tr><td>30.0 – 34.9</td><td><strong>Obese (Class I)</strong></td><td>High risk</td></tr>
                    <tr><td>35.0 – 39.9</td><td><strong>Obese (Class II)</strong></td><td>Very high risk</td></tr>
                    <tr><td>40 or above</td><td><strong>Obese (Class III)</strong></td><td>Extremely high risk</td></tr>
                </tbody>
            </table>

            <h3>BMI formula</h3>
            <p>
                <strong>Metric:</strong> BMI = weight (kg) ÷ height (m)²<br>
                <strong>Imperial:</strong> BMI = (weight (lbs) × 703) ÷ height (inches)²
            </p>
            <p>
                Example (metric): a person weighing 70 kg at 175 cm has a BMI of 70 ÷ (1.75)² = <strong>22.9 — Normal</strong>.<br>
                Example (imperial): a person weighing 154 lbs at 5 ft 9 in (69 inches) has a BMI of (154 × 703) ÷ 69² = <strong>22.7 — Normal</strong>.
            </p>

            <h3>Limitations of BMI</h3>
            <p>
                BMI does not distinguish between muscle and fat, so it can be misleading for <strong>athletes</strong> (who may show "overweight" BMI due to muscle mass) and <strong>older adults</strong> (who may show "normal" BMI despite excess body fat). For a fuller picture, use BMI alongside <NuxtLink to="/fitness/body-fat-calculator">body fat percentage</NuxtLink> and <NuxtLink to="/fitness/tdee-calculator">daily calorie needs (TDEE)</NuxtLink>.
            </p>
            <p>
                BMI also applies the same thresholds across sexes, though research suggests women naturally carry more body fat than men at the same BMI. The standard WHO thresholds above apply to adults aged 18–65.
            </p>
        </template>
        <template #example>
            <p>Let's walk through an example using <strong>imperial units</strong>. You weigh <strong>180 lbs</strong> and are <strong>5 ft 11 in</strong> tall (71 inches total).</p>
            <p>BMI = (180 × 703) ÷ 71² = 126,540 ÷ 5,041 = <strong>25.1 — Overweight</strong>.</p>
            <p>Now the same person in <strong>metric</strong>: 81.6 kg at 180 cm. BMI = 81.6 ÷ (1.80)² = 81.6 ÷ 3.24 = <strong>25.2 — Overweight</strong>. Minor rounding difference, same category.</p>
            <p>To move to the top of the "Normal" range (BMI 24.9), this person would need to weigh about 178 lbs (80.7 kg). Small targets like this are more motivating than abstract BMI numbers.</p>
        </template>
    </UiCalcPage>
</template>

<script setup>
definePageMeta({ layout: 'brutalist' })

useCalcSEO(
    "BMI Calculator — Metric & Imperial (kg/lbs)",
    "Free BMI calculator supporting metric (kg, cm) and imperial (lbs, ft, in). Get your BMI score, category, and healthy weight range instantly.",
    [
        { q: "What is a normal BMI?", a: "A normal (healthy) BMI is between 18.5 and 24.9. Below 18.5 is underweight, 25–29.9 is overweight, and 30 or above is obese according to WHO guidelines." },
        { q: "How is BMI calculated in metric units?", a: "BMI = weight (kg) ÷ height (m)². For example, a person weighing 70 kg at 1.75 m has a BMI of 70 ÷ (1.75²) ≈ 22.9, which is in the normal range." },
        { q: "How do I calculate BMI in pounds and inches?", a: "BMI = (weight in lbs × 703) ÷ height in inches². For example, 154 lbs at 5 ft 9 in (69 inches): (154 × 703) ÷ 69² = 108,262 ÷ 4,761 ≈ 22.7." },
        { q: "Is BMI accurate for athletes?", a: "BMI may overestimate body fat in athletes because muscle weighs more than fat. A 200 lb athlete could show an 'overweight' BMI despite having very low body fat. Body fat percentage is a more accurate measure for athletes." },
        { q: "What BMI is considered obese?", a: "A BMI of 30 or higher is classified as obese. 30–34.9 is Class I obesity, 35–39.9 is Class II, and 40+ is Class III (severe obesity)." },
        { q: "Is BMI the same for men and women?", a: "The same BMI thresholds are used for both sexes, but women naturally carry more body fat than men at any given BMI. A BMI of 22 in a woman represents a higher body fat percentage than in a man of the same BMI." },
        { q: "What is a healthy BMI for seniors over 65?", a: "Some research suggests a slightly higher BMI of 23–27 may be healthier for adults over 65, as modest body reserves can help during illness. Always consult a doctor for age-specific guidance." },
    ]
)

useHead({
    script: [
        {
            type: 'application/ld+json',
            innerHTML: JSON.stringify({
                '@context': 'https://schema.org',
                '@type': 'HowTo',
                name: 'How to Calculate BMI',
                description: 'Calculate your Body Mass Index using weight and height in metric or imperial units.',
                step: [
                    {
                        '@type': 'HowToStep',
                        position: 1,
                        name: 'Choose your unit system',
                        text: 'Select Metric (kg and cm) or Imperial (lbs and feet/inches) using the toggle at the top of the calculator.',
                    },
                    {
                        '@type': 'HowToStep',
                        position: 2,
                        name: 'Enter your height',
                        text: 'In metric mode, enter your height in centimetres. In imperial mode, enter feet and inches separately.',
                    },
                    {
                        '@type': 'HowToStep',
                        position: 3,
                        name: 'Enter your weight',
                        text: 'In metric mode, enter your weight in kilograms. In imperial mode, enter your weight in pounds.',
                    },
                    {
                        '@type': 'HowToStep',
                        position: 4,
                        name: 'Click Calculate BMI',
                        text: 'Press the Calculate BMI button. Your BMI score and category (Underweight, Normal, Overweight, or Obese) will appear instantly.',
                    },
                    {
                        '@type': 'HowToStep',
                        position: 5,
                        name: 'Interpret your result',
                        text: 'Use the BMI chart: below 18.5 is Underweight, 18.5–24.9 is Normal, 25–29.9 is Overweight, 30 or above is Obese.',
                    },
                ],
            }),
        },
    ],
})
</script>

<style scoped>
.bmi-table {
    width: 100%;
    border-collapse: collapse;
    margin: 12px 0 20px;
    font-size: 14px;
}
.bmi-table th,
.bmi-table td {
    padding: 8px 12px;
    text-align: left;
    border: 1.5px solid rgba(10, 10, 10, 0.15);
}
.bmi-table thead th {
    background: #0a0a0a;
    color: #fff;
    font-family: 'Space Mono', monospace;
    font-size: 10px;
    text-transform: uppercase;
    letter-spacing: 0.08em;
}
.bmi-table tbody tr:nth-child(even) {
    background: rgba(10, 10, 10, 0.03);
}
</style>
