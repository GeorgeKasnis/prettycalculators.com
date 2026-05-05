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
    "Age Calculator — Calculate Your Exact Age Online",
    "Calculate your exact age in years, months, and days from your date of birth. Free age calculator — accurate, instant, accounts for leap years. No sign-up.",
    [
        { q: "How is age calculated?", a: "Age is calculated by finding the difference between your date of birth and today's date, accounting for whether your birthday has occurred yet in the current year." },
        { q: "Does the age calculator account for leap years?", a: "Yes. The calculator accurately accounts for leap years when calculating your exact age in days." },
        { q: "How many days old am I?", a: "Use the age calculator — it shows your exact age in years, months, and days so you can see precisely how many days old you are." },
    ]
)

useHead({
    script: [{
        type: 'application/ld+json',
        innerHTML: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'HowTo',
            name: 'How to Calculate Your Exact Age',
            description: 'Find your precise age in years, months, and days from your date of birth.',
            step: [
                { '@type': 'HowToStep', position: 1, name: 'Enter your date of birth', text: 'Select or type your birth date using the date picker.' },
                { '@type': 'HowToStep', position: 2, name: 'Click Calculate', text: 'Press calculate to find the difference between your birth date and today.' },
                { '@type': 'HowToStep', position: 3, name: 'Read your result', text: 'Your exact age appears in years, months, and days — accounting for leap years.' },
            ],
        }),
    }],
})
</script>
