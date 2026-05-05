<template>
    <div>
        <CalcInputStack>
            <CalcInputRow label="Debt Balance"        unit="$" v-model="balance"  placeholder="e.g. 8000"  type="number" />
            <CalcInputRow label="Interest Rate (APR)" unit="%" v-model="apr"      placeholder="e.g. 19.9"  type="number" />
            <CalcInputRow label="Monthly Payment"     unit="$" v-model="payment"  placeholder="e.g. 250"   type="number" />
            <CalcInputRow label="Extra Payment/Month" unit="$" v-model="extra"    placeholder="e.g. 100 (optional)" type="number" />
        </CalcInputStack>
        <CalcBtn :showClear="calculated" @click="calculate" @clear="clear">Calculate →</CalcBtn>
        <CalcOutput :show="calculated" title="Debt Payoff" color="#d4edda">
            <CalcOutputCell label="Time to Pay Off"       :value="timeStd" />
            <CalcOutputCell label="With Extra Payment"    :value="timeExtra" />
            <CalcOutputCell label="Total Interest Paid"   :value="interestStd" />
            <CalcOutputCell label="Interest Saved"        :value="interestSaved" />
        </CalcOutput>
    </div>
</template>

<script setup>
const balance  = ref('')
const apr      = ref('')
const payment  = ref('')
const extra    = ref('')
const calculated    = ref(false)
const timeStd       = ref('')
const timeExtra     = ref('')
const interestStd   = ref('')
const interestSaved = ref('')

function fmt(n) {
    return '$' + Math.round(n).toLocaleString('en-US')
}

function fmtMonths(m) {
    const y  = Math.floor(m / 12)
    const mo = m % 12
    if (y === 0) return `${mo} mo`
    if (mo === 0) return `${y} yr${y > 1 ? 's' : ''}`
    return `${y} yr${y > 1 ? 's' : ''} ${mo} mo`
}

function payoff(bal, annualRate, pmt) {
    const mr = annualRate / 100 / 12
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
    const bal = parseFloat(balance.value)
    const r   = parseFloat(apr.value)
    const pmt = parseFloat(payment.value)
    const ex  = parseFloat(extra.value) || 0

    if (!bal || bal <= 0 || !r || r <= 0 || !pmt || pmt <= 0) return

    const std = payoff(bal, r, pmt)
    if (!std) {
        timeStd.value       = 'Never — increase payment'
        timeExtra.value     = '—'
        interestStd.value   = '—'
        interestSaved.value = '—'
        calculated.value    = true
        return
    }

    timeStd.value     = fmtMonths(std.months)
    interestStd.value = fmt(std.interest)

    if (ex > 0) {
        const withEx = payoff(bal, r, pmt + ex)
        if (withEx) {
            timeExtra.value     = fmtMonths(withEx.months)
            interestSaved.value = fmt(std.interest - withEx.interest)
        } else {
            timeExtra.value     = '—'
            interestSaved.value = '—'
        }
    } else {
        timeExtra.value     = 'Add extra payment'
        interestSaved.value = '—'
    }

    calculated.value = true
}

function clear() {
    balance.value = apr.value = payment.value = extra.value = ''
    calculated.value = false
}
</script>
