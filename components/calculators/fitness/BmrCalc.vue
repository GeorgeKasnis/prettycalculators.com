<template>
    <UiFormContainer title="BMR Calculator" :result="result" @clear-form="clearEverything(form)">
        <InputsBaseRadioButtonGroup v-model:gender="form.gender" :options="genderOptions" />
        <InputsTextInput aria-label="Weight in kg input to calculate Basal Metabolic Rate (BMR)" placeholder="Weight" v-model="form.weight" measurementUnit="Kg" :measurementWidthBig="true"  />
        <InputsTextInput aria-label="Height in cm input to calculate Basal Metabolic Rate (BMR)" placeholder="Height" v-model="form.height" measurementUnit="Cm" :measurementWidthBig="true"  />
        <InputsTextInput aria-label="Age input to calculate Basal Metabolic Rate (BMR)" placeholder="Age" v-model="form.age" measurementUnit="Years" :measurementWidthBig="true"  />
    </UiFormContainer>
</template>
<script>
export default {
    data() {
        return {
            genderOptions: [
                { label: "Male", value: "male" },
                { label: "Female", value: "female" },
            ],
            form: {
                weight: null,
                height: null,
                age: null,
                gender: null,
            },
        };
    },
    computed: {
        result() {
            if (this.form.gender === "male") {
                let result = 88.362 + 13.397 * this.form.weight + 4.799 * this.form.height - 5.677 * this.form.age;
              
                return globalAllKeysAreNotNull(this.form) && !isNaN(result)  && result > 0 ? result.toFixed() : "";
            } else {
                let result = 447.593 + 9.247 * this.form.weight + 3.098 * this.form.height - 4.33 * this.form.age;
                  return globalAllKeysAreNotNull(this.form) && !isNaN(result)  && result > 0 ? result.toFixed() : "";
            }
        },
    },
};
</script>
