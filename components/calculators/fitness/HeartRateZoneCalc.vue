<template>
    <div>
        <CalcInputStack>
            <CalcInputRow label="Age" unit="yrs" v-model="age" placeholder="e.g. 30" type="number" />
            <CalcInputRow label="Resting Heart Rate" unit="bpm" v-model="restingHR" placeholder="e.g. 60" type="number" />
        </CalcInputStack>

        <CalcBtn :showClear="calculated" @click="calculate" @clear="clear">Calculate Zones →</CalcBtn>

        <div v-if="calculated" class="zones-wrap">
            <div class="zones-header">
                <span>Zone</span>
                <span>BPM Range</span>
                <span>% Max HR</span>
                <span>Purpose</span>
            </div>
            <div v-for="z in zones" :key="z.name" class="zone-row" :style="{ borderLeft: `4px solid ${z.color}` }">
                <span class="zone-name">{{ z.name }}</span>
                <span class="zone-bpm">{{ z.low }}–{{ z.high }}</span>
                <span class="zone-pct">{{ z.pctLow }}–{{ z.pctHigh }}%</span>
                <span class="zone-desc">{{ z.desc }}</span>
            </div>
            <div class="zones-footer">Max HR: {{ maxHR }} bpm &nbsp;·&nbsp; Resting HR: {{ restingHR }} bpm</div>
        </div>
    </div>
</template>

<script setup>
const age       = ref('')
const restingHR = ref('')
const calculated = ref(false)
const maxHR      = ref(0)
const zones      = ref([])

const ZONE_DEFS = [
    { name: 'Zone 1 — Very Light', pctLow: 50, pctHigh: 60, color: '#9FC5FF', desc: 'Recovery, warm-up' },
    { name: 'Zone 2 — Light',      pctLow: 60, pctHigh: 70, color: '#8FD89B', desc: 'Base fitness, fat burn' },
    { name: 'Zone 3 — Moderate',   pctLow: 70, pctHigh: 80, color: '#FFD66B', desc: 'Aerobic endurance' },
    { name: 'Zone 4 — Hard',       pctLow: 80, pctHigh: 90, color: '#FFAA55', desc: 'Threshold, speed' },
    { name: 'Zone 5 — Maximum',    pctLow: 90, pctHigh: 100, color: '#FF8E7A', desc: 'Peak power, sprints' },
]

function calculate() {
    const a  = parseFloat(age.value)
    const hr = parseFloat(restingHR.value)
    if (!a || a <= 0 || a >= 120) return

    const hmax = Math.round(220 - a)
    maxHR.value = hmax

    zones.value = ZONE_DEFS.map(z => ({
        ...z,
        low:  Math.round(hmax * z.pctLow  / 100),
        high: Math.round(hmax * z.pctHigh / 100),
    }))

    calculated.value = true
}

function clear() {
    age.value = restingHR.value = ''
    maxHR.value = 0
    zones.value = []
    calculated.value = false
}
</script>

<style scoped>
.zones-wrap {
    margin-top: 20px;
    border: 3px solid #0a0a0a;
    background: #fff;
}
.zones-header {
    display: grid;
    grid-template-columns: 2fr 1.2fr 1fr 1.8fr;
    padding: 10px 16px;
    background: #0a0a0a;
    color: #f5e642;
    font-family: 'Space Mono', monospace;
    font-size: 9px;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.1em;
    gap: 8px;
}
.zone-row {
    display: grid;
    grid-template-columns: 2fr 1.2fr 1fr 1.8fr;
    padding: 13px 16px;
    border-bottom: 1.5px solid rgba(10,10,10,0.08);
    gap: 8px;
    align-items: center;
}
.zone-row:last-of-type { border-bottom: none; }
.zone-name { font-weight: 700; font-size: 13px; }
.zone-bpm  { font-family: 'Space Mono', monospace; font-size: 13px; font-weight: 700; }
.zone-pct  { font-family: 'Space Mono', monospace; font-size: 12px; opacity: 0.55; }
.zone-desc { font-size: 12px; opacity: 0.6; }
.zones-footer {
    padding: 10px 16px;
    background: rgba(10,10,10,0.04);
    font-family: 'Space Mono', monospace;
    font-size: 10px;
    font-weight: 700;
    opacity: 0.45;
    border-top: 1.5px solid rgba(10,10,10,0.1);
}
@media (max-width: 600px) {
    .zones-header, .zone-row { grid-template-columns: 1.8fr 1.2fr 0.8fr; }
    .zone-desc { display: none; }
}
</style>
