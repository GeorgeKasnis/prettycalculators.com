<template>
    <div>
        <CalcGenderToggle v-model="gender" />
        <CalcInputStack>
            <template v-if="unit === 'metric'">
                <CalcInputRow label="Weight" unit="kg"  v-model="weightKg"  placeholder="e.g. 80"  type="number" />
                <CalcInputRow label="Height" unit="cm"  v-model="heightCm"  placeholder="e.g. 175" type="number" />
            </template>
            <template v-else>
                <CalcInputRow label="Weight"      unit="lbs" v-model="weightLbs" placeholder="e.g. 176" type="number" />
                <CalcInputRow label="Height (ft)" unit="ft"  v-model="heightFt"  placeholder="e.g. 5"   type="number" />
                <CalcInputRow label="Height (in)" unit="in"  v-model="heightIn"  placeholder="e.g. 9"   type="number" />
            </template>
            <CalcInputRow label="Body Fat % (optional)" unit="%" v-model="bodyFatPct" placeholder="e.g. 20" type="number" />
        </CalcInputStack>

        <CalcBtn :showClear="calculated" @click="calculate" @clear="clear">Calculate LBM →</CalcBtn>

        <CalcOutput :show="calculated" title="Lean Body Mass">
            <CalcOutputCell label="Lean Body Mass"  :value="result.lbm"     :unit="unit === 'metric' ? 'kg' : 'lbs'" />
            <CalcOutputCell label="Fat Mass"        :value="result.fatMass"  :unit="unit === 'metric' ? 'kg' : 'lbs'" />
            <CalcOutputCell label="Body Fat %"      :value="result.bfPct"   unit="%" />
            <CalcOutputCell label="LBM Method"      :value="result.method" />
        </CalcOutput>
    </div>
</template>

<script setup>
const { unit, lbsToKg, ftInToCm } = useUnit()

const gender     = ref('male')
const weightKg   = ref('')
const weightLbs  = ref('')
const heightCm   = ref('')
const heightFt   = ref('')
const heightIn   = ref('')
const bodyFatPct = ref('')
const calculated = ref(false)
const result     = ref({})

let mounted = false
onMounted(() => { mounted = true })
watch(unit, () => { if (mounted) clear() })

function calculate() {
    const wKg = unit.value === 'metric' ? parseFloat(weightKg.value) : lbsToKg(weightLbs.value)
    const hCm = unit.value === 'metric' ? parseFloat(heightCm.value) : ftInToCm(heightFt.value, heightIn.value)
    if (!wKg || wKg <= 0) return

    let lbmKg, fatKg, bfPct, method

    const bf = parseFloat(bodyFatPct.value)
    if (!isNaN(bf) && bf > 0 && bf < 100) {
        // Direct method — most accurate
        fatKg = wKg * (bf / 100)
        lbmKg = wKg - fatKg
        bfPct = bf.toFixed(1)
        method = 'Direct (BF%)'
    } else if (hCm && hCm > 0) {
        // Boer formula
        lbmKg = gender.value === 'male'
            ? 0.407 * wKg + 0.267 * hCm - 19.2
            : 0.252 * wKg + 0.473 * hCm - 48.3
        fatKg = wKg - lbmKg
        bfPct = ((fatKg / wKg) * 100).toFixed(1)
        method = 'Boer formula'
    } else {
        return
    }

    const fmt = v => parseFloat(v.toFixed(1)).toString()
    const toDisplay = kg => unit.value === 'metric' ? fmt(kg) : fmt(kg * 2.20462)

    result.value = {
        lbm:    toDisplay(lbmKg),
        fatMass:toDisplay(fatKg),
        bfPct,
        method,
    }
    calculated.value = true
}

function clear() {
    weightKg.value = weightLbs.value = ''
    heightCm.value = heightFt.value = heightIn.value = ''
    bodyFatPct.value = ''
    result.value = {}
    calculated.value = false
}
</script>
