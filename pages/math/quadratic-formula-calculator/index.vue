<template>
    <UiCalcPage title="Quadratic Formula Calculator" category="math" description-title="Solve ax² + bx + c = 0 instantly">
        <template #calc>
            <CalculatorsMathQuadraticCalc />
        </template>
        <template #facts>
            <CalcFact label="Formula"       value="x = (−b ± √D) / 2a" />
            <CalcFact label="Discriminant"  value="D = b² − 4ac" />
            <CalcFact label="D > 0"         value="Two real roots" />
            <CalcFact label="D < 0"         value="Complex roots" />
        </template>
        <template #description>
            <p>
                The <strong>Quadratic Formula Calculator</strong> solves any quadratic equation of the form <strong>ax² + bx + c = 0</strong>. Enter the three coefficients a, b, and c, and it instantly finds both roots using the quadratic formula — showing each step clearly.
            </p>
            <p>
                The quadratic formula is: <em>x = (−b ± √(b² − 4ac)) / 2a</em>
            </p>
            <p>
                The key to understanding the result is the <strong>discriminant</strong> (D = b² − 4ac):
            </p>
            <ul>
                <li><strong>D &gt; 0</strong> — Two distinct real roots. The parabola crosses the x-axis at two points.</li>
                <li><strong>D = 0</strong> — One repeated real root. The parabola just touches the x-axis at one point (vertex on x-axis).</li>
                <li><strong>D &lt; 0</strong> — No real roots. The parabola doesn't cross the x-axis. The roots are complex numbers involving <em>i</em> (√−1).</li>
            </ul>
            <p>
                Quadratic equations appear in physics (projectile motion), economics (profit maximisation), engineering, and geometry. Mastering this formula is one of the most useful skills in mathematics.
            </p>
        </template>
        <template #example>
            <p>
                Solve <strong>x² − 5x + 6 = 0</strong> (a = 1, b = −5, c = 6).
            </p>
            <p>
                Step 1: Discriminant D = (−5)² − 4×1×6 = 25 − 24 = <strong>1</strong>.
            </p>
            <p>
                Step 2: Since D = 1 &gt; 0, there are two distinct real roots.
            </p>
            <p>
                Step 3: x = (5 ± √1) / 2 = (5 ± 1) / 2
            </p>
            <p>
                x₁ = (5 + 1) / 2 = <strong>3</strong>, x₂ = (5 − 1) / 2 = <strong>2</strong>
            </p>
            <p>
                Verification: (x−3)(x−2) = x² − 5x + 6 ✓
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
    { q: "What is the quadratic formula?", a: "The quadratic formula solves ax² + bx + c = 0: x = (−b ± √(b² − 4ac)) / 2a. It gives both roots (x₁ and x₂) of any quadratic equation." },
    { q: "What is the discriminant?", a: "The discriminant is D = b² − 4ac. If D > 0, there are two real roots. If D = 0, there is one repeated root. If D < 0, there are two complex (imaginary) roots and no real solutions." },
    { q: "Can every quadratic equation be solved with the formula?", a: "Yes. The quadratic formula works for any quadratic equation ax² + bx + c = 0 as long as a ≠ 0. It's more general than factoring, which only works for factorable equations." },
    { q: "What does it mean when a quadratic has complex roots?", a: "Complex roots occur when the discriminant D < 0. The roots contain the imaginary unit i (√−1). This means the parabola y = ax² + bx + c never crosses the x-axis." },
    { q: "How do I solve x² − 3x − 10 = 0?", a: "a=1, b=−3, c=−10. Discriminant D = (−3)² − 4(1)(−10) = 9 + 40 = 49. x = (3 ± √49) / 2 = (3 ± 7) / 2. So x₁ = (3+7)/2 = 5 and x₂ = (3−7)/2 = −2. Verification: (x−5)(x+2) = x² − 3x − 10 ✓." },
    { q: "What is the vertex of a parabola and how does it relate to the quadratic formula?", a: "The vertex is the highest or lowest point of a parabola y = ax² + bx + c. Its x-coordinate is −b/(2a) — exactly the midpoint of the two roots from the quadratic formula. The y-coordinate is found by substituting this x back into the equation. If a > 0, the vertex is a minimum; if a < 0, it's a maximum." },
    { q: "Why does the quadratic formula have a ± in it?", a: "The ± symbol accounts for both roots. Quadratic equations can have up to two solutions because a squared term (x²) can be satisfied by both a positive and negative value. The + gives the larger root and the − gives the smaller root (when the discriminant is positive)." },
    { q: "How do I know if I should factor or use the quadratic formula?", a: "Try factoring first if the coefficients are small integers — it's faster when it works. Use the quadratic formula when: the equation doesn't factor neatly, the coefficients are large or irrational, or you want the exact decimal values. The formula always works regardless of whether the equation is factorable." },
    { q: "What if a = 0 in the quadratic formula?", a: "If a = 0, the equation is no longer quadratic — it becomes linear (bx + c = 0), solved by x = −c/b. The quadratic formula requires a ≠ 0 because the formula divides by 2a. Setting a = 0 gives division by zero, which is undefined." },
]

useCalcSEO(
    "Quadratic Formula Calculator — Solve ax² + bx + c = 0",
    "Free quadratic formula calculator. Enter a, b and c to solve any quadratic equation. Shows both roots, the discriminant, and full step-by-step working.",
    faqs
)

useHead({
    script: [{
        type: 'application/ld+json',
        innerHTML: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'HowTo',
            name: 'How to Solve a Quadratic Equation',
            description: 'Use the quadratic formula to find the roots of ax² + bx + c = 0.',
            step: [
                { '@type': 'HowToStep', position: 1, name: 'Identify the coefficients', text: 'Write your equation in the form ax² + bx + c = 0 and identify the values of a, b, and c.' },
                { '@type': 'HowToStep', position: 2, name: 'Enter coefficient a', text: 'Type the value of a (the coefficient of x²) into the first field. a cannot be zero.' },
                { '@type': 'HowToStep', position: 3, name: 'Enter coefficients b and c', text: 'Type b (coefficient of x) and c (the constant term). Use negative values where needed.' },
                { '@type': 'HowToStep', position: 4, name: 'Click Solve', text: 'Both roots appear along with the discriminant value and step-by-step working.' },
            ],
        }),
    }],
})
</script>
