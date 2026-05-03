<template>
    <UiCalcPage title="TDEE Calculator" category="fitness" description-title="Your total daily calorie burn, calculated">
        <template #calc>
            <CalculatorsFitnessTdeeCalc />
        </template>
        <template #facts>
            <CalcFact label="Formula" value="BMR × Activity" />
            <CalcFact label="Activity range" value="1.2 – 1.9×" />
            <CalcFact label="Used for" value="Weight management" />
        </template>
        <template #description>
            <p>
                A <span class="font-bold">TDEE (Total Daily Energy Expenditure) calculator</span> tells you how many calories your body burns each day based on your <span class="font-bold">age, weight, height, gender, and activity level</span>. While your
                <span class="font-bold">BMR</span> represents the calories your body needs at complete rest, TDEE accounts for everything you do throughout the day — from walking to intense workouts.
            </p>
            <p>The calculation is a two-step process. First, your BMR is calculated using the Harris-Benedict equations:</p>
            <p>For <span class="font-bold">males</span>: [<span class="font-bold">BMR</span> = 88.362 + (13.397 × weight in kg) + (4.799 × height in cm) − (5.677 × age)]</p>
            <p>For <span class="font-bold">females</span>: [<span class="font-bold">BMR</span> = 447.593 + (9.247 × weight in kg) + (3.098 × height in cm) − (4.33 × age)]</p>
            <p>Your BMR is then multiplied by an <span class="font-bold">activity multiplier</span>:</p>
            <p>
                <span class="font-bold">Sedentary</span> (little/no exercise): × 1.2 — <span class="font-bold">Lightly active</span> (1–3 days/week): × 1.375 — <span class="font-bold">Moderately active</span> (3–5 days/week): × 1.55 —
                <span class="font-bold">Very active</span> (6–7 days/week): × 1.725 — <span class="font-bold">Extra active</span> (physical job or twice-daily training): × 1.9
            </p>
            <p>
                Your TDEE is the number of calories you need to eat to <span class="font-bold">maintain your current weight</span>. Eating below it creates a calorie deficit for weight loss; eating above it leads to a surplus for muscle gain. It is an estimate and can vary based on
                individual metabolism, body composition, and genetics.
            </p>
        </template>
        <template #example>
            <p>Let's take a <span class="font-bold">28-year-old male</span> who <span class="font-bold">weighs 80 kg</span>, is <span class="font-bold">180 cm tall</span>, and exercises <span class="font-bold">3–5 days per week</span> (moderately active).</p>
            <p>Step 1 — calculate BMR:</p>
            <p>[<span class="font-bold">BMR</span> = 88.362 + (13.397 × 80) + (4.799 × 180) − (5.677 × 28)]</p>
            <p>[<span class="font-bold">BMR</span> = 88.362 + 1071.76 + 863.82 − 158.956 = <span class="font-bold">1865</span>]</p>
            <p>Step 2 — multiply by the activity factor (moderately active = 1.55):</p>
            <p>[<span class="font-bold">TDEE</span> = 1865 × 1.55 = <span class="font-bold">2891 kcal/day</span>]</p>
            <p>
                This person needs approximately <span class="font-bold">2891 calories per day</span> to maintain their current weight. To lose weight at a safe rate of ~0.5 kg per week, they could aim for around <span class="font-bold">2400 calories per day</span>, creating a moderate
                deficit without sacrificing energy or muscle mass.
            </p>
        </template>
    </UiCalcPage>
</template>

<script setup>
definePageMeta({ layout: 'brutalist' })
useCalcSEO(
    "TDEE Calculator — Total Daily Energy Expenditure",
    "Calculate your TDEE — total daily calories burned based on weight, height, age, and activity level. Set the right calorie goal for weight loss or muscle gain.",
    [
        { q: "What is TDEE?", a: "TDEE (Total Daily Energy Expenditure) is the total number of calories you burn in a day, including your BMR plus calories burned through physical activity and digestion." },
        { q: "How do I use TDEE to lose weight?", a: "To lose weight, eat 300–500 calories below your TDEE per day. A 500-calorie daily deficit leads to approximately 0.5 kg (1 lb) of fat loss per week." },
        { q: "What is the difference between BMR and TDEE?", a: "BMR is the calories you burn at complete rest. TDEE is your BMR multiplied by an activity factor — it represents your total daily calorie burn including all movement and exercise." },
        { q: "How accurate is a TDEE calculator?", a: "TDEE calculators provide a good estimate, but individual metabolism varies. Use it as a starting point and adjust your intake based on real results over 2–4 weeks." },
    ]
)
</script>
