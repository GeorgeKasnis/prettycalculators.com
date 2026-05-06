<template>
    <div>
        <CalcTabs v-model="mode" :tabs="MODE_TABS" />

        <CalcInputStack>
            <!-- Distance (pace + time modes) -->
            <template v-if="mode !== 'distance'">
                <CalcSelectRow label="Distance" v-model="distPreset" :options="DIST_OPTIONS" />
                <CalcInputRow
                    v-if="distPreset === 'custom'"
                    label="Custom distance"
                    :unit="unit === 'metric' ? 'km' : 'mi'"
                    v-model="customDist"
                    placeholder="e.g. 10"
                    type="number"
                />
            </template>

            <!-- Time (pace + distance modes) -->
            <template v-if="mode !== 'time'">
                <CalcInputRow label="Hours"   unit="h"   v-model="timeH" placeholder="0"  type="number" min="0" />
                <CalcInputRow label="Minutes" unit="min" v-model="timeM" placeholder="30" type="number" min="0" max="59" />
                <CalcInputRow label="Seconds" unit="sec" v-model="timeS" placeholder="0"  type="number" min="0" max="59" />
            </template>

            <!-- Pace (time + distance modes) -->
            <template v-if="mode !== 'pace'">
                <CalcInputRow
                    :label="`Pace — min per ${unit === 'metric' ? 'km' : 'mile'}`"
                    unit="min"
                    v-model="paceMin"
                    placeholder="5"
                    type="number"
                    min="0"
                />
                <CalcInputRow label="Pace — sec" unit="sec" v-model="paceSec" placeholder="30" type="number" min="0" max="59" />
            </template>
        </CalcInputStack>

        <CalcBtn :showClear="calculated" @click="calculate" @clear="clear">{{ btnLabel }}</CalcBtn>

        <CalcOutput :show="calculated" title="Result" color="#ddd6ff">
            <template v-if="mode === 'pace'">
                <CalcOutputCell label="Pace /km"    :value="outPaceKm" />
                <CalcOutputCell label="Pace /mile"  :value="outPaceMi" />
                <CalcOutputCell label="Speed"       :value="outSpeed" />
                <CalcOutputCell label="Finish time" :value="outTime" />
            </template>
            <template v-else-if="mode === 'time'">
                <CalcOutputCell label="Finish time" :value="outTime" />
                <CalcOutputCell label="Speed"       :value="outSpeed" />
                <CalcOutputCell label="Pace /km"    :value="outPaceKm" />
                <CalcOutputCell label="Pace /mile"  :value="outPaceMi" />
            </template>
            <template v-else>
                <CalcOutputCell label="Distance (km)"    :value="outDistKm" />
                <CalcOutputCell label="Distance (miles)" :value="outDistMi" />
                <CalcOutputCell label="Pace /km"         :value="outPaceKm" />
                <CalcOutputCell label="Pace /mile"       :value="outPaceMi" />
            </template>
        </CalcOutput>

        <!-- Race pace chart -->
        <div v-if="calculated && chartPaceSecKm > 0" class="pace-chart">
            <div class="pace-head">Race finish times at {{ outPaceKm }} pace</div>
            <div class="pace-row pace-row--header">
                <span>Race</span>
                <span>Distance</span>
                <span>Finish time</span>
            </div>
            <div v-for="r in raceChart" :key="r.label" class="pace-row">
                <span class="pace-name">{{ r.label }}</span>
                <span class="pace-dist">{{ r.dist }}</span>
                <span class="pace-time">{{ r.time }}</span>
            </div>
        </div>
    </div>
</template>

<script setup>
const { unit } = useUnit()

const mode       = ref('pace')
const distPreset = ref('5k')
const customDist = ref('')
const timeH      = ref('')
const timeM      = ref('')
const timeS      = ref('')
const paceMin    = ref('')
const paceSec    = ref('')
const calculated = ref(false)

const outPaceKm  = ref('')
const outPaceMi  = ref('')
const outSpeed   = ref('')
const outTime    = ref('')
const outDistKm  = ref('')
const outDistMi  = ref('')
const chartPaceSecKm = ref(0)

const KM_PER_MI = 1.60934

const MODE_TABS = [
    { value: 'pace',     label: 'Pace' },
    { value: 'time',     label: 'Finish Time' },
    { value: 'distance', label: 'Distance' },
]

const DIST_OPTIONS = [
    { value: '1k',     label: '1K (1 km)' },
    { value: '5k',     label: '5K (5 km)' },
    { value: '10k',    label: '10K (10 km)' },
    { value: 'half',   label: 'Half Marathon (21.1 km)' },
    { value: 'full',   label: 'Marathon (42.2 km)' },
    { value: 'custom', label: 'Custom distance…' },
]

const PRESET_KM = { '1k': 1, '5k': 5, '10k': 10, half: 21.0975, full: 42.195 }

const RACES = [
    { label: '1K',            dist: '1 km',    km: 1 },
    { label: '5K',            dist: '5 km',    km: 5 },
    { label: '10K',           dist: '10 km',   km: 10 },
    { label: 'Half Marathon', dist: '21.1 km', km: 21.0975 },
    { label: 'Marathon',      dist: '42.2 km', km: 42.195 },
]

