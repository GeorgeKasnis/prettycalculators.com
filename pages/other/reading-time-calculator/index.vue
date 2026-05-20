<template>
    <UiCalcPage title="Reading Time Calculator" category="other" description-title="Estimate how long it takes to read any text">
        <template #calc>
            <CalculatorsOtherReadingTimeCalc />
        </template>
        <template #facts>
            <CalcFact label="Average adult" value="238 WPM" />
            <CalcFact label="Speed reader" value="400–700 WPM" />
            <CalcFact label="Novel (90k words)" value="~6.3 hours" />
            <CalcFact label="Blog post (800w)" value="~3 min" />
        </template>
        <template #description>
            <p>
                The <strong>Reading Time Calculator</strong> estimates how long it will take to read a piece of text based on word count and reading speed. The default speed of <strong>238 words per minute (WPM)</strong> is the research-backed average for adult silent reading in English.
            </p>
            <p>
                Adjust the WPM to match your reading style:
            </p>
            <ul>
                <li><strong>150–180 WPM</strong> — slow, careful reading (technical or legal content)</li>
                <li><strong>200–250 WPM</strong> — average adult reading</li>
                <li><strong>300–400 WPM</strong> — fast reader</li>
                <li><strong>400–700 WPM</strong> — speed reader (with reduced comprehension)</li>
            </ul>
            <p>
                Content type matters too — dense academic text or code takes longer per word than a novel.
            </p>
        </template>
        <template #example>
            <p>A blog post with <strong>1,200 words</strong> at the average speed of <strong>238 WPM</strong>:</p>
            <p>Reading time = 1,200 ÷ 238 = <strong>5 minutes 3 seconds</strong></p>
            <p>For a 90,000-word novel at 238 WPM: 90,000 ÷ 238 ≈ <strong>378 min ≈ 6.3 hours</strong></p>
        </template>
        <template #faq>
            <CalcFaq :faqs="faqs" />
        </template>
    </UiCalcPage>
</template>

<script setup>
definePageMeta({ layout: 'brutalist' })

const faqs = [
    { q: "How fast does the average person read?", a: "Research consistently puts average adult silent reading speed at around 200–250 words per minute, with 238 WPM being the most cited figure from a 2019 meta-analysis by Brysbaert. Skilled adult readers average 250–300 WPM." },
    { q: "How is reading time calculated?", a: "Reading Time (minutes) = Word Count ÷ Words Per Minute. For 1,500 words at 238 WPM: 1500 ÷ 238 = 6.3 minutes, or about 6 minutes and 18 seconds." },
    { q: "How many words per page is standard?", a: "A standard book page contains approximately 250–300 words (at 12pt font, standard margins). Academic papers and manuscripts typically use 250 words per page. Paperbacks can vary from 200 to 400 words per page depending on formatting." },
    { q: "How long does it take to read a book?", a: "A typical novel is 70,000–100,000 words. At 238 WPM with 1-hour sessions, a 80,000-word novel takes about 5.6 hours — or roughly 6 reading sessions. Non-fiction with dense content takes longer per page due to comprehension pauses." },
    { q: "How long does it take to read a 1,000 word article?", a: "At the average reading speed of 238 WPM: 1,000 ÷ 238 ≈ 4 minutes 12 seconds. Medium and blog platforms often display 'X min read' estimates using a similar calculation." },
    { q: "Does reading speed affect comprehension?", a: "Yes. Speed reading techniques can push rates above 400–600 WPM but typically reduce comprehension and retention. Most research shows that comprehension drops significantly above 300–400 WPM. For learning or retaining information, slower, focused reading is more effective." },
    { q: "How can I improve my reading speed?", a: "Proven techniques include: eliminating subvocalisation (saying words in your head), reducing fixation time per word, expanding peripheral vision to take in more words per glance, and minimising re-reading. Apps like Spreeder use rapid serial visual presentation (RSVP) for practice." },
    { q: "How many words is a 5-minute read?", a: "At 238 WPM: 5 × 238 = approximately 1,190 words. Most blog posts targeting a '5-minute read' aim for 1,000–1,300 words. Medium's read-time estimate uses roughly 265 WPM." },
    { q: "How long to read Harry Potter or other famous books?", a: "Harry Potter and the Philosopher's Stone (~77,000 words) takes about 5.4 hours. The entire Harry Potter series (~1,084,000 words) takes roughly 76 hours. The Lord of the Rings (~500,000 words) takes about 35 hours at average reading speed." },
    { q: "How do I count words in my document?", a: "In Microsoft Word: Review → Word Count. In Google Docs: Tools → Word Count (Ctrl+Shift+C). Most writing apps display a live word count. For web content, paste into a free word counter tool or use browser extensions." },
]

useCalcSEO(
    "Reading Time Calculator — How Long to Read Any Text",
    "Free reading time calculator. Enter your word count to find out how long it takes to read at the average speed of 238 words per minute.",
    faqs
)
</script>
