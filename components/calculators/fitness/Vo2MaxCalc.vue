<template>
    <div>
        <CalcInputStack>
            <CalcInputRow label="Age" unit="yrs" v-model="age" placeholder="e.g. 30" type="number" />
            <CalcInputRow label="Resting Heart Rate" unit="bpm" v-model="restingHR" placeholder="e.g. 60" type="number" />
        </CalcInputStack>

        <CalcBtn :showClear="calculated" @click="calculate" @clear="clear">Calculate VO2 Max →</CalcBtn>

        <CalcOutput :show="calculated" title="VO2 Max" :color="categoryColor" :meta="fitnessLevel">
            <CalcOutputCell label="VO2 Max" :value="vo2max" unit="ml/kg/min" />
            <CalcOutputCell label="Fitness Level" :value="fitnessLevel" />
            <CalcOutputCell label="Max Heart Rate" :value="maxHR" unit="bpm" />
        </CalcOutput>
    </div>
</template>

<script setup>
const age       = ref('')
const restingHR = ref('')
const calculated    = ref(false)
const vo2max        = ref('')
const fitnessLevel  = ref('')
const maxHR         = ref('')
const categoryColor = ref('#ddd6ff')

const LEVELS = [
    { max: 30, label: 'Poor',        color: '#FF8E7A' },
    { max: 38, label: 'Fair',        color: '#FFD66B' },
    { max: 44, label: 'Good',        color: '#9FC5FF' },
    { max: 52, label: 'Excellent',   color: '#8FD89B' },
    { max: Infinity, label: 'Superior', color: '#ddd6ff' },
]

function calculate() {
    const a  = parseFloat(age.value)
    const hr = parseFloat(restingHR.value)
    if (!a || !hr || a <= 0 || hr <= 0 || hr >= 220) return

    const hmax = Math.round(220 - a)
    const score = 15 * (hmax / hr)

    maxHR.value = hmax
    vo2max.value = score.toFixed(1)

    const level = LEVELS.find(l => score < l.max)
    fitnessLevel.value  = level.label
    categoryColor.value = level.color
    calculated.value    = true
}

function clear() {
    age.value = restingHR.value = ''
    vo2max.value = fitnessLevel.value = maxHR.value = ''
    categoryColor.value = '#ddd6ff'
    calculated.value = false
}
</script>
