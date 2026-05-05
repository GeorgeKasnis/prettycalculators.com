<template>
    <UiCalcPage title="Pizza Calculator" category="other" description-title="Master the perfect pizza dough every time">
        <template #calc>
            <CalculatorsOtherPizzaCalc />
        </template>
        <template #facts>
            <CalcFact label="Flour ratio" value="~59.5%" unit="of dough weight" />
            <CalcFact label="Hydration (Italian)" value="60 – 70%" />
            <CalcFact label="Salt" value="~1.8%" />
        </template>
        <template #description>
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
        <template #example>
            <p>For example, if you plan to prepare 2 medium <span class="font-bold">Neapolitan-style pizzas</span>, you'll need the following ingredients:</p>
            <ul>
                <li><span class="font-bold">Flour</span>: 476 grams</li>
                <li><span class="font-bold">Water</span>: 309 milliliters</li>
                <li><span class="font-bold">Salt</span>: 14.4 grams</li>
                <li><span class="font-bold">Dry Yeast</span>: 0.4 grams</li>
            </ul>
            <p>With our calculator, creating the <span class="font-bold">perfect pizza</span> is a breeze. Enjoy the freedom of pizza customization and relish every bite of your homemade masterpiece.</p>
        </template>
    </UiCalcPage>
</template>

<script setup>
definePageMeta({ layout: 'brutalist' })
useCalcSEO(
    "Pizza Calculator — How Many Pizzas Should I Order?",
    "Calculate how many pizzas to order for your group. Enter the number of guests and appetite level — get the exact number of pizzas and slices. Free & instant.",
    [
        { q: "How many pizzas should I order for 10 people?", a: "For 10 people with average appetite, order about 4 large pizzas, assuming 2–3 slices per person." },
        { q: "How many slices are in a pizza?", a: "A large pizza typically has 8 slices, a medium has 6–8 slices, and a small has 6 slices." },
        { q: "How many slices of pizza per person?", a: "The average person eats 2–3 slices. For hungry adults or a main meal, plan for 3 slices each." },
        { q: "How many pizzas for 20 people?", a: "For 20 people with average appetite, order about 7–8 large pizzas (3 slices × 20 people ÷ 8 slices per pizza)." },
    ]
)

useHead({
    script: [{
        type: 'application/ld+json',
        innerHTML: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'HowTo',
            name: 'How to Calculate How Many Pizzas to Order',
            description: 'Find the right number of pizzas for your group size and appetite.',
            step: [
                { '@type': 'HowToStep', position: 1, name: 'Enter the number of people', text: 'Type how many guests you are ordering for.' },
                { '@type': 'HowToStep', position: 2, name: 'Select appetite level', text: 'Choose light, medium, or hungry to reflect how much your guests are likely to eat.' },
                { '@type': 'HowToStep', position: 3, name: 'Click Calculate', text: 'The recommended number of pizzas and total slices appears instantly.' },
            ],
        }),
    }],
})
</script>
