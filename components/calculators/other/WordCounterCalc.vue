<template>
    <div>
        <div class="wc-wrap">
            <div class="wc-label">Paste or type your text</div>
            <textarea v-model="text" class="wc-textarea" placeholder="Start typing or paste text here…" rows="8" spellcheck="true" />
        </div>

        <div v-if="text.trim()" class="wc-grid">
            <div class="wc-stat">
                <div class="wc-stat-value">{{ stats.words }}</div>
                <div class="wc-stat-label">Words</div>
            </div>
            <div class="wc-stat">
                <div class="wc-stat-value">{{ stats.chars }}</div>
                <div class="wc-stat-label">Characters</div>
            </div>
            <div class="wc-stat">
                <div class="wc-stat-value">{{ stats.charsNoSpace }}</div>
                <div class="wc-stat-label">No Spaces</div>
            </div>
            <div class="wc-stat">
                <div class="wc-stat-value">{{ stats.sentences }}</div>
                <div class="wc-stat-label">Sentences</div>
            </div>
            <div class="wc-stat">
                <div class="wc-stat-value">{{ stats.paragraphs }}</div>
                <div class="wc-stat-label">Paragraphs</div>
            </div>
            <div class="wc-stat wc-stat--highlight">
                <div class="wc-stat-value">{{ stats.readTime }}</div>
                <div class="wc-stat-label">Read Time</div>
            </div>
            <div class="wc-stat">
                <div class="wc-stat-value">{{ stats.speakTime }}</div>
                <div class="wc-stat-label">Speak Time</div>
            </div>
            <div class="wc-stat">
                <div class="wc-stat-value">{{ stats.uniqueWords }}</div>
                <div class="wc-stat-label">Unique Words</div>
            </div>
        </div>

        <div v-if="text.trim()" class="wc-clear-row">
            <button class="wc-clear" @click="text = ''">Clear text</button>
        </div>
    </div>
</template>

<script setup>
const text = ref('')

function fmtTime(seconds) {
    if (seconds < 60) return `${Math.ceil(seconds)}s`
    const m = Math.floor(seconds / 60)
    const s = Math.ceil(seconds % 60)
    return s === 0 ? `${m}m` : `${m}m ${s}s`
}

const stats = computed(() => {
    const t = text.value
    const words    = t.trim() === '' ? 0 : t.trim().split(/\s+/).length
    const chars    = t.length
    const charsNoSpace = t.replace(/\s/g, '').length
    const sentences = (t.match(/[.!?]+/g) || []).length || (words > 0 ? 1 : 0)
    const paragraphs = t.trim() === '' ? 0 : t.trim().split(/\n\s*\n+/).filter(p => p.trim()).length || 1
    const uniqueWords = words === 0 ? 0 : new Set(t.toLowerCase().match(/\b\w+\b/g) || []).size
    const readTime  = fmtTime((words / 238) * 60)  // 238 wpm average silent reading
    const speakTime = fmtTime((words / 130) * 60)  // 130 wpm average speaking rate
    return { words, chars, charsNoSpace, sentences, paragraphs, uniqueWords, readTime, speakTime }
})
</script>

<style scoped>
.wc-wrap {
    border: 3px solid #0a0a0a; background: #fff;
    margin-bottom: 18px; display: flex; flex-direction: column;
}
.wc-label {
    font-family: 'Space Mono', monospace; font-size: 10px; font-weight: 700;
    text-transform: uppercase; letter-spacing: 0.14em; opacity: 0.4; padding: 14px 20px 0;
}
.wc-textarea {
    font-family: 'Space Grotesk', sans-serif; font-size: 16px; font-weight: 500;
    color: #0a0a0a; background: transparent; border: none; outline: none;
    resize: vertical; padding: 10px 20px 16px; line-height: 1.65;
    -webkit-appearance: none; min-height: 180px;
}
.wc-textarea::placeholder { color: rgba(10,10,10,0.18); }
.wc-textarea:focus { color: #0a0a0a; }

.wc-grid {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    border: 3px solid #0a0a0a;
    margin-bottom: 12px;
}
.wc-stat {
    padding: 18px 16px 14px;
    border-right: 3px solid #0a0a0a;
    border-bottom: 3px solid #0a0a0a;
    background: #fff;
}
.wc-stat:nth-child(4n) { border-right: none; }
.wc-stat:nth-last-child(-n+4) { border-bottom: none; }
.wc-stat--highlight { background: #ddd6ff; }
.wc-stat-value {
    font-family: 'Space Grotesk', sans-serif; font-size: 28px; font-weight: 700;
    letter-spacing: -0.04em; line-height: 1; margin-bottom: 4px;
}
.wc-stat-label {
    font-family: 'Space Mono', monospace; font-size: 9px; font-weight: 700;
    text-transform: uppercase; letter-spacing: 0.1em; opacity: 0.45;
}

.wc-clear-row { display: flex; justify-content: flex-end; }
.wc-clear {
    font-family: 'Space Mono', monospace; font-size: 10px; font-weight: 700;
    text-transform: uppercase; letter-spacing: 0.1em; cursor: pointer;
    border: 3px solid #0a0a0a; background: #fff; padding: 8px 16px;
    transition: background 0.08s;
}
.wc-clear:hover { background: #ffd6d6; }

@media (max-width: 767px) {
    .wc-grid { grid-template-columns: repeat(2, 1fr); }
    .wc-stat { border-right: 3px solid #0a0a0a; border-bottom: 3px solid #0a0a0a; }
    .wc-stat:nth-child(4n) { border-right: 3px solid #0a0a0a; }
    .wc-stat:nth-last-child(-n+4) { border-bottom: 3px solid #0a0a0a; }
    .wc-stat:nth-child(2n) { border-right: none; }
    .wc-stat:nth-last-child(-n+2) { border-bottom: none; }
}
</style>
