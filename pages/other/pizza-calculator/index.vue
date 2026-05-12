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
        <template #faq>
            <CalcFaq :faqs="faqs" />
        </template>
    </UiCalcPage>
</template>

<script setup>
definePageMeta({ layout: 'brutalist' })

const faqs = [
    { q: "How many pizzas should I order for 10 people?", a: "For 10 people with average appetite, order about 4 large pizzas, assuming 2–3 slices per person." },
    { q: "How many slices are in a pizza?", a: "A large pizza typically has 8 slices, a medium has 6–8 slices, and a small has 6 slices." },
    { q: "How many slices of pizza per person?", a: "The average person eats 2–3 slices. For hungry adults or a main meal, plan for 3 slices each." },
    { q: "How many pizzas for 20 people?", a: "For 20 people with average appetite, order about 7–8 large pizzas (3 slices × 20 people ÷ 8 slices per pizza)." },
    { q: "How many pizzas do I need for a kids' party of 15?", a: "Children eat less than adults — plan for about 1.5–2 slices each. For 15 kids, 4 large pizzas (32 slices) gives each child about 2 slices with a couple to spare. If it's a mixed adult-and-child party, adjust accordingly using the calculator." },
    { q: "How many pizzas for 50 people?", a: "For 50 adults with average appetite (2.5 slices each = 125 slices total): 125 ÷ 8 slices per large pizza ≈ 16 large pizzas. Round up to 17 to be safe. For lighter eaters at a buffet with other food, 12–14 pizzas may suffice." },
    { q: "How many pizzas should I order if pizza is the only food?", a: "If pizza is the main and only food, increase your estimate to 3 slices per person for adults. Use the hungry/ravenous setting in the calculator. For a party with no sides, add 1 extra pizza per 8 people as a buffer." },
    { q: "How many pizzas for 4 people for a casual dinner?", a: "For 4 adults eating pizza as a meal, 2 large pizzas (16 slices, 4 slices each) is comfortable. If appetites vary or you want leftovers, order 2 large or 3 medium. As a rule: one large pizza comfortably feeds 2 adults at a main meal." },
    { q: "Is it better to order large or medium pizzas for groups?", a: "Large pizzas are almost always better value per slice than medium. A large pizza typically costs 20–30% more than a medium but delivers 30–50% more pizza. When feeding groups, ordering fewer large pizzas costs less and means fewer deliveries or pickups." },
    { q: "How much pizza dough do I need per pizza?", a: "For a 12-inch (30cm) Neapolitan pizza, use approximately 250–280g of dough. For a 14-inch American-style pizza, 320–360g. As a rule: 1g of dough per cm² of pizza surface is a good starting point for medium-thickness crust." },
]

useCalcSEO(
    "Pizza Calculator — How Many Pizzas Should I Order?",
    "Calculate how many pizzas to order for your group. Enter the number of guests and appetite level — get the exact number of pizzas and slices. Free & instant.",
    faqs
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
