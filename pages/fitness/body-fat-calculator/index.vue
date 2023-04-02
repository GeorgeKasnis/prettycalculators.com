<template>
    <UiBaseContainer>
        <CalculatorsFitnessBodyFatCalc />
        <UiCalcDescription>
            <template v-slot:description>
                <p>
                    A body fat calculator is a tool that can help you estimate your body fat percentage. It works by taking into account your age, gender, height, weight, and measurements of different body parts such as your waist, hips, and neck. There are different methods for calculating body fat
                    percentage, including the skinfold method, bioelectrical impedance analysis, and dual-energy x-ray absorptiometry.
                </p>
                <div class="mb-small">
                    <div><b>For men:</b></div>
                    <ul class="mb-big">
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
                Keep in mind that body fat percentage is just one indicator of overall health and fitness, and it may not be accurate for everyone. Other factors such as muscle mass, bone density, and hydration levels can also affect your body fat percentage, so it's best to use it as a starting
                point for discussing your health and fitness goals with a healthcare professional or certified fitness trainer.
            </template>
            <template v-slot:example>
                <p>Let's say you're a 30-year-old woman who weighs 65 kilograms, is 1.65 meters tall, and has a waist circumference of 80 centimeters, a hip circumference of 95 centimeters, and a neck circumference of 30 centimeters.</p>
                <p>To calculate your body fat percentage using the U.S. Navy method, you would use the following formula:</p>
                <p>Body fat percentage = (4.95 x waist circumference) - (4.5 x neck circumference) + (0.98 x height) - 308.17 / weight</p>
                <p>Substituting the values, you get:</p>
                <p>Body fat percentage = (4.95 x 80) - (4.5 x 30) + (0.98 x 165) - 308.17 / 65</p>
                <p>Simplifying, you get: Body fat percentage = 28.5%</p>
                <p>So, your body fat percentage is 28.5%.</p>
            </template>
        </UiCalcDescription>
    </UiBaseContainer>
</template>

<script setup>
useHead({
    title: "Pretty Calculators - Body Fat Calculator",
    meta: [
        { hid: "title", name: "title", content: "Pretty Calculators - Body Fat Calculator" },
        { hid: "description", name: "description", content: "Pretty Calculators - Body Fat Calculator" },
        { hid: "og-title", property: "og:title", content: "Pretty Calculators - Body Fat Calculator" },
        { hid: "og:description", property: "og:description", content: "Pretty Calculators - Body Fat Calculator" },
    ],
});
</script>
