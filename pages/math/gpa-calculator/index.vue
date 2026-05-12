<template>
    <UiCalcPage title="GPA Calculator" category="math" description-title="Calculate your cumulative GPA on the 4.0 scale">
        <template #calc>
            <CalculatorsMathGpaCalc />
        </template>
        <template #facts>
            <CalcFact label="A grade"        value="4.0 points" />
            <CalcFact label="B grade"        value="3.0 points" />
            <CalcFact label="Magna Cum Laude" value="≥ 3.7 GPA" />
            <CalcFact label="Summa Cum Laude" value="≥ 3.9 GPA" />
        </template>
        <template #description>
            <p>
                The <strong>GPA calculator</strong> computes your cumulative grade point average on the standard US <strong>4.0 scale</strong>. Add up to 20 courses with their letter grades and credit hours — the calculator weights each grade by credits and gives you your exact GPA, the letter grade equivalent, and a breakdown by grade.
            </p>

            <h3>The GPA formula</h3>
            <p>
                GPA is a <strong>weighted average</strong> — courses worth more credits count more toward your final GPA:
            </p>
            <p><strong>GPA = Σ (grade points × credit hours) ÷ Σ (credit hours)</strong></p>
            <p>
                For example: A (4.0) in a 3-credit course + B+ (3.3) in a 4-credit course = (4.0 × 3 + 3.3 × 4) ÷ 7 = (12 + 13.2) ÷ 7 = <strong>3.60 GPA</strong>.
            </p>

            <h3>Letter grade to GPA points — 4.0 scale</h3>
            <table class="gpa-ref-table">
                <thead>
                    <tr><th>Letter grade</th><th>GPA points</th><th>Percentage (typical)</th></tr>
                </thead>
                <tbody>
                    <tr><td>A+ / A</td><td>4.0</td><td>93–100%</td></tr>
                    <tr><td>A−</td>    <td>3.7</td><td>90–92%</td></tr>
                    <tr><td>B+</td>    <td>3.3</td><td>87–89%</td></tr>
                    <tr><td>B</td>     <td>3.0</td><td>83–86%</td></tr>
                    <tr><td>B−</td>    <td>2.7</td><td>80–82%</td></tr>
                    <tr><td>C+</td>    <td>2.3</td><td>77–79%</td></tr>
                    <tr><td>C</td>     <td>2.0</td><td>73–76%</td></tr>
                    <tr><td>C−</td>    <td>1.7</td><td>70–72%</td></tr>
                    <tr><td>D+</td>    <td>1.3</td><td>67–69%</td></tr>
                    <tr><td>D</td>     <td>1.0</td><td>63–66%</td></tr>
                    <tr><td>D−</td>    <td>0.7</td><td>60–62%</td></tr>
                    <tr><td>F</td>     <td>0.0</td><td>Below 60%</td></tr>
                </tbody>
            </table>

            <h3>What is a good GPA?</h3>
            <ul>
                <li><strong>4.0</strong> — Perfect GPA. All A's (or A+'s at schools that award 4.0 for both).</li>
                <li><strong>3.7–3.99</strong> — Excellent. Typically qualifies for Magna Cum Laude or Dean's List honours.</li>
                <li><strong>3.5–3.69</strong> — Very good. Strong enough for most graduate school applications and competitive employers.</li>
                <li><strong>3.0–3.49</strong> — Good. Above the national average. Acceptable for most employers; may limit top grad school options.</li>
                <li><strong>2.5–2.99</strong> — Average. May limit options for competitive programs or employers with GPA cutoffs (many set 3.0 minimum).</li>
                <li><strong>Below 2.0</strong> — Academic probation at many schools. Below the minimum for graduation at some institutions.</li>
            </ul>

            <h3>Latin honours thresholds (typical)</h3>
            <ul>
                <li><strong>Cum Laude</strong> ("with honour") — typically ≥ 3.5 GPA</li>
                <li><strong>Magna Cum Laude</strong> ("with great honour") — typically ≥ 3.7 GPA</li>
                <li><strong>Summa Cum Laude</strong> ("with highest honour") — typically ≥ 3.9 GPA</li>
            </ul>
            <p>
                Exact thresholds vary by institution. Some schools use class rank percentiles rather than fixed GPA cutoffs. Always verify with your school's registrar.
            </p>
        </template>
        <template #example>
            <p>
                A student has completed 5 courses this semester:
            </p>
            <ul>
                <li>Calculus II — <strong>A</strong> — 4 credits</li>
                <li>English Composition — <strong>B+</strong> — 3 credits</li>
                <li>Chemistry — <strong>B</strong> — 4 credits</li>
                <li>History — <strong>A−</strong> — 3 credits</li>
                <li>PE — <strong>A</strong> — 1 credit</li>
            </ul>
            <p>
                Quality points: (4.0 × 4) + (3.3 × 3) + (3.0 × 4) + (3.7 × 3) + (4.0 × 1) = 16 + 9.9 + 12 + 11.1 + 4 = <strong>53.0</strong>.
                Total credits: 4 + 3 + 4 + 3 + 1 = <strong>15</strong>.
                GPA = 53.0 ÷ 15 = <strong>3.53</strong> — letter equivalent: A−. Strong semester — Magna Cum Laude territory.
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
    { q: "What is a 3.5 GPA equivalent to in letter grades?", a: "A 3.5 GPA falls between A− (3.7) and B+ (3.3) on the 4.0 scale, roughly equivalent to an A−/B+ average. It represents excellent academic performance — above a B+ average but just below a pure A− average. Many universities recognise 3.5+ GPA for Dean's List and Magna Cum Laude candidacy." },
    { q: "How do I calculate my GPA with different credit hours?", a: "Multiply each course grade (in GPA points) by its credit hours to get quality points. Sum all quality points and divide by total credit hours. Example: A (4.0) in 3 credits + B (3.0) in 4 credits = (12 + 12) ÷ 7 = 3.43 GPA. Courses with more credits have a bigger impact on your overall GPA." },
    { q: "What GPA is needed for medical school?", a: "Most US medical schools require a minimum GPA of 3.0, but competitive applicants typically have 3.7+ science GPA and 3.7+ overall GPA. Top schools (Harvard, Hopkins, Stanford) typically matriculate students with 3.9+ GPAs. MCAT scores, research experience, and letters of recommendation also weigh heavily." },
    { q: "Does an A+ count as a 4.0 or higher for GPA?", a: "In most US universities, both A and A+ receive 4.0 grade points — there is no 4.3 or 4.33 distinction. Some schools do award A+ = 4.3 on a modified scale, but the standard 4.0 scale treats A and A+ identically. This calculator uses the standard 4.0 scale where A+ = A = 4.0." },
    { q: "What is the minimum GPA to graduate college?", a: "Most US colleges require a minimum 2.0 GPA (C average) to graduate. Some competitive programs (engineering, nursing, pre-med) may require 2.5 or 3.0. Graduate school typically requires maintaining a 3.0 GPA. Falling below the minimum puts students on academic probation, which can lead to suspension if not improved." },
    { q: "How much does one bad grade affect your GPA?", a: "It depends on credit hours and your existing GPA. One F (0.0) in a 3-credit course added to a 3.5 GPA over 30 existing credits: new quality points = (3.5 × 30 + 0 × 3) ÷ 33 = 105 ÷ 33 = 3.18. A single F can drop a 3.5 GPA to 3.18 — about 0.32 points. Higher-credit courses have a proportionally larger impact." },
    { q: "What is a 4.0 GPA on a percentage scale?", a: "A 4.0 GPA corresponds to A or A+ grades, typically 93–100% at most institutions. However, GPA-to-percentage conversion varies by school. A 3.0 (B average) is typically 83–86%, and a 2.0 (C average) is typically 73–76%. The calculator works from letter grades directly so no percentage conversion is needed." },
    { q: "What grades do I need to get a 3.0 GPA this semester?", a: "It depends on how many credits you're taking and what your current GPA is. If you're taking 15 credits and want a semester GPA of exactly 3.0, you need an average of B (3.0) across all courses. Mix of A's and C's can average to 3.0: e.g., two A's (4.0) in 3-credit courses and three C's (2.0) in 3-credit courses = (24 + 18) ÷ 15 = 2.8. Enter your individual grades above to see the exact result." },
    { q: "Is a 3.2 GPA good for law school?", a: "A 3.2 GPA is below the median for most law schools. Top-25 US law schools typically have median GPAs of 3.7–3.9. Regional and lower-ranked schools often admit students with 3.0–3.3. LSAT score can partially compensate — a high LSAT (170+) can offset a GPA in the 3.2–3.5 range at many programs." },
    { q: "How many A's do I need to raise my GPA from 2.5 to 3.0?", a: "It depends on your total credits. If you have 60 credits at a 2.5 GPA (150 quality points), to reach 3.0 you need: (total credits × 3.0 − 150) more quality points. If you take 30 more credits of all A's: (90 × 3.0) ÷ 90 + 60 = but with As: (150 + 30×4.0) ÷ 90 = 270 ÷ 90 = 3.0. Generally the further behind you are and the fewer credits remain, the harder it is to raise a GPA significantly." },
]

