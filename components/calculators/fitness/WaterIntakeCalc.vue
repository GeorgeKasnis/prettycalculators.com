<template>
    <div>
        <CalcInputStack>
            <template v-if="unit === 'metric'">
                <CalcInputRow label="Weight" unit="kg" v-model="weightKg" placeholder="e.g. 70" type="number" />
            </template>
            <template v-else>
                <CalcInputRow label="Weight" unit="lbs" v-model="weightLbs" placeholder="e.g. 154" type="number" />
            </template>
        </CalcInputStack>

        <div class="level-wrap">
            <div class="level-label">Activity Level</div>
            <div class="level-btns">
                <button
                    v-for="lvl in LEVELS"
                    :key="lvl.key"
                    class="level-btn"
                    :class="{ 'level-active': activity === lvl.key }"
                    @click="activity = lvl.key"
                >{{ lvl.label }}</button>
            </div>
        </div>

        <CalcBtn :showClear="calculated" @click="calculate" @clear="clear">Calculate Water Intake →</CalcBtn>

        <CalcOutput :show="calculated" title="Daily Water Intake">
            <CalcOutputCell label="Minimum" :value="minLiters" unit="L" />
            <CalcOutputCell label="Recommended" :value="recLiters" unit="L" />
            <CalcOutputCell v-if="unit === 'imperial'" label="Recommended" :value="recOz" unit="fl oz" />
            <CalcOutputCell label="Cups (8 fl oz)" :value="cups" />
        </CalcOutput>
    </div>
</template>

<script setup>
const { unit, lbsToKg } = useUnit()

const weightKg  = ref('')
const weightLbs = ref('')
const activity  = ref('moderate')
const calculated = ref(false)
const minLiters  = ref('')
const recLiters  = ref('')
const recOz      = ref('')
const cups       = ref('')

const LEVELS = [
    { key: 'sedentary', label: 'Sedentary',  multiplier: 30 },
    { key: 'light',     label: 'Light',       multiplier: 33 },
    { key: 'moderate',  label: 'Moderate',    multiplier: 36 },
    { key: 'active',    label: 'Active',      multiplier: 40 },
    { key: 'athlete',   label: 'Athlete',     multiplier: 45 },
]

let mounted = false
onMounted(() => { mounted = true })
watch(unit, () => { if (mounted) clear() })

function calculate() {
    let kg
    if (unit.value === 'metric') {
        kg = parseFloat(weightKg.value)
    } else {
        kg = lbsToKg(weightLbs.value)
    }
    if (!kg || kg <= 0) return

    const lvl = LEVELS.find(l => l.key === activity.value)
    const rec = (kg * lvl.multiplier) / 1000
    const min = (kg * 30) / 1000

    minLiters.value = min.toFixed(1)
    recLiters.value = rec.toFixed(1)
    recOz.value     = Math.round(rec * 33.814)
    cups.value      = Math.round((rec * 1000) / 237)
    calculated.value = true
}

function clear() {
    weightKg.value = weightLbs.value = ''
    activity.value = 'moderate'
    minLiters.value = recLiters.value = recOz.value = cups.value = ''
    calculated.value = false
}
</script>

<style scoped>
.level-wrap {
    border: 3px solid #0a0a0a;
    background: #fff;
    margin-bottom: 18px;
}
.level-label {
    font-family: 'Space Mono', monospace;
    font-size: 10px;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.14em;
    opacity: 0.4;
    padding: 12px 16px 8px;
}
.level-btns {
    display: flex;
    border-top: 1px solid rgba(10,10,10,0.1);
}
.level-btn {
    flex: 1;
    padding: 13px 4px;
    background: #fff;
    border: none;
    border-right: 1.5px solid rgba(10,10,10,0.12);
    cursor: pointer;
    font-family: 'Space Grotesk', sans-serif;
    font-size: 13px;
    font-weight: 700;
    color: rgba(10,10,10,0.45);
    transition: background 0.08s, color 0.08s;
}
.level-btn:last-child { border-right: none; }
.level-btn:hover:not(.level-active) { background: rgba(10,10,10,0.04); color: #0a0a0a; }
.level-active { background: #0a0a0a !important; color: #ddd6ff !important; }
</style>
