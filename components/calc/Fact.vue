<template>
    <div class="cf-fact">
        <span class="cf-label">{{ label }}</span>
        <span class="cf-value">{{ value }}<span v-if="unit" class="cf-unit">{{ unit }}</span></span>
    </div>
</template>

<script setup>
defineProps({
    label: { type: String, required: true },
    value: { type: String, required: true },
    unit:  String,
})
</script>

<style scoped>
.cf-fact {
    display: flex;
    flex-direction: column;
    gap: 4px;
    padding-bottom: 14px;
    border-bottom: 1.5px solid rgba(10, 10, 10, 0.18);
}
.cf-fact:last-child {
    border-bottom: none;
    padding-bottom: 0;
}
.cf-label {
    font-family: 'Space Mono', monospace;
    font-size: 10px;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.12em;
    opacity: 0.55;
}
.cf-value {
    font-size: 17px;
    font-weight: 700;
    letter-spacing: -0.03em;
    line-height: 1.25;
}
.cf-unit {
    font-family: 'Space Mono', monospace;
    font-size: 11px;
    font-weight: 700;
    opacity: 0.45;
    margin-left: 3px;
    letter-spacing: 0.06em;
}
</style>
