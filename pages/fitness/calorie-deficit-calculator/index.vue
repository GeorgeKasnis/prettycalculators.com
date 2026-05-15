<template>
    <UiCalcPage title="Calorie Deficit Calculator" category="fitness" description-title="From your TDEE to your weight loss target">
        <template #calc>
            <CalculatorsFitnessCalorieDeficitCalc />
        </template>
        <template #facts>
            <CalcFact label="Key formula" value="TDEE − deficit = target" />
            <CalcFact label="1 kg fat" value="≈ 7,700 kcal" />
            <CalcFact label="Safe rate" value="0.5–1.0 kg/week" />
        </template>
        <template #description>
            <p>
                A <span class="font-bold">calorie deficit calculator</span> turns your <span class="font-bold">TDEE</span> and your chosen rate of loss into a precise daily calorie target. A calorie deficit simply means eating fewer calories than your body burns — the size of that gap determines how fast you lose weight.
            </p>
            <p>The math is straightforward:</p>
            <p>[<span class="font-bold">Weekly deficit</span> = Rate (kg/week) × 7,700 kcal]</p>
            <p>[<span class="font-bold">Daily deficit</span> = Weekly deficit ÷ 7]</p>
            <p>[<span class="font-bold">Daily calorie target</span> = TDEE − Daily deficit]</p>
            <p>
                One kilogram of body fat stores approximately <span class="font-bold">7,700 kcal</span> of energy. To lose 0.5 kg per week, you need a weekly deficit of 3,850 kcal — or 550 kcal per day below your TDEE. Rates above 1.0 kg/week require very large deficits that increase the risk of muscle loss, fatigue, and nutrient gaps.
            </p>
            <p>
                If you enter your current and goal weights, the calculator also estimates <span class="font-bold">how many weeks</span> it will realistically take to reach your target, accounting for whether you're in metric or imperial units.
            </p>
        </template>
        <template #example>
            <p>
                A person has a <span class="font-bold">TDEE of 2,400 kcal/day</span> and wants to lose <span class="font-bold">0.5 kg per week</span> (standard cut):
            </p>
            <p>[<span class="font-bold">Weekly deficit</span> = 0.5 × 7,700 = <span class="font-bold">3,850 kcal</span>]</p>
            <p>[<span class="font-bold">Daily deficit</span> = 3,850 ÷ 7 = <span class="font-bold">550 kcal</span>]</p>
            <p>[<span class="font-bold">Daily target</span> = 2,400 − 550 = <span class="font-bold">1,850 kcal/day</span>]</p>
            <p>
                They weigh <span class="font-bold">85 kg</span> and want to reach <span class="font-bold">75 kg</span> (a 10 kg loss). At 0.5 kg/week: 10 ÷ 0.5 = <span class="font-bold">20 weeks (~5 months)</span> to goal.
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
    { q: "What is a calorie deficit?", a: "A calorie deficit occurs when you consume fewer calories than your body burns in a day. Your body makes up the difference by drawing on stored energy — primarily body fat. A deficit of 500 kcal/day leads to roughly 0.5 kg of fat loss per week." },
    { q: "How do I find my TDEE to calculate a deficit?", a: "Use a <a href=\"/fitness/tdee-calculator\">TDEE calculator</a> to find your total daily calorie burn. TDEE combines your BMR (calories burned at rest) with your activity level. Enter that TDEE number into this calculator to get your daily deficit target." },
    { q: "Is a 500-calorie deficit per day safe?", a: "Yes — a 500 kcal/day deficit is the most commonly recommended level for sustainable fat loss. It produces approximately 0.5 kg of fat loss per week, which is fast enough to see results while being moderate enough to preserve muscle mass, hormones, and energy levels. Deficits over 1,000 kcal/day are generally considered aggressive and risk muscle loss." },
    { q: "How many calories below TDEE should I eat to lose 1 kg per week?", a: "To lose 1 kg of fat per week, you need a weekly deficit of 7,700 kcal — or 1,100 kcal/day below your TDEE. This is considered an aggressive cut and requires high protein intake (2+ g/kg body weight) to minimise muscle loss. It is generally only appropriate for people with significant excess body fat or under medical supervision." },
    { q: "What is the minimum safe calorie intake during a deficit?", a: "Most guidelines set the floor at 1,200 kcal/day for women and 1,500 kcal/day for men. Going below these levels makes it very difficult to meet micronutrient needs and risks metabolic adaptation, hormonal disruption, and muscle loss. If your TDEE deficit calculation produces a target below these thresholds, reduce the rate of loss instead." },
    { q: "Will a calorie deficit cause muscle loss?", a: "A deficit alone does not necessarily cause muscle loss. Adequate protein intake (1.6–2.2 g per kg of body weight) and resistance training 3–4 days per week preserve or even increase muscle during a cut. The most common cause of muscle loss is eating too little protein, not the deficit itself." },
    { q: "How long will it take to lose 10 kg in a calorie deficit?", a: "At a standard rate of 0.5 kg/week, losing 10 kg takes approximately 20 weeks (about 5 months). At a faster rate of 1.0 kg/week, it takes ~10 weeks, but this requires a 1,100 kcal/day deficit and substantially higher protein. Enter your current and goal weights above and the calculator estimates your timeline automatically." },
    { q: "Should I eat back calories burned during exercise?", a: "It depends on how you calculated your TDEE. If your TDEE already includes your exercise (e.g., you selected 'moderately active'), then eating back workout calories would erase your deficit. If you used a sedentary TDEE and added workouts separately, eating back 50–75% of the estimated burn helps avoid too large a deficit on training days." },
    { q: "Does a calorie deficit slow down metabolism?", a: "Prolonged severe deficits can reduce metabolic rate through adaptive thermogenesis — the body burns fewer calories in response to sustained restriction. Keeping your deficit moderate (300–600 kcal/day), maintaining protein intake, and including resistance training minimises this effect. Taking a 1–2 week diet break at maintenance every 8–12 weeks can partially restore metabolic rate." },
    { q: "How does a calorie deficit relate to macros?", a: "The deficit determines your total calorie target. Your <a href=\"/fitness/macro-calculator\">macro calculator</a> then splits those calories into protein, carbohydrates, and fat. Protein is set first (1.6–2.2 g/kg) to protect muscle, then the remaining calories are split between carbs and fat based on preference and training demands." },
    { q: "What should my body fat % be before I start a calorie deficit?", a: "Most fitness professionals recommend cutting when body fat is above 15–20% for men or 23–28% for women. Cutting at very low body fat is harder to sustain and risks muscle loss. If you're unsure of your body fat, use a <a href=\"/fitness/body-fat-calculator\">body fat calculator</a> first, then plan your deficit from there." },
    { q: "Can I create a calorie deficit through exercise alone without eating less?", a: "Technically yes, but it's difficult in practice. Exercise burns 200–600 kcal per session for most people — much less than commonly assumed. Creating a 500 kcal daily deficit through exercise alone would require roughly 60–90 minutes of moderate-intensity cardio every day. Most people find a combination of moderate dietary restriction and 3–4 exercise sessions per week far more sustainable." },
]

