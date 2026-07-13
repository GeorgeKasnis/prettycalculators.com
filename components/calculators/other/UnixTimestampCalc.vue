<template>
    <div>
        <div class="now-band">
            <div class="now-label">Current Unix Time</div>
            <div class="now-value">{{ nowSeconds || '…' }}</div>
            <button class="now-copy" @click="copyNow">{{ copiedNow ? '✓' : 'Copy' }}</button>
        </div>

        <div class="ts-wrap">
            <div class="ts-label">Timestamp or date</div>
            <input v-model="raw" class="ts-input" type="text" placeholder="e.g. 1752432000 or 2026-07-13 18:00" spellcheck="false" @keyup.enter="convert" />
            <div class="ts-hint">Accepts Unix seconds, milliseconds, or any date string</div>
        </div>

        <CalcBtn :showClear="calculated" @click="convert" @clear="clear">Convert →</CalcBtn>

        <CalcOutput :show="calculated" title="Converted">
            <CalcOutputCell label="Unix (seconds)"      :value="result.seconds" />
            <CalcOutputCell label="Unix (milliseconds)" :value="result.millis" />
            <CalcOutputCell label="ISO 8601 (UTC)"      :value="result.iso" />
            <CalcOutputCell label="Your local time"     :value="result.local" />
            <CalcOutputCell label="Relative"            :value="result.relative" />
        </CalcOutput>

        <div v-if="error" class="err-band">{{ error }}</div>
    </div>
</template>

<script setup>
const raw        = ref('')
const calculated = ref(false)
const error      = ref('')
const result     = ref({})
const nowSeconds = ref('')
const copiedNow  = ref(false)

let timer = null
onMounted(() => {
    const tick = () => { nowSeconds.value = String(Math.floor(Date.now() / 1000)) }
    tick()
    timer = setInterval(tick, 1000)
})
onUnmounted(() => { if (timer) clearInterval(timer) })

function copyNow() {
    if (!nowSeconds.value) return
    navigator.clipboard.writeText(nowSeconds.value)
    copiedNow.value = true
    setTimeout(() => { copiedNow.value = false }, 1500)
}

function relativeTime(date) {
    const diff = date.getTime() - Date.now()
    const abs = Math.abs(diff)
    const units = [
        [31536000000, 'year'], [2592000000, 'month'], [604800000, 'week'],
        [86400000, 'day'], [3600000, 'hour'], [60000, 'minute'], [1000, 'second'],
    ]
    for (const [ms, name] of units) {
        if (abs >= ms) {
            const n = Math.round(abs / ms)
            return diff < 0 ? `${n} ${name}${n > 1 ? 's' : ''} ago` : `in ${n} ${name}${n > 1 ? 's' : ''}`
        }
    }
    return 'now'
}

function convert() {
    error.value = ''
    const input = raw.value.trim()
    if (!input) { error.value = 'Enter a timestamp or a date.'; return }

    let date
    if (/^-?\d+$/.test(input)) {
        const n = parseInt(input, 10)
        // 11+ digits can't be a seconds timestamp for any plausible date — treat as ms
        date = new Date(Math.abs(n) >= 1e11 ? n : n * 1000)
    } else {
        date = new Date(input)
    }

    if (isNaN(date.getTime())) { error.value = 'Could not parse that input. Try a Unix timestamp (1752432000) or an ISO date (2026-07-13T18:00:00Z).'; return }

    result.value = {
        seconds:  String(Math.floor(date.getTime() / 1000)),
        millis:   String(date.getTime()),
        iso:      date.toISOString(),
        local:    date.toLocaleString(undefined, { dateStyle: 'medium', timeStyle: 'medium' }),
        relative: relativeTime(date),
    }
    calculated.value = true
}

function clear() {
    raw.value = ''
    result.value = {}; error.value = ''
    calculated.value = false
}
</script>

<style scoped>
.now-band {
    border: 3px solid #0a0a0a;
    background: #0a0a0a;
    color: #fff;
    margin-bottom: 12px;
    padding: 14px 20px;
    display: flex;
    align-items: center;
    gap: 16px;
}
.now-label {
    font-family: 'Space Mono', monospace;
    font-size: 10px;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.14em;
    opacity: 0.5;
}
.now-value {
    font-family: 'Space Mono', monospace;
    font-size: 20px;
    font-weight: 700;
    color: #f5e642;
    flex: 1;
}
.now-copy {
    font-family: 'Space Mono', monospace;
    font-size: 10px;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.12em;
    background: none;
    color: #fff;
    border: 2px solid #fff;
    padding: 6px 12px;
    cursor: pointer;
}
.now-copy:hover { background: rgba(255,255,255,0.12); }
.ts-wrap {
    border: 3px solid #0a0a0a;
    background: #fff;
    margin-bottom: 12px;
    display: flex;
    flex-direction: column;
}
.ts-label {
    font-family: 'Space Mono', monospace;
    font-size: 10px;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.14em;
    opacity: 0.4;
    padding: 14px 20px 0;
}
.ts-input {
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
.ts-input::placeholder { color: rgba(10,10,10,0.18); font-weight: 400; }
.ts-input:focus { color: #5c3bef; }
.ts-hint {
    font-family: 'Space Mono', monospace;
    font-size: 9px;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.1em;
    opacity: 0.3;
    padding: 8px 20px 12px;
    border-top: 1px solid rgba(10,10,10,0.08);
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
