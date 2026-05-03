<template>
    <div>
        <CalcInputStack>
            <CalcInputRow label="Height" unit="cm" v-model="heightCm" placeholder="e.g. 175" type="number" />
            <CalcInputRow label="Weight" unit="kg" v-model="weightKg" placeholder="e.g. 70" type="number" />
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

const heightCm = ref('')
const weightKg = ref('')
const calculated = ref(false)
const bmi = ref('')
const category = ref('')
const categoryColor = ref('#ddd6ff')
const markerPercent = ref(0)

const CATEGORIES = [
    { max: 18.5,     label: 'Underweight', color: '#9FC5FF' },
    { max: 25,       label: 'Normal',      color: '#8FD89B' },
    { max: 30,       label: 'Overweight',  color: '#FFD66B' },
    { max: Infinity, label: 'Obese',       color: '#FF8E7A' },
]

function calculate() {
    const h = parseFloat(heightCm.value)
    const w = parseFloat(weightKg.value)
    if (!heightCm.value || !weightKg.value || isNaN(h) || isNaN(w) || h <= 0 || w <= 0) return
    const score = w / ((h / 100) ** 2)
    if (isNaN(score) || score <= 0) return
    bmi.value = score.toFixed(1)
    const cat = CATEGORIES.find(c => score < c.max)
    category.value = cat.label
    categoryColor.value = cat.color
    markerPercent.value = Math.min(Math.max((score / 40) * 100, 2), 98)
    calculated.value = true
}

function clear() {
    heightCm.value = ''
    weightKg.value = ''
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
