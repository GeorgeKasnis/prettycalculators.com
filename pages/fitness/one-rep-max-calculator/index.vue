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
    </UiCalcPage>
</template>

<script setup>
definePageMeta({ layout: 'brutalist' })
useCalcSEO(
    "One Rep Max Calculator — Estimate Your 1RM Instantly",
    "Free one rep max calculator using the Epley formula. Enter weight and reps to find your 1RM and get a full training weight guide for all rep ranges.",
    [
        { q: "What is a one rep max (1RM)?", a: "A one rep max is the maximum weight you can lift for a single repetition with proper form. It's the standard measure of absolute strength in strength sports." },
        { q: "How is one rep max calculated?", a: "The most common formula is the Epley formula: 1RM = weight × (1 + reps ÷ 30). For example, lifting 80 kg for 5 reps gives an estimated 1RM of about 93 kg." },
        { q: "How accurate is the 1RM calculator?", a: "The Epley formula is most accurate between 2 and 10 reps. Results from sets over 12 reps are less reliable as fatigue plays a bigger role. Always treat the result as an estimate." },
        { q: "What percentage of 1RM should I train at?", a: "For strength (1–5 reps), use 85–95% of your 1RM. For hypertrophy (6–12 reps), use 65–85%. For muscular endurance (12+ reps), use 50–65% of your 1RM." },
    ]
)
</script>
