<template>
    <div>
        <CalcInputStack>
            <CalcInputRow label="Percentage" unit="%" v-model="percent" placeholder="e.g. 15" type="number" />
            <CalcInputRow label="Of Number" v-model="number" placeholder="e.g. 200" type="number" />
        </CalcInputStack>
        <CalcBtn :showClear="calculated" @click="calculate" @clear="clear">Calculate →</CalcBtn>
        <CalcOutput :show="calculated" title="Result" single>
            <CalcOutputCell label="Result" :value="result" />
        </CalcOutput>
    </div>
</template>

<script setup>
import { ref } from 'vue'

const percent = ref('')
const number = ref('')
const calculated = ref(false)
const result = ref('')

function calculate() {
    if (percent.value === '' || number.value === '') return
    const p = parseFloat(percent.value)
    const n = parseFloat(number.value)
    if (isNaN(p) || isNaN(n)) return
    const r = (p / 100) * n
    result.value = isNaN(r) ? '' : +r.toFixed(6) + ''
    calculated.value = true
}

function clear() {
    percent.value = ''
    number.value = ''
    calculated.value = false
}
</script>
