<template>
    <div class="slot-outer">
    <section class="slot-section">
        <!-- Left: copy + result card -->
        <div class="slot-left">
            <div class="slot-eyebrow">Feeling lucky</div>
            <h2 class="slot-title">Spin the wheel.<br /><em>Pick a calculator at random.</em></h2>
            <p class="slot-sub">Pull the lever and let the slot decide your next tool. {{ CALCULATORS.length }} calculators on the reel.</p>
            <NuxtLink
                v-if="currentResult"
                :key="currentResult.url"
                class="slot-result"
                :to="currentResult.url"
                :style="{ '--c': currentResult.color }"
            >
                <span class="slot-result-swatch"></span>
                <span class="slot-result-body">
                    <span class="slot-result-cat">{{ currentResult.cat }}</span>
                    <span class="slot-result-name">{{ currentResult.name }}</span>
                </span>
                <span class="slot-result-arrow">Open →</span>
            </NuxtLink>
        </div>

        <!-- Right: machine -->
        <div class="slot-machine">
            <div class="slot-frame">
                <span class="slot-frame-label">★ Random pick ★</span>
                <div class="slot-window">
                    <div class="slot-reel" ref="reelRef">
                        <div
                            v-for="(calc, i) in reelItems"
                            :key="i"
                            class="slot-item"
                            :style="{ '--c': calc.color }"
                        >
                            <span class="slot-item-swatch"></span>
                            <span class="slot-item-name">{{ calc.name }}</span>
                        </div>
                    </div>
                    <div class="slot-selector"></div>
                </div>
            </div>
            <button
                class="slot-lever"
                :class="{ pulled: leverPulled }"
                :disabled="spinning"
                aria-label="Spin"
                @click="spin"
                @keydown.space.prevent="spin"
                @keydown.enter.prevent="spin"
            >
                <div class="slot-lever-track">
                    <div class="slot-lever-stick">
                        <div class="slot-lever-ball"></div>
                    </div>
                </div>
                <span class="slot-lever-label">Pull to spin</span>
            </button>

            <!-- Mobile spin button (replaces lever) -->
            <button class="slot-spin-btn" :disabled="spinning" @click="spin">
                {{ spinning ? 'Spinning…' : '★ Pull the lever' }}
            </button>
        </div>
    </section>
    </div>
</template>

<script setup>
const { otherCategories: allCategories } = useCategoryConfig('_')

const CALCULATORS = allCategories.flatMap(cat =>
    cat.tools.map(tool => ({
        cat:   cat.title,
        name:  tool.label,
        url:   tool.to,
        color: cat.color,
    }))
)

const ITEM_H      = 60
const REEL_COPIES = 6
const SPIN_MS     = 3200

const reelRef      = ref(null)
const spinning     = ref(false)
const leverPulled  = ref(false)
const lastIdx      = ref(-1)
const currentResult = ref(null)

const reelItems = computed(() => {
    const items = []
    for (let c = 0; c < REEL_COPIES; c++) {
        for (const calc of CALCULATORS) items.push(calc)
    }
    return items
})

onMounted(() => {
    const startIdx = CALCULATORS.length
    reelRef.value.style.transform = `translateY(${-(startIdx - 1) * ITEM_H}px)`
})

function spin() {
    if (spinning.value) return
    spinning.value = true
    currentResult.value = null
    leverPulled.value = true

    let target
    do { target = Math.floor(Math.random() * CALCULATORS.length) }
    while (CALCULATORS.length > 1 && target === lastIdx.value)
    lastIdx.value = target

    const finalIdx = CALCULATORS.length * 4 + target
    const targetY  = -(finalIdx - 1) * ITEM_H
    const startIdx = CALCULATORS.length

    const reel = reelRef.value
    reel.style.transition = 'none'
    reel.style.transform  = `translateY(${-(startIdx - 1) * ITEM_H}px)`
    reel.getBoundingClientRect()

    reel.style.transition = `transform ${SPIN_MS / 1000}s cubic-bezier(0.16, 0.84, 0.24, 1)`
    reel.style.transform  = `translateY(${targetY}px)`

    setTimeout(() => { leverPulled.value = false }, 600)
    setTimeout(() => {
        currentResult.value = CALCULATORS[target]
        spinning.value = false
    }, SPIN_MS + 100)
}
</script>

<style scoped>
.slot-outer {
    background: #0a0a0a;
    border-top: 3px solid #0a0a0a;
    border-bottom: 3px solid #0a0a0a;
}

.slot-section {
    display: grid;
    grid-template-columns: 1.05fr 1fr;
    color: #fafafa;
    max-width: 1400px;
    margin: 0 auto;
}

