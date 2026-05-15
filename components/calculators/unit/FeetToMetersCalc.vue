<template>
    <div class="conv-wrap">
        <!-- Feet + Inches → Meters -->
        <div class="conv-section">
            <div class="conv-label">Feet &amp; Inches</div>
            <div class="conv-input-row">
                <input v-model="feet" class="conv-input" type="number" inputmode="decimal" placeholder="5" @input="fromFeet" />
                <span class="conv-unit">ft</span>
                <input v-model="inches" class="conv-input conv-input--sm" type="number" inputmode="decimal" placeholder="11" @input="fromFeet" />
                <span class="conv-unit">in</span>
            </div>
        </div>

        <div class="conv-divider">
            <div class="conv-divider-line" />
            <span class="conv-divider-icon">↕</span>
            <div class="conv-divider-line" />
        </div>

        <!-- Meters → Feet -->
        <div class="conv-section">
            <div class="conv-label">Meters</div>
            <div class="conv-input-row">
                <input v-model="meters" class="conv-input" type="number" inputmode="decimal" placeholder="1.8" @input="fromMeters" />
                <span class="conv-unit">m</span>
            </div>
        </div>

        <!-- Extra: cm -->
        <div v-if="meters" class="conv-extra">
            <span class="conv-extra-label">Also:</span>
            <span class="conv-extra-value">{{ cm }} cm</span>
            <span class="conv-extra-note">(centimeters)</span>
        </div>
    </div>

    <!-- Reference table -->
    <div v-if="meters || feet" class="conv-table">
        <div class="conv-table-head">Quick Reference</div>
        <div class="conv-table-row conv-table-row--header">
            <span>Feet</span><span>Meters</span><span>Common use</span>
        </div>
        <div v-for="row in REFS" :key="row.ft" class="conv-table-row">
            <span>{{ row.ft }}</span>
            <span>{{ row.m }} m</span>
            <span class="conv-ref-note">{{ row.note }}</span>
        </div>
    </div>
</template>

<script setup>
const feet   = ref('')
const inches = ref('')
const meters = ref('')

const REFS = [
    { ft: "5'0\"",  m: '1.524', note: 'Short adult' },
    { ft: "5'6\"",  m: '1.676', note: 'Average woman (US)' },
    { ft: "5'9\"",  m: '1.753', note: 'Average man (US)' },
    { ft: "6'0\"",  m: '1.829', note: 'Tall adult' },
    { ft: "6'6\"",  m: '1.981', note: 'NBA average height' },
]

const cm = computed(() => {
    const v = parseFloat(meters.value)
    return isNaN(v) ? '' : (v * 100).toFixed(1)
})

function fmt(n) { return parseFloat(n.toFixed(4)).toString() }

function fromFeet() {
    const ft = parseFloat(feet.value) || 0
    const inc = parseFloat(inches.value) || 0
    const totalFt = ft + inc / 12
    meters.value = (ft === 0 && inc === 0) ? '' : fmt(totalFt * 0.3048)
}

function fromMeters() {
    const m = parseFloat(meters.value)
    if (isNaN(m)) { feet.value = ''; inches.value = ''; return }
    const totalFt = m / 0.3048
    feet.value   = String(Math.floor(totalFt))
    inches.value = fmt((totalFt % 1) * 12)
}
</script>

<style scoped>
.conv-wrap { border: 3px solid #0a0a0a; background: #fff; margin-bottom: 18px; }
.conv-section { padding: 16px 20px 18px; }
.conv-label {
    font-family: 'Space Mono', monospace; font-size: 10px; font-weight: 700;
    text-transform: uppercase; letter-spacing: 0.14em; opacity: 0.4; margin-bottom: 6px;
}
.conv-input-row { display: flex; align-items: baseline; gap: 10px; }
.conv-input {
    font-family: 'Space Grotesk', sans-serif; font-size: 36px; font-weight: 700;
    letter-spacing: -0.04em; color: #0a0a0a; background: transparent;
    border: none; outline: none; flex: 1; min-width: 0;
    -moz-appearance: textfield; padding: 0; line-height: 1.1;
}
.conv-input--sm { max-width: 80px; flex: 0 0 80px; }
.conv-input::-webkit-outer-spin-button, .conv-input::-webkit-inner-spin-button { -webkit-appearance: none; }
.conv-input::placeholder { color: rgba(10,10,10,0.15); }
.conv-input:focus { color: #5c3bef; }
.conv-unit { font-family: 'Space Mono', monospace; font-size: 13px; font-weight: 700; opacity: 0.35; flex-shrink: 0; }
.conv-divider {
    display: flex; align-items: center; gap: 10px; padding: 0 20px;
    border-top: 3px solid #0a0a0a; border-bottom: 3px solid #0a0a0a;
    background: rgba(10,10,10,0.03);
}
.conv-divider-line { flex: 1; height: 1px; background: rgba(10,10,10,0.15); }
.conv-divider-icon { font-size: 18px; font-weight: 700; color: rgba(10,10,10,0.3); padding: 8px 0; flex-shrink: 0; }
.conv-extra {
    display: flex; align-items: center; gap: 8px; padding: 10px 20px;
    border-top: 3px solid #0a0a0a; background: #f5e642;
}
.conv-extra-label { font-family: 'Space Mono', monospace; font-size: 9px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.12em; opacity: 0.5; }
.conv-extra-value { font-family: 'Space Grotesk', sans-serif; font-size: 15px; font-weight: 700; letter-spacing: -0.02em; }
.conv-extra-note { font-family: 'Space Mono', monospace; font-size: 10px; opacity: 0.45; }
.conv-table { margin-top: 16px; border: 3px solid #0a0a0a; }
.conv-table-head { background: #0a0a0a; color: #f5e642; font-family: 'Space Mono', monospace; font-size: 10px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.14em; padding: 10px 16px; }
.conv-table-row { display: grid; grid-template-columns: 1fr 1fr 2fr; border-top: 1px solid rgba(10,10,10,0.1); padding: 9px 16px; font-size: 13px; font-weight: 500; }
.conv-table-row--header { font-family: 'Space Mono', monospace; font-size: 9px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.1em; opacity: 0.4; background: rgba(10,10,10,0.03); }
.conv-ref-note { opacity: 0.5; font-size: 12px; }
@media (max-width: 767px) { .conv-input { font-size: 28px; } .conv-input--sm { font-size: 28px; max-width: 70px; flex: 0 0 70px; } }
</style>
