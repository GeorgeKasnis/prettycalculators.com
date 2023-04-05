<template>
    <div>
        <UiFormErrorContainer :errors="form.fahrenheitError">
            <UiFormContainer title="Fahrenheit to Celcius">
                <InputsTextInput aria-label="Temperature in Fahrenheit" placeholder="Temperature in Fahrenheit" v-model="form.fahrenheit" measurementUnit="&#8457;" />
                <ButtonsCalcBtn @click="calculate" @keyup.enter="calculate" />
                <div class="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-white bg-black w-full h-full grid place-content-center clip-path-circle" :class="{ active: form.fahrenheitResult }">
                    <UiBaseResult v-if="form.fahrenheitResult" text="Celsius:" :result="`${form.fahrenheitResult}℃`" />
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
                celsius: null,
                fahrenheit: null,
                result: null,
                fahrenheitResult: null,
                error: "",
                fahrenheitError: "",
            },
        };
    },
    methods: {
        calculate() {
            this.form.fahrenheitError = "";
            if (!this.form.fahrenheit) {
                this.form.fahrenheitError = "All fields is required";
                return;
            }
            this.form.fahrenheitResult = (((this.form.fahrenheit - 32) * 5) / 9).toFixed(1);
        },
        clearEverything() {
            for (let key in this.form) {
                this.form[key] = null;
            }
        },
    },
};
</script>
