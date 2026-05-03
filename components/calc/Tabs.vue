<template>
    <div class="ct-tabs">
        <button
            v-for="tab in tabs"
            :key="tab.value"
            class="ct-tab"
            :class="{ 'ct-active': modelValue === tab.value }"
            @click="$emit('update:modelValue', tab.value)"
        >{{ tab.label }}</button>
    </div>
</template>

<script setup>
defineProps({
    tabs: { type: Array, required: true },
    modelValue: { type: String, required: true },
})
defineEmits(['update:modelValue'])
</script>

<style scoped>
.ct-tabs {
    display: flex;
    border: 3px solid #0a0a0a;
    margin-bottom: 22px;
}

.ct-tab {
    flex: 1;
    padding: 12px 16px;
    background: #fff;
    color: #0a0a0a;
    border: none;
    border-right: 3px solid #0a0a0a;
    cursor: pointer;
    font-family: 'Space Mono', monospace;
    font-size: 11px;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.14em;
    transition: background 0.1s, color 0.1s;
}
.ct-tab:last-child { border-right: none; }
.ct-tab:hover:not(.ct-active) { background: rgba(10,10,10,0.05); }
.ct-active { background: #0a0a0a; color: #ddd6ff; }
</style>
