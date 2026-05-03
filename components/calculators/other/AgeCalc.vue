<template>
    <div>
        <CalcInputStack>
            <CalcInputRow label="Day" unit="dd" v-model="day" placeholder="e.g. 15" type="number" min="1" max="31" />
            <CalcInputRow label="Month" unit="mm" v-model="month" placeholder="e.g. 6" type="number" min="1" max="12" />
            <CalcInputRow label="Year" unit="yyyy" v-model="year" placeholder="e.g. 1990" type="number" />
        </CalcInputStack>
        <CalcBtn :showClear="calculated" @click="calculate" @clear="clear">Calculate Age →</CalcBtn>
        <CalcOutput :show="calculated" title="Your Age">
            <CalcOutputCell label="Years" :value="years" />
            <CalcOutputCell label="Months" :value="months" />
            <CalcOutputCell label="Days" :value="days" />
        </CalcOutput>
    </div>
</template>

<script setup>
import { ref } from 'vue'

const day = ref('')
const month = ref('')
const year = ref('')
const calculated = ref(false)
const years = ref(0)
const months = ref(0)
const days = ref(0)

function calculate() {
    const d = parseInt(day.value)
    const mo = parseInt(month.value)
    const yr = parseInt(year.value)
    if (!d || !mo || !yr || isNaN(d) || isNaN(mo) || isNaN(yr)) return
    const birthdate = new Date(yr, mo - 1, d)
    if (isNaN(birthdate.getTime())) return
    const now = new Date()
    const diff = now - birthdate
    const age = new Date(diff)
    years.value = age.getUTCFullYear() - 1970
    months.value = age.getUTCMonth()
    days.value = age.getUTCDate() - 1
    calculated.value = true
}

function clear() {
    day.value = ''
    month.value = ''
    year.value = ''
    calculated.value = false
}
</script>
