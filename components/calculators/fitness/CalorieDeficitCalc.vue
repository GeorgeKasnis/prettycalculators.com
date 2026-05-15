<template>
    <div>
        <CalcInputStack>
            <CalcInputRow label="Your TDEE"         unit="kcal" v-model="tdee"       placeholder="e.g. 2400" type="number" />
            <CalcInputRow label="Current Weight"    :unit="unit === 'metric' ? 'kg' : 'lbs'" v-model="currentWeight" placeholder="e.g. 85" type="number" />
            <CalcInputRow label="Goal Weight"       :unit="unit === 'metric' ? 'kg' : 'lbs'" v-model="goalWeight"    placeholder="e.g. 75" type="number" />
            <CalcSelectRow label="Rate of Loss" v-model="rateKg" :options="unit === 'metric' ? RATE_METRIC : RATE_IMPERIAL" />
        </CalcInputStack>

        <CalcBtn :showClear="calculated" @click="calculate" @clear="clear">Calculate →</CalcBtn>

        <CalcOutput :show="calculated" title="Calorie Deficit">
            <CalcOutputCell label="Daily Calorie Target" :value="result.dailyTarget"  unit="kcal" />
            <CalcOutputCell label="Daily Deficit"        :value="result.dailyDeficit" unit="kcal" />
            <CalcOutputCell label="Weekly Deficit"       :value="result.weeklyDeficit" unit="kcal" />
            <CalcOutputCell v-if="result.weeks" label="Time to Goal" :value="result.weeks" />
            <CalcOutputCell v-if="result.warning" label="Note" :value="result.warning" />
        </CalcOutput>
    </div>
</template>

<script setup>
const { unit } = useUnit()

const tdee          = ref('')
const currentWeight = ref('')
const goalWeight    = ref('')
const rateKg        = ref('')
const calculated    = ref(false)
const result        = ref({})

const RATE_METRIC = [
    { value: '0.25', label: '0.25 kg/week — slow cut (minimal muscle loss)' },
    { value: '0.5',  label: '0.5 kg/week — standard cut (recommended)' },
    { value: '0.75', label: '0.75 kg/week — moderate aggressive' },
    { value: '1.0',  label: '1.0 kg/week — aggressive (high protein needed)' },
]

const RATE_IMPERIAL = [
    { value: '0.25', label: '0.55 lbs/week — slow cut (minimal muscle loss)' },
    { value: '0.5',  label: '1.1 lbs/week — standard cut (recommended)' },
    { value: '0.75', label: '1.65 lbs/week — moderate aggressive' },
    { value: '1.0',  label: '2.2 lbs/week — aggressive (high protein needed)' },
]

function calculate() {
    const t    = parseFloat(tdee.value)
    const rate = parseFloat(rateKg.value)
    if (!t || !rate || t <= 0) return

    // 1 kg of fat ≈ 7,700 kcal
    const weeklyDeficit = Math.round(rate * 7700)
    const dailyDeficit  = Math.round(weeklyDeficit / 7)
    const dailyTarget   = Math.round(t - dailyDeficit)

    let weeks = null
    const cw = parseFloat(currentWeight.value)
    const gw = parseFloat(goalWeight.value)
    if (!isNaN(cw) && !isNaN(gw) && cw > gw) {
        const diffKg = unit.value === 'metric' ? (cw - gw) : ((cw - gw) / 2.20462)
        const w = Math.ceil((diffKg / rate))
        const months = Math.floor(w / 4.33)
        const remWeeks = Math.round(w % 4.33)
        weeks = months > 0 ? `~${months}m ${remWeeks}w (${w} weeks)` : `~${w} weeks`
    }

    let warning = null
    if (dailyTarget < 1200) warning = 'Below 1,200 kcal — consult a doctor before proceeding'
    else if (dailyTarget < 1500) warning = 'Very low calories — ensure adequate protein (2g/kg)'

    result.value = {
        dailyTarget:   dailyTarget.toLocaleString(),
        dailyDeficit:  dailyDeficit.toLocaleString(),
        weeklyDeficit: weeklyDeficit.toLocaleString(),
        weeks,
        warning,
    }
    calculated.value = true
}

function clear() {
    tdee.value = currentWeight.value = goalWeight.value = rateKg.value = ''
    result.value = {}
    calculated.value = false
}
</script>
