<template>
    <div>
        <CalcGenderToggle v-model="gender" />
        <CalcInputStack>
            <template v-if="unit === 'metric'">
                <CalcInputRow label="Weight" unit="kg" v-model="weightKg"  placeholder="e.g. 75"  type="number" />
                <CalcInputRow label="Height" unit="cm" v-model="heightCm"  placeholder="e.g. 175" type="number" />
            </template>
            <template v-else>
                <CalcInputRow label="Weight"      unit="lbs" v-model="weightLbs" placeholder="e.g. 165" type="number" />
                <CalcInputRow label="Height (ft)" unit="ft"  v-model="heightFt"  placeholder="e.g. 5"   type="number" />
                <CalcInputRow label="Height (in)" unit="in"  v-model="heightIn"  placeholder="e.g. 9"   type="number" />
            </template>
            <CalcInputRow label="Age" unit="yrs" v-model="age" placeholder="e.g. 28" type="number" />
            <CalcSelectRow label="Activity Level" v-model="activity" :options="ACTIVITY_OPTIONS" />
            <CalcSelectRow label="Goal"           v-model="goal"     :options="GOAL_OPTIONS" />
            <CalcSelectRow label="Meals per Day"  v-model="meals"    :options="MEAL_OPTIONS" />
        </CalcInputStack>
        <CalcBtn :showClear="calculated" @click="calculate" @clear="clear">Calculate Macros →</CalcBtn>

        <CalcOutput :show="calculated" title="Daily Macros" :meta="splitLabel" color="#ddd6ff">
            <CalcOutputCell label="Daily Calories" :value="calories" />
            <CalcOutputCell label="Protein"        :value="proteinOut" />
            <CalcOutputCell label="Carbohydrates"  :value="carbsOut" />
            <CalcOutputCell label="Fat"            :value="fatOut" />
        </CalcOutput>

        <div v-if="calculated" class="macro-table">
            <div class="macro-head">Per meal · {{ meals }} meals/day</div>
            <div class="macro-row macro-row--header">
                <span>Macro</span>
                <span>Per Meal</span>
                <span>Calories</span>
            </div>
            <div class="macro-row">
                <span class="macro-label">Calories</span>
                <span class="macro-val">{{ perMealCal }} kcal</span>
                <span class="macro-sub">—</span>
            </div>
            <div class="macro-row">
                <span class="macro-label">Protein</span>
                <span class="macro-val">{{ perMealProt }}g</span>
                <span class="macro-sub">{{ perMealProtCal }} kcal</span>
            </div>
            <div class="macro-row">
                <span class="macro-label">Carbs</span>
                <span class="macro-val">{{ perMealCarb }}g</span>
                <span class="macro-sub">{{ perMealCarbCal }} kcal</span>
            </div>
            <div class="macro-row">
                <span class="macro-label">Fat</span>
                <span class="macro-val">{{ perMealFat }}g</span>
                <span class="macro-sub">{{ perMealFatCal }} kcal</span>
            </div>
        </div>
    </div>
</template>

<script setup>
const { unit, lbsToKg, ftInToCm } = useUnit()

const gender    = ref('male')
const weightKg  = ref('')
const weightLbs = ref('')
const heightCm  = ref('')
const heightFt  = ref('')
const heightIn  = ref('')
const age       = ref('')
const activity  = ref('')
const goal      = ref('maintain')
const meals     = ref('3')
const calculated = ref(false)

const splitLabel  = ref('')
const calories    = ref('')
const proteinOut  = ref('')
const carbsOut    = ref('')
const fatOut      = ref('')
const perMealCal  = ref('')
const perMealProt = ref('')
const perMealCarb = ref('')
const perMealFat  = ref('')
const perMealProtCal = ref('')
const perMealCarbCal = ref('')
const perMealFatCal  = ref('')

