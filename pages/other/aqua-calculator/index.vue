<template>
    <UiBaseContainer>
        <CalculatorsOtherAquaCalc />
        <UiCalcDescription>
            <template v-slot:description>
                <p>A Water Intake Calculator is a tool that allows you to calculate how much water you should be drinking each day based on your weight.</p>
                <p>Proper hydration is essential for maintaining good health, and this calculator can help you determine how much water you need to drink to stay hydrated. The calculator takes your weight in kilograms as input and calculates your recommended daily water intake in liters.</p>
                <p>It's important to note that this is just a general guideline, and other factors like activity level, climate, and health conditions can also affect your daily water needs.</p>
            </template>
            <template v-slot:example>A person who weighs 70 kg should drink approximately 2.1 liters of water per day.</template>
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
