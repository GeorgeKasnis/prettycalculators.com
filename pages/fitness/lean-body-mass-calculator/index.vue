<template>
    <UiCalcPage title="Lean Body Mass Calculator" category="fitness" description-title="Know your muscle mass, not just your weight">
        <template #calc>
            <CalculatorsFitnessLeanBodyMassCalc />
        </template>
        <template #facts>
            <CalcFact label="Formula" value="Boer / Direct BF%" />
            <CalcFact label="Output" value="LBM + Fat Mass" />
            <CalcFact label="Used for" value="Training & nutrition" />
        </template>
        <template #description>
            <p>
                <span class="font-bold">Lean Body Mass (LBM)</span> is the weight of everything in your body except fat — muscles, bones, organs, blood, and water. Unlike
                <span class="font-bold">BMI</span>, which can't distinguish muscle from fat, LBM gives you a precise target for protein intake, hydration, and strength training goals.
            </p>
            <p>
                If you know your <span class="font-bold">body fat percentage</span>, the calculator uses the direct method — the most accurate approach:
            </p>
            <p>[<span class="font-bold">LBM</span> = Total Weight × (1 − Body Fat% / 100)]</p>
            <p>
                Without a body fat reading, it applies the <span class="font-bold">Boer formula</span>, one of the most validated anthropometric equations:
            </p>
            <p>
                <span class="font-bold">Male</span>: [LBM = 0.407 × weight (kg) + 0.267 × height (cm) − 19.2]<br />
                <span class="font-bold">Female</span>: [LBM = 0.252 × weight (kg) + 0.473 × height (cm) − 48.3]
            </p>
            <p>
                The result shows which method was used so you know the confidence level. Body fat input is optional — if you have it from a DEXA scan, calipers, or smart scale, enter it for the most accurate reading.
            </p>
        </template>
        <template #example>
            <p>
                A <span class="font-bold">32-year-old male</span> weighs <span class="font-bold">85 kg</span> and is <span class="font-bold">180 cm</span> tall. He doesn't know his body fat %, so the Boer formula is used:
            </p>
            <p>[<span class="font-bold">LBM</span> = 0.407 × 85 + 0.267 × 180 − 19.2 = 34.6 + 48.06 − 19.2 = <span class="font-bold">63.46 kg</span>]</p>
            <p>
                Fat mass = 85 − 63.46 = <span class="font-bold">21.54 kg</span>, implying a body fat % of ~25.3%.
            </p>
            <p>
                Now suppose he has a DEXA scan and learns his body fat is <span class="font-bold">22%</span>. Using the direct method: LBM = 85 × (1 − 0.22) = <span class="font-bold">66.3 kg</span>. The direct method gives a higher, more accurate LBM because DEXA accounts for bone density and water that the Boer formula may underestimate.
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
    { q: "What is lean body mass?", a: "Lean body mass (LBM) is your total weight minus all body fat. It includes muscle, bone, organs, blood, and water. For a 80 kg person at 20% body fat, LBM is 64 kg." },
    { q: "What is a healthy lean body mass for men?", a: "For men, LBM typically ranges from 60–85 kg depending on height and build. An athletic 180 cm male will often have LBM of 70–80 kg. More useful than a single number is tracking whether your LBM is stable or increasing over time — rising LBM with stable or falling weight means you're building muscle while losing fat." },
    { q: "What is a healthy lean body mass for women?", a: "For women, LBM typically ranges from 40–60 kg depending on height and frame. A 165 cm woman at a healthy body fat of 22–28% will usually carry 44–55 kg of lean mass. Women naturally carry a higher essential fat % than men (10–13% vs 2–5%), so a lower absolute LBM is normal and healthy." },
    { q: "How is lean body mass different from BMI?", a: "<a href=\"/fitness/bmi-calculator\">BMI</a> divides weight by height squared — it can't tell muscle from fat. A 90 kg bodybuilder and a 90 kg sedentary person have the same BMI but very different body compositions. LBM directly measures the non-fat component, making it far more useful for fitness and nutrition planning." },
    { q: "What is the Boer formula for lean body mass?", a: "The Boer formula estimates LBM from weight and height. For males: LBM = 0.407×W(kg) + 0.267×H(cm) − 19.2. For females: LBM = 0.252×W(kg) + 0.473×H(cm) − 48.3. It was validated in a large clinical study and is considered more accurate than older formulas like James or Hume, especially for average-weight adults." },
    { q: "Is lean body mass the same as muscle mass?", a: "No — lean body mass includes muscle, bone, organs, blood, and water. Skeletal muscle is typically 40–50% of LBM in men and 35–40% in women. When people say they want to 'build lean mass,' they usually mean muscle, but an increasing LBM number on the scale could also reflect bone density improvements or increased hydration." },
    { q: "Why does my LBM matter for protein intake?", a: "Protein recommendations for building or preserving muscle are based on LBM, not total weight. Targeting 1.6–2.2 g of protein per kg of LBM is more precise than per kg of total body weight, especially for overweight individuals. A 100 kg person at 30% body fat has an LBM of 70 kg and needs 112–154 g of protein, not 160–220 g." },
    { q: "Can lean body mass decrease?", a: "Yes — LBM decreases with age (a process called sarcopenia), during prolonged calorie deficits without adequate protein, with inactivity, and after illness or injury. Resistance training and sufficient protein intake (1.6+ g/kg LBM) are the most effective ways to preserve or increase LBM at any age." },
    { q: "How accurate is LBM from a calculator vs DEXA scan?", a: "DEXA (dual-energy X-ray absorptiometry) is the gold standard — it measures bone density, lean mass, and fat mass precisely in each body region. Formula-based estimates have ±3–5 kg error on average. If you have access to a DEXA or InBody scan, enter your body fat % into this calculator for a direct, more accurate LBM." },
    { q: "What body fat % gives me the best lean body mass ratio?", a: "There's no universal answer, but most research shows optimal performance and health at 10–20% body fat for men and 18–28% for women. At these ranges, LBM-to-total-weight ratio is high while hormone function, recovery, and energy remain normal. Going below 5% (men) or 12% (women) risks hormone disruption and reduced LBM as the body catabolises muscle." },
    { q: "How do I increase lean body mass?", a: "The three pillars are: (1) progressive resistance training 3–5 days per week, (2) protein intake of 1.6–2.2 g/kg of LBM, and (3) a slight calorie surplus (200–300 kcal above <a href=\"/fitness/tdee-calculator\">TDEE</a>) to support muscle protein synthesis without excessive fat gain. Sleep (7–9 hours) and consistency over months matter more than any single tactic." },
    { q: "Can I calculate lean body mass without knowing my height?", a: "Only if you know your body fat percentage. If BF% is available, enter it and leave the height field blank — the calculator will use the direct method (LBM = weight × (1 − BF%/100)), which requires only weight and body fat." },
]

