<template>
    <UiCalcPage title="BMI Calculator" category="fitness" description-title="Your weight relative to height, measured">
        <template #calc>
            <CalculatorsFitnessBmiCalc />
        </template>
        <template #facts>
            <CalcFact label="Formula" value="weight / height²" />
            <CalcFact label="Healthy range" value="18.5 – 24.9" />
            <CalcFact label="Overweight" value="25 – 29.9" />
            <CalcFact label="Obese" value="≥ 30" />
        </template>
        <template #description>
            <p>
                The Body Mass Index (BMI) calculator is a powerful tool that can provide valuable insights into your overall health and body composition. Understanding your BMI is essential for assessing your weight relative to your height. This simple yet effective measurement is widely used by
                healthcare professionals to gauge your health status.
            </p>
            <p>
                The <span class="font-bold">BMI formula</span> is a straightforward equation: it divides your weight in kilograms by your height in meters squared. This results in a numerical value, which falls into one of several categories. These categories offer a quick assessment of your
                weight, serving as a starting point for understanding your health.
            </p>
            <p>Your BMI can be classified into different ranges:</p>
            <ul>
                <li><b>Below 18.5</b> - This category indicates that you are <span class="font-bold">underweight</span>, which may warrant further attention for your nutritional health. Being underweight can lead to various health issues, and it's crucial to address this concern.</li>
                <li><b>18.5 to 24.9</b> - Falling within this range means you have a <span class="font-bold">healthy weight</span>, which is a desirable zone for many individuals. Maintaining a healthy weight can reduce the risk of chronic diseases and promote overall well-being.</li>
                <li><b>25 to 29.9</b> - A BMI in this range suggests that you are <span class="font-bold">overweight</span>, which may signal the need for lifestyle adjustments. Being overweight can increase the risk of health issues, including heart disease and diabetes.</li>
                <li>
                    <b>30 or higher</b> - A BMI of 30 or higher points to <span class="font-bold">obesity</span>. This is a critical indicator where proactive health measures are crucial. Obesity is associated with a higher risk of various health problems, and addressing it is essential for your
                    well-being.
                </li>
            </ul>
            <p>
                While BMI provides a useful estimate of body fat, it's important to note that it may not account for variations in <span class="font-bold">muscle mass</span> and body composition. For example, athletes with high muscle mass may have a higher BMI that does not accurately reflect
                their health status. Therefore, it is advisable to consult with a healthcare professional to interpret your BMI results accurately, especially if you have concerns about your body composition or overall health.
            </p>
            <p>Your BMI is a starting point for assessing your health, but it should be complemented with other measurements and evaluations to get a comprehensive understanding of your well-being.</p>
        </template>
        <template #example>
            <p>Let's walk through an example to understand how to calculate your BMI. Suppose your <span class="font-bold">weight</span> is 70 kilograms, and your <span class="font-bold">height</span> is 1.75 meters.</p>
            <p>To calculate your BMI, you can use the <span class="font-bold">BMI formula</span>: BMI = weight (kg) / height (m)<sup>2</sup>. Plugging in the numbers, it looks like this: BMI = 70 / (1.75)<sup>2</sup>.</p>
            <p>Simplifying the equation further, we arrive at: BMI = 70 / (1.75 * 1.75) = 70 / 3.0625 ≈ 22.9.</p>
            <p>
                In this case, your BMI is approximately 22.86. This numerical value places you in the <span class="font-bold">healthy weight range (18.5 to 24.9)</span>, which is desirable for many individuals. However, it's important to remember that BMI is just one piece of the puzzle, and a
                comprehensive health assessment considers various factors, including your diet, physical activity, and overall well-being.
            </p>
            <p>
                Your BMI is a valuable reference point for understanding your weight relative to your height, but it should not be the sole determinant of your health. It's essential to use it in conjunction with other health metrics and consult with a healthcare professional for a holistic
                evaluation of your well-being.
            </p>
        </template>
    </UiCalcPage>
</template>

<script setup>
definePageMeta({ layout: 'brutalist' })
useCalcSEO(
    "BMI Calculator — Free Body Mass Index Calculator",
    "Free BMI calculator. Enter height and weight to see your BMI score, category (underweight to obese), and healthy weight range. Metric, instant results.",
    [
        { q: "What is a normal BMI?", a: "A normal BMI is between 18.5 and 24.9. Below 18.5 is underweight, 25–29.9 is overweight, and 30 or above is obese." },
        { q: "How is BMI calculated?", a: "BMI = weight (kg) ÷ height (m)². For example, a person weighing 70 kg at 1.75 m has a BMI of 70 ÷ (1.75²) ≈ 22.9." },
        { q: "Is BMI accurate for athletes?", a: "BMI may not be accurate for athletes with high muscle mass, as muscle weighs more than fat. A body fat percentage test gives a more accurate picture." },
        { q: "What BMI is considered obese?", a: "A BMI of 30 or higher is considered obese. A BMI of 40 or above is classified as severely obese." },
    ]
)
</script>
