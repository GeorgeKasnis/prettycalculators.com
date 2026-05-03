<template>
    <div class="cb-wrap">
        <button class="cb-btn" @click="$emit('click')">
            <slot>Calculate →</slot>
        </button>
        <button v-if="showClear" class="cb-clear" type="button" @click="$emit('clear')">Clear</button>
    </div>
</template>

<script setup>
defineProps({ showClear: Boolean })
defineEmits(['click', 'clear'])
</script>

<style scoped>
.cb-wrap {
    display: flex;
    align-items: center;
    gap: 8px;
    margin-top: 4px;
}
.cb-btn {
    flex: 1;
    padding: 16px;
    background: #ffb3b3;
    color: #0a0a0a;
    font-family: 'Space Grotesk', sans-serif;
    font-size: 15px;
    font-weight: 700;
    letter-spacing: -0.02em;
    border: 3px solid #0a0a0a;
    cursor: pointer;
    box-shadow: 4px 4px 0 #0a0a0a;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 10px;
    transition: transform 0.08s, box-shadow 0.08s;
}
.cb-btn:hover  { transform: translate(-2px,-2px); box-shadow: 6px 6px 0 #0a0a0a; }
.cb-btn:active { transform: translate(2px,2px); box-shadow: none; }

.cb-clear {
    font-family: 'Space Mono', monospace;
    font-size: 10px;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.12em;
    background: none;
    border: none;
    color: #0a0a0a;
    opacity: 0.4;
    cursor: pointer;
    padding: 16px 8px;
    transition: opacity 0.1s;
}
.cb-clear:hover { opacity: 1; }

@media (max-width: 767px) {
    .cb-btn { font-size: 14px; padding: 14px; }
}
</style>
