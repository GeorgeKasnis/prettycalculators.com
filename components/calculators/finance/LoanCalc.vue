<template>
    <div>
        <CalcInputStack>
            <CalcInputRow label="Loan Amount"          unit="$"  v-model="amount"   placeholder="e.g. 15000"  type="number" />
            <CalcInputRow label="Annual Interest Rate"  unit="%"  v-model="rate"     placeholder="e.g. 7.5"    type="number" />
            <CalcInputRow label="Loan Term"             unit="yr" v-model="years"    placeholder="e.g. 5"      type="number" />
        </CalcInputStack>
        <CalcBtn :showClear="calculated" @click="calculate" @clear="clear">Calculate →</CalcBtn>
        <CalcOutput :show="calculated" title="Loan Summary" color="#d4edda">
            <CalcOutputCell label="Monthly Payment"   :value="monthly" />
            <CalcOutputCell label="Total Interest"    :value="totalInterest" />
            <CalcOutputCell label="Total Cost"        :value="totalCost" />
            <CalcOutputCell label="Payoff Date"       :value="payoffDate" />
        </CalcOutput>
    </div>
</template>

<script setup>
const amount     = ref('')
const rate       = ref('')
const years      = ref('')
const calculated = ref(false)
const monthly      = ref('')
const totalInterest = ref('')
const totalCost    = ref('')
const payoffDate   = ref('')

function fmt(n) {
    if (n >= 1_000_000) return '$' + (n / 1_000_000).toFixed(2) + 'M'
    return '$' + Math.round(n).toLocaleString('en-US')
}

function calculate() {
    const P = parseFloat(amount.value)
    const r = parseFloat(rate.value) / 100 / 12
    const n = parseFloat(years.value) * 12

    if (!P || P <= 0 || !parseFloat(rate.value) || parseFloat(rate.value) < 0 || !n || n <= 0) return

    const M = r === 0
        ? P / n
        : P * (r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1)

    const total    = M * n
    const interest = total - P

    const d = new Date()
    d.setMonth(d.getMonth() + n)

    monthly.value       = fmt(M)
    totalInterest.value = fmt(interest)
    totalCost.value     = fmt(total)
    payoffDate.value    = d.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })
    calculated.value    = true
}

function clear() {
    amount.value = rate.value = years.value = ''
    calculated.value = false
}
</script>
