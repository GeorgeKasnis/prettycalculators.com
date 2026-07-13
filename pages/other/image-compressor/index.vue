<template>
    <UiCalcPage title="Image Compressor" category="other" description-title="Compress images to a target size — right in your browser">
        <template #calc>
            <CalculatorsOtherImageCompressorCalc />
        </template>
        <template #facts>
            <CalcFact label="Privacy" value="Never uploaded" />
            <CalcFact label="Formats" value="JPG, WebP, PNG" />
            <CalcFact label="Target" value="Any KB size" />
        </template>
        <template #description>
            <p>
                This <strong>Image Compressor</strong> shrinks JPG, PNG and WebP files to a target size — say, <strong>under 100KB for a visa application</strong> or a job portal upload — entirely inside your browser. Your image is <strong>never uploaded anywhere</strong>: the compression runs locally on your device using the browser's own graphics engine, so it works offline and your photos stay private.
            </p>
            <p>
                Set an optional target size in KB and the tool automatically finds the best quality level that fits under it. Add a max width to downscale oversized photos (a 4000px camera photo rarely needs more than 1920px on the web), and choose the output format — <strong>WebP usually gives the smallest files</strong>, JPG is the most universally accepted, PNG stays lossless.
            </p>
            <h3>When to compress images</h3>
            <ul>
                <li><strong>Web pages</strong> — smaller images are the single biggest page-speed win; aim for under 200KB per image</li>
                <li><strong>Application forms</strong> — government portals and job sites often cap uploads at 100KB or 200KB</li>
                <li><strong>Email attachments</strong> — stay under provider limits without a zip file</li>
                <li><strong>Storage</strong> — archive photo collections at a fraction of the size</li>
            </ul>
        </template>
        <template #example>
            <p>
                A phone photo is <strong>3.2MB at 4032×3024</strong>, and a form requires <strong>max 100KB</strong>.
            </p>
            <p>
                Set target size to 100, max width to 1200, format JPG. The tool downscales to 1200×900 and finds the quality level that lands just under 100KB — typically with barely visible quality loss at screen size.
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
    { q: "How do I compress an image to 100KB?", a: "Drop your image into the tool above, type 100 in the target size field, and click Compress. It automatically finds the highest quality that fits under 100KB. If the result looks too degraded, also set a max width (e.g. 1200px) — downscaling first lets the compressor keep more quality per pixel." },
    { q: "Is this image compressor safe for private photos and documents?", a: "Yes — your image never leaves your device. Unlike most online compressors, nothing is uploaded to a server: the compression happens locally in your browser using the HTML5 canvas engine. You can even disconnect from the internet after the page loads and it still works." },
    { q: "How does image compression work?", a: "Lossy formats like JPEG and WebP discard visual detail the human eye barely notices — fine color variations, high-frequency texture — and encode the rest more efficiently. A quality setting controls how aggressive this is. Lossless formats like PNG only remove redundancy, which is why PNG files can't be forced under an arbitrary size." },
    { q: "Which format is smallest — JPG, PNG or WebP?", a: "For photos, WebP is typically 25–35% smaller than JPG at the same visual quality. PNG is usually the largest for photos because it's lossless — but it's the right choice for screenshots, logos and graphics with sharp edges or transparency. If the destination accepts WebP, use it; if unsure, JPG is universally accepted." },
    { q: "Why does compressing to a small size make my image blurry?", a: "There's a floor to how much detail a given pixel count can hold. If 100KB looks bad at 4000px wide, the fix is to reduce dimensions first — a 1200px image at higher quality almost always looks better than a 4000px image crushed to the same file size, especially on screens." },
    { q: "Does compressing an image reduce its dimensions?", a: "Only if you set a max width. Compression alone keeps the same pixel dimensions and reduces file size by lowering encoding quality. Resizing reduces the pixel count itself. The two combined give the biggest savings — this tool does both in one step." },
    { q: "What image size should I use for a website?", a: "For full-width hero images, 1600–1920px wide and under 300KB. For in-content images, 800–1200px and under 150KB. Larger files slow page loads and hurt Core Web Vitals (LCP), which affects your Google ranking. WebP with sensible dimensions typically achieves both easily." },
    { q: "Does compression remove EXIF data from photos?", a: "Yes. Because the image is redrawn onto a canvas before encoding, metadata — GPS location, camera model, timestamps — is stripped from the output file. That's usually a privacy win when posting photos online, but keep the original if you need the metadata." },
    { q: "Can I compress a PNG to a specific size?", a: "Not reliably — PNG is lossless, so there's no quality dial to trade against size. If you need a PNG under a specific size, reduce its dimensions with the max-width option. If transparency isn't needed, switching the output to WebP or JPG gives far smaller files." },
    { q: "Why is my JPG's transparent background turning white or black?", a: "JPG doesn't support transparency, so transparent regions must be filled with a solid color — this tool fills them with white. If you need transparency preserved, choose PNG or WebP as the output format." },
    { q: "How do I compress an image for email?", a: "Most email providers cap attachments at 20–25MB total, but recipients appreciate much smaller. Set a max width of 1600px and a target of 500KB per photo — plenty for viewing on any screen. Compressing before sending also avoids the automatic (and often uglier) recompression some clients apply." },
    { q: "Does compressing an image lose quality permanently?", a: "The compressed copy permanently contains less information — you can't restore detail by 're-compressing at higher quality'. But this tool never modifies your original file: it produces a new downloaded copy, so your source image stays untouched on your device." },
]

useCalcSEO(
    "Image Compressor — Compress to 100KB Online & Private",
    "Compress JPG, PNG and WebP images to any target size (e.g. 100KB) directly in your browser. Nothing is uploaded — free, private, works offline. Resize included.",
    faqs
)

useHead({
    script: [{
        type: 'application/ld+json',
        innerHTML: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'HowTo',
            name: 'How to Compress an Image to a Target Size',
            description: 'Reduce an image file to a specific size in KB without uploading it anywhere.',
            step: [
                { '@type': 'HowToStep', position: 1, name: 'Add your image', text: 'Drag and drop an image or click to choose one. It stays on your device — nothing is uploaded.' },
                { '@type': 'HowToStep', position: 2, name: 'Set target and format', text: 'Optionally enter a target size in KB (e.g. 100) and a max width. Choose JPG, WebP, or PNG output.' },
                { '@type': 'HowToStep', position: 3, name: 'Compress and download', text: 'Click Compress. The tool finds the best quality under your target and shows the savings. Download the result.' },
            ],
        }),
    }],
})
</script>
