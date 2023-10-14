<template>
    <UiFormContainer title="BMR Calculator">
        <InputsBaseRadioButtonGroup v-model:gender="form.gender" :options="genderOptions" />
        <InputsTextInput aria-label="Weight in kg input to calculate Basal Metabolic Rate (BMR)" placeholder="Weight" v-model="form.weight" measurementUnit="Kg" :rules="[requiredRule, positiveNumberRule]" />
        <InputsTextInput aria-label="Height in cm input to calculate Basal Metabolic Rate (BMR)" placeholder="Height" v-model="form.height" measurementUnit="Cm" :rules="[requiredRule, positiveNumberRule]" />
        <InputsTextInput aria-label="Age input to calculate Basal Metabolic Rate (BMR)" placeholder="Age" v-model="form.age" measurementUnit="Years" :rules="[requiredRule, positiveNumberRule]" />
        <UiBaseResult text="Result" :result="result" />
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
            this.form.bmr = null;

            if (this.form.gender === "male") {
                let result = 88.362 + 13.397 * this.form.weight + 4.799 * this.form.height - 5.677 * this.form.age;
                if (this.form.weight > 0 && this.form.height > 0 && this.form.age > 0) return result.toFixed();
            } else {
                let result = 447.593 + 9.247 * this.form.weight + 3.098 * this.form.height - 4.33 * this.form.age;
                if (this.form.weight > 0 && this.form.height > 0 && this.form.age > 0) return result.toFixed();
            }
        },
    },
};
</script>
