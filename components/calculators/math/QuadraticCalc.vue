<template>
    <!-- Equation preview -->
    <div class="quad-equation">
        <span class="quad-eq-coef" :class="{ dim: !a }">{{ aLabel }}</span>x²
        <span class="quad-eq-coef" :class="{ dim: !b }"> {{ bLabel }}</span>x
        <span class="quad-eq-coef" :class="{ dim: !c }"> {{ cLabel }}</span>
        <span class="quad-eq-equals"> = 0</span>
    </div>

    <CalcInputStack>
        <CalcInputRow label="a  (coefficient of x²)" unit="" v-model="a" placeholder="e.g. 1" type="number" />
        <CalcInputRow label="b  (coefficient of x)"  unit="" v-model="b" placeholder="e.g. -5" type="number" />
        <CalcInputRow label="c  (constant)"           unit="" v-model="c" placeholder="e.g. 6" type="number" />
    </CalcInputStack>
    <CalcBtn :showClear="calculated" @click="calculate" @clear="clear">Solve →</CalcBtn>

    <CalcOutput :show="calculated" :title="solutionType" :meta="discriminantMeta">
        <CalcOutputCell label="x₁" :value="x1" />
        <CalcOutputCell label="x₂" :value="x2" />
    </CalcOutput>

    <!-- Steps -->
    <div v-if="calculated" class="quad-steps">
        <div class="quad-steps-head">Quadratic Formula</div>
        <div class="quad-steps-body">
            <p v-for="(step, i) in steps" :key="i">{{ step }}</p>
        </div>
    </div>
</template>

<script setup>
const a = ref('')
const b = ref('')
const c = ref('')
const calculated      = ref(false)
const x1              = ref('')
const x2              = ref('')
const solutionType    = ref('Solution')
const discriminantMeta = ref('')
const steps           = ref([])

const aLabel = computed(() => {
    const v = parseFloat(a.value)
    if (isNaN(v) || v === 0) return '?'
    return v === 1 ? '' : v === -1 ? '−' : String(v)
})
const bLabel = computed(() => {
    const v = parseFloat(b.value)
    if (isNaN(v) || v === 0) return '+ ?'
    if (v > 0) return v === 1 ? '+' : `+ ${v}`
    return v === -1 ? '−' : `− ${Math.abs(v)}`
})
const cLabel = computed(() => {
    const v = parseFloat(c.value)
    if (isNaN(v) || v === 0) return '+ ?'
    if (v > 0) return `+ ${v}`
    return `− ${Math.abs(v)}`
})

function fmt(n) {
    return parseFloat(n.toFixed(8)).toString()
}

function calculate() {
    const av = parseFloat(a.value)
    const bv = parseFloat(b.value)
    const cv = parseFloat(c.value)
    if (isNaN(av) || isNaN(bv) || isNaN(cv) || av === 0) return

    const D = bv * bv - 4 * av * cv
    const newSteps = [
        `x = (−b ± √(b² − 4ac)) / 2a`,
        `x = (−(${bv}) ± √((${bv})² − 4×${av}×${cv})) / (2×${av})`,
        `Discriminant D = ${bv}² − 4×${av}×${cv} = ${fmt(D)}`,
    ]
    discriminantMeta.value = `D = ${fmt(D)}`

    if (D > 0) {
        const sqrtD = Math.sqrt(D)
        const r1 = (-bv + sqrtD) / (2 * av)
        const r2 = (-bv - sqrtD) / (2 * av)
        x1.value = fmt(r1)
        x2.value = fmt(r2)
        solutionType.value = 'Two Real Roots'
        newSteps.push(`x₁ = (${fmt(-bv)} + ${fmt(sqrtD)}) / ${fmt(2 * av)} = ${fmt(r1)}`)
        newSteps.push(`x₂ = (${fmt(-bv)} − ${fmt(sqrtD)}) / ${fmt(2 * av)} = ${fmt(r2)}`)
    } else if (D === 0) {
        const r = -bv / (2 * av)
        x1.value = x2.value = fmt(r)
        solutionType.value = 'One Repeated Root'
        newSteps.push(`x = ${fmt(-bv)} / ${fmt(2 * av)} = ${fmt(r)}`)
    } else {
        const realPart = -bv / (2 * av)
        const imagPart = Math.sqrt(-D) / (2 * av)
        x1.value = `${fmt(realPart)} + ${fmt(imagPart)}i`
        x2.value = `${fmt(realPart)} − ${fmt(imagPart)}i`
        solutionType.value = 'Complex Roots'
        newSteps.push(`D < 0 → no real solutions`)
        newSteps.push(`x = ${fmt(realPart)} ± ${fmt(imagPart)}i`)
    }

    steps.value = newSteps
    calculated.value = true
}

function clear() {
    a.value = b.value = c.value = ''
    x1.value = x2.value = ''
    solutionType.value = 'Solution'
    discriminantMeta.value = ''
    steps.value = []
    calculated.value = false
}
</script>

<style scoped>
.quad-equation {
    border: 3px solid #0a0a0a;
    background: #0a0a0a;
    padding: 16px 24px;
    margin-bottom: 18px;
    font-family: 'Space Grotesk', sans-serif;
    font-size: 22px;
    font-weight: 700;
    letter-spacing: -0.03em;
    color: #f5e642;
    display: flex;
    align-items: baseline;
    flex-wrap: wrap;
    gap: 2px;
}

.quad-eq-coef { color: #fff; }
.quad-eq-coef.dim { color: rgba(255,255,255,0.25); }
.quad-eq-equals { color: rgba(245,230,66,0.7); }

.quad-steps {
    margin-top: 16px;
    border: 3px solid #0a0a0a;
}

.quad-steps-head {
    background: #0a0a0a;
    color: #f5e642;
    font-family: 'Space Mono', monospace;
    font-size: 10px;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.14em;
    padding: 10px 16px;
}

.quad-steps-body {
    padding: 14px 16px;
    display: flex;
    flex-direction: column;
    gap: 6px;
}

.quad-steps-body p {
    font-family: 'Space Mono', monospace;
    font-size: 12px;
    color: #0a0a0a;
    opacity: 0.7;
    margin: 0;
    word-break: break-all;
}

@media (max-width: 767px) {
    .quad-equation { font-size: 17px; padding: 12px 14px; }
}
</style>
