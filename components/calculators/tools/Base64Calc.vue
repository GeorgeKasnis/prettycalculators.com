<template>
    <div>
        <div class="txt-wrap">
            <div class="txt-label">Input</div>
            <textarea v-model="input" class="txt-input" rows="6" placeholder="Paste text to encode, or Base64 to decode…" spellcheck="false"></textarea>
        </div>

        <div class="opt-row">
            <button class="act-btn" @click="encode">Encode →</button>
            <button class="act-btn" @click="decode">Decode →</button>
            <button class="act-btn danger" @click="clear">Clear</button>
        </div>

        <div v-if="output" class="txt-wrap out">
            <div class="txt-label">Output {{ mode ? `(${mode})` : '' }}</div>
            <textarea :value="output" class="txt-input" rows="6" readonly spellcheck="false"></textarea>
        </div>
        <button v-if="output" class="copy-btn" @click="copyOutput">{{ copied ? 'Copied ✓' : 'Copy Output →' }}</button>

        <div v-if="error" class="err-band">{{ error }}</div>
    </div>
</template>

<script setup>
const input  = ref('')
const output = ref('')
const mode   = ref('')
const error  = ref('')
const copied = ref(false)

function encode() {
    error.value = ''; copied.value = false
    if (!input.value) { error.value = 'Enter some text first.'; return }
    // UTF-8 safe: text -> bytes -> binary string -> base64
    const bytes = new TextEncoder().encode(input.value)
    let bin = ''
    bytes.forEach(b => { bin += String.fromCharCode(b) })
    output.value = btoa(bin)
    mode.value = 'encoded'
}

function decode() {
    error.value = ''; copied.value = false
    const raw = input.value.trim().replace(/\s+/g, '')
    if (!raw) { error.value = 'Paste a Base64 string first.'; return }
    try {
        const bin = atob(raw)
        const bytes = Uint8Array.from(bin, c => c.charCodeAt(0))
        output.value = new TextDecoder('utf-8', { fatal: false }).decode(bytes)
        mode.value = 'decoded'
    } catch {
        error.value = 'That is not valid Base64 — check for missing characters or extra symbols.'
        output.value = ''
        mode.value = ''
    }
}

function copyOutput() {
    if (!output.value) return
    navigator.clipboard.writeText(output.value)
    copied.value = true
}

function clear() {
    input.value = ''; output.value = ''
    mode.value = ''; error.value = ''; copied.value = false
}
</script>

<style scoped>
.txt-wrap {
    border: 3px solid #0a0a0a;
    background: #fff;
    margin-bottom: 12px;
    display: flex;
    flex-direction: column;
}
.txt-wrap.out { margin-top: 12px; margin-bottom: 0; }
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
    font-family: 'Space Mono', monospace;
    font-size: 13px;
    color: #0a0a0a;
    background: transparent;
    border: none;
    outline: none;
    padding: 8px 16px 12px;
    width: 100%;
    box-sizing: border-box;
    resize: vertical;
    line-height: 1.5;
    word-break: break-all;
}
.txt-input::placeholder { color: rgba(10,10,10,0.18); }
.txt-input:focus { color: #5c3bef; }
.opt-row { display: flex; gap: 8px; flex-wrap: wrap; }
.act-btn {
    flex: 1;
    min-width: 100px;
    padding: 12px 10px;
    background: #f5e642;
    border: 3px solid #0a0a0a;
    font-family: 'Space Mono', monospace;
    font-size: 10px;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.1em;
    cursor: pointer;
    box-shadow: 3px 3px 0 #0a0a0a;
}
.act-btn:hover { transform: translate(1px, 1px); box-shadow: 2px 2px 0 #0a0a0a; }
.act-btn.danger { background: #ffd6d6; }
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
