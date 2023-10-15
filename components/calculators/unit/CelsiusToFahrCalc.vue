<template>
    <div>
        <UiFormContainer title="Celcius to Fahrenheit " :result="result" @clear-form="clearEverything(form)">
            <InputsTextInput aria-label="Temperature in Celsius" placeholder="Temperature in Celsius" v-model="form.celsius" measurementUnit="℃" />
        </UiFormContainer>
    </div>
</template>

<script>
export default {
    data() {
        return {
            form: {
                celsius: null,
            },
        };
    },

    computed: {
        result() {
            let result = ((this.form.celsius * 9) / 5 + 32).toFixed(1);
            console.log(result);
            return globalAllKeysAreNotNull(this.form) && !isNaN(result) && result > 0 ? `${result} °F` : "";
        },
    },
};
</script>
