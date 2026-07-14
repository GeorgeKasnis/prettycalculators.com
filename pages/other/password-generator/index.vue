<template>
    <UiCalcPage title="Password Generator" category="other" description-title="Strong random passwords — generated on your device">
        <template #calc>
            <CalculatorsOtherPasswordGeneratorCalc />
        </template>
        <template #facts>
            <CalcFact label="Privacy" value="Never sent anywhere" />
            <CalcFact label="Randomness" value="Crypto-grade" />
            <CalcFact label="Recommended" value="16+ characters" />
        </template>
        <template #description>
            <p>
                This <strong>Password Generator</strong> creates strong random passwords using your browser's <strong>cryptographic random number generator</strong> — the same source of randomness used for encryption keys. The password is generated entirely on your device: it is <strong>never transmitted, logged, or stored anywhere</strong>. You can disconnect from the internet and it still works.
            </p>
            <p>
                Choose the length and which character types to include. The <strong>entropy score</strong> tells you how hard the password is to crack: every extra bit doubles the number of guesses an attacker needs. Above ~75 bits is strong for any online account; above 100 bits is effectively uncrackable with current hardware.
            </p>
            <h3>What makes a password strong</h3>
            <ul>
                <li><strong>Length beats complexity</strong> — a 20-character password of random letters is stronger than 10 characters of mixed symbols</li>
                <li><strong>Randomness beats cleverness</strong> — "P@ssw0rd2026!" follows patterns crackers try first; true random strings don't</li>
                <li><strong>Uniqueness beats everything</strong> — reusing one strong password across sites means one breach exposes them all; use a password manager</li>
            </ul>
        </template>
        <template #example>
            <p>
                A <strong>16-character</strong> password using upper case, lower case, digits and symbols draws from ~89 possible characters per position.
            </p>
            <p>
                Entropy = 16 × log₂(89) ≈ <strong>104 bits</strong> — even at a trillion guesses per second, cracking it would take longer than the age of the universe.
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
    { q: "Is it safe to use an online password generator?", a: "It depends how it works. This one generates the password locally in your browser using crypto.getRandomValues — nothing is sent to any server, so there is nothing for anyone to intercept or log. Avoid generators that create passwords server-side, since you can't verify they aren't stored." },
    { q: "How long should a password be in 2026?", a: "16 characters is a solid default for anything important; 12 is a reasonable minimum for low-value accounts. Length matters more than symbols: every added character multiplies the cracking effort by the size of the character set. Password managers make long passwords painless since you never type them." },
    { q: "What is password entropy?", a: "Entropy measures unpredictability in bits: entropy = length × log₂(character-set size). Each additional bit doubles the guesses an attacker needs. Rough guide: under 40 bits is weak, 60–75 is decent, 75+ is strong, 100+ is effectively uncrackable by brute force." },
    { q: "Are random passwords better than passphrases?", a: "Both can be strong. A truly random 16-character password (~100 bits) beats a 4-word passphrase (~50 bits with common word lists). But a 6–7 word random passphrase is comparably strong and far easier to memorise. Best practice: passphrase for the few passwords you must remember (laptop, password manager), random strings for everything stored in the manager." },
    { q: "Why should every account have a different password?", a: "Because breaches leak passwords in bulk, and attackers immediately try each leaked email+password pair on other services ('credential stuffing'). One reused password turns a minor forum breach into a compromised email, bank, and social media account. Unique passwords contain the damage to one site." },
    { q: "Is 'P@ssw0rd123!' a strong password?", a: "No — it's one of the first patterns cracking tools try. Substitutions like @ for a and 0 for o are built into every cracking dictionary, as are years, names, and keyboard walks like qwerty. Character variety only helps when the characters are randomly chosen." },
    { q: "How do hackers actually crack passwords?", a: "Mostly offline: they steal a database of password hashes, then run billions of guesses per second against it using GPUs — starting with leaked-password lists, dictionary words, and known patterns. Truly random passwords force them into raw brute force, which becomes hopeless past ~75 bits of entropy." },
    { q: "Should I exclude ambiguous characters like 0, O, 1 and l?", a: "Only if you'll ever read or type the password manually — for example a WiFi key printed for guests. Excluding look-alikes slightly reduces entropy (a few bits at most), which you can offset by adding one or two characters of length." },
    { q: "What is the best way to store generated passwords?", a: "A password manager (Bitwarden, 1Password, KeePass, or your browser's built-in manager). It encrypts everything behind one master passphrase, autofills so you don't type passwords into the wrong site, and makes unique-password-per-account practical. Writing passwords in a notes app or spreadsheet is the thing to avoid." },
    { q: "How often should I change my passwords?", a: "Current guidance (NIST) says: don't change them on a schedule — change them when there's a reason: a breach notification, a shared password, a suspicious login. Forced periodic changes push people toward weak patterns like Password1, Password2. A unique random password can live until compromised." },
    { q: "Does this generator store or send my password anywhere?", a: "No. The password is produced by JavaScript running on your own device using the browser's cryptographic randomness API. It never leaves your machine — there's no server call, no analytics event, no storage. Refreshing the page destroys it permanently, so copy it to your password manager first." },
    { q: "What is two-factor authentication and do I still need strong passwords with it?", a: "2FA adds a second proof (code, app prompt, hardware key) on top of your password — turn it on for email, banking and anything important. You still need a strong unique password: 2FA can be phished or bypassed in some setups, and many services still allow password-only fallbacks like account recovery." },
]

useCalcSEO(
    "Password Generator — Strong, Random & Private",
    "Generate strong random passwords locally in your browser with crypto-grade randomness. Choose length and characters, see the entropy score. Nothing is ever sent or stored.",
    faqs
)

useHead({
    script: [{
        type: 'application/ld+json',
        innerHTML: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'HowTo',
            name: 'How to Generate a Strong Password',
            description: 'Create a cryptographically random password on your own device.',
            step: [
                { '@type': 'HowToStep', position: 1, name: 'Choose length and characters', text: 'Set the length (16+ recommended) and toggle which character types to include: upper case, lower case, digits, symbols.' },
                { '@type': 'HowToStep', position: 2, name: 'Generate', text: 'Click Generate — the password is created locally with cryptographic randomness and never sent anywhere.' },
                { '@type': 'HowToStep', position: 3, name: 'Copy into your password manager', text: 'Check the entropy score (75+ bits is strong), copy the password, and save it in a password manager.' },
            ],
        }),
    }],
})
</script>
