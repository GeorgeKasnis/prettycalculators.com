<template>
    <CalcInputStack>
        <CalcInputRow label="Body Weight" unit="kg" v-model="weight" placeholder="e.g. 75" type="number" />
        <div class="ci-row prot-select-row">
            <span class="prot-select-label">Activity Level</span>
            <select v-model="activity" class="prot-select">
                <option value="" disabled>Select activity level</option>
                <option value="sedentary">Sedentary (desk job, little exercise)</option>
                <option value="light">Lightly active (1–3 days/week)</option>
                <option value="moderate">Moderately active (3–5 days/week)</option>
                <option value="active">Very active (6–7 days/week)</option>
                <option value="very_active">Extra active (athlete / physical job)</option>
            </select>
        </div>
        <div class="ci-row prot-select-row">
            <span class="prot-select-label">Goal</span>
            <select v-model="goal" class="prot-select">
                <option value="" disabled>Select your goal</option>
                <option value="lose">Lose fat (preserve muscle)</option>
                <option value="maintain">Maintain weight & muscle</option>
                <option value="build">Build muscle (lean bulk)</option>
                <option value="athlete">Athletic performance</option>
            </select>
        </div>
    </CalcInputStack>
    <CalcBtn :showClear="calculated" @click="calculate" @clear="clear">Calculate Protein →</CalcBtn>
    <CalcOutput :show="calculated" title="Daily Protein Target">
        <CalcOutputCell label="Protein Target" :value="proteinTarget" unit="g/day" />
        <CalcOutputCell label="Per kg body weight" :value="perKg" unit="g/kg" />
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
</template>

<script setup>
const weight   = ref('')
const activity = ref('')
const goal     = ref('')
const calculated    = ref(false)
const proteinTarget = ref('')
const perKg         = ref('')

// g of protein per kg body weight multipliers by activity × goal
const MULTIPLIERS = {
    sedentary:   { lose: 1.6, maintain: 1.2, build: 1.8, athlete: 1.8 },
    light:       { lose: 1.8, maintain: 1.4, build: 2.0, athlete: 2.0 },
    moderate:    { lose: 2.0, maintain: 1.6, build: 2.2, athlete: 2.2 },
    active:      { lose: 2.2, maintain: 1.8, build: 2.4, athlete: 2.4 },
    very_active: { lose: 2.4, maintain: 2.0, build: 2.6, athlete: 2.6 },
}

const FOODS = [
    { name: 'Chicken breast',  per100g: 31 },
    { name: 'Canned tuna',     per100g: 26 },
    { name: 'Eggs (whole)',    per100g: 13 },
    { name: 'Greek yogurt',    per100g: 10 },
    { name: 'Cottage cheese',  per100g: 11 },
    { name: 'Whey protein',    per100g: 80 },
]

const foodTable = computed(() => {
    const target = parseFloat(proteinTarget.value)
    if (!target) return []
    return FOODS.map(f => ({
        ...f,
        amount: `${Math.round((target / f.per100g) * 100)}g`,
    }))
})

function calculate() {
    const w = parseFloat(weight.value)
    if (!w || w < 1 || !activity.value || !goal.value) return
    const multiplier = MULTIPLIERS[activity.value]?.[goal.value] ?? 1.6
    const total = Math.round(w * multiplier)
    proteinTarget.value = String(total)
    perKg.value = multiplier.toFixed(1)
    calculated.value = true
}

function clear() {
    weight.value = ''
    activity.value = ''
    goal.value = ''
    proteinTarget.value = ''
    perKg.value = ''
    calculated.value = false
}
</script>

<style scoped>
.prot-select-row {
    padding: 14px 16px;
    display: flex;
    flex-direction: column;
    gap: 5px;
}

.prot-select-label {
    font-family: 'Space Mono', monospace;
    font-size: 10px;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.14em;
    opacity: 0.45;
}

.prot-select {
    background: none;
    border: none;
    outline: none;
    font-family: 'Space Grotesk', sans-serif;
    font-size: 15px;
    font-weight: 600;
    color: #0a0a0a;
    cursor: pointer;
    padding: 0;
    width: 100%;
    appearance: none;
}

.prot-select option { font-weight: 400; }

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
