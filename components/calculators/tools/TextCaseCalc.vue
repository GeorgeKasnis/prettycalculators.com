<template>
    <div>
        <div class="txt-wrap">
            <div class="txt-label">Your text</div>
            <textarea v-model="input" class="txt-input" rows="5" placeholder="Type or paste text to convert…" spellcheck="false"></textarea>
        </div>

        <div class="case-grid">
            <button v-for="c in cases" :key="c.key" class="case-btn" :class="{ active: activeCase === c.key }" @click="apply(c.key)">{{ c.label }}</button>
        </div>

        <div v-if="output" class="txt-wrap out">
            <div class="txt-label">Result</div>
            <textarea :value="output" class="txt-input" rows="5" readonly spellcheck="false"></textarea>
        </div>
        <button v-if="output" class="copy-btn" @click="copyOutput">{{ copied ? 'Copied ✓' : 'Copy Result →' }}</button>
    </div>
</template>

<script setup>
const input      = ref('')
const output     = ref('')
const activeCase = ref('')
const copied     = ref(false)

const cases = [
    { key: 'upper',    label: 'UPPERCASE' },
    { key: 'lower',    label: 'lowercase' },
    { key: 'title',    label: 'Title Case' },
    { key: 'sentence', label: 'Sentence case' },
    { key: 'camel',    label: 'camelCase' },
    { key: 'pascal',   label: 'PascalCase' },
    { key: 'snake',    label: 'snake_case' },
    { key: 'kebab',    label: 'kebab-case' },
]

function words(str) {
    return str
        .replace(/([a-z0-9])([A-Z])/g, '$1 $2')
        .split(/[\s_\-]+/)
        .filter(Boolean)
}

const TITLE_MINOR = new Set(['a', 'an', 'the', 'and', 'but', 'or', 'nor', 'for', 'so', 'yet', 'at', 'by', 'in', 'of', 'on', 'to', 'up', 'as', 'per', 'via'])

function convert(key, str) {
    switch (key) {
        case 'upper': return str.toUpperCase()
        case 'lower': return str.toLowerCase()
        case 'sentence':
            return str.toLowerCase().replace(/(^\s*\w|[.!?]\s+\w)/g, m => m.toUpperCase())
        case 'title':
            return str.toLowerCase().split(/(\s+)/).map((w, i, arr) => {
                if (/^\s+$/.test(w) || !w) return w
                const isFirstOrLast = i === 0 || i === arr.length - 1
                if (!isFirstOrLast && TITLE_MINOR.has(w)) return w
                return w.charAt(0).toUpperCase() + w.slice(1)
            }).join('')
        case 'camel': {
            const ws = words(str).map(w => w.toLowerCase())
            return ws.map((w, i) => (i === 0 ? w : w.charAt(0).toUpperCase() + w.slice(1))).join('')
        }
        case 'pascal':
            return words(str).map(w => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase()).join('')
        case 'snake':
            return words(str).map(w => w.toLowerCase()).join('_')
        case 'kebab':
            return words(str).map(w => w.toLowerCase()).join('-')
        default: return str
    }
}

function apply(key) {
    copied.value = false
    activeCase.value = key
    output.value = input.value ? convert(key, input.value) : ''
}

watch(input, () => {
    if (activeCase.value) output.value = input.value ? convert(activeCase.value, input.value) : ''
})

function copyOutput() {
    if (!output.value) return
    navigator.clipboard.writeText(output.value)
    copied.value = true
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
.txt-input::placeholder { color: rgba(10,10,10,0.18); }
.txt-input:focus { color: #5c3bef; }
.case-grid {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 8px;
}
@media (max-width: 640px) { .case-grid { grid-template-columns: repeat(2, 1fr); } }
.case-btn {
    padding: 12px 6px;
    background: #fff;
    border: 3px solid #0a0a0a;
    font-family: 'Space Mono', monospace;
    font-size: 10px;
    font-weight: 700;
    letter-spacing: 0.04em;
    cursor: pointer;
    white-space: nowrap;
}
.case-btn.active { background: #f5e642; }
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
