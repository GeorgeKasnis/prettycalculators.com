<template>
    <UiCalcPage title="JSON Formatter & Validator" category="other" description-title="Format, validate and minify JSON — privately, in your browser">
        <template #calc>
            <CalculatorsOtherJsonFormatterCalc />
        </template>
        <template #facts>
            <CalcFact label="Privacy" value="Never uploaded" />
            <CalcFact label="Validate" value="Line & column" />
            <CalcFact label="Indent" value="2 / 4 / minified" />
        </template>
        <template #description>
            <p>
                This <strong>JSON Formatter</strong> pretty-prints, validates and minifies JSON instantly — and because everything runs locally in your browser, <strong>your data never leaves your device</strong>. That matters: JSON often contains API keys, tokens, customer records and internal payloads that should never be pasted into a random website's server.
            </p>
            <p>
                Paste any JSON and choose <strong>2-space or 4-space formatting</strong> for readability, or <strong>Minify</strong> to strip all whitespace for production payloads. Invalid JSON gets a precise error with the <strong>line and column number</strong> of the problem, so you can find that missing comma in a 5,000-line file in seconds.
            </p>
            <h3>Common JSON errors this catches</h3>
            <ul>
                <li><strong>Trailing commas</strong> — <code>{"a": 1,}</code> is valid JavaScript but invalid JSON</li>
                <li><strong>Single quotes</strong> — JSON strings and keys must use double quotes</li>
                <li><strong>Unquoted keys</strong> — <code>{a: 1}</code> works in JS objects, not in JSON</li>
                <li><strong>Comments</strong> — JSON has no comment syntax; <code>//</code> or <code>/* */</code> break parsing</li>
                <li><strong>Special values</strong> — <code>undefined</code>, <code>NaN</code> and <code>Infinity</code> don't exist in JSON</li>
            </ul>
        </template>
        <template #example>
            <p>
                An API returns a minified 40KB response you need to inspect: <code>{"user":{"id":42,"roles":["admin","editor"]},…}</code>
            </p>
            <p>
                Paste it, click <strong>Format (2 spaces)</strong>, and the structure becomes readable with each key on its own line. When you're done editing, <strong>Minify</strong> collapses it back for the request body.
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
    { q: "How do I format JSON to make it readable?", a: "Paste your JSON above and click Format — it re-indents every level with consistent spacing, one key per line. Choose 2 spaces (the most common convention) or 4 spaces. The result is standard 'pretty-printed' JSON any tool can read." },
    { q: "Is it safe to paste sensitive JSON into an online formatter?", a: "Into most online formatters, no — anything pasted may travel to their servers. This tool is different: formatting happens entirely in your browser with JavaScript's built-in JSON.parse — nothing is transmitted anywhere. You can disconnect from the internet and it still works." },
    { q: "Why is my JSON invalid?", a: "The top offenders: a trailing comma after the last item, single quotes instead of double quotes, unquoted keys, comments (JSON doesn't allow them), or a stray control character from copy-pasting. Paste it above — the validator reports the exact line and column of the first problem." },
    { q: "What is the difference between JSON formatting and minifying?", a: "Formatting adds line breaks and indentation for human readability. Minifying removes every unnecessary space and newline, producing the smallest possible payload for network transfer. Both represent identical data — machines don't care, humans and bandwidth do." },
    { q: "Are trailing commas allowed in JSON?", a: "No. {\"a\": 1,} fails in every compliant parser, even though the same syntax is fine in JavaScript, Python and most modern languages. This mismatch is the single most common JSON error when hand-editing config files." },
    { q: "Can JSON have comments?", a: "Standard JSON cannot — // and /* */ both make it invalid. Some tools accept JSONC (JSON with comments), like VS Code settings files and tsconfig.json, but APIs and parsers expecting pure JSON will reject them. A common workaround is a \"_comment\" key." },
    { q: "Should JSON keys use single or double quotes?", a: "Double quotes, always — for both keys and string values. 'single quotes' are invalid JSON, another habit carried over from JavaScript. If your JSON came from a Python dict via str() instead of json.dumps(), this is why it won't parse." },
    { q: "How do I validate JSON from an API response?", a: "Paste the raw response body above and click any button — validation runs first. If it's invalid you'll get the error position; a common surprise is an HTML error page (starting with <) returned where JSON was expected, meaning the API call itself failed." },
    { q: "What is the maximum size of a JSON file?", a: "The format has no limit; practical limits come from parsers and memory. Browsers comfortably handle tens of megabytes with JSON.parse. This tool processes everything in-memory locally, so large files work — though beyond ~50MB the browser tab may slow down." },
    { q: "Why does JSON.parse fail on my JavaScript object?", a: "Because a JavaScript object literal isn't JSON: unquoted keys, single quotes, trailing commas, undefined, NaN, Date objects and functions are all valid in JS but not in JSON. Serialize with JSON.stringify(obj) instead of pasting the object's source code." },
    { q: "Does key order matter in JSON?", a: "Per the spec, no — objects are unordered collections, and two JSON documents with the same keys in different order are semantically equal. In practice most parsers preserve insertion order, but you should never rely on it; if order matters, use an array." },
    { q: "What is JSON used for?", a: "JSON (JavaScript Object Notation) is the standard data format of the web: REST API requests and responses, configuration files (package.json, tsconfig.json), data storage, log records, and inter-service messages. It won over XML by being lighter, easier to read, and natively supported in every major language." },
]

useCalcSEO(
    "JSON Formatter & Validator — Private, In-Browser",
    "Format, validate and minify JSON instantly. Errors reported with line and column. 100% in-browser — your data is never uploaded. Free, no limits.",
    faqs
)

useHead({
    script: [{
        type: 'application/ld+json',
        innerHTML: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'HowTo',
            name: 'How to Format and Validate JSON',
            description: 'Pretty-print, validate, or minify JSON data privately in the browser.',
            step: [
                { '@type': 'HowToStep', position: 1, name: 'Paste your JSON', text: 'Paste any JSON — an API response, config file, or log record — into the input. It is processed locally and never uploaded.' },
                { '@type': 'HowToStep', position: 2, name: 'Choose an action', text: 'Click Format for readable 2- or 4-space indentation, or Minify to strip whitespace. Validation runs automatically and reports errors with line and column.' },
                { '@type': 'HowToStep', position: 3, name: 'Copy the result', text: 'Click Copy Output to put the formatted or minified JSON on your clipboard.' },
            ],
        }),
    }],
})
</script>
