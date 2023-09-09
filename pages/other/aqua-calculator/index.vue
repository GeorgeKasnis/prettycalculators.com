<template>
    <UiBaseContainer>
        <CalculatorsOtherAquaCalc />
        <UiCalcDescription>
            <template v-slot:description>
                <p>Discover the importance of proper hydration with our Water Intake Calculator. This invaluable tool empowers you to determine your daily water consumption requirements based on your weight, contributing to your overall health and well-being.</p>
                <p>Hydration is a cornerstone of good health, and our calculator simplifies the process of establishing your daily water intake goal. By inputting your weight in kilograms, the calculator swiftly calculates your recommended daily water consumption in liters.</p>
                <p>It's crucial to remember that this calculation serves as a general guideline. Your individual hydration needs may vary based on factors such as activity level, climate, and health conditions.</p>
                <p>Proper hydration is essential for various bodily functions, including regulating body temperature, supporting digestion, and maintaining healthy skin. It also aids in cognitive performance and overall well-being.</p>
                <p>By using our Water Intake Calculator, you can take a proactive step toward staying adequately hydrated and optimizing your health.</p>
            </template>
            <template v-slot:example>For instance, a person with a weight of 70 kg should aim to consume approximately 2.1 liters of water per day to meet their hydration needs.</template>
        </UiCalcDescription>
    </UiBaseContainer>
</template>

<script setup>
useHead({
    title: "Pretty Calculators - Aqua Calculator",
    meta: [
        { hid: "title", name: "title", content: "Pretty Calculators - Aqua Calculator" },
        {
            hid: "description",
            name: "description",
            content:
                "Calculate your daily water intake with ease using Pretty Calculators' Aqua Calculator. Our simple tool takes into account your weight, activity level, and climate to provide you with a personalized recommendation for how much water you should drink each day. Stay hydrated and healthy with our easy-to-use water intake calculator. Try it now!s",
        },
        { hid: "og-title", property: "og:title", content: "Pretty Calculators - Aqua Calculator" },
        {
            hid: "og:description",
            property: "og:description",
            content:
                "Calculate your daily water intake with ease using Pretty Calculators' Aqua Calculator. Our simple tool takes into account your weight, activity level, and climate to provide you with a personalized recommendation for how much water you should drink each day. Stay hydrated and healthy with our easy-to-use water intake calculator. Try it now!s",
        },
    ],
});
</script>
