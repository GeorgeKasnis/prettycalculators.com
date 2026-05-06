<template>
    <div>
        <CalcInputStack>
            <CalcSelectRow label="Activity" v-model="activity" :options="ACTIVITY_OPTIONS" />
            <template v-if="unit === 'metric'">
                <CalcInputRow label="Weight" unit="kg"  v-model="weightKg"  placeholder="e.g. 70"  type="number" />
            </template>
            <template v-else>
                <CalcInputRow label="Weight" unit="lbs" v-model="weightLbs" placeholder="e.g. 154" type="number" />
            </template>
            <CalcInputRow label="Duration" unit="min" v-model="duration" placeholder="e.g. 30" type="number" />
        </CalcInputStack>

        <CalcBtn :showClear="calculated" @click="calculate" @clear="clear">Calculate Calories Burned →</CalcBtn>

        <CalcOutput :show="calculated" title="Calories Burned" :meta="activityLabel" color="#ddd6ff">
            <CalcOutputCell label="Calories burned"  :value="outCal" />
            <CalcOutputCell label="Calories / hour"  :value="outCalHr" />
            <CalcOutputCell label="MET value"        :value="outMet" />
            <CalcOutputCell label="Equivalent to"    :value="outEquiv" />
        </CalcOutput>

        <!-- Activity comparison table -->
        <div v-if="calculated && weightKgNum > 0" class="burn-table">
            <div class="burn-head">Same duration ({{ duration }} min) — other activities</div>
            <div class="burn-row burn-row--header">
                <span>Activity</span>
                <span>Calories</span>
                <span>Intensity</span>
            </div>
            <div
                v-for="row in comparisonRows"
                :key="row.value"
                class="burn-row"
                :class="{ 'burn-row--active': row.value === activity }"
            >
                <span class="burn-name">{{ row.shortLabel }}</span>
                <span class="burn-cal">{{ row.cal }} kcal</span>
                <span class="burn-intensity" :data-level="row.level">{{ row.level }}</span>
            </div>
        </div>
    </div>
</template>

<script setup>
const { unit, lbsToKg } = useUnit()

const activity  = ref('running_mod')
const weightKg  = ref('')
const weightLbs = ref('')
const duration  = ref('')
const calculated = ref(false)

const outCal   = ref('')
const outCalHr = ref('')
const outMet   = ref('')
const outEquiv = ref('')

const weightKgNum = ref(0)

const ACTIVITIES = [
    { value: 'running_easy',    label: 'Running — easy (6 km/h)',         shortLabel: 'Running (easy)',        met: 6.0,  level: 'Moderate' },
    { value: 'running_mod',     label: 'Running — moderate (8 km/h)',      shortLabel: 'Running (moderate)',    met: 8.0,  level: 'High' },
    { value: 'running_fast',    label: 'Running — fast (10 km/h)',         shortLabel: 'Running (fast)',        met: 9.8,  level: 'High' },
    { value: 'running_vfast',   label: 'Running — very fast (12+ km/h)',   shortLabel: 'Running (sprint)',      met: 11.0, level: 'Very high' },
    { value: 'walking_slow',    label: 'Walking — slow (3 km/h)',          shortLabel: 'Walking (slow)',        met: 2.8,  level: 'Low' },
    { value: 'walking_mod',     label: 'Walking — moderate (5 km/h)',      shortLabel: 'Walking (moderate)',    met: 3.5,  level: 'Low' },
    { value: 'walking_brisk',   label: 'Walking — brisk (6 km/h)',         shortLabel: 'Walking (brisk)',       met: 4.3,  level: 'Moderate' },
    { value: 'hiking',          label: 'Hiking (with backpack)',            shortLabel: 'Hiking',                met: 5.3,  level: 'Moderate' },
    { value: 'cycling_leisure', label: 'Cycling — leisure (<16 km/h)',     shortLabel: 'Cycling (leisure)',     met: 4.0,  level: 'Low' },
    { value: 'cycling_mod',     label: 'Cycling — moderate (16–19 km/h)',  shortLabel: 'Cycling (moderate)',    met: 6.0,  level: 'Moderate' },
    { value: 'cycling_vig',     label: 'Cycling — vigorous (20+ km/h)',    shortLabel: 'Cycling (vigorous)',    met: 8.0,  level: 'High' },
    { value: 'swimming_leisure',label: 'Swimming — leisure',               shortLabel: 'Swimming (leisure)',    met: 5.8,  level: 'Moderate' },
    { value: 'swimming_vig',    label: 'Swimming — vigorous',              shortLabel: 'Swimming (vigorous)',   met: 9.8,  level: 'High' },
    { value: 'rowing',          label: 'Rowing (moderate)',                 shortLabel: 'Rowing',                met: 7.0,  level: 'High' },
    { value: 'hiit',            label: 'HIIT / circuit training',          shortLabel: 'HIIT',                  met: 8.0,  level: 'High' },
    { value: 'jump_rope',       label: 'Jump rope',                        shortLabel: 'Jump rope',             met: 11.0, level: 'Very high' },
    { value: 'elliptical',      label: 'Elliptical trainer',               shortLabel: 'Elliptical',            met: 5.0,  level: 'Moderate' },
    { value: 'stair_climb',     label: 'Stair climbing',                   shortLabel: 'Stair climbing',        met: 8.0,  level: 'High' },
    { value: 'weight_training', label: 'Weight training',                  shortLabel: 'Weight training',       met: 3.5,  level: 'Moderate' },
    { value: 'yoga',            label: 'Yoga',                             shortLabel: 'Yoga',                  met: 2.5,  level: 'Low' },
    { value: 'dancing',         label: 'Dancing',                          shortLabel: 'Dancing',               met: 4.8,  level: 'Moderate' },
    { value: 'basketball',      label: 'Basketball',                       shortLabel: 'Basketball',            met: 6.5,  level: 'High' },
    { value: 'soccer',          label: 'Soccer / football',               shortLabel: 'Soccer',                met: 7.0,  level: 'High' },
    { value: 'tennis',          label: 'Tennis',                           shortLabel: 'Tennis',                met: 6.0,  level: 'Moderate' },
]

