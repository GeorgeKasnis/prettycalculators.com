<template>
    <div>
        <CalcInputStack>
            <CalcInputRow label="Word Count" unit="words" v-model="wordCount" placeholder="e.g. 1500" type="number" />
            <CalcInputRow label="Reading Speed" unit="WPM" v-model="wpm" placeholder="e.g. 238" type="number" />
        </CalcInputStack>

        <CalcBtn :showClear="calculated" @click="calculate" @clear="clear">Calculate Reading Time →</CalcBtn>

        <CalcOutput :show="calculated" title="Reading Time">
            <CalcOutputCell label="Reading Time" :value="readingTime" />
            <CalcOutputCell label="Words per Minute" :value="wpm" unit="WPM" />
            <CalcOutputCell label="Pages (250 words/page)" :value="pages" />
        </CalcOutput>
    </div>
</template>

<script setup>
const wordCount  = ref('')
const wpm        = ref('238')
const calculated = ref(false)
const readingTime = ref('')
const pages       = ref('')

function calculate() {
    const w = parseFloat(wordCount.value)
    const s = parseFloat(wpm.value) || 238
    if (isNaN(w) || w <= 0) return

    const totalMinutes = w / s
    const mins = Math.floor(totalMinutes)
    const secs = Math.round((totalMinutes - mins) * 60)

    if (mins === 0) {
        readingTime.value = `${secs} sec`
    } else if (secs === 0) {
        readingTime.value = `${mins} min`
    } else {
        readingTime.value = `${mins} min ${secs} sec`
    }

    pages.value = Math.ceil(w / 250)
    calculated.value = true
}

function clear() {
    wordCount.value = ''
    wpm.value = '238'
    readingTime.value = pages.value = ''
    calculated.value = false
}
</script>
