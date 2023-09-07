<template>
    <div class="h-full flex flex-col">
        <h1 class="text-small font-bold mb-small">Pretty Calculators - Find the calculator you need</h1>
        <div class="w-full h-full grid grid-cols-1 lg:grid-cols-4 gap-big flex-1">
            <CategoryCardsFitness />
            <CategoryCardsMath />
            <CategoryCardsUnit />
            <CategoryCardsOther />
        </div>
        <p class="border-b brutalist-shadow p-big mt-big">
            Welcome to Pretty Calculators, your gateway to a world of versatile and user-friendly tools. Dive into our extensive collection, offering tools for tracking your health with our
            <nuxt-link to="/fitness/bmi-calculator" aria-label="BMI Calculator" class="font-bold">BMI calculator</nuxt-link>, ensuring pixel-perfect web design with the <nuxt-link to="/other/px-to-rem-calculator" aria-label="PX to REM Calculator" class="font-bold">PX to REM calculator</nuxt-link>,
            creating the perfect pizza night with our <nuxt-link to="/other/pizza-calculator" aria-label="Pizza Calculator" class="font-bold">Pizza calculator</nuxt-link>, estimating your Basal Metabolic Rate (BMR) with our
            <nuxt-link to="/fitness/bmr-calculator" aria-label="BMR Calculator" class="font-bold">BMR calculator</nuxt-link>, and even calculating ages effortlessly with our <nuxt-link to="/other/age-calculator" aria-label="Age Calculator" class="font-bold">Age calculator</nuxt-link>. Our
            meticulously crafted calculators are designed to simplify your daily challenges. Whether you're optimizing your fitness routines, web design projects, culinary adventures, or managing your health and age-related calculations, our calculators are your trusted companions. Whether you're a
            dedicated student seeking academic excellence, a seasoned professional streamlining your work processes, or an enthusiastic learner exploring new horizons, our carefully curated selection of calculators will redefine the way you approach tasks. Embrace the future of productivity and
            precision with Pretty Calculators. Begin your journey today and experience firsthand how our calculators can revolutionize your work, enhance your learning, and ultimately make your life not just easier, but truly extraordinary.
        </p>
    </div>
</template>

<script setup>
useHead({
    title: "Pretty Calculators",
    meta: [
        { hid: "title", name: "title", content: "Pretty Calculators - Powerful and Easy-to-Use Tools for Fitness, Math, and Conversions" },
        {
            hid: "description",
            name: "description",
            content:
                "Discover a collection of beautifully designed calculators for all your everyday needs on Pretty Calculators. From fitness and health to math and conversions, our easy-to-use calculators are perfect for anyone looking to simplify their calculations. Browse our selection today and see how Pretty Calculators can help make your life easier",
        },
        { hid: "og-title", property: "og:title", content: "Pretty Calculators - Powerful and Easy-to-Use Tools for Fitness, Math, and Conversions" },
        {
            hid: "og:description",
            property: "og:description",
            content:
                "Discover a collection of beautifully designed calculators for all your everyday needs on Pretty Calculators. From fitness and health to math and conversions, our easy-to-use calculators are perfect for anyone looking to simplify their calculations. Browse our selection today and see how Pretty Calculators can help make your life easier",
        },
    ],
});
</script>
