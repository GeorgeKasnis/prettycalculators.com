<template>
    <div>
        <CalcInputStack>
            <CalcInputRow label="Day of Last Period"   unit="dd"   v-model="day"   placeholder="e.g. 15"   type="number" min="1"  max="31" />
            <CalcInputRow label="Month of Last Period" unit="mm"   v-model="month" placeholder="e.g. 6"    type="number" min="1"  max="12" />
            <CalcInputRow label="Year of Last Period"  unit="yyyy" v-model="year"  placeholder="e.g. 2025" type="number" />
            <CalcInputRow label="Average Cycle Length" unit="days" v-model="cycle" placeholder="e.g. 28 (default)" type="number" min="20" max="45" />
        </CalcInputStack>
        <CalcBtn :showClear="calculated" @click="calculate" @clear="clear">Calculate Due Date →</CalcBtn>

        <CalcOutput :show="calculated" title="Due Date" :meta="trimester" color="#ffd6d6">
            <CalcOutputCell label="Estimated Due Date"  :value="dueDate" />
            <CalcOutputCell label="Current Gestation"   :value="gestation" />
        </CalcOutput>

        <div v-if="calculated" class="ms-table">
            <div class="ms-head">Key Pregnancy Milestones</div>
            <div class="ms-row ms-row--header">
                <span>Milestone</span>
                <span>Week</span>
                <span>Date</span>
            </div>
            <div
                v-for="m in milestones" :key="m.label"
                class="ms-row"
                :class="{ 'ms-row--past': m.past, 'ms-row--next': m.next }"
            >
                <span class="ms-label">{{ m.label }}</span>
                <span class="ms-week">{{ m.weeks }}</span>
                <span class="ms-date">{{ m.date }}</span>
            </div>
        </div>

        <p v-if="calculated" class="ms-disclaimer">
            ⚕ This calculator provides estimates only. Always confirm dates with your healthcare provider.
        </p>
    </div>
</template>

<script setup>
const day   = ref('')
const month = ref('')
const year  = ref('')
const cycle = ref('')
const calculated = ref(false)
const trimester  = ref('')
const dueDate    = ref('')
const gestation  = ref('')
const milestones = ref([])

const MILESTONE_DEFS = [
    { label: 'First prenatal visit',   weeks:  8 },
    { label: 'End of 1st trimester',   weeks: 12 },
    { label: 'Anatomy scan',           weeks: 20 },
    { label: '3rd trimester begins',   weeks: 28 },
    { label: 'Full term (early)',       weeks: 37 },
    { label: 'Due date (EDD)',          weeks: 40 },
    { label: 'Post-term threshold',     weeks: 42 },
]

function fmtDate(d) {
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

    // Naegele's rule adjusted for cycle length
    const totalDays = 280 + (cl - 28)
    const due = new Date(lmp.getTime() + totalDays * 86_400_000)

    const today = new Date()
    const daysSinceLmp = Math.floor((today - lmp) / 86_400_000)
    const wks = Math.floor(daysSinceLmp / 7)
    const dys = daysSinceLmp % 7

    if (wks < 0) {
        gestation.value = 'Period not yet started'
        trimester.value = ''
    } else if (wks > 42) {
        gestation.value = 'Past estimated due date'
        trimester.value = 'Post-term'
    } else {
        gestation.value = `${wks} weeks, ${dys} day${dys !== 1 ? 's' : ''}`
        if (wks < 14)      trimester.value = '1st Trimester'
        else if (wks < 28) trimester.value = '2nd Trimester'
        else               trimester.value = '3rd Trimester'
    }

    dueDate.value = fmtDate(due)

    let nextMarked = false
    milestones.value = MILESTONE_DEFS.map(m => {
        const msDate = new Date(lmp.getTime() + m.weeks * 7 * 86_400_000)
        const past   = today > msDate
        const next   = !past && !nextMarked
        if (next) nextMarked = true
        return { label: m.label, weeks: m.weeks, date: fmtDate(msDate), past, next }
    })

    calculated.value = true
}

function clear() {
    day.value = month.value = year.value = cycle.value = ''
    calculated.value = false
}
</script>

<style scoped>
.ms-table {
    margin-top: 16px;
    border: 3px solid #0a0a0a;
}
.ms-head {
    background: #0a0a0a;
    color: #ffd6d6;
    font-family: 'Space Mono', monospace;
    font-size: 10px;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.14em;
    padding: 10px 16px;
}
.ms-row {
    display: grid;
    grid-template-columns: 2fr 1fr 1.5fr;
    border-top: 1px solid rgba(10,10,10,0.1);
    padding: 9px 16px;
    font-size: 13px;
    font-weight: 500;
}
.ms-row--header {
    font-family: 'Space Mono', monospace;
    font-size: 9px;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.1em;
    opacity: 0.4;
    background: rgba(10,10,10,0.03);
}
.ms-row--past   { opacity: 0.4; text-decoration: line-through; }
.ms-row--next   { background: #fff0f2; font-weight: 700; }
.ms-label       { font-weight: 600; }
.ms-week, .ms-date { font-variant-numeric: tabular-nums; }

.ms-disclaimer {
    margin-top: 12px;
    font-size: 12px;
    opacity: 0.45;
    line-height: 1.5;
}
</style>
