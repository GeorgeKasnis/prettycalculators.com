<template>
    <div class="conv-wrap">
        <!-- Inches → CM -->
        <div class="conv-section">
            <div class="conv-label">Inches</div>
            <div class="conv-input-row">
                <input
                    v-model="inches"
                    class="conv-input"
                    type="number"
                    inputmode="decimal"
                    placeholder="e.g. 12"
                    @input="fromInches"
                />
                <span class="conv-unit">in</span>
            </div>
        </div>

        <div class="conv-divider">
            <div class="conv-divider-line" />
            <span class="conv-divider-icon">↕</span>
            <div class="conv-divider-line" />
        </div>

        <!-- CM → Inches -->
        <div class="conv-section">
            <div class="conv-label">Centimetres</div>
            <div class="conv-input-row">
                <input
                    v-model="cm"
                    class="conv-input"
                    type="number"
                    inputmode="decimal"
                    placeholder="e.g. 30.48"
                    @input="fromCm"
                />
                <span class="conv-unit">cm</span>
            </div>
        </div>
    </div>

    <!-- Reference table -->
    <div v-if="inches || cm" class="conv-table">
        <div class="conv-table-head">Quick Reference</div>
        <div class="conv-table-row conv-table-row--header">
            <span>Inches</span>
            <span>Centimetres</span>
            <span>Common use</span>
        </div>
        <div v-for="row in REFS" :key="row.in" class="conv-table-row">
            <span>{{ row.in }}"</span>
            <span>{{ row.cm }} cm</span>
            <span class="conv-ref-note">{{ row.note }}</span>
        </div>
    </div>
</template>

<script setup>
const inches = ref('')
const cm     = ref('')

const REFS = [
    { in: 1,    cm: '2.54',   note: '1 inch' },
    { in: 6,    cm: '15.24',  note: 'Half a foot' },
    { in: 12,   cm: '30.48',  note: '1 foot' },
    { in: 36,   cm: '91.44',  note: '1 yard' },
    { in: 72,   cm: '182.88', note: "6 ft (avg. male height)" },
]

function fmt(n) { return parseFloat(n.toFixed(4)).toString() }

function fromInches() {
    const v = parseFloat(inches.value)
    cm.value = isNaN(v) ? '' : fmt(v * 2.54)
}

function fromCm() {
    const v = parseFloat(cm.value)
    inches.value = isNaN(v) ? '' : fmt(v / 2.54)
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
