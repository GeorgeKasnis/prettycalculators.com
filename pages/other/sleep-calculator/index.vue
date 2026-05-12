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
        <template #faq>
            <CalcFaq :faqs="faqs" />
        </template>
    </UiCalcPage>
</template>

<script setup>
definePageMeta({ layout: 'brutalist' })

const faqs = [
    { q: "How long is a sleep cycle?", a: "One sleep cycle lasts approximately 90 minutes and includes light sleep, deep sleep (slow-wave sleep), and REM sleep. Most adults need 5–6 complete cycles per night (7.5–9 hours)." },
    { q: "Why do I wake up tired even after 8 hours of sleep?", a: "If you wake up mid-cycle — especially during deep sleep — you'll feel groggy due to sleep inertia. The key is to wake at the end of a 90-minute cycle. 7.5 hours (5 cycles) often feels better than 8 hours if 8 hours lands you in deep sleep." },
    { q: "What time should I go to sleep?", a: "It depends on your wake-up time. Use this calculator to find bedtimes that align with complete sleep cycles. For a 7 AM wake-up, going to bed at 11:15 PM gives 5 full cycles (7.5 hours)." },
    { q: "How many sleep cycles do I need?", a: "Most adults need 5–6 sleep cycles (7.5–9 hours) per night. Fewer than 4 cycles (6 hours) consistently impairs cognitive function, mood, and physical recovery." },
    { q: "What time should I go to bed if I wake up at 6 AM?", a: "For a 6 AM wake-up, subtract 15 minutes (to fall asleep) from each cycle count: 5 cycles (7.5h) → bed at 10:15 PM; 6 cycles (9h) → bed at 8:45 PM; 4 cycles (6h) → bed at 11:45 PM. The 10:15 PM bedtime is the recommended sweet spot for most adults." },
    { q: "Is 6 hours of sleep enough?", a: "For most adults, 6 hours (4 sleep cycles) is below the recommended amount. Research consistently shows that fewer than 7 hours per night is associated with impaired cognitive function, reduced reaction time, mood disturbance, and increased risk of illness. Short-term, 6 hours is manageable; long-term, it accumulates sleep debt. The NHS and CDC both recommend 7–9 hours for adults." },
    { q: "What is the best time to wake up for productivity?", a: "The 'best' wake-up time depends on your chronotype (whether you're a morning or evening person), not just a single ideal hour. For morning chronotypes, 6–7 AM aligns with peak cortisol and focus. For evening chronotypes, forcing a 6 AM wake-up cuts into REM sleep and reduces cognitive performance. Use the sleep calculator to find a wake time that completes 5–6 full cycles." },
    { q: "Does a nap count as a sleep cycle?", a: "A 90-minute nap completes one full sleep cycle including REM and is the most restorative nap length. A 20-minute power nap avoids deep sleep and prevents grogginess — it boosts alertness without disrupting nighttime sleep. Naps longer than 30 minutes but shorter than 90 minutes risk waking mid-cycle and causing sleep inertia." },
    { q: "What is REM sleep and why does it matter?", a: "REM (Rapid Eye Movement) sleep is the stage where most dreaming occurs. It's critical for memory consolidation, emotional regulation, and creativity. REM sleep dominates the later cycles of the night (cycles 4–6), so cutting sleep short disproportionately reduces REM. Chronic REM deprivation affects mood, learning ability, and emotional resilience." },
    { q: "How do I fix my sleep schedule if I've been going to bed at 2 AM?", a: "Shift your bedtime gradually — move it 15–30 minutes earlier every 2–3 days until you reach your target. Avoid dramatic overnight changes (e.g., going from 2 AM to 10 PM in one step) as this rarely sticks. Expose yourself to bright light immediately after your new wake-up time to reset your circadian clock, and avoid screens an hour before the new, earlier bedtime." },
]

useCalcSEO(
    "Sleep Calculator — Best Bedtime & Wake Up Time",
    "Free sleep calculator based on 90-minute sleep cycles. Find the ideal time to go to sleep or wake up to feel refreshed and avoid morning grogginess.",
    faqs
)

useHead({
    script: [{
        type: 'application/ld+json',
        innerHTML: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'HowTo',
            name: 'How to Find Your Ideal Bedtime or Wake-Up Time',
            description: 'Calculate optimal sleep times based on 90-minute sleep cycles to wake up refreshed.',
            step: [
                { '@type': 'HowToStep', position: 1, name: 'Choose your mode', text: 'Select "I want to wake up at" to find the best bedtime, or "I want to go to bed at" to find the best wake-up time.' },
                { '@type': 'HowToStep', position: 2, name: 'Enter your time', text: 'Type your target wake-up or bedtime using the time picker.' },
                { '@type': 'HowToStep', position: 3, name: 'Click Calculate', text: 'Four optimal times appear based on 4, 5, 6, and 7 complete 90-minute sleep cycles.' },
                { '@type': 'HowToStep', position: 4, name: 'Choose your bedtime', text: 'Pick the time that gives you 5 or 6 cycles (7.5–9 hours) for the most restorative sleep.' },
            ],
        }),
    }],
})
</script>
