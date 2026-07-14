<template>
    <div>
        <div class="qr-wrap">
            <div class="qr-label">Text or URL</div>
            <textarea v-model="text" class="qr-input" rows="3" placeholder="e.g. https://prettycalculators.com" spellcheck="false"></textarea>
        </div>

        <div class="opt-row">
            <div class="opt-group">
                <div class="opt-label">Size</div>
                <div class="opt-btns">
                    <button v-for="s in sizes" :key="s" class="opt-btn" :class="{ active: size === s }" @click="size = s; if (generated) generate()">{{ s }}px</button>
                </div>
            </div>
            <div class="opt-group">
                <div class="opt-label">Error correction</div>
                <div class="opt-btns">
                    <button v-for="l in levels" :key="l.value" class="opt-btn" :class="{ active: level === l.value }" :title="l.title" @click="level = l.value; if (generated) generate()">{{ l.value }}</button>
                </div>
            </div>
        </div>

        <CalcBtn :showClear="generated" @click="generate" @clear="clear">Generate QR Code →</CalcBtn>

        <div v-if="generated" class="qr-result">
            <img :src="dataUrl" :width="displaySize" :height="displaySize" alt="Generated QR code" class="qr-img" />
        </div>
        <button v-if="generated" class="dl-btn" @click="download">Download PNG →</button>

        <div v-if="error" class="err-band">{{ error }}</div>
    </div>
</template>

<script setup>
const text      = ref('')
const size      = ref(300)
const level     = ref('M')
const generated = ref(false)
const dataUrl   = ref('')
const error     = ref('')

const sizes  = [200, 300, 500, 1000]
const levels = [
    { value: 'L', title: 'Low — 7% recoverable' },
    { value: 'M', title: 'Medium — 15% recoverable' },
    { value: 'Q', title: 'Quartile — 25% recoverable' },
    { value: 'H', title: 'High — 30% recoverable' },
]

const displaySize = computed(() => Math.min(size.value, 300))

async function generate() {
    error.value = ''
    if (!text.value.trim()) { error.value = 'Enter some text or a URL first.'; return }
    try {
        const QRCode = await import('qrcode')
        dataUrl.value = await QRCode.toDataURL(text.value.trim(), {
            width: size.value,
            margin: 2,
            errorCorrectionLevel: level.value,
            color: { dark: '#0a0a0a', light: '#ffffff' },
        })
        generated.value = true
    } catch (e) {
        error.value = e.message?.includes('too long') || e.message?.includes('code length overflow')
            ? 'That text is too long for a QR code. Shorten it or lower the error correction level.'
            : 'Could not generate a QR code from that input.'
    }
}

function download() {
    if (!dataUrl.value) return
    const a = document.createElement('a')
    a.href = dataUrl.value
    a.download = `qr-code-${size.value}px.png`
    a.click()
}

function clear() {
    text.value = ''
    dataUrl.value = ''; error.value = ''
    generated.value = false
}
</script>

<style scoped>
.qr-wrap {
    border: 3px solid #0a0a0a;
    background: #fff;
    margin-bottom: 12px;
    display: flex;
    flex-direction: column;
}
.qr-label {
    font-family: 'Space Mono', monospace;
    font-size: 10px;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.14em;
    opacity: 0.4;
    padding: 14px 20px 0;
}
.qr-input {
    font-family: 'Space Grotesk', sans-serif;
    font-size: 17px;
    font-weight: 600;
    color: #0a0a0a;
    background: transparent;
    border: none;
    outline: none;
    padding: 8px 20px 14px;
    letter-spacing: -0.02em;
    width: 100%;
    box-sizing: border-box;
    resize: vertical;
}
.qr-input::placeholder { color: rgba(10,10,10,0.18); font-weight: 400; }
.qr-input:focus { color: #5c3bef; }
.opt-row { display: flex; gap: 12px; margin-bottom: 12px; flex-wrap: wrap; }
.opt-group { flex: 1; min-width: 180px; }
.opt-label {
    font-family: 'Space Mono', monospace;
    font-size: 9px;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.12em;
    opacity: 0.4;
    margin-bottom: 6px;
}
.opt-btns { display: flex; gap: 6px; }
.opt-btn {
    flex: 1;
    padding: 8px 4px;
    background: #fff;
    border: 3px solid #0a0a0a;
    font-family: 'Space Mono', monospace;
    font-size: 10px;
    font-weight: 700;
    cursor: pointer;
}
.opt-btn.active { background: #f5e642; }
.qr-result {
    margin-top: 14px;
    border: 3px solid #0a0a0a;
    background: #fff;
    box-shadow: 5px 5px 0 #0a0a0a;
    padding: 16px;
    display: flex;
    justify-content: center;
}
.qr-img { image-rendering: pixelated; max-width: 100%; height: auto; }
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
