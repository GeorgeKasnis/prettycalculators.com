<template>
    <UiBaseContainer>
        <CalculatorsFitnessBmrCalc />
        <UiCalcDescription>
            <template v-slot:description>
                <p>
                    A BMR calculator is a tool that can help you estimate the number of calories your body burns at rest, also known as your basal metabolic rate. It works by taking into account your age, weight, height, and gender. The Harris-Benedict equation is commonly used to calculate BMR for
                    adults.
                </p>
                <p>
                    Keep in mind that BMR is just an estimate of the number of calories your body burns at rest, and it may not be accurate for everyone. Factors such as muscle mass, body composition, and genetics can affect your BMR, so it's best to use it as a starting point for discussing your
                    calorie needs and health with a healthcare professional.
                </p>
            </template>
            <template v-slot:example>
                <p>Let's say you are a 30-year-old female who weighs 65 kilograms and is 1.65 meters tall.</p>
                <p>To calculate your BMR, you would use the following formula: BMR = 655 + (9.6 x weight in kg) + (1.8 x height in cm) - (4.7 x age in years)</p>
                <p>Substituting the values, you get: BMR = 655 + (9.6 x 65) + (1.8 x 165) - (4.7 x 30)</p>
                <p>Simplifying, you get: BMR = 1430</p>
                <p>So, your estimated BMR is 1430 calories per day.</p>
            </template>
        </UiCalcDescription>
    </UiBaseContainer>
</template>

<script setup>
useHead({
    title: "Pretty Calculators - BMR (Basal Metabolic Rate Calculator)",
    meta: [
        { hid: "title", name: "title", content: "Pretty Calculators - BMR (Basal Metabolic Rate Calculator)" },
        {
            hid: "description",
            name: "description",
            content:
                "Find out your Basal Metabolic Rate (BMR) and estimate the number of calories your body burns at rest with Pretty Calculators' beautifully designed BMR calculator. Our easy-to-use tool helps you understand your calorie needs and set realistic health goals. Whether you're looking to lose weight, gain muscle, or maintain your current weight, our BMR calculator is perfect for anyone interested in improving their health. Try it out today on Pretty Calculators)",
        },
        { hid: "og-title", property: "og:title", content: "Pretty Calculators - BMR (Basal Metabolic Rate Calculator)" },
        {
            hid: "og:description",
            property: "og:description",
            content:
                "Find out your Basal Metabolic Rate (BMR) and estimate the number of calories your body burns at rest with Pretty Calculators' beautifully designed BMR calculator. Our easy-to-use tool helps you understand your calorie needs and set realistic health goals. Whether you're looking to lose weight, gain muscle, or maintain your current weight, our BMR calculator is perfect for anyone interested in improving their health. Try it out today on Pretty Calculators",
        },
    ],
});
</script>
