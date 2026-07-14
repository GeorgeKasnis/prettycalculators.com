<template>
    <div>
        <CalcInputStack>
            <CalcInputRow label="Original width"  unit="px" v-model="w" placeholder="e.g. 1920" type="number" />
            <CalcInputRow label="Original height" unit="px" v-model="h" placeholder="e.g. 1080" type="number" />
            <CalcInputRow label="New width (optional)"  unit="px" v-model="newW" placeholder="e.g. 1280" type="number" />
            <CalcInputRow label="New height (optional)" unit="px" v-model="newH" placeholder="leave empty to solve" type="number" />
        </CalcInputStack>

        <CalcBtn :showClear="calculated" @click="calculate" @clear="clear">Calculate Ratio →</CalcBtn>

        <CalcOutput :show="calculated" title="Aspect Ratio">
            <CalcOutputCell label="Ratio"           :value="result.ratio" />
            <CalcOutputCell label="Decimal"         :value="result.decimal" />
            <CalcOutputCell v-if="result.solvedW" label="New Width"  :value="result.solvedW" unit="px" />
            <CalcOutputCell v-if="result.solvedH" label="New Height" :value="result.solvedH" unit="px" />
        </CalcOutput>

        <div v-if="calculated" class="ratio-preview-wrap">
            <div class="ratio-preview" :style="previewStyle"></div>
            <span v-if="result.name" class="ratio-name">{{ result.name }}</span>
        </div>

        <div v-if="error" class="err-band">{{ error }}</div>
    </div>
</template>

<script setup>
const w    = ref('')
const h    = ref('')
const newW = ref('')
const newH = ref('')
const calculated = ref(false)
const error      = ref('')
const result     = ref({})

const COMMON = [
    { r: 16 / 9,  name: '16:9 — widescreen video, YouTube, monitors' },
    { r: 9 / 16,  name: '9:16 — vertical video, Stories, Reels, TikTok' },
    { r: 4 / 3,   name: '4:3 — classic TV, iPad' },
    { r: 3 / 4,   name: '3:4 — portrait 4:3' },
    { r: 21 / 9,  name: '21:9 — ultrawide cinema' },
    { r: 1,       name: '1:1 — square, Instagram posts' },
    { r: 3 / 2,   name: '3:2 — 35mm photo, many laptops' },
    { r: 2 / 3,   name: '2:3 — portrait photo, posters' },
    { r: 16 / 10, name: '16:10 — MacBook and many laptop displays' },
]

function gcd(a, b) { return b ? gcd(b, a % b) : a }

function simplify(width, height) {
    // scale floats to integers before reducing
    const scale = 10 ** Math.max(decimals(width), decimals(height))
    let a = Math.round(width * scale)
    let b = Math.round(height * scale)
    const g = gcd(a, b)
    return [a / g, b / g]
}

function decimals(n) {
    const s = String(n)
    return s.includes('.') ? s.split('.')[1].length : 0
}

function fmt(n) {
    return parseFloat(n.toFixed(4)).toString()
}

const previewStyle = computed(() => {
    const d = parseFloat(result.value.decimal)
    if (isNaN(d) || d <= 0) return {}
    const maxW = 220, maxH = 130
    let pw = maxW, ph = maxW / d
    if (ph > maxH) { ph = maxH; pw = maxH * d }
    return { width: pw + 'px', height: ph + 'px' }
})

function calculate() {
    error.value = ''
    const W = parseFloat(w.value)
    const H = parseFloat(h.value)
    if (!W || !H || W <= 0 || H <= 0) { error.value = 'Enter a positive original width and height.'; return }

    const d = W / H
    const [ra, rb] = simplify(W, H)
    const match = COMMON.find(c => Math.abs(c.r - d) < 0.002)

    const out = {
        ratio:   `${ra}:${rb}`,
        decimal: fmt(d),
        name:    match ? match.name : '',
    }

    const NW = parseFloat(newW.value)
    const NH = parseFloat(newH.value)
    if (NW > 0 && !(NH > 0)) out.solvedH = fmt(NW / d)
    else if (NH > 0 && !(NW > 0)) out.solvedW = fmt(NH * d)
    else if (NW > 0 && NH > 0) {
        out.solvedW = fmt(NW)
        out.solvedH = fmt(NW / d)
    }

    result.value = out
    calculated.value = true
}

function clear() {
    w.value = ''; h.value = ''; newW.value = ''; newH.value = ''
    result.value = {}; error.value = ''
    calculated.value = false
}
</script>

<style scoped>
.ratio-preview-wrap {
    border: 3px solid #0a0a0a;
    margin-top: 12px;
    padding: 16px 20px;
    display: flex;
    align-items: center;
    gap: 16px;
    flex-wrap: wrap;
}
.ratio-preview {
    border: 3px solid #0a0a0a;
    background: #ddd6ff;
    box-shadow: 5px 5px 0 #0a0a0a;
    flex-shrink: 0;
}
.ratio-name {
    font-family: 'Space Grotesk', sans-serif;
    font-size: 14px;
    font-weight: 700;
    letter-spacing: -0.02em;
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
