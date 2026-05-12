<template>
    <UiCalcPage title="Body Fat Calculator" category="fitness" description-title="Estimate your body fat with body measurements">
        <template #calc>
            <CalculatorsFitnessBodyFatCalc />
        </template>
        <template #facts>
            <CalcFact label="Method" value="U.S. Navy" />
            <CalcFact label="Healthy (male)" value="10 – 20%" />
            <CalcFact label="Healthy (female)" value="18 – 28%" />
        </template>
        <template #description>
            <p>
                A body fat calculator is a tool that can help you estimate your body fat percentage. It works by taking into account your age, gender, height, weight, and measurements of different body parts such as your waist, hips, and neck. There are different methods for calculating body fat
                percentage, including the skinfold method, bioelectrical impedance analysis, and dual-energy x-ray absorptiometry.
            </p>
            <div class="mb-4">
                <div><b>For men:</b></div>
                <ul class="mb-6">
                    <li>Essential fat:<b> 2-5%</b></li>
                    <li>Athletes:<b> 6-13%</b></li>
                    <li>Fitness: <b>14-17%</b></li>
                    <li>Acceptable: <b>18-24%</b></li>
                    <li>Obese: ><b>25%</b></li>
                </ul>
                <div><b>For women:</b></div>
                <ul>
                    <li>Essential fat: <b>10-13%</b></li>
                    <li>Athletes: <b>14-20%</b></li>
                    <li>Fitness: <b>21-24%</b></li>
                    <li>Acceptable:<b> 25-31%</b></li>
                    <li>Obese: ><b>32%</b></li>
                </ul>
            </div>
            <p>
                Keep in mind that body fat percentage is just one indicator of overall health and fitness, and it may not be accurate for everyone. Other factors such as muscle mass, bone density, and hydration levels can also affect your body fat percentage, so it's best to use it as a starting
                point for discussing your health and fitness goals with a healthcare professional or certified fitness trainer.
            </p>
        </template>
        <template #example>
            <p>Let's say you're a 30-year-old woman who weighs 65 kilograms, is 1.65 meters tall, and has a waist circumference of 80 centimeters, a hip circumference of 95 centimeters, and a neck circumference of 30 centimeters.</p>
            <p>To calculate your body fat percentage using the U.S. Navy method, you would use the following formula:</p>
            <p>Body fat percentage = (4.95 x waist circumference) - (4.5 x neck circumference) + (0.98 x height) - 308.17 / weight</p>
            <p>Substituting the values, you get:</p>
            <p>Body fat percentage = (4.95 x 80) - (4.5 x 30) + (0.98 x 165) - 308.17 / 65</p>
            <p>Simplifying, you get: Body fat percentage = 28.5%</p>
            <p>So, your body fat percentage is 28.5%.</p>
        </template>
        <template #faq>
            <CalcFaq :faqs="faqs" />
        </template>
    </UiCalcPage>
</template>

<script setup>
definePageMeta({ layout: 'brutalist' })