useCalcSEO(
    "Lean Body Mass Calculator — Boer Formula + Direct BF% Method",
    "Calculate your lean body mass using the Boer formula or your body fat percentage. Metric and imperial support. Outputs LBM, fat mass, and body fat %.",
    faqs
)

useHead({
    script: [{
        type: 'application/ld+json',
        innerHTML: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'HowTo',
            name: 'How to Calculate Lean Body Mass',
            description: 'Find your lean body mass using the Boer formula or direct body fat percentage method.',
            step: [
                { '@type': 'HowToStep', position: 1, name: 'Select gender', text: 'Choose Male or Female — the Boer formula has separate coefficients for each.' },
                { '@type': 'HowToStep', position: 2, name: 'Enter weight and height', text: 'Use Metric (kg/cm) or Imperial (lbs/ft/in) via the unit toggle.' },
                { '@type': 'HowToStep', position: 3, name: 'Add body fat % (optional)', text: 'If you have your body fat % from a DEXA scan, calipers, or smart scale, enter it for the most accurate result. If left blank, the Boer formula is used.' },
                { '@type': 'HowToStep', position: 4, name: 'Click Calculate LBM', text: 'Your lean body mass, fat mass, body fat %, and the method used are displayed instantly.' },
            ],
        }),
    }],
})
</script>
