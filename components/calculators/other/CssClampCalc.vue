<template>
    <div>
        <CalcInputStack>
            <CalcInputRow label="Min font size"    unit="px" v-model="minSize" placeholder="e.g. 16" type="number" />
            <CalcInputRow label="Max font size"    unit="px" v-model="maxSize" placeholder="e.g. 32" type="number" />
            <CalcInputRow label="Min viewport"     unit="px" v-model="minVw"   placeholder="e.g. 360" type="number" />
            <CalcInputRow label="Max viewport"     unit="px" v-model="maxVw"   placeholder="e.g. 1200" type="number" />
        </CalcInputStack>

        <CalcBtn :showClear="calculated" @click="calculate" @clear="clear">Generate clamp() →</CalcBtn>

        <CalcOutput :show="calculated" title="Result">
            <CalcOutputCell label="Min" :value="result.minRem" unit="rem" />
            <CalcOutputCell label="Max" :value="result.maxRem" unit="rem" />
            <CalcOutputCell label="Slope" :value="result.slope" unit="vw" />
        </CalcOutput>

        <div v-if="calculated" class="code-band">
            <code>{{ result.css }}</code>
        </div>
        <button v-if="calculated" class="copy-btn" @click="copyToClipboard">{{ copied ? 'Copied ✓' : 'Copy CSS →' }}</button>

        <div v-if="error" class="err-band">{{ error }}</div>
    </div>
</template>

<script setup>
const minSize = ref('')
const maxSize = ref('')
const minVw   = ref('')
const maxVw   = ref('')
const calculated = ref(false)
const copied     = ref(false)
const error      = ref('')
const result     = ref({})

function fmt(n) {
    return parseFloat(n.toFixed(4)).toString()
}

function calculate() {
    error.value = ''
    copied.value = false
    const s1 = parseFloat(minSize.value)
    const s2 = parseFloat(maxSize.value)
    const v1 = parseFloat(minVw.value)
    const v2 = parseFloat(maxVw.value)

    if ([s1, s2, v1, v2].some(n => isNaN(n) || n <= 0)) { error.value = 'Fill in all four values with positive numbers.'; return }
    if (v1 >= v2) { error.value = 'Max viewport must be larger than min viewport.'; return }

    const slope = (s2 - s1) / (v2 - v1)
    const intercept = s1 - slope * v1

    const minRem = fmt(Math.min(s1, s2) / 16)
    const maxRem = fmt(Math.max(s1, s2) / 16)
    const slopeVw = fmt(slope * 100)
    const interceptRem = fmt(intercept / 16)

    const preferred = `${interceptRem}rem + ${slopeVw}vw`
    result.value = {
        minRem,
        maxRem,
        slope: slopeVw,
        css: `font-size: clamp(${minRem}rem, ${preferred}, ${maxRem}rem);`,
    }
    calculated.value = true
}

function clear() {
    minSize.value = ''; maxSize.value = ''; minVw.value = ''; maxVw.value = ''
    result.value = {}; error.value = ''
    calculated.value = false; copied.value = false
}

function copyToClipboard() {
    if (!result.value.css) return
    navigator.clipboard.writeText(result.value.css)
    copied.value = true
}
</script>

<style scoped>
.code-band {
    margin-top: 12px;
    border: 3px solid #0a0a0a;
    background: #0a0a0a;
    color: #f5e642;
    padding: 14px 20px;
    font-family: 'Space Mono', monospace;
    font-size: 13px;
    font-weight: 700;
    overflow-x: auto;
    white-space: nowrap;
}
.copy-btn {
    margin-top: 10px;
    width: 100%;
    padding: 12px 16px;
    background: none;
    border: 3px solid #0a0a0a;
    font-family: 'Space Mono', monospace;
    font-size: 11px;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.12em;
    cursor: pointer;
    text-align: left;
    transition: background 0.08s;
}
.copy-btn:hover {
    background: rgba(10, 10, 10, 0.05);
}
.err-band {
    margin-top: 12px;
    border: 3px solid #0a0a0a;
    background: #ffd6d6;
    padding: 12px 20px;
    font-family: 'Space Mono', monospace;
    font-size: 12px;
    font-weight: 700;
}
</style>
