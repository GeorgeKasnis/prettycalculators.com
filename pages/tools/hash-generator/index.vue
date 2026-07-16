<template>
    <UiCalcPage title="Hash Generator" category="tools" description-title="MD5, SHA-1, SHA-256 and SHA-512 — hashed live in your browser">
        <template #calc>
            <CalculatorsToolsHashGeneratorCalc />
        </template>
        <template #facts>
            <CalcFact label="Algorithms" value="MD5 · SHA-1 · SHA-256 · SHA-512" />
            <CalcFact label="Live" value="Hashes as you type" />
            <CalcFact label="Privacy" value="Nothing leaves your device" />
        </template>
        <template #description>
            <p>
                This <strong>hash generator</strong> computes the <strong>MD5, SHA-1, SHA-256, and SHA-512</strong> hash of any text, live as you type. Click any result to copy it. Everything runs locally — the SHA family uses your browser's built-in Web Crypto engine, so your text is never uploaded, which makes this safe even for sensitive strings.
            </p>
            <p>
                A <strong>hash function</strong> turns any input — a word, a file, a novel — into a fixed-length fingerprint. The same input always produces the same hash, but change a single character and the output changes completely (the "avalanche effect"). Crucially, it's one-way: you can compute the hash from the text, but not the text from the hash.
            </p>
            <h3>Which algorithm should you use?</h3>
            <ul>
                <li><strong>SHA-256</strong> — the modern default: checksums, signatures, blockchain, certificates. Use this unless something forces another choice.</li>
                <li><strong>SHA-512</strong> — same family, longer 128-character output; often faster on 64-bit machines.</li>
                <li><strong>SHA-1</strong> — cryptographically broken since 2017, but still around in git and legacy systems. Fine as a checksum, not for security.</li>
                <li><strong>MD5</strong> — thoroughly broken for security, yet still everywhere as a fast integrity check and for matching legacy database values.</li>
            </ul>
            <p>
                One thing hashes are <em>not</em> for anymore: storing passwords directly — modern systems use slow, salted algorithms like bcrypt or Argon2 built on top of these primitives. If you're here to make a strong password instead, that's our <a href="/tools/password-generator">password generator</a>.
            </p>
        </template>
        <template #example>
            <p>
                Type <strong>hello</strong> and watch all four hashes appear — its SHA-256 is <code>2cf24dba5fb0a30e26e83b2ac5b9e29e1b161e5c1fa7425e73043362938b9824</code>.
            </p>
            <p>
                Now add one character: <strong>hello!</strong> produces a completely unrelated hash. That's the avalanche effect — and exactly why a hash detects even a one-byte change in a download.
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
    { q: "What is a hash and what is it used for?", a: "A hash is a fixed-length fingerprint computed from any input. Identical input always gives an identical hash, and any change — even one character — produces a completely different one. That makes hashes ideal for verifying downloads, detecting file changes, deduplicating data, signing software, and indexing content." },
    { q: "What's the difference between MD5, SHA-1, SHA-256 and SHA-512?", a: "They differ in output length and security. MD5 gives 32 hex characters (128 bits), SHA-1 gives 40 (160 bits), SHA-256 gives 64 (256 bits), SHA-512 gives 128 (512 bits). MD5 and SHA-1 are broken for cryptographic use — collisions can be manufactured. SHA-256 and SHA-512 remain secure and are the modern standard." },
    { q: "Is MD5 still safe to use?", a: "Not for anything security-related — researchers can create two different inputs with the same MD5 hash (collisions), which breaks signatures and certificates. It remains acceptable as a fast integrity check against accidental corruption, and it's still needed to match hashes in legacy systems and databases." },
    { q: "Can a hash be reversed to get the original text back?", a: "No — hashing is one-way by design; the original can't be computed from the hash. But short or common inputs can be guessed: attackers hash billions of candidate strings and compare (rainbow tables). That's why 'hello' is effectively reversible by lookup while a long random string is not." },
    { q: "Why do password systems use bcrypt instead of SHA-256?", a: "SHA-256 is deliberately fast — billions of guesses per second on a GPU — which is exactly wrong for passwords. bcrypt, scrypt, and Argon2 are deliberately slow and salted, turning a brute-force attack from hours into centuries. Fast hashes for data integrity, slow hashes for passwords." },
    { q: "What is a hash collision?", a: "Two different inputs producing the same hash. With enough output bits, collisions exist in theory but are unfindable in practice — for SHA-256 you'd need about 2^128 attempts. MD5 and SHA-1 are 'broken' precisely because researchers found shortcuts to manufacture collisions on purpose." },
    { q: "How do I verify a downloaded file with a hash?", a: "The publisher lists the expected hash (usually SHA-256) next to the download. After downloading, compute the file's hash and compare: PowerShell has Get-FileHash, macOS/Linux have shasum -a 256. If even one character differs, the file is corrupted or tampered with. This tool hashes text; use those commands for files." },
    { q: "Does the same text always produce the same hash?", a: "Yes — that determinism is the entire point. 'hello' hashes to the same SHA-256 on every computer, every time, forever. Watch out for invisible differences though: a trailing space, a newline, or different Unicode encoding of the same-looking character all change the hash completely." },
    { q: "Why is my hash different from another website's?", a: "Almost always invisible input differences: a trailing newline (echo adds one unless you use -n), Windows CRLF vs Unix LF line endings, or UTF-8 vs UTF-16 encoding. This tool hashes exactly the characters you type, encoded as UTF-8 with no added newline." },
    { q: "Which hash does Bitcoin use?", a: "SHA-256 — twice, actually (hashing the hash, called double-SHA-256) — for block hashing and proof-of-work mining. Ethereum uses Keccak-256, a different algorithm from the SHA-3 family. The astronomical difficulty of reversing SHA-256 is what secures the blockchain." },
    { q: "Is my text sent to a server to be hashed?", a: "No — SHA hashes are computed by your browser's built-in Web Crypto API and MD5 by local JavaScript, all on your device. Nothing is transmitted, logged, or stored, so hashing confidential text here is safe." },
    { q: "What does SHA stand for?", a: "Secure Hash Algorithm — a family designed by the NSA and standardized by NIST. SHA-1 arrived in 1995, the SHA-2 family (which includes SHA-256 and SHA-512) in 2001, and SHA-3 in 2015 as a structurally different backup. When someone says 'SHA hash' today they almost always mean SHA-256." },
]

useCalcSEO(
    "Hash Generator — MD5, SHA-1, SHA-256, SHA-512 Online",
    "Generate MD5, SHA-1, SHA-256 and SHA-512 hashes from any text — live as you type, one-click copy, and fully private: hashing runs in your browser.",
    faqs
)

useHead({
    script: [{
        type: 'application/ld+json',
        innerHTML: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'HowTo',
            name: 'How to Generate an MD5 or SHA-256 Hash',
            description: 'Compute cryptographic hashes of any text directly in the browser.',
            step: [
                { '@type': 'HowToStep', position: 1, name: 'Type or paste your text', text: 'All four hashes — MD5, SHA-1, SHA-256, SHA-512 — compute live as you type.' },
                { '@type': 'HowToStep', position: 2, name: 'Pick the algorithm you need', text: 'SHA-256 is the modern default; MD5 and SHA-1 are for legacy checks only.' },
                { '@type': 'HowToStep', position: 3, name: 'Click to copy', text: 'Click any hash row to copy it — nothing is uploaded, hashing happens on your device.' },
            ],
        }),
    }],
})
</script>
