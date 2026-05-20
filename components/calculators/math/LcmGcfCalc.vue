<template>
    <div>
        <CalcInputStack>
            <CalcInputRow label="First Number" unit="a" v-model="numA" placeholder="e.g. 12" type="number" />
            <CalcInputRow label="Second Number" unit="b" v-model="numB" placeholder="e.g. 18" type="number" />
        </CalcInputStack>

        <CalcBtn :showClear="calculated" @click="calculate" @clear="clear">Calculate →</CalcBtn>

        <CalcOutput :show="calculated" title="LCM & GCF Results">
            <CalcOutputCell label="GCF (Greatest Common Factor)" :value="gcf" />
            <CalcOutputCell label="LCM (Least Common Multiple)" :value="lcm" />
        </CalcOutput>

        <div v-if="calculated" class="steps-wrap">
            <div class="steps-title">How it's calculated</div>
            <div class="step" v-for="(s, i) in steps" :key="i">{{ s }}</div>
        </div>
    </div>
</template>

<script setup>
const numA = ref('')
const numB = ref('')
const calculated = ref(false)
const gcf   = ref('')
const lcm   = ref('')
const steps = ref([])

function gcd(a, b) {
    while (b) { [a, b] = [b, a % b] }
    return a
}

function calculate() {
    const a = Math.abs(Math.round(parseFloat(numA.value)))
    const b = Math.abs(Math.round(parseFloat(numB.value)))
    if (!a || !b || a <= 0 || b <= 0) return

    const g = gcd(a, b)
    const l = (a * b) / g

    gcf.value = g
    lcm.value = l

    steps.value = [
        `GCF of ${a} and ${b} = ${g}  (using Euclidean algorithm)`,
        `LCM = (${a} × ${b}) ÷ GCF = ${a * b} ÷ ${g} = ${l}`,
        `Check: ${a} ÷ ${g} = ${a / g}, ${b} ÷ ${g} = ${b / g} (both whole numbers ✓)`,
    ]

    calculated.value = true
}

function clear() {
    numA.value = numB.value = ''
    gcf.value = lcm.value = ''
    steps.value = []
    calculated.value = false
}
</script>

<style scoped>
.steps-wrap {
    margin-top: 16px;
    border: 3px solid #0a0a0a;
    background: #fff;
    padding: 16px 20px;
}
.steps-title {
    font-family: 'Space Mono', monospace;
    font-size: 10px;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.12em;
    opacity: 0.4;
    margin-bottom: 12px;
}
.step {
    font-family: 'Space Mono', monospace;
    font-size: 12px;
    line-height: 1.7;
    opacity: 0.75;
}
</style>
