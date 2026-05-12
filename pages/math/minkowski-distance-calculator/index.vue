<template>
    <UiCalcPage title="Minkowski Distance Calculator" category="math" description-title="The generalised distance metric that contains Manhattan, Euclidean & Chebyshev">
        <template #calc>
            <CalculatorsMathMinkowskiDistanceCalc />
        </template>
        <template #facts>
            <CalcFact label="Also known as"  value="Lp norm / p-norm distance" />
            <CalcFact label="Formula"        value="(Σ|aᵢ−bᵢ|ᵖ)^(1/p)" />
            <CalcFact label="p=1"            value="Manhattan distance" />
            <CalcFact label="p=2"            value="Euclidean distance" />
        </template>
        <template #description>
            <p>
                The <strong>Minkowski Distance Calculator</strong> computes the generalised Lp distance between two points. By changing the order parameter p, you get a complete family of distance metrics — including <a href="/math/manhattan-distance-calculator">Manhattan</a> (p=1), <a href="/math/euclidean-distance-calculator">Euclidean</a> (p=2), and <a href="/math/chebyshev-distance-calculator">Chebyshev</a> (p→∞) as special cases.
            </p>
            <p>
                The formula is: <strong>d(A,B) = (Σ|aᵢ−bᵢ|ᵖ)^(1/p)</strong>. As p increases, larger differences contribute disproportionately more to the result. At p=1 all differences contribute equally (Manhattan); at p=2 differences are squared before summing (Euclidean); as p→∞ the largest difference completely dominates (Chebyshev).
            </p>
            <p>
                Why Minkowski matters:
            </p>
            <ul>
                <li><strong>Unifies the distance family</strong> — one formula explains Manhattan, Euclidean, and Chebyshev.</li>
                <li><strong>Machine learning flexibility</strong> — kNN with Minkowski distance lets you tune p as a hyperparameter to find the best metric for your data.</li>
                <li><strong>Fractional p values</strong> — values between 0 and 1 create non-metric distances used in sparse data settings.</li>
            </ul>
        </template>
        <template #example>
            <p>
                <strong>Points A=(1,2) and B=(4,6), varying p:</strong>
            </p>
            <p>
                p=1 (Manhattan): |4−1| + |6−2| = 3 + 4 = <strong>7</strong>.<br>
                p=2 (Euclidean): √(3² + 4²) = √25 = <strong>5</strong>.<br>
                p=3: (3³ + 4³)^(1/3) = (27+64)^(1/3) = 91^(1/3) ≈ <strong>4.498</strong>.<br>
                p→∞ (Chebyshev): max(3, 4) = <strong>4</strong>.
            </p>
            <p>
                Notice how the distance decreases as p increases — higher p values give more weight to the dominant dimension and shrink the total.
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
    { q: "What is Minkowski distance?", a: "Minkowski distance is a generalised metric that unifies several common distance measures under one formula: d(A,B) = (Σ|aᵢ−bᵢ|ᵖ)^(1/p). The parameter p controls the shape of the distance. At p=1 it equals Manhattan distance, at p=2 it equals Euclidean distance, and as p→∞ it converges to Chebyshev distance." },
    { q: "What is the Minkowski distance formula?", a: "d(A, B) = (Σᵢ |aᵢ − bᵢ|ᵖ)^(1/p), where p > 0 is the order parameter and the sum runs over all dimensions. For 2D points: d = (|x₂−x₁|ᵖ + |y₂−y₁|ᵖ)^(1/p). Setting p=1 gives Manhattan, p=2 gives Euclidean, p=∞ gives Chebyshev." },
    { q: "What is the difference between Minkowski distance and Euclidean distance?", a: "Euclidean distance is a special case of Minkowski distance with p=2. Minkowski is the generalisation: it covers Euclidean (p=2), <a href='/math/manhattan-distance-calculator'>Manhattan</a> (p=1), and <a href='/math/chebyshev-distance-calculator'>Chebyshev</a> (p→∞). Setting p=2 in this calculator produces exactly the same result as our <a href='/math/euclidean-distance-calculator'>Euclidean distance calculator</a>." },
    { q: "How does p affect Minkowski distance?", a: "As p increases from 1 to ∞: the distance decreases (or stays the same); the dominant axis has more influence; the unit ball changes shape from a square (p=1, rotated 45°) to a circle (p=2) to a square aligned with the axes (p→∞). For p < 1, the formula no longer satisfies the triangle inequality and is not a true metric — but is used in sparse data analysis." },
    { q: "What is the Lp norm?", a: "The Lp norm of a vector v is ‖v‖ₚ = (Σ|vᵢ|ᵖ)^(1/p). Minkowski distance is the Lp norm of the difference vector (A−B). Common norms: L1 (sum of absolute values), L2 (Euclidean length), L∞ (maximum absolute value). In machine learning, L1 and L2 regularisation use these norms to penalise model complexity." },
    { q: "How is Minkowski distance used in machine learning?", a: "Minkowski distance with tunable p is used in kNN (k-nearest neighbours) as a hyperparameter. Scikit-learn's KNeighborsClassifier accepts a metric='minkowski' parameter with p=1 (Manhattan), p=2 (Euclidean, default), or any other positive value. Tuning p via cross-validation can improve classification accuracy when the optimal distance metric is unknown." },
    { q: "What value of p should I use?", a: "p=2 (Euclidean) is the default and works well for continuous data in low dimensions. p=1 (Manhattan) is more robust to outliers and works better in high-dimensional spaces (less affected by the curse of dimensionality). p→∞ (Chebyshev) is useful when the worst-case axis deviation matters most. Fractional p (0 < p < 1) creates non-metric 'distances' useful for very sparse data." },
    { q: "How does Minkowski distance relate to Manhattan and Chebyshev?", a: "All three are part of the same Lp family. Manhattan = Minkowski(p=1) = L1 norm. Euclidean = Minkowski(p=2) = L2 norm. Chebyshev = limit of Minkowski as p→∞ = L∞ norm. This means you can smoothly interpolate between them by varying p. Use our <a href='/math/manhattan-distance-calculator'>Manhattan</a>, <a href='/math/euclidean-distance-calculator'>Euclidean</a>, and <a href='/math/chebyshev-distance-calculator'>Chebyshev</a> calculators to explore each special case." },
]

useCalcSEO(
    "Minkowski Distance Calculator — Generalised Lp Distance (Manhattan, Euclidean, Chebyshev)",
    "Free Minkowski distance calculator. Enter two points and an order p to compute the Lp distance. p=1 gives Manhattan, p=2 gives Euclidean, p→∞ gives Chebyshev — all in one tool.",
    faqs
)

useHead({
    script: [{
        type: 'application/ld+json',
        innerHTML: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'HowTo',
            name: 'How to Calculate Minkowski Distance',
            description: 'Compute the generalised Lp distance between two points by selecting the order p.',
            step: [
                { '@type': 'HowToStep', position: 1, name: 'Select dimensions', text: 'Choose 1D, 2D, 3D, or 4D.' },
                { '@type': 'HowToStep', position: 2, name: 'Enter the order p', text: 'Enter the p value. Use 1 for Manhattan, 2 for Euclidean, or any positive number.' },
                { '@type': 'HowToStep', position: 3, name: 'Enter coordinates for both points', text: 'Type the coordinate values for Point A and Point B.' },
                { '@type': 'HowToStep', position: 4, name: 'Click Calculate', text: 'See the Minkowski distance for your p, plus Manhattan and Euclidean distances for comparison.' },
            ],
        }),
    }],
})
</script>
