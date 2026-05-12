<template>
    <div>
        <CalcInputStack>
            <CalcInputRow label="Card Balance"         unit="$" v-model="balance"  placeholder="e.g. 5000"   type="number" />
            <CalcInputRow label="Interest Rate (APR)"  unit="%" v-model="apr"      placeholder="e.g. 22.99"  type="number" />
            <CalcInputRow label="Monthly Payment"      unit="$" v-model="payment"  placeholder="e.g. 200"    type="number" />
        </CalcInputStack>
        <CalcBtn :showClear="calculated" @click="calculate" @clear="clear">Calculate →</CalcBtn>
        <CalcOutput :show="calculated" title="Payoff Plan" color="#d4edda">
            <CalcOutputCell label="Time to Pay Off"       :value="timeUser" />
            <CalcOutputCell label="Total Interest"        :value="interestUser" />
            <CalcOutputCell label="Estimated Min Payment" :value="minPmt" />
            <CalcOutputCell label="Time (Min Only)"       :value="timeMin" />
            <CalcOutputCell label="Interest Saved"        :value="interestSaved" />
        </CalcOutput>
    </div>
</template>

<script setup>
const balance    = ref('')
const apr        = ref('')
const payment    = ref('')
const calculated = ref(false)
const timeUser      = ref('')
const interestUser  = ref('')
const minPmt        = ref('')
const timeMin       = ref('')
const interestSaved = ref('')

function fmt(n) {
    return '$' + Math.round(n).toLocaleString('en-US')
}

function fmtMonths(m) {
    if (!isFinite(m) || m > 1200) return 'Never — increase payment'
    const y  = Math.floor(m / 12)
    const mo = m % 12
    if (y === 0) return `${mo} mo`
    if (mo === 0) return `${y} yr${y > 1 ? 's' : ''}`
    return `${y} yr${y > 1 ? 's' : ''} ${mo} mo`
}

function payoff(bal, annualApr, pmt) {
    const mr = annualApr / 100 / 12
    if (pmt <= bal * mr) return null
    let b = bal, months = 0, interest = 0
    while (b > 0.005 && months < 1200) {
        const i = b * mr
        interest += i
        b = b + i - pmt
        if (b < 0) b = 0
        months++
    }
    return { months, interest }
}

function calculate() {
    const bal  = parseFloat(balance.value)
    const rate = parseFloat(apr.value)
    const pmt  = parseFloat(payment.value)

    if (!bal || bal <= 0 || !rate || rate <= 0 || !pmt || pmt <= 0) return

    const mr = rate / 100 / 12
    // Minimum payment: 1% of balance + interest, min $25
    const estimatedMin = Math.max(25, Math.round(bal * (0.01 + mr)))
    minPmt.value = fmt(estimatedMin)

    const userResult = payoff(bal, rate, pmt)
    if (!userResult) {
        timeUser.value      = 'Never — increase payment'
        interestUser.value  = '—'
        timeMin.value       = '—'
        interestSaved.value = '—'
        calculated.value    = true
        return
    }

    timeUser.value     = fmtMonths(userResult.months)
    interestUser.value = fmt(userResult.interest)

    const minResult = payoff(bal, rate, estimatedMin)
    if (minResult) {
        timeMin.value       = fmtMonths(minResult.months)
        interestSaved.value = fmt(minResult.interest - userResult.interest)
    } else {
        timeMin.value       = 'Never'
        interestSaved.value = '—'
    }

    calculated.value = true
}

function clear() {
    balance.value = apr.value = payment.value = ''
    calculated.value = false
}
</script>
