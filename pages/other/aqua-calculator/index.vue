<template>
    <UiCalcPage title="Aqua Calculator" category="other" description-title="Discover the vital importance of proper hydration">
        <template #calc>
            <CalculatorsOtherAquaCalc />
        </template>
        <template #facts>
            <CalcFact label="Daily guideline" value="30" unit="ml / kg" />
            <CalcFact label="Typical adult" value="2 – 3" unit="L / day" />
            <CalcFact label="Influenced by" value="Activity, climate, health" />
        </template>
        <template #description>
            <p>Discover the Vital Importance of Proper Hydration</p>
            <p>Our Water Intake Calculator is your trusty companion on the journey to optimal health and well-being. This invaluable tool empowers you to determine your daily water consumption requirements, a fundamental element in maintaining your body's vitality and function.</p>
            <p>
                Hydration is the cornerstone of good health, playing a role in virtually every bodily function. It helps regulate body temperature, supports digestion, maintains healthy skin, and enhances cognitive performance. Proper hydration is not a luxury; it's a necessity for a vibrant and
                energetic life.
            </p>
            <p>
                Our calculator simplifies the process of establishing your daily water intake goal. By inputting your weight in kilograms, it swiftly calculates your recommended daily water consumption in liters. It serves as a helpful guideline, but remember, individual hydration needs can vary
                based on several factors.
            </p>
            <p>
                Factors influencing your hydration requirements include your activity level, climate, and underlying health conditions. Hot and humid weather, strenuous physical activity, or certain medical conditions may necessitate increased fluid intake. Our calculator offers a starting point
                for your hydration journey, but staying in tune with your body's signals is equally crucial.
            </p>
        </template>
        <template #example>
            <p>For instance, a person with a weight of 70 kg should aim to consume approximately 2.1 liters of water per day to meet their hydration needs.</p>
        </template>
        <template #faq>
            <CalcFaq :faqs="faqs" />
        </template>
    </UiCalcPage>
</template>

<script setup>
definePageMeta({ layout: 'brutalist' })

const faqs = [
    { q: "How much water should I drink per day?", a: "A general guideline is 30 ml of water per kilogram of body weight per day. A 70 kg person should aim for about 2.1 liters (2,100 ml) daily." },
    { q: "Does body weight affect how much water you need?", a: "Yes. Heavier people have more body mass to hydrate and generally need more water. Physical activity level, climate, and health conditions also affect daily water needs." },
    { q: "What are signs of dehydration?", a: "Common signs include dark urine, dry mouth, fatigue, headaches, and dizziness. Aim for pale yellow urine as a sign of good hydration." },
    { q: "Can you drink too much water?", a: "Yes, in rare cases excessive water intake can cause hyponatremia (low sodium). For most people, drinking to thirst and following weight-based guidelines is safe." },
    { q: "How much water should I drink if I exercise?", a: "Add approximately 500 ml (about 17 oz) per 30 minutes of exercise to your baseline daily intake. For intense workouts in heat, losses can exceed 1 litre per hour through sweat. Weigh yourself before and after exercise: every 1 kg lost = approximately 1 litre of fluid to replace." },
    { q: "Does coffee and tea count toward daily water intake?", a: "Yes. Caffeinated drinks like coffee and tea do contribute to hydration despite their mild diuretic effect — studies show their net hydration contribution is positive, not negative. Roughly 80% of your daily fluid intake can come from all beverages combined (water, tea, coffee, juice); food provides the remaining 20%." },
    { q: "How much water should I drink to lose weight?", a: "Drinking 500 ml of water before meals has been shown in studies to reduce calorie intake by 13–20% at that meal. There is no magic number, but staying well hydrated supports metabolism, reduces false-hunger signals, and improves exercise performance. Use the 30 ml/kg guideline as a minimum and increase if exercising." },
    { q: "Is 2 litres of water a day enough?", a: "For a 65–70 kg person with average activity, 2 litres/day is approximately sufficient (meets the 30 ml/kg guideline). For heavier individuals (80+ kg), 2 litres is below the guideline. For people exercising heavily or in hot climates, 3+ litres is more appropriate. Enter your weight above for a personalised answer." },
    { q: "What is the best time of day to drink water?", a: "Spreading water intake throughout the day is more effective than drinking large amounts at once. Key moments: 500 ml upon waking (to rehydrate after sleep), water before meals (aids satiety), and small amounts during and after exercise. Drinking heavily right before bed can disrupt sleep with night-time trips to the bathroom." },
]

useCalcSEO(
    "Daily Water Intake Calculator — How Much Water Per Day",
    "Find out how much water you should drink per day based on your body weight. Free daily water intake calculator — results shown in ml and liters. Instant.",
    faqs
)

useHead({
    script: [{
        type: 'application/ld+json',
        innerHTML: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'HowTo',
            name: 'How to Calculate Your Daily Water Intake',
            description: 'Find how much water you should drink per day based on body weight.',
            step: [
                { '@type': 'HowToStep', position: 1, name: 'Enter your body weight', text: 'Type your weight in kilograms into the input field.' },
                { '@type': 'HowToStep', position: 2, name: 'Click Calculate', text: 'Press calculate to apply the 30 ml/kg guideline to your weight.' },
                { '@type': 'HowToStep', position: 3, name: 'Read your daily water target', text: 'Your recommended daily water intake appears in both millilitres and litres.' },
            ],
        }),
    }],
})
</script>
