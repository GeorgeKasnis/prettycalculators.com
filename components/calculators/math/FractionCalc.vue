<template>
    <!-- Fraction inputs -->
    <div class="frac-layout">
        <div class="frac-item">
            <input v-model="num1" class="frac-input" inputmode="numeric" placeholder="3" aria-label="Numerator 1" />
            <div class="frac-bar" />
            <input v-model="den1" class="frac-input" inputmode="numeric" placeholder="4" aria-label="Denominator 1" />
        </div>

        <div class="frac-ops">
            <button
                v-for="op in OPS"
                :key="op.value"
                class="frac-op-btn"
                :class="{ 'frac-op-active': operation === op.value }"
                @click="operation = op.value"
            >{{ op.label }}</button>
        </div>

        <div class="frac-item">
            <input v-model="num2" class="frac-input" inputmode="numeric" placeholder="1" aria-label="Numerator 2" />
            <div class="frac-bar" />
            <input v-model="den2" class="frac-input" inputmode="numeric" placeholder="2" aria-label="Denominator 2" />
        </div>
    </div>

    <CalcBtn :showClear="calculated" @click="calculate" @clear="clear">Calculate →</CalcBtn>

    <CalcOutput :show="calculated" title="Result">
        <CalcOutputCell label="Fraction" :value="resultFraction" />
        <CalcOutputCell label="Decimal" :value="resultDecimal" />
    </CalcOutput>

    <!-- Steps -->
    <div v-if="calculated" class="frac-steps">
        <div class="frac-steps-head">Step-by-step</div>
        <div class="frac-steps-body">
            <p v-for="(step, i) in steps" :key="i">{{ step }}</p>
        </div>
    </div>
</template>

<script setup>
const num1      = ref('')
const den1      = ref('')
const num2      = ref('')
const den2      = ref('')
const operation = ref('+')
const calculated     = ref(false)
const resultFraction = ref('')
const resultDecimal  = ref('')
const steps = ref([])

const OPS = [
    { value: '+', label: '+' },
    { value: '-', label: '−' },
    { value: '*', label: '×' },
    { value: '/', label: '÷' },
]

function gcd(a, b) {
    a = Math.abs(a); b = Math.abs(b)
    while (b) { [a, b] = [b, a % b] }
    return a || 1
}

function simplify(n, d) {
    if (d === 0) return { n: 0, d: 0 }
    const sign = (n < 0) !== (d < 0) ? -1 : 1
    n = Math.abs(n); d = Math.abs(d)
    const g = gcd(n, d)
    return { n: sign * (n / g), d: d / g }
}

function fracStr(n, d) {
    if (d === 1) return String(n)
    return `${n}/${d}`
}

function calculate() {
    const n1 = parseInt(num1.value)
    const d1 = parseInt(den1.value)
    const n2 = parseInt(num2.value)
    const d2 = parseInt(den2.value)
    if (isNaN(n1) || isNaN(d1) || isNaN(n2) || isNaN(d2) || d1 === 0 || d2 === 0) return

    const opLabel = OPS.find(o => o.value === operation.value)?.label ?? operation.value
    let rn, rd, newSteps = []
    newSteps.push(`${n1}/${d1} ${opLabel} ${n2}/${d2}`)

    if (operation.value === '+') {
        rn = n1 * d2 + n2 * d1
        rd = d1 * d2
        newSteps.push(`= (${n1}×${d2} + ${n2}×${d1}) / (${d1}×${d2}) = ${rn}/${rd}`)
    } else if (operation.value === '-') {
        rn = n1 * d2 - n2 * d1
        rd = d1 * d2
        newSteps.push(`= (${n1}×${d2} − ${n2}×${d1}) / (${d1}×${d2}) = ${rn}/${rd}`)
    } else if (operation.value === '*') {
        rn = n1 * n2
        rd = d1 * d2
        newSteps.push(`= (${n1}×${n2}) / (${d1}×${d2}) = ${rn}/${rd}`)
    } else {
        if (n2 === 0) return
        rn = n1 * d2
        rd = d1 * n2
        newSteps.push(`= (${n1}×${d2}) / (${d1}×${n2}) = ${rn}/${rd}`)
    }

    const s = simplify(rn, rd)
    if (s.d === 0) return

    if (rn !== s.n * (rd / s.d) || rd !== s.d * (rn / s.n)) {
        const g = gcd(Math.abs(rn), Math.abs(rd))
        if (g > 1) newSteps.push(`Simplify by dividing by ${g} → ${fracStr(s.n, s.d)}`)
    }

    resultFraction.value = fracStr(s.n, s.d)
    resultDecimal.value  = (s.n / s.d).toFixed(6).replace(/\.?0+$/, '')
    steps.value = newSteps
    calculated.value = true
}

