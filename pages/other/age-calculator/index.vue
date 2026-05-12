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
        <template #faq>
            <CalcFaq :faqs="faqs" />
        </template>
    </UiCalcPage>
</template>

<script setup>
definePageMeta({ layout: 'brutalist' })

const faqs = [
    { q: "How is age calculated?", a: "Age is calculated by finding the difference between your date of birth and today's date, accounting for whether your birthday has occurred yet in the current year." },
    { q: "Does the age calculator account for leap years?", a: "Yes. The calculator accurately accounts for leap years when calculating your exact age in days." },
    { q: "How many days old am I?", a: "Use the age calculator — it shows your exact age in years, months, and days so you can see precisely how many days old you are." },
    { q: "What age will I be in 10 years?", a: "Your age in 10 years will be your current age + 10. The exact date depends on your birth date. If you're currently 32 years and 4 months old, in exactly 10 years you'll be 42 years and 4 months. Enter your birthdate above and the calculator shows your current age — just add 10." },
    { q: "How do I calculate someone's age from their birth year?", a: "Subtract their birth year from the current year (2026), then subtract 1 if their birthday hasn't occurred yet this year. Example: born in 1990, birthday already passed → 2026 − 1990 = 36. Birthday not yet passed → 35. The calculator does this precisely to the day." },
    { q: "What is my Chinese zodiac or star sign based on age?", a: "Your star sign (Western astrology) is determined by your birth month and day, not your age. Chinese zodiac repeats every 12 years — enter your birth year to determine it. For example, 1990 is the Year of the Horse; 2000 is the Year of the Dragon. Your age just tells you how many times the cycle has repeated since you were born." },
    { q: "How many weeks old am I?", a: "Multiply your age in days by (1/7). If you're 10,000 days old: 10,000 ÷ 7 ≈ 1,429 weeks. Use the age calculator to find your exact age in days, then divide by 7." },
    { q: "Why does my age calculator show a different result to my ID card?", a: "Official documents record your age as the number of completed years since birth — they don't account for months or days remaining. This is how most legal age calculations work (e.g., for driving, voting, retirement). Our calculator shows your precise age in years, months, and days, so it may look slightly different from a simple 'year subtraction'." },
    { q: "At what date will I turn 18?", a: "Your 18th birthday is exactly 18 years after your date of birth on the same month and day. If you were born 15 March 2010, your 18th birthday is 15 March 2028. Use this calculator to find how many days remain until that date." },
    { q: "How do retirement age rules use date-of-birth calculations?", a: "Most countries calculate retirement eligibility based on exact date of birth, not just birth year. The UK state pension age is currently 66 for both men and women, rising to 67 by 2028. You reach pension age on your 66th birthday specifically — to the day — so an exact age calculator is the right tool to determine your pension eligibility date." },
]

useCalcSEO(
    "Age Calculator — Calculate Your Exact Age Online",
    "Calculate your exact age in years, months, and days from your date of birth. Free age calculator — accurate, instant, accounts for leap years. No sign-up.",
    faqs
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