useCalcSEO(
    "GPA Calculator — US 4.0 Scale with Letter Grades & Credit Hours",
    "Free GPA calculator for US college students. Add your courses, letter grades (A, B+, C, etc.) and credit hours to calculate your cumulative GPA on the 4.0 scale instantly.",
    faqs
)

useHead({
    script: [{
        type: 'application/ld+json',
        innerHTML: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'HowTo',
            name: 'How to Calculate Your GPA',
            description: 'Calculate your cumulative GPA on the 4.0 scale using letter grades and credit hours.',
            step: [
                { '@type': 'HowToStep', position: 1, name: 'Enter your courses', text: 'For each course, optionally type the course name. You start with 4 rows — click "+ Add Course" for more, up to 20 total.' },
                { '@type': 'HowToStep', position: 2, name: 'Select the letter grade', text: 'Use the Grade dropdown on each row to select your letter grade: A+, A, A−, B+, B, B−, C+, C, C−, D+, D, D−, or F.' },
                { '@type': 'HowToStep', position: 3, name: 'Enter credit hours', text: 'Enter the number of credit hours for each course. Most university courses are 3 credits; labs and seminars are often 1–2 credits.' },
                { '@type': 'HowToStep', position: 4, name: 'Click Calculate GPA', text: 'Your GPA on the 4.0 scale appears, along with the letter equivalent, total credit hours, total quality points, and a grade breakdown table.' },
            ],
        }),
    }],
})
</script>

<style scoped>
.gpa-ref-table {
    width: 100%;
    border-collapse: collapse;
    margin: 12px 0 20px;
    font-size: 14px;
}
.gpa-ref-table th,
.gpa-ref-table td {
    padding: 8px 12px;
    text-align: left;
    border: 1.5px solid rgba(10, 10, 10, 0.15);
}
.gpa-ref-table thead th {
    background: #0a0a0a;
    color: #fff;
    font-family: 'Space Mono', monospace;
    font-size: 10px;
    text-transform: uppercase;
    letter-spacing: 0.08em;
}
.gpa-ref-table tbody tr:nth-child(even) {
    background: rgba(10, 10, 10, 0.03);
}
</style>
