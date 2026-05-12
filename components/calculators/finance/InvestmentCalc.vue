<template>
    <div>
        <CalcInputStack>
            <CalcInputRow label="Initial Investment"    unit="$"  v-model="principal" placeholder="e.g. 10000" type="number" />
            <CalcInputRow label="Annual Return"         unit="%"  v-model="rate"      placeholder="e.g. 8"     type="number" />
            <CalcInputRow label="Time Period"           unit="yr" v-model="years"     placeholder="e.g. 10"    type="number" />
            <CalcInputRow label="Monthly Contribution"  unit="$"  v-model="monthly"   placeholder="e.g. 200 (optional)" type="number" />
        </CalcInputStack>
        <CalcBtn :showClear="calculated" @click="calculate" @clear="clear">Calculate →</CalcBtn>
        <CalcOutput :show="calculated" title="Investment Return" color="#d4edda">
            <CalcOutputCell label="Final Value"      :value="finalValue" />
            <CalcOutputCell label="Total Invested"   :value="totalInvested" />
            <CalcOutputCell label="Total Return"     :value="totalReturn" />
            <CalcOutputCell label="ROI"              :value="roi" />
        </CalcOutput>
    </div>
</template>

<script setup>
const principal  = ref('')
const rate       = ref('')
const years      = ref('')
const monthly    = ref('')
const calculated = ref(false)
const finalValue    = ref('')
const totalInvested = ref('')
const totalReturn   = ref('')
const roi           = ref('')

function fmt(n) {
    if (n >= 1_000_000) return '$' + (n / 1_000_000).toFixed(2) + 'M'
    return '$' + Math.round(n).toLocaleString('en-US')
}

function calculate() {
    const P = parseFloat(principal.value) || 0
    const r = parseFloat(rate.value) / 100 / 12
    const n = parseFloat(years.value) * 12
    const m = parseFloat(monthly.value) || 0

    if (!parseFloat(years.value) || parseFloat(years.value) <= 0 || !parseFloat(rate.value) || parseFloat(rate.value) < 0) return
    if (P <= 0 && m <= 0) return

    let balance = P
    for (let i = 0; i < n; i++) {
        balance = balance * (1 + r) + m
    }

    const invested = P + m * n
    const returns  = balance - invested

    finalValue.value    = fmt(balance)
    totalInvested.value = fmt(invested)
    totalReturn.value   = fmt(returns)
    roi.value           = (invested > 0 ? ((returns / invested) * 100).toFixed(1) : '0') + '%'
    calculated.value    = true
}

function clear() {
    principal.value = rate.value = years.value = monthly.value = ''
    calculated.value = false
}
</script>
