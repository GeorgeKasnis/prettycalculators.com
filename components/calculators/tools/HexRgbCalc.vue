<template>
    <div>
        <div class="swatch" :style="{ background: valid ? cssHex : '#e8e4f5' }">
            <span v-if="!valid" class="swatch-hint">Enter a color below</span>
        </div>

        <div class="io-grid">
            <div class="io-wrap">
                <div class="io-label">HEX</div>
                <input v-model="hexInput" class="io-input" placeholder="#ff6b35" spellcheck="false" @input="fromHex">
            </div>
            <div class="io-wrap">
                <div class="io-label">RGB</div>
                <input v-model="rgbInput" class="io-input" placeholder="255, 107, 53" spellcheck="false" @input="fromRgb">
            </div>
        </div>

        <div v-if="valid" class="results">
            <button v-for="row in rows" :key="row.label" class="result-row" :title="'Copy ' + row.label" @click="copy(row)">
                <span class="result-label">{{ row.label }}</span>
                <span class="result-value">{{ row.value }}</span>
                <span class="result-copy">{{ copiedLabel === row.label ? '✓ Copied' : 'Copy' }}</span>
            </button>
        </div>
    </div>
</template>

<script setup>
const hexInput = ref('')
const rgbInput = ref('')
const rgb = ref(null) // { r, g, b } — single source of truth
const copiedLabel = ref('')

const valid = computed(() => rgb.value !== null)

const cssHex = computed(() => {
    if (!rgb.value) return ''
    const { r, g, b } = rgb.value
    return '#' + [r, g, b].map((v) => v.toString(16).padStart(2, '0')).join('')
})

const cssRgb = computed(() => rgb.value ? `rgb(${rgb.value.r}, ${rgb.value.g}, ${rgb.value.b})` : '')

const cssHsl = computed(() => {
    if (!rgb.value) return ''
    const r = rgb.value.r / 255, g = rgb.value.g / 255, b = rgb.value.b / 255
    const max = Math.max(r, g, b), min = Math.min(r, g, b)
    const l = (max + min) / 2
    let h = 0, s = 0
    if (max !== min) {
        const d = max - min
        s = l > 0.5 ? d / (2 - max - min) : d / (max + min)
        if (max === r) h = ((g - b) / d + (g < b ? 6 : 0))
        else if (max === g) h = (b - r) / d + 2
        else h = (r - g) / d + 4
        h *= 60
    }
    return `hsl(${Math.round(h)}, ${Math.round(s * 100)}%, ${Math.round(l * 100)}%)`
})

const rows = computed(() => [
    { label: 'HEX', value: cssHex.value },
    { label: 'RGB', value: cssRgb.value },
    { label: 'HSL', value: cssHsl.value },
])

function parseHex(str) {
    const m = str.trim().replace(/^#/, '').toLowerCase()
    if (/^[0-9a-f]{3}$/.test(m)) {
        return { r: parseInt(m[0] + m[0], 16), g: parseInt(m[1] + m[1], 16), b: parseInt(m[2] + m[2], 16) }
    }
    if (/^[0-9a-f]{6}$/.test(m)) {
        return { r: parseInt(m.slice(0, 2), 16), g: parseInt(m.slice(2, 4), 16), b: parseInt(m.slice(4, 6), 16) }
    }
    return null
}

function parseRgb(str) {
    const nums = (str.match(/\d{1,3}/g) ?? []).map(Number)
    if (nums.length !== 3 || nums.some((n) => n > 255)) return null
    return { r: nums[0], g: nums[1], b: nums[2] }
}

function fromHex() {
    copiedLabel.value = ''
    const parsed = parseHex(hexInput.value)
    rgb.value = parsed
    if (parsed) rgbInput.value = `${parsed.r}, ${parsed.g}, ${parsed.b}`
}

function fromRgb() {
    copiedLabel.value = ''
    const parsed = parseRgb(rgbInput.value)
    rgb.value = parsed
    if (parsed) hexInput.value = cssHex.value
}

function copy(row) {
    navigator.clipboard.writeText(row.value)
    copiedLabel.value = row.label
    setTimeout(() => { copiedLabel.value = '' }, 1500)
}
</script>

<style scoped>
.swatch {
    height: 90px;
    border: 3px solid #0a0a0a;
    margin-bottom: 12px;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: background 0.1s;
}

.swatch-hint {
    font-family: 'Space Mono', monospace;
    font-size: 10px;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.14em;
    opacity: 0.3;
}

.io-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 8px;
}

@media (max-width: 640px) { .io-grid { grid-template-columns: 1fr; } }

.io-wrap {
    border: 3px solid #0a0a0a;
    background: #fff;
}

.io-label {
    font-family: 'Space Mono', monospace;
    font-size: 10px;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.14em;
    opacity: 0.4;
    padding: 10px 14px 0;
}

.io-input {
    font-family: 'Space Mono', monospace;
    font-size: 16px;
    font-weight: 700;
    color: #0a0a0a;
    background: transparent;
    border: none;
    outline: none;
    padding: 6px 14px 12px;
    width: 100%;
    box-sizing: border-box;
}

.io-input::placeholder { color: rgba(10, 10, 10, 0.18); font-weight: 400; }
.io-input:focus { color: #5c3bef; }

.results {
    margin-top: 12px;
    border: 3px solid #0a0a0a;
    background: #fff;
}

.result-row {
    display: flex;
    align-items: center;
    gap: 12px;
    width: 100%;
    padding: 12px 14px;
    background: none;
    border: none;
    border-bottom: 1.5px solid rgba(10, 10, 10, 0.1);
    cursor: pointer;
    text-align: left;
    transition: background 0.08s;
}

.result-row:last-child { border-bottom: none; }
.result-row:hover { background: rgba(221, 214, 255, 0.35); }

.result-label {
    font-family: 'Space Mono', monospace;
    font-size: 10px;
    font-weight: 700;
    letter-spacing: 0.1em;
    opacity: 0.4;
    width: 34px;
    flex-shrink: 0;
}

.result-value {
    font-family: 'Space Mono', monospace;
    font-size: 14px;
    font-weight: 700;
    color: #0a0a0a;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}

.result-copy {
    margin-left: auto;
    font-family: 'Space Mono', monospace;
    font-size: 9px;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.1em;
    opacity: 0.35;
    flex-shrink: 0;
}
</style>
