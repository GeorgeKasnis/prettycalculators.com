<template>
    <UiCalcPage title="Word Counter" category="tools" description-title="Words, characters, sentences, and reading time">
        <template #calc>
            <CalculatorsToolsWordCounterCalc />
        </template>
        <template #facts>
            <CalcFact label="Avg read speed"  value="238 wpm" />
            <CalcFact label="Avg speak speed" value="130 wpm" />
            <CalcFact label="Blog post"       value="~1,500 words" />
            <CalcFact label="Novel chapter"   value="~3,000–5,000" />
        </template>
        <template #description>
            <p>
                The <strong>Word Counter</strong> instantly counts words, characters (with and without spaces), sentences, paragraphs, unique words, estimated reading time, and speaking time — all in real time as you type or paste.
            </p>
            <h3>Reading time vs speaking time</h3>
            <p>
                Reading time is estimated at <strong>238 words per minute</strong> (the average silent reading speed for adults). Speaking time uses <strong>130 words per minute</strong> (the average pace for a clear, natural speech delivery). Presenters and podcasters often use 120–150 wpm; audiobooks average 150–160 wpm.
            </p>
            <h3>Typical word count benchmarks</h3>
            <ul>
                <li><strong>Tweet / social post</strong> — under 280 characters (~50 words)</li>
                <li><strong>Email</strong> — 50–200 words</li>
                <li><strong>Blog post</strong> — 800–2,000 words (5–8 min read)</li>
                <li><strong>Long-form article / SEO content</strong> — 2,000–4,000 words</li>
                <li><strong>Short story</strong> — 1,000–7,500 words</li>
                <li><strong>Novel</strong> — 70,000–100,000 words</li>
                <li><strong>5-minute speech</strong> — ~650–700 words</li>
                <li><strong>10-minute presentation</strong> — ~1,300–1,400 words</li>
            </ul>
        </template>
        <template #example>
            <p>The Gettysburg Address is <strong>271 words</strong> long. At 238 wpm average reading speed: 271 / 238 ≈ 1 minute 8 seconds to read silently. At 130 wpm speaking pace: 271 / 130 ≈ 2 minutes 5 seconds to deliver aloud — which matches Lincoln's reported 2-minute delivery.</p>
        </template>
        <template #faq>
            <CalcFaq :faqs="faqs" />
        </template>
    </UiCalcPage>
</template>

<script setup>
definePageMeta({ layout: 'brutalist' })

const faqs = [
    { q: "How do you count words?", a: "Words are counted by splitting text on whitespace (spaces, tabs, newlines) and counting the resulting non-empty segments. 'hello-world' counts as 1 word; 'hello world' counts as 2. Most word processors and this calculator use this whitespace-based method." },
    { q: "How many words is a 5-minute speech?", a: "At an average speaking rate of 130 words per minute: 5 × 130 = 650 words. At a faster 160 wpm (common for practiced speakers): 800 words. For a relaxed, deliberate pace (110 wpm): about 550 words. Aim for 650–750 words for a 5-minute talk." },
    { q: "How long does it take to read 1,000 words?", a: "At the average silent reading speed of 238 wpm: 1,000 / 238 ≈ 4 minutes 12 seconds. Faster readers at 300 wpm take about 3 minutes 20 seconds. Slow or careful readers at 150 wpm take about 6 minutes 40 seconds." },
    { q: "How many words is a page?", a: "A standard page of double-spaced, 12pt Times New Roman text holds approximately 250–275 words. Single-spaced the same font fits about 500–550 words per page. A novel page in print typically runs 250–300 words. Academic essays commonly use the 250-words-per-page rule of thumb." },
    { q: "How many characters is 1,000 words?", a: "English averages about 5 characters per word plus a space = 6 characters per word. So 1,000 words ≈ 6,000 characters including spaces, or about 5,000 characters excluding spaces. Actual counts vary by vocabulary — technical texts with longer words run higher; conversational writing runs lower." },
    { q: "How many words should a blog post be for SEO?", a: "There is no magic number, but analysis of top-ranking pages consistently shows that posts between 1,500 and 2,500 words tend to rank better for competitive keywords, likely because they cover a topic more comprehensively. For low-competition informational queries, 800–1,200 words is often enough. Prioritise depth and relevance over hitting an arbitrary target." },
    { q: "How many words is a 10-minute read?", a: "At 238 wpm: 10 minutes × 238 = 2,380 words. This is roughly the length of a thorough long-form blog post or short academic paper. Medium.com and similar platforms use this calculation for their read-time estimates." },
    { q: "What is the average word count of a novel?", a: "Most published novels fall between 70,000 and 100,000 words. Genre fiction (romance, thriller) often ranges 80,000–100,000 words. Literary fiction and fantasy tend toward 90,000–120,000. Debut novels are frequently advised to stay under 100,000 words. Short novels (novellas) are typically 20,000–40,000 words." },
    { q: "How many words per minute does the average person type?", a: "The average typist manages 40–55 words per minute. Touch typists who have practiced reach 70–80 wpm. Professional typists and fast touch typists can sustain 100+ wpm. The world record for sustained typing exceeds 200 wpm. For planning writing sessions, 40–50 wpm is a safe assumption for prose (not code or editing)." },
    { q: "How do I count words in a document without a word counter?", a: "In Microsoft Word: look at the status bar at the bottom — it shows word count automatically. In Google Docs: Tools → Word Count (or Ctrl+Shift+C). In plain text editors without a counter, copy-paste into this word counter. For programming, split the text on whitespace and count the resulting tokens." },
]

useCalcSEO(
    "Word Counter — Words, Characters, Reading Time",
    "Free word counter. Paste or type text to instantly count words, characters, sentences, paragraphs, unique words, reading time, and speaking time.",
    faqs
)

useHead({
    script: [{
        type: 'application/ld+json',
        innerHTML: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'HowTo',
            name: 'How to Count Words',
            description: 'Use the word counter to get word count, character count, and reading time from any text.',
            step: [
                { '@type': 'HowToStep', position: 1, name: 'Paste or type your text', text: 'Type directly into the text box or paste from any document or website.' },
                { '@type': 'HowToStep', position: 2, name: 'Read results instantly', text: 'Word count, character count (with and without spaces), sentences, paragraphs, unique words, reading time, and speaking time all update in real time.' },
            ],
        }),
    }],
})
</script>