const faqs = [
    { q: "What is a healthy body fat percentage for men?", a: "A healthy body fat percentage for men is typically 10–20%. Athletes may be 6–13%, fit individuals 14–17%, and the average range is 18–24%." },
    { q: "What is a healthy body fat percentage for women?", a: "A healthy body fat percentage for women is typically 20–30%. Athletes may be 14–20%, fit individuals 21–24%, and the average range is 25–31%." },
    { q: "How is body fat percentage calculated?", a: "This calculator uses the U.S. Navy formula, which uses height, neck, waist, and hip (women only) measurements to estimate body fat percentage. All measurements can be entered in cm or inches." },
    { q: "How do I measure for the body fat calculator in inches?", a: "Select Imperial using the toggle at the bottom-left of the screen. Enter all measurements (height, neck, waist, and hip for women) in inches. Neck: below the larynx. Waist: at the navel for men, narrowest point for women. Hips: widest point." },
    { q: "What is the difference between BMI and body fat percentage?", a: "<a href=\"/fitness/bmi-calculator\">BMI</a> measures weight relative to height and doesn't distinguish fat from muscle. Body fat percentage directly measures how much of your body weight is fat tissue — more accurate for athletes." },
    { q: "Is 20% body fat good for a man?", a: "20% body fat for a man sits at the upper end of the 'acceptable' range (18–24%). It's not a health risk on its own, but dropping to 14–17% (fitness range) is associated with better metabolic health and athletic performance. A 5% reduction from 20% typically requires a sustained calorie deficit of 300–500 kcal/day." },
    { q: "Is 25% body fat good for a woman?", a: "25% body fat for a woman is in the middle of the 'acceptable' range (25–31%) and is generally considered healthy with no elevated metabolic risk. The 'fitness' range of 21–24% is associated with better endurance and strength performance. Body fat alone doesn't determine health — muscle mass and waist circumference matter too." },
    { q: "Why does my body fat calculator give a different result to my scales?", a: "Smart scales use bioelectrical impedance (BIA), which is highly sensitive to hydration — a 1% change in hydration can shift the reading by 3–5%. The US Navy tape method used here relies on body measurements rather than electrical signals and is less affected by hydration. Neither method equals DEXA or hydrostatic weighing (the gold standard), but tape measurements are more consistent day to day." },
    { q: "How do I lower my body fat percentage fast?", a: "The most effective approach combines a moderate calorie deficit (300–500 kcal/day below your <a href=\"/fitness/tdee-calculator\">TDEE</a>), high protein intake (2.0–2.4 g/kg) to preserve muscle, and resistance training 3–4 times per week. Realistic rate: 0.5–1% body fat per month. Going faster usually means losing muscle alongside fat, which raises body fat % long-term." },
    { q: "What body fat percentage shows abs?", a: "Visible abs typically appear at under 15% for men and under 20% for women, though genetics, muscle thickness, and fat distribution vary. Clear six-pack definition usually requires under 12% (men) or 17% (women). At these levels a structured cut with tracking becomes important to avoid losing muscle." },
    { q: "How accurate is the US Navy body fat formula?", a: "The US Navy method has an error margin of approximately ±3–4% compared to DEXA scanning. It tends to underestimate body fat in very lean individuals and overestimate in people with higher body fat. For tracking progress over time it is reliable and consistent, even if the absolute number is slightly off." },
]

useCalcSEO(
    "Body Fat Calculator — Metric & Imperial | US Navy Method",
    "Free body fat percentage calculator using the US Navy formula. Enter measurements in cm or inches for men and women. Supports metric and imperial units.",
    faqs
)

useHead({
    script: [{
        type: 'application/ld+json',
        innerHTML: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'HowTo',
            name: 'How to Calculate Body Fat Percentage',
            description: 'Estimate body fat using the US Navy tape measurement method in cm or inches.',
            step: [
                { '@type': 'HowToStep', position: 1, name: 'Choose your unit system', text: 'Use the Metric / Imperial toggle at the bottom-left of the screen for cm or inch measurements.' },
                { '@type': 'HowToStep', position: 2, name: 'Select gender', text: 'Men need neck and waist measurements. Women also need hip measurement.' },
                { '@type': 'HowToStep', position: 3, name: 'Measure and enter height', text: 'Stand straight and measure your height in cm or inches.' },
                { '@type': 'HowToStep', position: 4, name: 'Measure and enter neck circumference', text: 'Measure just below the larynx, tape sloping slightly downward at the front.' },
                { '@type': 'HowToStep', position: 5, name: 'Measure waist (and hips for women)', text: 'Men: at the navel. Women: at the narrowest point. Hips (women): at the widest point.' },
                { '@type': 'HowToStep', position: 6, name: 'Click Calculate', text: 'Your estimated body fat percentage and category appear instantly.' },
            ],
        }),
    }],
})
</script>
