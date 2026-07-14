<template>
    <UiCalcPage title="Random Number Generator" category="math" description-title="True random numbers in any range — with or without repeats">
        <template #calc>
            <CalculatorsMathRandomNumberCalc />
        </template>
        <template #facts>
            <CalcFact label="Randomness" value="Crypto-grade" />
            <CalcFact label="Range" value="Any min–max" />
            <CalcFact label="Bulk" value="Up to 1000" />
        </template>
        <template #description>
            <p>
                This <strong>Random Number Generator</strong> picks numbers in any range you choose, using your browser's <strong>cryptographic random source</strong> — higher-quality randomness than the Math.random() most online generators use, with rejection sampling so every number in your range has an <strong>exactly equal chance</strong>.
            </p>
            <p>
                Generate a single number or up to 1,000 at once. Turn on <strong>"No duplicates"</strong> to draw without repeats — that turns the generator into a raffle picker, lottery-style number draw, or a way to sample a random subset from a numbered list.
            </p>
            <h3>Common uses</h3>
            <ul>
                <li><strong>Raffles & giveaways</strong> — number the entries, draw winners without repeats</li>
                <li><strong>Games</strong> — dice (1–6), decisions, random turn order</li>
                <li><strong>Sampling</strong> — pick 20 random items from 500 for a quality check</li>
                <li><strong>Testing</strong> — random values for spreadsheets and test data</li>
            </ul>
        </template>
        <template #example>
            <p>
                Your giveaway has <strong>230 entries</strong> and 3 winners. Set min = 1, max = 230, how many = 3, enable <strong>No duplicates</strong>, click Generate.
            </p>
            <p>
                You get three distinct entry numbers, each drawn with equal probability — e.g. <strong>47 · 198 · 12</strong>.
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
    { q: "How do I pick a random number between 1 and 100?", a: "Set minimum to 1, maximum to 100, and click Generate. Every number from 1 to 100 inclusive has an exactly equal 1% chance — the generator uses rejection sampling to avoid the subtle bias that naive modulo-based generators introduce." },
    { q: "Is this generator truly random?", a: "It uses crypto.getRandomValues — your operating system's cryptographic randomness source, which mixes hardware entropy (timing jitter, interrupts). That's far stronger than Math.random() and unpredictable for all practical purposes. Philosophically 'true' randomness needs physical measurement (radioactive decay, atmospheric noise), but for draws, games and sampling this is indistinguishable." },
    { q: "How do I draw lottery numbers?", a: "Example for a 6-of-49 lottery: min = 1, max = 49, how many = 6, and enable No duplicates. You get six distinct numbers, each combination equally likely — exactly like the physical draw. Remember it doesn't improve your odds; every combination, including 1-2-3-4-5-6, has the same probability." },
    { q: "How do I use this to pick a giveaway winner fairly?", a: "Number your entries 1 to N in a fixed order (e.g. sorted by entry time), set the range to 1–N, generate, and announce which entry number won. For multiple winners enable No duplicates. Publishing the numbered list beforehand makes the draw verifiable by participants." },
    { q: "What does the 'No duplicates' option do?", a: "It draws without replacement — like pulling numbered balls from a bag without putting them back. Each generated number is unique. With it off, every draw is independent, so repeats can occur (rolling a die twice can give two 6s)." },
    { q: "Why do random numbers sometimes repeat or cluster?", a: "Because that's what real randomness looks like. In 10 rolls of a die, repeats are expected (the chance of all-different is under 3%). Humans expect randomness to 'spread out' — actual random sequences have streaks and clusters. If a generator never repeated, it would be less random, not more." },
    { q: "What is the difference between Math.random() and crypto randomness?", a: "Math.random() is a pseudorandom algorithm seeded once — fast, but its outputs can theoretically be predicted from previous outputs, and quality varies by engine. crypto.getRandomValues draws from the OS entropy pool and is unpredictable even to someone who has seen all previous values. For anything where fairness matters, crypto is the safer choice." },
    { q: "Can I simulate dice rolls?", a: "Yes — a standard die is min 1, max 6. For two dice, generate 2 numbers with duplicates allowed and add them (don't generate 2–12 directly: the sum of two dice isn't uniform — 7 is six times likelier than 2). For a D20, set max to 20." },
    { q: "How do I generate random decimal numbers?", a: "Generate integers in a scaled range and divide: for two decimals between 0 and 1, generate 0–100 and divide by 100. This keeps the distribution perfectly uniform. For most practical uses (prices, measurements for test data) that's exactly equivalent." },
    { q: "Is it possible to predict the next number?", a: "Not feasibly. The numbers come from your operating system's cryptographic randomness, which is designed so that even an attacker who recorded every previous output cannot predict the next one. There's no pattern, seed or sequence to exploit." },
    { q: "How many numbers can I generate at once?", a: "Up to 1,000 per click, with or without duplicates. For unique draws the range must be at least as large as the count — you can't pick 50 unique numbers between 1 and 10. Need more? Run it multiple times or use a spreadsheet function seeded from these values." },
    { q: "Can negative numbers be generated?", a: "Yes — the range accepts any integers, including negatives. Min −50, max 50 works fine, as does a fully negative range like −100 to −1. The same equal-probability guarantee applies." },
]

useCalcSEO(
    "Random Number Generator — Any Range, No Repeats Option",
    "Generate truly random numbers in any range with crypto-grade fairness. Draw without duplicates for raffles and lotteries, up to 1000 at once. Free and instant.",
    faqs
)

useHead({
    script: [{
        type: 'application/ld+json',
        innerHTML: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'HowTo',
            name: 'How to Generate Random Numbers',
            description: 'Pick fair random numbers in any range, with or without repeats.',
            step: [
                { '@type': 'HowToStep', position: 1, name: 'Set the range', text: 'Enter the minimum and maximum — both included in the draw.' },
                { '@type': 'HowToStep', position: 2, name: 'Choose quantity and mode', text: 'Enter how many numbers you need and enable No duplicates for raffle-style draws.' },
                { '@type': 'HowToStep', position: 3, name: 'Generate and copy', text: 'Every value in the range has an exactly equal chance. Copy the results with one click.' },
            ],
        }),
    }],
})
</script>
