<template>
    <UiBaseContainer>
        <CalculatorsOtherPizzaCalc />
        <UiCalcDescription>
            <template v-slot:description>
                <p>Create the Perfect Pizza with Precision</p>
                <p>Our Pizza Ingredient Calculator empowers you to craft your ideal pizza with confidence. Tailor your pizza's size, toppings, and servings, and instantly receive an accurate list of ingredients and quantities required.</p>
                <p>Elevate your homemade pizza experience, eliminate waste, and savor every bite. Enjoy the art of pizza making, one slice at a time.</p>
            </template>

            <template v-slot:example>
                <p>For 2 medium italian pizzas you will need :</p>
                <p>Flour : 476 g</p>
                <p>Water : 309 ml</p>
                <p>Salt : 14.4 g</p>
                <p>Dry Yeast : 0.4 g</p>
            </template>
        </UiCalcDescription>
    </UiBaseContainer>
</template>

<script setup>
useHead({
    title: "Pizza Ingredient Calculator - Create Your Perfect Pizza",
    meta: [
        { hid: "title", name: "title", content: "Pizza Ingredient Calculator - Create Your Perfect Pizza" },
        {
            hid: "description",
            name: "description",
            content: "Calculate the ingredients and quantities you need for your perfect pizza with our Pizza Ingredient Calculator. Customize your pizza size, toppings, and number of servings to get precise ingredient lists. Enjoy delicious homemade pizza hassle-free. Try it now!",
        },
        { hid: "og-title", property: "og:title", content: "Pizza Ingredient Calculator - Create Your Perfect Pizza" },
        {
            hid: "og:description",
            property: "og:description",
            content: "Calculate the ingredients and quantities you need for your perfect pizza with our Pizza Ingredient Calculator. Customize your pizza size, toppings, and number of servings to get precise ingredient lists. Enjoy delicious homemade pizza hassle-free. Try it now!",
        },
    ],
});
</script>
