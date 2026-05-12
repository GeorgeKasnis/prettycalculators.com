<template>
    <UiCalcPage title="Manhattan Distance Calculator" category="math" description-title="Compute the taxicab distance between two points">
        <template #calc>
            <CalculatorsMathManhattanDistanceCalc />
        </template>
        <template #facts>
            <CalcFact label="Also known as" value="L1 / Taxicab distance" />
            <CalcFact label="Formula" value="Σ |aᵢ − bᵢ|" />
            <CalcFact label="Dimensions" value="1D to 4D" />
        </template>
        <template #description>
            <p>Unlock the world of precise distance calculations with our Manhattan Distance Calculator. This invaluable tool enables you to compute the Manhattan distance between two points in a grid-like space effortlessly.</p>
            <p>Manhattan distance, often referred to as L1 distance, stands as a fundamental concept in mathematics, computer science, robotics, and various fields where precise distance measurement is essential.</p>
            <p>Our Manhattan Distance Calculator is versatile and accommodates dimensions ranging from 1D to 4D, making it a powerful ally for developers, researchers, and anyone seeking to grasp the intricacies of spatial relationships.</p>

            <h3>Understanding Manhattan Distance in Different Dimensions:</h3>

            <h4>1D (One-Dimensional):</h4>
            <p>In a 1D space, such as a number line, Manhattan distance is simply the absolute difference between the coordinates of two points. For example, the Manhattan distance between points 5 and 8 in 1D space is 3.</p>

            <h4>2D (Two-Dimensional):</h4>
            <p>In a 2D grid, like a chessboard, Manhattan distance is calculated by summing the absolute differences of both X and Y coordinates. For instance, the Manhattan distance between points (3, 5) and (1, 2) in a 2D grid is 5.</p>

            <h4>3D (Three-Dimensional):</h4>
            <p>When working in a 3D space, consider the absolute differences in X, Y, and Z coordinates. Imagine two points in 3D space, (1, 2, 3) and (4, 1, 7). The Manhattan distance would be 10, calculated as |1-4| + |2-1| + |3-7|.</p>

            <h4>4D (Four-Dimensional):</h4>
            <p>Extending the concept to 4D space involves considering the absolute differences in four coordinates. Think of it as navigating a 4D space-time continuum. With our calculator, you can effortlessly determine the Manhattan distance between two points in this complex space.</p>
        </template>
        <template #example>
            <p><span class="font-bold">Example 1D:</span> If you're at address 5 and need to reach address 8, the Manhattan distance is 3 steps.</p>
            <p><span class="font-bold">Example 2D:</span> In a city grid, the Manhattan distance between (3rd Street, 5th Avenue) and (1st Street, 2nd Avenue) is 5 blocks.</p>
            <p><span class="font-bold">Example 3D:</span> In a building with multiple floors, traveling from the 3rd floor to the 7th floor while moving between streets results in an 8-floor Manhattan distance.</p>
            <p><span class="font-bold">Example 4D:</span> In the realm of time and date, the Manhattan distance between (2023, June, 15, 10:00 AM) and (2023, June, 15, 4:00 PM) is a 6-hour time difference.</p>
        </template>
        <template #faq>
            <CalcFaq :faqs="faqs" />
        </template>
    </UiCalcPage>
</template>

<script setup>
definePageMeta({ layout: 'brutalist' })

const faqs = [
    { q: "What is Manhattan distance?", a: "Manhattan distance (also called L1 distance or taxicab distance) is the sum of the absolute differences between coordinates of two points. It measures distance along grid-like paths." },
    { q: "What is the formula for Manhattan distance?", a: "For 2D points (x1, y1) and (x2, y2): |x1 − x2| + |y1 − y2|. In 3D: |x1 − x2| + |y1 − y2| + |z1 − z2|." },
    { q: "When is Manhattan distance used?", a: "Manhattan distance is used in machine learning (k-nearest neighbors), route planning on grid maps, robotics, and image processing algorithms." },
    { q: "What is the difference between Manhattan and Euclidean distance?", a: "Euclidean distance is the straight-line distance between two points. Manhattan distance follows grid paths and is always greater than or equal to Euclidean distance." },
    { q: "Why is it called Manhattan distance?", a: "The name comes from the grid-like street layout of Manhattan island in New York City. In a city grid, you can only travel along streets (horizontally or vertically) — not diagonally across blocks. The total distance walked in this grid-constrained way is the Manhattan distance." },
    { q: "Is Manhattan distance always greater than Euclidean distance?", a: "Yes, always (or equal). Euclidean distance is the straight-line ('as the crow flies') distance, while Manhattan distance must follow axis-aligned paths. The ratio Manhattan/Euclidean is at minimum 1 (when moving in exactly one direction) and at maximum √2 (when moving diagonally at 45°)." },
    { q: "How is Manhattan distance used in k-nearest neighbors (KNN)?", a: "In KNN, Manhattan distance is used as the metric to find the k closest points to a query point. It's preferred over Euclidean distance in high-dimensional spaces because it's less affected by the 'curse of dimensionality' — in high dimensions, all Euclidean distances tend to converge, making it harder to distinguish near and far points. Manhattan distance maintains more discriminative power." },
    { q: "What is the Manhattan distance between (0,0) and (3,4)?", a: "|0−3| + |0−4| = 3 + 4 = 7. For comparison, the Euclidean distance is √(3² + 4²) = √25 = 5. The Manhattan distance (7) is larger because you cannot take the diagonal shortcut." },
    { q: "What is the difference between L1 and L2 distance?", a: "L1 distance is Manhattan distance (sum of absolute differences). L2 distance is Euclidean distance (square root of sum of squared differences). In machine learning, L1 regularisation (Lasso) and L2 regularisation (Ridge) use these norms respectively to penalise large coefficients, with L1 producing sparse solutions and L2 producing smaller, more evenly distributed ones." },
]

useCalcSEO(
    "Manhattan Distance Calculator — L1 Distance Online",
    "Calculate Manhattan distance (L1 norm) between two points. Supports 2D, 3D, and 4D coordinates. Free online calculator — instant results, no sign-up needed.",
    faqs
)

useHead({
    script: [{
        type: 'application/ld+json',
        innerHTML: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'HowTo',
            name: 'How to Calculate Manhattan Distance',
            description: 'Find the L1 (taxicab) distance between two points in 2D, 3D, or 4D space.',
            step: [
                { '@type': 'HowToStep', position: 1, name: 'Select dimensions', text: 'Choose the number of dimensions: 1D, 2D, 3D, or 4D depending on your coordinate space.' },
                { '@type': 'HowToStep', position: 2, name: 'Enter coordinates for point A', text: 'Type the coordinate values for the first point (x, y, z, w as applicable).' },
                { '@type': 'HowToStep', position: 3, name: 'Enter coordinates for point B', text: 'Type the coordinate values for the second point.' },
                { '@type': 'HowToStep', position: 4, name: 'Click Calculate', text: 'The Manhattan distance (sum of absolute differences) appears instantly.' },
            ],
        }),
    }],
})
</script>
