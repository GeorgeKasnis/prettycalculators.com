<template>
    <div>
        <div class="sd-wrap">
            <div class="sd-label">Enter Numbers</div>
            <textarea v-model="raw" class="sd-textarea" placeholder="e.g. 10, 20, 30, 40, 50" rows="4" spellcheck="false" />
            <div class="sd-hint">Separate numbers with commas, spaces, or new lines</div>
        </div>

        <CalcBtn :showClear="calculated" @click="calculate" @clear="clear">Calculate →</CalcBtn>

        <CalcOutput :show="calculated" title="Standard Deviation">
            <CalcOutputCell label="Population SD (σ)"  :value="result.popSD" />
            <CalcOutputCell label="Sample SD (s)"      :value="result.sampleSD" />
            <CalcOutputCell label="Mean"               :value="result.mean" />
            <CalcOutputCell label="Population Variance" :value="result.popVar" />
            <CalcOutputCell label="Sample Variance"    :value="result.sampleVar" />
            <CalcOutputCell label="Count"              :value="result.count" />
            <CalcOutputCell label="Sum"                :value="result.sum" />
            <CalcOutputCell label="Min"                :value="result.min" />
            <CalcOutputCell label="Max"                :value="result.max" />
        </CalcOutput>
    </div>
</template>

<script setup>
const raw        = ref('')
const calculated = ref(false)
const result     = ref({})

function parse(str) {
    return str.split(/[\s,;\n]+/).map(s => parseFloat(s.trim())).filter(n => !isNaN(n))
}

function fmt(n) {
    return parseFloat(n.toFixed(6)).toString()
}

function calculate() {
    const nums = parse(raw.value)
    if (nums.length < 2) return

    const n    = nums.length
    const sum  = nums.reduce((a, b) => a + b, 0)
    const mean = sum / n
    const squaredDiffs = nums.map(x => (x - mean) ** 2)
    const popVar    = squaredDiffs.reduce((a, b) => a + b, 0) / n
    const sampleVar = squaredDiffs.reduce((a, b) => a + b, 0) / (n - 1)

    result.value = {
        popSD:    fmt(Math.sqrt(popVar)),
        sampleSD: fmt(Math.sqrt(sampleVar)),
        mean:     fmt(mean),
        popVar:   fmt(popVar),
        sampleVar:fmt(sampleVar),
        count:    String(n),
        sum:      fmt(sum),
        min:      fmt(Math.min(...nums)),
        max:      fmt(Math.max(...nums)),
    }
    calculated.value = true
}

function clear() {
    raw.value = ''
    result.value = {}
    calculated.value = false
}
</script>

<style scoped>
.sd-wrap {
    border: 3px solid #0a0a0a;
    background: #fff;
    margin-bottom: 18px;
    display: flex;
    flex-direction: column;
}
.sd-label {
    font-family: 'Space Mono', monospace;
    font-size: 10px;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.14em;
    opacity: 0.4;
    padding: 14px 20px 0;
}
.sd-textarea {
    font-family: 'Space Grotesk', sans-serif;
    font-size: 18px;
    font-weight: 600;
    color: #0a0a0a;
    background: transparent;
    border: none;
    outline: none;
    resize: none;
    padding: 8px 20px 14px;
    letter-spacing: -0.02em;
    line-height: 1.5;
    -webkit-appearance: none;
    appearance: none;
}
.sd-textarea::placeholder { color: rgba(10,10,10,0.18); font-weight: 400; }
.sd-textarea:focus { color: #5c3bef; }
.sd-hint {
    font-family: 'Space Mono', monospace;
    font-size: 9px;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.1em;
    opacity: 0.3;
    border-top: 1px solid rgba(10,10,10,0.08);
    padding: 8px 20px 12px;
}
</style>
