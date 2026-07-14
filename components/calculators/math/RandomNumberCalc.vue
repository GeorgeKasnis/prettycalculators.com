<template>
    <div>
        <CalcInputStack>
            <CalcInputRow label="Minimum" v-model="min" placeholder="e.g. 1" type="number" />
            <CalcInputRow label="Maximum" v-model="max" placeholder="e.g. 100" type="number" />
            <CalcInputRow label="How many" v-model="count" placeholder="e.g. 1" type="number" />
        </CalcInputStack>

        <div class="opt-row">
            <button class="opt-btn" :class="{ active: !allowDuplicates }" @click="allowDuplicates = !allowDuplicates">No duplicates</button>
        </div>

        <CalcBtn :showClear="generated" @click="generate" @clear="clear">Generate →</CalcBtn>

        <div v-if="generated" class="num-band">
            <span class="num-text">{{ numbers.join('  ·  ') }}</span>
        </div>
        <button v-if="generated" class="copy-btn" @click="copyNumbers">{{ copied ? 'Copied ✓' : 'Copy →' }}</button>

        <div v-if="error" class="err-band">{{ error }}</div>
    </div>
</template>

<script setup>
const min   = ref('1')
const max   = ref('100')
const count = ref('1')
const allowDuplicates = ref(true)
const numbers   = ref([])
const generated = ref(false)
const copied    = ref(false)
const error     = ref('')

function randInt(lo, hi) {
    // crypto-based uniform integer in [lo, hi]
    const range = hi - lo + 1
    const maxValid = Math.floor(0x100000000 / range) * range
    const buf = new Uint32Array(1)
    let x
    do { crypto.getRandomValues(buf); x = buf[0] } while (x >= maxValid)
    return lo + (x % range)
}

function generate() {
    error.value = ''; copied.value = false
    const lo = parseInt(min.value, 10)
    const hi = parseInt(max.value, 10)
    const n  = parseInt(count.value, 10)

    if (isNaN(lo) || isNaN(hi)) { error.value = 'Enter a minimum and a maximum.'; return }
    if (lo > hi) { error.value = 'Minimum must not be larger than maximum.'; return }
    if (!n || n < 1 || n > 1000) { error.value = 'Choose between 1 and 1000 numbers.'; return }

    const rangeSize = hi - lo + 1
    if (!allowDuplicates.value && n > rangeSize) {
        error.value = `Can't pick ${n} unique numbers from a range of ${rangeSize}.`
        return
    }

    if (allowDuplicates.value) {
        numbers.value = Array.from({ length: n }, () => randInt(lo, hi))
    } else {
        const picked = new Set()
        while (picked.size < n) picked.add(randInt(lo, hi))
        numbers.value = [...picked]
    }
    generated.value = true
}

function copyNumbers() {
    if (!numbers.value.length) return
    navigator.clipboard.writeText(numbers.value.join(', '))
    copied.value = true
}

function clear() {
    numbers.value = []
    generated.value = false
    copied.value = false
    error.value = ''
}
</script>

<style scoped>
.opt-row { display: flex; gap: 8px; margin-bottom: 12px; }
.opt-btn {
    padding: 10px 16px;
    background: #fff;
    border: 3px solid #0a0a0a;
    font-family: 'Space Mono', monospace;
    font-size: 10px;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.1em;
    cursor: pointer;
}
.opt-btn.active { background: #f5e642; }
.num-band {
    margin-top: 12px;
    border: 3px solid #0a0a0a;
    background: #0a0a0a;
    padding: 16px 20px;
    max-height: 260px;
    overflow-y: auto;
}
.num-text {
    font-family: 'Space Mono', monospace;
    font-size: 20px;
    font-weight: 700;
    color: #f5e642;
    line-height: 1.7;
    word-break: break-word;
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
.copy-btn:hover { background: rgba(10, 10, 10, 0.05); }
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
