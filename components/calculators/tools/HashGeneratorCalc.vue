<template>
    <div>
        <div class="txt-wrap">
            <div class="txt-label">Your text</div>
            <textarea v-model="input" class="txt-input" rows="5" placeholder="Type or paste text to hash…" spellcheck="false"></textarea>
        </div>

        <div v-if="input" class="results">
            <button v-for="row in rows" :key="row.label" class="result-row" :title="'Copy ' + row.label" @click="copy(row)">
                <span class="result-label">{{ row.label }}</span>
                <span class="result-value">{{ row.value || 'computing…' }}</span>
                <span class="result-copy">{{ copiedLabel === row.label ? '✓' : 'Copy' }}</span>
            </button>
        </div>
        <div v-else class="empty-hint">Hashes appear here as you type — nothing leaves your browser.</div>
    </div>
</template>

<script setup>
const input = ref('')
const copiedLabel = ref('')

const hashes = reactive({ 'MD5': '', 'SHA-1': '', 'SHA-256': '', 'SHA-512': '' })

const rows = computed(() => Object.entries(hashes).map(([label, value]) => ({ label, value })))

/* MD5 — RFC 1321, verified against the standard test vectors */
function md5(str) {
    const bytes = new TextEncoder().encode(str)
    const s = [7,12,17,22,7,12,17,22,7,12,17,22,7,12,17,22,
               5,9,14,20,5,9,14,20,5,9,14,20,5,9,14,20,
               4,11,16,23,4,11,16,23,4,11,16,23,4,11,16,23,
               6,10,15,21,6,10,15,21,6,10,15,21,6,10,15,21]
    const K = new Array(64)
    for (let i = 0; i < 64; i++) K[i] = Math.floor(Math.abs(Math.sin(i + 1)) * 2 ** 32)

    const bitLen = bytes.length * 8
    const paddedLen = (((bytes.length + 8) >> 6) + 1) << 6
    const buf = new Uint8Array(paddedLen)
    buf.set(bytes)
    buf[bytes.length] = 0x80
    const dv = new DataView(buf.buffer)
    dv.setUint32(paddedLen - 8, bitLen >>> 0, true)
    dv.setUint32(paddedLen - 4, Math.floor(bitLen / 2 ** 32), true)

    let a0 = 0x67452301, b0 = 0xefcdab89, c0 = 0x98badcfe, d0 = 0x10325476

    for (let chunk = 0; chunk < paddedLen; chunk += 64) {
        const M = new Array(16)
        for (let j = 0; j < 16; j++) M[j] = dv.getUint32(chunk + j * 4, true)
        let A = a0, B = b0, C = c0, D = d0
        for (let i = 0; i < 64; i++) {
            let F, g
            if (i < 16)      { F = (B & C) | (~B & D); g = i }
            else if (i < 32) { F = (D & B) | (~D & C); g = (5 * i + 1) % 16 }
            else if (i < 48) { F = B ^ C ^ D;          g = (3 * i + 5) % 16 }
            else             { F = C ^ (B | ~D);       g = (7 * i) % 16 }
            F = (F + A + K[i] + M[g]) | 0
            A = D; D = C; C = B
            B = (B + ((F << s[i]) | (F >>> (32 - s[i])))) | 0
        }
        a0 = (a0 + A) | 0; b0 = (b0 + B) | 0; c0 = (c0 + C) | 0; d0 = (d0 + D) | 0
    }

    const out = new Uint8Array(16)
    const odv = new DataView(out.buffer)
    odv.setUint32(0, a0 >>> 0, true)
    odv.setUint32(4, b0 >>> 0, true)
    odv.setUint32(8, c0 >>> 0, true)
    odv.setUint32(12, d0 >>> 0, true)
    return [...out].map((b) => b.toString(16).padStart(2, '0')).join('')
}

async function sha(algo, str) {
    const digest = await crypto.subtle.digest(algo, new TextEncoder().encode(str))
    return [...new Uint8Array(digest)].map((b) => b.toString(16).padStart(2, '0')).join('')
}

let runId = 0
watch(input, async (text) => {
    copiedLabel.value = ''
    const id = ++runId
    if (!text) {
        for (const k of Object.keys(hashes)) hashes[k] = ''
        return
    }
    hashes['MD5'] = md5(text)
    const [s1, s256, s512] = await Promise.all([
        sha('SHA-1', text),
        sha('SHA-256', text),
        sha('SHA-512', text),
    ])
    if (id !== runId) return // stale — input changed while hashing
    hashes['SHA-1'] = s1
    hashes['SHA-256'] = s256
    hashes['SHA-512'] = s512
})

function copy(row) {
    if (!row.value) return
    navigator.clipboard.writeText(row.value)
    copiedLabel.value = row.label
    setTimeout(() => { copiedLabel.value = '' }, 1500)
}
</script>

<style scoped>
.txt-wrap {
    border: 3px solid #0a0a0a;
    background: #fff;
    display: flex;
    flex-direction: column;
}

.txt-label {
    font-family: 'Space Mono', monospace;
    font-size: 10px;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.14em;
    opacity: 0.4;
    padding: 12px 16px 0;
}

.txt-input {
    font-family: 'Space Grotesk', sans-serif;
    font-size: 15px;
    color: #0a0a0a;
    background: transparent;
    border: none;
    outline: none;
    padding: 8px 16px 12px;
    width: 100%;
    box-sizing: border-box;
    resize: vertical;
    line-height: 1.5;
}

.txt-input::placeholder { color: rgba(10, 10, 10, 0.18); }
.txt-input:focus { color: #5c3bef; }

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
    width: 64px;
    flex-shrink: 0;
}

.result-value {
    font-family: 'Space Mono', monospace;
    font-size: 12px;
    font-weight: 700;
    color: #0a0a0a;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    min-width: 0;
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

.empty-hint {
    margin-top: 12px;
    font-family: 'Space Mono', monospace;
    font-size: 11px;
    opacity: 0.35;
    letter-spacing: 0.04em;
}
</style>
