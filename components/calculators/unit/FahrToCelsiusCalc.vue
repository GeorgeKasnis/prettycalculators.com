<template>
    <div>
        <UiFormContainer title="Fahrenheit to Celcius" :result="result" @clear-form="clearEverything(form)">
            <InputsTextInput aria-label="Temperature in Fahrenheit" placeholder="Temperature in Fahrenheit" v-model="form.fahrenheit" measurementUnit="&#8457;" />
        </UiFormContainer>
    </div>
</template>

<script>
export default {
    data() {
        return {
            form: {
                fahrenheit: null,
            },
        };
    },
    computed: {
        result() {
            let result = (((this.form.fahrenheit - 32) * 5) / 9).toFixed(1);
            return globalAllKeysAreNotNull(this.form) && !isNaN(result) && result > 0 ? `${result} °C` : "";
        },
    },
};
</script>
