<template>
    <div class="avg-input-wrap">
        <div class="avg-label">Enter Numbers</div>
        <textarea
            v-model="raw"
            class="avg-textarea"
            placeholder="e.g. 4, 8, 15, 16, 23, 42"
            rows="4"
            spellcheck="false"
        />
        <div class="avg-hint">Separate numbers with commas, spaces, or new lines</div>
    </div>

    <CalcBtn :showClear="calculated" @click="calculate" @clear="clear">Calculate →</CalcBtn>

    <CalcOutput :show="calculated" title="Statistics">
        <CalcOutputCell label="Mean (Average)" :value="result.mean" />
        <CalcOutputCell label="Median"          :value="result.median" />
        <CalcOutputCell label="Mode"            :value="result.mode" />
        <CalcOutputCell label="Range"           :value="result.range" />
        <CalcOutputCell label="Sum"             :value="result.sum" />
        <CalcOutputCell label="Count"           :value="result.count" />
    </CalcOutput>
</template>

<script setup>
const raw        = ref('')
const calculated = ref(false)
const result     = ref({})

function parseNumbers(str) {
    return str
        .split(/[\s,;\n]+/)
        .map(s => parseFloat(s.trim()))
        .filter(n => !isNaN(n))
}

function median(sorted) {
    const mid = Math.floor(sorted.length / 2)
    return sorted.length % 2 === 0
        ? ((sorted[mid - 1] + sorted[mid]) / 2)
        : sorted[mid]
}

function mode(nums) {
    const freq = {}
    nums.forEach(n => { freq[n] = (freq[n] || 0) + 1 })
    const max = Math.max(...Object.values(freq))
    if (max === 1) return 'No mode'
    const modes = Object.keys(freq).filter(k => freq[k] === max).map(Number)
    return modes.join(', ')
}

function fmt(n) {
    return parseFloat(n.toFixed(6)).toString()
}

function calculate() {
    const nums = parseNumbers(raw.value)
    if (nums.length === 0) return
    const sorted = [...nums].sort((a, b) => a - b)
    const sum    = nums.reduce((a, b) => a + b, 0)
    result.value = {
        mean:   fmt(sum / nums.length),
        median: fmt(median(sorted)),
        mode:   mode(nums),
        range:  fmt(sorted[sorted.length - 1] - sorted[0]),
        sum:    fmt(sum),
        count:  String(nums.length),
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
.avg-input-wrap {
    border: 3px solid #0a0a0a;
    background: #fff;
    margin-bottom: 18px;
    display: flex;
    flex-direction: column;
}

.avg-label {
    font-family: 'Space Mono', monospace;
    font-size: 10px;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.14em;
    opacity: 0.4;
    padding: 14px 20px 0;
}

.avg-textarea {
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
}
.avg-textarea::placeholder { color: rgba(10,10,10,0.18); font-weight: 400; }
.avg-textarea:focus { color: #5c3bef; }

.avg-hint {
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
</style>
