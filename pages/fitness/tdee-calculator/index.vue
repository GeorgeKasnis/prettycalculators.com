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
        <template #faq>
            <CalcFaq :faqs="faqs" />
        </template>
    </UiCalcPage>
</template>

<script setup>
definePageMeta({ layout: 'brutalist' })

const faqs = [
    { q: "What is TDEE?", a: "TDEE (Total Daily Energy Expenditure) is the total number of calories you burn in a day, including your BMR plus calories burned through physical activity and digestion." },
    { q: "How do I use TDEE to lose weight?", a: "To lose weight, eat 300–500 calories below your TDEE per day. A 500-calorie daily deficit leads to approximately 0.5 kg (1 lb) of fat loss per week." },
    { q: "Can I calculate TDEE using pounds and inches?", a: "Yes — select Imperial using the toggle at the bottom-left of the screen. Enter weight in lbs and height in feet/inches. The calculator converts to metric internally before applying the Harris-Benedict formula." },
    { q: "What is the difference between BMR and TDEE?", a: "<a href=\"/fitness/bmr-calculator\">BMR</a> is the calories you burn at complete rest. TDEE is your BMR multiplied by an activity factor — it represents your total daily calorie burn including all movement and exercise." },
    { q: "How accurate is a TDEE calculator?", a: "TDEE calculators provide a good estimate, but individual metabolism varies. Use it as a starting point and adjust your intake based on real results over 2–4 weeks." },
    { q: "What is a normal TDEE for a woman?", a: "For a sedentary woman aged 25–40 at average height and weight (60–65 kg), TDEE is typically 1,700–2,000 kcal/day. At moderate activity (3–5 workouts/week), this rises to 2,100–2,400 kcal. Very active women (daily training) may reach 2,600–3,000 kcal. Individual variation is ±15%." },
    { q: "What is a normal TDEE for a man?", a: "For a sedentary man aged 25–40 at average height and weight (75–85 kg), TDEE is typically 2,200–2,600 kcal/day. At moderate activity it rises to 2,800–3,200 kcal. Heavily active men can exceed 3,500 kcal. Muscle mass pushes TDEE higher than the formula predicts for very muscular individuals." },
    { q: "Why is my TDEE so high but I'm not losing weight?", a: "The most common reasons are underestimating food intake (portion sizes are often 20–30% larger than people think), overestimating activity level, or choosing too high an activity multiplier. Liquid calories, cooking oils, and condiments are frequently missed. Track everything in a food diary for 2–3 weeks before adjusting your TDEE estimate." },
    { q: "Should I eat my TDEE to maintain weight?", a: "Yes — your TDEE is your maintenance calorie level. Eating exactly at TDEE over time keeps weight stable. Real-world fluctuations of ±200 kcal/day are normal and won't cause meaningful weight change. Only sustained deficits or surpluses over weeks result in measurable fat loss or gain." },
    { q: "How much below my TDEE should I eat to lose fat?", a: "A deficit of 300–500 kcal/day is safe for most people and produces 0.3–0.5 kg of fat loss per week. Aggressive deficits (750–1,000 kcal/day) speed up weight loss but increase the risk of muscle loss, nutrient deficiency, and metabolic adaptation. High protein intake (2.0+ g/kg) is essential to preserve muscle during a deficit." },
    { q: "Does TDEE change as I lose weight?", a: "Yes — as you lose weight your BMR decreases because you have less body mass to maintain. A 10 kg weight loss might reduce TDEE by 100–200 kcal/day. Recalculate your TDEE every 5–10 kg of weight loss to ensure your deficit remains appropriate and adjust calories or activity to continue progressing." },
]

useCalcSEO(
    "TDEE Calculator — Metric & Imperial | Total Daily Calories",
    "Calculate your TDEE in metric (kg, cm) or imperial (lbs, ft, in). Find your total daily calorie burn and set the right goal for weight loss or muscle gain.",
    faqs
)

useHead({
    script: [{
        type: 'application/ld+json',
        innerHTML: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'HowTo',
            name: 'How to Calculate Your TDEE',
            description: 'Calculate total daily energy expenditure using BMR × activity multiplier.',
            step: [
                { '@type': 'HowToStep', position: 1, name: 'Choose your unit system', text: 'Use the Metric / Imperial toggle at the bottom-left of the screen.' },
                { '@type': 'HowToStep', position: 2, name: 'Enter gender, weight, height, and age', text: 'Metric: kg and cm. Imperial: lbs and ft/in. These calculate your BMR.' },
                { '@type': 'HowToStep', position: 3, name: 'Select your activity level', text: 'Choose from Sedentary (×1.2) to Extra Active (×1.9) based on your typical weekly exercise.' },
                { '@type': 'HowToStep', position: 4, name: 'Click Calculate', text: 'Your TDEE in kcal/day appears — this is your maintenance calorie level.' },
                { '@type': 'HowToStep', position: 5, name: 'Set your calorie goal', text: 'Eat 300–500 kcal below TDEE to lose fat, or 200–300 above TDEE to build muscle.' },
            ],
        }),
    }],
})
</script>
