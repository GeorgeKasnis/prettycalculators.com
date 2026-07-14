<template>
    <UiCalcPage title="Color Contrast Checker" category="other" description-title="Test text and background colors against WCAG">
        <template #calc>
            <CalculatorsOtherColorContrastCalc />
        </template>
        <template #facts>
            <CalcFact label="AA normal text" value="4.5:1" />
            <CalcFact label="AA large text" value="3:1" />
            <CalcFact label="AAA normal text" value="7:1" />
            <CalcFact label="Max ratio" value="21:1" />
        </template>
        <template #description>
            <p>
                The <strong>Color Contrast Checker</strong> measures the contrast ratio between a text color and a background color, and tells you instantly whether the pair passes <strong>WCAG accessibility standards</strong> — the criteria used in accessibility audits, legal compliance checks (ADA, European Accessibility Act), and Lighthouse scores.
            </p>
            <p>
                Pick colors with the swatches or type hex codes. The live preview shows real text at both sizes, and the pass/fail badges update as you adjust. The <strong>ratio runs from 1:1</strong> (identical colors, invisible text) <strong>to 21:1</strong> (pure black on pure white).
            </p>
            <h3>What the WCAG levels mean</h3>
            <ul>
                <li><strong>AA normal text — 4.5:1</strong> — the standard requirement for body text; what most audits and laws demand</li>
                <li><strong>AA large text — 3:1</strong> — for text ≥24px, or ≥18.5px bold</li>
                <li><strong>AAA — 7:1 / 4.5:1</strong> — the stricter enhanced level, recommended for reading-heavy content</li>
            </ul>
            <p>
                Working on a design system? Pair this with our <NuxtLink to="/other/css-clamp-calculator">CSS clamp() calculator</NuxtLink> for fluid type and the <NuxtLink to="/other/px-to-rem-calculator">px to rem converter</NuxtLink> for accessible sizing.
            </p>
        </template>
        <template #example>
            <p>
                Gray text <strong>#767676 on white #ffffff</strong> gives a ratio of <strong>4.54:1</strong> — it passes AA for normal text, just barely. The popular lighter gray #999999 gives only 2.85:1 and fails even for large text.
            </p>
            <p>
                This is the most common accessibility failure on the web: light gray "subtle" text that's unreadable for low-vision users — and in bright sunlight, for everyone.
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
    { q: "What is a good color contrast ratio?", a: "For normal body text, at least 4.5:1 (WCAG AA). For large text — 24px and up, or 18.5px bold — 3:1 is enough. The stricter AAA level asks 7:1 for body text. Black on white is 21:1, the maximum possible." },
    { q: "How is the contrast ratio calculated?", a: "WCAG defines it as (L1 + 0.05) / (L2 + 0.05), where L1 and L2 are the relative luminances of the lighter and darker color. Luminance weights the RGB channels by how bright they appear to the human eye — green counts most (71.5%), blue least (7.2%) — after gamma correction." },
    { q: "What is WCAG?", a: "The Web Content Accessibility Guidelines — the international standard for accessible websites, published by the W3C. Contrast requirements are criterion 1.4.3 (AA) and 1.4.6 (AAA). Laws like the ADA (US) and the European Accessibility Act reference WCAG, so failing contrast can be a legal problem, not just a UX one." },
    { q: "What counts as 'large text' in WCAG?", a: "18pt (24px) regular weight, or 14pt (18.66px) bold and above. Large text only needs 3:1 contrast instead of 4.5:1, because bigger strokes are easier to distinguish at lower contrast." },
    { q: "Does contrast matter for people without vision impairments?", a: "Yes. Low-contrast text becomes unreadable for everyone on a phone in sunlight, on cheap or aging displays, or with night-mode filters. Roughly 8% of men are also color-blind — luminance contrast is what remains reliable when hue perception isn't." },
    { q: "Why does light gray text fail contrast so often?", a: "Designers reach for #999 or #aaa to make secondary text 'subtle', but on white those give ratios of 2.8:1 and 2.3:1 — well below the 4.5:1 requirement. The darkest gray that passes AA on white is about #767676. Subtlety is better achieved with size and spacing than with low contrast." },
    { q: "Do contrast rules apply to buttons and icons?", a: "Yes — WCAG 1.4.11 requires 3:1 for 'non-text' UI elements: button borders, form field outlines, icons, focus indicators, chart elements. Text inside buttons follows the normal text rules against the button's background color." },
    { q: "Does contrast checking work for gradients and images as backgrounds?", a: "Check the worst spot: sample the lightest area of the background that sits behind text (any color-picker/eyedropper tool works) and test that against the text color. If text sits on photos, add a solid or semi-transparent overlay and test against the overlay color." },
    { q: "What is the contrast requirement for dark mode?", a: "The same ratios apply — 4.5:1 for body text. A common dark-mode mistake is pure white text (#fff) on very dark backgrounds, which passes easily but causes halation (glow) for astigmatic users; slightly dimmed white like #e8e8e8 on #121212 still passes (14.6:1) and reads more comfortably." },
    { q: "How do I fix a failing color pair without changing my brand color?", a: "Three options: darken/lighten the background instead of the brand color; use the brand color for large headings only (3:1 threshold) and a darker variant for body text; or reserve the brand color for non-text accents (borders, backgrounds) where 3:1 suffices. Small luminance shifts often preserve the hue impression." },
    { q: "Does Lighthouse check color contrast?", a: "Yes — the Accessibility score in Chrome's Lighthouse flags text below WCAG AA thresholds automatically. It only tests rendered text it can see, so hover states, disabled states and text over images still need manual checks with a tool like this one." },
    { q: "Is 3:1 contrast ever acceptable for normal text?", a: "Not under WCAG — 3:1 is only for large text and UI components. Normal-size body, labels and links need 4.5:1 at level AA. The one exception: purely decorative text and logos are exempt from contrast requirements entirely." },
]

useCalcSEO(
    "Color Contrast Checker — WCAG AA & AAA Test",
    "Check text and background color contrast against WCAG AA/AAA instantly. Live preview, exact ratio, pass/fail for normal and large text. Free accessibility tool.",
    faqs
)

useHead({
    script: [{
        type: 'application/ld+json',
        innerHTML: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'HowTo',
            name: 'How to Check Color Contrast for Accessibility',
            description: 'Test a text/background color pair against WCAG requirements.',
            step: [
                { '@type': 'HowToStep', position: 1, name: 'Enter both colors', text: 'Pick or type the text color and background color as hex codes.' },
                { '@type': 'HowToStep', position: 2, name: 'Read the ratio', text: 'The contrast ratio and WCAG AA/AAA pass-fail badges update live, with a real text preview.' },
                { '@type': 'HowToStep', position: 3, name: 'Adjust until it passes', text: 'Aim for at least 4.5:1 for body text or 3:1 for large text. Darken or lighten one color until the AA badge passes.' },
            ],
        }),
    }],
})
</script>
