<template>
    <div>
        <CalcTabs
            :tabs="[{ value: 'italian', label: 'Italian' }, { value: 'american', label: 'American' }]"
            v-model="style"
        />
        <CalcInputStack>
            <CalcInputRow label="Number of Pizzas" v-model="numPizzas" placeholder="e.g. 2" type="number" min="1" />
            <CalcInputRow label="Dough Ball Weight" unit="g" v-model="doughWeight" placeholder="e.g. 400" type="number" />
            <CalcInputRow label="Hydration" unit="%" v-model="hydration" :placeholder="style === 'italian' ? '65' : '62'" type="number" />
        </CalcInputStack>
        <CalcBtn :showClear="calculated" @click="calculate" @clear="clear">Calculate →</CalcBtn>
        <CalcOutput :show="calculated" title="Ingredients" :meta="`${numPizzas} pizza${numPizzas > 1 ? 's' : ''}`">
            <CalcOutputCell label="Flour" :value="flour" unit="g" />
            <CalcOutputCell label="Water" :value="water" unit="ml" />
            <CalcOutputCell label="Salt" :value="salt" unit="g" />
            <CalcOutputCell label="Dry Yeast" :value="yeast" unit="g" />
            <template v-if="style === 'american'">
                <CalcOutputCell label="Oil" :value="oil" unit="ml" />
                <CalcOutputCell label="Sugar" :value="sugar" unit="g" />
            </template>
        </CalcOutput>
    </div>
</template>

<script setup>
import { ref, watch } from 'vue'

const style = ref('italian')
const numPizzas = ref('')
const doughWeight = ref('')
const hydration = ref('')
const calculated = ref(false)
const flour = ref('')
const water = ref('')
const salt = ref('')
const yeast = ref('')
const oil = ref('')
const sugar = ref('')

watch(style, () => { calculated.value = false })

function calculate() {
    const n = parseInt(numPizzas.value)
    const d = parseFloat(doughWeight.value)
    const h = parseFloat(hydration.value)
    if (!n || !d || !h || isNaN(n) || isNaN(d) || isNaN(h)) return
    if (style.value === 'italian') {
        const f = parseInt((d * 59.5) / 100) * n
        flour.value = String(f)
        water.value = ((f * h) / 100).toFixed(0)
        salt.value = (((d * 1.8) / 100) * n).toFixed(1)
        yeast.value = (((d * 0.05) / 100) * n).toFixed(1)
    } else {
        const f = parseInt((d * 58) / 100) * n
        flour.value = String(f)
        water.value = ((f * h) / 100).toFixed(0)
        salt.value = (((d * 1.15) / 100) * n).toFixed(1)
        yeast.value = (((d * 0.235) / 100) * n).toFixed(1)
        oil.value = (((d * 1.8) / 100) * n).toFixed(1)
        sugar.value = (((d * 0.6) / 100) * n).toFixed(1)
    }
    calculated.value = true
}

function clear() {
    numPizzas.value = ''
    doughWeight.value = ''
    hydration.value = ''
    calculated.value = false
}
</script>
