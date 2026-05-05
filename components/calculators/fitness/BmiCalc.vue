<template>
    <div>
        <CalcInputStack>
            <template v-if="unit === 'metric'">
                <CalcInputRow label="Height" unit="cm" v-model="heightCm" placeholder="e.g. 175" type="number" />
                <CalcInputRow label="Weight" unit="kg" v-model="weightKg" placeholder="e.g. 70" type="number" />
            </template>
            <template v-else>
                <CalcInputRow label="Height (ft)" unit="ft" v-model="heightFt" placeholder="e.g. 5" type="number" />
                <CalcInputRow label="Height (in)" unit="in" v-model="heightIn" placeholder="e.g. 9" type="number" />
                <CalcInputRow label="Weight" unit="lbs" v-model="weightLbs" placeholder="e.g. 154" type="number" />
            </template>
        </CalcInputStack>

        <CalcBtn :showClear="calculated" @click="calculate" @clear="clear">Calculate BMI →</CalcBtn>

        <CalcOutput :show="calculated" title="BMI" :color="categoryColor" :meta="category">
            <CalcOutputCell label="BMI Score" :value="bmi" />
            <CalcOutputCell label="Category" :value="category" />
        </CalcOutput>

        <div v-if="calculated" class="bmi-range">
            <div class="bmi-track">
                <div class="bmi-marker" :style="{ left: markerPercent + '%' }"></div>
            </div>
            <div class="bmi-scale">
                <span>Underweight</span>
                <span>Normal</span>
                <span>Overweight</span>
                <span>Obese</span>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue'

const { unit, ftInToCm, lbsToKg } = useUnit()

const heightCm  = ref('')
const weightKg  = ref('')
const heightFt  = ref('')
const heightIn  = ref('')
const weightLbs = ref('')
const calculated    = ref(false)
const bmi           = ref('')
const category      = ref('')
const categoryColor = ref('#ddd6ff')
const markerPercent = ref(0)

const CATEGORIES = [
    { max: 18.5,     label: 'Underweight', color: '#9FC5FF' },
    { max: 25,       label: 'Normal',      color: '#8FD89B' },
    { max: 30,       label: 'Overweight',  color: '#FFD66B' },
    { max: Infinity, label: 'Obese',       color: '#FF8E7A' },
]

let mounted = false
onMounted(() => { mounted = true })
watch(unit, () => { if (mounted) clear() })

function calculate() {
    let score
    if (unit.value === 'metric') {
        const h = parseFloat(heightCm.value)
        const w = parseFloat(weightKg.value)
        if (!h || !w || h <= 0 || w <= 0) return
        score = w / ((h / 100) ** 2)
    } else {
        const hCm  = ftInToCm(heightFt.value, heightIn.value)
        const wKg  = lbsToKg(weightLbs.value)
        if (!hCm || !wKg || hCm <= 0 || wKg <= 0) return
        score = wKg / ((hCm / 100) ** 2)
    }
    if (isNaN(score) || score <= 0) return
    bmi.value = score.toFixed(1)
    const cat = CATEGORIES.find(c => score < c.max)
    category.value      = cat.label
    categoryColor.value = cat.color
    markerPercent.value = Math.min(Math.max((score / 40) * 100, 2), 98)
    calculated.value    = true
}

function clear() {
    heightCm.value = heightFt.value = heightIn.value = ''
    weightKg.value = weightLbs.value = ''
    calculated.value = false
}
</script>

<style scoped>
.bmi-range {
    margin-top: 18px;
    border: 3px solid #0a0a0a;
    padding: 16px 20px 14px;
    background: #fff;
}

.bmi-track {
    position: relative;
    height: 14px;
    border: 2px solid #0a0a0a;
    background: linear-gradient(
        to right,
        #9FC5FF 0%,
        #9FC5FF 46.25%,
        #8FD89B 46.25%,
        #8FD89B 62.5%,
        #FFD66B 62.5%,
        #FFD66B 75%,
        #FF8E7A 75%,
        #FF8E7A 100%
    );
    margin-bottom: 8px;
}

.bmi-marker {
    position: absolute;
    top: -6px;
    width: 4px;
    height: 22px;
    background: #0a0a0a;
    transform: translateX(-50%);
    transition: left 0.3s ease;
}

.bmi-scale {
    display: flex;
    justify-content: space-between;
    font-family: 'Space Mono', monospace;
    font-size: 9px;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.08em;
    opacity: 0.45;
}
</style>
