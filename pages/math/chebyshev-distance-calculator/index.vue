<template>
    <UiCalcPage title="Chebyshev Distance Calculator" category="math" description-title="King moves, L∞ norm & maximum absolute difference">
        <template #calc>
            <CalculatorsMathChebyshevDistanceCalc />
        </template>
        <template #facts>
            <CalcFact label="Also known as"  value="L∞ / Chessboard distance" />
            <CalcFact label="Formula"        value="max(|aᵢ − bᵢ|)" />
            <CalcFact label="Chess use"      value="Min king moves between squares" />
            <CalcFact label="Special case"   value="Minkowski with p→∞" />
        </template>
        <template #description>
            <p>
                The <strong>Chebyshev Distance Calculator</strong> computes the maximum absolute difference across all coordinate axes — the L∞ (L-infinity) norm. It answers the question: "what is the largest single-axis gap between these two points?"
            </p>
            <p>
                Chebyshev distance is best known as the <strong>chessboard distance</strong>: it counts the minimum number of moves a king needs to travel between two squares on a chess board. A king can move diagonally, so it covers both axes simultaneously — the bottleneck is always the larger of the two differences.
            </p>
            <p>
                Key applications:
            </p>
            <ul>
                <li><strong>Game development</strong> — A* pathfinding with diagonal movement, tile-based maps where diagonal moves are allowed.</li>
                <li><strong>Warehouse robotics</strong> — cranes that move simultaneously on X and Y axes.</li>
                <li><strong>Machine learning</strong> — feature comparison where only the worst-case dimension matters.</li>
                <li><strong>Generalised distance</strong> — it is <a href="/math/minkowski-distance-calculator">Minkowski distance</a> as p→∞.</li>
            </ul>
        </template>
        <template #example>
            <p>
                <strong>Chess example:</strong> King at d4 (file 4, rank 4), moving to g7 (file 7, rank 7).
            </p>
            <p>
                |7−4| = 3 (files), |7−4| = 3 (ranks). max(3, 3) = <strong>3 moves</strong>. The king moves diagonally 3 times — it handles both axes at once.
            </p>
            <p>
                Compare: <a href="/math/manhattan-distance-calculator">Manhattan distance</a> = 6 (can't go diagonally). <a href="/math/euclidean-distance-calculator">Euclidean distance</a> = √18 ≈ 4.24 (straight line through the board).
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
    { q: "What is Chebyshev distance?", a: "Chebyshev distance is the maximum absolute difference between the coordinates of two points across all dimensions: max(|a₁−b₁|, |a₂−b₂|, …). It is also called L∞ (L-infinity) distance or chessboard distance. It represents the minimum number of moves a chess king needs to travel between two squares." },
    { q: "What is the formula for Chebyshev distance?", a: "d(A, B) = max(|a₁−b₁|, |a₂−b₂|, …, |aₙ−bₙ|). In 2D: max(|x₂−x₁|, |y₂−y₁|). Example: A=(1,3) and B=(4,6): max(|4−1|, |6−3|) = max(3,3) = 3." },
    { q: "Why is Chebyshev distance called chessboard distance?", a: "A chess king can move one step in any of 8 directions — including diagonals. This means in one move it can decrease both the row and column distance by 1. The total number of moves needed is therefore the maximum of the absolute row and column differences, not the sum — which is exactly the Chebyshev formula. On a standard 8×8 board, the maximum Chebyshev distance is 7." },
    { q: "How is Chebyshev distance used in game development?", a: "In tile-based games with diagonal movement allowed, Chebyshev distance gives the optimal move count for any agent that can move in 8 directions (like a chess king). A* pathfinding algorithms use it as an admissible heuristic when diagonal movement costs the same as cardinal movement. It is also used in real-time strategy games for area-of-effect range calculations." },
    { q: "What is the difference between Chebyshev, Manhattan, and Euclidean distance?", a: "For the same two points, Chebyshev ≤ Euclidean ≤ Manhattan (always). Chebyshev = max axis difference (diagonal movement allowed). Euclidean = straight-line distance (any angle allowed). Manhattan = sum of axis differences (no diagonal movement). Use our <a href='/math/euclidean-distance-calculator'>Euclidean</a> and <a href='/math/manhattan-distance-calculator'>Manhattan</a> calculators to compare all three." },
    { q: "What is L∞ norm?", a: "The L∞ norm (L-infinity norm) of a vector is its maximum absolute component: ‖v‖∞ = max(|v₁|, |v₂|, …). Chebyshev distance is the L∞ norm of the difference vector (A−B). As p→∞ in the Minkowski distance formula, the result converges to the L∞ norm, making Chebyshev a limiting case of <a href='/math/minkowski-distance-calculator'>Minkowski distance</a>." },
    { q: "How does Chebyshev distance relate to Minkowski distance?", a: "Chebyshev distance is the limiting case of <a href='/math/minkowski-distance-calculator'>Minkowski distance</a> as p approaches infinity. The Minkowski formula (Σ|aᵢ−bᵢ|ᵖ)^(1/p) converges to max(|aᵢ−bᵢ|) as p→∞ because the largest term dominates the sum. At p=1 it equals Manhattan, at p=2 it equals Euclidean, at p=∞ it equals Chebyshev." },
    { q: "Is Chebyshev distance used in machine learning?", a: "Yes, but less commonly than Euclidean or Manhattan. It appears in anomaly detection (where the worst-case feature deviation matters), some clustering algorithms, and specific kNN implementations. It's also used in image processing for morphological operations. Chebyshev distance is particularly useful when the limiting (maximum) dimension determines the outcome rather than the aggregate." },
]

useCalcSEO(
    "Chebyshev Distance Calculator — King Distance, L∞ Norm",
    "Free Chebyshev distance calculator. Compute the L∞ (chessboard) distance between two points — the maximum absolute coordinate difference. Used in chess, A* pathfinding, and machine learning.",
    faqs
)

useHead({
    script: [{
        type: 'application/ld+json',
        innerHTML: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'HowTo',
            name: 'How to Calculate Chebyshev Distance',
            description: 'Find the maximum absolute coordinate difference (king distance) between two points.',
            step: [
                { '@type': 'HowToStep', position: 1, name: 'Select dimensions', text: 'Choose 1D, 2D, 3D, or 4D.' },
                { '@type': 'HowToStep', position: 2, name: 'Enter coordinates for both points', text: 'Type the coordinate values for Point A and Point B.' },
                { '@type': 'HowToStep', position: 3, name: 'Click Calculate', text: 'See the Chebyshev distance, the dominant axis, and Manhattan distance for comparison.' },
            ],
        }),
    }],
})
</script>
