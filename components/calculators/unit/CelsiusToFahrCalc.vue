<template>
    <div>
        <UiFormErrorContainer :errors="form.errors">
            <UiFormContainer title="Temperature Converter">
                <InputsTextInput aria-label="Temperature in Celsius" placeholder="Temperature in Celsius" v-model="form.celsius" measurementUnit="℃" />
                <ButtonsCalcBtn @click="calculate" @keyup.enter="calculate" />
                <div class="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-white bg-black w-full h-full grid place-content-center clip-path-circle" :class="{ active: form.result }">
                    <UiBaseResult v-if="form.result" text="Fahrenheit:" :result="`${form.result}&#8457;`" />
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
            this.form.result = ((this.form.celsius * 9) / 5 + 32).toFixed(1);
        },
        clearEverything() {
            for (let key in this.form) {
                this.form[key] = null;
            }
        },
    },
};
</script>
