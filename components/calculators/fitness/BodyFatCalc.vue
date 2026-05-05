<template>
    <div>
        <CalcGenderToggle v-model="gender" />
        <CalcInputStack>
            <CalcInputRow
                label="Height"
                :unit="unit === 'metric' ? 'cm' : 'in'"
                v-model="height"
                :placeholder="unit === 'metric' ? 'e.g. 175' : 'e.g. 69'"
                type="number"
            />
            <CalcInputRow
                label="Neck Circumference"
                :unit="unit === 'metric' ? 'cm' : 'in'"
                v-model="neck"
                :placeholder="unit === 'metric' ? 'e.g. 38' : 'e.g. 15'"
                type="number"
            />
            <CalcInputRow
                label="Waist Circumference"
                :unit="unit === 'metric' ? 'cm' : 'in'"
                v-model="waist"
                :placeholder="unit === 'metric' ? 'e.g. 80' : 'e.g. 32'"
                type="number"
            />
            <CalcInputRow
                v-if="gender === 'female'"
                label="Hip Circumference"
                :unit="unit === 'metric' ? 'cm' : 'in'"
                v-model="hip"
                :placeholder="unit === 'metric' ? 'e.g. 95' : 'e.g. 38'"
                type="number"
            />
        </CalcInputStack>
        <CalcBtn :showClear="calculated" @click="calculate" @clear="clear">Calculate →</CalcBtn>
        <CalcOutput :show="calculated" title="Body Fat" single>
            <CalcOutputCell label="Body Fat Percentage" :value="bodyFat" unit="%" />
        </CalcOutput>
    </div>
</template>

<script setup>
import { ref, watch } from 'vue'

const { unit, inToCm } = useUnit()

const gender = ref('male')
const height = ref('')
const neck   = ref('')
const waist  = ref('')
const hip    = ref('')
const calculated = ref(false)
const bodyFat    = ref('')

watch(gender, () => {
    calculated.value = false
    hip.value = ''
})

let mounted = false
onMounted(() => { mounted = true })
watch(unit, () => { if (mounted) clear() })

function toCm(val) {
    return unit.value === 'metric' ? parseFloat(val) : inToCm(val)
}

function calculate() {
    const h = toCm(height.value)
    const n = toCm(neck.value)
    const w = toCm(waist.value)
    if (!h || !n || !w || h <= 0 || n <= 0 || w <= 0) return
    let result
    if (gender.value === 'male') {
        result = 495 / (1.0324 - 0.19077 * Math.log10(w - n) + 0.15456 * Math.log10(h)) - 450
    } else {
        const hp = toCm(hip.value)
        if (!hp || hp <= 0) return
        result = 495 / (1.29579 - 0.35004 * Math.log10(w + hp - n) + 0.221 * Math.log10(h)) - 450
    }
    if (isNaN(result) || result <= 0) return
    bodyFat.value = result.toFixed(1)
    calculated.value = true
}

function clear() {
    height.value = neck.value = waist.value = hip.value = ''
    calculated.value = false
}
</script>
