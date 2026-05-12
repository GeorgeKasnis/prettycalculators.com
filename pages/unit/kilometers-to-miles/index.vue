<template>
    <UiCalcPage title="Kilometers to Miles" category="unit" description-title="Convert kilometers to miles with precision">
        <template #calc>
            <CalculatorsUnitKilometersToMilesCalc />
        </template>
        <template #facts>
            <CalcFact label="1 km equals" value="0.62137" unit="mi" />
            <CalcFact label="10 km equals" value="~6.2" unit="miles" />
            <CalcFact label="100 km equals" value="~62.1" unit="miles" />
        </template>
        <template #description>
            <p>
                Welcome to our <span class="font-bold">Kilometers to Miles Calculator</span>, a powerful and versatile tool designed to streamline distance conversions from Kilometers (km) to Miles (mi). This calculator is more than just a handy tool; it's an essential companion for travelers,
                students, scientists, engineers, and anyone who deals with measurements regularly.
            </p>
            <p>
                Distance conversion is a fundamental aspect of various fields, and it plays a pivotal role in everyday life. Whether you're planning a road trip, studying unit conversions, working on engineering projects, or embarking on international travel, our calculator simplifies the
                process. With just a few clicks, you can effortlessly convert distances between the Kilometers and Miles units.
            </p>
            <h2>Applications of Distance Conversion</h2>
            <p>
                <span class="font-bold">Travel Planning:</span> For travelers, the ability to convert distances between Kilometers and Miles is invaluable. You might be familiar with road signs in one unit and maps in another. Our calculator allows you to seamlessly plan your journeys, ensuring
                that you have accurate distance measurements in your preferred unit.
            </p>
            <p>
                <span class="font-bold">Engineering and Construction:</span> In the world of engineering and construction, precision is paramount. Professionals in these fields often work with plans and measurements in both Kilometers and Miles. Our calculator simplifies the conversion process,
                eliminating the risk of errors and ensuring that your projects proceed smoothly.
            </p>
        </template>
        <template #example>
            <p>
                <span class="font-bold">For example, let's say you have a distance of 100 kilometers</span> that you'd like to convert to miles. You enter "100" in the Kilometers input field, click "Calculate," and you'll discover that the
                <span class="font-bold">equivalent distance in miles is approximately 62.14 miles</span>.
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
    { q: "How many miles are in a kilometer?", a: "1 kilometer equals 0.62137 miles." },
    { q: "How do I convert kilometers to miles?", a: "Multiply the number of kilometers by 0.62137. For example, 10 km × 0.62137 = 6.214 miles." },
    { q: "How many miles is 5 km?", a: "5 km is approximately 3.107 miles." },
    { q: "How many miles is 42.195 km (a marathon)?", a: "42.195 km is approximately 26.2 miles — the standard marathon distance." },
    { q: "How many miles is 10 km?", a: "10 km is 6.214 miles. A 10K race is one of the most popular road race distances — 6.2 miles when rounded." },
    { q: "How many miles is 100 km?", a: "100 km is 62.137 miles — roughly the distance between two mid-sized cities on a motorway." },
    { q: "How many miles is 1 km?", a: "1 km is 0.621 miles — just over half a mile. A quick mental rule: multiply km by 0.6 for a rough estimate in miles." },
    { q: "How many miles is 20 km?", a: "20 km is 12.427 miles. This is a common ultra-race stage distance and roughly the distance a person can comfortably walk in 4–5 hours." },
    { q: "How do I convert km/h to mph?", a: "To convert kilometers per hour to miles per hour, multiply by 0.62137. For example, 100 km/h × 0.62137 = 62.14 mph. The UK national speed limit of 70 mph is approximately 113 km/h." },
    { q: "Why do some countries use miles and others use kilometers?", a: "Miles are used primarily in the United States and the United Kingdom (for road distances and speed limits). Most other countries adopted kilometers as part of the metric system. The UK officially uses miles for road signs despite otherwise using metric units — a legacy of the imperial system. Conversion is needed frequently for international travel, mapping, and motorsport." },
]

useCalcSEO(
    "Kilometers to Miles Converter — Free Distance Calculator",
    "Convert kilometers to miles instantly. 1 km = 0.62137 miles. Free distance converter — enter km and get miles in one click. No sign-up required.",
    faqs
)

useHead({
    script: [{
        type: 'application/ld+json',
        innerHTML: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'HowTo',
            name: 'How to Convert Kilometers to Miles',
            description: 'Convert any distance from km to miles using the exact conversion factor.',
            step: [
                { '@type': 'HowToStep', position: 1, name: 'Enter the distance in kilometers', text: 'Type the km value into the input field.' },
                { '@type': 'HowToStep', position: 2, name: 'Click Calculate', text: 'Your distance in miles appears instantly. 1 km = 0.62137 miles.' },
            ],
        }),
    }],
})
</script>
