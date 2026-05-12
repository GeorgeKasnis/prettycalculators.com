<template>
    <div>
        <CalcTabs
            :tabs="[{ value: '1', label: '1D' }, { value: '2', label: '2D' }, { value: '3', label: '3D' }, { value: '4', label: '4D' }]"
            v-model="dimension"
        />
        <CalcInputStack>
            <CalcInputRow label="Order (p)"  unit="p" v-model="pOrder" placeholder="e.g. 2" type="number" />
            <CalcInputRow
                v-for="axis in axes"
                :key="'a' + axis"
                :label="`Point A — ${axis.toUpperCase()}`"
                :unit="axis"
                v-model="pointA[axis]"
                placeholder="0"
                type="number"
            />
            <CalcInputRow
                v-for="axis in axes"
                :key="'b' + axis"
                :label="`Point B — ${axis.toUpperCase()}`"
                :unit="axis"
                v-model="pointB[axis]"
                placeholder="0"
                type="number"
            />
        </CalcInputStack>
        <CalcBtn :showClear="calculated" @click="calculate" @clear="clear">Calculate Distance →</CalcBtn>
        <CalcOutput :show="calculated" title="Minkowski Distance" :meta="specialCase">
            <CalcOutputCell label="Minkowski Distance" :value="result" />
            <CalcOutputCell label="Order p"            :value="pLabel" />
            <CalcOutputCell label="Manhattan (p=1)"    :value="manhattan" />
            <CalcOutputCell label="Euclidean (p=2)"    :value="euclidean" />
        </CalcOutput>
    </div>
</template>

<script setup>
const ALL_AXES = ['x', 'y', 'z', 't']
const dimension  = ref('2')
const pOrder     = ref('2')
const axes       = computed(() => ALL_AXES.slice(0, parseInt(dimension.value)))
const pointA     = ref({ x: '', y: '', z: '', t: '' })
const pointB     = ref({ x: '', y: '', z: '', t: '' })
const calculated = ref(false)
const result      = ref('')
const pLabel      = ref('')
const specialCase = ref('')
const manhattan   = ref('')
const euclidean   = ref('')

watch(dimension, () => { calculated.value = false })

function calculate() {
    const p = parseFloat(pOrder.value)
    if (!p || p <= 0) return

    const diffs = axes.value.map(axis => {
        const a = parseFloat(pointA.value[axis]) || 0
        const b = parseFloat(pointB.value[axis]) || 0
        return Math.abs(a - b)
    })

    const fmt = n => n.toFixed(4).replace(/\.?0+$/, '') || '0'

    const mink = Math.pow(diffs.reduce((s, d) => s + Math.pow(d, p), 0), 1 / p)
    const manh = diffs.reduce((s, d) => s + d, 0)
    const eucl = Math.sqrt(diffs.reduce((s, d) => s + d * d, 0))

    result.value    = fmt(mink)
    pLabel.value    = p % 1 === 0 ? String(p) : p.toFixed(2)
    manhattan.value = fmt(manh)
    euclidean.value = fmt(eucl)

    if (p === 1)      specialCase.value = 'p=1 → equals Manhattan'
    else if (p === 2) specialCase.value = 'p=2 → equals Euclidean'
    else              specialCase.value = `p=${pLabel.value}`

    calculated.value = true
}

function clear() {
    ALL_AXES.forEach(k => { pointA.value[k] = ''; pointB.value[k] = '' })
    pOrder.value = '2'
    calculated.value = false
}
</script>
