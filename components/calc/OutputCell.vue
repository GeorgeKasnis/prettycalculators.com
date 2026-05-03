<template>
    <div class="co-cell">
        <span class="co-cell-label">{{ label }}</span>
        <span class="co-cell-value">
            {{ value }}<span v-if="unit" class="co-cell-unit">{{ unit }}</span>
        </span>
    </div>
</template>

<script setup>
defineProps({
    label: { type: String, required: true },
    value: [String, Number],
    unit:  String,
})
</script>

<style scoped>
.co-cell {
    padding: 16px 20px;
    display: flex;
    flex-direction: column;
    gap: 4px;
    min-width: 0;
}
.co-cell-label {
    font-family: 'Space Mono', monospace;
    font-size: 10px;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.14em;
    opacity: 0.45;
}
.co-cell-value {
    font-size: 24px;
    font-weight: 700;
    letter-spacing: -0.03em;
    line-height: 1.1;
    font-variant-numeric: tabular-nums;
    color: #0a0a0a;
}
.co-cell-unit {
    font-family: 'Space Mono', monospace;
    font-size: 11px;
    font-weight: 700;
    opacity: 0.4;
    margin-left: 4px;
    letter-spacing: 0.08em;
}

@media (max-width: 767px) {
    .co-cell       { padding: 12px 16px; }
    .co-cell-value { font-size: 20px; }
}
</style>
