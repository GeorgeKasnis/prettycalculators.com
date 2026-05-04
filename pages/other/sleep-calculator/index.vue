<template>
    <UiCalcPage title="Sleep Calculator" category="other" description-title="Wake up refreshed every morning">
        <template #calc>
            <CalculatorsOtherSleepCalc />
        </template>
        <template #facts>
            <CalcFact label="Sleep cycle"    value="90 minutes" />
            <CalcFact label="Fall asleep"    value="~15 minutes" />
            <CalcFact label="Ideal cycles"   value="5–6 per night" />
            <CalcFact label="Ideal sleep"    value="7.5 – 9 hours" />
        </template>
        <template #description>
            <p>
                The <strong>Sleep Calculator</strong> helps you find the ideal bedtime or wake-up time based on your body's natural sleep cycles. Waking up at the end of a complete cycle — instead of in the middle of one — is what makes the difference between feeling groggy and feeling refreshed.
            </p>
            <p>
                Sleep happens in <strong>90-minute cycles</strong>, each consisting of light sleep, deep sleep (slow-wave), and REM sleep. Interrupting a cycle mid-way — particularly during deep sleep — is what causes that heavy, foggy feeling known as <em>sleep inertia</em>.
            </p>
            <p>
                This calculator adds <strong>15 minutes</strong> to fall asleep (the average for most adults) and calculates four optimal times based on 4, 5, 6, and 7 complete cycles:
            </p>
            <ul>
                <li><strong>4 cycles (6 hours)</strong> — Minimum viable sleep. Fine occasionally, not sustainable long-term.</li>
                <li><strong>5 cycles (7.5 hours)</strong> — Optimal for most adults. The recommended sweet spot.</li>
                <li><strong>6 cycles (9 hours)</strong> — Great for recovery days, illness, or sleep debt repayment.</li>
                <li><strong>7 cycles (10.5 hours)</strong> — Extended recovery sleep.</li>
            </ul>
        </template>
        <template #example>
            <p>
                You need to wake up at <strong>7:00 AM</strong>. When should you go to sleep?
            </p>
            <p>
                Subtracting 15 min (to fall asleep) + 7.5 hours (5 cycles): go to bed at <strong>11:15 PM</strong>.
            </p>
            <p>
                Other options: 12:45 AM (4 cycles, 6h) or 9:45 PM (6 cycles, 9h).
            </p>
            <p>
                The <strong>11:15 PM</strong> bedtime gives 5 complete 90-minute cycles — the optimal amount for most adults. You'd be in light sleep around 7:00 AM, making the alarm far less jarring than if it caught you mid-deep-sleep cycle.
            </p>
        </template>
    </UiCalcPage>
</template>

<script setup>
definePageMeta({ layout: 'brutalist' })
useCalcSEO(
    "Sleep Calculator — Best Bedtime & Wake Up Time",
    "Free sleep calculator based on 90-minute sleep cycles. Find the ideal time to go to sleep or wake up to feel refreshed and avoid morning grogginess.",
    [
        { q: "How long is a sleep cycle?", a: "One sleep cycle lasts approximately 90 minutes and includes light sleep, deep sleep (slow-wave sleep), and REM sleep. Most adults need 5–6 complete cycles per night (7.5–9 hours)." },
        { q: "Why do I wake up tired even after 8 hours of sleep?", a: "If you wake up mid-cycle — especially during deep sleep — you'll feel groggy due to sleep inertia. The key is to wake at the end of a 90-minute cycle. 7.5 hours (5 cycles) often feels better than 8 hours if 8 hours lands you in deep sleep." },
        { q: "What time should I go to sleep?", a: "It depends on your wake-up time. Use this calculator to find bedtimes that align with complete sleep cycles. For a 7 AM wake-up, going to bed at 11:15 PM gives 5 full cycles (7.5 hours)." },
        { q: "How many sleep cycles do I need?", a: "Most adults need 5–6 sleep cycles (7.5–9 hours) per night. Fewer than 4 cycles (6 hours) consistently impairs cognitive function, mood, and physical recovery." },
    ]
)
</script>
