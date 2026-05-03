<template>
    <div>
        <CalcInputStack>
            <CalcInputRow label="Body Weight" unit="kg" v-model="weight" placeholder="e.g. 70" type="number" />
        </CalcInputStack>
        <CalcBtn :showClear="calculated" @click="calculate" @clear="clear">Calculate →</CalcBtn>
        <CalcOutput :show="calculated" title="Daily Water Intake">
            <CalcOutputCell label="Millilitres" :value="ml" unit="ml" />
            <CalcOutputCell label="Litres" :value="liters" unit="L" />
        </CalcOutput>
    </div>
</template>

<script setup>
import { ref } from 'vue'

const weight = ref('')
const calculated = ref(false)
const ml = ref('')
const liters = ref('')

function calculate() {
    const w = parseFloat(weight.value)
    if (weight.value === '' || isNaN(w) || w <= 0) return
    ml.value = (w * 30).toFixed(0)
    liters.value = (w * 30 / 1000).toFixed(2)
    calculated.value = true
}

function clear() {
    weight.value = ''
    calculated.value = false
}
</script>
