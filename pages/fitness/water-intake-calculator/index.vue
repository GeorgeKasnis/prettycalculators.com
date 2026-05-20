<template>
    <UiCalcPage title="Water Intake Calculator" category="fitness" description-title="How much water should you drink per day?">
        <template #calc>
            <CalculatorsFitnessWaterIntakeCalc />
        </template>
        <template #facts>
            <CalcFact label="Base rule" value="35 ml per kg" />
            <CalcFact label="8 glasses" value="~2 L / day" />
            <CalcFact label="Athletes need" value="40–45 ml/kg" />
            <CalcFact label="Body is water" value="~60%" />
        </template>
        <template #description>
            <p>
                The <strong>Water Intake Calculator</strong> estimates your daily fluid needs based on body weight and activity level. Hydration affects everything from energy levels and cognitive function to exercise performance and kidney health.
            </p>
            <p>
                The formula uses <strong>30–45 ml per kilogram of body weight</strong>, scaled by activity level:
            </p>
            <ul>
                <li><strong>Sedentary</strong> (desk job, minimal exercise) — 30 ml/kg</li>
                <li><strong>Light</strong> (1–2 workouts/week) — 33 ml/kg</li>
                <li><strong>Moderate</strong> (3–4 workouts/week) — 36 ml/kg</li>
                <li><strong>Active</strong> (5–6 workouts/week) — 40 ml/kg</li>
                <li><strong>Athlete</strong> (daily intense training) — 45 ml/kg</li>
            </ul>
            <p>
                This covers water from all sources — beverages and food. About 20% of daily intake typically comes from food. Increase intake in hot climates, during illness, or when sweating heavily.
            </p>
        </template>
        <template #example>
            <p>A <strong>75 kg person</strong> who exercises moderately (3–4×/week):</p>
            <p>Recommended = 75 × 36 ml = <strong>2,700 ml = 2.7 L/day</strong></p>
            <p>That's roughly <strong>11 cups</strong> (8 fl oz each) or <strong>91 fl oz</strong>.</p>
            <p>Minimum baseline = 75 × 30 ml = <strong>2,250 ml = 2.25 L/day</strong></p>
        </template>
        <template #faq>
            <CalcFaq :faqs="faqs" />
        </template>
    </UiCalcPage>
</template>

<script setup>
definePageMeta({ layout: 'brutalist' })

const faqs = [
    { q: "How much water should I drink per day?", a: "General guidelines suggest 2–3 litres per day for most adults, but the right amount depends on your weight, activity level, climate, and health. The 8 glasses a day rule (about 2 litres) is a reasonable starting point for a sedentary adult." },
    { q: "Does coffee or tea count toward my water intake?", a: "Yes. Despite the mild diuretic effect of caffeine, coffee and tea still contribute to net fluid intake. Research shows moderate caffeine consumption (up to 400 mg/day, roughly 4 cups of coffee) does not cause dehydration in habituated drinkers." },
    { q: "How do I know if I'm drinking enough water?", a: "The simplest indicator is urine colour. Pale straw yellow (light lemonade colour) means you're well hydrated. Dark yellow or amber suggests you need more water. Clear urine can indicate overhydration. Thirst is a late signal — don't wait until you're thirsty." },
    { q: "Can you drink too much water?", a: "Yes. Overhydration (hyponatraemia) occurs when excess water dilutes sodium levels in the blood. It's rare in everyday life but a real risk for endurance athletes who drink large amounts of plain water during long events. For most people, drinking to thirst is sufficient." },
    { q: "Does the water in food count?", a: "Yes. About 20% of daily water intake comes from food. Water-rich foods like cucumber, watermelon, strawberries, and lettuce are over 90% water. A diet high in fruits and vegetables naturally contributes significant fluid intake." },
    { q: "Should I drink more water when exercising?", a: "Yes. During exercise, aim for 500–750 ml of water per hour of moderate exercise. For intense or long workouts (over 90 minutes), consider an electrolyte drink to replace sodium, potassium, and magnesium lost through sweat." },
    { q: "Does drinking more water help with weight loss?", a: "Drinking water before meals can reduce calorie intake by increasing satiety. Replacing sugary drinks with water eliminates empty calories. Some studies show mild metabolic rate increases after drinking cold water. However, water alone is not a weight loss solution." },
    { q: "How does hot weather affect water intake?", a: "In hot weather or humid conditions, you can lose an extra litre or more of fluid through sweat per hour. Increase water intake by 500–1,000 ml on hot days, and more if you're physically active outdoors." },
    { q: "Do pregnant or breastfeeding women need more water?", a: "Yes. Pregnant women are advised to drink about 2.3 litres (10 cups) per day. Breastfeeding women need approximately 3.1 litres (13 cups) per day to support milk production." },
    { q: "What are signs of dehydration?", a: "Mild dehydration: thirst, dark urine, headache, reduced concentration, fatigue. Moderate dehydration: dizziness, dry mouth, reduced urine output. Severe dehydration (a medical emergency): rapid heartbeat, confusion, sunken eyes, no urination. Even 1–2% dehydration measurably impairs physical and cognitive performance." },
]

useCalcSEO(
    "Water Intake Calculator — Daily Water Needs by Weight & Activity",
    "Free water intake calculator. Find out how much water you should drink per day based on your weight and activity level.",
    faqs
)
</script>
