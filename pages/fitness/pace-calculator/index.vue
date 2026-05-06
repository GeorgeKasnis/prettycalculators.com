<template>
    <UiCalcPage title="Pace Calculator" category="fitness" description-title="Pace, finish time & distance — for every runner">
        <template #calc>
            <CalculatorsFitnessPaceCalc />
        </template>
        <template #facts>
            <CalcFact label="Easy run pace"   value="6:00–7:30 /km" />
            <CalcFact label="Sub-20 min 5K"   value="4:00 /km" />
            <CalcFact label="Sub-2h marathon" value="2:50 /km" />
            <CalcFact label="Km → mile pace"  value="× 1.60934" />
        </template>
        <template #description>
            <p>
                The <strong>pace calculator</strong> lets you solve any running equation in seconds. Switch between three modes: calculate your <strong>pace per km or per mile</strong> from a time and distance, calculate your <strong>predicted finish time</strong> for any race at a given pace, or calculate the <strong>distance</strong> you can cover in a set time at a given effort.
            </p>
            <p>
                Every result also shows a <strong>race pace chart</strong> — your projected finish times for 1K, 5K, 10K, half marathon, and marathon at that pace — so you can instantly see whether your training pace translates to a race goal time.
            </p>

            <h3>What is running pace?</h3>
            <p>
                Pace is how long it takes you to cover one unit of distance — expressed as minutes per kilometre (min/km) or minutes per mile (min/mi). A pace of <strong>5:00 /km</strong> means you cover one kilometre every five minutes. Lower numbers = faster. Most runners think in pace rather than speed (km/h) because it maps directly to race strategy and effort.
            </p>

            <h3>Pace vs speed — quick conversion</h3>
            <p>
                To convert pace (min/km) to speed (km/h): <strong>speed = 60 ÷ pace in minutes</strong>. A 5:00/km pace = 60 ÷ 5 = <strong>12 km/h</strong>. A 6:00/km pace = 10 km/h. Going the other way: pace = 60 ÷ speed.
            </p>
            <p>
                To convert between km and mile pace: <strong>multiply by 1.60934</strong>. A 5:00/km pace = 5:00 × 1.60934 ≈ <strong>8:03/mile</strong>.
            </p>

            <h3>Common race pace targets</h3>
            <p>Here are the paces required for popular race time goals:</p>
            <table class="pace-table">
                <thead>
                    <tr><th>Goal</th><th>Race</th><th>Required pace /km</th><th>Required pace /mile</th></tr>
                </thead>
                <tbody>
                    <tr><td>Sub-20 min</td>      <td>5K</td>            <td>3:59 /km</td><td>6:26 /mile</td></tr>
                    <tr><td>Sub-25 min</td>      <td>5K</td>            <td>4:59 /km</td><td>8:02 /mile</td></tr>
                    <tr><td>Sub-45 min</td>      <td>10K</td>           <td>4:29 /km</td><td>7:14 /mile</td></tr>
                    <tr><td>Sub-1 hour</td>      <td>10K</td>           <td>5:59 /km</td><td>9:39 /mile</td></tr>
                    <tr><td>Sub-1:45</td>        <td>Half Marathon</td> <td>4:58 /km</td><td>7:59 /mile</td></tr>
                    <tr><td>Sub-2:00</td>        <td>Half Marathon</td> <td>5:41 /km</td><td>9:09 /mile</td></tr>
                    <tr><td>Sub-3:30</td>        <td>Marathon</td>      <td>4:58 /km</td><td>8:00 /mile</td></tr>
                    <tr><td>Sub-4:00</td>        <td>Marathon</td>      <td>5:41 /km</td><td>9:09 /mile</td></tr>
                </tbody>
            </table>

            <h3>How to use the three modes</h3>
            <ul>
                <li><strong>Calculate Pace</strong> — Know your distance and time? Enter them to find your average pace per km and per mile, plus your speed in km/h and mph.</li>
                <li><strong>Calculate Finish Time</strong> — Planning to race at a target pace? Enter the race distance and your goal pace to see your projected finish time.</li>
                <li><strong>Calculate Distance</strong> — Heading out for a timed run? Enter how long you'll run and at what pace to see how far you'll go.</li>
            </ul>

            <h3>Training pace zones</h3>
            <p>
                Most running coaches prescribe training by pace zone. As a rough guide based on your easy (conversational) running pace:
            </p>
            <ul>
                <li><strong>Easy / recovery</strong> — 60–70% effort, comfortable conversation pace. Builds aerobic base.</li>
                <li><strong>Tempo / threshold</strong> — 20–30 sec/km faster than easy pace. Comfortably hard — improves lactate threshold.</li>
                <li><strong>Interval / VO2max</strong> — 5K race pace or faster. Hard, short efforts (400m–1600m). Improves top-end aerobic capacity.</li>
                <li><strong>Race pace</strong> — The pace you can sustain for your target race distance. Specific to the event.</li>
            </ul>
        </template>
        <template #example>
            <p>
                You ran a <strong>5K in 24:30</strong> and want to know your pace and whether you're on track for a sub-25:00 goal.
            </p>
            <p>
                Select <strong>Calculate Pace</strong>, choose <strong>5K</strong> from the distance dropdown, enter <strong>0h 24m 30s</strong> and click Calculate.
            </p>
            <p>
                Result: <strong>4:54 /km</strong> (7:53 /mile) at 12.2 km/h. The race chart shows you'd finish a 10K in 48:59, a half marathon in 1:43:17, and a marathon in 3:26:34 at that pace. Your 5K puts you comfortably under 25:00 — next target: sub-24:00 (4:47 /km).
            </p>
            <p>
                Now flip to <strong>Calculate Finish Time</strong>, select <strong>Half Marathon</strong>, enter <strong>4:47 min/km</strong> pace, and you'll see a projected half marathon time of <strong>1:40:58</strong> — a solid 2-hour half marathon pace buffer.
            </p>
        </template>
    </UiCalcPage>
