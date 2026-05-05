<template>
    <div>
        <CalcGenderToggle v-model="gender" />
        <CalcInputStack>
            <template v-if="unit === 'metric'">
                <CalcInputRow label="Weight" unit="kg"  v-model="weightKg" placeholder="e.g. 70"  type="number" />
                <CalcInputRow label="Height" unit="cm"  v-model="heightCm" placeholder="e.g. 175" type="number" />
            </template>
            <template v-else>
                <CalcInputRow label="Weight"      unit="lbs" v-model="weightLbs" placeholder="e.g. 154" type="number" />
                <CalcInputRow label="Height (ft)" unit="ft"  v-model="heightFt"  placeholder="e.g. 5"   type="number" />
                <CalcInputRow label="Height (in)" unit="in"  v-model="heightIn"  placeholder="e.g. 9"   type="number" />
            </template>
            <CalcInputRow label="Age" unit="yrs" v-model="age" placeholder="e.g. 25" type="number" />
            <CalcSelectRow label="Activity Level" v-model="activity" :options="ACTIVITY_OPTIONS" />
        </CalcInputStack>
        <CalcBtn :showClear="calculated" @click="calculate" @clear="clear">Calculate →</CalcBtn>
        <CalcOutput :show="calculated" title="TDEE" single>
            <CalcOutputCell label="Total Daily Energy Expenditure" :value="tdee" unit="kcal/day" />
        </CalcOutput>
    </div>
</template>

<script setup>
import { ref } from 'vue'

const { unit, lbsToKg, ftInToCm } = useUnit()

const gender    = ref('male')
const weightKg  = ref('')
const weightLbs = ref('')
const heightCm  = ref('')
const heightFt  = ref('')
const heightIn  = ref('')
const age       = ref('')
const activity  = ref('')
const calculated = ref(false)
const tdee       = ref('')

const ACTIVITY_OPTIONS = [
    { value: '1.2',   label: 'Sedentary (little or no exercise)' },
    { value: '1.375', label: 'Lightly active (1–3 days/week)' },
    { value: '1.55',  label: 'Moderately active (3–5 days/week)' },
    { value: '1.725', label: 'Very active (6–7 days/week)' },
    { value: '1.9',   label: 'Extra active (physical job / hard training)' },
]

let mounted = false
onMounted(() => { mounted = true })
watch(unit, () => { if (mounted) clear() })

function calculate() {
    const w   = unit.value === 'metric' ? parseFloat(weightKg.value) : lbsToKg(weightLbs.value)
    const h   = unit.value === 'metric' ? parseFloat(heightCm.value) : ftInToCm(heightFt.value, heightIn.value)
    const a   = parseFloat(age.value)
    const act = parseFloat(activity.value)
    if (!w || !h || !a || !act || w <= 0 || h <= 0 || a <= 0) return
    const bmr = gender.value === 'male'
        ? 88.362 + 13.397 * w + 4.799 * h - 5.677 * a
        : 447.593 + 9.247 * w + 3.098 * h - 4.33 * a
    tdee.value = (bmr * act).toFixed(0)
    calculated.value = true
}

function clear() {
    weightKg.value = weightLbs.value = ''
    heightCm.value = heightFt.value = heightIn.value = ''
    age.value = activity.value = ''
    calculated.value = false
}
</script>
