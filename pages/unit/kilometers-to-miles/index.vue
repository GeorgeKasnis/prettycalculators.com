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
    </UiCalcPage>
</template>

<script setup>
definePageMeta({ layout: 'brutalist' })
useCalcSEO(
    "Kilometers to Miles Converter — Free Distance Calculator",
    "Convert kilometers to miles instantly. 1 km = 0.62137 miles. Free distance converter — enter km and get miles in one click. No sign-up required.",
    [
        { q: "How many miles are in a kilometer?", a: "1 kilometer equals 0.62137 miles." },
        { q: "How do I convert kilometers to miles?", a: "Multiply the number of kilometers by 0.62137. For example, 10 km × 0.62137 = 6.214 miles." },
        { q: "How many miles is 5 km?", a: "5 km is approximately 3.107 miles." },
        { q: "How many miles is 42.195 km (a marathon)?", a: "42.195 km is approximately 26.2 miles — the standard marathon distance." },
    ]
)
</script>
