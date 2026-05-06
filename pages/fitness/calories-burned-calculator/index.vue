<template>
    <UiCalcPage title="Calories Burned Calculator" category="fitness" description-title="How many calories does your workout actually burn?">
        <template #calc>
            <CalculatorsFitnessCaloriesBurnedCalc />
        </template>
        <template #facts>
            <CalcFact label="Running 30 min (70kg)" value="~280 kcal" />
            <CalcFact label="Walking 60 min (70kg)" value="~245 kcal" />
            <CalcFact label="Cycling 45 min (70kg)" value="~378 kcal" />
            <CalcFact label="Formula"                value="MET × kg × hrs" />
        </template>
        <template #description>
            <p>
                The <strong>calories burned calculator</strong> estimates how many kilocalories you burn during exercise using the scientifically validated <strong>MET (Metabolic Equivalent of Task)</strong> formula. Select your activity, enter your body weight and workout duration, and get an accurate calorie burn estimate — along with a comparison across 8 other activities for the same effort.
            </p>

            <h3>How the MET formula works</h3>
            <p>
                MET is a measure of exercise intensity relative to sitting at rest (1 MET = ~1 kcal per kg per hour). The formula is:
            </p>
            <p><strong>Calories = MET × weight (kg) × time (hours)</strong></p>
            <p>
                For example, running at a moderate pace (MET 8.0) for 30 minutes at 70 kg: <strong>8.0 × 70 × 0.5 = 280 kcal</strong>. A heavier person burns more calories doing the same activity at the same intensity because their body requires more energy to move.
            </p>

            <h3>Calories burned by activity — comparison at 70 kg / 30 minutes</h3>
            <table class="burn-ref-table">
                <thead>
                    <tr><th>Activity</th><th>MET</th><th>Calories (30 min)</th></tr>
                </thead>
                <tbody>
                    <tr><td>Jump rope</td>              <td>11.0</td><td>385 kcal</td></tr>
                    <tr><td>Running (10 km/h)</td>      <td>9.8</td> <td>343 kcal</td></tr>
                    <tr><td>Swimming (vigorous)</td>    <td>9.8</td> <td>343 kcal</td></tr>
                    <tr><td>Running (8 km/h)</td>       <td>8.0</td> <td>280 kcal</td></tr>
                    <tr><td>Cycling (vigorous)</td>     <td>8.0</td> <td>280 kcal</td></tr>
                    <tr><td>HIIT</td>                   <td>8.0</td> <td>280 kcal</td></tr>
                    <tr><td>Rowing (moderate)</td>      <td>7.0</td> <td>245 kcal</td></tr>
                    <tr><td>Soccer</td>                 <td>7.0</td> <td>245 kcal</td></tr>
                    <tr><td>Cycling (moderate)</td>     <td>6.0</td> <td>210 kcal</td></tr>
                    <tr><td>Swimming (leisure)</td>     <td>5.8</td> <td>203 kcal</td></tr>
                    <tr><td>Hiking</td>                 <td>5.3</td> <td>186 kcal</td></tr>
                    <tr><td>Elliptical</td>             <td>5.0</td> <td>175 kcal</td></tr>
                    <tr><td>Walking (brisk)</td>        <td>4.3</td> <td>151 kcal</td></tr>
                    <tr><td>Weight training</td>        <td>3.5</td> <td>123 kcal</td></tr>
                    <tr><td>Walking (moderate)</td>     <td>3.5</td> <td>123 kcal</td></tr>
                    <tr><td>Yoga</td>                   <td>2.5</td> <td>88 kcal</td></tr>
                </tbody>
            </table>

            <h3>Why body weight matters</h3>
            <p>
                Calories burned scale directly with body weight — a 90 kg person burns roughly 29% more calories than a 70 kg person doing the exact same workout. This is why calorie estimates on gym machines (which don't know your weight) are often significantly wrong.
            </p>

            <h3>Calories burned vs. calories eaten</h3>
            <p>
                Exercise burns fewer calories than most people expect. A 30-minute run at 8 km/h burns about 280 kcal at 70 kg — equivalent to one chocolate bar or two slices of bread with butter. This is why diet has a much larger impact on weight loss than exercise alone. Use this calculator alongside the <NuxtLink to="/fitness/tdee-calculator">TDEE calculator</NuxtLink> to see your full daily energy balance.
            </p>
        </template>
        <template #example>
            <p>
                A <strong>75 kg person</strong> goes for a <strong>45-minute moderate run (8 km/h)</strong>. Select "Running — moderate (8 km/h)", enter 75 kg and 45 minutes.
            </p>
            <p>
                Calories = 8.0 × 75 × 0.75 = <strong>450 kcal</strong>. That's equivalent to about 1.6 slices of pizza, or a large latte and a muffin.
            </p>
            <p>
                The comparison table also shows that the same 45 minutes of cycling at the same intensity would burn the same 450 kcal — but yoga would only burn 141 kcal and jump rope would burn 619 kcal. Use this to choose the activity that fits your schedule and calorie target.
            </p>
        </template>
    </UiCalcPage>
</template>

<script setup>
definePageMeta({ layout: 'brutalist' })

useCalcSEO(
    "Calories Burned Calculator — Running, Walking, Cycling & 20+ Activities",
    "Free calories burned calculator using the MET formula. Supports 20+ activities including running, walking, cycling, swimming and HIIT. Enter your weight and duration for an accurate estimate.",
    [
        { q: "How many calories do you burn running for 30 minutes?", a: "It depends on your weight and pace. At 70 kg running at a moderate pace (8 km/h, MET 8.0): 8.0 × 70 × 0.5 = 280 kcal. At 80 kg: 320 kcal. At a faster 10 km/h pace (MET 9.8): 343 kcal at 70 kg. The calculator adjusts for your exact weight and chosen pace." },
        { q: "How many calories do you burn walking 10,000 steps?", a: "10,000 steps is roughly 7–8 km depending on stride length, taking approximately 70–90 minutes of walking. At a moderate walking pace (MET 3.5) for 80 minutes at 70 kg: 3.5 × 70 × 1.33 = 326 kcal. Heavier walkers burn more; faster walkers burn slightly more per step." },
        { q: "Does weight affect how many calories you burn exercising?", a: "Yes — significantly. A 90 kg person burns about 29% more calories than a 70 kg person doing the identical workout at the same intensity. Calories = MET × weight (kg) × hours. This is why gym machines that don't ask for your weight give inaccurate estimates." },
        { q: "How many calories does 1 hour of cycling burn?", a: "At leisure pace (<16 km/h, MET 4.0) at 70 kg: 4.0 × 70 × 1 = 280 kcal. At moderate pace (16–19 km/h, MET 6.0): 420 kcal. At vigorous pace (20+ km/h, MET 8.0): 560 kcal per hour at 70 kg. Intensity makes a bigger difference than duration." },
        { q: "How accurate are calorie burn calculators?", a: "MET-based calculators are accurate within ±15–20% for most people doing steady-state cardio. Factors like fitness level, terrain, heat, and individual metabolism can shift actual burn. HIIT and weight training estimates are less precise because these exercises create significant post-workout calorie burn (EPOC) that MET values don't capture." },
        { q: "What activity burns the most calories?", a: "Per hour at 70 kg, the highest calorie burns are: jump rope (770 kcal), running very fast 12+ km/h (770 kcal), swimming vigorously (686 kcal), HIIT (560 kcal). High-intensity activities burn far more than steady-state cardio — a 20-minute HIIT session can burn more than 45 minutes of walking." },
        { q: "How many calories does 30 minutes of HIIT burn?", a: "HIIT has a MET of approximately 8.0 during the session. At 70 kg for 30 minutes: 8.0 × 70 × 0.5 = 280 kcal. However, HIIT also creates excess post-exercise oxygen consumption (EPOC), potentially adding 60–200 additional calories burned over the following 12–24 hours — making its total burn significantly higher than steady cardio." },
        { q: "How many calories does yoga burn in an hour?", a: "Yoga has a MET of approximately 2.5. At 70 kg for 60 minutes: 2.5 × 70 × 1 = 175 kcal. This is relatively low compared to cardio activities, but yoga's benefits in flexibility, stress reduction, and active recovery make it valuable as a complementary activity rather than a primary calorie-burning tool." },
    ]
)

useHead({
    script: [{
        type: 'application/ld+json',
        innerHTML: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'HowTo',
            name: 'How to Calculate Calories Burned During Exercise',
            description: 'Estimate calories burned using the MET formula based on activity type, body weight, and duration.',
            step: [
                { '@type': 'HowToStep', position: 1, name: 'Select your activity', text: 'Choose from 20+ activities including running, walking, cycling, swimming, HIIT, yoga, and more. Pick the closest match to your actual workout intensity.' },
                { '@type': 'HowToStep', position: 2, name: 'Enter your body weight', text: 'Enter your weight in kg (metric) or lbs (imperial). Use the unit toggle to switch. Calorie burn scales directly with body weight.' },
                { '@type': 'HowToStep', position: 3, name: 'Enter workout duration', text: 'Enter the total number of minutes you performed the activity. The calculator uses Calories = MET × weight (kg) × hours.' },
                { '@type': 'HowToStep', position: 4, name: 'Click Calculate', text: 'Your calories burned, calories per hour, MET value, and a food equivalent appear instantly — plus a comparison table showing the same duration across 8 other activities.' },
            ],
        }),
    }],
})
</script>

<style scoped>
.burn-ref-table {
    width: 100%;
    border-collapse: collapse;
    margin: 12px 0 20px;
    font-size: 14px;
}
.burn-ref-table th,
.burn-ref-table td {
    padding: 7px 12px;
    text-align: left;
    border: 1.5px solid rgba(10, 10, 10, 0.15);
}
.burn-ref-table thead th {
    background: #0a0a0a;
    color: #fff;
    font-family: 'Space Mono', monospace;
    font-size: 10px;
    text-transform: uppercase;
    letter-spacing: 0.08em;
}
.burn-ref-table tbody tr:nth-child(even) {
    background: rgba(10, 10, 10, 0.03);
}
</style>
