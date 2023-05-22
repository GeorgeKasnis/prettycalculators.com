<template>
    <UiBaseContainer>
        <CalculatorsOtherAgeCalc />
        <UiCalcDescription>
            <template v-slot:description>
                <p>An Age Calculator is a tool that allows you to calculate your age based on your date of birth.</p>
                <p>Knowing your age is important for various purposes, such as planning events, tracking milestones, or determining eligibility for certain activities or benefits.</p>
                <p>Simply enter your date of birth, and the Age Calculator will calculate your current age accurately. It takes into account the current date and subtracts your birthdate to provide you with your age in years.</p>
            </template>
            <template v-slot:example>If you were born on January 1, 1990, the calculator will display your current age, such as 32 years.</template>
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
