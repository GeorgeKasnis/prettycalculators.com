<template>
    <div>
        <UiFormErrorContainer :errors="form.errors">
            <UiFormContainer title="Percentage Calculator">
                <InputsTextInput aria-label="Percentage" placeholder="Percentage" v-model="form.percent" measurementUnit="%" />
                <div>of</div>
                <InputsTextInput aria-label="Number" placeholder="Number" v-model="form.number" />

                <ButtonsCalcBtn @click="calculate" @keyup.enter="calculate" />
                <div class="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-white bg-black w-full h-full grid place-content-center clip-path-circle" :class="form.result ? 'active' : ''">
                  <UiBaseResult v-if="form.result || form.result == 0" :text="` ${form.percent}% of ${form.number} =`" :result="form.result" />
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
                percent: null,
                number: null,
                result: null,
                errors: "",
            },
        };
    },
    methods: {
        calculate() {
            this.form.errors = "";
            if (this.form.number == 0 || this.form.percent == 0) {
                this.form.result = "0";
                this.errors = "";
                return;
            }
            if (!this.form.number || !this.form.percent) {
                this.form.errors = "All fields is required";
            }
            this.form.result = (this.form.percent / 100) * this.form.number;
        },
        clearEverything() {
            for (let key in this.form) {
                this.form[key] = null;
            }
        },
    },
};
</script>
