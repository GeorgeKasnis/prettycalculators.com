<template>
    <UiCategoryContainer>
        <template v-slot:main>
            <CategoryCardsFitness :hasH1="true" class="mb-big" />

            <p>
                Looking to elevate your fitness journey and achieve your health and wellness goals? Look no further! Our comprehensive suite of fitness calculator tools is here to support you every step of the way. Whether you're eager to monitor your progress, establish ambitious new targets, or
                gain insight into your nutritional needs, our calculators deliver precise and dependable results.
            </p>

            <p>
                <nuxt-link to="/fitness/bmi-calculator" class="font-bold">BMI Calculator</nuxt-link>: Calculate your Body Mass Index (BMI), a crucial indicator of body fat based on your height and weight. Understanding your BMI is fundamental to assessing your overall health and can serve as a
                starting point for your fitness journey.
            </p>

            <p>
                <nuxt-link to="/fitness/body-fat-calculator" class="font-bold">Body Fat Calculator</nuxt-link>: Our Body Fat Calculator takes into account your age, gender, height, and weight to determine your body fat percentage. This metric is a vital measure of your overall health and fitness
                progress, helping you tailor your workouts and nutrition plans effectively.
            </p>

            <p>
                <nuxt-link to="/fitness/bmr-calculator" class="font-bold">BMR Calculator</nuxt-link>: Discover your Basal Metabolic Rate (BMR), which reveals the number of calories your body requires at rest. Knowing your BMR is essential for creating a personalized calorie intake plan that supports
                your fitness goals, whether it's losing weight, maintaining, or bulking up.
            </p>

            <p>
                Our user-friendly calculators are completely free and accessible from any device with an internet connection. Start using our fitness calculator tools today to embark on your fitness journey with confidence and purpose. Take the first step towards achieving your fitness goals and
                enhancing your overall well-being. With our powerful and easy-to-use fitness calculators, success is within your reach!
            </p>

            <p>Boost your fitness website's visibility and reach by incorporating these essential keywords and SEO-rich content into your description. This will help your page rank higher in search engine results, making it more accessible to users seeking fitness and health-related information.</p>
        </template>
        <template v-slot:recommended>
            <CategoryCardsMath class="mb-big" />
            <adsbygoogle class="mb-big" ad-slot="1026555560" ad-format="fluid" ad-style="display:block !important; text-align:center !important; width:300px !important; margin-left:auto;margin-right:auto;" ad-layout="in-article" />
            <CategoryCardsUnit class="mb-big" />
            <adsbygoogle class="mb-big" ad-slot="1914672383" ad-format="auto" ad-style="display:block !important; text-align:center !important; width:300px !important; margin-left:auto;margin-right:auto;" ad-layout="in-article" />
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
