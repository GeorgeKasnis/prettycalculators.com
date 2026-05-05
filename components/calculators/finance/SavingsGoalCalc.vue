<template>
    <div>
        <CalcInputStack>
            <CalcInputRow label="Savings Goal"         unit="$"   v-model="target"  placeholder="e.g. 20000" type="number" />
            <CalcInputRow label="Current Savings"      unit="$"   v-model="current" placeholder="e.g. 2000 (optional)"  type="number" />
            <CalcInputRow label="Monthly Contribution" unit="$"   v-model="monthly" placeholder="e.g. 400"   type="number" />
            <CalcInputRow label="Annual Interest Rate" unit="%"   v-model="rate"    placeholder="e.g. 4.5 (optional)"   type="number" />
        </CalcInputStack>
        <CalcBtn :showClear="calculated" @click="calculate" @clear="clear">Calculate →</CalcBtn>
        <CalcOutput :show="calculated" title="Savings Plan" color="#d4edda">
            <CalcOutputCell label="Time to Goal"        :value="timeToGoal" />
            <CalcOutputCell label="Goal Date"           :value="goalDate" />
            <CalcOutputCell label="Total You'll Save"   :value="totalContrib" />
            <CalcOutputCell label="Interest Earned"     :value="interestEarned" />
        </CalcOutput>
    </div>
</template>

<script setup>
const target  = ref('')
const current = ref('')
const monthly = ref('')
const rate    = ref('')
const calculated    = ref(false)
const timeToGoal    = ref('')
const goalDate      = ref('')
const totalContrib  = ref('')
const interestEarned = ref('')

function fmt(n) {
    if (n >= 1_000_000) return '$' + (n / 1_000_000).toFixed(2) + 'M'
    return '$' + Math.round(n).toLocaleString('en-US')
}

function fmtMonths(m) {
    const y  = Math.floor(m / 12)
    const mo = m % 12
    if (y === 0) return `${mo} mo`
    if (mo === 0) return `${y} yr${y > 1 ? 's' : ''}`
    return `${y} yr${y > 1 ? 's' : ''} ${mo} mo`
}

function calculate() {
    const goal = parseFloat(target.value)
    const cur  = parseFloat(current.value) || 0
    const pmt  = parseFloat(monthly.value)
    const r    = (parseFloat(rate.value) || 0) / 100 / 12

    if (!goal || goal <= 0 || !pmt || pmt <= 0) return

    if (cur >= goal) {
        timeToGoal.value     = 'Already reached!'
        goalDate.value       = 'Now'
        totalContrib.value   = fmt(cur)
        interestEarned.value = '$0'
        calculated.value     = true
        return
    }

    let balance = cur
    let months  = 0
    while (balance < goal && months < 1200) {
        balance = balance * (1 + r) + pmt
        months++
    }

    const contributed = cur + pmt * months
    const interest    = balance - contributed

    const d = new Date()
    d.setMonth(d.getMonth() + months)

    timeToGoal.value     = fmtMonths(months)
    goalDate.value       = d.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })
    totalContrib.value   = fmt(contributed)
    interestEarned.value = fmt(Math.max(0, interest))
    calculated.value     = true
}

function clear() {
    target.value = current.value = monthly.value = rate.value = ''
    calculated.value = false
}
</script>
