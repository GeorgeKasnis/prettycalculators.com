<template>
    <div>
        <CalcInputStack>
            <CalcInputRow
                label="Body Weight"
                :unit="unit === 'metric' ? 'kg' : 'lbs'"
                v-model="weight"
                :placeholder="unit === 'metric' ? 'e.g. 75' : 'e.g. 165'"
                type="number"
            />
            <CalcSelectRow label="Activity Level" v-model="activity" :options="ACTIVITY_OPTIONS" />
            <CalcSelectRow label="Goal"           v-model="goal"     :options="GOAL_OPTIONS" />
        </CalcInputStack>
        <CalcBtn :showClear="calculated" @click="calculate" @clear="clear">Calculate Protein →</CalcBtn>
        <CalcOutput :show="calculated" title="Daily Protein Target">
            <CalcOutputCell label="Protein Target"      :value="proteinTarget" unit="g/day" />
            <CalcOutputCell label="Per kg body weight"  :value="perKg"         unit="g/kg" />
        </CalcOutput>

        <!-- High-protein food sources -->
        <div v-if="calculated" class="prot-table">
            <div class="prot-head">
                <span>High-Protein Food Sources</span>
            </div>
            <div class="prot-row prot-row--header">
                <span>Food</span>
                <span>Per 100g</span>
                <span>Amount needed</span>
            </div>
            <div v-for="food in foodTable" :key="food.name" class="prot-row">
                <span class="prot-food">{{ food.name }}</span>
                <span class="prot-per">{{ food.per100g }}g protein</span>
                <span class="prot-amount">{{ food.amount }}</span>
            </div>
        </div>
    </div>
</template>

<script setup>
const { unit, lbsToKg } = useUnit()

const weight   = ref('')
const activity = ref('')
const goal     = ref('')
const calculated    = ref(false)
const proteinTarget = ref('')
const perKg         = ref('')

const ACTIVITY_OPTIONS = [
    { value: 'sedentary',   label: 'Sedentary (desk job, little exercise)' },
    { value: 'light',       label: 'Lightly active (1–3 days/week)' },
    { value: 'moderate',    label: 'Moderately active (3–5 days/week)' },
    { value: 'active',      label: 'Very active (6–7 days/week)' },
    { value: 'very_active', label: 'Extra active (athlete / physical job)' },
]

const GOAL_OPTIONS = [
    { value: 'lose',     label: 'Lose fat (preserve muscle)' },
    { value: 'maintain', label: 'Maintain weight & muscle' },
    { value: 'build',    label: 'Build muscle (lean bulk)' },
    { value: 'athlete',  label: 'Athletic performance' },
]

const MULTIPLIERS = {
    sedentary:   { lose: 1.6, maintain: 1.2, build: 1.8, athlete: 1.8 },
    light:       { lose: 1.8, maintain: 1.4, build: 2.0, athlete: 2.0 },
    moderate:    { lose: 2.0, maintain: 1.6, build: 2.2, athlete: 2.2 },
    active:      { lose: 2.2, maintain: 1.8, build: 2.4, athlete: 2.4 },
    very_active: { lose: 2.4, maintain: 2.0, build: 2.6, athlete: 2.6 },
}

const FOODS = [
    { name: 'Chicken breast', per100g: 31 },
    { name: 'Canned tuna',    per100g: 26 },
    { name: 'Eggs (whole)',   per100g: 13 },
    { name: 'Greek yogurt',   per100g: 10 },
    { name: 'Cottage cheese', per100g: 11 },
    { name: 'Whey protein',   per100g: 80 },
]

const foodTable = computed(() => {
    const target = parseFloat(proteinTarget.value)
    if (!target) return []
    return FOODS.map(f => ({
        ...f,
        amount: `${Math.round((target / f.per100g) * 100)}g`,
    }))
})

let mounted = false
onMounted(() => { mounted = true })
watch(unit, () => { if (mounted) clear() })

function calculate() {
    const wKg = unit.value === 'metric'
        ? parseFloat(weight.value)
        : lbsToKg(weight.value)
    if (!wKg || wKg < 1 || !activity.value || !goal.value) return
    const multiplier = MULTIPLIERS[activity.value]?.[goal.value] ?? 1.6
    proteinTarget.value = String(Math.round(wKg * multiplier))
    perKg.value = multiplier.toFixed(1)
    calculated.value = true
}

function clear() {
    weight.value = activity.value = goal.value = ''
    proteinTarget.value = perKg.value = ''
    calculated.value = false
}
</script>

<style scoped>
.prot-table {
    margin-top: 16px;
    border: 3px solid #0a0a0a;
}

.prot-head {
    background: #0a0a0a;
    color: #f5e642;
    font-family: 'Space Mono', monospace;
    font-size: 10px;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.14em;
    padding: 10px 16px;
}

.prot-row {
    display: grid;
    grid-template-columns: 2fr 1fr 1fr;
    border-top: 1px solid rgba(10,10,10,0.1);
    padding: 9px 16px;
    font-size: 13px;
    font-weight: 500;
}

.prot-row--header {
    font-family: 'Space Mono', monospace;
    font-size: 9px;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.1em;
    opacity: 0.4;
    background: rgba(10,10,10,0.03);
}

.prot-food   { font-weight: 600; }
.prot-amount { font-weight: 700; }
</style>
