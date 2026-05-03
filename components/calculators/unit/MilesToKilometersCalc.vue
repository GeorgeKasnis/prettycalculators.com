<template>
    <div>
        <CalcInputStack>
            <CalcInputRow label="Miles" unit="mi" v-model="miles" placeholder="e.g. 10" type="number" />
        </CalcInputStack>
        <CalcBtn :showClear="calculated" @click="calculate" @clear="clear">Calculate →</CalcBtn>
        <CalcOutput :show="calculated" title="Result" single>
            <CalcOutputCell label="Kilometers" :value="result" unit="km" />
        </CalcOutput>
    </div>
</template>

<script setup>
import { ref } from 'vue'

const miles = ref('')
const calculated = ref(false)
const result = ref('')

function calculate() {
    const m = parseFloat(miles.value)
    if (miles.value === '' || isNaN(m) || m < 0) return
    result.value = (m * 1.60934).toFixed(2)
    calculated.value = true
}

function clear() {
    miles.value = ''
    calculated.value = false
}
</script>
