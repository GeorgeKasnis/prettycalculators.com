<template>
    <UiCalcPage title="Heart Rate Zone Calculator" category="fitness" description-title="Train smarter with your 5 heart rate zones">
        <template #calc>
            <CalculatorsFitnessHeartRateZoneCalc />
        </template>
        <template #facts>
            <CalcFact label="Zone 1" value="50–60% HRmax" />
            <CalcFact label="Zone 2" value="60–70% HRmax" />
            <CalcFact label="Fat burn zone" value="Zone 2–3" />
            <CalcFact label="Max HR formula" value="220 − age" />
        </template>
        <template #description>
            <p>
                Heart rate zones are intensity ranges that target different energy systems and fitness adaptations. Training across all five zones gives you a complete fitness programme — not just grinding at one pace.
            </p>
            <ul>
                <li><strong>Zone 1 (50–60%)</strong> — Active recovery. Keeps blood flowing without adding training stress.</li>
                <li><strong>Zone 2 (60–70%)</strong> — Aerobic base. The foundation of endurance. Burns fat as primary fuel.</li>
                <li><strong>Zone 3 (70–80%)</strong> — Tempo. Improves aerobic capacity and efficiency.</li>
                <li><strong>Zone 4 (80–90%)</strong> — Threshold. Increases lactate threshold and race pace.</li>
                <li><strong>Zone 5 (90–100%)</strong> — Maximum effort. Short sprints and intervals. Not sustainable for long.</li>
            </ul>
            <p>
                Max heart rate is estimated using <strong>220 − age</strong>, which is accurate for most people. For a precise reading, do a field test: warm up, then run or cycle as hard as you can for 3–4 minutes and note your peak HR.
            </p>
        </template>
        <template #example>
            <p>A <strong>32-year-old</strong> with resting HR of 62 bpm:</p>
            <p>Max HR = 220 − 32 = <strong>188 bpm</strong></p>
            <p>Zone 2 = 60–70% of 188 = <strong>113–132 bpm</strong></p>
            <p>Zone 4 = 80–90% of 188 = <strong>150–169 bpm</strong></p>
        </template>
        <template #faq>
            <CalcFaq :faqs="faqs" />
        </template>
    </UiCalcPage>
</template>

<script setup>
definePageMeta({ layout: 'brutalist' })

const faqs = [
    { q: "What are heart rate zones?", a: "Heart rate zones are percentage ranges of your maximum heart rate, each associated with a different training intensity and physiological benefit. Most systems use 5 zones, from easy recovery (Zone 1) to all-out maximum effort (Zone 5)." },
    { q: "How is max heart rate calculated?", a: "The standard formula is 220 minus your age. This is a population average and has an error range of about ±10–12 bpm. A more accurate alternative is 208 − (0.7 × age), or performing a max effort field test with a heart rate monitor." },
    { q: "What is Zone 2 training and why is it popular?", a: "Zone 2 (60–70% of max HR) is steady aerobic effort where you can hold a conversation. It builds your aerobic base, trains fat oxidation, and improves mitochondrial density. Endurance coaches like Dr. Iñigo San Millán advocate for a large proportion of training in Zone 2." },
    { q: "How much time should I spend in each zone?", a: "For general fitness, a polarised approach works well: roughly 80% of training in Zones 1–2 and 20% in Zones 4–5. Zone 3 ('grey zone') often gets overused — it's hard enough to accumulate fatigue but not intense enough for the top adaptations." },
    { q: "Can I use heart rate zones on any exercise?", a: "Yes — running, cycling, rowing, swimming, and elliptical training all respond to HR zone training. Note that upper body exercises tend to produce lower heart rates than lower body, and swimming HR runs about 10–15 bpm lower than running." },
    { q: "What is the lactate threshold and which zone is it?", a: "Lactate threshold (LT) is the intensity at which lactate starts accumulating faster than it can be cleared. It roughly corresponds to Zone 3–4 boundary, around 80–85% of max HR for trained athletes. Training at and around this threshold raises it, allowing you to sustain higher efforts for longer." },
    { q: "Do heart rate zones change as I get fitter?", a: "Your zones in beats per minute stay roughly the same (since they're based on max HR), but what you can do at each zone improves. As you get fitter, you can run faster or produce more power while staying in Zone 2 — that's the adaptation you're training for." },
    { q: "Is it bad to always train in Zone 5?", a: "Yes. Training too frequently in Zone 5 without adequate recovery leads to overtraining syndrome, increased injury risk, and performance stagnation. Zone 5 work is powerful but requires significant recovery time. Limit true Zone 5 sessions to 1–2 per week at most." },
    { q: "What is resting heart rate and how does it affect zones?", a: "Resting heart rate is your heart rate at complete rest, typically measured in the morning. While the Karvonen method uses resting HR to calculate zones (heart rate reserve), the simpler percentage-of-max approach used here is more widely adopted and easier to apply in the field." },
    { q: "How do I use heart rate zones on a smartwatch?", a: "Most GPS watches (Garmin, Polar, Apple Watch, Wahoo) let you set custom HR zones. Enter your max HR and the watch calculates zones automatically. Some use the 220-age formula by default — check your settings and update with a field-tested max HR for better accuracy." },
]

useCalcSEO(
    "Heart Rate Zone Calculator — 5 Training Zones by Age",
    "Free heart rate zone calculator. Enter your age to get your 5 personalised HR training zones — from recovery to maximum effort.",
    faqs
)
</script>
