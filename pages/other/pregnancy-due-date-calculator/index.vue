<template>
    <UiCalcPage title="Pregnancy Due Date Calculator" category="other" description-title="Estimate your due date and key milestones">
        <template #calc>
            <CalculatorsOtherPregnancyCalc />
        </template>
        <template #facts>
            <CalcFact label="Gestation"     value="40 weeks / 280 days" />
            <CalcFact label="Naegele's rule" value="LMP + 280 days" />
            <CalcFact label="Full term"     value="37–42 weeks" />
            <CalcFact label="YMYL"          value="Always confirm with your doctor" />
        </template>
        <template #description>
            <p>
                The <strong>Pregnancy Due Date Calculator</strong> estimates your expected delivery date (EDD) based on the first day of your last menstrual period (LMP) and your average cycle length. It uses <strong>Naegele's Rule</strong> — the same formula used in clinical practice — adjusted for cycles that differ from the standard 28 days.
            </p>
            <p>
                Naegele's Rule: add 280 days (40 weeks) to the first day of your LMP. For cycles longer or shorter than 28 days, ovulation shifts by the same number of days, so the formula adjusts accordingly.
            </p>
            <ul>
                <li><strong>1st trimester</strong> (weeks 1–13) — organ formation, highest risk period</li>
                <li><strong>2nd trimester</strong> (weeks 14–27) — typically the most comfortable stage</li>
                <li><strong>3rd trimester</strong> (weeks 28–40+) — baby gains weight, lungs mature</li>
            </ul>
            <p>
                <strong>Important:</strong> This calculator is for informational purposes only. Only your healthcare provider can confirm your due date, typically through ultrasound dating in the first trimester, which is more accurate than LMP-based calculations.
            </p>
        </template>
        <template #example>
            <p>
                LMP: <strong>1 March 2025</strong>, cycle length: <strong>28 days</strong>.
            </p>
            <p>
                Due date = 1 March + 280 days = <strong>5 December 2025</strong>.
            </p>
            <p>
                For a 35-day cycle, ovulation shifts +7 days, so due date = 1 March + 287 days = <strong>12 December 2025</strong>.
            </p>
            <p>
                Only about <strong>5% of babies</strong> are born on their exact due date — most arrive within 2 weeks either side.
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
    { q: "How is the due date calculated?", a: "The standard method is Naegele's Rule: add 280 days (40 weeks) to the first day of your last menstrual period (LMP). For cycles other than 28 days, ovulation occurs earlier or later, so the due date shifts by the same number of days. Ultrasound dating in the first trimester is more accurate and is typically used to confirm or adjust the LMP-based estimate." },
    { q: "How accurate is a due date calculator?", a: "LMP-based due date calculators are accurate within about 5–7 days for women with regular 28-day cycles. For irregular cycles, accuracy decreases. Only about 5% of babies are born on their exact due date — most arrive within a 2-week window. First-trimester ultrasound (at 8–12 weeks) is the gold standard for dating accuracy." },
    { q: "What is gestational age?", a: "Gestational age counts pregnancy from the first day of your last period, not from conception. This means gestational age at birth is typically 40 weeks, even though the embryo is only about 38 weeks old from fertilisation. Healthcare providers use gestational age universally because the exact date of conception is rarely known." },
    { q: "What if my cycle is irregular?", a: "This calculator adjusts for cycle length by shifting ovulation timing. If your cycles vary widely (by more than 5–7 days cycle to cycle), the LMP method is less reliable. In this case, an early ultrasound is the best way to establish an accurate due date. Irregular cycles are common and your doctor can advise on how to track ovulation." },
    { q: "What does 'full term' mean?", a: "A pregnancy is considered full term from 39 weeks 0 days to 40 weeks 6 days. Early term is 37–38 weeks; late term is 41 weeks; post-term is 42 weeks or beyond. Babies born before 37 weeks are considered premature (preterm). The weeks 37–42 are all within the normal range for delivery." },
    { q: "Can I use this calculator for IVF pregnancies?", a: "For IVF pregnancies, due dates are calculated differently — typically 266 days (38 weeks) from the egg retrieval date, or adjusted based on the embryo transfer day (day 3 or day 5 transfer). This calculator uses LMP-based dating, which is not appropriate for IVF. Use the dates provided by your fertility clinic." },
    { q: "What are the signs of early pregnancy?", a: "Early signs include missed period, nausea (morning sickness), breast tenderness, fatigue, frequent urination, and light spotting (implantation bleeding). A home pregnancy test can detect hCG hormone from around the time of a missed period. Always confirm with a healthcare provider for a clinical diagnosis." },
    { q: "When should I book my first prenatal appointment?", a: "Most healthcare providers recommend booking your first prenatal appointment at 8–10 weeks of pregnancy. In the UK, the first midwife booking appointment is typically at 8–10 weeks with a dating scan at 11–14 weeks. In the US, the first OB visit is usually at 8 weeks." },
    { q: "How many weeks pregnant am I if my last period was 6 weeks ago?", a: "If your last period started 6 weeks ago today, you are approximately 6 weeks pregnant (gestational age). In terms of fetal development, the embryo is about 4 weeks old (fertilisation occurs around week 2 of the gestational count). At 6 weeks, a heartbeat may be detectable on ultrasound." },
    { q: "What is the difference between an EDD and a due date?", a: "EDD stands for Estimated Delivery Date — it is the due date. The terms are interchangeable. 'Estimated' is key: it is a statistical midpoint, not a deadline. Labour can naturally start anywhere from 37 to 42 weeks gestation, and only about 1 in 20 babies arrives on their exact EDD." },
    { q: "Can a due date change after the first ultrasound?", a: "Yes, and this is common. If the ultrasound dating differs from your LMP-based estimate by more than 5–7 days, most clinicians will adjust the official due date to the ultrasound measurement. This is because LMP-based dates assume a 28-day cycle with ovulation on day 14, which doesn't apply to everyone." },
]

useCalcSEO(
    "Pregnancy Due Date Calculator — Estimate Your EDD by LMP",
    "Free pregnancy due date calculator. Enter your last period date and cycle length to find your estimated due date, current gestational age, trimester, and key pregnancy milestones.",
    faqs
)

useHead({
    script: [{
        type: 'application/ld+json',
        innerHTML: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'HowTo',
            name: 'How to Calculate Your Pregnancy Due Date',
            description: 'Estimate your expected delivery date using the first day of your last period and cycle length.',
            step: [
                { '@type': 'HowToStep', position: 1, name: 'Enter the first day of your last period', text: 'Enter the day, month, and year of the first day of your most recent menstrual period (LMP).' },
                { '@type': 'HowToStep', position: 2, name: 'Enter your average cycle length', text: 'If your cycles are typically 28 days, leave the default. Enter your actual average if your cycles are longer or shorter.' },
                { '@type': 'HowToStep', position: 3, name: 'Click Calculate Due Date', text: 'Your estimated due date, current gestational age, trimester, and key pregnancy milestones all appear instantly.' },
            ],
        }),
    }],
})
</script>
