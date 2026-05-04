<template>
    <CalcTabs v-model="mode" :tabs="TABS" />

    <!-- Simplify mode -->
    <template v-if="mode === 'simplify'">
        <div class="ratio-row">
            <CalcInputStack>
                <CalcInputRow label="A" unit="" v-model="sA" placeholder="e.g. 6" type="number" />
            </CalcInputStack>
            <div class="ratio-colon">:</div>
            <CalcInputStack>
                <CalcInputRow label="B" unit="" v-model="sB" placeholder="e.g. 9" type="number" />
            </CalcInputStack>
        </div>
        <CalcBtn :showClear="simplifyCalc" @click="doSimplify" @clear="clearSimplify">Simplify →</CalcBtn>
        <CalcOutput :show="simplifyCalc" title="Simplified Ratio">
            <CalcOutputCell label="Simplified"  :value="simpResult" />
            <CalcOutputCell label="Decimal A/B" :value="simpDecimal" />
            <CalcOutputCell label="A as % of total" :value="simpPctA" unit="%" />
            <CalcOutputCell label="B as % of total" :value="simpPctB" unit="%" />
        </CalcOutput>
    </template>

    <!-- Proportion mode -->
    <template v-else>
        <div class="ratio-eq-label">Find the missing value  <span class="ratio-eq-note">A : B = C : ?</span></div>
        <div class="ratio-row">
            <CalcInputStack>
                <CalcInputRow label="A" unit="" v-model="pA" placeholder="e.g. 2" type="number" />
            </CalcInputStack>
            <div class="ratio-colon">:</div>
            <CalcInputStack>
                <CalcInputRow label="B" unit="" v-model="pB" placeholder="e.g. 3" type="number" />
            </CalcInputStack>
            <div class="ratio-colon ratio-colon--eq">=</div>
            <CalcInputStack>
                <CalcInputRow label="C" unit="" v-model="pC" placeholder="e.g. 8" type="number" />
            </CalcInputStack>
            <div class="ratio-colon">:</div>
            <div class="ratio-unknown">?</div>
        </div>
        <CalcBtn :showClear="propCalc" @click="doProportion" @clear="clearProp">Solve →</CalcBtn>
        <CalcOutput :show="propCalc" title="Proportion Result" single>
            <CalcOutputCell label="Missing value (D)" :value="propResult" />
        </CalcOutput>
    </template>
</template>

<script setup>
const mode = ref('simplify')

const TABS = [
    { value: 'simplify',   label: 'Simplify' },
    { value: 'proportion', label: 'Proportion' },
]

// Simplify state
const sA = ref('')
const sB = ref('')
const simplifyCalc = ref(false)
const simpResult  = ref('')
const simpDecimal = ref('')
const simpPctA    = ref('')
const simpPctB    = ref('')

// Proportion state
const pA = ref('')
const pB = ref('')
const pC = ref('')
const propCalc   = ref(false)
const propResult = ref('')

function gcd(a, b) {
    a = Math.abs(a); b = Math.abs(b)
    while (b) { [a, b] = [b, a % b] }
    return a || 1
}

function fmt(n, dp = 4) {
    return parseFloat(n.toFixed(dp)).toString()
}

function doSimplify() {
    const a = parseFloat(sA.value)
    const b = parseFloat(sB.value)
    if (isNaN(a) || isNaN(b) || b === 0 || a === 0) return
    // Only simplify integers
    const ai = Math.round(a), bi = Math.round(b)
    const g  = gcd(ai, bi)
    simpResult.value  = `${ai / g} : ${bi / g}`
    simpDecimal.value = fmt(a / b)
    const total = a + b
    simpPctA.value = fmt((a / total) * 100, 2)
    simpPctB.value = fmt((b / total) * 100, 2)
    simplifyCalc.value = true
}

function clearSimplify() {
    sA.value = sB.value = ''
    simpResult.value = simpDecimal.value = simpPctA.value = simpPctB.value = ''
    simplifyCalc.value = false
}

function doProportion() {
    const a = parseFloat(pA.value)
    const b = parseFloat(pB.value)
    const c = parseFloat(pC.value)
    if (isNaN(a) || isNaN(b) || isNaN(c) || a === 0) return
    // A:B = C:D  →  D = B*C/A
    propResult.value = fmt(b * c / a)
    propCalc.value = true
}

function clearProp() {
    pA.value = pB.value = pC.value = ''
    propResult.value = ''
    propCalc.value = false
}
</script>

<style scoped>
.ratio-row {
    display: flex;
    align-items: center;
    gap: 0;
    margin-bottom: 18px;
}

.ratio-row > * { flex: 1; }

.ratio-colon {
    flex: 0 0 auto !important;
    font-family: 'Space Grotesk', sans-serif;
    font-size: 28px;
    font-weight: 700;
    padding: 0 10px;
    color: rgba(10,10,10,0.5);
    line-height: 1;
    align-self: center;
    margin-bottom: 18px;
}

.ratio-colon--eq {
    font-size: 24px;
}

.ratio-unknown {
    flex: 0 0 48px !important;
    font-family: 'Space Mono', monospace;
    font-size: 32px;
    font-weight: 700;
    color: #5c3bef;
    text-align: center;
    align-self: center;
    margin-bottom: 18px;
}

.ratio-eq-label {
    font-family: 'Space Mono', monospace;
    font-size: 10px;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.12em;
    opacity: 0.45;
    margin-bottom: 12px;
    display: flex;
    align-items: center;
    gap: 10px;
}

.ratio-eq-note {
    font-size: 14px;
    letter-spacing: -0.02em;
    color: #5c3bef;
    opacity: 1;
    font-family: 'Space Grotesk', sans-serif;
    font-weight: 700;
}
</style>
