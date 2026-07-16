<template>
    <UiCalcPage title="Hex to RGB Converter" category="tools" description-title="Convert colors between HEX, RGB and HSL — live">
        <template #calc>
            <CalculatorsToolsHexRgbCalc />
        </template>
        <template #facts>
            <CalcFact label="Formats" value="HEX · RGB · HSL" />
            <CalcFact label="Direction" value="Converts both ways" />
            <CalcFact label="Privacy" value="Runs in your browser" />
        </template>
        <template #description>
            <p>
                This <strong>Hex to RGB converter</strong> translates any color between the two formats the web runs on — type a hex code like <code>#ff6b35</code> and get its RGB values instantly, or paste RGB numbers and get the hex code back. A live swatch shows the color as you type, and the <strong>HSL</strong> equivalent comes free, ready to paste into CSS.
            </p>
            <p>
                A <strong>hex color</strong> is three pairs of hexadecimal digits — <code>#RRGGBB</code> — where each pair encodes red, green, or blue from <code>00</code> (0) to <code>ff</code> (255). So <code>#ff6b35</code> literally means red 255, green 107, blue 53. The two notations describe the exact same 16.7 million colors; hex is just base-16 shorthand for the same three numbers.
            </p>
            <h3>Which format should you use?</h3>
            <ul>
                <li><strong>HEX</strong> — the most compact and the default in design tools, brand guides, and most CSS.</li>
                <li><strong>RGB</strong> — needed when code manipulates channels, and for transparency via <code>rgba(255, 107, 53, 0.5)</code>.</li>
                <li><strong>HSL</strong> — hue, saturation, lightness. The most human-friendly for adjustments: want it darker? Lower the lightness number, done.</li>
            </ul>
            <p>
                Shorthand hex works too — <code>#f60</code> expands to <code>#ff6600</code>. And if you're checking whether your colors are readable on top of each other, pair this with our <a href="/tools/color-contrast-checker">color contrast checker</a>.
            </p>
        </template>
        <template #example>
            <p>
                Your designer sends <strong>#5c3bef</strong> and your code needs RGB:
            </p>
            <p>
                Paste it in the HEX field → <strong>rgb(92, 59, 239)</strong> appears instantly, along with <strong>hsl(251, 85%, 58%)</strong> — click any row to copy it in CSS-ready syntax.
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
    { q: "How do I convert hex to RGB?", a: "Split the hex code into three pairs and convert each pair from base-16 to decimal: #ff6b35 → ff=255, 6b=107, 35=53 → rgb(255, 107, 53). Each pair is (first digit × 16) + second digit, where a–f count as 10–15. Or paste the code above and skip the math." },
    { q: "How do I convert RGB to hex?", a: "Convert each of the three values (0–255) to two hexadecimal digits and join them: rgb(92, 59, 239) → 92=5c, 59=3b, 239=ef → #5c3bef. Values below 16 get a leading zero — rgb(0, 8, 255) is #0008ff." },
    { q: "What do the letters in a hex color mean?", a: "Hex is base-16, so counting goes 0–9 then a–f, where a=10 and f=15. Two digits cover 0–255: ff is 15×16+15 = 255 (full intensity), 80 is 128 (half), 00 is zero. #ffffff is all channels maxed — white." },
    { q: "Are hex and RGB the same color?", a: "Yes — they're two notations for identical values. #ff6b35 and rgb(255, 107, 53) render pixel-for-pixel the same. Hex is base-16 shorthand; RGB is the same three numbers in decimal. Converting between them never changes the color." },
    { q: "What is a 3-digit hex code like #f60?", a: "CSS shorthand: each digit is doubled, so #f60 expands to #ff6600 and #abc to #aabbcc. It only works when both digits of every pair match, which is why you can't shorten #ff6b35. This converter accepts both forms." },
    { q: "How do I add transparency to a hex color?", a: "Two ways: 8-digit hex appends an alpha pair (#ff6b3580 is 50% opaque), or convert to RGB and use rgba(255, 107, 53, 0.5). The rgba form is more readable and better supported in older browsers — grab the RGB values from the converter and wrap them in rgba()." },
    { q: "What is HSL and when is it better than hex?", a: "HSL describes a color by hue (0–360° on the color wheel), saturation, and lightness. It's far easier to adjust by hand: making #5c3bef 10% darker in hex requires math, but in HSL you just lower the lightness number. Modern CSS supports hsl() everywhere hex works." },
    { q: "How many colors can hex codes represent?", a: "256 × 256 × 256 = 16,777,216 colors — every combination of the three channels. That's the standard 24-bit 'true color' space screens use. Human eyes distinguish roughly 10 million colors, so hex covers everything you can perceive on a display." },
    { q: "Why does my hex color look different on another screen?", a: "The code is exact but displays aren't: panel type, color profile, brightness, and OS-level settings (like Night Shift) all shift rendering. For brand-critical color, hex guarantees the same instruction to every screen — not the same photons from every screen." },
    { q: "What's the difference between #000000 and #ffffff?", a: "#000000 is black — all three channels at zero, no light emitted. #ffffff is white — all channels at 255, full intensity. Grays sit between with equal channels, like #808080. Whenever R=G=B, the color has zero saturation." },
    { q: "Is my color data uploaded anywhere?", a: "No — parsing and conversion run entirely in your browser with a few lines of JavaScript. Nothing is transmitted or stored, and the page works offline once loaded." },
    { q: "How do I pick an accessible color combination?", a: "Contrast matters more than the individual colors: WCAG requires a 4.5:1 contrast ratio between text and background for normal text. Convert your colors here, then test the pair in our <a href=\"/tools/color-contrast-checker\">color contrast checker</a> to see if they pass AA and AAA." },
]

useCalcSEO(
    "Hex to RGB Converter — HEX, RGB & HSL Color Codes",
    "Convert hex color codes to RGB and back, with HSL included — live color preview, CSS-ready output, one-click copy. Free and private, runs in your browser.",
    faqs
)

useHead({
    script: [{
        type: 'application/ld+json',
        innerHTML: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'HowTo',
            name: 'How to Convert Hex to RGB',
            description: 'Translate a hex color code into RGB and HSL values.',
            step: [
                { '@type': 'HowToStep', position: 1, name: 'Enter a color', text: 'Type a hex code (#ff6b35 or f60) in the HEX field, or RGB numbers in the RGB field — the other side converts instantly.' },
                { '@type': 'HowToStep', position: 2, name: 'Check the swatch', text: 'The live preview shows exactly which color the code describes.' },
                { '@type': 'HowToStep', position: 3, name: 'Copy the format you need', text: 'Click the HEX, RGB, or HSL row to copy it in CSS-ready syntax — everything runs locally in your browser.' },
            ],
        }),
    }],
})
</script>
