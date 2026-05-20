<template>
    <div>
        <CalcInputStack>
            <CalcInputRow label="Original Price" unit="$" v-model="originalPrice" placeholder="e.g. 80" type="number" />
            <CalcInputRow label="Discount"        unit="%" v-model="discount"      placeholder="e.g. 25" type="number" />
        </CalcInputStack>

        <CalcBtn :showClear="calculated" @click="calculate" @clear="clear">Calculate Discount →</CalcBtn>

        <CalcOutput :show="calculated" title="Discount Results" color="#8FD89B">
            <CalcOutputCell label="You Save"     :value="savings"    unit="$" />
            <CalcOutputCell label="Final Price"  :value="finalPrice" unit="$" />
            <CalcOutputCell label="Discount %"   :value="discount"   unit="%" />
        </CalcOutput>
    </div>
</template>

<script setup>
const originalPrice = ref('')
const discount      = ref('')
const calculated    = ref(false)
const savings       = ref('')
const finalPrice    = ref('')

function calculate() {
    const p = parseFloat(originalPrice.value)
    const d = parseFloat(discount.value)
    if (isNaN(p) || isNaN(d) || p <= 0 || d < 0 || d > 100) return

    const saved = p * d / 100
    savings.value   = saved.toFixed(2)
    finalPrice.value = (p - saved).toFixed(2)
    calculated.value = true
}

function clear() {
    originalPrice.value = discount.value = ''
    savings.value = finalPrice.value = ''
    calculated.value = false
}
</script>
