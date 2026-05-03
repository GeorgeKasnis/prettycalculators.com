<template>
    <UiCalcPage title="Body Fat Calculator" category="fitness" description-title="Estimate your body fat with body measurements">
        <template #calc>
            <CalculatorsFitnessBodyFatCalc />
        </template>
        <template #facts>
            <CalcFact label="Method" value="U.S. Navy" />
            <CalcFact label="Healthy (male)" value="10 – 20%" />
            <CalcFact label="Healthy (female)" value="18 – 28%" />
        </template>
        <template #description>
            <p>
                A body fat calculator is a tool that can help you estimate your body fat percentage. It works by taking into account your age, gender, height, weight, and measurements of different body parts such as your waist, hips, and neck. There are different methods for calculating body fat
                percentage, including the skinfold method, bioelectrical impedance analysis, and dual-energy x-ray absorptiometry.
            </p>
            <div class="mb-4">
                <div><b>For men:</b></div>
                <ul class="mb-6">
                    <li>Essential fat:<b> 2-5%</b></li>
                    <li>Athletes:<b> 6-13%</b></li>
                    <li>Fitness: <b>14-17%</b></li>
                    <li>Acceptable: <b>18-24%</b></li>
                    <li>Obese: ><b>25%</b></li>
                </ul>
                <div><b>For women:</b></div>
                <ul>
                    <li>Essential fat: <b>10-13%</b></li>
                    <li>Athletes: <b>14-20%</b></li>
                    <li>Fitness: <b>21-24%</b></li>
                    <li>Acceptable:<b> 25-31%</b></li>
                    <li>Obese: ><b>32%</b></li>
                </ul>
            </div>
            <p>
                Keep in mind that body fat percentage is just one indicator of overall health and fitness, and it may not be accurate for everyone. Other factors such as muscle mass, bone density, and hydration levels can also affect your body fat percentage, so it's best to use it as a starting
                point for discussing your health and fitness goals with a healthcare professional or certified fitness trainer.
            </p>
        </template>
        <template #example>
            <p>Let's say you're a 30-year-old woman who weighs 65 kilograms, is 1.65 meters tall, and has a waist circumference of 80 centimeters, a hip circumference of 95 centimeters, and a neck circumference of 30 centimeters.</p>
            <p>To calculate your body fat percentage using the U.S. Navy method, you would use the following formula:</p>
            <p>Body fat percentage = (4.95 x waist circumference) - (4.5 x neck circumference) + (0.98 x height) - 308.17 / weight</p>
            <p>Substituting the values, you get:</p>
            <p>Body fat percentage = (4.95 x 80) - (4.5 x 30) + (0.98 x 165) - 308.17 / 65</p>
            <p>Simplifying, you get: Body fat percentage = 28.5%</p>
            <p>So, your body fat percentage is 28.5%.</p>
        </template>
    </UiCalcPage>
</template>

<script setup>
definePageMeta({ layout: 'brutalist' })
useCalcSEO(
    "Body Fat Calculator — Free Body Fat Percentage Calculator",
    "Free body fat percentage calculator using the Navy formula. Enter neck, waist, and hip measurements to estimate body fat for men and women. Instant results.",
    [
        { q: "What is a healthy body fat percentage for men?", a: "A healthy body fat percentage for men is typically 10–20%. Athletes may be 6–13%, fit individuals 14–17%, and the average range is 18–24%." },
        { q: "What is a healthy body fat percentage for women?", a: "A healthy body fat percentage for women is typically 20–30%. Athletes may be 14–20%, fit individuals 21–24%, and the average range is 25–31%." },
        { q: "How is body fat percentage calculated?", a: "This calculator uses the U.S. Navy formula, which uses neck, waist, and hip circumference (women only) along with height to estimate body fat percentage." },
        { q: "What is the difference between BMI and body fat percentage?", a: "BMI measures weight relative to height and doesn't distinguish fat from muscle. Body fat percentage directly measures how much of your body weight is fat tissue." },
    ]
)
</script>
