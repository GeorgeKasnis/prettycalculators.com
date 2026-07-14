<template>
    <div>
        <div class="diff-inputs">
            <div class="txt-wrap">
                <div class="txt-label">Original text</div>
                <textarea v-model="textA" class="txt-input" rows="8" placeholder="Paste the first version…" spellcheck="false"></textarea>
            </div>
            <div class="txt-wrap">
                <div class="txt-label">Changed text</div>
                <textarea v-model="textB" class="txt-input" rows="8" placeholder="Paste the second version…" spellcheck="false"></textarea>
            </div>
        </div>

        <CalcBtn :showClear="compared" @click="compare" @clear="clear">Compare →</CalcBtn>

        <CalcOutput :show="compared" title="Differences">
            <CalcOutputCell label="Added"     :value="'+' + stats.added" />
            <CalcOutputCell label="Removed"   :value="'−' + stats.removed" />
            <CalcOutputCell label="Unchanged" :value="String(stats.same)" />
        </CalcOutput>

        <div v-if="compared" class="diff-result">
            <div v-if="!diff.length" class="diff-line same">The two texts are identical.</div>
            <div v-for="(line, i) in diff" :key="i" class="diff-line" :class="line.type">
                <span class="diff-sign">{{ line.type === 'added' ? '+' : line.type === 'removed' ? '−' : ' ' }}</span>{{ line.text || ' ' }}
            </div>
        </div>

        <div v-if="error" class="err-band">{{ error }}</div>
    </div>
</template>

<script setup>
const textA    = ref('')
const textB    = ref('')
const compared = ref(false)
const error    = ref('')
const diff     = ref([])
const stats    = ref({ added: 0, removed: 0, same: 0 })

// line-based LCS diff
function diffLines(a, b) {
    const n = a.length, m = b.length
    const dp = []
    for (let i = 0; i <= n; i++) dp.push(new Uint32Array(m + 1))
    for (let i = n - 1; i >= 0; i--) {
        for (let j = m - 1; j >= 0; j--) {
            dp[i][j] = a[i] === b[j] ? dp[i + 1][j + 1] + 1 : Math.max(dp[i + 1][j], dp[i][j + 1])
        }
    }
    const out = []
    let i = 0, j = 0
    while (i < n && j < m) {
        if (a[i] === b[j]) { out.push({ type: 'same', text: a[i] }); i++; j++ }
        else if (dp[i + 1][j] >= dp[i][j + 1]) { out.push({ type: 'removed', text: a[i] }); i++ }
        else { out.push({ type: 'added', text: b[j] }); j++ }
    }
    while (i < n) { out.push({ type: 'removed', text: a[i] }); i++ }
    while (j < m) { out.push({ type: 'added', text: b[j] }); j++ }
    return out
}

function compare() {
    error.value = ''
    const a = textA.value.split('\n')
    const b = textB.value.split('\n')
    if (!textA.value.trim() && !textB.value.trim()) { error.value = 'Paste some text in both boxes first.'; return }
    if (a.length * b.length > 4_000_000) { error.value = 'Texts are too long to compare here — try comparing a smaller section.'; return }

    const result = diffLines(a, b)
    diff.value = result
    stats.value = {
        added:   result.filter(l => l.type === 'added').length,
        removed: result.filter(l => l.type === 'removed').length,
        same:    result.filter(l => l.type === 'same').length,
    }
    compared.value = true
}

function clear() {
    textA.value = ''; textB.value = ''
    diff.value = []; error.value = ''
    compared.value = false
}
</script>

<style scoped>
.diff-inputs { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; margin-bottom: 12px; }
@media (max-width: 767px) { .diff-inputs { grid-template-columns: 1fr; } }
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
.diff-result {
    margin-top: 12px;
    border: 3px solid #0a0a0a;
    background: #fff;
    font-family: 'Space Mono', monospace;
    font-size: 12px;
    line-height: 1.6;
    overflow-x: auto;
    max-height: 480px;
    overflow-y: auto;
}
.diff-line { padding: 1px 12px; white-space: pre-wrap; word-break: break-word; }
.diff-line.added   { background: #d4edda; }
.diff-line.removed { background: #ffd6d6; }
.diff-sign { display: inline-block; width: 16px; font-weight: 700; opacity: 0.6; }
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
