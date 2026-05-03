<template>
    <div>
        <CalcInputStack>
            <CalcInputRow label="Fahrenheit" unit="°F" v-model="fahrenheit" placeholder="e.g. 212" type="number" />
        </CalcInputStack>
        <CalcBtn :showClear="calculated" @click="calculate" @clear="clear">Calculate →</CalcBtn>
        <CalcOutput :show="calculated" title="Result" single>
            <CalcOutputCell label="Celsius" :value="result" unit="°C" />
        </CalcOutput>
    </div>
</template>

<script setup>
import { ref } from 'vue'

const fahrenheit = ref('')
const calculated = ref(false)
const result = ref('')

function calculate() {
    const f = parseFloat(fahrenheit.value)
    if (fahrenheit.value === '' || isNaN(f)) return
    result.value = (((f - 32) * 5) / 9).toFixed(1)
    calculated.value = true
}

function clear() {
    fahrenheit.value = ''
    calculated.value = false
}
</script>
