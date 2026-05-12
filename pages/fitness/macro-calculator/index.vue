<template>
    <UiCalcPage title="Macro Calculator" category="fitness" description-title="Your daily protein, carbs & fat targets — by goal">
        <template #calc>
            <CalculatorsFitnessMacroCalc />
        </template>
        <template #facts>
            <CalcFact label="Protein"      value="4 kcal / gram" />
            <CalcFact label="Carbs"        value="4 kcal / gram" />
            <CalcFact label="Fat"          value="9 kcal / gram" />
            <CalcFact label="Keto carbs"   value="< 5% of calories" />
        </template>
        <template #description>
            <p>
                The <strong>Macro Calculator</strong> gives you your daily protein, carbohydrate, and fat targets in grams — based on your body stats, activity level, and goal. Whether you're cutting fat, building muscle, running a keto diet, or just eating for maintenance, macros tell you <em>exactly</em> how to split your calories rather than just how many to eat.
            </p>
            <p>
                The calculator uses the <strong>Harris-Benedict formula</strong> to estimate your BMR (base metabolic rate), multiplies it by your activity factor to get TDEE (total daily energy expenditure), then adjusts for your goal and applies evidence-based macro splits:
            </p>
            <ul>
                <li><strong>Cutting</strong> — higher protein (35–40%) to preserve muscle during a deficit; moderate carbs and fat</li>
                <li><strong>Bulking</strong> — more carbohydrates (45–50%) to fuel training and support hypertrophy</li>
                <li><strong>Keto</strong> — fat dominates at 70%, carbs held to 5%, protein at 25–30%</li>
                <li><strong>Maintenance</strong> — balanced 30/40/30 split (protein/carbs/fat)</li>
            </ul>
            <p>
                The per-meal breakdown at the bottom divides your daily targets by however many meals you eat — no more guessing how much to put on your plate.
            </p>
        </template>
        <template #example>
            <p>
                <strong>Profile:</strong> Male, 80kg, 180cm, 28 years old, moderately active (3–5 days/week). Goal: Cut.
            </p>
            <p>
                BMR ≈ 1,882 kcal. TDEE = 1,882 × 1.55 ≈ <em>2,917 kcal</em>. Cut deficit: −250 kcal → <strong>2,667 kcal/day</strong>.
            </p>
            <p>
                Macro split (35P / 35C / 30F):
                Protein = 2,667 × 35% ÷ 4 = <strong>233g</strong>.
                Carbs = 2,667 × 35% ÷ 4 = <strong>233g</strong>.
                Fat = 2,667 × 30% ÷ 9 = <strong>89g</strong>.
            </p>
            <p>
                Across 4 meals: ~58g protein, ~58g carbs, ~22g fat per meal.
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
    { q: "What are macros and why do they matter?", a: "Macros (macronutrients) are protein, carbohydrates, and fat — the three nutrients that provide calories. Counting macros gives you more control than counting calories alone because it tells you *where* those calories come from. Hitting 2,500 calories from 40% protein vs 40% carbs produces very different results in body composition." },
    { q: "How do I calculate my macros for cutting?", a: "For cutting: first find your TDEE, subtract 250–500 calories, then split 35–40% protein, 30–35% carbs, 30% fat. Higher protein during a cut preserves lean muscle mass. For an 80kg person on a 2,400 kcal cut, that's approximately 210–240g protein, 180–200g carbs, and 80g fat per day." },
    { q: "What macros should I eat for muscle gain?", a: "For building muscle (lean bulk), aim for a +200–300 kcal surplus with a 25–30% protein, 45–50% carb, 25% fat split. Carbohydrates are the primary fuel for resistance training and glycogen replenishment — keeping them high supports performance and recovery. 1.6–2.2g of protein per kg of body weight is the evidence-based range for hypertrophy." },
    { q: "What is the best macro split for keto?", a: "Standard keto macros are 70% fat, 25% protein, 5% carbs. For a 2,000 kcal keto diet that's roughly 155g fat, 125g protein, and 25g carbs per day. Staying under 20–50g of net carbs is the typical threshold to maintain ketosis. Keto-cut adds a 200–300 kcal deficit on top of these ratios." },
    { q: "How much protein do I need per day to build muscle?", a: "Research consistently supports 1.6–2.2g of protein per kg of body weight for muscle gain. For a 75kg person that's 120–165g/day. Going higher (2.4–3g/kg) during aggressive cuts helps preserve muscle. The calculator uses your weight, activity, and goal to set protein at the appropriate level for each scenario." },
    { q: "What macro calculator is used by bodybuilders?", a: "Most bodybuilders use a TDEE-based macro calculator: calculate BMR → multiply by activity factor → adjust for goal → split into macros. The protein target is typically set first (1.8–2.6g/kg for active individuals), with carbs and fat filling the remaining calories based on training style and personal preference." },
    { q: "Can I use this as a keto macro calculator?", a: "Yes — select 'Keto (maintenance)' or 'Keto Cut' from the Goal dropdown. The calculator automatically sets 5% carbs, 70% fat, and 25% protein, adjusted for your calorie needs. At 1,800 kcal that's roughly 22g carbs, 140g fat, 113g protein." },
    { q: "What macros should a woman eat for fat loss?", a: "Women typically have lower TDEE than men, but the macro *ratios* for cutting are similar: 35–40% protein, 30–35% carbs, 25–30% fat. The calculator adjusts TDEE using sex-specific BMR coefficients (Harris-Benedict), so calorie and gram targets will be appropriately lower while the split stays goal-optimal." },
    { q: "How many meals a day should I eat for macros?", a: "Meal frequency doesn't significantly affect fat loss or muscle gain in controlled studies — total daily macros matter most. However, spreading protein across 3–5 meals maximises muscle protein synthesis because muscle can only use about 30–40g of protein per sitting efficiently. The calculator's per-meal table helps you distribute evenly." },
    { q: "How accurate is a macro calculator?", a: "TDEE formulas like Harris-Benedict are accurate within about ±10–15% for most people. Individual variation in metabolic rate, muscle mass, and non-exercise activity thermogenesis (NEAT) affects actual needs. Use the calculator to set a starting point, track results for 2–3 weeks, and adjust by 100–200 kcal if weight is not changing as expected." },
    { q: "How many carbs should I eat on a 2,000 calorie diet?", a: "On a standard maintenance split (30% protein, 40% carbs, 30% fat) at 2,000 kcal: carbs = 2,000 × 40% ÷ 4 = 200g/day. For a cut, you'd lower carbs to 30–35% (150–175g). For keto, under 5% (25g). Adjust based on your training intensity — more volume and heavy lifting demands more carbohydrate." },
    { q: "Why does my macro calculator give different numbers from another app?", a: "Differences arise from the BMR formula used (Mifflin-St Jeor vs Harris-Benedict), the activity multipliers chosen, and how each app defines cutting, bulking, and maintenance deficits/surpluses. Results typically differ by 50–150 kcal, which is within the margin of individual metabolic variation. Use any consistent tool as a starting point and adjust based on real results." },
]

