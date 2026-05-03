<template>
    <div>
        <CalcGenderToggle v-model="gender" />
        <CalcInputStack>
            <CalcInputRow label="Height" unit="cm" v-model="height" placeholder="e.g. 175" type="number" />
            <CalcInputRow label="Neck Circumference" unit="cm" v-model="neck" placeholder="e.g. 38" type="number" />
            <CalcInputRow label="Waist Circumference" unit="cm" v-model="waist" placeholder="e.g. 80" type="number" />
            <CalcInputRow v-if="gender === 'female'" label="Hip Circumference" unit="cm" v-model="hip" placeholder="e.g. 95" type="number" />
        </CalcInputStack>
        <CalcBtn :showClear="calculated" @click="calculate" @clear="clear">Calculate →</CalcBtn>
        <CalcOutput :show="calculated" title="Body Fat" single>
            <CalcOutputCell label="Body Fat Percentage" :value="bodyFat" unit="%" />
        </CalcOutput>
    </div>
</template>

<script setup>
import { ref, watch } from 'vue'

const gender = ref('male')
const height = ref('')
const neck = ref('')
const waist = ref('')
const hip = ref('')
const calculated = ref(false)
const bodyFat = ref('')

watch(gender, () => {
    calculated.value = false
    hip.value = ''
})

function calculate() {
    const h = parseFloat(height.value)
    const n = parseFloat(neck.value)
    const w = parseFloat(waist.value)
    if (isNaN(h) || isNaN(n) || isNaN(w) || h <= 0 || n <= 0 || w <= 0) return
    let result
    if (gender.value === 'male') {
        result = 495 / (1.0324 - 0.19077 * Math.log10(w - n) + 0.15456 * Math.log10(h)) - 450
    } else {
        const hp = parseFloat(hip.value)
        if (isNaN(hp) || hp <= 0) return
        result = 495 / (1.29579 - 0.35004 * Math.log10(w + hp - n) + 0.221 * Math.log10(h)) - 450
    }
    if (isNaN(result) || result <= 0) return
    bodyFat.value = result.toFixed(1)
    calculated.value = true
}

function clear() {
    height.value = ''
    neck.value = ''
    waist.value = ''
    hip.value = ''
    calculated.value = false
}
</script>