const btnLabel = computed(() => {
    if (mode.value === 'pace')     return 'Calculate Pace →'
    if (mode.value === 'time')     return 'Calculate Finish Time →'
    return 'Calculate Distance →'
})

const raceChart = computed(() =>
    chartPaceSecKm.value > 0
        ? RACES.map(r => ({ label: r.label, dist: r.dist, time: fmtTime(Math.round(r.km * chartPaceSecKm.value)) }))
        : []
)

function getDistKm() {
    if (distPreset.value === 'custom') {
        const d = parseFloat(customDist.value)
        if (!d || d <= 0) return 0
        return unit.value === 'metric' ? d : d * KM_PER_MI
    }
    return PRESET_KM[distPreset.value] ?? 0
}

function fmtPace(secPerKm) {
    const m = Math.floor(secPerKm / 60)
    const s = Math.round(secPerKm % 60)
    return `${m}:${String(s).padStart(2, '0')}`
}

function fmtTime(totalSec) {
    const h = Math.floor(totalSec / 3600)
    const m = Math.floor((totalSec % 3600) / 60)
    const s = Math.round(totalSec % 60)
    return h > 0
        ? `${h}:${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`
        : `${m}:${String(s).padStart(2, '0')}`
}

function calculate() {
    if (mode.value === 'pace') {
        const distKm   = getDistKm()
        const h        = parseFloat(timeH.value) || 0
        const m        = parseFloat(timeM.value) || 0
        const s        = parseFloat(timeS.value) || 0
        const totalSec = h * 3600 + m * 60 + s
        if (!distKm || totalSec <= 0) return

        const paceKm   = totalSec / distKm
        const speedKmh = distKm / (totalSec / 3600)

        outPaceKm.value      = `${fmtPace(paceKm)} /km`
        outPaceMi.value      = `${fmtPace(paceKm * KM_PER_MI)} /mi`
        outSpeed.value       = `${speedKmh.toFixed(1)} km/h  (${(speedKmh / KM_PER_MI).toFixed(1)} mph)`
        outTime.value        = fmtTime(totalSec)
        chartPaceSecKm.value = paceKm

    } else if (mode.value === 'time') {
        const distKm        = getDistKm()
        const pm            = parseFloat(paceMin.value) || 0
        const ps            = parseFloat(paceSec.value) || 0
        const paceSecPerUnit = pm * 60 + ps
        if (!distKm || paceSecPerUnit <= 0) return

        const paceSecKm = unit.value === 'metric'
            ? paceSecPerUnit
            : paceSecPerUnit / KM_PER_MI

        const totalSec = distKm * paceSecKm
        const speedKmh = 3600 / paceSecKm

        outTime.value        = fmtTime(Math.round(totalSec))
        outSpeed.value       = `${speedKmh.toFixed(1)} km/h  (${(speedKmh / KM_PER_MI).toFixed(1)} mph)`
        outPaceKm.value      = `${fmtPace(paceSecKm)} /km`
        outPaceMi.value      = `${fmtPace(paceSecKm * KM_PER_MI)} /mi`
        chartPaceSecKm.value = paceSecKm

    } else {
        const h             = parseFloat(timeH.value) || 0
        const m             = parseFloat(timeM.value) || 0
        const s             = parseFloat(timeS.value) || 0
        const totalSec      = h * 3600 + m * 60 + s
        const pm            = parseFloat(paceMin.value) || 0
        const ps            = parseFloat(paceSec.value) || 0
        const paceSecPerUnit = pm * 60 + ps
        if (totalSec <= 0 || paceSecPerUnit <= 0) return

        const paceSecKm = unit.value === 'metric'
            ? paceSecPerUnit
            : paceSecPerUnit / KM_PER_MI

        const distKm = totalSec / paceSecKm

        outDistKm.value      = `${distKm.toFixed(2)} km`
        outDistMi.value      = `${(distKm / KM_PER_MI).toFixed(2)} miles`
        outPaceKm.value      = `${fmtPace(paceSecKm)} /km`
        outPaceMi.value      = `${fmtPace(paceSecKm * KM_PER_MI)} /mi`
        chartPaceSecKm.value = paceSecKm
    }

    calculated.value = true
}

function clear() {
    customDist.value = ''
    timeH.value = timeM.value = timeS.value = ''
    paceMin.value = paceSec.value = ''
    calculated.value = false
    chartPaceSecKm.value = 0
}

let mounted = false
onMounted(() => { mounted = true })
watch([mode, unit], () => { if (mounted) clear() })
</script>

<style scoped>
.pace-chart {
    margin-top: 16px;
    border: 3px solid #0a0a0a;
}

.pace-head {
    background: #0a0a0a;
    color: #ddd6ff;
    font-family: 'Space Mono', monospace;
    font-size: 10px;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.14em;
    padding: 10px 16px;
}

.pace-row {
    display: grid;
    grid-template-columns: 1.5fr 1fr 1fr;
    border-top: 1px solid rgba(10, 10, 10, 0.1);
    padding: 9px 16px;
    font-size: 13px;
    font-weight: 500;
}

.pace-row--header {
    font-family: 'Space Mono', monospace;
    font-size: 9px;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.1em;
    opacity: 0.4;
    background: rgba(10, 10, 10, 0.03);
}

.pace-name { font-weight: 600; }
.pace-time { font-weight: 700; }
.pace-dist { opacity: 0.55; font-size: 12px; }
</style>
