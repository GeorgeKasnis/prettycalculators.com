<template>
    <div>
        <div class="color-row">
            <div class="color-wrap">
                <div class="color-label">Text color</div>
                <div class="color-inner">
                    <input type="color" v-model="fg" class="color-pick" aria-label="Pick text color" />
                    <input type="text" v-model="fg" class="color-hex" spellcheck="false" maxlength="7" />
                </div>
            </div>
            <button class="swap-btn" title="Swap colors" @click="swap">⇄</button>
            <div class="color-wrap">
                <div class="color-label">Background color</div>
                <div class="color-inner">
                    <input type="color" v-model="bg" class="color-pick" aria-label="Pick background color" />
                    <input type="text" v-model="bg" class="color-hex" spellcheck="false" maxlength="7" />
                </div>
            </div>
        </div>

        <div class="preview" :style="{ color: safeFg, background: safeBg }">
            <div class="preview-large">Large text 24px — headings</div>
            <div class="preview-normal">Normal text 15px — this is how body copy looks at this contrast level.</div>
        </div>

        <CalcOutput :show="true" title="Contrast">
            <CalcOutputCell label="Ratio" :value="ratioLabel" />
            <CalcOutputCell label="AA normal (4.5:1)"  :value="ratio >= 4.5 ? 'Pass ✓' : 'Fail ✗'" />
            <CalcOutputCell label="AA large (3:1)"     :value="ratio >= 3 ? 'Pass ✓' : 'Fail ✗'" />
            <CalcOutputCell label="AAA normal (7:1)"   :value="ratio >= 7 ? 'Pass ✓' : 'Fail ✗'" />
            <CalcOutputCell label="AAA large (4.5:1)"  :value="ratio >= 4.5 ? 'Pass ✓' : 'Fail ✗'" />
        </CalcOutput>

        <div class="verdict-band" :style="{ background: verdictColor }">
            <span class="verdict-label">{{ verdict }}</span>
        </div>
    </div>
</template>

<script setup>
const fg = ref('#0a0a0a')
const bg = ref('#ddd6ff')

const HEX_RE = /^#([0-9a-f]{6}|[0-9a-f]{3})$/i

const safeFg = computed(() => (HEX_RE.test(fg.value.trim()) ? fg.value.trim() : '#0a0a0a'))
const safeBg = computed(() => (HEX_RE.test(bg.value.trim()) ? bg.value.trim() : '#ffffff'))

function expand(hex) {
    const h = hex.replace('#', '')
    return h.length === 3 ? h.split('').map(c => c + c).join('') : h
}

function luminance(hex) {
    const h = expand(hex)
    const chan = [0, 2, 4].map(i => {
        const c = parseInt(h.slice(i, i + 2), 16) / 255
        return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4)
    })
    return 0.2126 * chan[0] + 0.7152 * chan[1] + 0.0722 * chan[2]
}

const ratio = computed(() => {
    const l1 = luminance(safeFg.value)
    const l2 = luminance(safeBg.value)
    const [hi, lo] = l1 >= l2 ? [l1, l2] : [l2, l1]
    return (hi + 0.05) / (lo + 0.05)
})

const ratioLabel = computed(() => ratio.value.toFixed(2) + ':1')

const verdict = computed(() => {
    if (ratio.value >= 7)   return 'Excellent — passes every WCAG level'
    if (ratio.value >= 4.5) return 'Good — passes AA for all text, AAA for large text'
    if (ratio.value >= 3)   return 'Limited — only passes AA for large text (18px bold / 24px+)'
    return 'Fails WCAG — not accessible for text'
})

const verdictColor = computed(() => {
    if (ratio.value >= 4.5) return '#d4edda'
    if (ratio.value >= 3)   return '#f5e642'
    return '#ffd6d6'
})

function swap() {
    const tmp = fg.value
    fg.value = bg.value
    bg.value = tmp
}
</script>

<style scoped>
.color-row { display: flex; gap: 10px; align-items: stretch; margin-bottom: 12px; }
.color-wrap {
    flex: 1;
    border: 3px solid #0a0a0a;
    background: #fff;
}
.color-label {
    font-family: 'Space Mono', monospace;
    font-size: 10px;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.12em;
    opacity: 0.4;
    padding: 12px 16px 0;
}
.color-inner { display: flex; align-items: center; gap: 10px; padding: 8px 16px 12px; }
.color-pick {
    width: 44px;
    height: 36px;
    border: 3px solid #0a0a0a;
    padding: 0;
    background: none;
    cursor: pointer;
}
.color-hex {
    font-family: 'Space Mono', monospace;
    font-size: 16px;
    font-weight: 700;
    border: none;
    outline: none;
    width: 100%;
    text-transform: lowercase;
}
.color-hex:focus { color: #5c3bef; }
.swap-btn {
    align-self: center;
    width: 42px;
    height: 42px;
    border: 3px solid #0a0a0a;
    background: #f5e642;
    font-size: 18px;
    font-weight: 700;
    cursor: pointer;
    flex-shrink: 0;
}
.preview {
    border: 3px solid #0a0a0a;
    box-shadow: 5px 5px 0 #0a0a0a;
    padding: 18px 20px;
    margin-bottom: 14px;
}
.preview-large { font-family: 'Space Grotesk', sans-serif; font-size: 24px; font-weight: 700; letter-spacing: -0.02em; }
.preview-normal { font-size: 15px; margin-top: 6px; line-height: 1.5; }
.verdict-band {
    border: 3px solid #0a0a0a;
    margin-top: 12px;
    padding: 12px 20px;
    font-family: 'Space Grotesk', sans-serif;
    font-size: 15px;
    font-weight: 700;
    letter-spacing: -0.02em;
}
@media (max-width: 640px) { .color-row { flex-direction: column; } .swap-btn { align-self: flex-start; } }
</style>