const ACTIVITY_OPTIONS = [
    { value: '1.2',   label: 'Sedentary (little or no exercise)' },
    { value: '1.375', label: 'Lightly active (1–3 days/week)' },
    { value: '1.55',  label: 'Moderately active (3–5 days/week)' },
    { value: '1.725', label: 'Very active (6–7 days/week)' },
    { value: '1.9',   label: 'Extra active (athlete / physical job)' },
]

const GOAL_OPTIONS = [
    { value: 'agg_cut',  label: 'Aggressive Cut (−500 kcal)' },
    { value: 'cut',      label: 'Cut (−250 kcal)' },
    { value: 'maintain', label: 'Maintenance' },
    { value: 'lean',     label: 'Lean Bulk (+250 kcal)' },
    { value: 'bulk',     label: 'Bulk (+500 kcal)' },
    { value: 'keto',     label: 'Keto (maintenance)' },
    { value: 'keto_cut', label: 'Keto Cut (−300 kcal)' },
]

const MEAL_OPTIONS = [
    { value: '2', label: '2 meals' },
    { value: '3', label: '3 meals' },
    { value: '4', label: '4 meals' },
    { value: '5', label: '5 meals' },
    { value: '6', label: '6 meals' },
]

// [calorie_delta, protein%, carbs%, fat%]
const GOAL_CONFIG = {
    agg_cut:  [-500, 40, 30, 30],
    cut:      [-250, 35, 35, 30],
    maintain: [   0, 30, 40, 30],
    lean:     [+250, 30, 45, 25],
    bulk:     [+500, 25, 50, 25],
    keto:     [   0, 25,  5, 70],
    keto_cut: [-300, 30,  5, 65],
}

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

    const tdee = bmr * act
    const [delta, pPct, cPct, fPct] = GOAL_CONFIG[goal.value]
    const totalCal = Math.round(tdee + delta)

    const protG = Math.round(totalCal * (pPct / 100) / 4)
    const carbG = Math.round(totalCal * (cPct / 100) / 4)
    const fatG  = Math.round(totalCal * (fPct / 100) / 9)

    const m = parseInt(meals.value)

    calories.value   = totalCal + ' kcal'
    proteinOut.value = protG + 'g  (' + pPct + '%)'
    carbsOut.value   = carbG + 'g  (' + cPct + '%)'
    fatOut.value     = fatG  + 'g  (' + fPct + '%)'
    splitLabel.value = pPct + 'P / ' + cPct + 'C / ' + fPct + 'F'

    perMealCal.value     = Math.round(totalCal / m)
    perMealProt.value    = Math.round(protG / m)
    perMealCarb.value    = Math.round(carbG / m)
    perMealFat.value     = Math.round(fatG / m)
    perMealProtCal.value = Math.round((protG / m) * 4)
    perMealCarbCal.value = Math.round((carbG / m) * 4)
    perMealFatCal.value  = Math.round((fatG / m) * 9)

    calculated.value = true
}

function clear() {
    weightKg.value = weightLbs.value = ''
    heightCm.value = heightFt.value = heightIn.value = ''
    age.value = activity.value = ''
    goal.value = 'maintain'
    meals.value = '3'
    calculated.value = false
}
</script>

<style scoped>
.macro-table {
    margin-top: 16px;
    border: 3px solid #0a0a0a;
}

.macro-head {
    background: #0a0a0a;
    color: #ddd6ff;
    font-family: 'Space Mono', monospace;
    font-size: 10px;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.14em;
    padding: 10px 16px;
}

.macro-row {
    display: grid;
    grid-template-columns: 2fr 1fr 1fr;
    border-top: 1px solid rgba(10,10,10,0.1);
    padding: 9px 16px;
    font-size: 13px;
    font-weight: 500;
}

.macro-row--header {
    font-family: 'Space Mono', monospace;
    font-size: 9px;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.1em;
    opacity: 0.4;
    background: rgba(10,10,10,0.03);
}

.macro-label { font-weight: 600; }
.macro-val   { font-weight: 700; }
.macro-sub   { opacity: 0.5; font-size: 12px; }
</style>
