<template>
    <div>
        <CalcGenderToggle v-model="gender" />
        <CalcInputStack>
            <CalcInputRow label="Weight" unit="kg" v-model="weight" placeholder="e.g. 70" type="number" />
            <CalcInputRow label="Height" unit="cm" v-model="height" placeholder="e.g. 175" type="number" />
            <CalcInputRow label="Age" unit="yrs" v-model="age" placeholder="e.g. 25" type="number" />
        </CalcInputStack>
        <CalcBtn :showClear="calculated" @click="calculate" @clear="clear">Calculate →</CalcBtn>
        <CalcOutput :show="calculated" title="BMR" single>
            <CalcOutputCell label="Basal Metabolic Rate" :value="bmr" unit="kcal/day" />
        </CalcOutput>
    </div>
</template>

<script setup>
import { ref } from 'vue'

const gender = ref('male')
const weight = ref('')
const height = ref('')
const age = ref('')
const calculated = ref(false)
const bmr = ref('')

function calculate() {
    const w = parseFloat(weight.value)
    const h = parseFloat(height.value)
    const a = parseFloat(age.value)
    if (isNaN(w) || isNaN(h) || isNaN(a) || w <= 0 || h <= 0 || a <= 0) return
    const result = gender.value === 'male'
        ? 88.362 + 13.397 * w + 4.799 * h - 5.677 * a
        : 447.593 + 9.247 * w + 3.098 * h - 4.33 * a
    bmr.value = result.toFixed(0)
    calculated.value = true
}

function clear() {
    weight.value = ''
    height.value = ''
    age.value = ''
    calculated.value = false
}
</script>
