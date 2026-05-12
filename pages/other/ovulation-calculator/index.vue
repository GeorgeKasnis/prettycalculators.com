<template>
    <UiCalcPage title="Ovulation Calculator" category="other" description-title="Find your fertile window and ovulation date">
        <template #calc>
            <CalculatorsOtherOvulationCalc />
        </template>
        <template #facts>
            <CalcFact label="Fertile window"   value="~6 days/cycle" />
            <CalcFact label="Luteal phase"     value="~14 days (stable)" />
            <CalcFact label="Egg survives"     value="12–24 hours" />
            <CalcFact label="Sperm survives"   value="up to 5 days" />
        </template>
        <template #description>
            <p>
                The <strong>Ovulation Calculator</strong> predicts when you are most likely to ovulate and identifies your <strong>fertile window</strong> — the days each cycle when pregnancy is possible. Based on your last period date and cycle length, it calculates your ovulation date and maps out the next three cycles.
            </p>
            <p>
                Ovulation typically occurs <strong>14 days before your next period</strong> (the luteal phase length), regardless of cycle length. This means:
            </p>
            <ul>
                <li>28-day cycle → ovulation at day 14</li>
                <li>35-day cycle → ovulation at day 21</li>
                <li>24-day cycle → ovulation at day 10</li>
            </ul>
            <p>
                The fertile window spans <strong>5 days before ovulation plus ovulation day itself</strong> — because sperm can survive in the reproductive tract for up to 5 days, while the released egg lives only 12–24 hours.
            </p>
            <p>
                <strong>Note:</strong> This calculator provides estimates based on average cycle timing. Ovulation can shift due to stress, illness, travel, and hormonal changes. For confirmed ovulation detection, use LH ovulation test strips (OPK tests) alongside this calculator.
            </p>
        </template>
        <template #example>
            <p>
                Last period: <strong>1 June 2025</strong>. Cycle length: <strong>32 days</strong>.
            </p>
            <p>
                Ovulation = day 32 − 14 = day 18 → <strong>18 June 2025</strong>.
            </p>
            <p>
                Fertile window: <strong>13 June – 19 June 2025</strong> (5 days before + ovulation day + 1 day).
            </p>
            <p>
                Next period expected: <strong>3 July 2025</strong> (1 June + 32 days).
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
    { q: "How do I calculate my ovulation date?", a: "Ovulation typically occurs 14 days before your next period (the luteal phase), regardless of cycle length. Subtract 14 from your cycle length to find the ovulation day. For a 28-day cycle: day 14. For a 35-day cycle: day 21. Enter your details above and the calculator does this automatically." },
    { q: "What is the fertile window?", a: "The fertile window is the period each cycle when intercourse can result in pregnancy. It spans roughly 6 days: the 5 days before ovulation (when sperm can survive waiting for the egg) plus the day of ovulation itself. The egg only survives 12–24 hours after release, so timing matters significantly." },
    { q: "How do I use an ovulation calculator for irregular periods?", a: "Irregular cycles make prediction harder. If your cycle varies between 28 and 35 days, use your shortest cycle to find your earliest possible ovulation (shortest minus 14) and your longest for the latest. This gives you a wider fertile window to track. Combine with OPK (ovulation predictor kit) tests for the most accurate results." },
    { q: "Can an ovulation calculator help choose the baby's sex?", a: "The popular Shettles Method suggests that timing intercourse closer to ovulation may slightly favour a boy (Y sperm are faster but shorter-lived) while earlier in the fertile window may favour a girl (X sperm are slower but longer-lived). However, scientific evidence for this is weak — no natural method reliably determines sex, and each conception is roughly 50/50." },
    { q: "What is the luteal phase and why is it always 14 days?", a: "The luteal phase is the period from ovulation to your next period. It's driven by the corpus luteum (the follicle that released the egg), which has a relatively fixed lifespan of about 14 days in most women. Unlike the follicular phase (before ovulation), which varies with cycle length, the luteal phase is typically constant at 12–14 days. Luteal phase defect (less than 10 days) can sometimes affect fertility." },
    { q: "What are the signs of ovulation?", a: "Physical signs include: light mid-cycle spotting, a slight rise in basal body temperature (BBT) after ovulation (0.2–0.5°C), changes in cervical mucus (becoming clear and stretchy like raw egg white around ovulation), mild one-sided pelvic pain (mittelschmerz), and a positive LH surge on an OPK test. BBT charting and OPK tests together are the most reliable tracking methods." },
    { q: "How soon after my period can I get pregnant?", a: "It depends on your cycle length. For short cycles (21–24 days), ovulation can occur as early as day 7–10, meaning fertile days begin just after a period ends. For longer cycles (35+ days), fertile days are later. Sperm can survive up to 5 days, so unprotected sex near the end of a period can still result in pregnancy for women with short cycles." },
    { q: "What if my cycle is longer than 35 days?", a: "Cycles over 35 days are considered irregular or oligomenorrhea. Long cycles can be associated with PCOS (polycystic ovary syndrome) or thyroid conditions. Ovulation still occurs before your period — it just happens later in the cycle. If your cycles are regularly over 35 days or are highly variable, consult a healthcare provider or gynaecologist." },
    { q: "Can I get pregnant 2 days before my period?", a: "It's very unlikely but not impossible. Two days before your period puts you in the late luteal phase — well past ovulation — so pregnancy is unlikely. However, if your cycle is irregular or shorter than expected this month, ovulation may have occurred later than usual, making a very slim chance possible. A missed period and positive test would be the definitive indicators." },
    { q: "What is the best day to conceive a baby?", a: "The day of ovulation and the day before give the highest probability of conception. Conception rates are approximately: ovulation day 33%, 1 day before 31%, 2 days before 27%, 3 days before 16%, 4 days before 10%. Having intercourse in the 2–3 days leading up to and including ovulation maximises the chance each cycle." },
    { q: "How do OPK tests work with an ovulation calculator?", a: "OPK (ovulation predictor kit) tests detect the LH surge that triggers ovulation approximately 24–36 hours later. Use the calculator to identify your likely fertile window (usually 5 days before predicted ovulation), then start daily OPK testing about 4–5 days before your predicted ovulation date. A strong positive OPK means you're likely to ovulate within 24–36 hours." },
]

useCalcSEO(
    "Ovulation Calculator — Find Your Fertile Window & Best Days to Conceive",
    "Free ovulation calculator. Enter your last period date and cycle length to find your ovulation date, fertile window, and next 3 cycles. Works for regular and irregular cycles.",
    faqs
)

useHead({
    script: [{
        type: 'application/ld+json',
        innerHTML: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'HowTo',
            name: 'How to Find Your Fertile Window',
            description: 'Calculate your ovulation date and fertile window from your last period date and cycle length.',
            step: [
                { '@type': 'HowToStep', position: 1, name: 'Enter the first day of your last period', text: 'Enter the day, month, and year of when your most recent period started.' },
                { '@type': 'HowToStep', position: 2, name: 'Enter your cycle length', text: 'Count the days from the first day of one period to the first day of the next. The average is 28 days but normal range is 21–35 days.' },
                { '@type': 'HowToStep', position: 3, name: 'Click Calculate Fertile Window', text: 'Your ovulation date, fertile window, next period date, and the next 3 cycles all appear with exact calendar dates.' },
            ],
        }),
    }],
})
</script>
