<template>
    <div>
        <CalcInputStack>
            <CalcInputRow label="How many" unit="UUIDs" v-model="count" placeholder="e.g. 5" type="number" />
        </CalcInputStack>

        <CalcBtn :showClear="generated" @click="generate" @clear="clear">Generate UUID v4 →</CalcBtn>

        <div v-if="generated" class="uuid-list">
            <code v-for="(u, i) in uuids" :key="i" class="uuid-line">{{ u }}</code>
        </div>
        <button v-if="generated" class="copy-btn" @click="copyAll">{{ copied ? 'Copied ✓' : uuids.length > 1 ? 'Copy All →' : 'Copy →' }}</button>

        <div v-if="error" class="err-band">{{ error }}</div>
    </div>
</template>

<script setup>
const count     = ref('1')
const uuids     = ref([])
const generated = ref(false)
const copied    = ref(false)
const error     = ref('')

function uuidv4() {
    if (typeof crypto.randomUUID === 'function') return crypto.randomUUID()
    // fallback for older browsers
    const bytes = new Uint8Array(16)
    crypto.getRandomValues(bytes)
    bytes[6] = (bytes[6] & 0x0f) | 0x40
    bytes[8] = (bytes[8] & 0x3f) | 0x80
    const hex = [...bytes].map(b => b.toString(16).padStart(2, '0')).join('')
    return `${hex.slice(0, 8)}-${hex.slice(8, 12)}-${hex.slice(12, 16)}-${hex.slice(16, 20)}-${hex.slice(20)}`
}

function generate() {
    error.value = ''; copied.value = false
    const n = parseInt(count.value, 10)
    if (!n || n < 1 || n > 500) { error.value = 'Choose between 1 and 500 UUIDs.'; return }
    uuids.value = Array.from({ length: n }, uuidv4)
    generated.value = true
}

function copyAll() {
    if (!uuids.value.length) return
    navigator.clipboard.writeText(uuids.value.join('\n'))
    copied.value = true
}

function clear() {
    uuids.value = []
    generated.value = false
    copied.value = false
    error.value = ''
}
</script>

<style scoped>
.uuid-list {
    margin-top: 12px;
    border: 3px solid #0a0a0a;
    background: #0a0a0a;
    padding: 14px 20px;
    max-height: 320px;
    overflow-y: auto;
}
.uuid-line {
    display: block;
    font-family: 'Space Mono', monospace;
    font-size: 14px;
    font-weight: 700;
    color: #f5e642;
    line-height: 1.8;
    word-break: break-all;
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
