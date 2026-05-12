<template>
    <UiCalcPage title="Fraction Calculator" category="math" description-title="Add, subtract, multiply and divide fractions">
        <template #calc>
            <CalculatorsMathFractionCalc />
        </template>
        <template #facts>
            <CalcFact label="Add fractions" value="Find common denominator" />
            <CalcFact label="Multiply"      value="Multiply tops & bottoms" />
            <CalcFact label="Divide"        value="Multiply by reciprocal" />
            <CalcFact label="Simplify"      value="Divide by GCF" />
        </template>
        <template #description>
            <p>
                The <strong>Fraction Calculator</strong> performs addition, subtraction, multiplication, and division on any two fractions — and automatically simplifies the result to its lowest terms. Whether you're a student working through homework or an adult doing quick calculations, this tool handles the arithmetic instantly and shows every step.
            </p>
            <p>Here's how each operation works:</p>
            <ul>
                <li><strong>Addition & Subtraction</strong> — Find a common denominator by multiplying the denominators together: a/b ± c/d = (a×d ± c×b) / (b×d), then simplify.</li>
                <li><strong>Multiplication</strong> — Multiply numerators together and denominators together: a/b × c/d = (a×c) / (b×d), then simplify.</li>
                <li><strong>Division</strong> — Multiply the first fraction by the reciprocal of the second: a/b ÷ c/d = a/b × d/c = (a×d) / (b×c), then simplify.</li>
            </ul>
            <p>
                All results are automatically reduced to their simplest form by dividing both numerator and denominator by their Greatest Common Factor (GCF). The decimal equivalent is also shown so you can see the value at a glance.
            </p>
        </template>
        <template #example>
            <p>
                Calculate <strong>3/4 + 1/2</strong>.
            </p>
            <p>
                Step 1: Find a common denominator. 4 and 2 share a common multiple of 4, but using the formula: d = 4×2 = 8.
            </p>
            <p>
                Step 2: Convert both fractions: 3/4 = 6/8 and 1/2 = 4/8.
            </p>
            <p>
                Step 3: Add the numerators: 6/8 + 4/8 = 10/8.
            </p>
            <p>
                Step 4: Simplify. GCF(10, 8) = 2. So 10/8 = <strong>5/4</strong> = 1.25.
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
    { q: "How do you add fractions with different denominators?", a: "Multiply the denominators to find a common denominator: a/b + c/d = (a×d + c×b) / (b×d). Then simplify the result by dividing by the Greatest Common Factor." },
    { q: "How do you divide fractions?", a: "To divide fractions, multiply the first fraction by the reciprocal of the second: a/b ÷ c/d = a/b × d/c = (a×d) / (b×c). Then simplify." },
    { q: "How do you simplify a fraction?", a: "Divide both the numerator and denominator by their Greatest Common Factor (GCF). For example, 10/8: GCF(10,8) = 2, so 10/8 = 5/4." },
    { q: "What is a mixed number?", a: "A mixed number combines a whole number and a fraction, like 1½. To use it in calculations, convert it to an improper fraction: 1½ = 3/2." },
    { q: "What is 2/3 + 3/4?", a: "Find a common denominator: 2/3 + 3/4 = (2×4 + 3×3) / (3×4) = (8 + 9) / 12 = 17/12. Simplified: 17/12 (already in lowest terms) = 1 and 5/12 as a mixed number ≈ 1.417." },
    { q: "What is 1/2 multiplied by 3/4?", a: "Multiply numerators and denominators: 1/2 × 3/4 = (1×3) / (2×4) = 3/8. As a decimal: 0.375. Fraction multiplication is the simplest operation — no common denominator needed." },
    { q: "What is 3/4 minus 1/3?", a: "Find common denominator: 3/4 − 1/3 = (3×3 − 1×4) / (4×3) = (9 − 4) / 12 = 5/12. As a decimal: 0.4167." },
    { q: "How do you convert a fraction to a decimal?", a: "Divide the numerator by the denominator. For 3/4: 3 ÷ 4 = 0.75. For 2/3: 2 ÷ 3 = 0.6667 (repeating). The calculator shows the decimal equivalent automatically alongside the fractional result." },
    { q: "What is an improper fraction?", a: "An improper fraction has a numerator larger than or equal to the denominator, like 7/4 or 5/3. It represents a value ≥ 1. To convert to a mixed number: divide numerator by denominator. 7 ÷ 4 = 1 remainder 3, so 7/4 = 1 and 3/4." },
    { q: "Why does the calculator simplify fractions automatically?", a: "Simplification (reducing to lowest terms) makes fractions easier to read and compare. For example, 12/16 simplified to 3/4 is much clearer. The calculator divides both the numerator and denominator by their GCF automatically. You can always convert back to the original scale by multiplying both parts by any common factor." },
]

useCalcSEO(
    "Fraction Calculator — Add, Subtract, Multiply & Divide Fractions",
    "Free fraction calculator. Add, subtract, multiply, or divide any two fractions. Shows the simplified result, decimal equivalent, and step-by-step solution.",
    faqs
)

useHead({
    script: [{
        type: 'application/ld+json',
        innerHTML: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'HowTo',
            name: 'How to Add, Subtract, Multiply or Divide Fractions',
            description: 'Perform fraction arithmetic and get a simplified result with decimal equivalent.',
            step: [
                { '@type': 'HowToStep', position: 1, name: 'Enter the first fraction', text: 'Type the numerator and denominator of the first fraction into the top input fields.' },
                { '@type': 'HowToStep', position: 2, name: 'Select an operation', text: 'Choose addition (+), subtraction (−), multiplication (×), or division (÷).' },
                { '@type': 'HowToStep', position: 3, name: 'Enter the second fraction', text: 'Type the numerator and denominator of the second fraction.' },
                { '@type': 'HowToStep', position: 4, name: 'Click Calculate', text: 'The result appears in simplified form with the decimal equivalent shown.' },
            ],
        }),
    }],
})
</script>
