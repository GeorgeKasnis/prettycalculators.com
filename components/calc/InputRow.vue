<template>
    <div class="ci-row" :class="{ 'ci-has-unit': !!unit }">
        <div class="ci-cell">
            <label v-if="label" :for="inputId" class="ci-label">{{ label }}</label>
            <input
                :id="inputId"
                class="ci-input"
                :type="type || 'number'"
                inputmode="decimal"
                :placeholder="placeholder"
                :min="min"
                :max="max"
                :step="step"
                :readonly="readonly"
                :value="modelValue"
                @input="$emit('update:modelValue', $event.target.value)"
            />
        </div>
        <div v-if="unit" class="ci-unit">{{ unit }}</div>
    </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
    label:      String,
    unit:       String,
    modelValue: [String, Number],
    placeholder: String,
    type:       String,
    min:        [String, Number],
    max:        [String, Number],
    step:       [String, Number],
    readonly:   Boolean,
    id:         String,
})
defineEmits(['update:modelValue'])

const inputId = computed(() => props.id || props.label?.toLowerCase().replace(/\s+/g, '-'))
</script>

<style scoped>
.ci-row {
    display: grid;
    grid-template-columns: 1fr;
    align-items: stretch;
    background: #fff;
}
.ci-row.ci-has-unit {
    grid-template-columns: 1fr 80px;
}

.ci-cell {
    padding: 14px 20px 16px;
    display: flex;
    flex-direction: column;
    gap: 4px;
    min-width: 0;
}

.ci-label {
    font-family: 'Space Mono', monospace;
    font-size: 10px;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.14em;
    opacity: 0.4;
    cursor: pointer;
}

.ci-input {
    font-family: 'Space Grotesk', sans-serif;
    font-size: 28px;
    font-weight: 700;
    letter-spacing: -0.03em;
    color: #0a0a0a;
    background: transparent;
    border: none;
    outline: none;
    width: 100%;
    min-width: 0;
    line-height: 1.1;
    padding: 0;
    -moz-appearance: textfield;
}
.ci-input::-webkit-outer-spin-button,
.ci-input::-webkit-inner-spin-button {
    -webkit-appearance: none;
    appearance: none;
}
.ci-input::placeholder { color: rgba(10, 10, 10, 0.18); }
.ci-input:focus { color: #5c3bef; outline: none; }

.ci-unit {
    background: #0a0a0a;
    color: #fff;
    display: flex;
    align-items: center;
    justify-content: center;
    font-family: 'Space Mono', monospace;
    font-size: 13px;
    font-weight: 700;
    letter-spacing: 0.08em;
    border-left: 3px solid #0a0a0a;
}

@media (max-width: 767px) {
    .ci-row.ci-has-unit { grid-template-columns: 1fr 60px; }
    .ci-cell { padding: 12px 16px 14px; }
    .ci-input { font-size: 22px; }
    .ci-unit { font-size: 11px; }
}
</style>
