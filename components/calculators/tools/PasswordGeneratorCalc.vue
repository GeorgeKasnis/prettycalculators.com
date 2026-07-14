<template>
    <div>
        <CalcInputStack>
            <CalcInputRow label="Length" unit="chars" v-model="length" placeholder="e.g. 16" type="number" />
        </CalcInputStack>

        <div class="opt-row">
            <button v-for="o in options" :key="o.key" class="opt-btn" :class="{ active: o.on.value }" @click="o.on.value = !o.on.value">{{ o.label }}</button>
        </div>

        <CalcBtn :showClear="generated" @click="generate" @clear="clear">Generate Password →</CalcBtn>

        <div v-if="generated" class="pw-band">
            <code class="pw-text">{{ password }}</code>
        </div>

        <CalcOutput :show="generated" title="Strength">
            <CalcOutputCell label="Entropy" :value="entropyBits" unit="bits" />
            <CalcOutputCell label="Rating" :value="strengthLabel" />
            <CalcOutputCell label="Charset" :value="poolSize + ' symbols'" />
        </CalcOutput>

        <button v-if="generated" class="copy-btn" @click="copyPassword">{{ copied ? 'Copied ✓' : 'Copy Password →' }}</button>

        <div v-if="error" class="err-band">{{ error }}</div>
    </div>
</template>

<script setup>
const length    = ref('16')
const generated = ref(false)
const password  = ref('')
const copied    = ref(false)
const error     = ref('')

const useUpper   = ref(true)
const useLower   = ref(true)
const useDigits  = ref(true)
const useSymbols = ref(true)
const noAmbiguous = ref(false)

const options = [
    { key: 'upper',   label: 'A-Z',          on: useUpper },
    { key: 'lower',   label: 'a-z',          on: useLower },
    { key: 'digits',  label: '0-9',          on: useDigits },
    { key: 'symbols', label: '!@#$',         on: useSymbols },
    { key: 'ambig',   label: 'No 0/O/1/l/I', on: noAmbiguous },
]

const SETS = {
    upper:   'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
    lower:   'abcdefghijklmnopqrstuvwxyz',
    digits:  '0123456789',
    symbols: '!@#$%^&*()-_=+[]{};:,.<>?',
}
const AMBIGUOUS = /[0O1lI|]/g

const pool = computed(() => {
    let p = ''
    if (useUpper.value)   p += SETS.upper
    if (useLower.value)   p += SETS.lower
    if (useDigits.value)  p += SETS.digits
    if (useSymbols.value) p += SETS.symbols
    if (noAmbiguous.value) p = p.replace(AMBIGUOUS, '')
    return p
})

const poolSize = computed(() => pool.value.length)

const entropyBits = computed(() => {
    const len = parseInt(length.value, 10)
    if (!len || !poolSize.value) return '—'
    return Math.round(len * Math.log2(poolSize.value))
})

const strengthLabel = computed(() => {
    const bits = parseInt(entropyBits.value, 10)
    if (isNaN(bits)) return '—'
    if (bits >= 100) return 'Excellent'
    if (bits >= 75)  return 'Strong'
    if (bits >= 55)  return 'Good'
    if (bits >= 40)  return 'Weak'
    return 'Very weak'
})

function generate() {
    error.value = ''
    copied.value = false
    const len = parseInt(length.value, 10)
    if (!len || len < 4 || len > 128) { error.value = 'Choose a length between 4 and 128 characters.'; return }
    if (!pool.value.length) { error.value = 'Enable at least one character type.'; return }

    const chars = pool.value
    const out = new Array(len)
    const rand = new Uint32Array(len)
    crypto.getRandomValues(rand)
    for (let i = 0; i < len; i++) {
        out[i] = chars[rand[i] % chars.length]
    }
    password.value = out.join('')
    generated.value = true
}

function copyPassword() {
    if (!password.value) return
    navigator.clipboard.writeText(password.value)
    copied.value = true
}

function clear() {
    password.value = ''
    generated.value = false
    copied.value = false
    error.value = ''
}
</script>

<style scoped>
.opt-row { display: flex; gap: 8px; margin-bottom: 12px; flex-wrap: wrap; }
.opt-btn {
    flex: 1;
    min-width: 90px;
    padding: 10px 8px;
    background: #fff;
    border: 3px solid #0a0a0a;
    font-family: 'Space Mono', monospace;
    font-size: 10px;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.08em;
    cursor: pointer;
    white-space: nowrap;
}
.opt-btn.active { background: #f5e642; }
.pw-band {
    margin-top: 12px;
    border: 3px solid #0a0a0a;
    background: #0a0a0a;
    padding: 16px 20px;
    overflow-x: auto;
}
.pw-text {
    font-family: 'Space Mono', monospace;
    font-size: 18px;
    font-weight: 700;
    color: #f5e642;
    letter-spacing: 0.04em;
    word-break: break-all;
    white-space: pre-wrap;
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
