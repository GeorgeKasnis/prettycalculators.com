<template>
    <UiCalcPage title="Standard Deviation Calculator" category="math" description-title="Spread, variance, and dispersion of any data set">
        <template #calc>
            <CalculatorsMathStandardDeviationCalc />
        </template>
        <template #facts>
            <CalcFact label="Population SD" value="σ (sigma)" />
            <CalcFact label="Sample SD"     value="s" />
            <CalcFact label="68-95-99.7"    value="1σ, 2σ, 3σ rule" />
            <CalcFact label="Variance"      value="SD²" />
        </template>
        <template #description>
            <p>
                The <strong>Standard Deviation Calculator</strong> computes both population (σ) and sample (s) standard deviation, plus variance, mean, min, max, and count — from any list of numbers you paste in.
            </p>
            <p>
                Standard deviation measures how spread out values are around the mean. A low SD means values cluster tightly; a high SD means they are widely dispersed.
            </p>
            <h3>Population vs sample standard deviation</h3>
            <p>
                Use <strong>population SD (σ)</strong> when your data includes every member of the group you're studying (e.g., test scores for all students in one class). Use <strong>sample SD (s)</strong> when your data is a subset drawn from a larger population (e.g., survey responses from 200 people out of millions). Sample SD divides by <em>n − 1</em> (Bessel's correction) to correct for the bias introduced by using a sample to estimate a population parameter.
            </p>
            <h3>The 68-95-99.7 rule (empirical rule)</h3>
            <p>
                For normally distributed data: <strong>68%</strong> of values fall within 1 SD of the mean, <strong>95%</strong> within 2 SD, and <strong>99.7%</strong> within 3 SD. This rule lets you quickly assess how unusual any value is.
            </p>
            <p>
                Standard deviation is closely related to our <NuxtLink to="/math/average-calculator">average calculator</NuxtLink> — the mean is always calculated first before SD can be derived.
            </p>
        </template>
        <template #example>
            <p>Data set: <strong>2, 4, 4, 4, 5, 5, 7, 9</strong> (n = 8).</p>
            <p><strong>Mean</strong> = (2+4+4+4+5+5+7+9) / 8 = 40 / 8 = <strong>5</strong>.</p>
            <p>Squared differences from mean: (2−5)²=9, (4−5)²=1, (4−5)²=1, (4−5)²=1, (5−5)²=0, (5−5)²=0, (7−5)²=4, (9−5)²=16. Sum = 32.</p>
            <p><strong>Population variance</strong> = 32 / 8 = 4. <strong>Population SD (σ)</strong> = √4 = <strong>2</strong>.</p>
            <p><strong>Sample variance</strong> = 32 / 7 ≈ 4.571. <strong>Sample SD (s)</strong> = √4.571 ≈ <strong>2.138</strong>.</p>
        </template>
        <template #faq>
            <CalcFaq :faqs="faqs" />
        </template>
    </UiCalcPage>
</template>

<script setup>
definePageMeta({ layout: 'brutalist' })

const faqs = [
    { q: "What is standard deviation?", a: "Standard deviation (SD) measures how spread out numbers are around their mean. A low SD means values are clustered close to the average; a high SD means they are spread out widely. It is the square root of the variance." },
    { q: "What is the difference between population and sample standard deviation?", a: "Population SD (σ) is used when you have data for every member of the group. Sample SD (s) is used when your data is a subset of a larger population — it divides by n−1 instead of n (Bessel's correction) to give an unbiased estimate of the true population SD. Most real-world use cases call for sample SD." },
    { q: "How do you calculate standard deviation step by step?", a: "1) Find the mean. 2) Subtract the mean from each value and square the result. 3) Find the average of those squared differences (that's the variance). 4) Take the square root of the variance. For sample SD, divide by n−1 in step 3 instead of n." },
    { q: "What is a good standard deviation?", a: "There is no universal 'good' SD — it depends entirely on context and scale. A height SD of 10 cm for adults is normal. An SD of 10 cm for the length of a manufactured bolt would be catastrophically high. Compare SD relative to the mean using the coefficient of variation (CV = SD / mean × 100%)." },
    { q: "What does a standard deviation of 1 mean?", a: "On a standardised scale (z-scores), an SD of 1 means each data point is on average 1 unit away from the mean. On any raw scale it depends on the units — for IQ scores (mean 100, SD 15), SD=1 means scores typically deviate by 15 points from the mean." },
    { q: "What is the 68-95-99.7 rule?", a: "For a normal distribution: 68% of values fall within 1 standard deviation of the mean, 95% within 2 SDs, and 99.7% within 3 SDs. This means a value more than 2 SDs from the mean is rare (only 5% of data), and values beyond 3 SDs are very rare (0.3%)." },
    { q: "What is variance and how is it different from standard deviation?", a: "Variance is the average of squared deviations from the mean. Standard deviation is the square root of variance, bringing the measure back to the original units of the data. Variance is used in statistical calculations (e.g., ANOVA, regression); standard deviation is easier to interpret because it's in the same units as your data." },
    { q: "What is a high standard deviation?", a: "A standard deviation is 'high' when it is large relative to the mean. A coefficient of variation (CV = SD/mean × 100%) above 30% is often considered high variability. In finance, a stock with a daily return SD of 3% is considered very volatile. In quality control, a high SD means inconsistent products." },
    { q: "How does an outlier affect standard deviation?", a: "Outliers inflate SD significantly because deviations are squared — so a value far from the mean contributes disproportionately. Example: data set {2, 3, 4, 5, 100} has an SD of about 38.9, vs {2, 3, 4, 5, 6} with SD of 1.41. Always check your data for outliers before interpreting SD." },
    { q: "What is the standard deviation of 1, 2, 3, 4, 5?", a: "Mean = 3. Squared differences: 4, 1, 0, 1, 4. Sum = 10. Population variance = 10/5 = 2. Population SD = √2 ≈ 1.414. Sample SD = √(10/4) = √2.5 ≈ 1.581." },
]

useCalcSEO(
    "Standard Deviation Calculator — Population & Sample SD",
    "Free standard deviation calculator. Paste any list of numbers to get population SD, sample SD, variance, mean, min, max, and count instantly.",
    faqs
)

useHead({
    script: [{
        type: 'application/ld+json',
        innerHTML: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'HowTo',
            name: 'How to Calculate Standard Deviation',
            description: 'Find the population and sample standard deviation from a list of numbers.',
            step: [
                { '@type': 'HowToStep', position: 1, name: 'Enter your numbers', text: 'Type or paste your data set — separate values with commas, spaces, or new lines.' },
                { '@type': 'HowToStep', position: 2, name: 'Click Calculate', text: 'The calculator instantly returns population SD, sample SD, variance, mean, min, max, and count.' },
                { '@type': 'HowToStep', position: 3, name: 'Choose population or sample', text: 'Use population SD (σ) if your data covers the entire group. Use sample SD (s) if it is a subset of a larger population.' },
            ],
        }),
    }],
})
</script>
