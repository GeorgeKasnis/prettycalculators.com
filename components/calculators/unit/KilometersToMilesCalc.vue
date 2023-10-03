<template>
  <div>
    <UiFormErrorContainer :errors="form.kilometersError">
      <UiFormContainer title="Kilometers to Miles">
        <InputsTextInput aria-label="Distance in Kilometers" placeholder="Distance in Kilometers" v-model="form.kilometers" />
        <ButtonsCalcBtn @click="calculate" @keyup.enter="calculate" />
        <div
          class="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-white bg-black w-full h-full grid place-content-center clip-path-circle"
          :class="{ active: form.milesResult }"
        >
          <UiBaseResult v-if="form.milesResult" text="Miles:" :result="`${form.milesResult}`" />
          <button @click="clearEverything" class="absolute right-2 top-2 h-4 w-4 z-10" aria-label="Close Results Button">x</button>
        </div>
      </UiFormContainer>
    </UiFormErrorContainer>
  </div>
</template>

<script>
export default {
  data() {
    return {
      form: {
        kilometers: null,
        miles: null,
        error: "",
        kilometersError: "",
      },
    };
  },
  methods: {
    calculate() {
      this.form.kilometersError = "";
      if (!this.form.kilometers) {
        this.form.kilometersError = "All fields are required";
        return;
      }
      this.form.milesResult = (this.form.kilometers / 1.60934).toFixed(2); // Conversion factor: 1 kilometer = 0.62137 miles
    },
    clearEverything() {
      for (let key in this.form) {
        this.form[key] = null;
      }
    },
  },
};
</script>
