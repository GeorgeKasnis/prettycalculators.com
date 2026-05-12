<template>
    <UiCalcPage title="Miles to Kilometers" category="unit" description-title="Convert miles to kilometers with precision">
        <template #calc>
            <CalculatorsUnitMilesToKilometersCalc />
        </template>
        <template #facts>
            <CalcFact label="1 mile equals" value="1.60934" unit="km" />
            <CalcFact label="10 miles equals" value="~16.1" unit="km" />
            <CalcFact label="Used in" value="USA, UK" />
        </template>
        <template #description>
            <p>
                Welcome to our <span class="font-bold">Miles to Kilometers Calculator</span>, a powerful and versatile tool designed to streamline distance conversions from Miles (mi) to Kilometers (km). This calculator is more than just a handy tool; it's an essential companion for travelers,
                students, scientists, engineers, and anyone who deals with measurements regularly.
            </p>
            <p>
                Distance conversion is a fundamental aspect of various fields, and it plays a pivotal role in everyday life. Whether you're planning a road trip, studying unit conversions, working on engineering projects, or embarking on international travel, our calculator simplifies the
                process. With just a few clicks, you can effortlessly convert distances between the Miles and Kilometers units.
            </p>
            <h2>Applications of Distance Conversion</h2>
            <p>
                <span class="font-bold">Travel Planning:</span> For travelers, the ability to convert distances between Miles and Kilometers is invaluable. You might be familiar with road signs in one unit and maps in another. Our calculator allows you to seamlessly plan your journeys, ensuring
                that you have accurate distance measurements in your preferred unit.
            </p>
            <p>
                <span class="font-bold">Engineering and Construction:</span> In the world of engineering and construction, precision is paramount. Professionals in these fields often work with plans and measurements in both Miles and Kilometers. Our calculator simplifies the conversion process,
                eliminating the risk of errors and ensuring that your projects proceed smoothly.
            </p>
        </template>
        <template #example>
            <p>
                <span class="font-bold">For example, let's say you have a distance of 100 miles</span> that you'd like to convert to kilometers. You enter "100" in the Miles input field, click "Calculate," and you'll discover that the
                <span class="font-bold">equivalent distance in kilometers is 160.93 km</span>.
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
    { q: "How many kilometers are in a mile?", a: "1 mile equals exactly 1.60934 kilometers." },
    { q: "How do I convert miles to kilometers?", a: "Multiply the number of miles by 1.60934. For example, 5 miles × 1.60934 = 8.047 km." },
    { q: "How many km is a marathon (26.2 miles)?", a: "26.2 miles is approximately 42.195 km — the standard marathon distance." },
    { q: "How many kilometers is 100 miles?", a: "100 miles is 160.934 kilometers." },
    { q: "How many km is 5 miles?", a: "5 miles is 8.047 km. This is a common running race distance — a 5-mile run is just over 8 km." },
    { q: "How many km is 10 miles?", a: "10 miles is 16.093 km. A 10-mile run is a popular training distance for marathon preparation." },
    { q: "How many km is 1 mile?", a: "1 mile is 1.609 km. A quick mental estimate: multiply miles by 1.6 to get approximate kilometers." },
    { q: "How many km is 3 miles?", a: "3 miles is 4.828 km. For comparison, the average person walks roughly 3 miles (5 km) in an hour." },
    { q: "How do I convert mph to km/h?", a: "To convert miles per hour to kilometers per hour, multiply by 1.60934. For example, 60 mph × 1.60934 = 96.56 km/h. The US 65 mph highway limit is approximately 105 km/h." },
    { q: "Is a mile longer than a kilometer?", a: "Yes. 1 mile = 1.609 km, so a mile is about 61% longer than a kilometer. When comparing running paces: a 6-minute mile is equivalent to a 3:44/km pace. Road races in the US use miles; most international races (including Olympics) use kilometers." },
]

useCalcSEO(
    "Miles to Kilometers Converter — Free Distance Calculator",
    "Convert miles to kilometers instantly. 1 mile = 1.60934 km. Free distance converter — enter miles and get km in one click. No sign-up required.",
    faqs
)

useHead({
    script: [{
        type: 'application/ld+json',
        innerHTML: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'HowTo',
            name: 'How to Convert Miles to Kilometers',
            description: 'Convert any distance from miles to km using the exact conversion factor.',
            step: [
                { '@type': 'HowToStep', position: 1, name: 'Enter the distance in miles', text: 'Type the miles value into the input field.' },
                { '@type': 'HowToStep', position: 2, name: 'Click Calculate', text: 'Your distance in kilometers appears instantly. 1 mile = 1.60934 km.' },
            ],
        }),
    }],
})
</script>
