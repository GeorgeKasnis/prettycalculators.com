<template>
    <div class="cg-toggle">
        <button
            class="cg-btn"
            :class="{ 'cg-active': modelValue === 'male' }"
            @click="$emit('update:modelValue', 'male')"
        >MALE</button>
        <button
            class="cg-btn cg-btn-right"
            :class="{ 'cg-active': modelValue === 'female' }"
            @click="$emit('update:modelValue', 'female')"
        >FEMALE</button>
    </div>
</template>

<script setup>
defineProps({ modelValue: String })
defineEmits(['update:modelValue'])
</script>

<style scoped>
.cg-toggle {
    display: flex;
    border: 3px solid #0a0a0a;
    margin-bottom: 18px;
}

.cg-btn {
    flex: 1;
    padding: 12px 16px;
    background: #fff;
    color: #0a0a0a;
    border: none;
    cursor: pointer;
    font-family: 'Space Mono', monospace;
    font-size: 11px;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.12em;
    transition: background 0.1s, color 0.1s;
}
.cg-btn-right { border-left: 3px solid #0a0a0a; }
.cg-active { background: #0a0a0a; color: #ddd6ff; }
.cg-btn:not(.cg-active):hover { background: rgba(10,10,10,0.05); }
</style>
