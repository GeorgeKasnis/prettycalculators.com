<template>
    <UiCalcPage title="LCM & GCF Calculator" category="math" description-title="Find the Least Common Multiple and Greatest Common Factor">
        <template #calc>
            <CalculatorsMathLcmGcfCalc />
        </template>
        <template #facts>
            <CalcFact label="GCF of 12, 18" value="6" />
            <CalcFact label="LCM of 4, 6" value="12" />
            <CalcFact label="GCF × LCM" value="a × b" />
            <CalcFact label="Algorithm" value="Euclidean" />
        </template>
        <template #description>
            <p>
                The <strong>GCF (Greatest Common Factor)</strong>, also called GCD (Greatest Common Divisor), is the largest number that divides evenly into both inputs. The <strong>LCM (Least Common Multiple)</strong> is the smallest number that is a multiple of both inputs.
            </p>
            <p>
                These two values are connected by a simple relationship: <strong>GCF × LCM = a × b</strong>. This calculator uses the <strong>Euclidean algorithm</strong> — the most efficient method — to find the GCF, then derives LCM from it.
            </p>
            <p>Common uses:
            </p>
            <ul>
                <li><strong>GCF</strong> — simplifying fractions, dividing quantities into equal groups</li>
                <li><strong>LCM</strong> — adding fractions with different denominators, finding common schedules</li>
            </ul>
        </template>
        <template #example>
            <p>Find GCF and LCM of <strong>36</strong> and <strong>48</strong>:</p>
            <p>Euclidean algorithm: 48 mod 36 = 12, 36 mod 12 = 0 → <strong>GCF = 12</strong></p>
            <p>LCM = (36 × 48) ÷ 12 = 1728 ÷ 12 = <strong>144</strong></p>
            <p>Verify: 144 ÷ 36 = 4 ✓ &nbsp; 144 ÷ 48 = 3 ✓</p>
        </template>
        <template #faq>
            <CalcFaq :faqs="faqs" />
        </template>
    </UiCalcPage>
</template>

<script setup>
definePageMeta({ layout: 'brutalist' })

const faqs = [
    { q: "What is the GCF (Greatest Common Factor)?", a: "The GCF is the largest positive integer that divides evenly into two or more numbers with no remainder. For example, the GCF of 12 and 18 is 6, because 6 is the largest number that goes into both 12 (12÷6=2) and 18 (18÷6=3)." },
    { q: "What is the LCM (Least Common Multiple)?", a: "The LCM is the smallest positive integer that is divisible by both numbers. For example, the LCM of 4 and 6 is 12, because 12 is the smallest number that appears in both the multiples of 4 (4, 8, 12…) and multiples of 6 (6, 12…)." },
    { q: "What is the Euclidean algorithm?", a: "The Euclidean algorithm finds the GCF efficiently by repeatedly dividing and taking remainders. For GCF(48, 36): 48 mod 36 = 12, then 36 mod 12 = 0, so GCF = 12. It's one of the oldest algorithms in mathematics, dating back to Euclid around 300 BC." },
    { q: "How do GCF and LCM relate to each other?", a: "They're connected by the formula: GCF(a, b) × LCM(a, b) = a × b. So if you know any three of these four values, you can find the fourth. This relationship makes computing LCM from GCF very efficient." },
    { q: "When do you need LCM in real life?", a: "LCM is used when adding or subtracting fractions with different denominators (you need a common denominator, ideally the LCM). It's also used in scheduling problems — if event A repeats every 4 days and event B every 6 days, they next coincide in LCM(4, 6) = 12 days." },
    { q: "When do you use GCF in real life?", a: "GCF is used to simplify fractions — divide numerator and denominator by their GCF. It's also useful when splitting things into equal groups: if you have 24 apples and 36 oranges and want to make identical bags, each bag gets GCF(24,36)=12 of each, making 2 apples and 3 oranges per bag." },
    { q: "What if the GCF of two numbers is 1?", a: "If GCF(a, b) = 1, the numbers are called coprime or relatively prime. Their LCM equals their product. For example, GCF(7, 9) = 1, so LCM(7, 9) = 63. This is common with consecutive integers or prime numbers." },
    { q: "Can LCM and GCF be calculated for more than two numbers?", a: "Yes. For three or more numbers, apply the operation pairwise. GCF(a, b, c) = GCF(GCF(a, b), c). LCM(a, b, c) = LCM(LCM(a, b), c)." },
    { q: "What is the GCF of a number and itself?", a: "GCF(n, n) = n. The LCM(n, n) = n too. And GCF(n, 1) = 1 for any n, while LCM(n, 1) = n." },
    { q: "How is LCM used in fraction addition?", a: "To add 1/4 + 1/6, find LCM(4, 6) = 12. Convert both: 3/12 + 2/12 = 5/12. Using the LCM as the common denominator ensures the result is already in the simplest form relative to the denominator." },
]

useCalcSEO(
    "LCM & GCF Calculator — Least Common Multiple and Greatest Common Factor",
    "Free LCM and GCF calculator. Find the least common multiple and greatest common factor of any two numbers instantly, with step-by-step working.",
    faqs
)
</script>
