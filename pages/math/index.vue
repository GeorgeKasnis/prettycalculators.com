<template>
    <UiCategoryContainer>
        <template v-slot:main>
            <CategoryCardsMath :hasH1="true" class="mb-big" />
            <p>
                Are you ready to simplify your mathematical challenges and computations? Look no further! Our math calculator page offers a diverse range of mathematical tools to help you conquer complex problems with ease. Two of our standout calculators are the Percentage Calculator and Manhattan
                Distance Calculator, designed to provide you with accurate solutions to common mathematical hurdles.
            </p>

            <p>
                <nuxt-link to="/math/percentage-calculator" class="font-bold">Percentage Calculator</nuxt-link>: Mastering percentages is a breeze with our versatile Percentage Calculator. Whether you need to calculate discounts, markups, tax amounts, or determine the ratio of one quantity to
                another, our tool simplifies the process. Say goodbye to manual percentage calculations; let our calculator handle it for you!
            </p>

            <p>
                <nuxt-link to="/math/manhattan-distance-calculator" class="font-bold">Manhattan Distance Calculator</nuxt-link>: If you're grappling with spatial problems in a city grid, our Manhattan Distance Calculator is your go-to solution. Simplify distance calculations for route planning,
                logistics, and more. Whether you're navigating city streets or designing efficient transportation routes, this calculator streamlines the process, saving you time and effort.
            </p>

            <p>
                Our user-friendly calculators are entirely free and accessible from any device with an internet connection. Whether you're a student, a professional, or anyone who encounters mathematical challenges, our math calculator tools are designed to empower you. Start using our math
                calculators today to tackle math-related tasks with confidence and precision. Taking the first step toward mathematical proficiency is now easier than ever. With our powerful and easy-to-use math calculators, success is just a click away!
            </p>

            <p>
                Don't let mathematical complexities hold you back. Whether you're calculating percentages for financial planning or determining Manhattan distances for logistical efficiency, our calculators are your trusty companions. Join countless users who have harnessed the power of our math
                tools to streamline their work and studies. With our comprehensive suite of mathematical calculators, we're here to help you excel in your math-related endeavors.
            </p>
        </template>
        <template v-slot:recommended>
            <CategoryCardsFitness class="mb-big" />
            <CategoryCardsUnit class="mb-big" />
            <CategoryCardsOther class="mb-big" />
        </template>
    </UiCategoryContainer>
</template>

<script setup>
useHead({
    title: "Pretty Calculators - Math",
    meta: [
        { hid: "title", name: "title", content: "Pretty Calculators - Math" },
        {
            hid: "description",
            name: "description",
            content:
                "Simplify your math calculations with Pretty Calculators' collection of beautifully designed math calculators. From basic arithmetic to complex equations, our tools are perfect for students, teachers, and anyone who needs to perform calculations quickly and accurately. Whether you're studying for exams or just need help with everyday math, our math calculators are the perfect solution. Browse our selection today and see how Pretty Calculators can make your life easier.",
        },
        { hid: "og-title", property: "og:title", content: "Pretty Calculators - Math" },
        {
            hid: "og:description",
            property: "og:description",
            content:
                "Simplify your math calculations with Pretty Calculators' collection of beautifully designed math calculators. From basic arithmetic to complex equations, our tools are perfect for students, teachers, and anyone who needs to perform calculations quickly and accurately. Whether you're studying for exams or just need help with everyday math, our math calculators are the perfect solution. Browse our selection today and see how Pretty Calculators can make your life easier.",
        },
    ],
});
</script>
