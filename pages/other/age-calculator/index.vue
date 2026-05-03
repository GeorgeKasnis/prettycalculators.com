<template>
    <UiCalcPage title="Age Calculator" category="other" description-title="Your exact age in years, months, and days">
        <template #calc>
            <CalculatorsOtherAgeCalc />
        </template>
        <template #facts>
            <CalcFact label="Output" value="Years, months, days" />
            <CalcFact label="Calendar" value="Gregorian" />
            <CalcFact label="Precision" value="Exact to the day" />
        </template>
        <template #description>
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
        </template>
    </UiCalcPage>
</template>

<script setup>
definePageMeta({ layout: 'brutalist' })
useCalcSEO(
    "Pretty Calculators - Age Calculator",
    "Calculate your age accurately using Pretty Calculators' Age Calculator. Our simple tool takes your date of birth and calculates your current age based on the current date. It's useful for various purposes, such as planning events or determining eligibility for certain activities or benefits. Try it now!"
)
</script>
