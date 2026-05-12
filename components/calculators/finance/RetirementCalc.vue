<template>
    <div>
        <CalcInputStack>
            <CalcInputRow label="Current Age"           unit="yr" v-model="age"      placeholder="e.g. 30"    type="number" />
            <CalcInputRow label="Retirement Age"        unit="yr" v-model="retAge"   placeholder="e.g. 65"    type="number" />
            <CalcInputRow label="Current Savings"       unit="$"  v-model="savings"  placeholder="e.g. 20000" type="number" />
            <CalcInputRow label="Monthly Contribution"  unit="$"  v-model="monthly"  placeholder="e.g. 500"   type="number" />
            <CalcInputRow label="Expected Annual Return" unit="%" v-model="rate"     placeholder="e.g. 7"     type="number" />
        </CalcInputStack>
        <CalcBtn :showClear="calculated" @click="calculate" @clear="clear">Calculate →</CalcBtn>
        <CalcOutput :show="calculated" title="Retirement Projection" color="#d4edda">
            <CalcOutputCell label="Retirement Balance"   :value="balance" />
            <CalcOutputCell label="Total Contributed"    :value="contributed" />
            <CalcOutputCell label="Investment Growth"    :value="growth" />
            <CalcOutputCell label="Monthly Income (4%)"  :value="monthlyIncome" />
        </CalcOutput>
    </div>
</template>

<script setup>
const age      = ref('')
const retAge   = ref('')
const savings  = ref('')
const monthly  = ref('')
const rate     = ref('')
const calculated    = ref(false)
const balance       = ref('')
const contributed   = ref('')
const growth        = ref('')
const monthlyIncome = ref('')

function fmt(n) {
    if (n >= 1_000_000) return '$' + (n / 1_000_000).toFixed(2) + 'M'
    return '$' + Math.round(n).toLocaleString('en-US')
}

function calculate() {
    const currentAge    = parseFloat(age.value)
    const retirementAge = parseFloat(retAge.value)
    const startSavings  = parseFloat(savings.value) || 0
    const pmt           = parseFloat(monthly.value) || 0
    const annualRate    = parseFloat(rate.value)

    if (!currentAge || !retirementAge || retirementAge <= currentAge || !annualRate || annualRate < 0) return
    if (startSavings <= 0 && pmt <= 0) return

    const years = retirementAge - currentAge
    const n     = years * 12
    const r     = annualRate / 100 / 12

    let bal = startSavings
    for (let i = 0; i < n; i++) {
        bal = bal * (1 + r) + pmt
    }

    const totalContributed = startSavings + pmt * n
    const totalGrowth      = bal - totalContributed
    const income           = (bal * 0.04) / 12

    balance.value       = fmt(bal)
    contributed.value   = fmt(totalContributed)
    growth.value        = fmt(totalGrowth)
    monthlyIncome.value = fmt(income)
    calculated.value    = true
}

function clear() {
    age.value = retAge.value = savings.value = monthly.value = rate.value = ''
    calculated.value = false
}
</script>
