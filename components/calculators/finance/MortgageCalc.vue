<template>
    <div>
        <CalcInputStack>
            <CalcInputRow label="Home Price"          unit="$"   v-model="homePrice"   placeholder="e.g. 400000"  type="number" />
            <CalcInputRow label="Down Payment"        unit="$"   v-model="downPayment" placeholder="e.g. 80000"   type="number" />
            <CalcSelectRow label="Loan Term"          v-model="term"   :options="TERM_OPTIONS" />
            <CalcInputRow label="Annual Interest Rate" unit="%"  v-model="rate"        placeholder="e.g. 7.25"    type="number" />
            <CalcInputRow label="Annual Property Tax" unit="%"   v-model="taxRate"     placeholder="e.g. 1.2"     type="number" />
            <CalcInputRow label="Annual Home Insurance" unit="$" v-model="insurance"   placeholder="e.g. 1200 (optional)" type="number" />
        </CalcInputStack>
        <CalcBtn :showClear="calculated" @click="calculate" @clear="clear">Calculate →</CalcBtn>

        <CalcOutput :show="calculated" title="Monthly Payment" :meta="loanLabel" color="#d4edda">
            <CalcOutputCell label="Principal & Interest" :value="piPayment" />
            <CalcOutputCell label="Property Tax/mo"      :value="taxPayment" />
            <CalcOutputCell label="Home Insurance/mo"    :value="insurPayment" />
            <CalcOutputCell label="PMI/mo"               :value="pmiPayment" />
            <CalcOutputCell label="Total Monthly"        :value="totalPayment" />
            <CalcOutputCell label="Total Interest Paid"  :value="totalInterest" />
        </CalcOutput>

        <div v-if="calculated" class="amort-table">
            <div class="am-head">Balance Over Time</div>
            <div class="am-row am-row--header">
                <span>Year</span>
                <span>Balance Remaining</span>
                <span>Equity</span>
            </div>
            <div v-for="row in amortRows" :key="row.year" class="am-row">
                <span class="am-year">Year {{ row.year }}</span>
                <span class="am-bal">{{ row.balance }}</span>
                <span class="am-eq">{{ row.equity }}</span>
            </div>
        </div>
    </div>
</template>

<script setup>
const homePrice   = ref('')
const downPayment = ref('')
const term        = ref('30')
const rate        = ref('')
const taxRate     = ref('')
const insurance   = ref('')
const calculated   = ref(false)
const loanLabel    = ref('')
const piPayment    = ref('')
const taxPayment   = ref('')
const insurPayment = ref('')
const pmiPayment   = ref('')
const totalPayment = ref('')
const totalInterest = ref('')
const amortRows    = ref([])

const TERM_OPTIONS = [
    { value: '30', label: '30 years (fixed)' },
    { value: '20', label: '20 years (fixed)' },
    { value: '15', label: '15 years (fixed)' },
    { value: '10', label: '10 years (fixed)' },
]

function fmt(n) {
    if (n >= 1_000_000) return '$' + (n / 1_000_000).toFixed(2) + 'M'
    return '$' + Math.round(n).toLocaleString('en-US')
}

function calculate() {
    const price  = parseFloat(homePrice.value)
    const down   = parseFloat(downPayment.value) || 0
    const years  = parseInt(term.value)
    const annualRate = parseFloat(rate.value)
    const propTax    = parseFloat(taxRate.value) || 0
    const annualIns  = parseFloat(insurance.value) || 0

    if (!price || price <= 0 || !annualRate || annualRate <= 0) return

    const loan = price - down
    if (loan <= 0) return

    const r = annualRate / 100 / 12
    const n = years * 12

    // Monthly P&I (standard amortisation formula)
    const pi = r === 0
        ? loan / n
        : loan * (r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1)

    // Monthly escrow items
    const monthlyTax  = (price * propTax / 100) / 12
    const monthlyIns  = annualIns / 12

    // PMI: 1% annually if LTV > 80%
    const ltv = loan / price
    const monthlyPmi = ltv > 0.80 ? (loan * 0.01) / 12 : 0

    const total = pi + monthlyTax + monthlyIns + monthlyPmi
    const totalInt = (pi * n) - loan

    const downPct = Math.round((down / price) * 100)
    loanLabel.value    = `${downPct}% down · ${years}-yr`
    piPayment.value    = fmt(pi)
    taxPayment.value   = fmt(monthlyTax)
    insurPayment.value = annualIns > 0 ? fmt(monthlyIns) : 'Not entered'
    pmiPayment.value   = ltv > 0.80 ? fmt(monthlyPmi) : 'Not required'
    totalPayment.value = fmt(total)
    totalInterest.value = fmt(totalInt)

    // Amortisation snapshot rows
    const checkpoints = [1, 5, 10, 15, 20, 25, years].filter((y, i, a) => a.indexOf(y) === i && y <= years)
    amortRows.value = checkpoints.map(yr => {
        let bal = loan
        for (let m = 0; m < yr * 12; m++) {
            const interest = bal * r
            const principal = pi - interest
            bal = Math.max(0, bal - principal)
        }
        const equity = price - bal
        return { year: yr, balance: fmt(bal), equity: fmt(equity) }
    })

    calculated.value = true
}

function clear() {
    homePrice.value = downPayment.value = rate.value = taxRate.value = insurance.value = ''
    term.value = '30'
    calculated.value = false
}
</script>

<style scoped>
.amort-table {
    margin-top: 16px;
    border: 3px solid #0a0a0a;
}
.am-head {
    background: #0a0a0a;
    color: #d4edda;
    font-family: 'Space Mono', monospace;
    font-size: 10px;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.14em;
    padding: 10px 16px;
}
.am-row {
    display: grid;
    grid-template-columns: 1fr 1.5fr 1.5fr;
    border-top: 1px solid rgba(10,10,10,0.1);
    padding: 9px 16px;
    font-size: 13px;
}
.am-row--header {
    font-family: 'Space Mono', monospace;
    font-size: 9px;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.1em;
    opacity: 0.4;
    background: rgba(10,10,10,0.03);
}
.am-year { font-weight: 600; }
.am-bal  { font-variant-numeric: tabular-nums; }
.am-eq   { font-weight: 700; color: #1a7a3e; }
</style>
