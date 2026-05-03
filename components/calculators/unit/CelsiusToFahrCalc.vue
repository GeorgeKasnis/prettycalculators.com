<template>
    <div>
        <CalcInputStack>
            <CalcInputRow label="Celsius" unit="°C" v-model="celsius" placeholder="e.g. 100" type="number" />
        </CalcInputStack>
        <CalcBtn :showClear="calculated" @click="calculate" @clear="clear">Calculate →</CalcBtn>
        <CalcOutput :show="calculated" title="Result" single>
            <CalcOutputCell label="Fahrenheit" :value="result" unit="°F" />
        </CalcOutput>
    </div>
</template>

<script setup>
import { ref } from 'vue'

const celsius = ref('')
const calculated = ref(false)
const result = ref('')

function calculate() {
    const c = parseFloat(celsius.value)
    if (celsius.value === '' || isNaN(c)) return
    result.value = ((c * 9) / 5 + 32).toFixed(1)
    calculated.value = true
}

function clear() {
    celsius.value = ''
    calculated.value = false
}
</script>