function clear() {
    num1.value = den1.value = num2.value = den2.value = ''
    operation.value = '+'
    resultFraction.value = resultDecimal.value = ''
    steps.value = []
    calculated.value = false
}
</script>

<style scoped>
.frac-layout {
    display: flex;
    align-items: center;
    gap: 0;
    border: 3px solid #0a0a0a;
    margin-bottom: 18px;
    background: #fff;
    overflow-x: auto;
}

.frac-item {
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 20px 24px;
    gap: 2px;
    min-width: 100px;
}

.frac-input {
    font-family: 'Space Grotesk', sans-serif;
    font-size: 32px;
    font-weight: 700;
    letter-spacing: -0.04em;
    color: #0a0a0a;
    background: transparent;
    border: none;
    outline: none;
    width: 100%;
    text-align: center;
    -moz-appearance: textfield;
    padding: 0;
    line-height: 1.1;
}
.frac-input::-webkit-outer-spin-button,
.frac-input::-webkit-inner-spin-button { -webkit-appearance: none; }
.frac-input::placeholder { color: rgba(10,10,10,0.15); }
.frac-input:focus { color: #5c3bef; }

.frac-bar {
    width: 100%;
    height: 3px;
    background: #0a0a0a;
    margin: 6px 0;
    flex-shrink: 0;
}

.frac-ops {
    display: flex;
    flex-direction: column;
    border-left: 3px solid #0a0a0a;
    border-right: 3px solid #0a0a0a;
    flex-shrink: 0;
}

.frac-op-btn {
    flex: 1;
    padding: 10px 18px;
    background: #fff;
    border: none;
    border-bottom: 1.5px solid rgba(10,10,10,0.12);
    cursor: pointer;
    font-family: 'Space Grotesk', sans-serif;
    font-size: 18px;
    font-weight: 700;
    color: rgba(10,10,10,0.35);
    transition: background 0.08s, color 0.08s;
    line-height: 1;
}
.frac-op-btn:last-child { border-bottom: none; }
.frac-op-btn:hover:not(.frac-op-active) { background: rgba(10,10,10,0.04); color: #0a0a0a; }
.frac-op-active { background: #0a0a0a; color: #f5e642; }

/* Steps */
.frac-steps {
    margin-top: 16px;
    border: 3px solid #0a0a0a;
}

.frac-steps-head {
    background: #0a0a0a;
    color: #f5e642;
    font-family: 'Space Mono', monospace;
    font-size: 10px;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.14em;
    padding: 10px 16px;
}

.frac-steps-body {
    padding: 14px 16px;
    display: flex;
    flex-direction: column;
    gap: 6px;
}

.frac-steps-body p {
    font-family: 'Space Mono', monospace;
    font-size: 13px;
    color: #0a0a0a;
    opacity: 0.75;
    margin: 0;
}

@media (max-width: 767px) {
    .frac-input { font-size: 24px; }
    .frac-item  { padding: 14px 12px; }
    .frac-op-btn { padding: 8px 12px; font-size: 16px; }
}
</style>