const ACTIVITY_OPTIONS = ACTIVITIES.map(a => ({ value: a.value, label: a.label }))

// 8 activities shown in comparison table
const COMPARISON_KEYS = ['running_mod', 'cycling_vig', 'swimming_vig', 'hiit', 'jump_rope', 'walking_brisk', 'weight_training', 'yoga']

const FOODS = [
    { name: 'apple',          kcal: 95 },
    { name: 'banana',         kcal: 105 },
    { name: 'can of soda',    kcal: 140 },
    { name: 'chocolate bar',  kcal: 229 },
    { name: 'slice of pizza', kcal: 285 },
    { name: 'burger',         kcal: 354 },
]

const activityLabel = computed(() =>
    ACTIVITIES.find(a => a.value === activity.value)?.shortLabel ?? ''
)

function calcCalories(met, wKg, durMin) {
    return Math.round(met * wKg * (durMin / 60))
}

function getEquiv(kcal) {
    for (const food of FOODS) {
        const count = kcal / food.kcal
        if (count >= 0.4 && count <= 4) {
            return `${count.toFixed(1)} × ${food.name} (${food.kcal} kcal)`
        }
    }
    return `${(kcal / 285).toFixed(1)} × slices of pizza (285 kcal)`
}

const comparisonRows = computed(() => {
    if (!weightKgNum.value || !duration.value) return []
    const dur = parseFloat(duration.value)
    if (!dur || dur <= 0) return []

    return COMPARISON_KEYS
        .map(key => {
            const a = ACTIVITIES.find(x => x.value === key)
            return { ...a, cal: calcCalories(a.met, weightKgNum.value, dur) }
        })
        .sort((a, b) => b.cal - a.cal)
})

function calculate() {
    const wKg  = unit.value === 'metric' ? parseFloat(weightKg.value) : lbsToKg(weightLbs.value)
    const dur  = parseFloat(duration.value)
    const act  = ACTIVITIES.find(a => a.value === activity.value)
    if (!wKg || wKg <= 0 || !dur || dur <= 0 || !act) return

    weightKgNum.value = wKg
    const cal    = calcCalories(act.met, wKg, dur)
    const calHr  = Math.round(act.met * wKg)

    outCal.value   = `${cal} kcal`
    outCalHr.value = `${calHr} kcal/hr`
    outMet.value   = `${act.met} MET`
    outEquiv.value = getEquiv(cal)
    calculated.value = true
}

function clear() {
    weightKg.value = weightLbs.value = duration.value = ''
    calculated.value = false
    weightKgNum.value = 0
}

let mounted = false
onMounted(() => { mounted = true })
watch(unit, () => { if (mounted) clear() })
</script>

<style scoped>
.burn-table {
    margin-top: 16px;
    border: 3px solid #0a0a0a;
}

.burn-head {
    background: #0a0a0a;
    color: #ddd6ff;
    font-family: 'Space Mono', monospace;
    font-size: 10px;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.14em;
    padding: 10px 16px;
}

.burn-row {
    display: grid;
    grid-template-columns: 2fr 1fr 1fr;
    border-top: 1px solid rgba(10, 10, 10, 0.1);
    padding: 9px 16px;
    font-size: 13px;
    font-weight: 500;
    align-items: center;
}

.burn-row--header {
    font-family: 'Space Mono', monospace;
    font-size: 9px;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.1em;
    opacity: 0.4;
    background: rgba(10, 10, 10, 0.03);
}

.burn-row--active {
    background: #ddd6ff;
}

.burn-name { font-weight: 600; }
.burn-cal  { font-weight: 700; }

.burn-intensity {
    font-family: 'Space Mono', monospace;
    font-size: 9px;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.08em;
    opacity: 0.6;
}

[data-level="Very high"] { color: #c0392b; opacity: 1; }
[data-level="High"]      { color: #e67e22; opacity: 1; }
[data-level="Moderate"]  { color: #27ae60; opacity: 1; }
[data-level="Low"]       { color: #2980b9; opacity: 1; }
</style>
