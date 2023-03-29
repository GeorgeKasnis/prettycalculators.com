<template>
    <div>
        <UiFormErrorContainer :errors="form.errors">
            <UiFormContainer title="Temperature Converter">
                <InputsTextInput aria-label="Temperature in Celsius" placeholder="Temperature in Celsius" v-model="form.celsius" measurementUnit="℃" />
                <ButtonsCalcBtn @click="calculate" @keyup.enter="calculate" />
                <div class="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-white bg-black w-full h-full grid place-content-center clip-path-circle" :class="{ active: form.result }">
                    <p v-if="form.result">Fahrenheit: {{ form.result }} &#8457;</p>
                    <button @click="clearEverything" class="absolute right-2 top-2 h-4 w-4 z-10" aria-label="Close Results Button">x</button>
                </div>
            </UiFormContainer>
        </UiFormErrorContainer>

        <UiFormErrorContainer :errors="form.fahrenheitError">
            <UiFormContainer>
                <InputsTextInput aria-label="Temperature in Fahrenheit" placeholder="Temperature in Fahrenheit" v-model="form.fahrenheit" measurementUnit="&#8457;" />
                <ButtonsCalcBtn @click="calculateFahrenheit" @keyup.enter="calculateFahrenheit" />
                <div class="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-white bg-black w-full h-full grid place-content-center clip-path-circle" :class="{ active: form.fahrenheitResult }">
                    <p v-if="form.fahrenheitResult">Celsius: {{ form.fahrenheitResult }} ℃</p>
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
            this.form.errors = "";
            if (!this.form.celsius) {
                this.form.errors = "All fields is required";
                return;
            }
            this.form.result =( (this.form.celsius * 9) / 5 + 32).toFixed(1);
        },
        calculateFahrenheit() {
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
