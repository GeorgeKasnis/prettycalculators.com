<template>
    <div>
        <CalcInputStack>
            <CalcInputRow label="Starting Amount"      unit="$"   v-model="principal" placeholder="e.g. 5000"  type="number" />
            <CalcInputRow label="Annual Interest Rate" unit="%"   v-model="rate"      placeholder="e.g. 7"     type="number" />
            <CalcInputRow label="Time Period"          unit="yrs" v-model="years"     placeholder="e.g. 10"    type="number" />
            <CalcSelectRow label="Compounding Frequency" v-model="freq" :options="FREQ_OPTIONS" />
            <CalcInputRow label="Monthly Contribution" unit="$"  v-model="monthly"   placeholder="e.g. 200 (optional)" type="number" />
        </CalcInputStack>
        <CalcBtn :showClear="calculated" @click="calculate" @clear="clear">Calculate →</CalcBtn>
        <CalcOutput :show="calculated" title="Compound Growth" color="#d4edda">
            <CalcOutputCell label="Final Balance"       :value="finalBalance" />
            <CalcOutputCell label="Total Interest"      :value="totalInterest" />
            <CalcOutputCell label="Total Contributions" :value="totalContrib" />
            <CalcOutputCell label="Effective APY"       :value="apy" />
        </CalcOutput>
    </div>
</template>

<script setup>
const principal = ref('')
const rate      = ref('')
const years     = ref('')
const freq      = ref('12')
const monthly   = ref('')
const calculated  = ref(false)
const finalBalance  = ref('')
const totalInterest = ref('')
const totalContrib  = ref('')
const apy           = ref('')

const FREQ_OPTIONS = [
    { value: '365', label: 'Daily' },
    { value: '12',  label: 'Monthly' },
    { value: '4',   label: 'Quarterly' },
    { value: '1',   label: 'Annually' },
]

function fmt(n) {
    if (n >= 1_000_000) return '$' + (n / 1_000_000).toFixed(2) + 'M'
    return '$' + Math.round(n).toLocaleString('en-US')
}

function calculate() {
    const P   = parseFloat(principal.value)
    const r   = parseFloat(rate.value) / 100
    const t   = parseFloat(years.value)
    const PMT = parseFloat(monthly.value) || 0
    const n   = parseInt(freq.value)

    if (!P || P <= 0 || !r || r <= 0 || !t || t <= 0) return

    const monthlyRate = Math.pow(1 + r / n, n / 12) - 1
    const months = Math.round(t * 12)

    let balance = P
    for (let i = 0; i < months; i++) {
        balance = balance * (1 + monthlyRate) + PMT
    }

    const contributed = P + PMT * months
    const interest    = balance - contributed
    const effectiveAPY = (Math.pow(1 + r / n, n) - 1) * 100

    finalBalance.value  = fmt(balance)
    totalInterest.value = fmt(interest)
    totalContrib.value  = fmt(contributed)
    apy.value           = effectiveAPY.toFixed(2) + '%'
    calculated.value    = true
}

function clear() {
    principal.value = rate.value = years.value = monthly.value = ''
    freq.value = '12'
    calculated.value = false
}
</script>
