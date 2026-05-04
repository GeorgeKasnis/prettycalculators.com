<template>
    <CalcTabs v-model="mode" :tabs="TABS" />

    <!-- Wake up mode -->
    <template v-if="mode === 'wakeup'">
        <div class="sleep-time-wrap">
            <div class="sleep-time-label">I want to wake up at</div>
            <input v-model="wakeTime" type="time" class="sleep-time-input" />
        </div>
        <CalcBtn :showClear="calculated" @click="calcBedtimes" @clear="clear">Show Bedtimes →</CalcBtn>
        <div v-if="calculated" class="sleep-results">
            <div class="sleep-results-head">Recommended Bedtimes</div>
            <div class="sleep-results-sub">Fall asleep at one of these times for full sleep cycles</div>
            <div v-for="(time, i) in bedtimes" :key="i" class="sleep-result-row" :class="{ 'sleep-best': i === 1 }">
                <div class="sleep-result-left">
                    <span class="sleep-result-time">{{ time.label }}</span>
                    <span v-if="i === 1" class="sleep-badge">Best</span>
                </div>
                <div class="sleep-result-right">
                    <span class="sleep-cycles">{{ time.cycles }} cycles</span>
                    <span class="sleep-hours">{{ time.hours }}h sleep</span>
                </div>
            </div>
        </div>
    </template>

    <!-- Sleep now mode -->
    <template v-else>
        <div class="sleep-time-wrap">
            <div class="sleep-time-label">I'm going to sleep at</div>
            <input v-model="sleepTime" type="time" class="sleep-time-input" />
        </div>
        <CalcBtn :showClear="calculated" @click="calcWakeTimes" @clear="clear">Show Wake Times →</CalcBtn>
        <div v-if="calculated" class="sleep-results">
            <div class="sleep-results-head">Recommended Wake Times</div>
            <div class="sleep-results-sub">Wake up at the end of a sleep cycle to feel refreshed</div>
            <div v-for="(time, i) in wakeTimes" :key="i" class="sleep-result-row" :class="{ 'sleep-best': i === 1 }">
                <div class="sleep-result-left">
                    <span class="sleep-result-time">{{ time.label }}</span>
                    <span v-if="i === 1" class="sleep-badge">Best</span>
                </div>
                <div class="sleep-result-right">
                    <span class="sleep-cycles">{{ time.cycles }} cycles</span>
                    <span class="sleep-hours">{{ time.hours }}h sleep</span>
                </div>
            </div>
        </div>
    </template>

    <div v-if="calculated" class="sleep-note">
        ✦ Based on 90-min sleep cycles + 15 min to fall asleep
    </div>
</template>

<script setup>
const mode      = ref('wakeup')
const wakeTime  = ref('')
const sleepTime = ref('')
const calculated = ref(false)
const bedtimes  = ref([])
const wakeTimes = ref([])

const TABS = [
    { value: 'wakeup', label: 'Wake up at…' },
    { value: 'sleep',  label: 'Sleep at…' },
]

// 4–6 cycles (6h, 7.5h, 9h, 10.5h), plus 15 min to fall asleep
const CYCLES = [4, 5, 6, 7]

function parseTime(str) {
    const [h, m] = str.split(':').map(Number)
    return h * 60 + m
}

function fmtMinutes(totalMin) {
    const d = ((totalMin % 1440) + 1440) % 1440
    const h = Math.floor(d / 60)
    const m = d % 60
    const period = h < 12 ? 'AM' : 'PM'
    const h12 = h % 12 || 12
    return `${h12}:${String(m).padStart(2, '0')} ${period}`
}

function calcBedtimes() {
    if (!wakeTime.value) return
    const wakeMin = parseTime(wakeTime.value)
    bedtimes.value = CYCLES.map(c => {
        const totalSleep = c * 90 + 15
        const bedMin = wakeMin - totalSleep
        return {
            label:  fmtMinutes(bedMin),
            cycles: c,
            hours:  (c * 90 / 60).toFixed(1),
        }
    }).reverse()
    calculated.value = true
}

function calcWakeTimes() {
    if (!sleepTime.value) return
    const sleepMin = parseTime(sleepTime.value)
    wakeTimes.value = CYCLES.map(c => {
        const totalSleep = c * 90 + 15
        const wakeMin = sleepMin + totalSleep
        return {
            label:  fmtMinutes(wakeMin),
            cycles: c,
            hours:  (c * 90 / 60).toFixed(1),
        }
    })
    calculated.value = true
}

function clear() {
    wakeTime.value = sleepTime.value = ''
    bedtimes.value = wakeTimes.value = []
    calculated.value = false
}
</script>

<style scoped>
.sleep-time-wrap {
    border: 3px solid #0a0a0a;
    background: #fff;
    margin-bottom: 18px;
    padding: 16px 20px 18px;
}

.sleep-time-label {
    font-family: 'Space Mono', monospace;
    font-size: 10px;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.14em;
    opacity: 0.4;
    margin-bottom: 8px;
}

.sleep-time-input {
    font-family: 'Space Grotesk', sans-serif;
    font-size: 36px;
    font-weight: 700;
    letter-spacing: -0.04em;
    color: #0a0a0a;
    background: transparent;
    border: none;
    outline: none;
    width: 100%;
    cursor: pointer;
    -webkit-appearance: none;
    appearance: none;
}
.sleep-time-input:focus { color: #5c3bef; }
.sleep-time-input::-webkit-calendar-picker-indicator {
    opacity: 0.3;
    cursor: pointer;
    filter: invert(0);
}

/* Results */
.sleep-results {
    margin-top: 22px;
    border: 3px solid #0a0a0a;
}

.sleep-results-head {
    background: #0a0a0a;
    color: #f5e642;
    font-family: 'Space Mono', monospace;
    font-size: 10px;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.14em;
    padding: 10px 16px 6px;
}

.sleep-results-sub {
    background: #0a0a0a;
    color: rgba(255,255,255,0.4);
    font-family: 'Space Mono', monospace;
    font-size: 9px;
    padding: 0 16px 10px;
    letter-spacing: 0.05em;
}

.sleep-result-row {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 13px 16px;
    border-top: 1px solid rgba(10,10,10,0.1);
    background: #fff;
    transition: background 0.08s;
}
.sleep-result-row:hover { background: rgba(221,214,255,0.3); }

.sleep-best {
    background: #ddd6ff !important;
    border-top: 3px solid #0a0a0a !important;
    border-bottom: 3px solid #0a0a0a;
}

.sleep-result-left { display: flex; align-items: center; gap: 10px; }

.sleep-result-time {
    font-family: 'Space Grotesk', sans-serif;
    font-size: 22px;
    font-weight: 700;
    letter-spacing: -0.03em;
    color: #0a0a0a;
}

.sleep-badge {
    font-family: 'Space Mono', monospace;
    font-size: 9px;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.1em;
    background: #0a0a0a;
    color: #f5e642;
    padding: 3px 7px;
}

.sleep-result-right {
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    gap: 2px;
}

.sleep-cycles {
    font-family: 'Space Mono', monospace;
    font-size: 10px;
    font-weight: 700;
    opacity: 0.4;
    text-transform: uppercase;
    letter-spacing: 0.08em;
}

.sleep-hours {
    font-family: 'Space Grotesk', sans-serif;
    font-size: 14px;
    font-weight: 700;
    opacity: 0.7;
}

.sleep-note {
    margin-top: 10px;
    font-family: 'Space Mono', monospace;
    font-size: 9px;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.1em;
    opacity: 0.35;
    text-align: center;
}
</style>
