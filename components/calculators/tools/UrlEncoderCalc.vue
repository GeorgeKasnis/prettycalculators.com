<template>
    <div>
        <div class="txt-wrap">
            <div class="txt-label">Input</div>
            <textarea v-model="input" class="txt-input" rows="5" placeholder="Paste text or a URL…" spellcheck="false"></textarea>
        </div>

        <div class="opt-row">
            <button class="act-btn" @click="encodeComponent">Encode →</button>
            <button class="act-btn" @click="encodeFull">Encode URL →</button>
            <button class="act-btn" @click="decode">Decode →</button>
            <button class="act-btn danger" @click="clear">Clear</button>
        </div>

        <div class="hint-band">
            <strong>Encode</strong> escapes everything (for query-string values) · <strong>Encode URL</strong> keeps :/?&= intact (for whole URLs)
        </div>

        <div v-if="output" class="txt-wrap out">
            <div class="txt-label">Output {{ mode ? `(${mode})` : '' }}</div>
            <textarea :value="output" class="txt-input" rows="5" readonly spellcheck="false"></textarea>
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

function encodeComponent() {
    error.value = ''; copied.value = false
    if (!input.value) { error.value = 'Enter some text first.'; return }
    output.value = encodeURIComponent(input.value)
    mode.value = 'component-encoded'
}

function encodeFull() {
    error.value = ''; copied.value = false
    if (!input.value) { error.value = 'Enter a URL first.'; return }
    output.value = encodeURI(input.value)
    mode.value = 'URL-encoded'
}

function decode() {
    error.value = ''; copied.value = false
    if (!input.value) { error.value = 'Paste an encoded string first.'; return }
    try {
        output.value = decodeURIComponent(input.value.replace(/\+/g, '%20'))
        mode.value = 'decoded'
    } catch {
        error.value = 'That string contains an invalid percent-sequence (like a lone %) and cannot be decoded.'
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
.hint-band {
    margin-top: 10px;
    border: 3px solid #0a0a0a;
    background: #fff;
    padding: 10px 16px;
    font-family: 'Space Mono', monospace;
    font-size: 10px;
    opacity: 0.75;
    line-height: 1.6;
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