useCalcSEO(
    "Calorie Deficit Calculator — Daily Target from TDEE & Rate of Loss",
    "Enter your TDEE and target rate of loss to get your daily calorie target, weekly deficit, and time to reach your goal weight. Metric and imperial.",
    faqs
)

useHead({
    script: [{
        type: 'application/ld+json',
        innerHTML: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'HowTo',
            name: 'How to Calculate Your Calorie Deficit',
            description: 'Find your daily calorie target by subtracting your chosen weekly deficit from your TDEE.',
            step: [
                { '@type': 'HowToStep', position: 1, name: 'Enter your TDEE', text: 'Use the TDEE calculator to find your total daily energy expenditure, then enter it here in kcal.' },
                { '@type': 'HowToStep', position: 2, name: 'Enter current and goal weight (optional)', text: 'These are used to calculate how many weeks it will take to reach your goal.' },
                { '@type': 'HowToStep', position: 3, name: 'Select your rate of loss', text: 'Choose from 0.25 to 1.0 kg per week (0.55 to 2.2 lbs/week). 0.5 kg/week is the standard recommended rate.' },
                { '@type': 'HowToStep', position: 4, name: 'Click Calculate', text: 'Your daily calorie target, daily deficit, weekly deficit, and estimated time to goal are shown instantly.' },
            ],
        }),
    }],
})
</script>
