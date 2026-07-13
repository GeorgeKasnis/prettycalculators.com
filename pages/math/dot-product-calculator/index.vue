<template>
    <UiCalcPage title="Dot Product Calculator" category="math" description-title="Multiply two vectors element by element">
        <template #calc>
            <CalculatorsMathDotProductCalc />
        </template>
        <template #facts>
            <CalcFact label="Formula"  value="Σ aᵢ × bᵢ" />
            <CalcFact label="Positive" value="Similar direction" />
            <CalcFact label="Zero"     value="Perpendicular" />
            <CalcFact label="Negative" value="Opposing direction" />
        </template>
        <template #description>
            <p>
                The <strong>Dot Product Calculator</strong> computes the scalar (inner) product of two vectors: multiply each pair of corresponding components, then add the results. It's a fundamental operation in <strong>linear algebra, physics, computer graphics, and machine learning</strong> — from projecting forces to computing neural network activations.
            </p>
            <p>
                Unlike the cross product, the dot product returns a <strong>single number</strong>, not a vector. Its sign tells you about direction: positive means the vectors point broadly the same way, zero means they are perpendicular, and negative means they oppose each other.
            </p>
            <h3>Formula</h3>
            <p>
                <strong>A · B = a₁b₁ + a₂b₂ + … + aₙbₙ</strong><br>
                Equivalently, <strong>A · B = |A| × |B| × cos(θ)</strong>, where θ is the angle between the vectors.
            </p>
            <p>
                This calculator also returns both magnitudes, the angle between the vectors, and the <NuxtLink to="/math/cosine-similarity-calculator">cosine similarity</NuxtLink> — the normalised version of the dot product used throughout machine learning and NLP.
            </p>
        </template>
        <template #example>
            <p>
                <strong>Vector A</strong>: [1, 2, 3] — <strong>Vector B</strong>: [4, 5, 6].
            </p>
            <p>
                A · B = (1×4) + (2×5) + (3×6) = 4 + 10 + 18 = <strong>32</strong>.
            </p>
            <p>
                Since 32 &gt; 0, the vectors point in a broadly similar direction. The angle between them is ≈ 12.93°.
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
    { q: "What is a dot product?", a: "The dot product (also called scalar product or inner product) multiplies two vectors component by component and sums the results, producing a single number. For A = [1, 2] and B = [3, 4]: A · B = 1×3 + 2×4 = 11." },
    { q: "What is the formula for the dot product?", a: "A · B = a₁b₁ + a₂b₂ + … + aₙbₙ. Geometrically, it also equals |A| × |B| × cos(θ), where |A| and |B| are the vector magnitudes and θ is the angle between them." },
    { q: "What does a dot product of zero mean?", a: "The vectors are orthogonal (perpendicular) — they share no directional component at all. This is why the dot product is used to test perpendicularity: if A · B = 0 and neither vector is zero, the angle between them is exactly 90°." },
    { q: "Can a dot product be negative?", a: "Yes. A negative dot product means the angle between the vectors is greater than 90° — they point in broadly opposing directions. The minimum occurs at 180°, when the vectors are exactly opposite." },
    { q: "What is the difference between dot product and cross product?", a: "The dot product returns a scalar (a single number) and measures how aligned two vectors are. The cross product returns a new vector perpendicular to both inputs and only exists in 3D (and 7D). Use dot for projections and angles, cross for normals and torque." },
    { q: "How do I find the angle between two vectors using the dot product?", a: "Rearrange the geometric formula: θ = arccos( (A · B) / (|A| × |B|) ). Compute the dot product, divide by the product of the magnitudes, then take the inverse cosine. This calculator does that automatically." },
    { q: "What is the dot product used for in machine learning?", a: "Almost everything: a neuron's pre-activation is the dot product of weights and inputs; attention scores in transformers are scaled dot products of query and key vectors; and similarity search compares embeddings via dot products or their normalised form, cosine similarity." },
    { q: "How is the dot product related to cosine similarity?", a: "Cosine similarity is the dot product divided by the product of both magnitudes: cos(θ) = (A · B) / (|A| × |B|). If both vectors are unit length, the dot product IS the cosine similarity. See our <a href=\"/math/cosine-similarity-calculator\">cosine similarity calculator</a> for the normalised version." },
    { q: "Do both vectors need the same number of components?", a: "Yes. The dot product is only defined for vectors of equal dimension — each component of A must have a partner in B. This calculator will warn you if the two vectors have different lengths." },
    { q: "What is the dot product of a vector with itself?", a: "A · A = |A|², the squared magnitude (length) of the vector. This is why the Euclidean norm is defined as |A| = √(A · A) — take the dot product with itself and square-root it." },
    { q: "What is the dot product in physics?", a: "Work is the classic example: W = F · d, the dot product of force and displacement. Only the component of force along the direction of motion does work — which is exactly what the dot product extracts. Power (F · v) works the same way." },
    { q: "How do I calculate the dot product of 3D vectors?", a: "Same rule, three terms: [a₁, a₂, a₃] · [b₁, b₂, b₃] = a₁b₁ + a₂b₂ + a₃b₃. For example [2, 0, 1] · [1, 3, 4] = 2 + 0 + 4 = 6. Enter the components above separated by commas." },
]

useCalcSEO(
    "Dot Product Calculator — Vectors, Angle & Magnitude",
    "Free dot product calculator for vectors of any dimension. Get the scalar product, both magnitudes, the angle between vectors, and cosine similarity instantly.",
    faqs
)

useHead({
    script: [{
        type: 'application/ld+json',
        innerHTML: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'HowTo',
            name: 'How to Calculate a Dot Product',
            description: 'Find the dot product (scalar product) of two vectors.',
            step: [
                { '@type': 'HowToStep', position: 1, name: 'Enter Vector A', text: 'Type the first vector values separated by commas, e.g. 1, 2, 3.' },
                { '@type': 'HowToStep', position: 2, name: 'Enter Vector B', text: 'Type the second vector values. Both vectors must have the same number of elements.' },
                { '@type': 'HowToStep', position: 3, name: 'Click Calculate', text: 'The calculator returns the dot product, both magnitudes, the angle between the vectors, and the cosine similarity.' },
            ],
        }),
    }],
})
</script>
