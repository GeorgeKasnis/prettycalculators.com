<template>
    <div>
        <CalcInputStack>
            <CalcInputRow label="Initial Investment" unit="$" v-model="initial" placeholder="10000" type="number" />
            <CalcInputRow label="Final Value"        unit="$" v-model="final"   placeholder="15000" type="number" />
            <CalcInputRow label="Time Period (optional)" unit="yrs" v-model="years" placeholder="e.g. 5" type="number" />
        </CalcInputStack>

        <CalcBtn :showClear="calculated" @click="calculate" @clear="clear">Calculate ROI →</CalcBtn>

        <CalcOutput :show="calculated" title="Return on Investment">
            <CalcOutputCell label="ROI"           :value="result.roi" />
            <CalcOutputCell label="Net Profit"    :value="result.net" />
            <CalcOutputCell label="Total Return"  :value="result.final" />
            <CalcOutputCell v-if="result.annualROI" label="Annualised ROI" :value="result.annualROI" />
            <CalcOutputCell v-if="result.annualROI" label="CAGR"           :value="result.cagr" />
        </CalcOutput>
    </div>
</template>

<script setup>
const initial    = ref('')
const final      = ref('')
const years      = ref('')
const calculated = ref(false)
const result     = ref({})

function fmt(n, decimals = 2) {
    return parseFloat(n.toFixed(decimals)).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
}

function fmtPct(n) {
    return parseFloat(n.toFixed(2)).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) + '%'
}

function calculate() {
    const inv = parseFloat(initial.value)
    const fin = parseFloat(final.value)
    if (isNaN(inv) || isNaN(fin) || inv <= 0) return

    const net = fin - inv
    const roi = (net / inv) * 100
    const yr  = parseFloat(years.value)

    result.value = {
        roi:   fmtPct(roi),
        net:   (net >= 0 ? '+$' : '-$') + fmt(Math.abs(net)),
        final: '$' + fmt(fin),
    }

    if (!isNaN(yr) && yr > 0) {
        const annualSimple = roi / yr
        const cagr = (Math.pow(fin / inv, 1 / yr) - 1) * 100
        result.value.annualROI = fmtPct(annualSimple) + ' /yr'
        result.value.cagr      = fmtPct(cagr) + ' /yr'
    }

    calculated.value = true
}

function clear() {
    initial.value = ''; final.value = ''; years.value = ''
    result.value = {}; calculated.value = false
}
</script>
