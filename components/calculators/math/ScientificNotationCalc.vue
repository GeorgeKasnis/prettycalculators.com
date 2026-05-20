<template>
    <div>
        <div class="mode-wrap">
            <div class="mode-label">Convert</div>
            <div class="mode-btns">
                <button class="mode-btn" :class="{ 'mode-active': mode === 'toSci' }" @click="switchMode('toSci')">Number → Scientific</button>
                <button class="mode-btn" :class="{ 'mode-active': mode === 'fromSci' }" @click="switchMode('fromSci')">Scientific → Number</button>
            </div>
        </div>

        <CalcInputStack v-if="mode === 'toSci'">
            <CalcInputRow label="Standard Number" unit="" v-model="standardInput" placeholder="e.g. 0.000045 or 3200000" type="text" />
        </CalcInputStack>

        <CalcInputStack v-else>
            <CalcInputRow label="Coefficient" unit="×10^" v-model="coeff" placeholder="e.g. 4.5" type="number" />
            <CalcInputRow label="Exponent" unit="n" v-model="exponent" placeholder="e.g. -5" type="number" />
        </CalcInputStack>

        <CalcBtn :showClear="calculated" @click="calculate" @clear="clear">Convert →</CalcBtn>

        <CalcOutput :show="calculated" title="Result">
            <CalcOutputCell label="Scientific Notation" :value="sciResult" />
            <CalcOutputCell label="Standard Form" :value="stdResult" />
            <CalcOutputCell label="Exponent (power of 10)" :value="expResult" />
        </CalcOutput>
    </div>
</template>

<script setup>
const mode          = ref('toSci')
const standardInput = ref('')
const coeff         = ref('')
const exponent      = ref('')
const calculated    = ref(false)
const sciResult     = ref('')
const stdResult     = ref('')
const expResult     = ref('')

function switchMode(m) {
    mode.value = m
    clear()
}

function calculate() {
    if (mode.value === 'toSci') {
        const n = parseFloat(standardInput.value)
        if (isNaN(n)) return
        const exp = Math.floor(Math.log10(Math.abs(n)))
        const c   = n / Math.pow(10, exp)
        sciResult.value = `${+c.toFixed(6)} × 10^${exp}`
        stdResult.value = n.toLocaleString('en-US', { maximumSignificantDigits: 10 })
        expResult.value = String(exp)
    } else {
        const c = parseFloat(coeff.value)
        const e = parseInt(exponent.value)
        if (isNaN(c) || isNaN(e)) return
        const n = c * Math.pow(10, e)
        sciResult.value = `${+c.toFixed(6)} × 10^${e}`
        stdResult.value = n.toLocaleString('en-US', { maximumSignificantDigits: 15 })
        expResult.value = String(e)
    }
    calculated.value = true
}

function clear() {
    standardInput.value = coeff.value = exponent.value = ''
    sciResult.value = stdResult.value = expResult.value = ''
    calculated.value = false
}
</script>

<style scoped>
.mode-wrap {
    border: 3px solid #0a0a0a;
    background: #fff;
    margin-bottom: 18px;
}
.mode-label {
    font-family: 'Space Mono', monospace;
    font-size: 10px;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.14em;
    opacity: 0.4;
    padding: 12px 16px 8px;
}
.mode-btns {
    display: flex;
    border-top: 1px solid rgba(10,10,10,0.1);
}
.mode-btn {
    flex: 1;
    padding: 13px 8px;
    background: #fff;
    border: none;
    border-right: 1.5px solid rgba(10,10,10,0.12);
    cursor: pointer;
    font-family: 'Space Grotesk', sans-serif;
    font-size: 14px;
    font-weight: 700;
    color: rgba(10,10,10,0.45);
    transition: background 0.08s, color 0.08s;
}
.mode-btn:last-child { border-right: none; }
.mode-btn:hover:not(.mode-active) { background: rgba(10,10,10,0.04); color: #0a0a0a; }
.mode-active { background: #0a0a0a !important; color: #f5e642 !important; }
</style>
