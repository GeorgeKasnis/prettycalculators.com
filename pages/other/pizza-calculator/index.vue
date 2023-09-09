<template>
    <UiBaseContainer>
        <CalculatorsOtherPizzaCalc />
        <UiCalcDescription>
            <template v-slot:description>
                <p>Create the <span class="font-bold">Perfect Pizza</span> with Precision</p>
                <p>
                    Unlock the art of pizza making with our Pizza Ingredient Calculator. This exceptional tool empowers you to craft the pizza of your dreams, tailored to your preferences and serving sizes. Say goodbye to guesswork and culinary experiments, and say hello to a
                    <span class="font-bold">perfectly balanced pizza</span> every time.
                </p>
                <p>
                    Whether you're a fan of the classic <span class="font-bold">Neapolitan-style pizza</span> or the hearty <span class="font-bold">American-style pie</span>, our calculator has you covered. It guides you through the process of selecting your pizza's size, toppings, and servings, and
                    then provides an accurate list of ingredients and quantities needed to achieve pizza perfection.
                </p>
                <p>Why settle for store-bought or takeout pizza when you can create a customized masterpiece at home? With our Pizza Ingredient Calculator, you have the freedom to experiment with flavors, cater to dietary preferences, and even host pizza nights with ease.</p>
                <p>Say goodbye to wasted ingredients and hello to a delightful homemade pizza experience. Whether you're a pizza connoisseur or a beginner in the kitchen, our calculator simplifies the pizza-making process, allowing you to savor each slice.</p>
            </template>

            <template v-slot:example>
                <p>For example, if you plan to prepare 2 medium <span class="font-bold">Neapolitan-style pizzas</span>, you'll need the following ingredients:</p>
                <ul>
                    <li><span class="font-bold">Flour</span>: 476 grams</li>
                    <li><span class="font-bold">Water</span>: 309 milliliters</li>
                    <li><span class="font-bold">Salt</span>: 14.4 grams</li>
                    <li><span class="font-bold">Dry Yeast</span>: 0.4 grams</li>
                </ul>
                <p>With our calculator, creating the <span class="font-bold">perfect pizza</span> is a breeze. Enjoy the freedom of pizza customization and relish every bite of your homemade masterpiece.</p>
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
