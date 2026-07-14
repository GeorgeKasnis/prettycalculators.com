<template>
    <div>
        <div class="txt-wrap">
            <div class="txt-label">CSV input (first row = headers)</div>
            <textarea v-model="input" class="txt-input" rows="7" placeholder="name,age,city&#10;Maria,29,Athens&#10;Nikos,34,Patras" spellcheck="false"></textarea>
        </div>

        <div class="opt-row">
            <button v-for="d in delimiters" :key="d.value" class="opt-btn" :class="{ active: delimiter === d.value }" @click="delimiter = d.value">{{ d.label }}</button>
            <button class="opt-btn" :class="{ active: parseNumbers }" @click="parseNumbers = !parseNumbers">Parse numbers</button>
        </div>

        <CalcBtn :showClear="converted" @click="convert" @clear="clear">Convert to JSON →</CalcBtn>

        <CalcOutput :show="converted" title="Converted">
            <CalcOutputCell label="Rows"    :value="String(rowCount)" />
            <CalcOutputCell label="Columns" :value="String(colCount)" />
        </CalcOutput>

        <div v-if="output" class="txt-wrap out">
            <div class="txt-label">JSON output</div>
            <textarea :value="output" class="txt-input mono" rows="10" readonly spellcheck="false"></textarea>
        </div>
        <button v-if="output" class="copy-btn" @click="copyOutput">{{ copied ? 'Copied ✓' : 'Copy JSON →' }}</button>

        <div v-if="error" class="err-band">{{ error }}</div>
    </div>
</template>

<script setup>
const input     = ref('')
const output    = ref('')
const delimiter = ref(',')
const parseNumbers = ref(true)
const converted = ref(false)
const copied    = ref(false)
const error     = ref('')
const rowCount  = ref(0)
const colCount  = ref(0)

const delimiters = [
    { label: 'Comma',     value: ',' },
    { label: 'Semicolon', value: ';' },
    { label: 'Tab',       value: '\t' },
]

// RFC-4180-style parser: handles quoted fields, embedded delimiters and newlines
function parseCsv(text, delim) {
    const rows = []
    let row = []
    let field = ''
    let inQuotes = false
    for (let i = 0; i < text.length; i++) {
        const c = text[i]
        if (inQuotes) {
            if (c === '"') {
                if (text[i + 1] === '"') { field += '"'; i++ }
                else inQuotes = false
            } else field += c
        } else if (c === '"') {
            inQuotes = true
        } else if (c === delim) {
            row.push(field); field = ''
        } else if (c === '\n' || c === '\r') {
            if (c === '\r' && text[i + 1] === '\n') i++
            row.push(field); field = ''
            rows.push(row); row = []
        } else {
            field += c
        }
    }
    if (field !== '' || row.length) { row.push(field); rows.push(row) }
    return rows.filter(r => r.length > 1 || (r.length === 1 && r[0].trim() !== ''))
}

function coerce(value) {
    if (!parseNumbers.value) return value
    const trimmed = value.trim()
    if (trimmed === '') return value
    if (trimmed === 'true') return true
    if (trimmed === 'false') return false
    if (trimmed === 'null') return null
    if (/^-?\d+(\.\d+)?([eE][+-]?\d+)?$/.test(trimmed)) return parseFloat(trimmed)
    return value
}

function convert() {
    error.value = ''; copied.value = false
    if (!input.value.trim()) { error.value = 'Paste some CSV first.'; return }

    const rows = parseCsv(input.value, delimiter.value)
    if (rows.length < 2) { error.value = 'Need at least a header row and one data row. Check the delimiter setting.'; return }

    const headers = rows[0].map((h, i) => h.trim() || `column_${i + 1}`)
    const objects = rows.slice(1).map(r => {
        const obj = {}
        headers.forEach((h, i) => { obj[h] = coerce(r[i] ?? '') })
        return obj
    })

    output.value = JSON.stringify(objects, null, 2)
    rowCount.value = objects.length
    colCount.value = headers.length
    converted.value = true
}

function copyOutput() {
    if (!output.value) return
    navigator.clipboard.writeText(output.value)
    copied.value = true
}

function clear() {
    input.value = ''; output.value = ''
    converted.value = false; copied.value = false
    error.value = ''
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
    font-size: 12px;
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
.txt-input::placeholder { color: rgba(10,10,10,0.18); }
.txt-input:focus { color: #5c3bef; }
.opt-row { display: flex; gap: 8px; margin-bottom: 12px; flex-wrap: wrap; }
.opt-btn {
    flex: 1;
    min-width: 90px;
    padding: 10px 8px;
    background: #fff;
    border: 3px solid #0a0a0a;
    font-family: 'Space Mono', monospace;
    font-size: 10px;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.08em;
    cursor: pointer;
    white-space: nowrap;
}
.opt-btn.active { background: #f5e642; }
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
