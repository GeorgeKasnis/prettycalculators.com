<template>
    <UiCalcPage title="Euclidean Distance Calculator" category="math" description-title="Straight-line distance between two points in any dimension">
        <template #calc>
            <CalculatorsMathEuclideanDistanceCalc />
        </template>
        <template #facts>
            <CalcFact label="Also known as"  value="L2 / straight-line distance" />
            <CalcFact label="Formula"        value="√(Σ(aᵢ − bᵢ)²)" />
            <CalcFact label="Dimensions"     value="1D to 4D" />
            <CalcFact label="Special case"   value="Minkowski with p=2" />
        </template>
        <template #description>
            <p>
                The <strong>Euclidean Distance Calculator</strong> computes the straight-line ("as the crow flies") distance between two points in 1D, 2D, 3D, or 4D space. It is the most widely used distance metric in mathematics, physics, machine learning, and computer graphics — the default meaning of "distance" in everyday life.
            </p>
            <p>
                Unlike <a href="/math/manhattan-distance-calculator">Manhattan distance</a>, which follows grid paths, Euclidean distance is the shortest possible path between two points — the length of the direct line segment connecting them. In 2D this is just the distance formula you learned in school: √((x₂−x₁)² + (y₂−y₁)²).
            </p>
            <p>
                Key properties:
            </p>
            <ul>
                <li><strong>Always ≤ Manhattan distance</strong> — the straight line is never longer than a grid path.</li>
                <li><strong>Rotation invariant</strong> — rotating the coordinate system doesn't change the distance.</li>
                <li><strong>L2 norm</strong> — Euclidean distance is the L2 norm of the difference vector, making it foundational in linear algebra and ML.</li>
                <li><strong>Special case of Minkowski</strong> — it equals <a href="/math/minkowski-distance-calculator">Minkowski distance</a> with p=2.</li>
            </ul>
        </template>
        <template #example>
            <p>
                <strong>2D example:</strong> Points A=(1, 2) and B=(4, 6).
            </p>
            <p>
                √((4−1)² + (6−2)²) = √(9 + 16) = √25 = <strong>5</strong>.
            </p>
            <p>
                The <a href="/math/manhattan-distance-calculator">Manhattan distance</a> between the same points is |4−1| + |6−2| = 3 + 4 = 7. The ratio 5/7 ≈ 0.71 — close to the theoretical minimum of 1/√2 ≈ 0.707 when moving at exactly 45°.
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
    { q: "What is Euclidean distance?", a: "Euclidean distance is the straight-line distance between two points in space. It is the length of the shortest path connecting them, computed as the square root of the sum of squared coordinate differences: √((x₂−x₁)² + (y₂−y₁)²) in 2D. It generalises to any number of dimensions using the same formula." },
    { q: "What is the Euclidean distance formula?", a: "For two points A=(a₁, a₂, …, aₙ) and B=(b₁, b₂, …, bₙ): d = √(Σ(aᵢ−bᵢ)²). In 2D: d = √((x₂−x₁)² + (y₂−y₁)²). In 3D: d = √((x₂−x₁)² + (y₂−y₁)² + (z₂−z₁)²). This is also called the L2 norm of the difference vector." },
    { q: "What is the difference between Euclidean and Manhattan distance?", a: "Euclidean distance is the straight-line ('as the crow flies') path. Manhattan distance follows axis-aligned grid paths — only horizontal and vertical moves. Euclidean is always ≤ Manhattan. For a 45° diagonal move, Manhattan distance is √2 ≈ 1.41× the Euclidean distance. Use our <a href='/math/manhattan-distance-calculator'>Manhattan distance calculator</a> to compare both simultaneously." },
    { q: "When should I use Euclidean distance vs Manhattan distance?", a: "Use Euclidean when: movement in any direction is equally possible (open space, physics, graphics). Use Manhattan when: movement is grid-constrained (city navigation, certain ML tasks). In machine learning, Manhattan distance can outperform Euclidean in high-dimensional spaces because it's less dominated by large individual differences. For high dimensions, also consider <a href='/math/chebyshev-distance-calculator'>Chebyshev distance</a>." },
    { q: "What is the Euclidean distance between (0,0) and (3,4)?", a: "√(3² + 4²) = √(9+16) = √25 = 5. This is the classic 3-4-5 right triangle. The Manhattan distance between the same points is 3+4 = 7. The ratio is 5/7 ≈ 71.4%." },
    { q: "What is L2 distance?", a: "L2 distance is another name for Euclidean distance. The 'L' refers to Lp norms: L1 is Manhattan (sum of absolute differences), L2 is Euclidean (square root of sum of squares), L∞ is Chebyshev (maximum absolute difference). In machine learning, L2 regularisation (Ridge regression) penalises the L2 norm of model weights." },
    { q: "How is Euclidean distance used in machine learning?", a: "Euclidean distance is the default metric in k-nearest neighbours (KNN), k-means clustering, and many other algorithms. It measures how similar two data points are — closer points are more similar. It also underlies support vector machines (maximising margin is equivalent to minimising L2 norms) and PCA (which minimises L2 reconstruction error)." },
    { q: "What is the Euclidean distance in 3D space?", a: "For points A=(x₁,y₁,z₁) and B=(x₂,y₂,z₂): d = √((x₂−x₁)² + (y₂−y₁)² + (z₂−z₁)²). Example: A=(1,2,3) and B=(4,6,3): d = √(9+16+0) = √25 = 5. In physics, this is simply the distance between two positions in 3D space." },
    { q: "How does Euclidean distance relate to Minkowski distance?", a: "Euclidean distance is a special case of <a href='/math/minkowski-distance-calculator'>Minkowski distance</a> with p=2. The Minkowski formula is (Σ|aᵢ−bᵢ|ᵖ)^(1/p). At p=1 this becomes Manhattan distance, at p=2 it becomes Euclidean, and as p→∞ it approaches Chebyshev distance. Minkowski generalises all three into a single parameterised family." },
]

useCalcSEO(
    "Euclidean Distance Calculator — Straight-Line Distance Formula",
    "Free Euclidean distance calculator. Compute the straight-line (L2) distance between two points in 2D, 3D, and 4D space. Shows formula, Manhattan comparison, and squared distance.",
    faqs
)

useHead({
    script: [{
        type: 'application/ld+json',
        innerHTML: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'HowTo',
            name: 'How to Calculate Euclidean Distance',
            description: 'Find the straight-line distance between two points using the Euclidean distance formula.',
            step: [
                { '@type': 'HowToStep', position: 1, name: 'Select dimensions', text: 'Choose 1D, 2D, 3D, or 4D depending on your coordinate space.' },
                { '@type': 'HowToStep', position: 2, name: 'Enter Point A coordinates', text: 'Type the coordinate values for the first point.' },
                { '@type': 'HowToStep', position: 3, name: 'Enter Point B coordinates', text: 'Type the coordinate values for the second point.' },
                { '@type': 'HowToStep', position: 4, name: 'Click Calculate', text: 'See the Euclidean distance, Manhattan distance for comparison, and the squared distance.' },
            ],
        }),
    }],
})
</script>
