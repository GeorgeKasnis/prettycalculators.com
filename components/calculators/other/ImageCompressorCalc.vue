<template>
    <div>
        <div
            class="drop-zone"
            :class="{ over: dragOver }"
            @dragover.prevent="dragOver = true"
            @dragleave.prevent="dragOver = false"
            @drop.prevent="onDrop"
            @click="fileInput?.click()"
        >
            <input ref="fileInput" type="file" accept="image/*" class="hidden-input" @change="onPick" />
            <template v-if="!fileName">
                <div class="drop-title">Drop an image here</div>
                <div class="drop-sub">or click to choose — JPG, PNG, WebP · stays on your device</div>
            </template>
            <template v-else>
                <div class="drop-title">{{ fileName }}</div>
                <div class="drop-sub">{{ fmtSize(originalSize) }} · {{ origW }}×{{ origH }} — click to choose another</div>
            </template>
        </div>

        <CalcInputStack>
            <CalcInputRow label="Target size (optional)" unit="KB" v-model="targetKb" placeholder="e.g. 100" type="number" />
            <CalcInputRow label="Max width (optional)" unit="px" v-model="maxWidth" placeholder="e.g. 1920" type="number" />
        </CalcInputStack>

        <div class="fmt-row">
            <button v-for="f in formats" :key="f.value" class="fmt-btn" :class="{ active: format === f.value }" @click="format = f.value">{{ f.label }}</button>
        </div>

        <CalcBtn :showClear="calculated" @click="compress" @clear="clear">{{ working ? 'Compressing…' : 'Compress Image →' }}</CalcBtn>

        <CalcOutput :show="calculated" title="Compressed">
            <CalcOutputCell label="Original"   :value="fmtSize(originalSize)" />
            <CalcOutputCell label="Compressed" :value="fmtSize(newSize)" />
            <CalcOutputCell label="Saved"      :value="savedPct" />
            <CalcOutputCell label="Dimensions" :value="`${outW}×${outH}`" />
        </CalcOutput>

        <img v-if="previewUrl" :src="previewUrl" class="preview-img" alt="Compressed preview" />
        <button v-if="calculated" class="dl-btn" @click="download">Download {{ outName }} →</button>

        <div v-if="error" class="err-band">{{ error }}</div>
    </div>
</template>

<script setup>
const fileInput = ref(null)
const dragOver  = ref(false)
const fileName  = ref('')
const targetKb  = ref('')
const maxWidth  = ref('')
const format    = ref('image/jpeg')
const working   = ref(false)
const calculated = ref(false)
const error     = ref('')

const originalSize = ref(0)
const newSize      = ref(0)
const origW = ref(0)
const origH = ref(0)
const outW  = ref(0)
const outH  = ref(0)
const previewUrl = ref('')

const formats = [
    { label: 'JPG',  value: 'image/jpeg' },
    { label: 'WebP', value: 'image/webp' },
    { label: 'PNG',  value: 'image/png' },
]

let sourceFile = null
let resultBlob = null

const savedPct = computed(() => {
    if (!originalSize.value || !newSize.value) return '—'
    const pct = (1 - newSize.value / originalSize.value) * 100
    return (pct >= 0 ? '−' : '+') + Math.abs(pct).toFixed(1) + '%'
})

const outName = computed(() => {
    const base = fileName.value.replace(/\.[^.]+$/, '') || 'image'
    const ext = format.value === 'image/webp' ? 'webp' : format.value === 'image/png' ? 'png' : 'jpg'
    return `${base}-compressed.${ext}`
})

function fmtSize(bytes) {
    if (!bytes) return '—'
    if (bytes < 1024) return bytes + ' B'
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB'
    return (bytes / (1024 * 1024)).toFixed(2) + ' MB'
}

function onPick(e) {
    const f = e.target.files?.[0]
    if (f) setFile(f)
}

function onDrop(e) {
    dragOver.value = false
    const f = e.dataTransfer?.files?.[0]
    if (f) setFile(f)
}

function setFile(f) {
    error.value = ''
    if (!f.type.startsWith('image/')) { error.value = 'That file is not an image.'; return }
    sourceFile = f
    fileName.value = f.name
    originalSize.value = f.size
    calculated.value = false
    if (previewUrl.value) { URL.revokeObjectURL(previewUrl.value); previewUrl.value = '' }
    const img = new Image()
    const url = URL.createObjectURL(f)
    img.onload = () => { origW.value = img.naturalWidth; origH.value = img.naturalHeight; URL.revokeObjectURL(url) }
    img.src = url
}

function loadImage(file) {
    return new Promise((resolve, reject) => {
        const img = new Image()
        const url = URL.createObjectURL(file)
        img.onload = () => resolve({ img, url })
        img.onerror = () => { URL.revokeObjectURL(url); reject(new Error('Could not read that image.')) }
        img.src = url
    })
}

