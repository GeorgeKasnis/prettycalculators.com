<template>
    <div>
        <CalcInputStack>
            <CalcInputRow label="Kilometers" unit="km" v-model="kilometers" placeholder="e.g. 10" type="number" />
        </CalcInputStack>
        <CalcBtn :showClear="calculated" @click="calculate" @clear="clear">Calculate →</CalcBtn>
        <CalcOutput :show="calculated" title="Result" single>
            <CalcOutputCell label="Miles" :value="result" unit="mi" />
        </CalcOutput>
    </div>
</template>

<script setup>
import { ref } from 'vue'

const kilometers = ref('')
const calculated = ref(false)
const result = ref('')

function calculate() {
    const k = parseFloat(kilometers.value)
    if (kilometers.value === '' || isNaN(k) || k < 0) return
    result.value = (k / 1.60934).toFixed(2)
    calculated.value = true
}

function clear() {
    kilometers.value = ''
    calculated.value = false
}
</script>
