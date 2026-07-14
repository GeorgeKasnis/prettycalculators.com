<template>
    <UiCalcPage title="UUID Generator" category="other" description-title="Generate random UUID v4 identifiers — one or in bulk">
        <template #calc>
            <CalculatorsOtherUuidGeneratorCalc />
        </template>
        <template #facts>
            <CalcFact label="Version" value="UUID v4" />
            <CalcFact label="Randomness" value="122 bits" />
            <CalcFact label="Bulk" value="Up to 500" />
        </template>
        <template #description>
            <p>
                This <strong>UUID Generator</strong> creates version-4 UUIDs (universally unique identifiers) using your browser's <strong>cryptographic randomness</strong> — the same quality of UUID your programming language would produce. Generate one for a quick test or up to 500 at once for seeding data, and copy them all with one click.
            </p>
            <p>
                A UUID looks like <code>3f8a2c1e-9b4d-4e7a-a2c5-1d6f8e9b0a3c</code>: 36 characters, five groups, 128 bits. In a v4 UUID, 122 of those bits are random — enough that <strong>collisions are practically impossible</strong>: you could generate a billion UUIDs per second for decades before expecting a single duplicate.
            </p>
            <h3>Where UUIDs are used</h3>
            <ul>
                <li><strong>Database primary keys</strong> — IDs that are unique across servers without coordination</li>
                <li><strong>API request/correlation IDs</strong> — tracing a request across microservices</li>
                <li><strong>File and object names</strong> — collision-free names for uploads and S3 objects</li>
                <li><strong>Test data</strong> — realistic unique identifiers for fixtures and mocks</li>
            </ul>
        </template>
        <template #example>
            <p>
                You need 20 unique IDs for a database seed file. Type <strong>20</strong>, click Generate, then <strong>Copy All</strong> — you get 20 newline-separated UUIDs ready to paste into your script or CSV.
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
    { q: "What is a UUID?", a: "A universally unique identifier: a 128-bit value written as 36 characters in five hyphen-separated groups (8-4-4-4-12 hex digits). UUIDs let independent systems create IDs simultaneously without ever coordinating or colliding — which is why they're everywhere in databases, APIs and distributed systems." },
    { q: "What is the difference between UUID versions (v1, v4, v7)?", a: "v1 embeds a timestamp and the machine's MAC address (unique but leaks information). v4 is fully random — the most common choice. v7 (2024 standard) starts with a timestamp followed by randomness, so IDs sort chronologically — increasingly popular for database keys. v3/v5 are deterministic hashes of a name." },
    { q: "Can two UUID v4s ever collide?", a: "Theoretically yes, practically no. With 122 random bits there are 5.3×10³⁶ possible values. Generating a billion UUIDs every second, you'd need roughly 85 years for even a 50% chance of one collision. Real-world duplicate UUIDs come from bugs (seeded RNGs, copy-paste), not chance." },
    { q: "Are UUIDs from this generator cryptographically secure?", a: "They're generated with crypto.getRandomValues / crypto.randomUUID — cryptographic-quality randomness, the same as server-side libraries use. That said, UUIDs shouldn't be used as security tokens or session secrets by design; use a purpose-built token generator for auth secrets." },
    { q: "Should I use UUIDs or auto-increment integers as database keys?", a: "Integers are smaller, faster to index, and human-readable — fine for single-database apps. UUIDs win when IDs must be generated on multiple servers or clients, merged across databases, or hidden from enumeration (order IDs 1,2,3 leak your sales volume). v7 UUIDs remove the index-fragmentation downside of v4." },
    { q: "What is the nil UUID?", a: "00000000-0000-0000-0000-000000000000 — all zeros, defined by the spec as a special 'no value' UUID. There's also a max UUID (all f's). Neither should be used as a real identifier; they act like null placeholders." },
    { q: "Are UUIDs case-sensitive?", a: "The spec says UUIDs are written in lowercase but must be compared case-insensitively — 3F8A… and 3f8a… are the same UUID. Many databases and languages normalise to lowercase; to be safe, store and compare them lowercased." },
    { q: "What do GUID and UUID mean — is there a difference?", a: "No practical difference. GUID (Globally Unique Identifier) is Microsoft's name for the same 128-bit standard; UUID is the RFC term. .NET's Guid.NewGuid() produces a v4 UUID identical in format to everyone else's." },
    { q: "How do I generate a UUID in JavaScript / Python / SQL?", a: "JavaScript: crypto.randomUUID(). Python: import uuid; uuid.uuid4(). PostgreSQL: gen_random_uuid(). MySQL 8: UUID() (v1) or use the app layer. C#: Guid.NewGuid(). All produce standards-compliant UUIDs — this page is handy when you need one outside your code." },
    { q: "Can I shorten a UUID?", a: "You can re-encode the same 128 bits more compactly — base64url gives 22 characters, base58 gives ~22 — and some systems (YouTube-style IDs) do exactly that. But you lose instant recognisability and tooling compatibility. Don't truncate a UUID though: cutting characters removes randomness and reintroduces collision risk." },
    { q: "Do UUIDs expire or need to be registered?", a: "No — a UUID is just a number. There's no central registry, no expiry, no ownership. Uniqueness comes from probability (v4) or timestamp+node rules (v1/v7), not from any authority. Generate one here and it's yours to use forever." },
    { q: "Why does a UUID v4 always have a 4 in the third group?", a: "That digit is the version field — 4 marks it as a random UUID. The first character of the fourth group is the variant field and is always 8, 9, a, or b. So of the 128 bits, 6 are fixed metadata, leaving 122 bits of actual randomness." },
]

useCalcSEO(
    "UUID Generator — Random v4 GUIDs, Single or Bulk",
    "Generate UUID v4 identifiers with cryptographic randomness — one or up to 500 at once, copy with one click. Free online GUID generator, runs in your browser.",
    faqs
)

useHead({
    script: [{
        type: 'application/ld+json',
        innerHTML: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'HowTo',
            name: 'How to Generate UUIDs',
            description: 'Create one or many random version-4 UUIDs.',
            step: [
                { '@type': 'HowToStep', position: 1, name: 'Choose the quantity', text: 'Enter how many UUIDs you need (1 to 500).' },
                { '@type': 'HowToStep', position: 2, name: 'Click Generate', text: 'UUIDs are created locally with cryptographic randomness.' },
                { '@type': 'HowToStep', position: 3, name: 'Copy', text: 'Copy a single UUID or the whole list, newline-separated, with one click.' },
            ],
        }),
    }],
})
</script>
