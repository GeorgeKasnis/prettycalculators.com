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
    </UiCalcPage>
</template>

<script setup>
definePageMeta({ layout: 'brutalist' })
useCalcSEO(
    "Average Calculator — Mean, Median, Mode & Range",
    "Free average calculator. Enter a list of numbers to instantly find the mean, median, mode, range, sum and count. Works with any set of numbers.",
    [
        { q: "What is the difference between mean, median and mode?", a: "The mean is the sum of all values divided by the count. The median is the middle value when sorted. The mode is the most frequently occurring value. Each describes a data set differently." },
        { q: "When should I use median instead of mean?", a: "Use the median when your data has outliers or a skewed distribution. For example, median income is more representative than mean income because a few very high earners skew the mean upwards." },
        { q: "Can a data set have no mode?", a: "Yes. If all values appear the same number of times (typically once each), the data set has no mode. A data set can also have multiple modes if two or more values tie for most frequent." },
        { q: "How do you calculate the mean?", a: "Add all the numbers together and divide by how many numbers there are. For example, the mean of 2, 4, 6, 8 is (2+4+6+8)/4 = 20/4 = 5." },
    ]
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
