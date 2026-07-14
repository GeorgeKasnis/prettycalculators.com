<template>
    <div>
        <CalcInputStack>
            <CalcInputRow label="Pixels" unit="px" v-model="px" placeholder="e.g. 16" type="number" />
        </CalcInputStack>
        <CalcBtn :showClear="calculated" @click="calculate" @clear="clear">Calculate →</CalcBtn>
        <CalcOutput :show="calculated" title="Result">
            <CalcOutputCell label="REM Value" :value="remResult" unit="rem" />
            <CalcOutputCell label="Base" value="16" unit="px" />
        </CalcOutput>
        <button v-if="calculated" class="copy-btn" @click="copyToClipboard">Copy {{ remResult }}rem →</button>
    </div>
</template>

<script setup>
import { ref } from 'vue'

const px = ref('')
const calculated = ref(false)
const remResult = ref('')

function calculate() {
    if (!px.value) return
    const val = parseFloat(px.value) / 16
    if (isNaN(val)) return
    remResult.value = +val.toFixed(6) + ''
    calculated.value = true
}

function clear() {
    px.value = ''
    calculated.value = false
}

function copyToClipboard() {
    if (!remResult.value) return
    navigator.clipboard.writeText(`${remResult.value}rem`)
}
</script>

<style scoped>
.copy-btn {
    margin-top: 10px;
    width: 100%;
    padding: 12px 16px;
    background: none;
    border: 3px solid #0a0a0a;
    font-family: 'Space Mono', monospace;
    font-size: 11px;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.12em;
    cursor: pointer;
    text-align: left;
    transition: background 0.08s;
}
.copy-btn:hover {
    background: rgba(10, 10, 10, 0.05);
}
</style>
