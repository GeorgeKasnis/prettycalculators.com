<template>
    <UiCalcPage title="Cosine Similarity Calculator" category="math" description-title="Measure the angle between two vectors">
        <template #calc>
            <CalculatorsMathCosineSimilarityCalc />
        </template>
        <template #facts>
            <CalcFact label="Range"      value="−1 to +1" />
            <CalcFact label="Formula"    value="A·B / (|A|×|B|)" />
            <CalcFact label="+1"         value="Identical direction" />
            <CalcFact label="0"          value="Orthogonal" />
            <CalcFact label="−1"         value="Opposite direction" />
        </template>
        <template #description>
            <p>
                The <strong>Cosine Similarity Calculator</strong> measures the similarity between two vectors by computing the cosine of the angle between them. It is one of the most widely used similarity metrics in <strong>machine learning, NLP, and data science</strong> — used in text similarity, recommendation systems, image retrieval, and clustering.
            </p>
            <p>
                Unlike Euclidean distance, cosine similarity is <strong>magnitude-independent</strong>: it only cares about direction, not scale. Two vectors pointing in the same direction score 1.0 even if one is 10× longer than the other. This makes it ideal for comparing documents of different lengths.
            </p>
            <h3>Formula</h3>
            <p>
                <strong>cos(θ) = (A · B) / (|A| × |B|)</strong><br>
                Where A · B is the dot product and |A|, |B| are the vector magnitudes (Euclidean norms).
            </p>
            <h3>Interpreting the score</h3>
            <ul>
                <li><strong>1.0</strong> — vectors point in the exact same direction (maximum similarity)</li>
                <li><strong>0.7–0.99</strong> — high similarity</li>
                <li><strong>0.4–0.69</strong> — moderate similarity</li>
                <li><strong>0.0</strong> — orthogonal, no similarity at all</li>
                <li><strong>−1.0</strong> — perfectly opposite directions</li>
            </ul>
            <p>
                In text analysis, cosine similarity is computed on <strong>TF-IDF or word embedding vectors</strong>. A score above 0.8 typically indicates documents that are clearly on the same topic. For our <NuxtLink to="/math/manhattan-distance-calculator">Manhattan distance calculator</NuxtLink> and other distance metrics in this cluster, see the sidebar.
            </p>
        </template>
        <template #example>
            <p>
                <strong>Vector A</strong>: [1, 2, 3] — <strong>Vector B</strong>: [4, 5, 6].
            </p>
            <p>
                Dot product: (1×4) + (2×5) + (3×6) = 4 + 10 + 18 = <strong>32</strong>.
            </p>
            <p>
                |A| = √(1² + 2² + 3²) = √14 ≈ 3.742. |B| = √(4² + 5² + 6²) = √77 ≈ 8.775.
            </p>
            <p>
                cos(θ) = 32 / (3.742 × 8.775) = 32 / 32.832 ≈ <strong>0.9747</strong> — highly similar.
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
    { q: "What is cosine similarity?", a: "Cosine similarity measures the cosine of the angle between two vectors. A score of 1 means they point in the same direction (maximum similarity), 0 means they are perpendicular (no similarity), and −1 means opposite directions. It is magnitude-independent — only direction matters." },
    { q: "What is the formula for cosine similarity?", a: "cos(θ) = (A · B) / (|A| × |B|), where A · B is the dot product (sum of element-wise products) and |A|, |B| are the Euclidean norms (magnitudes) of each vector." },
    { q: "What is the difference between cosine similarity and Euclidean distance?", a: "Euclidean distance measures how far apart two points are in space — it is sensitive to magnitude. Cosine similarity measures the angle between vectors and ignores magnitude. For text documents of different lengths, cosine similarity is almost always preferred because a long document shouldn't be 'further' from a short one just because it has more words." },
    { q: "What is a good cosine similarity score?", a: "It depends on the application. In text similarity: above 0.9 is very high (near-duplicate documents), 0.7–0.9 is high (same topic), 0.4–0.7 is moderate (related topics), below 0.3 is low (unrelated). In recommendation systems, thresholds are often tuned experimentally per dataset." },
    { q: "How is cosine similarity used in NLP?", a: "In NLP, documents are converted to numerical vectors (TF-IDF, word2vec, BERT embeddings) and cosine similarity measures how semantically similar two texts are. Search engines use it to rank documents by relevance to a query. Plagiarism detectors use high cosine scores to flag likely copied content." },
    { q: "Can cosine similarity be negative?", a: "Yes, when the angle between vectors exceeds 90°. This happens when the vectors point in broadly opposite directions — for example, a vector with all positive values vs one with all negative values. In text analysis, cosine similarity is rarely negative because TF-IDF and count vectors are non-negative." },
    { q: "What is the difference between cosine similarity and cosine distance?", a: "Cosine distance = 1 − cosine similarity. Cosine similarity ranges from −1 to +1; cosine distance ranges from 0 to 2. Distance metrics require non-negativity, so cosine distance is used when a proper distance measure is needed (e.g., for k-means clustering input)." },
    { q: "Why does cosine similarity ignore vector length?", a: "Because the formula divides by both magnitudes (|A| × |B|), effectively normalising both vectors to unit length before comparing them. The result only depends on the ratio of each component to the total magnitude — not the magnitude itself. This is why a document with 1,000 words can have perfect cosine similarity with a 10-word document, if their topic distributions are proportional." },
    { q: "How is cosine similarity related to the dot product?", a: "Cosine similarity is the normalised dot product. The raw dot product combines both angle and magnitude. Dividing by (|A| × |B|) removes the magnitude component, leaving only the directional similarity. If both vectors are already unit-length (normalised), the dot product equals the cosine similarity directly." },
    { q: "What is cosine similarity used for in recommendation systems?", a: "Recommendation systems represent users and items as vectors (e.g., user-item rating matrices or embedding vectors). Cosine similarity finds users with similar taste profiles (user-based collaborative filtering) or items with similar characteristics (item-based). A high cosine score between two users means they tend to like and dislike the same items." },
    { q: "How do I calculate cosine similarity between two sentences?", a: "Convert each sentence to a vector using TF-IDF (each unique word is a dimension, value is its TF-IDF weight) or a sentence embedding model (BERT, sentence-transformers). Then apply the cosine similarity formula. For a quick manual check with short sentences, count word frequencies and enter them as vectors in this calculator." },
]

useCalcSEO(
    "Cosine Similarity Calculator — Vectors & Text",
    "Free cosine similarity calculator. Enter two vectors to get the similarity score, angle in degrees, dot product, and magnitudes. Used in ML, NLP, and data science.",
    faqs
)

useHead({
    script: [{
        type: 'application/ld+json',
        innerHTML: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'HowTo',
            name: 'How to Calculate Cosine Similarity',
            description: 'Find the cosine similarity between two vectors.',
            step: [
                { '@type': 'HowToStep', position: 1, name: 'Enter Vector A', text: 'Type the first vector values separated by commas, e.g. 1, 2, 3.' },
                { '@type': 'HowToStep', position: 2, name: 'Enter Vector B', text: 'Type the second vector values. Both vectors must have the same number of elements.' },
                { '@type': 'HowToStep', position: 3, name: 'Click Calculate', text: 'The calculator returns the cosine similarity score (−1 to 1), the angle in degrees, the dot product, and both magnitudes.' },
            ],
        }),
    }],
})
</script>
