<template>
    <UiCalcPage title="Hamming Distance Calculator" category="math" description-title="Count differing positions between two strings or binary sequences">
        <template #calc>
            <CalculatorsMathHammingDistanceCalc />
        </template>
        <template #facts>
            <CalcFact label="Works on"     value="Strings, binary, DNA" />
            <CalcFact label="Formula"      value="Count of positions where A ≠ B" />
            <CalcFact label="Requirement"  value="Strings must be equal length" />
            <CalcFact label="Invented by"  value="Richard Hamming, 1950" />
        </template>
        <template #description>
            <p>
                The <strong>Hamming Distance Calculator</strong> counts the number of positions at which two strings or sequences of equal length differ. It is the simplest and most fundamental string distance metric — used in error detection, error correction, cryptography, genetics, and information theory.
            </p>
            <p>
                Unlike the coordinate-based distance metrics (<a href="/math/euclidean-distance-calculator">Euclidean</a>, <a href="/math/manhattan-distance-calculator">Manhattan</a>, <a href="/math/chebyshev-distance-calculator">Chebyshev</a>), Hamming distance works on <em>sequences</em> — strings of characters, binary digits, DNA bases, or any ordered list of symbols. The only requirement is that both sequences have the same length.
            </p>
            <p>
                Key uses:
            </p>
            <ul>
                <li><strong>Error detection &amp; correction</strong> — in data transmission, Hamming distance measures how many bits were flipped. A Hamming distance of 1 means one bit error; distance ≥ 3 allows single-bit error correction.</li>
                <li><strong>Cryptography</strong> — measuring key similarity and avalanche effect (good ciphers produce large Hamming distances for small input changes).</li>
                <li><strong>DNA analysis</strong> — comparing genetic sequences base by base.</li>
                <li><strong>Spell checking</strong> — as a fast pre-filter before more expensive edit distance calculations.</li>
            </ul>
        </template>
        <template #example>
            <p>
                <strong>String example:</strong> "karolin" vs "kathrin" (7 characters each).
            </p>
            <p>
                k-k ✓, a-a ✓, r-t ✗, o-h ✗, l-r ✗, i-i ✓, n-n ✓. Differences at positions 3, 4, 5.
                <strong>Hamming distance = 3</strong>. Similarity = 4/7 ≈ 57%.
            </p>
            <p>
                <strong>Binary example:</strong> "10110110" vs "11011011". Hamming distance = 4. In data transmission, this means 4 bits were flipped in transit.
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
    { q: "What is Hamming distance?", a: "Hamming distance is the number of positions at which two strings of equal length differ. For 'karolin' and 'kathrin', the differences are at positions 3 (r≠t), 4 (o≠h), and 5 (l≠r) — Hamming distance = 3. It was introduced by mathematician Richard Hamming in 1950 in the context of error-correcting codes." },
    { q: "What is the formula for Hamming distance?", a: "Hamming distance d(A, B) = number of positions i where A[i] ≠ B[i]. In code: count the characters that differ. Both strings must have the same length — if they don't, Hamming distance is undefined (use Levenshtein/edit distance instead, which handles insertions and deletions)." },
    { q: "What is the difference between Hamming distance and edit distance (Levenshtein)?", a: "Hamming distance counts substitutions only — both strings must be the same length. Levenshtein (edit) distance counts the minimum number of insertions, deletions, and substitutions to transform one string into another — strings can differ in length. Hamming is simpler and faster (O(n)); Levenshtein is more general but O(n×m). Use Hamming for fixed-length codes; use Levenshtein for general string comparison." },
    { q: "How is Hamming distance used in error correction?", a: "In data transmission, a Hamming distance of d between two codewords means d bits must be flipped to confuse them. A code with minimum Hamming distance 2 can detect 1-bit errors. Distance 3 can detect 2-bit errors OR correct 1-bit errors. Distance 5 can correct 2-bit errors. Hamming (7,4) codes — encoding 4 data bits as 7-bit codewords — achieve minimum distance 3, enabling single-bit error correction." },
    { q: "What is the Hamming distance between two binary numbers?", a: "For binary strings, Hamming distance equals the number of bit positions that differ, which is the same as the number of 1s in the XOR of the two numbers (popcount). Example: 1011 XOR 1110 = 0101 — two 1s — Hamming distance = 2. This makes binary Hamming distance extremely fast to compute in hardware." },
    { q: "Can Hamming distance be used for DNA sequences?", a: "Yes — DNA sequences use a 4-symbol alphabet (A, T, G, C). Hamming distance counts the number of base positions that differ between two sequences of equal length. This is used to measure genetic divergence, find mutations, and align sequencing reads to reference genomes. For sequences of unequal length, bioinformatics typically uses edit distance or Smith-Waterman alignment instead." },
    { q: "What is the maximum Hamming distance?", a: "The maximum Hamming distance between two strings of length n is n — when every position differs. For binary strings of length n, the maximum is n (e.g., 000…0 and 111…1). Hamming distance of 0 means the strings are identical. Hamming distance of n means they are as different as possible (complements in binary)." },
    { q: "How does Hamming distance relate to other distance metrics?", a: "Hamming distance is unique in that it operates on discrete sequences rather than continuous coordinate spaces. It is not directly comparable to <a href='/math/euclidean-distance-calculator'>Euclidean</a>, <a href='/math/manhattan-distance-calculator'>Manhattan</a>, or <a href='/math/chebyshev-distance-calculator'>Chebyshev</a> distances, which operate on numeric vectors. However, binary vectors can be treated numerically — the Manhattan distance of two binary vectors equals their Hamming distance, since |0−1| = 1 and |0−0| = |1−1| = 0." },
]

useCalcSEO(
    "Hamming Distance Calculator — String & Binary Sequence Comparison",
    "Free Hamming distance calculator. Enter two strings or binary sequences of equal length to count differing positions. Shows per-character breakdown, similarity %, and matching positions.",
    faqs
)

useHead({
    script: [{
        type: 'application/ld+json',
        innerHTML: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'HowTo',
            name: 'How to Calculate Hamming Distance',
            description: 'Count the number of differing positions between two strings or binary sequences.',
            step: [
                { '@type': 'HowToStep', position: 1, name: 'Enter String A', text: 'Type your first string, word, or binary sequence.' },
                { '@type': 'HowToStep', position: 2, name: 'Enter String B', text: 'Type the second string. It must be the same length as String A.' },
                { '@type': 'HowToStep', position: 3, name: 'Click Calculate', text: 'See the Hamming distance, similarity percentage, and a position-by-position breakdown of matching and differing characters.' },
            ],
        }),
    }],
})
</script>
