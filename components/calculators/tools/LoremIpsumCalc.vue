<template>
    <div>
        <CalcInputStack>
            <CalcInputRow label="How many" v-model="count" placeholder="e.g. 3" type="number" />
        </CalcInputStack>

        <div class="opt-row">
            <button v-for="u in units" :key="u.value" class="opt-btn" :class="{ active: unit === u.value }" @click="unit = u.value">{{ u.label }}</button>
        </div>
        <div class="opt-row">
            <button class="opt-btn" :class="{ active: startClassic }" @click="startClassic = !startClassic">Start with "Lorem ipsum dolor…"</button>
        </div>

        <CalcBtn :showClear="generated" @click="generate" @clear="clear">Generate →</CalcBtn>

        <div v-if="generated" class="out-wrap">
            <div class="out-label">{{ stats }}</div>
            <div class="out-text">
                <p v-for="(p, i) in paragraphs" :key="i">{{ p }}</p>
            </div>
        </div>
        <button v-if="generated" class="copy-btn" @click="copyText">{{ copied ? 'Copied ✓' : 'Copy Text →' }}</button>

        <div v-if="error" class="err-band">{{ error }}</div>
    </div>
</template>

<script setup>
const count = ref('3')
const unit  = ref('paragraphs')
const startClassic = ref(true)
const paragraphs = ref([])
const generated  = ref(false)
const copied     = ref(false)
const error      = ref('')

const units = [
    { label: 'Paragraphs', value: 'paragraphs' },
    { label: 'Sentences',  value: 'sentences' },
    { label: 'Words',      value: 'words' },
]

const WORDS = ('lorem ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua enim ad minim veniam quis nostrud exercitation ullamco laboris nisi aliquip ex ea commodo consequat duis aute irure in reprehenderit voluptate velit esse cillum eu fugiat nulla pariatur excepteur sint occaecat cupidatat non proident sunt culpa qui officia deserunt mollit anim id est laborum perspiciatis unde omnis iste natus error voluptatem accusantium doloremque laudantium totam rem aperiam eaque ipsa quae ab illo inventore veritatis quasi architecto beatae vitae dicta explicabo nemo ipsam quia voluptas aspernatur aut odit fugit consequuntur magni dolores eos ratione sequi nesciunt neque porro quisquam dolorem adipisci numquam eius modi tempora incidunt magnam aliquam quaerat').split(' ')

const CLASSIC = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'

function randInt(max) {
    const buf = new Uint32Array(1)
    crypto.getRandomValues(buf)
    return buf[0] % max
}

function word() { return WORDS[randInt(WORDS.length)] }

function sentence() {
    const len = 8 + randInt(10)
    const ws = Array.from({ length: len }, word)
    let s = ws.join(' ')
    // sprinkle a comma in longer sentences
    if (len > 11) {
        const parts = s.split(' ')
        parts[Math.floor(len / 2)] += ','
        s = parts.join(' ')
    }
    return s.charAt(0).toUpperCase() + s.slice(1) + '.'
}

function paragraph() {
    return Array.from({ length: 4 + randInt(4) }, sentence).join(' ')
}

const stats = computed(() => {
    const text = paragraphs.value.join(' ')
    const words = text.split(/\s+/).filter(Boolean).length
    return `${paragraphs.value.length} paragraph${paragraphs.value.length > 1 ? 's' : ''} · ${words} words · ${text.length} characters`
})

function generate() {
    error.value = ''; copied.value = false
    const n = parseInt(count.value, 10)
    if (!n || n < 1 || n > 100) { error.value = 'Choose between 1 and 100.'; return }

    let out = []
    if (unit.value === 'paragraphs') {
        out = Array.from({ length: n }, paragraph)
    } else if (unit.value === 'sentences') {
        out = [Array.from({ length: n }, sentence).join(' ')]
    } else {
        const ws = Array.from({ length: n }, word)
        out = [ws.join(' ').charAt(0).toUpperCase() + ws.join(' ').slice(1) + '.']
    }

    if (startClassic.value && unit.value === 'paragraphs') {
        out[0] = CLASSIC + ' ' + out[0].split('. ').slice(1).join('. ')
    }

    paragraphs.value = out
    generated.value = true
}

function copyText() {
    if (!paragraphs.value.length) return
    navigator.clipboard.writeText(paragraphs.value.join('\n\n'))
    copied.value = true
}

function clear() {
    paragraphs.value = []
    generated.value = false
    copied.value = false
    error.value = ''
}
</script>

<style scoped>
.opt-row { display: flex; gap: 8px; margin-bottom: 12px; flex-wrap: wrap; }
.opt-btn {
    flex: 1;
    min-width: 100px;
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
.out-wrap {
    margin-top: 12px;
    border: 3px solid #0a0a0a;
    background: #fff;
}
.out-label {
    font-family: 'Space Mono', monospace;
    font-size: 10px;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.12em;
    opacity: 0.4;
    padding: 12px 16px 0;
}
.out-text {
    padding: 10px 16px 14px;
    font-size: 14px;
    line-height: 1.6;
    max-height: 360px;
    overflow-y: auto;
}
.out-text p { margin-bottom: 10px; }
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
