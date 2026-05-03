<template>
    <div>
        <CalcGenderToggle v-model="gender" />
        <CalcInputStack>
            <CalcInputRow label="Weight" unit="kg" v-model="weight" placeholder="e.g. 70" type="number" />
            <CalcInputRow label="Height" unit="cm" v-model="height" placeholder="e.g. 175" type="number" />
            <CalcInputRow label="Age" unit="yrs" v-model="age" placeholder="e.g. 25" type="number" />
            <div class="ci-row tdee-select-row">
                <span class="tdee-select-label">Activity Level</span>
                <select v-model="activity" class="tdee-select">
                    <option value="" disabled>Select activity level</option>
                    <option value="1.2">Sedentary (little or no exercise)</option>
                    <option value="1.375">Lightly active (1–3 days/week)</option>
                    <option value="1.55">Moderately active (3–5 days/week)</option>
                    <option value="1.725">Very active (6–7 days/week)</option>
                    <option value="1.9">Extra active (very hard exercise / physical job)</option>
                </select>
            </div>
        </CalcInputStack>
        <CalcBtn :showClear="calculated" @click="calculate" @clear="clear">Calculate →</CalcBtn>
        <CalcOutput :show="calculated" title="TDEE" single>
            <CalcOutputCell label="Total Daily Energy Expenditure" :value="tdee" unit="kcal/day" />
        </CalcOutput>
    </div>
</template>

<script setup>
import { ref } from 'vue'

const gender = ref('male')
const weight = ref('')
const height = ref('')
const age = ref('')
const activity = ref('')
const calculated = ref(false)
const tdee = ref('')

function calculate() {
    const w = parseFloat(weight.value)
    const h = parseFloat(height.value)
    const a = parseFloat(age.value)
    const act = parseFloat(activity.value)
    if (isNaN(w) || isNaN(h) || isNaN(a) || isNaN(act) || w <= 0 || h <= 0 || a <= 0) return
    const bmr = gender.value === 'male'
        ? 88.362 + 13.397 * w + 4.799 * h - 5.677 * a
        : 447.593 + 9.247 * w + 3.098 * h - 4.33 * a
    tdee.value = (bmr * act).toFixed(0)
    calculated.value = true
}

function clear() {
    weight.value = ''
    height.value = ''
    age.value = ''
    activity.value = ''
    calculated.value = false
}
</script>

<style scoped>
.tdee-select-row {
    padding: 14px 16px;
    display: flex;
    flex-direction: column;
    gap: 5px;
}

.tdee-select-label {
    font-family: 'Space Mono', monospace;
    font-size: 10px;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.14em;
    opacity: 0.45;
}

.tdee-select {
    background: none;
    border: none;
    outline: none;
    font-family: 'Space Grotesk', sans-serif;
    font-size: 15px;
    font-weight: 600;
    color: #0a0a0a;
    cursor: pointer;
    padding: 0;
    width: 100%;
    appearance: none;
}

.tdee-select option {
    font-weight: 400;
}
</style>
