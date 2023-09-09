<template>
    <UiBaseContainer>
        <CalculatorsOtherAgeCalc />
        <UiCalcDescription>
            <template v-slot:description>
                <p>Calculate your age effortlessly with our Age Calculator. This handy tool is designed to determine your precise age based on your date of birth.</p>
                <p>Knowing your age is crucial for a variety of purposes, whether you're planning milestone celebrations, ensuring eligibility for certain activities or benefits, or simply keeping track of your life journey.</p>
                <p>Using our Age Calculator is a breeze. All you need to do is enter your date of birth, and the calculator will do the rest. It considers the current date and subtracts your birthdate to provide you with your age in years, ensuring an accurate and up-to-date result.</p>
                <p>For example, if you were born on January 1, 1990, our calculator will display your current age, such as 32 years, enabling you to effortlessly keep track of your life's milestones.</p>
                <p>Whether you're planning a birthday celebration, confirming eligibility for an event, or simply satisfying your curiosity, our Age Calculator is a reliable tool to determine your age with ease.</p>
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
