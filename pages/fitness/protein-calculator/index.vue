<template>
    <UiCalcPage title="Protein Intake Calculator" category="fitness" description-title="How much protein your body actually needs">
        <template #calc>
            <CalculatorsFitnessProteinCalc />
        </template>
        <template #facts>
            <CalcFact label="Minimum (sedentary)" value="0.8 g/kg" />
            <CalcFact label="Muscle building" value="1.6–2.2 g/kg" />
            <CalcFact label="Cutting (fat loss)" value="2.0–2.4 g/kg" />
            <CalcFact label="Elite athletes" value="up to 2.6 g/kg" />
        </template>
        <template #description>
            <p>
                The <strong>Protein Intake Calculator</strong> tells you exactly how much protein you should eat each day based on your body weight, activity level, and fitness goal. Protein is the most important macronutrient for body composition — it builds and repairs muscle tissue, supports immune function, and keeps you fuller for longer.
            </p>
            <p>
                Recommendations vary significantly by goal. The <strong>minimum recommended intake</strong> for a sedentary adult is 0.8 g per kg of body weight — but this is a floor, not a target. Research consistently shows that people who exercise, especially those doing resistance training, benefit from significantly higher intake:
            </p>
            <ul>
                <li><strong>Fat loss</strong> — Higher protein (1.8–2.4 g/kg) preserves muscle while in a calorie deficit, preventing the muscle loss that slows metabolism.</li>
                <li><strong>Muscle building</strong> — Studies support 1.6–2.2 g/kg as the optimal range for maximising muscle protein synthesis when combined with resistance training.</li>
                <li><strong>Athletic performance</strong> — Athletes with high training volumes may benefit from up to 2.6 g/kg to support recovery.</li>
            </ul>
            <p>
                Protein intake above roughly 2.8 g/kg shows no additional muscle-building benefit for most people. Spreading your protein across 3–5 meals per day optimises muscle protein synthesis better than consuming it all at once.
            </p>
        </template>
        <template #example>
            <p>
                Take a <strong>75 kg person</strong> who trains 4 days a week and wants to build muscle. Their activity level is "moderately active" and goal is "build muscle."
            </p>
            <p>
                Using a multiplier of <strong>2.2 g/kg</strong>: <em>75 × 2.2 = 165g of protein per day</em>.
            </p>
            <p>
                To hit 165g daily, they could combine:
            </p>
            <ul>
                <li>200g chicken breast → ~62g protein</li>
                <li>200g Greek yogurt → ~20g protein</li>
                <li>3 whole eggs → ~19g protein</li>
                <li>1 scoop whey protein → ~25g protein</li>
                <li>150g cottage cheese → ~17g protein</li>
                <li>150g canned tuna → ~39g protein</li>
            </ul>
            <p>
                That adds up to ~182g — slightly above target, which is fine. Use the food table in the calculator as a starting guide and track intake with a food diary for the first few weeks until you know your portions intuitively.
            </p>
        </template>
    </UiCalcPage>
</template>

<script setup>
definePageMeta({ layout: 'brutalist' })
useCalcSEO(
    "Protein Calculator — Daily Protein Target in kg or lbs",
    "Free protein intake calculator supporting metric (kg) and imperial (lbs). Find your daily protein target based on body weight, activity level, and goal.",
    [
        { q: "How much protein do I need per day?", a: "It depends on your goals. Sedentary adults need about 0.8 g/kg. Active people building muscle should aim for 1.6–2.2 g/kg. Those cutting fat benefit from 2.0–2.4 g/kg to preserve muscle mass." },
        { q: "How much protein do I need per pound of body weight?", a: "A common guideline is 0.7–1 gram of protein per pound of body weight (1.5–2.2 g/kg). For muscle building, aim for around 1 g per pound. Enter your weight in lbs using the Imperial toggle for an instant result." },
        { q: "Does high protein intake damage kidneys?", a: "For healthy individuals with no pre-existing kidney disease, high protein intake (up to 2.6 g/kg) is safe. The kidney-damage claim stems from studies on people with existing kidney problems." },
        { q: "Can I eat too much protein?", a: "Protein above roughly 2.8 g/kg of body weight provides no additional muscle-building benefit and the excess is used for energy. It won't cause harm but is a waste of calories and money." },
        { q: "When should I eat protein to build muscle?", a: "Total daily protein intake matters most. Spreading it across 3–5 meals is optimal. Having 20–40g of protein near your workouts (before or after) can support muscle protein synthesis." },
    ]
)

useHead({
    script: [{
        type: 'application/ld+json',
        innerHTML: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'HowTo',
            name: 'How to Calculate Your Daily Protein Target',
            description: 'Find your daily protein intake in grams based on body weight, activity, and goal.',
            step: [
                { '@type': 'HowToStep', position: 1, name: 'Choose your unit system', text: 'Use the Metric / Imperial toggle at the bottom-left of the screen for kg or lbs body weight input.' },
                { '@type': 'HowToStep', position: 2, name: 'Enter your body weight', text: 'Enter weight in kg (metric) or lbs (imperial). The calculator converts to kg internally.' },
                { '@type': 'HowToStep', position: 3, name: 'Select activity level', text: 'Choose from Sedentary to Extra Active based on your weekly exercise frequency.' },
                { '@type': 'HowToStep', position: 4, name: 'Select your goal', text: 'Choose fat loss, maintenance, muscle building, or athletic performance.' },
                { '@type': 'HowToStep', position: 5, name: 'Click Calculate Protein', text: 'Your daily protein target in grams appears, plus a food source guide showing how to hit that target.' },
            ],
        }),
    }],
})
</script>
