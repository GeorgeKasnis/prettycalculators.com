<template>
    <UiCalcPage title="Salary to Hourly Calculator" category="finance" description-title="Convert any salary to an hourly rate instantly">
        <template #calc>
            <CalculatorsFinanceSalaryToHourlyCalc />
        </template>
        <template #facts>
            <CalcFact label="Work hours / year" value="2,080 hrs" />
            <CalcFact label="$50k → hourly"     value="$24.04 /hr" />
            <CalcFact label="$100k → hourly"    value="$48.08 /hr" />
            <CalcFact label="$25/hr → annual"   value="$52,000" />
        </template>
        <template #description>
            <p>
                The <strong>salary to hourly calculator</strong> converts any salary — annual, monthly, biweekly, or weekly — into an equivalent hourly rate, and works in reverse too (hourly → salary). It accounts for your actual hours per week and weeks worked per year, giving you an accurate picture of what you earn per hour after factoring in your real schedule.
            </p>

            <h3>The standard formula</h3>
            <p>
                The most common assumption is <strong>40 hours/week × 52 weeks = 2,080 working hours per year</strong>. Divide your annual salary by 2,080 to get your hourly rate:
            </p>
            <p><strong>Hourly rate = Annual salary ÷ (hours per week × weeks per year)</strong></p>

            <h3>Common salary to hourly conversions</h3>
            <table class="salary-ref-table">
                <thead>
                    <tr><th>Annual salary</th><th>Hourly (40h/wk)</th><th>Monthly</th><th>Weekly</th></tr>
                </thead>
                <tbody>
                    <tr><td>$30,000</td>  <td>$14.42 /hr</td><td>$2,500</td>  <td>$576.92</td></tr>
                    <tr><td>$40,000</td>  <td>$19.23 /hr</td><td>$3,333</td>  <td>$769.23</td></tr>
                    <tr><td>$50,000</td>  <td>$24.04 /hr</td><td>$4,167</td>  <td>$961.54</td></tr>
                    <tr><td>$60,000</td>  <td>$28.85 /hr</td><td>$5,000</td>  <td>$1,153.85</td></tr>
                    <tr><td>$75,000</td>  <td>$36.06 /hr</td><td>$6,250</td>  <td>$1,442.31</td></tr>
                    <tr><td>$80,000</td>  <td>$38.46 /hr</td><td>$6,667</td>  <td>$1,538.46</td></tr>
                    <tr><td>$100,000</td> <td>$48.08 /hr</td><td>$8,333</td>  <td>$1,923.08</td></tr>
                    <tr><td>$120,000</td> <td>$57.69 /hr</td><td>$10,000</td> <td>$2,307.69</td></tr>
                    <tr><td>$150,000</td> <td>$72.12 /hr</td><td>$12,500</td> <td>$2,884.62</td></tr>
                </tbody>
            </table>

            <h3>Adjusting for actual hours worked</h3>
            <p>
                The 2,080 figure assumes no unpaid time off. If you take 2 weeks unpaid vacation, your actual paid working hours drop to 2,000 (50 weeks × 40 hrs). A $60,000 salary over 2,000 hours = <strong>$30.00/hr</strong> — not $28.85. Change the "Weeks per year" input to match your actual paid weeks.
            </p>
            <p>
                Similarly, if you work 45 hours per week on a salaried basis, your effective hourly rate drops: $60,000 ÷ (45 × 52) = <strong>$25.64/hr</strong>. This is a useful reality check when comparing salaried vs. hourly job offers.
            </p>

            <h3>Comparing a salary offer vs. a contract rate</h3>
            <p>
                Use the Hourly → Salary mode to see the annual equivalent of a freelance or contract rate. At $50/hr, 40 hrs/week, 48 weeks/year (allowing for 4 weeks off): $50 × 40 × 48 = <strong>$96,000</strong> — but a contractor must cover their own benefits, taxes, and equipment, typically adding 20–30% overhead. So $96,000 contractor income ≈ $65,000–$75,000 in salaried equivalent.
            </p>
        </template>
        <template #example>
            <p>
                You receive a job offer with an <strong>annual salary of $72,500</strong> for a 40-hour work week. What does that work out to per hour, and how does it compare to your current $32/hr contract rate?
            </p>
            <p>
                Select Annual, enter $72,500, 40 hrs/week, 52 weeks: <strong>$34.86/hr</strong>. Daily (8h): $278.85. Monthly: $6,041.67.
            </p>
            <p>
                Now switch to Hourly → Salary, enter $32, 40 hrs, 52 weeks: annual equivalent = <strong>$66,560</strong>. The salaried offer is worth $5,940 more annually — plus benefits. The salary wins.
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
    { q: "How much is $50,000 a year per hour?", a: "$50,000 ÷ 2,080 hours (40 hrs/week × 52 weeks) = $24.04 per hour. If you work 37.5 hours per week: $50,000 ÷ 1,950 = $25.64/hr. The standard assumption is a 40-hour work week and 52 weeks per year = 2,080 total hours." },
    { q: "How much is $100,000 a year per hour?", a: "$100,000 ÷ 2,080 hours = $48.08 per hour on a standard 40-hour, 52-week schedule. Working 45 hours per week: $100,000 ÷ 2,340 = $42.74/hr. The calculator adjusts for any combination of hours and weeks." },
    { q: "How much is $15 an hour annually?", a: "$15/hr × 40 hrs/week × 52 weeks = $31,200 per year. Biweekly paycheck: $1,200. Monthly: $2,600. This assumes full-time work with no unpaid weeks. If you only work 48 weeks: $15 × 40 × 48 = $28,800." },
    { q: "How many working hours are in a year?", a: "The standard is 2,080 hours (40 hours/week × 52 weeks). Some companies calculate on 50 weeks (excluding 2 weeks vacation), giving 2,000 hours. Dividing annual salary by 2,080 gives the standard hourly rate; dividing by 2,000 gives the 'paid working hours only' rate." },
    { q: "How much is $25 an hour annually?", a: "$25/hr × 2,080 hours = $52,000 per year. Monthly gross: $4,333. Weekly gross: $1,000. Biweekly: $2,000. These are gross (before tax) figures — take-home pay will be lower depending on your tax situation." },
    { q: "How do I convert a monthly salary to hourly?", a: "Multiply the monthly salary by 12 to get the annual figure, then divide by your total hours worked per year. Example: $5,000/month × 12 = $60,000/year. $60,000 ÷ 2,080 = $28.85/hr. Use the calculator: select Monthly, enter $5,000, set your hours per week." },
    { q: "What is a biweekly paycheck on a $60,000 salary?", a: "$60,000 ÷ 26 biweekly pay periods = $2,307.69 gross per paycheck. The calculator shows this in the full breakdown alongside hourly, daily, weekly, monthly, and annual figures." },
    { q: "How much is $20 an hour a year?", a: "$20/hr × 40 hrs/week × 52 weeks = $41,600 per year gross. Biweekly paycheck: $1,600. Monthly: $3,467. At 37.5 hours/week: $39,000/year. This is before any taxes or deductions." },
    { q: "What is my hourly rate if I earn £35,000 a year in the UK?", a: "£35,000 ÷ 2,080 hours (40h/wk × 52wks) = £16.83/hr. The UK standard full-time week is often 37.5 hours, giving 1,950 hours/year: £35,000 ÷ 1,950 = £17.95/hr. Set the 'Hours per week' to 37.5 to see the accurate UK figure." },
    { q: "How do I compare a salaried offer to a freelance day rate?", a: "Convert the freelance day rate to annual equivalent: day rate × working days per year (typically 220–235, accounting for holidays and weekdays). A £400/day rate at 220 days = £88,000. Then factor in that freelancers pay employer NI (or self-employment tax) and cover their own pension and benefits — effectively adding 15–25% to break even with a salaried role." },
    { q: "Is overtime pay included in the salary to hourly calculation?", a: "No — this calculator converts your base salary only. Overtime is typically paid at 1.5× your regular hourly rate (in the US) or per agreement in the UK. If you receive regular overtime, calculate your average total hours worked per week (including overtime) and enter that number instead of 40." },
]

