<template>
    <div>
        <CalcGenderToggle v-model="gender" />
        <CalcInputStack>
            <template v-if="unit === 'metric'">
                <CalcInputRow label="Height" unit="cm" v-model="heightCm" placeholder="e.g. 175" type="number" />
            </template>
            <template v-else>
                <CalcInputRow label="Height (ft)" unit="ft" v-model="heightFt" placeholder="e.g. 5" type="number" />
                <CalcInputRow label="Height (in)" unit="in" v-model="heightIn" placeholder="e.g. 9" type="number" />
            </template>
        </CalcInputStack>
        <CalcBtn :showClear="calculated" @click="calculate" @clear="clear">Calculate →</CalcBtn>
        <CalcOutput :show="calculated" title="Ideal Weight" single>
            <CalcOutputCell
                label="Ideal Body Weight"
                :value="weight"
                :unit="unit === 'imperial' ? 'lbs' : 'kg'"
            />
        </CalcOutput>
    </div>
</template>

<script setup>
import { ref } from 'vue'

const { unit, ftInToCm, kgToLbs } = useUnit()

const gender    = ref('male')
const heightCm  = ref('')
const heightFt  = ref('')
const heightIn  = ref('')
const calculated = ref(false)
const weight     = ref('')

let mounted = false
onMounted(() => { mounted = true })
watch(unit, () => { if (mounted) clear() })

function calculate() {
    const hCm = unit.value === 'metric'
        ? parseFloat(heightCm.value)
        : ftInToCm(heightFt.value, heightIn.value)
    if (!hCm || hCm <= 0) return
    const inchesOver5Feet = Math.max(0, (hCm - 152.4) / 2.54)
    const wKg = gender.value === 'male'
        ? 48 + 2.7 * inchesOver5Feet
        : 45.5 + 2.2 * inchesOver5Feet
    weight.value = unit.value === 'imperial'
        ? kgToLbs(wKg).toFixed(1)
        : wKg.toFixed(1)
    calculated.value = true
}

function clear() {
    heightCm.value = heightFt.value = heightIn.value = ''
    calculated.value = false
}
</script>
