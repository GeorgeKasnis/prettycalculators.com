<template>
    <div>
        <CalcInputStack>
            <CalcInputRow label="Day of Last Period"   unit="dd"   v-model="day"   placeholder="e.g. 15"   type="number" min="1"  max="31" />
            <CalcInputRow label="Month of Last Period" unit="mm"   v-model="month" placeholder="e.g. 6"    type="number" min="1"  max="12" />
            <CalcInputRow label="Year of Last Period"  unit="yyyy" v-model="year"  placeholder="e.g. 2025" type="number" />
            <CalcInputRow label="Average Cycle Length" unit="days" v-model="cycle" placeholder="e.g. 28 (default)" type="number" min="21" max="45" />
        </CalcInputStack>
        <CalcBtn :showClear="calculated" @click="calculate" @clear="clear">Calculate Fertile Window →</CalcBtn>

        <CalcOutput :show="calculated" title="Fertile Window" color="#ffd6d6">
            <CalcOutputCell label="Ovulation Date"   :value="ovulationDate" />
            <CalcOutputCell label="Fertile Window"   :value="fertileWindow" />
            <CalcOutputCell label="Next Period"      :value="nextPeriod" />
            <CalcOutputCell label="Luteal Phase"     :value="lutealPhase" />
        </CalcOutput>

        <div v-if="calculated" class="ov-table">
            <div class="ov-head">Next 3 Cycles</div>
            <div class="ov-row ov-row--header">
                <span>Cycle</span>
                <span>Fertile Window</span>
                <span>Ovulation</span>
            </div>
            <div v-for="(c, i) in cycles" :key="i" class="ov-row" :class="{ 'ov-row--first': i === 0 }">
                <span class="ov-cycle">Cycle {{ i + 1 }}</span>
                <span class="ov-window">{{ c.window }}</span>
                <span class="ov-ov">{{ c.ovulation }}</span>
            </div>
        </div>

        <p v-if="calculated" class="ov-disclaimer">
            ⚕ Ovulation timing varies. This calculator is an estimate — use confirmed ovulation tests for family planning. Consult a healthcare provider for fertility concerns.
        </p>
    </div>
</template>

<script setup>
const day   = ref('')
const month = ref('')
const year  = ref('')
const cycle = ref('')
const calculated   = ref(false)
const ovulationDate = ref('')
const fertileWindow = ref('')
const nextPeriod    = ref('')
const lutealPhase   = ref('')
const cycles        = ref([])

function addDays(date, n) {
    return new Date(date.getTime() + n * 86_400_000)
}

function fmtDate(d) {
    return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
}

function fmtDateFull(d) {
    return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
}

function calculate() {
    const d  = parseInt(day.value)
    const mo = parseInt(month.value)
    const yr = parseInt(year.value)
    const cl = parseInt(cycle.value) || 28

    if (!d || !mo || !yr || isNaN(d) || isNaN(mo) || isNaN(yr)) return

    const lmp = new Date(yr, mo - 1, d)
    if (isNaN(lmp.getTime())) return

    // Ovulation typically 14 days before next period
    const luteal = 14
    const ovDay  = cl - luteal
    const ov     = addDays(lmp, ovDay)

    // Fertile window: 5 days before ovulation + ovulation day + 1 day after (6 days)
    const fertileStart = addDays(ov, -5)
    const fertileEnd   = addDays(ov, 1)
    const next         = addDays(lmp, cl)

    ovulationDate.value = fmtDateFull(ov)
    fertileWindow.value = `${fmtDate(fertileStart)} – ${fmtDate(fertileEnd)}`
    nextPeriod.value    = fmtDateFull(next)
    lutealPhase.value   = `${luteal} days`

    // Next 3 cycles
    cycles.value = Array.from({ length: 3 }, (_, i) => {
        const cycleLmp   = addDays(lmp, cl * i)
        const cycleOv    = addDays(cycleLmp, ovDay)
        const cycleStart = addDays(cycleOv, -5)
        const cycleEnd   = addDays(cycleOv, 1)
        return {
            window:    `${fmtDate(cycleStart)} – ${fmtDate(cycleEnd)}`,
            ovulation: fmtDate(cycleOv),
        }
    })

    calculated.value = true
}

function clear() {
    day.value = month.value = year.value = cycle.value = ''
    calculated.value = false
}
</script>

<style scoped>
.ov-table {
    margin-top: 16px;
    border: 3px solid #0a0a0a;
}
.ov-head {
    background: #0a0a0a;
    color: #ffd6d6;
    font-family: 'Space Mono', monospace;
    font-size: 10px;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.14em;
    padding: 10px 16px;
}
.ov-row {
    display: grid;
    grid-template-columns: 1fr 2fr 1.5fr;
    border-top: 1px solid rgba(10,10,10,0.1);
    padding: 9px 16px;
    font-size: 13px;
}
.ov-row--header {
    font-family: 'Space Mono', monospace;
    font-size: 9px;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.1em;
    opacity: 0.4;
    background: rgba(10,10,10,0.03);
}
.ov-row--first { background: #fff0f2; font-weight: 600; }
.ov-cycle      { font-weight: 600; }

.ov-disclaimer {
    margin-top: 12px;
    font-size: 12px;
    opacity: 0.45;
    line-height: 1.5;
}
</style>
