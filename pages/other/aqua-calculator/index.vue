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
    </UiCalcPage>
</template>

<script setup>
definePageMeta({ layout: 'brutalist' })
useCalcSEO(
    "Daily Water Intake Calculator — How Much Water Per Day",
    "Find out how much water you should drink per day based on your body weight. Free daily water intake calculator — results shown in ml and liters. Instant.",
    [
        { q: "How much water should I drink per day?", a: "A general guideline is 30 ml of water per kilogram of body weight per day. A 70 kg person should aim for about 2.1 liters (2,100 ml) daily." },
        { q: "Does body weight affect how much water you need?", a: "Yes. Heavier people have more body mass to hydrate and generally need more water. Physical activity level, climate, and health conditions also affect daily water needs." },
        { q: "What are signs of dehydration?", a: "Common signs include dark urine, dry mouth, fatigue, headaches, and dizziness. Aim for pale yellow urine as a sign of good hydration." },
        { q: "Can you drink too much water?", a: "Yes, in rare cases excessive water intake can cause hyponatremia (low sodium). For most people, drinking to thirst and following weight-based guidelines is safe." },
    ]
)
</script>
