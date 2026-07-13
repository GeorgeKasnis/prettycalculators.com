<template>
    <div>
        <div class="vec-wrap">
            <div class="vec-label">Vector A</div>
            <input v-model="rawA" class="vec-input" type="text" placeholder="e.g. 1, 2, 3" spellcheck="false" />
            <div class="vec-hint">Separate values with commas or spaces</div>
        </div>
        <div class="vec-wrap">
            <div class="vec-label">Vector B</div>
            <input v-model="rawB" class="vec-input" type="text" placeholder="e.g. 4, 5, 6" spellcheck="false" />
        </div>

        <CalcBtn :showClear="calculated" @click="calculate" @clear="clear">Calculate Dot Product →</CalcBtn>

        <CalcOutput :show="calculated" title="Dot Product">
            <CalcOutputCell label="Dot Product"       :value="result.dot" />
            <CalcOutputCell label="Magnitude A"       :value="result.magA" />
            <CalcOutputCell label="Magnitude B"       :value="result.magB" />
            <CalcOutputCell label="Angle (degrees)"   :value="result.angle" />
            <CalcOutputCell label="Cosine Similarity" :value="result.cos" />
        </CalcOutput>

        <div v-if="calculated" class="interp-band" :style="{ background: interpColor }">
            <span class="interp-label">{{ interpLabel }}</span>
        </div>

        <div v-if="error" class="err-band">{{ error }}</div>
    </div>
</template>

<script setup>
const rawA       = ref('')
const rawB       = ref('')
const calculated = ref(false)
const error      = ref('')
const result     = ref({})

function parse(str) {
    return str.split(/[\s,;]+/).map(s => parseFloat(s.trim())).filter(n => !isNaN(n))
}

function fmt(n) {
    return parseFloat(n.toFixed(6)).toString()
}

const interpLabel = computed(() => {
    const d = parseFloat(result.value.dot)
    if (isNaN(d)) return ''
    if (d > 0)  return 'Positive — vectors point in a similar direction'
    if (d < 0)  return 'Negative — vectors point in opposing directions'
    return 'Zero — vectors are orthogonal (perpendicular)'
})

const interpColor = computed(() => {
    const d = parseFloat(result.value.dot)
    if (isNaN(d)) return '#fff'
    if (d > 0)  return '#ddd6ff'
    if (d < 0)  return '#ffd6d6'
    return '#e0e0e0'
})

function calculate() {
    error.value = ''
    const a = parse(rawA.value)
    const b = parse(rawB.value)
    if (a.length === 0 || b.length === 0) { error.value = 'Enter at least one number in each vector.'; return }
    if (a.length !== b.length) { error.value = `Vectors must be the same length. A has ${a.length} values, B has ${b.length}.`; return }

    const dot  = a.reduce((sum, ai, i) => sum + ai * b[i], 0)
    const magA = Math.sqrt(a.reduce((sum, ai) => sum + ai * ai, 0))
    const magB = Math.sqrt(b.reduce((sum, bi) => sum + bi * bi, 0))

    let angle = '—'
    let cos   = '—'
    if (magA > 0 && magB > 0) {
        const c = dot / (magA * magB)
        cos   = fmt(c)
        angle = fmt((Math.acos(Math.max(-1, Math.min(1, c))) * 180) / Math.PI) + '°'
    }

    result.value = {
        dot:   fmt(dot),
        magA:  fmt(magA),
        magB:  fmt(magB),
        angle,
        cos,
    }
    calculated.value = true
}

function clear() {
    rawA.value = ''; rawB.value = ''
    result.value = {}; error.value = ''
    calculated.value = false
}
</script>

<style scoped>
.vec-wrap {
    border: 3px solid #0a0a0a;
    background: #fff;
    margin-bottom: 12px;
    display: flex;
    flex-direction: column;
}
.vec-label {
    font-family: 'Space Mono', monospace;
    font-size: 10px;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.14em;
    opacity: 0.4;
    padding: 14px 20px 0;
}
.vec-input {
    font-family: 'Space Grotesk', sans-serif;
    font-size: 20px;
    font-weight: 600;
    color: #0a0a0a;
    background: transparent;
    border: none;
    outline: none;
    padding: 8px 20px 14px;
    letter-spacing: -0.02em;
    width: 100%;
    box-sizing: border-box;
}
.vec-input::placeholder { color: rgba(10,10,10,0.18); font-weight: 400; }
.vec-input:focus { color: #5c3bef; }
.vec-hint {
    font-family: 'Space Mono', monospace;
    font-size: 9px;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.1em;
    opacity: 0.3;
    padding: 0 20px 12px;
    border-top: 1px solid rgba(10,10,10,0.08);
    padding-top: 8px;
}
.interp-band {
    border: 3px solid #0a0a0a;
    margin-top: 12px;
    padding: 12px 20px;
    font-family: 'Space Grotesk', sans-serif;
    font-size: 15px;
    font-weight: 700;
    letter-spacing: -0.02em;
}
.interp-label::before { content: 'Interpretation: '; opacity: 0.5; font-weight: 400; }
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
