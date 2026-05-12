<template>
    <div>
        <CalcInputStack>
            <CalcInputRow label="String / Sequence A" v-model="strA" placeholder="e.g. karolin" />
            <CalcInputRow label="String / Sequence B" v-model="strB" placeholder="e.g. kathrin" />
        </CalcInputStack>
        <div v-if="lengthWarning" class="hamming-warn">Strings must be the same length for Hamming distance.</div>
        <CalcBtn :showClear="calculated" @click="calculate" @clear="clear">Calculate →</CalcBtn>
        <CalcOutput :show="calculated" title="Hamming Distance">
            <CalcOutputCell label="Hamming Distance"    :value="distance" />
            <CalcOutputCell label="Similarity"          :value="similarity" />
            <CalcOutputCell label="Matching Positions"  :value="matching" />
            <CalcOutputCell label="Length"              :value="length" />
        </CalcOutput>
        <div v-if="calculated" class="diff-grid">
            <div class="diff-row diff-row--head">
                <span>Pos</span><span>A</span><span>B</span><span>Match</span>
            </div>
            <div
                v-for="(row, i) in diffRows"
                :key="i"
                class="diff-row"
                :class="row.match ? 'diff-row--ok' : 'diff-row--err'"
            >
                <span class="diff-pos">{{ i + 1 }}</span>
                <span class="diff-char">{{ row.a }}</span>
                <span class="diff-char">{{ row.b }}</span>
                <span class="diff-icon">{{ row.match ? '✓' : '✗' }}</span>
            </div>
        </div>
    </div>
</template>

<script setup>
const strA          = ref('')
const strB          = ref('')
const calculated    = ref(false)
const lengthWarning = ref(false)
const distance   = ref('')
const similarity = ref('')
const matching   = ref('')
const length     = ref('')
const diffRows   = ref([])

function calculate() {
    const a = strA.value
    const b = strB.value
    if (!a || !b) return
    if (a.length !== b.length) {
        lengthWarning.value = true
        calculated.value = false
        return
    }
    lengthWarning.value = false
    let dist = 0
    const rows = []
    for (let i = 0; i < a.length; i++) {
        const match = a[i] === b[i]
        if (!match) dist++
        rows.push({ a: a[i], b: b[i], match })
    }
    const matchCount = a.length - dist
    distance.value   = String(dist)
    similarity.value = ((matchCount / a.length) * 100).toFixed(1) + '%'
    matching.value   = `${matchCount} / ${a.length}`
    length.value     = String(a.length)
    diffRows.value   = rows
    calculated.value = true
}

function clear() {
    strA.value = strB.value = ''
    calculated.value = false
    lengthWarning.value = false
    diffRows.value = []
}
</script>

<style scoped>
.hamming-warn {
    font-family: 'Space Mono', monospace;
    font-size: 11px;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.08em;
    color: #c0392b;
    padding: 10px 0 4px;
    opacity: 0.85;
}

.diff-grid {
    margin-top: 16px;
    border: 3px solid #0a0a0a;
    overflow-x: auto;
}

.diff-row {
    display: grid;
    grid-template-columns: 48px 1fr 1fr 48px;
    border-top: 1px solid rgba(10,10,10,0.1);
    font-size: 13px;
}

.diff-row--head {
    font-family: 'Space Mono', monospace;
    font-size: 9px;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.1em;
    opacity: 0.4;
    background: rgba(10,10,10,0.03);
    border-top: none;
}

.diff-row > * {
    padding: 7px 12px;
}

.diff-row--ok  { background: rgba(39,174,96,0.07); }
.diff-row--err { background: rgba(192,57,43,0.07); }

.diff-pos  { font-family: 'Space Mono', monospace; font-size: 11px; opacity: 0.4; }
.diff-char { font-family: 'Space Mono', monospace; font-weight: 700; }
.diff-icon { font-weight: 700; }
.diff-row--ok  .diff-icon { color: #27ae60; }
.diff-row--err .diff-icon { color: #c0392b; }
</style>
