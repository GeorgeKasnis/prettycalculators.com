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
    "Pretty Calculators - Aqua Calculator",
    "Calculate your daily water intake with ease using Pretty Calculators' Aqua Calculator. Our simple tool takes into account your weight, activity level, and climate to provide you with a personalized recommendation for how much water you should drink each day. Stay hydrated and healthy with our easy-to-use water intake calculator. Try it now!"
)
</script>
