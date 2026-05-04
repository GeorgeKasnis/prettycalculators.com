<template>
    <CalcInputStack>
        <CalcInputRow label="Weight Lifted" unit="kg" v-model="weight" placeholder="e.g. 100" type="number" />
        <CalcInputRow label="Reps Performed" unit="reps" v-model="reps" placeholder="e.g. 5" type="number" />
    </CalcInputStack>
    <CalcBtn :showClear="calculated" @click="calculate" @clear="clear">Calculate 1RM →</CalcBtn>
    <CalcOutput :show="calculated" title="One Rep Max">
        <CalcOutputCell label="Estimated 1RM" :value="oneRepMax" unit="kg" />
        <CalcOutputCell label="Method" value="Epley" />
    </CalcOutput>

    <!-- Training percentage table -->
    <div v-if="calculated" class="orm-table">
        <div class="orm-head">
            <span>Training Weight Guide</span>
        </div>
        <div class="orm-row orm-row--header">
            <span>% of 1RM</span>
            <span>~Reps</span>
            <span>Weight (kg)</span>
        </div>
        <div v-for="row in trainingTable" :key="row.pct" class="orm-row">
            <span class="orm-pct">{{ row.pct }}%</span>
            <span class="orm-reps">{{ row.reps }}</span>
            <span class="orm-weight">{{ row.weight }}</span>
        </div>
    </div>
</template>

<script setup>
const weight = ref('')
const reps   = ref('')
const calculated = ref(false)
const oneRepMax  = ref('')

const PCT_TABLE = [
    { pct: 95, reps: '1–2' },
    { pct: 90, reps: '3' },
    { pct: 85, reps: '5' },
    { pct: 80, reps: '6' },
    { pct: 75, reps: '8' },
    { pct: 70, reps: '10' },
    { pct: 65, reps: '12' },
    { pct: 60, reps: '15' },
]

const trainingTable = computed(() =>
    PCT_TABLE.map(row => ({
        ...row,
        weight: (parseFloat(oneRepMax.value) * row.pct / 100).toFixed(1),
    }))
)

function calculate() {
    const w = parseFloat(weight.value)
    const r = parseFloat(reps.value)
    if (!w || !r || r < 1) return
    // Epley formula
    const orm = r === 1 ? w : w * (1 + r / 30)
    oneRepMax.value = orm.toFixed(1)
    calculated.value = true
}

function clear() {
    weight.value = ''
    reps.value = ''
    oneRepMax.value = ''
    calculated.value = false
}
</script>

<style scoped>
.orm-table {
    margin-top: 16px;
    border: 3px solid #0a0a0a;
}

.orm-head {
    background: #0a0a0a;
    color: #f5e642;
    font-family: 'Space Mono', monospace;
    font-size: 10px;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.14em;
    padding: 10px 16px;
}

.orm-row {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    border-top: 1px solid rgba(10,10,10,0.1);
    padding: 9px 16px;
    font-size: 13px;
    font-weight: 500;
}

.orm-row--header {
    font-family: 'Space Mono', monospace;
    font-size: 9px;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.1em;
    opacity: 0.4;
    background: rgba(10,10,10,0.03);
}

.orm-pct  { font-weight: 700; }
.orm-weight { font-weight: 700; }
</style>
