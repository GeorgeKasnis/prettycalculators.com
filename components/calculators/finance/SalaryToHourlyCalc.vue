<template>
    <div>
        <CalcTabs v-model="mode" :tabs="MODE_TABS" />

        <CalcInputStack>
            <template v-if="mode === 'salary'">
                <CalcSelectRow label="Salary period" v-model="period" :options="PERIOD_OPTIONS" />
                <CalcInputRow label="Salary amount" :unit="currency" v-model="salaryAmount" placeholder="e.g. 60000" type="number" />
            </template>
            <template v-else>
                <CalcInputRow :label="`Hourly rate`" :unit="currency" v-model="hourlyRate" placeholder="e.g. 25" type="number" />
            </template>
            <CalcInputRow label="Hours per week" unit="hrs" v-model="hoursPerWeek" placeholder="40" type="number" />
            <CalcInputRow label="Weeks per year" unit="wks" v-model="weeksPerYear" placeholder="52" type="number" />
            <CalcSelectRow label="Currency symbol" v-model="currency" :options="CURRENCY_OPTIONS" />
        </CalcInputStack>

        <CalcBtn :showClear="calculated" @click="calculate" @clear="clear">
            {{ mode === 'salary' ? 'Convert to Hourly →' : 'Convert to Salary →' }}
        </CalcBtn>

        <div v-if="calculated" class="salary-table">
            <div class="salary-head">Full pay breakdown</div>
            <div class="salary-row salary-row--header">
                <span>Period</span>
                <span>Working hours</span>
                <span>Amount ({{ currency }})</span>
            </div>
            <div class="salary-row salary-row--highlight">
                <span class="sal-period">Hourly</span>
                <span class="sal-hours">1 hr</span>
                <span class="sal-amount">{{ currency }}{{ outHourly }}</span>
            </div>
            <div class="salary-row">
                <span class="sal-period">Daily <span class="sal-sub">({{ hoursPerDay }}h day)</span></span>
                <span class="sal-hours">{{ hoursPerDay }} hrs</span>
                <span class="sal-amount">{{ currency }}{{ outDaily }}</span>
            </div>
            <div class="salary-row">
                <span class="sal-period">Weekly</span>
                <span class="sal-hours">{{ hoursPerWeek || 40 }} hrs</span>
                <span class="sal-amount">{{ currency }}{{ outWeekly }}</span>
            </div>
            <div class="salary-row">
                <span class="sal-period">Biweekly</span>
                <span class="sal-hours">{{ (hoursPerWeek || 40) * 2 }} hrs</span>
                <span class="sal-amount">{{ currency }}{{ outBiweekly }}</span>
            </div>
            <div class="salary-row">
                <span class="sal-period">Monthly</span>
                <span class="sal-hours">~{{ hoursPerMonth }} hrs</span>
                <span class="sal-amount">{{ currency }}{{ outMonthly }}</span>
            </div>
            <div class="salary-row salary-row--highlight">
                <span class="sal-period">Annual</span>
                <span class="sal-hours">{{ totalHoursYear }} hrs</span>
                <span class="sal-amount">{{ currency }}{{ outAnnual }}</span>
            </div>
        </div>
    </div>
</template>

<script setup>
const mode         = ref('salary')
const period       = ref('annual')
const salaryAmount = ref('')
const hourlyRate   = ref('')
const hoursPerWeek = ref('40')
const weeksPerYear = ref('52')
const currency     = ref('$')
const calculated   = ref(false)

const outHourly   = ref('')
const outDaily    = ref('')
const outWeekly   = ref('')
const outBiweekly = ref('')
const outMonthly  = ref('')
const outAnnual   = ref('')

const MODE_TABS = [
    { value: 'salary', label: 'Salary → Hourly' },
    { value: 'hourly', label: 'Hourly → Salary' },
]

const PERIOD_OPTIONS = [
    { value: 'annual',    label: 'Annual (per year)' },
    { value: 'monthly',   label: 'Monthly (per month)' },
    { value: 'biweekly',  label: 'Biweekly (every 2 weeks)' },
    { value: 'weekly',    label: 'Weekly (per week)' },
    { value: 'daily',     label: 'Daily (per day)' },
]

const CURRENCY_OPTIONS = [
    { value: '$',  label: '$ — USD / CAD / AUD' },
    { value: '€',  label: '€ — Euro' },
    { value: '£',  label: '£ — GBP' },
    { value: '¥',  label: '¥ — JPY / CNY' },
    { value: 'kr', label: 'kr — SEK / NOK / DKK' },
    { value: 'Fr', label: 'Fr — CHF' },
]

const hoursPerDay   = computed(() => Math.round((parseFloat(hoursPerWeek.value) || 40) / 5))
const hoursPerMonth = computed(() => Math.round(((parseFloat(hoursPerWeek.value) || 40) * (parseFloat(weeksPerYear.value) || 52)) / 12))
const totalHoursYear = computed(() => (parseFloat(hoursPerWeek.value) || 40) * (parseFloat(weeksPerYear.value) || 52))

function fmt(n) {
    return n.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
}

function calculate() {
    const hrs  = parseFloat(hoursPerWeek.value) || 40
    const wks  = parseFloat(weeksPerYear.value) || 52
    const totalHrs = hrs * wks

    let annualSalary = 0

    if (mode.value === 'salary') {
        const amount = parseFloat(salaryAmount.value)
        if (!amount || amount <= 0) return
        const multipliers = { annual: 1, monthly: 12, biweekly: 26, weekly: wks, daily: wks * 5 }
        annualSalary = amount * (multipliers[period.value] ?? 1)
    } else {
        const rate = parseFloat(hourlyRate.value)
        if (!rate || rate <= 0) return
        annualSalary = rate * totalHrs
    }

    const hourly   = annualSalary / totalHrs
    const daily    = hourly * (hrs / 5)
    const weekly   = annualSalary / wks
    const biweekly = annualSalary / (wks / 2)
    const monthly  = annualSalary / 12

    outHourly.value   = fmt(hourly)
    outDaily.value    = fmt(daily)
    outWeekly.value   = fmt(weekly)
    outBiweekly.value = fmt(biweekly)
    outMonthly.value  = fmt(monthly)
    outAnnual.value   = fmt(annualSalary)

    calculated.value = true
}

function clear() {
    salaryAmount.value = hourlyRate.value = ''
    calculated.value = false
}

let mounted = false
onMounted(() => { mounted = true })
watch(mode, () => { if (mounted) clear() })
</script>

<style scoped>
.salary-table {
    margin-top: 16px;
    border: 3px solid #0a0a0a;
}

.salary-head {
    background: #0a0a0a;
    color: #f5e642;
    font-family: 'Space Mono', monospace;
    font-size: 10px;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.14em;
    padding: 10px 16px;
}

.salary-row {
    display: grid;
    grid-template-columns: 2fr 1fr 1.2fr;
    border-top: 1px solid rgba(10, 10, 10, 0.1);
    padding: 10px 16px;
    font-size: 13px;
    font-weight: 500;
    align-items: center;
}

.salary-row--header {
    font-family: 'Space Mono', monospace;
    font-size: 9px;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.1em;
    opacity: 0.4;
    background: rgba(10, 10, 10, 0.03);
}

.salary-row--highlight {
    background: rgba(245, 230, 66, 0.15);
}

.sal-period { font-weight: 600; }
.sal-hours  { opacity: 0.5; font-size: 12px; }
.sal-amount { font-weight: 700; font-variant-numeric: tabular-nums; }
.sal-sub    { font-weight: 400; opacity: 0.5; font-size: 11px; }
</style>
