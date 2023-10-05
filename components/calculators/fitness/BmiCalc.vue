<template>
    <UiFormErrorContainer :errors="form.errors">
        <UiFormContainer title="BMI Calculator">
            <InputsTextInput aria-label="Height in cm input to calculate Body Mass Index (BMI)" placeholder="Height" v-model="form.height" measurementUnit="Cm" />
            <InputsTextInput aria-label="Weight in kg input to calculate Body Mass Index (BMI)" placeholder="Weight" v-model="form.weight" measurementUnit="Kg" />
            <UiBaseResult text="Result" :result="result" />
            <ButtonsClearBtn @click="clearEverything(form)" />
        </UiFormContainer>
    </UiFormErrorContainer>
</template>

<script>
export default {
    data() {
        return {
            form: {
                height: null,
                weight: null,
                errors: "",
            },
        };
    },
    computed: {
        result() {
            const heightInMeters = this.form.height / 100;
            const bmi = this.form.weight / (heightInMeters * heightInMeters);
            if (bmi > 0 && !isNaN(bmi) && isFinite(bmi)) {
                return bmi.toFixed(1);
            }
        },
    },
};
</script>
