<template>
    <UiCalcPage title="Text Case Converter" category="tools" description-title="UPPERCASE, lowercase, Title Case, camelCase and more">
        <template #calc>
            <CalculatorsToolsTextCaseCalc />
        </template>
        <template #facts>
            <CalcFact label="Cases" value="8 formats" />
            <CalcFact label="Live" value="Updates as you type" />
            <CalcFact label="Privacy" value="Never uploaded" />
        </template>
        <template #description>
            <p>
                This <strong>Text Case Converter</strong> switches any text between eight formats with one click: <strong>UPPERCASE, lowercase, Title Case, Sentence case</strong> for writing — and <strong>camelCase, PascalCase, snake_case, kebab-case</strong> for code. Once you pick a case, the result updates live as you keep typing.
            </p>
            <p>
                The classic rescue mission: a paragraph typed WITH CAPS LOCK ON. Click <strong>Sentence case</strong> and it's fixed — first letter of each sentence capitalised, everything else lowered. The Title Case mode is smart about it: minor words (a, of, the, and…) stay lowercase mid-title, the way style guides actually want headlines written.
            </p>
            <h3>The developer cases</h3>
            <ul>
                <li><strong>camelCase</strong> — JavaScript variables: <code>userFirstName</code></li>
                <li><strong>PascalCase</strong> — class and component names: <code>UserProfile</code></li>
                <li><strong>snake_case</strong> — Python variables, database columns: <code>user_first_name</code></li>
                <li><strong>kebab-case</strong> — URLs, CSS classes, file names: <code>user-first-name</code></li>
            </ul>
            <p>
                The converter detects word boundaries in any of these formats, so it converts <em>between</em> them too — paste <code>userFirstName</code> and click snake_case to get <code>user_first_name</code>.
            </p>
        </template>
        <template #example>
            <p>
                Paste <strong>"THE QUICK BROWN FOX JUMPS OVER THE LAZY DOG"</strong> and click <strong>Title Case</strong>:
            </p>
            <p>
                Result: <strong>"The Quick Brown Fox Jumps Over the Lazy Dog"</strong> — note "the" stays lowercase mid-sentence but is capitalised as the first word, following standard headline style.
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
    { q: "How do I fix text typed in all caps?", a: "Paste it and click Sentence case — every letter is lowered, then the first letter of each sentence is re-capitalised. It's the fastest fix for the caps-lock paragraph. For headlines, use Title Case instead." },
    { q: "What is the difference between Title Case and Sentence case?", a: "Title Case capitalises the main words of a headline ('The Art of Being Right'); Sentence case capitalises only the first word and proper nouns ('The art of being right'). News headlines and book titles traditionally use Title Case; most modern web UIs and European styles prefer sentence case." },
    { q: "Which words stay lowercase in Title Case?", a: "Minor words: articles (a, an, the), short conjunctions (and, but, or), and short prepositions (of, in, on, to, by, at). The first and last words are always capitalised regardless. Style guides differ on details (AP vs Chicago), but this converter follows the common convention." },
    { q: "What is camelCase and where is it used?", a: "Words joined without spaces, first word lowercase, each following word capitalised: userFirstName. It's the standard for variable and function names in JavaScript, Java, and Swift. The name comes from the capital letters looking like camel humps." },
    { q: "What is the difference between camelCase and PascalCase?", a: "Only the first letter: camelCase starts lowercase (userProfile), PascalCase starts uppercase (UserProfile). Convention assigns them different jobs — camelCase for variables and functions, PascalCase for classes, types, and components (React components must be PascalCase)." },
    { q: "When should I use snake_case vs kebab-case?", a: "snake_case (underscores) is standard in Python, Ruby, and SQL database columns. kebab-case (hyphens) rules URLs, CSS class names, and file names for the web — hyphens are treated as word separators by search engines, underscores are not. That's why blog slugs are kebab-case." },
    { q: "Why does Google prefer hyphens over underscores in URLs?", a: "Google treats a hyphen as a word separator but historically treated an underscore as a word joiner: blue-widgets reads as 'blue widgets', blue_widgets risked reading as 'bluewidgets'. For URL slugs, kebab-case is the safe SEO choice — one of the reasons this converter exists." },
    { q: "Can this convert between programming cases, like camelCase to snake_case?", a: "Yes — the converter recognises word boundaries from capital letters, underscores, hyphens, and spaces. Paste getUserById and click snake_case to get get_user_by_id, or paste api_base_url and click PascalCase to get ApiBaseUrl." },
    { q: "Does the converter handle accented and non-English letters?", a: "Yes — upper/lower conversion uses Unicode-aware JavaScript methods, so é↔É and ά↔Ά work. Note that case rules vary by language (the Turkish dotless ı is the famous edge case); the converter applies the default Unicode mappings." },
    { q: "Is my text uploaded anywhere when I convert it?", a: "No — conversion runs entirely in your browser with JavaScript string methods. Nothing is transmitted, logged, or stored, so it's safe for confidential drafts, code, and documents." },
    { q: "What is 'aLtErNaTiNg CaSe' and why isn't it here?", a: "The mocking-text meme format from social media. We kept the converter to the eight cases people use for actual work; if you need the meme, alternate manually or ask us to add it." },
    { q: "How do I capitalise every word in Excel or Google Sheets?", a: "Use =PROPER(A1) — that's Excel's version of Title Case, though it capitalises every word including 'the' and 'of'. UPPER() and LOWER() cover the basic cases. For a smarter title case that respects minor words, convert here and paste back." },
]

useCalcSEO(
    "Text Case Converter — Upper, Lower, Title, camelCase",
    "Convert text between UPPERCASE, lowercase, Title Case, Sentence case, camelCase, PascalCase, snake_case and kebab-case. Live, private, free — fix caps lock text instantly.",
    faqs
)

useHead({
    script: [{
        type: 'application/ld+json',
        innerHTML: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'HowTo',
            name: 'How to Convert Text Case',
            description: 'Switch text between writing and programming case formats.',
            step: [
                { '@type': 'HowToStep', position: 1, name: 'Paste your text', text: 'Type or paste any text — including camelCase or snake_case identifiers.' },
                { '@type': 'HowToStep', position: 2, name: 'Click a case', text: 'Choose from UPPERCASE, lowercase, Title Case, Sentence case, camelCase, PascalCase, snake_case, or kebab-case. The result updates live as you edit.' },
                { '@type': 'HowToStep', position: 3, name: 'Copy the result', text: 'Click Copy Result — the conversion happens locally, nothing is uploaded.' },
            ],
        }),
    }],
})
</script>
