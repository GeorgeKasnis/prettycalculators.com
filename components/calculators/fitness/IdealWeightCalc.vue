<template>
    <div>
        <CalcGenderToggle v-model="gender" />
        <CalcInputStack>
            <CalcInputRow label="Height" unit="cm" v-model="height" placeholder="e.g. 175" type="number" />
        </CalcInputStack>
        <CalcBtn :showClear="calculated" @click="calculate" @clear="clear">Calculate →</CalcBtn>
        <CalcOutput :show="calculated" title="Ideal Weight" single>
            <CalcOutputCell label="Ideal Body Weight" :value="weight" unit="kg" />
        </CalcOutput>
    </div>
</template>

<script setup>
import { ref } from 'vue'

const gender = ref('male')
const height = ref('')
const calculated = ref(false)
const weight = ref('')

function calculate() {
    const h = parseFloat(height.value)
    if (!height.value || isNaN(h) || h <= 0) return
    const inchesOver5Feet = Math.max(0, (h - 152.4) / 2.54)
    const w = gender.value === 'male'
        ? 48 + 2.7 * inchesOver5Feet
        : 45.5 + 2.2 * inchesOver5Feet
    weight.value = w.toFixed(1)
    calculated.value = true
}

function clear() {
    height.value = ''
    calculated.value = false
}
</script>
