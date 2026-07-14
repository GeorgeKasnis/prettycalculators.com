<template>
    <UiCalcPage title="URL Encoder / Decoder" category="tools" description-title="Percent-encode and decode URLs — in your browser">
        <template #calc>
            <CalculatorsToolsUrlEncoderCalc />
        </template>
        <template #facts>
            <CalcFact label="Privacy" value="Never uploaded" />
            <CalcFact label="Space" value="%20" />
            <CalcFact label="Standard" value="RFC 3986" />
        </template>
        <template #description>
            <p>
                This <strong>URL Encoder / Decoder</strong> converts text to percent-encoding and back. URLs can only contain a limited set of characters — spaces, accents, Greek letters, emoji, and symbols like <code>&amp;</code> or <code>?</code> must be escaped as <strong>%-sequences</strong> (<code>%20</code> for a space) or they break the URL.
            </p>
            <p>
                Two encode modes cover the two real-world cases: <strong>Encode</strong> (encodeURIComponent) escapes everything including <code>/</code> and <code>&amp;</code> — use it for a <em>value</em> going into a query string. <strong>Encode URL</strong> (encodeURI) leaves the URL structure characters <code>:/?&amp;=#</code> intact — use it to clean up a <em>whole URL</em> that contains spaces or unicode.
            </p>
            <p>
                Decoding also handles the legacy <code>+</code>-for-space convention used in form submissions. And as with every tool here, everything runs <strong>locally in your browser</strong> — URLs often contain tokens and session IDs that shouldn't be pasted into someone's server.
            </p>
        </template>
        <template #example>
            <p>
                You want to link to a search for <strong>"blue sneakers &amp; socks"</strong>: <code>example.com/search?q=…</code>
            </p>
            <p>
                Encoding the value gives <code>blue%20sneakers%20%26%20socks</code>. Without it, the <code>&amp;</code> would end the parameter early and the search would silently become just "blue sneakers".
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
    { q: "What is URL encoding (percent-encoding)?", a: "A way to represent characters that aren't allowed in URLs: each byte becomes % followed by two hex digits. A space becomes %20, an ampersand %26, the Greek α becomes %CE%B1 (its UTF-8 bytes). Defined in RFC 3986, it keeps URLs unambiguous across every browser and server." },
    { q: "What is the difference between encodeURIComponent and encodeURI?", a: "encodeURIComponent escapes everything except letters, digits and -_.!~*'() — use it for individual values (query parameters, path segments). encodeURI leaves URL structure characters :/?#&=+ untouched — use it on complete URLs. Encoding a full URL with encodeURIComponent breaks it; encoding a parameter with encodeURI leaves dangerous characters in." },
    { q: "Why does a space sometimes become %20 and sometimes +?", a: "Two standards: %20 is the RFC 3986 encoding, valid everywhere in a URL. The + convention comes from HTML form submissions (application/x-www-form-urlencoded) and is only interpreted as a space in the query string. When decoding, this tool converts + to space; when encoding, it produces the universal %20." },
    { q: "Which characters must be encoded in a URL?", a: "Anything outside A–Z, a–z, 0–9 and -._~ needs encoding when used as data: spaces, quotes, <>, {}, |, ^, backslash, and all non-ASCII (accents, Greek, Chinese, emoji). Reserved characters :/?#[]@!$&'()*+,;= are legal but only in their structural roles — as data values they must be escaped too." },
    { q: "Why is my URL parameter cut off after an & or #?", a: "Because those characters have structural meaning: & separates parameters and # starts the fragment. If your value contains them unencoded, the URL parser ends your parameter there. Encode the value first — & becomes %26, # becomes %23 — and it arrives intact." },
    { q: "How do I decode a URL with %20 and other %-codes?", a: "Paste it above and click Decode. Each %XX sequence is converted back to its character, multi-byte UTF-8 sequences (like %CE%B1 for α) are reassembled, and + signs are treated as spaces. If you see a 'malformed' error, the string contains a stray % that isn't part of a valid sequence." },
    { q: "What is double encoding and why is it a problem?", a: "Encoding already-encoded text: %20 becomes %2520 (the % itself gets escaped as %25). It happens when two layers of code both encode. The symptom is literal %20 appearing in displayed text. Fix: encode exactly once, at the point where the value enters the URL. To repair a double-encoded string, decode it twice." },
    { q: "Do I need to encode URLs with Greek or other non-Latin characters?", a: "For machine use yes — under the hood, non-ASCII characters are always transmitted percent-encoded (as UTF-8 bytes). Modern browsers display them decoded in the address bar for readability, but when you paste such a URL into code, an API call, or an HTML attribute, encoding it makes it universally safe." },
    { q: "Is it safe to paste URLs with tokens into this tool?", a: "Yes — encoding and decoding run entirely in your browser's JavaScript. Nothing is transmitted or logged. That matters because URLs routinely embed session tokens, API keys and personal data in their parameters." },
    { q: "How do I encode a URL in JavaScript / Python / Excel?", a: "JavaScript: encodeURIComponent(value). Python: urllib.parse.quote(value) — use quote_plus for form-style. PHP: rawurlencode(). Excel: ENCODEURL(). All produce the same %-sequences as this tool; use it to spot-check what your code should output." },
    { q: "Why do URLs from Google or social media look like gibberish?", a: "They're heavily percent-encoded: tracking parameters, redirect targets (full URLs nested inside a parameter — encoded so their own & and / don't break the outer URL), and non-Latin text. Paste one into the decoder above to read what it actually contains — often revealing the real destination of a redirect link." },
    { q: "What is the maximum length of a URL?", a: "No formal limit exists, but practical ones do: browsers and CDNs commonly cap around 2,000–8,000 characters, and old IE stopped at 2,083. Percent-encoding triples the length of non-ASCII text, so long unicode parameters can hit limits fast — worth checking after encoding." },
]

useCalcSEO(
    "URL Encoder / Decoder — Percent Encoding Online",
    "Encode and decode URLs and query parameters (percent-encoding, %20, UTF-8). Two modes for values vs whole URLs. Runs in your browser — tokens stay private.",
    faqs
)

useHead({
    script: [{
        type: 'application/ld+json',
        innerHTML: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'HowTo',
            name: 'How to URL-Encode or Decode Text',
            description: 'Convert text to percent-encoding or decode an encoded URL.',
            step: [
                { '@type': 'HowToStep', position: 1, name: 'Paste your input', text: 'Paste plain text, a parameter value, or an encoded URL.' },
                { '@type': 'HowToStep', position: 2, name: 'Pick the right action', text: 'Encode for query-string values (escapes everything), Encode URL for complete URLs (keeps :/?&= intact), or Decode to read an encoded string.' },
                { '@type': 'HowToStep', position: 3, name: 'Copy the result', text: 'Everything runs locally in your browser — copy the output with one click.' },
            ],
        }),
    }],
})
</script>
