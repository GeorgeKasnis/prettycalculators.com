<template>
    <UiCalcPage title="Aspect Ratio Calculator" category="other" description-title="Resize images and video without distortion">
        <template #calc>
            <CalculatorsOtherAspectRatioCalc />
        </template>
        <template #facts>
            <CalcFact label="16:9" value="YouTube, monitors" />
            <CalcFact label="9:16" value="Reels, TikTok" />
            <CalcFact label="4:3"  value="Classic TV, iPad" />
            <CalcFact label="1:1"  value="Instagram square" />
        </template>
        <template #description>
            <p>
                The <strong>Aspect Ratio Calculator</strong> finds the proportional relationship between width and height, and solves the missing dimension when you resize. Enter your original size and a target width (or height) — it returns the other dimension so your image or video scales <strong>without stretching or distortion</strong>.
            </p>
            <p>
                It also simplifies the ratio to its cleanest form (1920×1080 → <strong>16:9</strong>) and recognises common formats: widescreen 16:9, vertical 9:16 for Stories and TikTok, classic 4:3, square 1:1, cinematic 21:9, photographic 3:2, and laptop 16:10.
            </p>
            <h3>Formula</h3>
            <p>
                <strong>New height = new width × (original height ÷ original width)</strong><br>
                <strong>New width = new height × (original width ÷ original height)</strong>
            </p>
            <p>
                Designers working in CSS may also want our <NuxtLink to="/other/px-to-rem-calculator">px to rem calculator</NuxtLink> for converting the resulting pixel values into relative units.
            </p>
        </template>
        <template #example>
            <p>
                You have a <strong>1920×1080</strong> video and need it <strong>1280px wide</strong>.
            </p>
            <p>
                Ratio: 1920 ÷ 1080 = 1.7778 (16:9). New height = 1280 ÷ 1.7778 = <strong>720px</strong>.
            </p>
            <p>
                So the resized video is <strong>1280×720</strong> — same shape, no distortion.
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
    { q: "What is an aspect ratio?", a: "Aspect ratio is the proportional relationship between an image's width and height, written as width:height. A 16:9 image is 16 units wide for every 9 units tall — regardless of its actual pixel size. 1920×1080 and 1280×720 are both 16:9." },
    { q: "How do I calculate aspect ratio?", a: "Divide both dimensions by their greatest common divisor. For 1920×1080 the GCD is 120, giving 16:9. Or simply divide width by height for the decimal form: 1920 ÷ 1080 = 1.78." },
    { q: "What is the aspect ratio of 1920x1080?", a: "16:9 — the standard widescreen format used by YouTube, TVs, and most monitors. Other 16:9 resolutions include 1280×720 (720p), 2560×1440 (1440p), and 3840×2160 (4K UHD)." },
    { q: "How do I resize an image without distorting it?", a: "Keep the aspect ratio locked: if you change the width, multiply the new width by (original height ÷ original width) to get the correct new height. This calculator does it automatically — enter the original size and one new dimension." },
    { q: "What aspect ratio is Instagram?", a: "Feed posts support 1:1 (square, 1080×1080), 4:5 portrait (1080×1350), and 1.91:1 landscape (1080×566). Stories and Reels are 9:16 (1080×1920). Since 2025 Instagram's grid preview crops toward 3:4, so keeping key content centred matters." },
    { q: "What aspect ratio is TikTok and YouTube Shorts?", a: "Both use 9:16 vertical video, typically 1080×1920. Standard YouTube videos are 16:9 (1920×1080 or higher). Uploading 16:9 footage to a 9:16 platform results in either heavy cropping or letterboxing bars." },
    { q: "What is the aspect ratio for a 4K video?", a: "Consumer 4K (UHD) is 3840×2160 — still 16:9, exactly four times the pixels of 1080p. Cinema 4K (DCI) is 4096×2160, a slightly wider ≈1.9:1 ratio used in film production." },
    { q: "What is a 16:10 aspect ratio used for?", a: "Laptop displays. MacBooks and many premium Windows laptops use 16:10 (e.g. 2560×1600, 1920×1200) because the extra vertical space suits documents and code better than 16:9." },
    { q: "How do I calculate the height for a 16:9 image if I know the width?", a: "Multiply width by 9/16 (= 0.5625). A 1200px-wide 16:9 image is 1200 × 0.5625 = 675px tall. For the reverse, multiply height by 16/9 (≈ 1.778)." },
    { q: "What is the CSS aspect-ratio property?", a: "Modern CSS lets you set aspect-ratio: 16 / 9 on an element and the browser computes the missing dimension automatically — no more percentage-padding hacks. It's supported in all current browsers and is ideal for responsive video embeds and image placeholders." },
    { q: "What aspect ratio are photos printed at?", a: "Most DSLR and mirrorless photos are 3:2 (matching 35mm film), while phone cameras usually shoot 4:3. Standard print sizes differ — 4×6 inch is 3:2, but 5×7 and 8×10 are not, which is why prints often crop your photo edges." },
    { q: "What does letterboxing mean?", a: "Letterboxing adds black bars above and below (or beside) a video when its aspect ratio doesn't match the screen — e.g. a 21:9 film on a 16:9 TV. It preserves the full image instead of cropping it. The alternative, cropping to fill, is called pan-and-scan." },
]

useCalcSEO(
    "Aspect Ratio Calculator — Resize Width & Height",
    "Free aspect ratio calculator. Enter original dimensions and a new width or height — get the matching dimension, simplified ratio (16:9, 4:3, 9:16) and a visual preview.",
    faqs
)

useHead({
    script: [{
        type: 'application/ld+json',
        innerHTML: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'HowTo',
            name: 'How to Calculate an Aspect Ratio',
            description: 'Find the aspect ratio of any image or video and solve the missing dimension when resizing.',
            step: [
                { '@type': 'HowToStep', position: 1, name: 'Enter the original size', text: 'Type the original width and height in pixels, e.g. 1920 × 1080.' },
                { '@type': 'HowToStep', position: 2, name: 'Enter one new dimension', text: 'Type the new width OR the new height you want. Leave the other empty.' },
                { '@type': 'HowToStep', position: 3, name: 'Click Calculate', text: 'The calculator returns the simplified ratio, decimal form, the missing dimension, and a visual preview of the shape.' },
            ],
        }),
    }],
})
</script>