</template>

<script setup>
definePageMeta({ layout: 'brutalist' })

useCalcSEO(
    "Pace Calculator — Running Pace, Finish Time & Distance",
    "Free running pace calculator. Calculate your pace per km or per mile, predicted finish time for 5K to marathon, or distance from time and pace. Includes race pace chart.",
    [
        { q: "How do I calculate my running pace?", a: "Divide your total time in seconds by the distance in kilometres. For example, 30 minutes (1800 seconds) over 5 km = 1800 ÷ 5 = 360 seconds per km = 6:00/km. In miles: divide by the distance in miles (5 km ÷ 1.60934 = 3.107 miles → 1800 ÷ 3.107 = 579.4 sec/mile = 9:39/mile)." },
        { q: "What is a good running pace per km?", a: "It depends on your fitness and goal. A beginner 5K runner often runs 6:00–8:00/km. Intermediate runners aiming to break 25 minutes need under 5:00/km. Sub-20 minute 5K requires 3:59/km. For marathons, recreational runners often target 5:00–7:00/km, while a sub-4-hour marathon needs 5:41/km." },
        { q: "What pace do I need to run a sub-2 hour half marathon?", a: "To finish a half marathon (21.0975 km) in under 2 hours, you need to maintain a pace of 5:41/km (9:09/mile) or faster. That works out to 12.6 km/h average speed. Use the Finish Time mode and enter 5:40/km to confirm you'd finish in 1:59:40." },
        { q: "How do I convert pace from km to miles?", a: "Multiply your pace in min/km by 1.60934 to get min/mile. For example, 5:00/km × 1.60934 = 8:03/mile. To go the other way, divide your min/mile pace by 1.60934. The calculator shows both automatically in every result." },
        { q: "What pace is a 4-hour marathon?", a: "A 4-hour marathon requires a pace of 5:41/km (9:09/mile). That's 42.195 km ÷ 240 minutes = 5.69 min/km. Enter Marathon in the Finish Time mode with 5:41 pace to confirm: 4:00:01." },
        { q: "How do I calculate speed from pace?", a: "Speed (km/h) = 60 ÷ pace in minutes per km. A pace of 5:00/km = 60 ÷ 5 = 12 km/h. A pace of 6:00/km = 10 km/h. To convert to mph, divide by 1.60934. The calculator shows both km/h and mph in all results." },
        { q: "What pace should I run for easy training runs?", a: "Easy runs should feel conversational — you can speak in full sentences. For most runners this is 60–90 seconds per km slower than your 5K race pace. If your 5K pace is 5:00/km, your easy pace would be around 6:00–6:30/km. Easy running builds your aerobic base without excessive fatigue." },
        { q: "How far can I run in 30 minutes at a 6:00/km pace?", a: "At 6:00/km pace, you cover 1 km every 6 minutes. In 30 minutes: 30 ÷ 6 = 5 km. Use the Distance mode — enter 0h 30m 0s and pace 6:00 (min=6, sec=0) to get 5.00 km (3.11 miles)." },
    ]
)

useHead({
    script: [{
        type: 'application/ld+json',
        innerHTML: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'HowTo',
            name: 'How to Calculate Your Running Pace',
            description: 'Calculate your running pace per km or mile from a distance and finish time.',
            step: [
                { '@type': 'HowToStep', position: 1, name: 'Choose a mode', text: 'Select Pace to find your pace, Finish Time to predict a race time, or Distance to see how far you can run in a given time.' },
                { '@type': 'HowToStep', position: 2, name: 'Select your race distance', text: 'In Pace or Finish Time mode, choose a preset (5K, 10K, Half Marathon, Marathon) or enter a custom distance in km or miles.' },
                { '@type': 'HowToStep', position: 3, name: 'Enter your time or pace', text: 'In Pace mode, enter your hours, minutes and seconds. In Finish Time mode, enter your pace in minutes and seconds per km (or per mile with the Imperial toggle).' },
                { '@type': 'HowToStep', position: 4, name: 'Click Calculate', text: 'Your result appears instantly — pace per km and per mile, speed in km/h and mph, and a race chart showing projected finish times for all major distances.' },
            ],
        }),
    }],
})
</script>

<style scoped>
.pace-table {
    width: 100%;
    border-collapse: collapse;
    margin: 12px 0 20px;
    font-size: 14px;
}
.pace-table th,
.pace-table td {
    padding: 8px 12px;
    text-align: left;
    border: 1.5px solid rgba(10, 10, 10, 0.15);
}
.pace-table thead th {
    background: #0a0a0a;
    color: #fff;
    font-family: 'Space Mono', monospace;
    font-size: 10px;
    text-transform: uppercase;
    letter-spacing: 0.08em;
}
.pace-table tbody tr:nth-child(even) {
    background: rgba(10, 10, 10, 0.03);
}
</style>
