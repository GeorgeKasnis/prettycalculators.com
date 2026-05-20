<template>
    <div>
        <CalcInputStack>
            <CalcInputRow label="Fixed Costs"          unit="$" v-model="fixedCosts"    placeholder="e.g. 5000" type="number" />
            <CalcInputRow label="Variable Cost / Unit" unit="$" v-model="variableCost"  placeholder="e.g. 12" type="number" />
            <CalcInputRow label="Price / Unit"         unit="$" v-model="pricePerUnit"  placeholder="e.g. 25" type="number" />
        </CalcInputStack>

        <CalcBtn :showClear="calculated" @click="calculate" @clear="clear">Calculate Break-Even →</CalcBtn>

        <CalcOutput :show="calculated" title="Break-Even Analysis" color="#d4edda">
            <CalcOutputCell label="Break-Even Units"    :value="beUnits"   unit="units" />
            <CalcOutputCell label="Break-Even Revenue"  :value="beRevenue" unit="$" />
            <CalcOutputCell label="Contribution Margin" :value="margin"    unit="$" />
            <CalcOutputCell label="Margin Ratio"        :value="marginRatio" unit="%" />
        </CalcOutput>
    </div>
</template>

<script setup>
const fixedCosts   = ref('')
const variableCost = ref('')
const pricePerUnit = ref('')
const calculated   = ref(false)
const beUnits      = ref('')
const beRevenue    = ref('')
const margin       = ref('')
const marginRatio  = ref('')

function calculate() {
    const fc  = parseFloat(fixedCosts.value)
    const vc  = parseFloat(variableCost.value)
    const ppu = parseFloat(pricePerUnit.value)
    if (isNaN(fc) || isNaN(vc) || isNaN(ppu) || fc < 0 || vc < 0 || ppu <= vc) return

    const contributionMargin = ppu - vc
    const units   = fc / contributionMargin
    const revenue = units * ppu

    beUnits.value     = Math.ceil(units).toLocaleString()
    beRevenue.value   = revenue.toFixed(2)
    margin.value      = contributionMargin.toFixed(2)
    marginRatio.value = ((contributionMargin / ppu) * 100).toFixed(1)
    calculated.value  = true
}

function clear() {
    fixedCosts.value = variableCost.value = pricePerUnit.value = ''
    beUnits.value = beRevenue.value = margin.value = marginRatio.value = ''
    calculated.value = false
}
</script>