function toBlob(canvas, type, quality) {
    return new Promise(resolve => canvas.toBlob(resolve, type, quality))
}

async function compress() {
    error.value = ''
    if (!sourceFile) { error.value = 'Choose an image first.'; return }
    working.value = true
    try {
        const { img, url } = await loadImage(sourceFile)

        let w = img.naturalWidth
        let h = img.naturalHeight
        const maxW = parseFloat(maxWidth.value)
        if (maxW > 0 && w > maxW) { h = Math.round(h * maxW / w); w = Math.round(maxW) }

        const canvas = document.createElement('canvas')
        canvas.width = w
        canvas.height = h
        const ctx = canvas.getContext('2d')
        if (format.value === 'image/jpeg') { ctx.fillStyle = '#fff'; ctx.fillRect(0, 0, w, h) }
        ctx.drawImage(img, 0, 0, w, h)
        URL.revokeObjectURL(url)

        const targetBytes = parseFloat(targetKb.value) > 0 ? parseFloat(targetKb.value) * 1024 : null
        let blob

        if (format.value === 'image/png' || !targetBytes) {
            blob = await toBlob(canvas, format.value, 0.8)
            if (targetBytes && blob && blob.size > targetBytes && format.value === 'image/png') {
                error.value = 'PNG is lossless — to hit a target size, switch to JPG or WebP.'
            }
        } else {
            // binary search quality to reach the target size
            let lo = 0.05, hi = 0.95
            blob = await toBlob(canvas, format.value, hi)
            if (blob && blob.size > targetBytes) {
                for (let i = 0; i < 7; i++) {
                    const mid = (lo + hi) / 2
                    const attempt = await toBlob(canvas, format.value, mid)
                    if (!attempt) break
                    if (attempt.size > targetBytes) hi = mid
                    else { lo = mid; blob = attempt }
                }
                if (blob.size > targetBytes) blob = await toBlob(canvas, format.value, lo)
            }
        }

        if (!blob) throw new Error('Compression failed — your browser may not support this format.')

        resultBlob = blob
        newSize.value = blob.size
        outW.value = w
        outH.value = h
        if (previewUrl.value) URL.revokeObjectURL(previewUrl.value)
        previewUrl.value = URL.createObjectURL(blob)
        calculated.value = true
    } catch (e) {
        error.value = e.message || 'Something went wrong compressing that image.'
    } finally {
        working.value = false
    }
}

function download() {
    if (!resultBlob) return
    const a = document.createElement('a')
    a.href = URL.createObjectURL(resultBlob)
    a.download = outName.value
    a.click()
    URL.revokeObjectURL(a.href)
}

function clear() {
    sourceFile = null; resultBlob = null
    fileName.value = ''; targetKb.value = ''; maxWidth.value = ''
    originalSize.value = 0; newSize.value = 0
    origW.value = 0; origH.value = 0; outW.value = 0; outH.value = 0
    if (previewUrl.value) { URL.revokeObjectURL(previewUrl.value); previewUrl.value = '' }
    error.value = ''; calculated.value = false
    if (fileInput.value) fileInput.value.value = ''
}
</script>

<style scoped>
.drop-zone {
    border: 3px dashed #0a0a0a;
    background: #fff;
    padding: 28px 20px;
    text-align: center;
    cursor: pointer;
    margin-bottom: 12px;
    transition: background 0.08s;
}
.drop-zone:hover, .drop-zone.over { background: #ddd6ff; }
.hidden-input { display: none; }
.drop-title {
    font-family: 'Space Grotesk', sans-serif;
    font-size: 18px;
    font-weight: 700;
    letter-spacing: -0.02em;
    word-break: break-all;
}
.drop-sub {
    font-family: 'Space Mono', monospace;
    font-size: 10px;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.1em;
    opacity: 0.4;
    margin-top: 6px;
}
.fmt-row { display: flex; gap: 8px; margin-bottom: 12px; }
.fmt-btn {
    flex: 1;
    padding: 10px;
    background: #fff;
    border: 3px solid #0a0a0a;
    font-family: 'Space Mono', monospace;
    font-size: 11px;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.12em;
    cursor: pointer;
}
.fmt-btn.active { background: #f5e642; }
.preview-img {
    margin-top: 12px;
    max-width: 240px;
    max-height: 180px;
    object-fit: contain;
    border: 3px solid #0a0a0a;
    box-shadow: 5px 5px 0 #0a0a0a;
    display: block;
}
.dl-btn {
    margin-top: 14px;
    width: 100%;
    padding: 12px 16px;
    background: #ddd6ff;
    border: 3px solid #0a0a0a;
    font-family: 'Space Mono', monospace;
    font-size: 11px;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.12em;
    cursor: pointer;
    text-align: left;
}
.dl-btn:hover { background: #cfc4ff; }
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
