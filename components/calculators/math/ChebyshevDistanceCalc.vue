<template>
    <div>
        <CalcTabs
            :tabs="[{ value: '1', label: '1D' }, { value: '2', label: '2D' }, { value: '3', label: '3D' }, { value: '4', label: '4D' }]"
            v-model="dimension"
        />
        <CalcInputStack>
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
        <CalcOutput :show="calculated" title="Chebyshev Distance">
            <CalcOutputCell label="Chebyshev Distance"    :value="chebyshev" />
            <CalcOutputCell label="Dominant Axis"         :value="dominantAxis" />
            <CalcOutputCell label="Manhattan Distance"    :value="manhattan" />
        </CalcOutput>
    </div>
</template>

<script setup>
const ALL_AXES = ['x', 'y', 'z', 't']
const dimension    = ref('2')
const axes         = computed(() => ALL_AXES.slice(0, parseInt(dimension.value)))
const pointA       = ref({ x: '', y: '', z: '', t: '' })
const pointB       = ref({ x: '', y: '', z: '', t: '' })
const calculated   = ref(false)
const chebyshev    = ref('')
const dominantAxis = ref('')
const manhattan    = ref('')

watch(dimension, () => { calculated.value = false })

function calculate() {
    let maxVal = -Infinity
    let maxAxis = ''
    let sumAbs = 0
    for (const axis of axes.value) {
        const a = parseFloat(pointA.value[axis]) || 0
        const b = parseFloat(pointB.value[axis]) || 0
        const diff = Math.abs(a - b)
        sumAbs += diff
        if (diff > maxVal) { maxVal = diff; maxAxis = axis.toUpperCase() }
    }
    const fmt = n => n.toFixed(4).replace(/\.?0+$/, '') || '0'
    chebyshev.value    = fmt(maxVal)
    dominantAxis.value = maxAxis
    manhattan.value    = fmt(sumAbs)
    calculated.value   = true
}

function clear() {
    ALL_AXES.forEach(k => { pointA.value[k] = ''; pointB.value[k] = '' })
    calculated.value = false
}
</script>
