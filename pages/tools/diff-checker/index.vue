<template>
    <UiCalcPage title="Diff Checker" category="tools" description-title="Compare two texts and see exactly what changed">
        <template #calc>
            <CalculatorsToolsDiffCheckerCalc />
        </template>
        <template #facts>
            <CalcFact label="Privacy" value="Never uploaded" />
            <CalcFact label="Compares" value="Line by line" />
            <CalcFact label="Output" value="Added / removed" />
        </template>
        <template #description>
            <p>
                This <strong>Diff Checker</strong> compares two versions of a text line by line and highlights exactly what was <strong>added</strong> (green) and <strong>removed</strong> (red). Paste the original on the left, the changed version on the right, and see the differences instantly — contracts, code, essays, configuration files, translations, anything.
            </p>
            <p>
                Like all our tools, the comparison runs <strong>entirely in your browser</strong>. Neither text is uploaded anywhere — which matters when you're comparing contracts, legal documents, or proprietary code that shouldn't be pasted into a random website's server.
            </p>
            <h3>Common uses</h3>
            <ul>
                <li><strong>Contracts & documents</strong> — verify what a counterparty actually changed between versions</li>
                <li><strong>Code</strong> — compare two versions of a file without setting up git</li>
                <li><strong>Config files</strong> — find the one changed line between a working and broken configuration</li>
                <li><strong>Content editing</strong> — see edits between drafts when track-changes wasn't used</li>
            </ul>
        </template>
        <template #example>
            <p>
                You receive "contract_v2.docx" and want to know what changed from v1. Copy the text of each version into the two boxes and click <strong>Compare</strong>.
            </p>
            <p>
                The output shows unchanged lines in white, removed lines in red with a −, and added lines in green with a +. The counters at the top summarise the scale of the changes at a glance.
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
    { q: "How do I compare two texts for differences?", a: "Paste the original text into the left box and the changed version into the right box, then click Compare. Lines that were removed show in red with a minus sign, added lines show in green with a plus, and unchanged lines stay plain." },
    { q: "Is it safe to compare confidential documents here?", a: "Yes — the comparison runs entirely in your browser with JavaScript. Neither text is transmitted, stored, or logged anywhere. You can disconnect from the internet after loading the page and the tool keeps working. That's an important difference from most online diff sites, which process your text server-side." },
    { q: "What is a diff?", a: "A diff (from 'difference') is the standard way to show changes between two versions of a text: a minimal list of lines removed from the old version and lines added in the new one. The format comes from the Unix diff program (1974) and powers code review, version control, and document comparison everywhere." },
    { q: "How does a diff algorithm work?", a: "Most diff tools, including this one, find the Longest Common Subsequence (LCS) — the largest set of lines that appear in both texts in the same order. Everything in the old text that isn't part of the LCS is 'removed'; everything in the new text that isn't is 'added'. This produces the minimal, most readable set of changes." },
    { q: "Can I compare two Word documents?", a: "Copy the text out of each document (Ctrl+A, Ctrl+C) and paste into the two boxes. Formatting (bold, fonts) is not compared — only the text content. For tracked formatting changes, Word's built-in Review → Compare feature is the right tool; for pure text changes, a diff is faster and clearer." },
    { q: "Can I compare code files without git?", a: "Yes — paste the two versions and compare. It's line-based, the same granularity as git diff's default output. For whole projects with many files you'll want proper version control, but for a quick 'what changed between these two files' check, pasting is faster." },
    { q: "Why does the diff show a whole line as changed when only one word changed?", a: "This tool compares at line level: if any character in a line differs, the old line shows as removed and the new one as added. Line-level diffs are the standard for code and structured text. Word-level (inline) diffs exist but get noisy for large texts — reading the red/green line pair side by side shows the changed word quickly." },
    { q: "What do the + and − symbols mean in a diff?", a: "Minus (−, red) marks lines that exist in the original but not in the changed version — they were deleted or modified. Plus (+, green) marks lines that exist only in the new version — added or the modified replacement. A modified line appears as a −/+ pair." },
    { q: "Is there a limit to how much text I can compare?", a: "The tool handles thousands of lines comfortably. Very large pairs (where lines-in-A × lines-in-B exceeds ~4 million) are declined to keep your browser responsive — split the comparison into sections if you hit that." },
    { q: "How is this different from plagiarism checking?", a: "A diff compares two specific texts you provide and shows literal line changes. A plagiarism checker searches one text against a huge corpus (the web, academic databases) for similar passages. If you already have both texts, a diff gives an exact, deterministic answer." },
    { q: "Does whitespace count as a difference?", a: "Yes — a line with an extra space or a tab instead of spaces is a different line, which is often exactly what you need to find in code and config files (indentation bugs, trailing spaces). If you want to ignore whitespace, normalise both texts first — paste them through a find-and-replace." },
    { q: "Can I merge the two versions after comparing?", a: "This tool shows differences; merging is manual — copy the lines you want from each side. For frequent three-way merging (yours, theirs, common ancestor) use a dedicated merge tool like the one in VS Code or git mergetool." },
]

useCalcSEO(
    "Diff Checker — Compare Two Texts Online & Private",
    "Compare two texts line by line and see exactly what was added and removed. Runs 100% in your browser — contracts and code are never uploaded. Free text compare tool.",
    faqs
)

useHead({
    script: [{
        type: 'application/ld+json',
        innerHTML: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'HowTo',
            name: 'How to Compare Two Texts',
            description: 'Find the differences between two versions of a text.',
            step: [
                { '@type': 'HowToStep', position: 1, name: 'Paste both versions', text: 'Put the original text in the left box and the changed version in the right box.' },
                { '@type': 'HowToStep', position: 2, name: 'Click Compare', text: 'The texts are compared line by line, locally in your browser — nothing is uploaded.' },
                { '@type': 'HowToStep', position: 3, name: 'Read the highlights', text: 'Red lines with − were removed, green lines with + were added. The counters summarise total changes.' },
            ],
        }),
    }],
})
</script>
