<template>
    <UiCalcPage title="Unix Timestamp Converter" category="other" description-title="Convert epoch time to human dates — and back">
        <template #calc>
            <CalculatorsOtherUnixTimestampCalc />
        </template>
        <template #facts>
            <CalcFact label="Epoch" value="Jan 1, 1970 UTC" />
            <CalcFact label="1 day" value="86,400 s" />
            <CalcFact label="Format" value="Seconds or ms" />
        </template>
        <template #description>
            <p>
                The <strong>Unix Timestamp Converter</strong> translates epoch time — the number of seconds since <strong>January 1, 1970 UTC</strong> — into a readable date, and any date back into a timestamp. It shows a live current timestamp you can copy with one click.
            </p>
            <p>
                Paste anything: a 10-digit seconds timestamp (<code>1752432000</code>), a 13-digit milliseconds timestamp from JavaScript (<code>1752432000000</code>), or a date string like <code>2026-07-13 18:00</code>. The converter detects the format automatically and returns Unix seconds, milliseconds, ISO 8601 UTC, your local time, and a relative description ("3 days ago").
            </p>
            <h3>Why Unix time exists</h3>
            <p>
                Computers need a timezone-free, arithmetic-friendly way to store moments in time. A single integer counting seconds from a fixed origin does exactly that: comparing, sorting, and subtracting dates becomes plain integer math. Databases, log files, JWTs, and APIs all speak Unix time — humans just need a converter to read it.
            </p>
        </template>
        <template #example>
            <p>
                A log entry shows <code>1752432000</code>. Ten digits means seconds.
            </p>
            <p>
                1752432000 seconds after Jan 1 1970 UTC = <strong>July 13, 2026, 18:40 UTC</strong>. In JavaScript milliseconds, the same instant is 1752432000000.
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
    { q: "What is a Unix timestamp?", a: "A Unix timestamp (epoch time) is the number of seconds elapsed since January 1, 1970, 00:00:00 UTC — the 'Unix epoch'. It's a single integer with no timezone information, which makes it ideal for storing and comparing moments in time across systems." },
    { q: "How do I convert a Unix timestamp to a date?", a: "Multiply by 1000 if it's in seconds, then feed it to your language's date constructor: JavaScript new Date(ts * 1000), Python datetime.fromtimestamp(ts), SQL to_timestamp(ts). Or paste it into the converter above for instant results in UTC and your local timezone." },
    { q: "Is a Unix timestamp in seconds or milliseconds?", a: "Classic Unix time is seconds, but JavaScript's Date.now() and Java's System.currentTimeMillis() return milliseconds. A quick tell: current timestamps have 10 digits in seconds and 13 digits in milliseconds. This converter detects both automatically." },
    { q: "How do I get the current Unix timestamp?", a: "This page shows it live at the top with a copy button. In code: JavaScript Math.floor(Date.now() / 1000), Python int(time.time()), PHP time(), Linux shell date +%s, PostgreSQL extract(epoch from now())." },
    { q: "What timezone is a Unix timestamp in?", a: "None — and that's the point. Unix time counts seconds from a fixed UTC instant, so the same timestamp represents the same moment everywhere on Earth. Timezones only appear when you format it for display; the raw number is timezone-free." },
    { q: "What is the year 2038 problem?", a: "Systems storing Unix time as a signed 32-bit integer overflow on January 19, 2038, at 03:14:07 UTC, when the count exceeds 2,147,483,647. Modern 64-bit systems are unaffected (good for ~292 billion years), but embedded devices and legacy databases may still be at risk." },
    { q: "Can Unix timestamps be negative?", a: "Yes — negative values represent moments before January 1, 1970. For example, −86400 is December 31, 1969. Most languages handle negative timestamps correctly, though some older APIs and databases reject them." },
    { q: "Do Unix timestamps include leap seconds?", a: "No. Unix time pretends every day has exactly 86,400 seconds. When a leap second occurs, Unix time repeats or smears a second rather than counting it. For everyday use this is irrelevant; for sub-second scientific timing, it matters." },
    { q: "How do I convert a date to a Unix timestamp in Excel or Google Sheets?", a: "Use =(A1 - DATE(1970,1,1)) * 86400 where A1 holds your date (assumes the date is in UTC). To go the other way: =A1/86400 + DATE(1970,1,1), then format the cell as a date." },
    { q: "Why does my timestamp show the wrong date?", a: "The most common cause is a seconds/milliseconds mix-up: passing seconds where milliseconds are expected gives a date in January 1970; passing milliseconds as seconds gives a date tens of thousands of years in the future. Check the digit count — 10 digits is seconds, 13 is milliseconds." },
    { q: "What is ISO 8601 and how does it relate to Unix time?", a: "ISO 8601 is the standard human-readable datetime format: 2026-07-13T18:40:00Z (the Z means UTC). It represents the same instant a Unix timestamp does, but readably and with explicit timezone offset. APIs typically accept both; logs and tokens usually use Unix time for compactness." },
    { q: "How do timestamps work in JWT tokens?", a: "JWT claims like exp (expiry), iat (issued at), and nbf (not before) are Unix timestamps in seconds. If a token 'expires immediately', check you're not writing milliseconds into exp — a 13-digit value is read as a date thousands of years away, or rejected outright." },
]

useCalcSEO(
    "Unix Timestamp Converter — Epoch to Date & Back",
    "Convert Unix timestamps to human-readable dates and dates to epoch time. Live current timestamp, seconds & milliseconds detection, ISO 8601 and local time output.",
    faqs
)

useHead({
    script: [{
        type: 'application/ld+json',
        innerHTML: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'HowTo',
            name: 'How to Convert a Unix Timestamp',
            description: 'Convert epoch time to a readable date, or any date to a Unix timestamp.',
            step: [
                { '@type': 'HowToStep', position: 1, name: 'Paste a timestamp or date', text: 'Enter a Unix timestamp in seconds (10 digits), milliseconds (13 digits), or any date string like 2026-07-13 18:00.' },
                { '@type': 'HowToStep', position: 2, name: 'Click Convert', text: 'The format is detected automatically.' },
                { '@type': 'HowToStep', position: 3, name: 'Read the results', text: 'You get Unix seconds, milliseconds, ISO 8601 UTC, your local time, and a relative time like "3 days ago". The live current timestamp at the top can be copied any time.' },
            ],
        }),
    }],
})
</script>
