<template>
    <UiCalcPage title="Lorem Ipsum Generator" category="tools" description-title="Placeholder text for designs and mockups">
        <template #calc>
            <CalculatorsToolsLoremIpsumCalc />
        </template>
        <template #facts>
            <CalcFact label="Units" value="Paragraphs / sentences / words" />
            <CalcFact label="Origin" value="Cicero, 45 BC" />
            <CalcFact label="Cost" value="Free, no limits" />
        </template>
        <template #description>
            <p>
                This <strong>Lorem Ipsum Generator</strong> produces placeholder text by the paragraph, sentence, or word — with realistic sentence lengths and punctuation, so your mockups behave like they will with real copy. Optionally start with the classic <em>"Lorem ipsum dolor sit amet…"</em> opening that designers instantly recognise as placeholder.
            </p>
            <p>
                Why use dummy text at all? Because real-looking text <strong>keeps the focus on the design</strong>. Show a client readable English and they'll review the words instead of the layout; show lorem ipsum and everyone evaluates typography, spacing, and hierarchy — which is the point of a mockup.
            </p>
            <h3>Where it comes from</h3>
            <p>
                Lorem ipsum is scrambled Latin from <strong>Cicero's "De finibus bonorum et malorum" (45 BC)</strong>, a treatise on ethics. Printers have used versions of it as specimen text since the 1500s; Letraset transfer sheets spread it through 1960s graphic design, and desktop publishing software carried it into the digital era. Pair the output with our <NuxtLink to="/tools/word-counter">word counter</NuxtLink> or <NuxtLink to="/other/reading-time-calculator">reading time calculator</NuxtLink> to size your placeholder to the real content you expect.
            </p>
        </template>
        <template #example>
            <p>
                Your landing-page mockup needs an intro of roughly 60 words. Choose <strong>Words</strong>, type <strong>60</strong>, generate, and paste — the block occupies exactly the space real copy will, so nothing shifts when the final text arrives.
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
    { q: "What is lorem ipsum?", a: "Lorem ipsum is the design industry's standard placeholder text — scrambled pseudo-Latin used to fill layouts before real content exists. It looks like natural language (realistic word lengths, sentences, paragraphs) without meaning anything, so viewers judge the design rather than reading the words." },
    { q: "Where does lorem ipsum come from?", a: "It's derived from Cicero's 'De finibus bonorum et malorum' (On the Ends of Good and Evil), written in 45 BC. The passage was scrambled — words cut and reordered — so it no longer translates to anything coherent. 'Lorem' itself is a fragment of 'dolorem' (pain), chopped mid-word." },
    { q: "Why do designers use lorem ipsum instead of real text?", a: "Because readable text hijacks attention: stakeholders start editing the copy instead of reviewing the layout. Meaningless placeholder keeps reviews focused on typography, spacing, and hierarchy. It also lets design proceed before the copywriting is finished." },
    { q: "Does lorem ipsum mean anything?", a: "Not as a whole. Individual fragments trace back to real Latin words about pain, pleasure, and effort (the original text discussed ethics), but the scrambling broke the grammar. Attempts to translate it produce nonsense — which is exactly its job." },
    { q: "Is it bad for SEO to publish lorem ipsum by accident?", a: "Yes — shipped placeholder text is one of the classic launch bugs. It looks unprofessional, and pages of meaningless text can be judged low-quality by search engines. Before launch, search your site for 'lorem ipsum' (site:yoursite.com lorem) to catch leftovers." },
    { q: "How much lorem ipsum should I use in a mockup?", a: "Match the real content's expected length — that's the whole trick. If the intro will be ~60 words, generate 60 words, not three paragraphs. Designs reviewed with wrong-length placeholder break when real copy arrives. Ask the copywriter for target word counts and generate to match." },
    { q: "Are there alternatives to lorem ipsum?", a: "Many teams now prefer realistic proto-content — draft headlines and representative sentences — because it exposes real-world problems (long German words, short punchy CTAs) that lorem ipsum hides. Novelty generators (bacon ipsum, cupcake ipsum) exist for fun. Lorem ipsum remains the neutral default everyone recognises." },
    { q: "Why does lorem ipsum always start with 'Lorem ipsum dolor sit amet'?", a: "Tradition — that's the opening of the standard scrambled passage that printers have copied since the 1500s, and it acts as a signal: anyone who sees it instantly knows the text is placeholder. This generator lets you toggle that classic opening on or off." },
    { q: "Can I use lorem ipsum text commercially?", a: "Yes — it's a 2,000-year-old scrambled text with no copyright. Generate as much as you like for client work, templates, and products. Just remember to replace it before shipping." },
    { q: "How many words are in a typical paragraph?", a: "Web paragraphs run 40–80 words (3–5 sentences); print paragraphs often run longer. This generator produces 4–7 sentences of 8–17 words per paragraph, which lands in the realistic range for body copy." },
    { q: "Does placeholder text affect page layout testing?", a: "Significantly — text length drives line wraps, element heights, and overflow. Test layouts with both shorter and longer placeholder than you expect (±50%) to make sure nothing breaks when real content varies. Generating different lengths here takes seconds." },
    { q: "What is 'greeking' in design?", a: "The general practice of using unreadable stand-in content — lorem ipsum, drawn squiggles, or gray bars — so viewers evaluate form rather than content. The name comes from the phrase 'it's all Greek to me', even though lorem ipsum is scrambled Latin." },
]

useCalcSEO(
    "Lorem Ipsum Generator — Paragraphs, Sentences, Words",
    "Generate lorem ipsum placeholder text by paragraph, sentence or word count. Realistic lengths, classic opening optional, copy with one click. Free, no limits.",
    faqs
)

useHead({
    script: [{
        type: 'application/ld+json',
        innerHTML: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'HowTo',
            name: 'How to Generate Lorem Ipsum Text',
            description: 'Create placeholder text sized to your layout.',
            step: [
                { '@type': 'HowToStep', position: 1, name: 'Choose amount and unit', text: 'Pick paragraphs, sentences, or words and enter how many you need.' },
                { '@type': 'HowToStep', position: 2, name: 'Generate', text: 'Toggle the classic "Lorem ipsum dolor sit amet" opening on or off and click Generate.' },
                { '@type': 'HowToStep', position: 3, name: 'Copy into your design', text: 'The word and character counts are shown. Copy the text with one click.' },
            ],
        }),
    }],
})
</script>
