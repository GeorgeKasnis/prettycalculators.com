<template>
    <div>
        <CalcInputStack>
            <CalcInputRow   label="Annual Income"  unit="$" v-model="income" placeholder="e.g. 75000" type="number" />
            <CalcSelectRow  label="Filing Status"  v-model="status" :options="STATUS_OPTIONS" />
        </CalcInputStack>
        <CalcBtn :showClear="calculated" @click="calculate" @clear="clear">Calculate →</CalcBtn>
        <CalcOutput :show="calculated" title="2025 Federal Tax Estimate" color="#d4edda">
            <CalcOutputCell label="Federal Tax"        :value="federalTax" />
            <CalcOutputCell label="Effective Rate"     :value="effectiveRate" />
            <CalcOutputCell label="Marginal Rate"      :value="marginalRate" />
            <CalcOutputCell label="After-Tax Income"   :value="afterTax" />
            <CalcOutputCell label="Monthly Take-Home"  :value="monthly" />
        </CalcOutput>
    </div>
</template>

<script setup>
const income     = ref('')
const status     = ref('single')
const calculated = ref(false)
const federalTax   = ref('')
const effectiveRate = ref('')
const marginalRate  = ref('')
const afterTax     = ref('')
const monthly      = ref('')

const STATUS_OPTIONS = [
    { value: 'single',  label: 'Single' },
    { value: 'married', label: 'Married Filing Jointly' },
    { value: 'hoh',     label: 'Head of Household' },
]

// 2025 US federal brackets (taxable income after standard deduction)
const BRACKETS = {
    single:  [
        [11925,   0.10],
        [48475,   0.12],
        [103350,  0.22],
        [197300,  0.24],
        [250525,  0.32],
        [626350,  0.35],
        [Infinity, 0.37],
    ],
    married: [
        [23850,   0.10],
        [96950,   0.12],
        [206700,  0.22],
        [394600,  0.24],
        [501050,  0.32],
        [751600,  0.35],
        [Infinity, 0.37],
    ],
    hoh: [
        [17000,   0.10],
        [64850,   0.12],
        [103350,  0.22],
        [197300,  0.24],
        [250500,  0.32],
        [626350,  0.35],
        [Infinity, 0.37],
    ],
}

const STANDARD_DEDUCTION = { single: 15000, married: 30000, hoh: 22500 }

function fmt(n) {
    if (n >= 1_000_000) return '$' + (n / 1_000_000).toFixed(2) + 'M'
    return '$' + Math.round(n).toLocaleString('en-US')
}

function calcTax(taxable, brackets) {
    let tax = 0
    let prev = 0
    let marginal = brackets[0][1]
    for (const [limit, rate] of brackets) {
        if (taxable <= prev) break
        const chunk = Math.min(taxable, limit) - prev
        tax += chunk * rate
        marginal = rate
        prev = limit
    }
    return { tax, marginal }
}

function calculate() {
    const gross = parseFloat(income.value)
    if (!gross || gross <= 0) return

    const deduction = STANDARD_DEDUCTION[status.value]
    const taxable   = Math.max(0, gross - deduction)
    const brackets  = BRACKETS[status.value]
    const { tax, marginal } = calcTax(taxable, brackets)

    federalTax.value    = fmt(tax)
    effectiveRate.value = ((tax / gross) * 100).toFixed(1) + '%'
    marginalRate.value  = (marginal * 100).toFixed(0) + '%'
    afterTax.value      = fmt(gross - tax)
    monthly.value       = fmt((gross - tax) / 12)
    calculated.value    = true
}

function clear() {
    income.value = ''
    status.value = 'single'
    calculated.value = false
}
</script>
