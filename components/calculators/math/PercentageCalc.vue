<template>
  <div>
    <label for="percent">Percentage:</label>
    <input type="number" id="percent" v-model="percent" />%

    <label for="number">Number:</label>
    <input type="number" id="number" v-model="number" />

    <button @click="calculate">Calculate</button>

    <p v-if="result">Result: {{ result }}</p>
  </div>
</template>

<script>
export default {
  data() {
    return {
      percent: 0,
      number: 0,
      result: 0
    }
  },
  methods: {
    calculate() {
      this.result = (this.percent / 100) * this.number
    }
  }
}
</script>
