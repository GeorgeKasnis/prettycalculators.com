<template>
    <UiFormContainer title="Aqua Calculator" :result="result" @clear-form="clearEverything(form)">
        <InputsTextInput aria-label="Weight in kg input to calculate Body Mass Index (BMI)" placeholder="Weight" v-model="form.weight" measurementUnit="Kg" />
    </UiFormContainer>
</template>

<script>
export default {
    data() {
        return {
            form: {
                weight: null,
            },
        };
    },
    computed: {
        result() {
            let result = (this.form.weight * 30) / 1000;
            console.log(result);
            return globalAllKeysAreNotNull(this.form) && !isNaN(result) && result > 0 ? `${result} ml` : "";
        },
    },
};
</script>
