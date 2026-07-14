<template>
    <UiCalcPage title="Base64 Encoder / Decoder" category="tools" description-title="Encode and decode Base64 — UTF-8 safe, in your browser">
        <template #calc>
            <CalculatorsToolsBase64Calc />
        </template>
        <template #facts>
            <CalcFact label="Privacy" value="Never uploaded" />
            <CalcFact label="Unicode" value="UTF-8 safe" />
            <CalcFact label="Size cost" value="+33%" />
        </template>
        <template #description>
            <p>
                This <strong>Base64 Encoder / Decoder</strong> converts text to Base64 and back, entirely in your browser. It's <strong>UTF-8 safe</strong> — emoji, Greek, Chinese and any other Unicode text encode and decode correctly, which naive tools using plain btoa() get wrong.
            </p>
            <p>
                Because everything runs locally, it's safe for the things Base64 often carries: <strong>API keys, basic-auth credentials, JWT segments, config secrets</strong>. Nothing you paste here leaves your device.
            </p>
            <h3>What Base64 actually is</h3>
            <p>
                Base64 is <strong>not encryption</strong> — it's a transport encoding. It represents any bytes using 64 safe characters (A–Z, a–z, 0–9, +, /) so binary data can travel through systems designed for plain text: email attachments, JSON payloads, data URLs, HTTP headers. Anyone can decode it instantly — never treat it as protection.
            </p>
        </template>
        <template #example>
            <p>
                Encoding <code>Hello, world!</code> produces <code>SGVsbG8sIHdvcmxkIQ==</code>.
            </p>
            <p>
                The <strong>==</strong> at the end is padding: Base64 works in 3-byte groups, and padding marks how many bytes the final group was short. Decoding reverses it exactly — byte for byte.
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
    { q: "What is Base64 encoding used for?", a: "Carrying binary or arbitrary data through text-only channels: images embedded in CSS/HTML as data URLs, email attachments (MIME), API credentials in HTTP Basic Auth headers, the payload segments of JWT tokens, and binary values inside JSON or XML, which can only hold text." },
    { q: "Is Base64 encryption? Is it secure?", a: "No — Base64 is an encoding, not encryption. There is no key; anyone can decode it instantly. It only makes data transportable, not secret. If you see a 'password' stored in Base64, treat it as stored in plain text. For secrecy you need actual encryption (AES, etc.)." },
    { q: "Why does Base64 end with = or ==?", a: "Padding. Base64 converts each 3 bytes of input into 4 output characters. If the input length isn't a multiple of 3, the last group is padded: one = means the final group had 2 bytes, == means it had 1. Some variants (like JWT's base64url) drop the padding entirely." },
    { q: "Why is my decoded Base64 garbled or an error?", a: "Common causes: the string is base64url (uses - and _ instead of + and /) — replace those characters first; it's truncated or has whitespace/line breaks inside (this tool strips whitespace automatically); or the decoded bytes aren't text at all but binary data like an image, which won't display as readable characters." },
    { q: "How much bigger does Base64 make data?", a: "Exactly 4/3 of the original — about 33% larger (plus padding). That's the price of using only 64 safe characters: each character carries 6 bits instead of a byte's 8. This is why embedding large images as Base64 data URLs hurts page performance." },
    { q: "What is the difference between Base64 and base64url?", a: "Standard Base64 uses + and /, which clash with URLs and file names. Base64url (RFC 4648 §5) swaps them for - and _ and usually omits = padding. JWTs, URL parameters, and many APIs use base64url. To decode base64url here, replace - with + and _ with / first." },
    { q: "How do I decode a JWT token?", a: "A JWT is three base64url segments separated by dots: header.payload.signature. Decode the first two to read them (convert base64url to Base64 first: - → +, _ → /). The signature segment is binary and won't be readable. Remember: decoding a JWT is trivial — its security comes from the signature, not secrecy." },
    { q: "Can Base64 encode emoji and non-English text?", a: "Yes — text is first converted to UTF-8 bytes, then those bytes are Base64-encoded. This tool does that correctly. Naive JavaScript btoa() throws an error on any character outside Latin-1, which is why many online tools fail on emoji or Greek text." },
    { q: "How do I Base64-encode a file or image?", a: "This tool handles text. For files, browsers use the FileReader.readAsDataURL API, or on the command line: base64 file.png (Linux/macOS) or [Convert]::ToBase64String([IO.File]::ReadAllBytes('file.png')) in PowerShell. The output can be used in a data: URL like data:image/png;base64,…" },
    { q: "Is it safe to paste API keys or secrets into this tool?", a: "Yes — encoding and decoding run entirely in your browser's JavaScript; nothing is transmitted or stored. That's specifically why we built it: pasting credentials into server-side converter sites means trusting a stranger's logs with your secrets." },
    { q: "How does Base64 encoding actually work?", a: "The input bytes are read 24 bits (3 bytes) at a time, split into four 6-bit groups, and each 6-bit value (0–63) is mapped to a character in the alphabet A–Z, a–z, 0–9, +, /. Decoding reverses the mapping. It's pure arithmetic — no keys, no randomness, always the same output for the same input." },
    { q: "Why do emails and MIME use Base64?", a: "Email protocols were designed for 7-bit ASCII text; raw binary bytes could be corrupted or interpreted as control characters in transit. MIME wraps attachments in Base64 so any file survives as safe text. The same logic applies anywhere a text-only pipeline needs to carry binary: JSON APIs, XML, config files." },
]

useCalcSEO(
    "Base64 Encode & Decode — UTF-8 Safe, Private",
    "Encode text to Base64 and decode Base64 to text — UTF-8 safe, handles emoji and all languages. Runs 100% in your browser, safe for keys and secrets. Free.",
    faqs
)

useHead({
    script: [{
        type: 'application/ld+json',
        innerHTML: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'HowTo',
            name: 'How to Encode or Decode Base64',
            description: 'Convert text to Base64 and Base64 back to text, locally in the browser.',
            step: [
                { '@type': 'HowToStep', position: 1, name: 'Paste your input', text: 'Paste plain text to encode, or a Base64 string to decode.' },
                { '@type': 'HowToStep', position: 2, name: 'Click Encode or Decode', text: 'Conversion is UTF-8 safe and runs locally — nothing is uploaded.' },
                { '@type': 'HowToStep', position: 3, name: 'Copy the output', text: 'Click Copy Output to put the result on your clipboard.' },
            ],
        }),
    }],
})
</script>
