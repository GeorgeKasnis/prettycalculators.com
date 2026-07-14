<template>
    <div>
        <div class="json-wrap">
            <div class="json-label">JSON Input</div>
            <textarea v-model="input" class="json-input" rows="8" placeholder='{"paste":"your JSON here"}' spellcheck="false"></textarea>
        </div>

        <div class="opt-row">
            <button class="act-btn" @click="format(2)">Format (2 spaces)</button>
            <button class="act-btn" @click="format(4)">Format (4 spaces)</button>
            <button class="act-btn" @click="minify">Minify</button>
            <button class="act-btn danger" @click="clear">Clear</button>
        </div>

        <div v-if="valid === true" class="ok-band">✓ Valid JSON — {{ stats }}</div>
        <div v-if="valid === false" class="err-band">✗ {{ error }}</div>

        <div v-if="output" class="json-wrap out">
            <div class="json-label">Output</div>
            <textarea :value="output" class="json-input" rows="12" readonly spellcheck="false"></textarea>
        </div>
        <button v-if="output" class="copy-btn" @click="copyOutput">{{ copied ? 'Copied ✓' : 'Copy Output →' }}</button>
    </div>
</template>

<script setup>
const input  = ref('')
const output = ref('')
const valid  = ref(null)
const error  = ref('')
const copied = ref(false)

const stats = computed(() => {
    if (!output.value) return ''
    const bytes = new Blob([output.value]).size
    const lines = output.value.split('\n').length
    return `${lines} line${lines > 1 ? 's' : ''}, ${bytes < 1024 ? bytes + ' B' : (bytes / 1024).toFixed(1) + ' KB'}`
})

function positionToLineCol(text, pos) {
    const upTo = text.slice(0, pos)
    const line = upTo.split('\n').length
    const col = pos - upTo.lastIndexOf('\n')
    return { line, col }
}

function parseInput() {
    copied.value = false
    error.value = ''
    if (!input.value.trim()) {
        valid.value = false
        error.value = 'Paste some JSON first.'
        return null
    }
    try {
        const parsed = JSON.parse(input.value)
        valid.value = true
        return parsed
    } catch (e) {
        valid.value = false
        const m = e.message.match(/position (\d+)/)
        if (m) {
            const { line, col } = positionToLineCol(input.value, parseInt(m[1], 10))
            error.value = `${e.message} (line ${line}, column ${col})`
        } else {
            error.value = e.message
        }
        output.value = ''
        return null
    }
}

function format(indent) {
    const parsed = parseInput()
    if (parsed === null && valid.value === false) return
    output.value = JSON.stringify(parsed, null, indent)
}

function minify() {
    const parsed = parseInput()
    if (parsed === null && valid.value === false) return
    output.value = JSON.stringify(parsed)
}

function copyOutput() {
    if (!output.value) return
    navigator.clipboard.writeText(output.value)
    copied.value = true
}

function clear() {
    input.value = ''; output.value = ''
    valid.value = null; error.value = ''; copied.value = false
}
</script>

<style scoped>
.json-wrap {
    border: 3px solid #0a0a0a;
    background: #fff;
    margin-bottom: 12px;
    display: flex;
    flex-direction: column;
}
.json-wrap.out { margin-top: 12px; margin-bottom: 0; }
.json-label {
    font-family: 'Space Mono', monospace;
    font-size: 10px;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.14em;
    opacity: 0.4;
    padding: 14px 20px 0;
}
.json-input {
    font-family: 'Space Mono', monospace;
    font-size: 13px;
    font-weight: 400;
    color: #0a0a0a;
    background: transparent;
    border: none;
    outline: none;
    padding: 8px 20px 14px;
    width: 100%;
    box-sizing: border-box;
    resize: vertical;
    line-height: 1.5;
}
.json-input::placeholder { color: rgba(10,10,10,0.18); }
.json-input:focus { color: #5c3bef; }
.opt-row { display: flex; gap: 8px; flex-wrap: wrap; }
.act-btn {
    flex: 1;
    min-width: 120px;
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
.ok-band {
    margin-top: 12px;
    border: 3px solid #0a0a0a;
    background: #d4edda;
    padding: 12px 20px;
    font-family: 'Space Mono', monospace;
    font-size: 12px;
    font-weight: 700;
}
.err-band {
    margin-top: 12px;
    border: 3px solid #0a0a0a;
    background: #ffd6d6;
    padding: 12px 20px;
    font-family: 'Space Mono', monospace;
    font-size: 12px;
    font-weight: 700;
    word-break: break-word;
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
</style>
