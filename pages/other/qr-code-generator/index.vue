<template>
    <UiCalcPage title="QR Code Generator" category="other" description-title="Create a free QR code — no signup, no watermark, no expiry">
        <template #calc>
            <CalculatorsOtherQrCodeCalc />
        </template>
        <template #facts>
            <CalcFact label="Cost" value="Free forever" />
            <CalcFact label="Expiry" value="Never" />
            <CalcFact label="Output" value="PNG up to 1000px" />
        </template>
        <template #description>
            <p>
                This <strong>QR Code Generator</strong> creates a scannable QR code from any text or URL — a website link, WiFi details, a phone number, contact info — and downloads it as a crisp PNG. <strong>No signup, no watermark, and the code never expires</strong>, because it's a static code generated entirely in your browser: the data lives inside the pattern itself, not on anyone's server.
            </p>
            <p>
                Many "free" QR services generate dynamic codes that route through their servers and stop working when your trial ends. A static code like the ones made here has <strong>no middleman</strong> — once downloaded, it works forever and nobody can track or disable it.
            </p>
            <h3>Choosing the right options</h3>
            <ul>
                <li><strong>Size</strong> — 300px is fine for screens; use 1000px for print so it stays sharp when scaled</li>
                <li><strong>Error correction</strong> — how much of the code can be damaged and still scan. M (15%) suits most uses; pick H (30%) if the code will be printed small, laminated, or partly covered by a logo</li>
                <li><strong>Keep URLs short</strong> — less data means bigger, easier-to-scan modules at the same size</li>
            </ul>
        </template>
        <template #example>
            <p>
                A restaurant wants a table QR code linking to its menu at <code>https://example.com/menu</code>.
            </p>
            <p>
                Enter the URL, choose <strong>1000px</strong> (it will be printed) and error correction <strong>H</strong> (tables get wet and scratched). Generate, download the PNG, and place it in the table-card design at 2×2cm or larger.
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
    { q: "How do I create a QR code for free?", a: "Type or paste your text or URL into the generator above, pick a size, and click Generate — then download the PNG. It's completely free, with no account, watermark, or scan limit, because the code is generated locally in your browser." },
    { q: "Do QR codes expire?", a: "Static QR codes — like the ones this tool makes — never expire. The data is encoded directly in the pattern, so nothing can be turned off. Dynamic QR codes from subscription services route through a redirect server and stop working if you cancel or the provider shuts down." },
    { q: "What is the difference between static and dynamic QR codes?", a: "A static code contains the destination itself and works forever, but can't be edited after printing. A dynamic code contains a short redirect URL owned by a service, letting them swap the destination and count scans — at the cost of a subscription and a dependency on that service staying alive." },
    { q: "What size should a printed QR code be?", a: "Rule of thumb: minimum size = scanning distance ÷ 10. A code scanned from 20cm (a flyer in hand) needs to be at least 2×2cm. A poster scanned from 1 metre needs 10×10cm. Always generate at 1000px for print so it stays sharp, and test-scan the actual printout." },
    { q: "What does QR code error correction do?", a: "It adds redundant data so the code still scans when partially damaged or obscured. Level L recovers from 7% damage, M 15%, Q 25%, H 30%. Higher levels make the pattern denser, so for very long URLs on small prints, M is a sensible balance." },
    { q: "Can a QR code contain WiFi credentials?", a: "Yes — use the format WIFI:T:WPA;S:NetworkName;P:password;; as the text. Phones that scan it will offer to join the network automatically. Handy for guest WiFi at home, cafés, or offices — print it and skip spelling out the password." },
    { q: "How much data fits in a QR code?", a: "Up to 4,296 alphanumeric characters or 2,953 bytes at the lowest error correction — but practical codes should stay far smaller. The more data, the denser the modules and the harder to scan from a distance. For long URLs, a shorter link makes a more reliable code." },
    { q: "Why won't my QR code scan?", a: "The usual culprits: printed too small for the scanning distance, low contrast (dark background or light foreground), inverted colors (always dark pattern on light background), too much data making modules tiny, or missing 'quiet zone' — the white margin around the code. This generator includes the quiet zone automatically." },
    { q: "Can I put a QR code on a business card?", a: "Yes — 1.5×1.5cm is about the practical minimum for a card scanned at close range. Encode your website, LinkedIn, or a vCard (contact details in VCARD format so phones can save you as a contact directly). Use error correction Q or H at that size." },
    { q: "Are QR codes safe to scan?", a: "The code itself is just text — the risk is where it leads. 'Quishing' scams stick malicious QR codes over real ones on parking meters and posters. Modern phones show you the URL before opening it: check the domain looks right before tapping, especially when payment is involved." },
    { q: "Can I track how many people scan my QR code?", a: "A static code has no built-in tracking — no server sits in the middle. To count scans, encode a URL with UTM parameters (e.g. ?utm_source=qr&utm_medium=poster) and watch it in your analytics, or use a link shortener with click stats. That gives you tracking while the code itself stays permanent and free." },
    { q: "What format should I download a QR code in for printing?", a: "PNG works for most print jobs if generated large — use the 1000px option here, which prints sharply at 8×8cm at 300 DPI. Since QR codes are pure black-and-white squares, PNG compresses them losslessly, unlike JPG which can blur module edges." },
]

useCalcSEO(
    "QR Code Generator — Free, No Signup, Never Expires",
    "Generate QR codes for URLs, WiFi, text and contacts — free with no watermark or expiry. Created in your browser, downloadable as PNG up to 1000px for print.",
    faqs
)

useHead({
    script: [{
        type: 'application/ld+json',
        innerHTML: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'HowTo',
            name: 'How to Generate a QR Code',
            description: 'Create a free static QR code from any text or URL.',
            step: [
                { '@type': 'HowToStep', position: 1, name: 'Enter your content', text: 'Paste a URL, text, WiFi credentials, or contact details into the input field.' },
                { '@type': 'HowToStep', position: 2, name: 'Choose size and error correction', text: 'Pick 300px for screens or 1000px for print. Use error correction M for normal use, H for small or damage-prone prints.' },
                { '@type': 'HowToStep', position: 3, name: 'Generate and download', text: 'Click Generate, check the preview, and download the PNG. The code is static — it never expires and nothing is tracked.' },
            ],
        }),
    }],
})
</script>
