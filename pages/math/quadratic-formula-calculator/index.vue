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
    </UiCalcPage>
</template>

<script setup>
definePageMeta({ layout: 'brutalist' })
useCalcSEO(
    "Quadratic Formula Calculator — Solve ax² + bx + c = 0",
    "Free quadratic formula calculator. Enter a, b and c to solve any quadratic equation. Shows both roots, the discriminant, and full step-by-step working.",
    [
        { q: "What is the quadratic formula?", a: "The quadratic formula solves ax² + bx + c = 0: x = (−b ± √(b² − 4ac)) / 2a. It gives both roots (x₁ and x₂) of any quadratic equation." },
        { q: "What is the discriminant?", a: "The discriminant is D = b² − 4ac. If D > 0, there are two real roots. If D = 0, there is one repeated root. If D < 0, there are two complex (imaginary) roots and no real solutions." },
        { q: "Can every quadratic equation be solved with the formula?", a: "Yes. The quadratic formula works for any quadratic equation ax² + bx + c = 0 as long as a ≠ 0. It's more general than factoring, which only works for factorable equations." },
        { q: "What does it mean when a quadratic has complex roots?", a: "Complex roots occur when the discriminant D < 0. The roots contain the imaginary unit i (√−1). This means the parabola y = ax² + bx + c never crosses the x-axis." },
    ]
)
</script>
