<template>
    <UiCalcPage title="Px to Rem Calculator" category="other" description-title="Convert pixels to rem for responsive design">
        <template #calc>
            <CalculatorsOtherPxToRemCalc />
        </template>
        <template #facts>
            <CalcFact label="Base font size" value="16" unit="px" />
            <CalcFact label="1 rem" value="16 px" />
            <CalcFact label="320px equals" value="20 rem" />
        </template>
        <template #description>
            <p>A <span class="font-bold">PX to REM Calculator</span> is an indispensable tool in the world of web development, offering the flexibility and adaptability needed for modern responsive design.</p>
            <p>
                Responsive web design is all about ensuring that your web content looks and functions well on various devices, from smartphones and tablets to desktop computers. Achieving this level of adaptability requires using relative units like <span class="font-bold">rem</span> (root em)
                instead of fixed units like pixels (px).
            </p>
            <p>
                Here's where our PX to REM Calculator steps in. It simplifies the process of converting pixel values to rem units, taking into account the <span class="font-bold">base font size</span> of your project. This conversion allows you to create designs that seamlessly adjust to
                different screen sizes and resolutions, enhancing user experience and ensuring your website remains visually appealing.
            </p>
            <p>
                So, why should you consider using rem units and our PX to REM Calculator? It's all about <span class="font-bold">consistency</span> and <span class="font-bold">efficiency</span>. Rem units allow you to define measurements in relation to the base font size, reducing the need for
                complex calculations and providing a <span class="font-bold">more maintainable</span> and <span class="font-bold">readable</span> codebase.
            </p>
        </template>
        <template #example>
            <p>An element with a width of 320px would be approximately 20rem based on a <span class="font-bold">base font size</span> of 16px.</p>
        </template>
        <template #faq>
            <CalcFaq :faqs="faqs" />
        </template>
    </UiCalcPage>
</template>

<script setup>
definePageMeta({ layout: 'brutalist' })

const faqs = [
    { q: "What is the default base font size for rem?", a: "Most browsers use 16px as the default base font size, so 1rem = 16px by default." },
    { q: "Why use rem instead of px in CSS?", a: "Rem units scale with the user's browser font-size setting, making layouts more accessible and responsive. Px is absolute and ignores user preferences." },
    { q: "How do I convert 24px to rem?", a: "Divide by the base font size: 24 ÷ 16 = 1.5rem. If your base size is different, divide by that value instead." },
    { q: "What does rem stand for?", a: "Rem stands for 'root em'. It's relative to the font size of the root HTML element, unlike em which is relative to the parent element." },
    { q: "What is 16px in rem?", a: "16px ÷ 16 = 1rem. With the default 16px base, 16px is always 1rem. This is also the default paragraph text size in most browsers." },
    { q: "What is the difference between rem and em in CSS?", a: "Rem is relative to the root HTML element's font size (usually 16px across the whole page). Em is relative to the font size of the current element's parent — which can cascade and compound unpredictably in nested elements. Rem is generally more predictable and easier to manage for layout and spacing." },
    { q: "How do I convert 12px to rem?", a: "12 ÷ 16 = 0.75rem. If you set your root font to 10px (html { font-size: 62.5%; }) to make calculations easier, then 12px = 1.2rem." },
    { q: "Should I use rem for font sizes or spacing?", a: "Both. Rem is recommended for font sizes so they scale with user browser preferences (important for accessibility). For spacing (padding, margin, gap), rem is also preferred by many developers because it keeps spacing proportional to text size. Some teams use rem for fonts and px for borders and shadows where exact pixel values matter more." },
    { q: "What is the 62.5% trick for rem?", a: "Setting html { font-size: 62.5%; } makes 1rem = 10px (62.5% of 16px = 10px). This makes mental conversion trivial: 14px = 1.4rem, 20px = 2rem. However, this approach requires remembering to account for user browser settings, and some accessibility auditors flag it. It's popular but not universally recommended." },
    { q: "How many px is 1.5rem?", a: "1.5rem × 16px = 24px (with a 16px base). If your base is 10px (using the 62.5% trick), 1.5rem = 15px. Always confirm what base font size your project uses before converting." },
]

useCalcSEO(
    "PX to REM Calculator — Convert Pixels to REM Free",
    "Convert px to rem instantly with a 16px base font size. Free px to rem calculator for web developers — essential for responsive, accessible CSS. Copy result.",
    faqs
)

useHead({
    script: [{
        type: 'application/ld+json',
        innerHTML: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'HowTo',
            name: 'How to Convert PX to REM',
            description: 'Convert pixel values to rem units for responsive CSS layouts.',
            step: [
                { '@type': 'HowToStep', position: 1, name: 'Enter your pixel value', text: 'Type the pixel value you want to convert into the px input field.' },
                { '@type': 'HowToStep', position: 2, name: 'Adjust base font size if needed', text: 'The default is 16px (browser default). Change it if your project uses a different root font size.' },
                { '@type': 'HowToStep', position: 3, name: 'Read the rem result', text: 'The equivalent rem value appears instantly. Copy it directly into your CSS.' },
            ],
        }),
    }],
})
</script>
