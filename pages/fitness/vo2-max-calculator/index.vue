<template>
    <UiCalcPage title="VO2 Max Calculator" category="fitness" description-title="Estimate your aerobic fitness level">
        <template #calc>
            <CalculatorsFitnessVo2MaxCalc />
        </template>
        <template #facts>
            <CalcFact label="Poor"      value="< 30 ml/kg/min" />
            <CalcFact label="Good"      value="44–52 ml/kg/min" />
            <CalcFact label="Excellent" value="52+ ml/kg/min" />
            <CalcFact label="Elite runners" value="70–85+" />
        </template>
        <template #description>
            <p>
                <strong>VO2 Max</strong> (maximal oxygen uptake) is the maximum rate at which your body can consume oxygen during intense exercise. It's the gold standard measure of cardiovascular fitness — the higher the number, the more efficient your heart and muscles are at using oxygen.
            </p>
            <p>
                This calculator uses the <strong>Uth-Sørensen-Overgaard-Pedersen formula</strong>: <em>VO2max ≈ 15 × (HRmax / HRrest)</em>, where HRmax is estimated as 220 − age. It requires only your age and resting heart rate, making it accessible without lab equipment.
            </p>
            <p>
                Take your resting heart rate first thing in the morning before getting out of bed for the most accurate result. Count beats for 60 seconds or use a heart rate monitor.
            </p>
        </template>
        <template #example>
            <p>A 35-year-old with a resting heart rate of <strong>58 bpm</strong>:</p>
            <p>HRmax = 220 − 35 = <strong>185 bpm</strong></p>
            <p>VO2max = 15 × (185 ÷ 58) = 15 × 3.19 = <strong>47.8 ml/kg/min</strong></p>
            <p>This falls in the <strong>Good</strong> range for most adult age groups.</p>
        </template>
        <template #faq>
            <CalcFaq :faqs="faqs" />
        </template>
    </UiCalcPage>
</template>

<script setup>
definePageMeta({ layout: 'brutalist' })

const faqs = [
    { q: "What is VO2 max?", a: "VO2 max is the maximum volume of oxygen (in millilitres) your body can use per kilogram of body weight per minute during maximal exercise. It's the most widely used measure of aerobic fitness and cardiovascular health." },
    { q: "What is a good VO2 max?", a: "For untrained adults: below 35 ml/kg/min is poor, 35–45 is average, 45–55 is good, and above 55 is excellent. Elite endurance athletes often exceed 70 ml/kg/min. Norms differ by age and sex — younger people and men typically have higher values." },
    { q: "How do I measure my resting heart rate?", a: "Measure your resting heart rate first thing in the morning before getting out of bed. Lie still and count your heartbeats for 60 seconds. A heart rate monitor or fitness tracker gives a more consistent reading over multiple days. A healthy resting HR is typically 60–80 bpm." },
    { q: "How accurate is the heart rate formula?", a: "The Uth-Sørensen formula gives a reasonable estimate — studies show it correlates well with lab-measured VO2 max (r ≈ 0.82). For a true reading, you'd need a graded exercise test (VO2 max test) on a treadmill or cycle ergometer with gas analysis equipment." },
    { q: "Can I improve my VO2 max?", a: "Yes. VO2 max is highly trainable. High-intensity interval training (HIIT) and long steady-state aerobic exercise both improve it. Studies show 8–12 weeks of consistent cardio training can raise VO2 max by 10–25% in sedentary individuals." },
    { q: "Does VO2 max decline with age?", a: "Yes, VO2 max declines roughly 1% per year after age 25 in sedentary people. Regular aerobic exercise significantly slows this decline. Active 60-year-olds can have higher VO2 max values than sedentary 30-year-olds." },
    { q: "What sports benefit most from a high VO2 max?", a: "Endurance sports benefit most: marathon running, cycling, cross-country skiing, triathlon, and rowing. World-class cyclists like Tadej Pogačar have measured VO2 max values above 90 ml/kg/min. Team sports like football and basketball also benefit from higher aerobic capacity." },
    { q: "Why is VO2 max important for health?", a: "Beyond athletic performance, a higher VO2 max is linked to lower risk of cardiovascular disease, type 2 diabetes, and all-cause mortality. Even moving from the 'poor' to 'fair' fitness category has a significant health impact — some studies show a 15–20% reduction in mortality risk." },
    { q: "What is the difference between VO2 max and lactate threshold?", a: "VO2 max is the ceiling of your aerobic capacity — the maximum oxygen you can use. Lactate threshold is the intensity at which lactic acid begins to accumulate faster than it can be cleared. Well-trained athletes can sustain exercise close to their lactate threshold for long periods, even if their VO2 max isn't elite." },
    { q: "How does resting heart rate affect VO2 max?", a: "A lower resting heart rate generally indicates a more efficient heart — it pumps more blood per beat (higher stroke volume). This is why endurance athletes often have resting HRs of 40–50 bpm. In the formula VO2max = 15 × (HRmax / HRrest), a lower resting HR directly increases the estimated VO2 max." },
]

useCalcSEO(
    "VO2 Max Calculator — Estimate Your Aerobic Fitness",
    "Free VO2 max calculator. Enter your age and resting heart rate to estimate your maximal oxygen uptake and cardiovascular fitness level.",
    faqs
)
</script>
