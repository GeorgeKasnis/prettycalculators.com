<template>
    <div class="conv-wrap">
        <!-- KG → LBS -->
        <div class="conv-section">
            <div class="conv-label">Kilograms</div>
            <div class="conv-input-row">
                <input
                    v-model="kg"
                    class="conv-input"
                    type="number"
                    inputmode="decimal"
                    placeholder="e.g. 70"
                    @input="fromKg"
                />
                <span class="conv-unit">kg</span>
            </div>
        </div>

        <div class="conv-divider">
            <div class="conv-divider-line" />
            <span class="conv-divider-icon">↕</span>
            <div class="conv-divider-line" />
        </div>

        <!-- LBS → KG -->
        <div class="conv-section">
            <div class="conv-label">Pounds</div>
            <div class="conv-input-row">
                <input
                    v-model="lbs"
                    class="conv-input"
                    type="number"
                    inputmode="decimal"
                    placeholder="e.g. 154.3"
                    @input="fromLbs"
                />
                <span class="conv-unit">lbs</span>
            </div>
        </div>

        <!-- Stones display (UK) -->
        <div v-if="kg" class="conv-extra">
            <span class="conv-extra-label">Also:</span>
            <span class="conv-extra-value">{{ stones }} st {{ stoneLbs }} lb</span>
            <span class="conv-extra-note">(stones & pounds)</span>
        </div>
    </div>

    <!-- Reference table -->
    <div v-if="kg || lbs" class="conv-table">
        <div class="conv-table-head">Quick Reference</div>
        <div class="conv-table-row conv-table-row--header">
            <span>Kilograms</span>
            <span>Pounds</span>
            <span>Common use</span>
        </div>
        <div v-for="row in REFS" :key="row.kg" class="conv-table-row">
            <span>{{ row.kg }} kg</span>
            <span>{{ row.lbs }} lbs</span>
            <span class="conv-ref-note">{{ row.note }}</span>
        </div>
    </div>
</template>

<script setup>
const kg  = ref('')
const lbs = ref('')

const REFS = [
    { kg: 1,   lbs: '2.205',   note: '1 kilogram' },
    { kg: 50,  lbs: '110.2',   note: 'Light adult' },
    { kg: 70,  lbs: '154.3',   note: 'Average adult' },
    { kg: 80,  lbs: '176.4',   note: 'Above average' },
    { kg: 100, lbs: '220.5',   note: '100 kg milestone' },
]

const stones = computed(() => {
    const v = parseFloat(kg.value)
    if (isNaN(v)) return ''
    return Math.floor(v / 6.35029)
})

const stoneLbs = computed(() => {
    const v = parseFloat(kg.value)
    if (isNaN(v)) return ''
    const totalLbs = v * 2.20462
    return (totalLbs % 14).toFixed(1)
})

function fmt(n) { return parseFloat(n.toFixed(4)).toString() }

function fromKg() {
    const v = parseFloat(kg.value)
    lbs.value = isNaN(v) ? '' : fmt(v * 2.20462)
}

function fromLbs() {
    const v = parseFloat(lbs.value)
    kg.value = isNaN(v) ? '' : fmt(v / 2.20462)
}
</script>

<style scoped>
.conv-wrap {
    border: 3px solid #0a0a0a;
    background: #fff;
    margin-bottom: 18px;
}

.conv-section {
    padding: 16px 20px 18px;
}

.conv-label {
    font-family: 'Space Mono', monospace;
    font-size: 10px;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.14em;
    opacity: 0.4;
    margin-bottom: 6px;
}

.conv-input-row {
    display: flex;
    align-items: baseline;
    gap: 10px;
}

.conv-input {
    font-family: 'Space Grotesk', sans-serif;
    font-size: 36px;
    font-weight: 700;
    letter-spacing: -0.04em;
    color: #0a0a0a;
    background: transparent;
    border: none;
    outline: none;
    flex: 1;
    min-width: 0;
    -moz-appearance: textfield;
    padding: 0;
    line-height: 1.1;
}
.conv-input::-webkit-outer-spin-button,
.conv-input::-webkit-inner-spin-button { -webkit-appearance: none; }
.conv-input::placeholder { color: rgba(10,10,10,0.15); }
.conv-input:focus { color: #5c3bef; }

.conv-unit {
    font-family: 'Space Mono', monospace;
    font-size: 13px;
    font-weight: 700;
    opacity: 0.35;
    flex-shrink: 0;
}

.conv-divider {
    display: flex;
    align-items: center;
    gap: 10px;
    padding: 0 20px;
    border-top: 3px solid #0a0a0a;
    border-bottom: 3px solid #0a0a0a;
    background: rgba(10,10,10,0.03);
}
.conv-divider-line { flex: 1; height: 1px; background: rgba(10,10,10,0.15); }
.conv-divider-icon {
    font-size: 18px;
    font-weight: 700;
    color: rgba(10,10,10,0.3);
    padding: 8px 0;
    flex-shrink: 0;
}

.conv-extra {
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 10px 20px;
    border-top: 3px solid #0a0a0a;
    background: #f5e642;
}
.conv-extra-label {
    font-family: 'Space Mono', monospace;
    font-size: 9px;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.12em;
    opacity: 0.5;
}
.conv-extra-value {
    font-family: 'Space Grotesk', sans-serif;
    font-size: 15px;
    font-weight: 700;
    letter-spacing: -0.02em;
}
.conv-extra-note {
    font-family: 'Space Mono', monospace;
    font-size: 10px;
    opacity: 0.45;
}

/* Reference table */
.conv-table {
    margin-top: 16px;
    border: 3px solid #0a0a0a;
}
.conv-table-head {
    background: #0a0a0a;
    color: #f5e642;
    font-family: 'Space Mono', monospace;
    font-size: 10px;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.14em;
    padding: 10px 16px;
}
.conv-table-row {
    display: grid;
    grid-template-columns: 1fr 1fr 2fr;
    border-top: 1px solid rgba(10,10,10,0.1);
    padding: 9px 16px;
    font-size: 13px;
    font-weight: 500;
}
.conv-table-row--header {
    font-family: 'Space Mono', monospace;
    font-size: 9px;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.1em;
    opacity: 0.4;
    background: rgba(10,10,10,0.03);
}
.conv-ref-note { opacity: 0.5; font-size: 12px; }

@media (max-width: 767px) {
    .conv-input { font-size: 28px; }
}
</style>
