<template>
    <UiCalcPage title="CSS clamp() Calculator" category="other" description-title="Generate fluid typography that scales with the viewport">
        <template #calc>
            <CalculatorsOtherCssClampCalc />
        </template>
        <template #facts>
            <CalcFact label="Syntax" value="clamp(min, val, max)" />
            <CalcFact label="Output" value="rem + vw" />
            <CalcFact label="Browser support" value="All modern" />
        </template>
        <template #description>
            <p>
                The <strong>CSS clamp() Calculator</strong> generates fluid typography code: a single <code>font-size</code> declaration that scales smoothly between a minimum and maximum size as the viewport grows — <strong>no media queries needed</strong>.
            </p>
            <p>
                Tell it your smallest font size (at your smallest supported viewport) and your largest (at your widest layout), and it computes the linear-interpolation formula in accessible <strong>rem units combined with vw</strong>, ready to paste into your stylesheet.
            </p>
            <h3>How the math works</h3>
            <p>
                clamp() takes three values: <strong>clamp(minimum, preferred, maximum)</strong>. The preferred value is a line through your two points: slope = (maxSize − minSize) ÷ (maxViewport − minViewport), and the rem intercept anchors it. The browser then clips the result so it never leaves your min–max range.
            </p>
            <p>
                We output the fixed part in rem (not px) so text still scales when users change their browser's default font size — important for accessibility and often flagged in audits. Converting other px values to rem? Use our <NuxtLink to="/other/px-to-rem-calculator">px to rem calculator</NuxtLink>.
            </p>
        </template>
        <template #example>
            <p>
                You want body text to be <strong>16px at a 360px</strong> viewport, growing to <strong>24px at 1200px</strong>.
            </p>
            <p>
                Slope = (24 − 16) ÷ (1200 − 360) = 0.00952 → <strong>0.9524vw</strong>. Intercept = 16 − 0.00952 × 360 = 12.57px → <strong>0.7857rem</strong>.
            </p>
            <p>
                Result: <code>font-size: clamp(1rem, 0.7857rem + 0.9524vw, 1.5rem);</code>
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
    { q: "What does CSS clamp() do?", a: "clamp(min, preferred, max) returns the preferred value, but never lets it go below min or above max. For font sizes, the preferred value is usually a vw-based expression, so text scales fluidly with the viewport within your chosen bounds — replacing multiple media queries with one line." },
    { q: "How do I calculate the values inside clamp() for fluid typography?", a: "Pick two points: your minimum font size at your smallest viewport, and maximum size at your largest. The slope is (maxFont − minFont) ÷ (maxViewport − minViewport), expressed in vw by multiplying by 100. The intercept is minFont − slope × minViewport, expressed in rem. This calculator does all of it for you." },
    { q: "Why use rem instead of px inside clamp()?", a: "If the whole expression is in px and vw, text won't respond when a user increases their browser's default font size — an accessibility failure. Putting the fixed portion in rem keeps the formula anchored to the user's preferred text size. WCAG audits specifically check that text can scale to 200%." },
    { q: "What is fluid typography?", a: "Typography that scales continuously with the viewport width instead of jumping at breakpoints. Instead of 16px on mobile and 24px on desktop with a hard switch at 768px, the size interpolates smoothly through every width in between — one clamp() declaration replaces several media queries." },
    { q: "What browsers support clamp()?", a: "All modern browsers: Chrome/Edge 79+, Firefox 75+, Safari 13.1+ (since early 2020). Global support is above 96%. For legacy browsers, provide a plain font-size fallback on the line before the clamp() declaration — old browsers ignore the clamp line and use the fallback." },
    { q: "Can clamp() be used for things other than font-size?", a: "Yes — padding, margin, gap, width, border-radius, almost any length property. Fluid spacing (e.g. section padding that grows from 2rem to 6rem) is one of the most popular uses, keeping vertical rhythm proportional across screen sizes." },
    { q: "What is the difference between clamp() and min()/max()?", a: "min() picks the smallest of its arguments, max() the largest, and clamp(a, b, c) is shorthand for max(a, min(b, c)) — it bounds a preferred value on both sides. For fluid type you almost always want clamp(), since you need both a floor and a ceiling." },
    { q: "Why does my clamp() font size not change when I resize the browser?", a: "Usually one of three things: the vw coefficient is so small the change is invisible; the preferred value is already outside the min–max range so it's clamped flat; or the expression accidentally uses only rem/px with no vw term, making it constant. Check that the middle value contains a vw unit." },
    { q: "What viewport range should I use for fluid typography?", a: "A common choice is 320–360px for the minimum (small phones) and 1200–1440px for the maximum (where most layouts stop growing). Below and above the range, the font simply sticks to your min and max sizes, so nothing breaks on extreme screens." },
    { q: "Does clamp() work with zoom and accessibility settings?", a: "Browser zoom (Ctrl/Cmd +) works fine with any units. Changing the browser's default font size only affects your clamp() if the expression includes rem — which is exactly why this calculator outputs the intercept in rem rather than px." },
    { q: "Is clamp() better than media queries?", a: "For scaling values continuously, yes — it's less code and covers every viewport, not just breakpoints. Media queries remain the right tool for layout changes (stacking columns, hiding elements). Most modern sites combine both: clamp() for sizes and spacing, media queries for structure." },
    { q: "What is the safe fallback for browsers without clamp()?", a: "Declare a static size first: 'font-size: 1.125rem; font-size: clamp(1rem, 0.79rem + 0.95vw, 1.5rem);'. Browsers that don't understand clamp() keep the first declaration; modern browsers override it with the second." },
]

useCalcSEO(
    "CSS clamp() Calculator — Fluid Typography Generator",
    "Generate fluid font-size code with CSS clamp(). Enter min/max sizes and viewports — get an accessible rem + vw formula ready to copy into your stylesheet.",
    faqs
)

useHead({
    script: [{
        type: 'application/ld+json',
        innerHTML: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'HowTo',
            name: 'How to Generate a CSS clamp() Formula',
            description: 'Create fluid typography with the CSS clamp() function.',
            step: [
                { '@type': 'HowToStep', position: 1, name: 'Enter font sizes', text: 'Type the minimum font size (for small screens) and maximum font size (for large screens) in pixels.' },
                { '@type': 'HowToStep', position: 2, name: 'Enter viewport range', text: 'Type the viewport widths where scaling starts and stops, e.g. 360px and 1200px.' },
                { '@type': 'HowToStep', position: 3, name: 'Copy the CSS', text: 'The calculator outputs a clamp() declaration in accessible rem + vw units. Click Copy CSS and paste it into your stylesheet.' },
            ],
        }),
    }],
})
</script>
