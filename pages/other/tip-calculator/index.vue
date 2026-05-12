<template>
    <UiCalcPage title="Tip Calculator" category="other" description-title="Split the bill and calculate the tip">
        <template #calc>
            <CalculatorsOtherTipCalc />
        </template>
        <template #facts>
            <CalcFact label="Good service"      value="18–20%" />
            <CalcFact label="Excellent service" value="20–25%" />
            <CalcFact label="Minimum tip"       value="10–15%" />
            <CalcFact label="US standard"       value="18%" />
        </template>
        <template #description>
            <p>
                The <strong>Tip Calculator</strong> tells you exactly how much to tip, what the total bill comes to, and how much each person owes when splitting. Enter your bill, pick a tip percentage, set the number of people — done.
            </p>
            <p>
                Tipping culture varies widely around the world. In the <strong>United States</strong>, 18–20% is the standard for sit-down restaurants. Some guidelines:
            </p>
            <ul>
                <li><strong>10–12%</strong> — Below average service, or takeaway/counter service.</li>
                <li><strong>15%</strong> — Adequate, standard service at a casual restaurant.</li>
                <li><strong>18–20%</strong> — Good service at a mid-range or upscale restaurant.</li>
                <li><strong>20–25%+</strong> — Exceptional service, fine dining, or if you want to show extra appreciation.</li>
            </ul>
            <p>
                In the <strong>UK</strong>, 10–15% is typical, and tipping is less obligatory. In much of <strong>Europe and Asia</strong>, tipping may not be expected at all, or rounding up the bill is sufficient.
            </p>
        </template>
        <template #example>
            <p>
                A dinner bill of <strong>$85.00</strong> for <strong>3 people</strong>, with <strong>20% tip</strong>.
            </p>
            <p>
                Tip amount: $85.00 × 0.20 = <strong>$17.00</strong>
            </p>
            <p>
                Total bill: $85.00 + $17.00 = <strong>$102.00</strong>
            </p>
            <p>
                Per person: $102.00 ÷ 3 = <strong>$34.00 each</strong>
            </p>
            <p>
                Each person also contributes $17.00 ÷ 3 = <strong>$5.67 in tip</strong>. If splitting, each person pays $34.00.
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
    { q: "How much should I tip at a restaurant?", a: "In the US, 18–20% is standard for sit-down restaurants. 15% is acceptable for average service. 20–25% for excellent service. In the UK, 10–15% is typical." },
    { q: "How do I calculate a 20% tip?", a: "Multiply the bill by 0.20. Or for a quick mental calculation: find 10% (move the decimal one place left) and double it. On a $50 bill: 10% = $5, doubled = $10." },
    { q: "Should I tip on the pre-tax or post-tax amount?", a: "Tipping on the pre-tax total is technically correct, but most people tip on the post-tax amount for simplicity. The difference is small on typical bills." },
    { q: "How do I split the tip between multiple people?", a: "Add the tip to the total bill, then divide by the number of people. Our calculator does this automatically — just set the number of people." },
    { q: "What is a 15% tip on $60?", a: "$60 × 0.15 = $9.00 tip. Total bill = $69.00. Quick mental shortcut: 10% of $60 = $6, half of that = $3, add together = $9." },
    { q: "How much do you tip for food delivery?", a: "For food delivery, 15–20% is customary in the US, with a minimum of $3–5 on small orders regardless of percentage. Delivery drivers are typically paid minimum wage or less and rely on tips. For difficult deliveries (bad weather, long distance, stairs) tip on the higher end. In the UK, £2–3 is typical on delivery platforms." },
    { q: "Should you tip at a counter-service restaurant or coffee shop?", a: "Tipping at counter service is optional and less expected than at sit-down restaurants. A tip jar or digital tip prompt is common but not obligatory. If you're a regular or the service is exceptional, 10–15% or rounding up is a nice gesture. There is no social obligation for counter service the way there is for full table service." },
    { q: "How much do you tip a hairdresser or barber?", a: "For hairdressers and barbers in the US, 15–20% of the service cost is standard. A cut costing $30 warrants a $5–6 tip at 18%. In the UK, tipping 10–15% is appreciated but not always expected. If the stylist is also the salon owner, tipping is slightly less conventional but still welcomed." },
    { q: "Do you tip on drinks at a bar?", a: "In the US, $1 per beer or wine by the glass and $2 per cocktail is the common rule of thumb. Alternatively, 15–20% of the total bar tab. Running a tab at the end of the night and tipping 20% on the total is also standard. In the UK and Europe, tipping at a bar is less common — rounding up or leaving change is typical." },
    { q: "Is it rude not to tip in the US?", a: "In the US, not tipping at a sit-down restaurant is generally considered rude and signals dissatisfaction with service. Servers earn a tipped minimum wage (as low as $2.13/hour federally) and rely on tips for the majority of their income. If you have a genuine complaint, speak with the manager — withholding a tip silently doesn't communicate the issue. Not tipping at counter service is far less fraught." },
]

useCalcSEO(
    "Tip Calculator — How Much to Tip & Split the Bill",
    "Free tip calculator. Enter your bill, choose a tip percentage, and split between people. Instantly shows tip amount, total, and cost per person.",
    faqs
)

useHead({
    script: [{
        type: 'application/ld+json',
        innerHTML: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'HowTo',
            name: 'How to Calculate a Tip and Split the Bill',
            description: 'Find the tip amount, total bill, and per-person cost for any group.',
            step: [
                { '@type': 'HowToStep', position: 1, name: 'Enter the bill total', text: 'Type the total bill amount before tip.' },
                { '@type': 'HowToStep', position: 2, name: 'Choose a tip percentage', text: 'Select a preset percentage (10%, 15%, 18%, 20%, 25%) or enter a custom tip percentage.' },
                { '@type': 'HowToStep', position: 3, name: 'Enter the number of people', text: 'Set how many people are splitting the bill. Default is 1.' },
                { '@type': 'HowToStep', position: 4, name: 'Read the results', text: 'The calculator shows tip amount, total bill with tip, and the amount each person owes.' },
            ],
        }),
    }],
})
</script>
