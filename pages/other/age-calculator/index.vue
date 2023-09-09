<template>
    <UiBaseContainer>
        <CalculatorsOtherAgeCalc />
        <UiCalcDescription>
            <template v-slot:description>
                <p>Effortlessly Calculate Your Age with Precision</p>
                <p>Our Age Calculator simplifies the task of determining your exact age based on your date of birth. This handy tool serves a multitude of purposes, from planning milestone celebrations to verifying eligibility for specific activities or benefits.</p>
                <p>
                    Using our Age Calculator couldn't be easier. Just input your date of birth, and let the calculator handle the rest. It takes into account the current date and subtracts your birthdate to deliver your precise age in years. Say goodbye to manual age calculations and hello to
                    accuracy and convenience.
                </p>
                <p>Consider this scenario: you were born on January 1, 1990. With our calculator, you'll instantly discover that your current age is 32 years. It's the perfect tool for effortlessly tracking your life's journey and milestones.</p>
                <p>
                    But our Age Calculator is more than just a tool for party planning or curiosity. Age plays a significant role in various aspects of life, including health, education, and social opportunities. It helps determine when you can vote, retire, or qualify for certain discounts or
                    benefits. Knowing your age with precision is essential for making informed decisions.
                </p>
                <p>Whether you're planning a birthday celebration, confirming eligibility for an event, or satisfying your curiosity about your age, our Age Calculator is a reliable and efficient tool at your disposal. Say hello to accurate age determination and goodbye to guesswork.</p>
                <p>Make age calculations a thing of the past and embrace the ease and precision of our Age Calculator. Celebrate your milestones with confidence, knowing your age is calculated with accuracy.</p>
            </template>
        </UiCalcDescription>
    </UiBaseContainer>
</template>

<script setup>
useHead({
    title: "Pretty Calculators - Age Calculator",
    meta: [
        { hid: "title", name: "title", content: "Pretty Calculators - Age Calculator" },
        {
            hid: "description",
            name: "description",
            content:
                "Calculate your age accurately using Pretty Calculators' Age Calculator. Our simple tool takes your date of birth and calculates your current age based on the current date. It's useful for various purposes, such as planning events or determining eligibility for certain activities or benefits. Try it now!",
        },
        { hid: "og-title", property: "og:title", content: "Pretty Calculators - Age Calculator" },
        {
            hid: "og:description",
            property: "og:description",
            content:
                "Calculate your age accurately using Pretty Calculators' Age Calculator. Our simple tool takes your date of birth and calculates your current age based on the current date. It's useful for various purposes, such as planning events or determining eligibility for certain activities or benefits. Try it now!",
        },
    ],
});
</script>
