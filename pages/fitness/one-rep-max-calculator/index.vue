<template>
    <UiCalcPage title="One Rep Max Calculator" category="fitness" description-title="Your maximum strength, calculated">
        <template #calc>
            <CalculatorsFitnessOneRepMaxCalc />
        </template>
        <template #facts>
            <CalcFact label="Formula" value="Epley: w × (1 + r/30)" />
            <CalcFact label="95% 1RM" value="1–2 reps" />
            <CalcFact label="80% 1RM" value="~6 reps" />
            <CalcFact label="60% 1RM" value="~15 reps" />
        </template>
        <template #description>
            <p>
                The <strong>One Rep Max (1RM) Calculator</strong> estimates the maximum weight you could lift for a single repetition of any exercise — the gold standard measure of strength in powerlifting and weightlifting. Knowing your 1RM lets you program workouts precisely, track progress over time, and compare your strength relative to your body weight.
            </p>
            <p>
                This calculator uses the <strong>Epley formula</strong>, one of the most widely validated equations in sports science: <em>1RM = weight × (1 + reps / 30)</em>. If you perform a single rep, your 1RM is simply the weight lifted. The formula becomes increasingly accurate between 2 and 10 reps — results above 12 reps are estimates only.
            </p>
            <p>
                Once you have your 1RM, the training percentage table gives you instant guidance on what weight to use for different rep ranges:
            </p>
            <ul>
                <li><strong>90–95% 1RM</strong> — Maximal strength work, 1–3 reps. Central nervous system training.</li>
                <li><strong>75–85% 1RM</strong> — Hypertrophy zone, 5–8 reps. Best range for muscle growth.</li>
                <li><strong>60–70% 1RM</strong> — Endurance and technique work, 10–15 reps.</li>
            </ul>
            <p>
                Always warm up thoroughly before attempting near-maximal lifts, and consider having a spotter present. The 1RM is a training tool — never sacrifice form to hit a number.
            </p>
        </template>
        <template #example>
            <p>
                Suppose you bench press <strong>80 kg</strong> for <strong>5 reps</strong>. Using the Epley formula:
            </p>
            <p>
                <em>1RM = 80 × (1 + 5/30) = 80 × 1.167 ≈ 93.3 kg</em>
            </p>
            <p>
                Your estimated one rep max is <strong>93 kg</strong>. From there, the training table tells you:
            </p>
            <ul>
                <li>95% = 88.5 kg — for singles and doubles (strength peaking)</li>
                <li>80% = 74.7 kg — for sets of 6 (hypertrophy)</li>
                <li>70% = 65.3 kg — for sets of 10 (volume work)</li>
            </ul>
            <p>
                Use these percentages when following structured programs like 5/3/1, Starting Strength, or any percentage-based programming to ensure every session is appropriately loaded.
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
    { q: "What is a one rep max (1RM)?", a: "A one rep max is the maximum weight you can lift for a single repetition with proper form. It's the standard measure of absolute strength in powerlifting and weightlifting." },
    { q: "How is one rep max calculated?", a: "This calculator uses the Epley formula: 1RM = weight × (1 + reps ÷ 30). For example, lifting 80 kg for 5 reps gives an estimated 1RM of 80 × 1.167 ≈ 93 kg. The formula works identically in lbs." },
    { q: "How do I calculate 1RM in pounds?", a: "Select Imperial using the toggle at the bottom-left of the screen. Enter your working weight in lbs and the reps performed — your 1RM and the entire training weight table will display in lbs." },
    { q: "How accurate is the 1RM calculator?", a: "The Epley formula is most accurate between 2 and 10 reps. Results from sets over 12 reps are less reliable as fatigue plays a bigger role. Always treat the result as an estimate." },
    { q: "What percentage of 1RM should I train at?", a: "For strength (1–5 reps), use 85–95% of your 1RM. For hypertrophy (6–12 reps), use 65–85%. For muscular endurance (12+ reps), use 50–65% of your 1RM." },
    { q: "What is a good bench press 1RM for a beginner?", a: "For men just starting out, a bench press 1RM of 0.5–0.75× body weight is typical. After 6–12 months of consistent training, reaching 1× body weight is achievable. Elite natural lifters may hit 1.5–2× body weight. Beginners should build form before testing 1RM." },
    { q: "What is a good squat 1RM?", a: "Beginner men typically squat 1–1.25× body weight; intermediate 1.5–2×; advanced 2.5×+. For women, beginner: 0.75×; intermediate: 1.25×; advanced: 1.75×+. These are general strength standards — focus on progress relative to yourself rather than comparisons." },
    { q: "How often should I test my 1RM?", a: "Testing a true 1RM every 4–8 weeks is typical in powerlifting programs. More frequent testing risks injury and slows long-term progress. For most gym-goers, estimating 1RM from heavy sets of 3–5 reps (which is what this calculator does) is safer and nearly as accurate." },
    { q: "Why does my estimated 1RM differ from my actual max?", a: "The Epley formula is an estimate based on average endurance-to-strength ratios. If you're a powerlifter who trains heavy singles, your actual 1RM may be higher than the formula predicts. If you mostly train with high reps (12+), your actual 1RM may be lower. Individual training history affects the accuracy significantly." },
    { q: "Is it safe to attempt a true 1RM lift?", a: "With proper preparation it can be done safely: warm up thoroughly with progressively heavier singles, use a spotter for bench and squat, never lift to failure on setup lifts, and stop if form breaks down. Many experienced lifters prefer to use calculator estimates rather than risk injury on true max attempts." },
]

useCalcSEO(
    "One Rep Max Calculator — kg & lbs | Epley Formula",
    "Free 1RM calculator in kg or lbs using the Epley formula. Enter weight lifted and reps to estimate your one rep max and get a full training weight guide.",
    faqs
)

useHead({
    script: [{
        type: 'application/ld+json',
        innerHTML: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'HowTo',
            name: 'How to Calculate Your One Rep Max (1RM)',
            description: 'Estimate your one rep max using the Epley formula in kg or lbs.',
            step: [
                { '@type': 'HowToStep', position: 1, name: 'Choose your unit system', text: 'Use the Metric / Imperial toggle at the bottom-left of the screen. The result table will show kg or lbs to match.' },
                { '@type': 'HowToStep', position: 2, name: 'Enter the weight you lifted', text: 'Enter the load from your working set in kg or lbs.' },
                { '@type': 'HowToStep', position: 3, name: 'Enter the number of reps', text: 'Enter how many reps you performed. The Epley formula is most accurate between 2 and 10 reps.' },
                { '@type': 'HowToStep', position: 4, name: 'Click Calculate 1RM', text: 'Your estimated one rep max appears along with a training weight guide for all rep ranges.' },
            ],
        }),
    }],
})
</script>