useCalcSEO(
    "Macro Calculator — Protein, Carbs & Fat for Cutting, Bulking & Keto",
    "Free macro calculator. Get your exact daily protein, carb and fat targets in grams based on your stats and goal — cutting, lean bulk, maintenance, or keto. Includes per-meal breakdown.",
    faqs
)

useHead({
    script: [{
        type: 'application/ld+json',
        innerHTML: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'HowTo',
            name: 'How to Calculate Your Macros',
            description: 'Find your daily protein, carb, and fat targets in grams based on your goal and body stats.',
            step: [
                { '@type': 'HowToStep', position: 1, name: 'Select your gender and enter your stats', text: 'Choose male or female, then enter your weight, height, and age. Switch between metric (kg/cm) and imperial (lbs/ft) with the unit toggle.' },
                { '@type': 'HowToStep', position: 2, name: 'Set your activity level', text: 'Choose how active you are on a weekly basis — from sedentary (desk job, no exercise) to extra active (daily hard training or physical job).' },
                { '@type': 'HowToStep', position: 3, name: 'Select your goal', text: 'Choose from Aggressive Cut, Cut, Maintenance, Lean Bulk, Bulk, Keto, or Keto Cut. Each applies a different calorie adjustment and macro split.' },
                { '@type': 'HowToStep', position: 4, name: 'Choose meals per day', text: 'Select how many meals you eat daily. The calculator divides your macros evenly across meals so you know how much to eat at each sitting.' },
                { '@type': 'HowToStep', position: 5, name: 'Click Calculate Macros', text: 'Your daily calorie target, protein, carbs, and fat in grams all appear — plus a per-meal breakdown table.' },
            ],
        }),
    }],
})
</script>
