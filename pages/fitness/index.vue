<template>
    <UiCategoryContainer>
        <template v-slot:main>
            <CategoryCardsFitness :hasH1="true" class="mb-big" />
            <p>
                Looking to take your fitness routine to the next level? Our fitness calculator tools can help you achieve your goals! Whether you're looking to track your progress, set new goals, or determine the number of calories you need to consume, our calculators can provide you with accurate
                and reliable results. Our BMI calculator can help you determine your body mass index, which is a measure of body fat based on your height and weight. Our body fat calculator uses your age, gender, height, and weight to determine your body fat percentage, which can be an important
                indicator of overall health. In addition, our calorie counter can help you track the number of calories you consume each day, while our heart rate monitor can help you optimize your workouts. Our calculators are easy to use, free, and accessible from anywhere. Start using our fitness
                calculator tools today and take the first step towards achieving your fitness goals!
            </p>
        </template>
        <template v-slot:recommended>
            <CategoryCardsMath class="mb-big" />
            <adsbygoogle />
            <CategoryCardsUnit class="mb-big" />
            <CategoryCardsOther class="mb-big" />
        </template>
    </UiCategoryContainer>
</template>

<script setup>
useHead({
    title: "Pretty Calculators - Fitness",
    meta: [
        { hid: "title", name: "title", content: "Pretty Calculators - Fitness" },
        {
            hid: "description",
            name: "description",
            content:
                "Achieve your fitness goals with ease using Pretty Calculators' collection of beautifully designed fitness calculators. From tracking your calorie intake to determining your BMI and ideal weight, our tools are perfect for anyone looking to improve their health and wellness. Browse our selection of easy-to-use fitness calculators today and start your journey to a healthier you",
        },
        { hid: "og-title", property: "og:title", content: "Pretty Calculators - Fitness" },
        {
            hid: "og:description",
            property: "og:description",
            content:
                "Achieve your fitness goals with ease using Pretty Calculators' collection of beautifully designed fitness calculators. From tracking your calorie intake to determining your BMI and ideal weight, our tools are perfect for anyone looking to improve their health and wellness. Browse our selection of easy-to-use fitness calculators today and start your journey to a healthier you",
        },
    ],
});
</script>