useCalcSEO(
    "Salary to Hourly Calculator — Annual, Monthly & Weekly Pay Converter",
    "Convert annual salary to hourly rate instantly. Enter your salary and working hours to get your hourly, daily, weekly, biweekly, monthly, and annual pay breakdown. Works in reverse too.",
    faqs
)

useHead({
    script: [{
        type: 'application/ld+json',
        innerHTML: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'HowTo',
            name: 'How to Convert Salary to Hourly Rate',
            description: 'Convert an annual, monthly, or weekly salary to an equivalent hourly rate using hours worked per week.',
            step: [
                { '@type': 'HowToStep', position: 1, name: 'Choose conversion direction', text: 'Select "Salary → Hourly" to find your hourly rate from a salary, or "Hourly → Salary" to see the annual equivalent of an hourly wage.' },
                { '@type': 'HowToStep', position: 2, name: 'Select pay period and enter amount', text: 'Choose whether your salary is annual, monthly, biweekly, weekly, or daily. Enter the salary amount.' },
                { '@type': 'HowToStep', position: 3, name: 'Enter working hours', text: 'Enter your hours per week (default 40) and weeks per year (default 52). Adjust weeks for unpaid vacation or part-year employment.' },
                { '@type': 'HowToStep', position: 4, name: 'Click Convert', text: 'A full breakdown table shows your pay for every period: hourly, daily, weekly, biweekly, monthly, and annual.' },
            ],
        }),
    }],
})
</script>

<style scoped>
.salary-ref-table {
    width: 100%;
    border-collapse: collapse;
    margin: 12px 0 20px;
    font-size: 14px;
}
.salary-ref-table th,
.salary-ref-table td {
    padding: 8px 12px;
    text-align: left;
    border: 1.5px solid rgba(10, 10, 10, 0.15);
}
.salary-ref-table thead th {
    background: #0a0a0a;
    color: #fff;
    font-family: 'Space Mono', monospace;
    font-size: 10px;
    text-transform: uppercase;
    letter-spacing: 0.08em;
}
.salary-ref-table tbody tr:nth-child(even) {
    background: rgba(10, 10, 10, 0.03);
}
</style>
