<template>
    <UiCalcPage title="Average Calculator" category="math" description-title="Mean, median, mode and more from any list">
        <template #calc>
            <CalculatorsMathAverageCalc />
        </template>
        <template #facts>
            <CalcFact label="Mean"   value="Sum ÷ Count" />
            <CalcFact label="Median" value="Middle value" />
            <CalcFact label="Mode"   value="Most frequent" />
            <CalcFact label="Range"  value="Max − Min" />
        </template>
        <template #description>
            <p>
                The <strong>Average Calculator</strong> computes six key statistics from any list of numbers: mean, median, mode, range, sum, and count. Enter your numbers separated by commas, spaces, or new lines — the calculator handles the rest instantly.
            </p>
            <p>The three types of "average" each describe the data differently:</p>
            <ul>
                <li><strong>Mean</strong> — The arithmetic average. Add all numbers and divide by the count. Most commonly used but sensitive to outliers.</li>
                <li><strong>Median</strong> — The middle value when the numbers are sorted. For an even count, it's the average of the two middle values. Robust against outliers.</li>
                <li><strong>Mode</strong> — The value that appears most often. Useful for categorical data or when you want to know the most common result.</li>
            </ul>
            <p>
                The <strong>range</strong> (max − min) gives a quick sense of how spread out the data is. For a deeper measure of spread, use standard deviation (a separate calculation). The range is a good first indicator when comparing data sets.
            </p>
        </template>
        <template #example>
            <p>
                Find the mean, median and mode of: <strong>4, 8, 6, 4, 9, 3, 4, 7</strong>.
            </p>
            <p>
                <strong>Mean:</strong> (4+8+6+4+9+3+4+7) / 8 = 45 / 8 = <strong>5.625</strong>
            </p>
            <p>
                <strong>Median:</strong> Sort the values: 3, 4, 4, 4, 6, 7, 8, 9. Two middle values are 4 and 6. Median = (4+6)/2 = <strong>5</strong>.
            </p>
            <p>
                <strong>Mode:</strong> 4 appears 3 times — more than any other value. Mode = <strong>4</strong>.
            </p>
            <p>
                <strong>Range:</strong> 9 − 3 = <strong>6</strong>. Sum = <strong>45</strong>. Count = <strong>8</strong>.
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
    { q: "What is the difference between mean, median and mode?", a: "The mean is the sum of all values divided by the count. The median is the middle value when sorted. The mode is the most frequently occurring value. Each describes a data set differently." },
    { q: "When should I use median instead of mean?", a: "Use the median when your data has outliers or a skewed distribution. For example, median income is more representative than mean income because a few very high earners skew the mean upwards." },
    { q: "Can a data set have no mode?", a: "Yes. If all values appear the same number of times (typically once each), the data set has no mode. A data set can also have multiple modes if two or more values tie for most frequent." },
    { q: "How do you calculate the mean?", a: "Add all the numbers together and divide by how many numbers there are. For example, the mean of 2, 4, 6, 8 is (2+4+6+8)/4 = 20/4 = 5." },
    { q: "What is a weighted average and how is it different from mean?", a: "A weighted average assigns different importance (weights) to each value. Example: a student scores 80 on a test worth 40% and 90 on one worth 60%. Weighted average = (80×0.4 + 90×0.6) = 32 + 54 = 86. A regular mean of 80 and 90 gives 85 — the weighted version reflects the different importance of each test." },
    { q: "How do I find the average of percentages?", a: "To average percentages correctly, you need to know what each percentage refers to. If they're all of the same base (e.g. all out of 100 questions), you can take the simple mean. If the bases differ — say 80% of 50 questions and 70% of 100 questions — you must calculate the actual totals: (0.8×50 + 0.7×100) ÷ (50+100) = (40+70) ÷ 150 = 73.3%." },
    { q: "What is the mean of 1 to 10?", a: "The mean of all integers from 1 to 10 is (1+2+3+4+5+6+7+8+9+10) ÷ 10 = 55 ÷ 10 = 5.5. For any consecutive sequence from 1 to n, the mean is always (n+1) ÷ 2. For 1–10: (10+1) ÷ 2 = 5.5." },
    { q: "How does an outlier affect the mean?", a: "Outliers have a large effect on the mean but little effect on the median. For example, data set: 10, 12, 11, 13, 100. Mean = (10+12+11+13+100) ÷ 5 = 29.2 — misleadingly high. Median = 12 — much more representative of the typical value. This is why median is preferred for skewed data." },
    { q: "What is the range of a data set?", a: "The range is the difference between the maximum and minimum values: Range = Max − Min. For the set 3, 7, 2, 9, 5: range = 9 − 2 = 7. A large range indicates high variability; a small range means values are clustered together. Range is a simple but limited measure of spread — standard deviation provides a more complete picture." },
    { q: "How do I calculate the average of negative numbers?", a: "Negative numbers are averaged the same way as positive ones. Example: mean of −5, −3, 2, 4, 7 = (−5 + −3 + 2 + 4 + 7) ÷ 5 = 5 ÷ 5 = 1. Just be careful with signs when adding — enter negative numbers with a minus sign in the calculator." },
]

useCalcSEO(
    "Average Calculator — Mean, Median, Mode & Range",
    "Free average calculator. Enter a list of numbers to instantly find the mean, median, mode, range, sum and count. Works with any set of numbers.",
    faqs
)

useHead({
    script: [{
        type: 'application/ld+json',
        innerHTML: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'HowTo',
            name: 'How to Calculate Mean, Median, Mode and Range',
            description: 'Find the average and key statistics from any list of numbers.',
            step: [
                { '@type': 'HowToStep', position: 1, name: 'Enter your numbers', text: 'Type your numbers into the input field separated by commas, spaces, or new lines.' },
                { '@type': 'HowToStep', position: 2, name: 'Click Calculate', text: 'Press the calculate button to process your data set.' },
                { '@type': 'HowToStep', position: 3, name: 'Read your results', text: 'The calculator displays mean, median, mode, range, sum, and count for your data set.' },
            ],
        }),
    }],
})
</script>