/* Left */
.slot-left {
    padding: 56px 32px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    border-right: 3px solid #0a0a0a;
    position: relative;
    overflow: hidden;
}
.slot-left::after {
    content: '?';
    position: absolute;
    right: -40px;
    bottom: -90px;
    font-size: 360px;
    font-weight: 700;
    line-height: 1;
    color: rgba(255,255,255,0.04);
    letter-spacing: -0.06em;
    pointer-events: none;
}
.slot-eyebrow {
    font-family: 'Space Mono', monospace;
    font-size: 11px;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.18em;
    color: #f5e642;
    margin-bottom: 14px;
    display: inline-flex;
    align-items: center;
    gap: 10px;
}
.slot-eyebrow::before {
    content: '';
    width: 6px;
    height: 6px;
    background: #f5e642;
}
.slot-title {
    font-size: 44px;
    font-weight: 700;
    letter-spacing: -0.04em;
    line-height: 1.05;
    color: #fafafa;
    max-width: 420px;
}
.slot-title em {
    font-style: normal;
    color: #ddd6ff;
}
.slot-sub {
    margin-top: 16px;
    font-size: 15px;
    opacity: 0.55;
    max-width: 380px;
    line-height: 1.5;
}

/* Result card */
.slot-result {
    margin-top: 28px;
    display: inline-flex;
    align-items: center;
    gap: 16px;
    background: #fafafa;
    color: #0a0a0a;
    border: 3px solid #0a0a0a;
    box-shadow: 6px 6px 0 var(--c, #ddd6ff);
    padding: 14px 16px 14px 14px;
    text-decoration: none;
    max-width: max-content;
    transition: transform 0.08s, box-shadow 0.08s;
    animation: slotPop 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
}
.slot-result:hover {
    transform: translate(-2px, -2px);
    box-shadow: 8px 8px 0 var(--c, #ddd6ff);
}
@keyframes slotPop {
    0%   { transform: scale(0.85); opacity: 0; }
    100% { transform: scale(1);    opacity: 1; }
}
.slot-result-swatch {
    width: 44px;
    height: 44px;
    background: var(--c);
    border: 2.5px solid #0a0a0a;
    flex-shrink: 0;
}
.slot-result-body {
    display: flex;
    flex-direction: column;
    gap: 2px;
}
.slot-result-cat {
    font-family: 'Space Mono', monospace;
    font-size: 9px;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.14em;
    opacity: 0.45;
}
.slot-result-name {
    font-size: 18px;
    font-weight: 700;
    letter-spacing: -0.01em;
    line-height: 1.1;
}
.slot-result-arrow {
    align-self: stretch;
    display: flex;
    align-items: center;
    padding: 0 8px 0 14px;
    margin-left: 8px;
    border-left: 2px solid #0a0a0a;
    font-family: 'Space Mono', monospace;
    font-size: 11px;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.1em;
}

/* Right: machine */
.slot-machine {
    padding: 48px 32px;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 28px;
}
.slot-frame {
    position: relative;
    background: #ddd6ff;
    border: 3px solid #0a0a0a;
    padding: 16px;
    box-shadow: 8px 8px 0 #f5e642;
}
.slot-frame-label {
    position: absolute;
    top: -13px;
    left: 50%;
    transform: translateX(-50%);
    background: #f5e642;
    color: #0a0a0a;
    border: 2.5px solid #0a0a0a;
    font-family: 'Space Mono', monospace;
    font-size: 10px;
    font-weight: 700;
    letter-spacing: 0.18em;
    padding: 3px 10px;
    text-transform: uppercase;
    white-space: nowrap;
}
.slot-window {
    width: 340px;
    height: 180px;
    overflow: hidden;
    position: relative;
    background: #fafafa;
    border: 2.5px solid #0a0a0a;
}
.slot-window::before,
.slot-window::after {
    content: '';
    position: absolute;
    left: 0;
    right: 0;
    height: 60px;
    pointer-events: none;
    z-index: 2;
}
.slot-window::before {
    top: 0;
    background: linear-gradient(to bottom, rgba(250,250,250,0.92), rgba(250,250,250,0));
}
.slot-window::after {
    bottom: 0;
    background: linear-gradient(to top, rgba(250,250,250,0.92), rgba(250,250,250,0));
}
.slot-selector {
    position: absolute;
    left: 0;
    right: 0;
    top: 60px;
    height: 60px;
    border-top: 3px solid #0a0a0a;
    border-bottom: 3px solid #0a0a0a;
    pointer-events: none;
    z-index: 4;
}
.slot-selector::before,
.slot-selector::after {
    content: '';
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    width: 0;
    height: 0;
    border-top: 8px solid transparent;
    border-bottom: 8px solid transparent;
}
.slot-selector::before {
    left: -3px;
    border-left: 12px solid #0a0a0a;
}
.slot-selector::after {
    right: -3px;
    border-right: 12px solid #0a0a0a;
}
.slot-reel {
    display: flex;
    flex-direction: column;
    will-change: transform;
}
.slot-item {
    height: 60px;
    display: flex;
    align-items: center;
    gap: 14px;
    padding: 0 22px;
    flex-shrink: 0;
    background: #fafafa;
}
.slot-item + .slot-item {
    border-top: 1.5px dashed rgba(10,10,10,0.12);
}
.slot-item-swatch {
    width: 20px;
    height: 20px;
    background: var(--c);
    border: 2px solid #0a0a0a;
    flex-shrink: 0;
}
.slot-item-name {
    font-size: 17px;
    font-weight: 700;
    letter-spacing: -0.01em;
    color: #0a0a0a;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}

/* Lever */
.slot-lever {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0;
    cursor: pointer;
    background: transparent;
    border: none;
    padding: 0;
    font-family: inherit;
    align-self: stretch;
    justify-content: flex-end;
}
.slot-lever-track {
    width: 14px;
    height: 200px;
    background: rgba(255,255,255,0.08);
    border: 2px solid #333;
    border-radius: 8px;
    position: relative;
    display: flex;
    align-items: flex-start;
    justify-content: center;
}
.slot-lever-stick {
    width: 8px;
    height: 110px;
    background: linear-gradient(to right, #888, #ccc 50%, #666);
    border-radius: 4px 4px 0 0;
    margin-top: 8px;
    position: relative;
    transition: height 0.5s cubic-bezier(0.34, 1.56, 0.64, 1);
}
.slot-lever-ball {
    position: absolute;
    top: -20px;
    left: 50%;
    transform: translateX(-50%);
    width: 38px;
    height: 38px;
    border-radius: 50%;
    background: radial-gradient(circle at 30% 30%, #ff6b6b, #c41e1e 70%);
    border: 3px solid #0a0a0a;
    box-shadow: inset -3px -4px 0 rgba(0,0,0,0.25);
    transition: transform 0.5s cubic-bezier(0.34, 1.56, 0.64, 1);
}
.slot-lever:hover .slot-lever-ball { transform: translate(-50%, -3px) scale(1.05); }
.slot-lever.pulled .slot-lever-stick { height: 20px; }
.slot-lever.pulled .slot-lever-ball  { transform: translate(-50%, 80px); }
.slot-lever-label {
    margin-top: 16px;
    font-family: 'Space Mono', monospace;
    font-size: 11px;
    font-weight: 700;
    letter-spacing: 0.18em;
    color: rgba(255,255,255,0.55);
    text-transform: uppercase;
    white-space: nowrap;
}
.slot-lever:hover .slot-lever-label { color: #f5e642; }
.slot-lever:disabled { cursor: not-allowed; }
.slot-lever:disabled .slot-lever-label { opacity: 0.4; }

/* Mobile spin button — hidden on desktop */
.slot-spin-btn { display: none; }

/* Big screens: cluster content toward the center divider */
@media (min-width: 1200px) {
    .slot-left {
        padding-left: clamp(32px, 7vw, 110px);
        padding-right: 56px;
    }
    .slot-machine {
        justify-content: flex-start;
        padding-left: 56px;
        padding-right: clamp(32px, 7vw, 110px);
    }
    .slot-title { font-size: 52px; max-width: 480px; }
    .slot-sub   { font-size: 16px; max-width: 440px; }
}

/* Tablet: stack columns */
@media (max-width: 900px) {
    .slot-section { grid-template-columns: 1fr; }
    .slot-left    { border-right: none; border-bottom: 3px solid #0a0a0a; padding: 36px 24px; }
    .slot-machine { padding: 32px 24px; }
    .slot-window  { width: 340px; }
}

/* Mobile: full-width reel, replace lever with button */
@media (max-width: 600px) {
    .slot-left    { padding: 32px 20px; }
    .slot-title   { font-size: 32px; }
    .slot-machine {
        flex-direction: column;
        align-items: stretch;
        padding: 24px 20px 32px;
        gap: 0;
    }
    .slot-frame   { width: 100%; }
    .slot-window  { width: 100%; }
    .slot-lever   { display: none; }
    .slot-spin-btn {
        display: flex;
        align-items: center;
        justify-content: center;
        margin-top: 20px;
        width: 100%;
        padding: 16px;
        background: #f5e642;
        color: #0a0a0a;
        border: 3px solid #0a0a0a;
        box-shadow: 5px 5px 0 rgba(255,255,255,0.15);
        font-family: 'Space Mono', monospace;
        font-size: 13px;
        font-weight: 700;
        text-transform: uppercase;
        letter-spacing: 0.12em;
        cursor: pointer;
        transition: transform 0.08s, box-shadow 0.08s;
    }
    .slot-spin-btn:hover  { transform: translate(-2px, -2px); box-shadow: 7px 7px 0 rgba(255,255,255,0.15); }
    .slot-spin-btn:active { transform: translate(2px, 2px);   box-shadow: 3px 3px 0 rgba(255,255,255,0.15); }
    .slot-spin-btn:disabled { opacity: 0.5; cursor: not-allowed; transform: none; }
}
</style>
