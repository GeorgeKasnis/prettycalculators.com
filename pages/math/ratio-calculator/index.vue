<template>
    <UiCalcPage title="Ratio Calculator" category="math" description-title="Simplify ratios and solve proportions">
        <template #calc>
            <CalculatorsMathRatioCalc />
        </template>
        <template #facts>
            <CalcFact label="Simplify"    value="Divide by GCF" />
            <CalcFact label="Proportion"  value="A:B = C:D" />
            <CalcFact label="Solve for D" value="D = B×C / A" />
            <CalcFact label="Equivalent"  value="Same ratio, scaled" />
        </template>
        <template #description>
            <p>
                The <strong>Ratio Calculator</strong> has two modes: <strong>Simplify</strong> a ratio to its lowest terms, or <strong>solve a proportion</strong> to find a missing value (A:B = C:?).
            </p>
            <p>
                A ratio expresses the relative sizes of two quantities. The ratio 6:9 and 2:3 represent the same relationship — one is just scaled up by 3. Ratios appear everywhere: cooking (2 cups flour to 1 cup water), maps (1:50,000), probability, and finance.
            </p>
            <p>
                <strong>Simplifying a ratio</strong> works exactly like simplifying a fraction: divide both parts by their Greatest Common Factor (GCF). For 6:9, GCF(6,9) = 3, so 6:9 simplifies to 2:3.
            </p>
            <p>
                <strong>Solving a proportion</strong> (A:B = C:D) uses cross-multiplication: D = (B × C) / A. This is essential for scaling recipes, converting units, reading maps, or solving similar-triangle problems in geometry.
            </p>
        </template>
        <template #example>
            <p>
                <strong>Simplify 24:36.</strong>
            </p>
            <p>GCF(24, 36) = 12. So 24:36 = <strong>2:3</strong>.</p>
            <p>
                <strong>Proportion: If 2:3 = 8:?, find the missing value.</strong>
            </p>
            <p>
                Using D = B × C / A: D = 3 × 8 / 2 = <strong>12</strong>.
            </p>
            <p>
                So 2:3 = 8:12. Both ratios simplify to 2:3, confirming the answer is correct.
            </p>
            <p>
                Real-world use: if a recipe calls for 2 cups of flour for every 3 cups of liquid, and you're scaling up to 8 cups of flour — you need <strong>12 cups of liquid</strong>.
            </p>
        </template>
    </UiCalcPage>
</template>

<script setup>
definePageMeta({ layout: 'brutalist' })
useCalcSEO(
    "Ratio Calculator — Simplify Ratios & Solve Proportions",
    "Free ratio calculator. Simplify any ratio to its lowest terms, or solve a proportion to find the missing value. Instant results with clear explanations.",
    [
        { q: "How do you simplify a ratio?", a: "Divide both parts of the ratio by their Greatest Common Factor (GCF). For example, to simplify 12:8, GCF(12,8) = 4, so 12:8 = 3:2." },
        { q: "How do you solve a proportion?", a: "Use cross-multiplication. If A:B = C:D, then D = (B × C) / A. For example, if 2:3 = 8:D, then D = (3×8)/2 = 12." },
        { q: "What is the difference between a ratio and a proportion?", a: "A ratio compares two quantities (e.g. 2:3). A proportion is an equation stating that two ratios are equal (e.g. 2:3 = 4:6). Solving a proportion means finding an unknown value." },
        { q: "Are 3:4 and 9:12 equivalent ratios?", a: "Yes. Dividing 9:12 by GCF(9,12) = 3 gives 3:4. Equivalent ratios have the same simplified form." },
    ]
)
</script>
