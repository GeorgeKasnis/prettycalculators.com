<template>
    <div>
        <UiFormContainer title="Percentage Calculator" :result="result" @clear-form="clearEverything(form)">
            <InputsTextInput aria-label="Percentage" placeholder="Percentage" v-model="form.percent" measurementUnit="%" />
            <div>of</div>
            <InputsTextInput aria-label="Number" placeholder="Number" v-model="form.number" />
        </UiFormContainer>
    </div>
</template>

<script>
export default {
    data() {
        return {
            form: {
                percent: null,
                number: null,
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
    computed: {
        result() {
            let result = (this.form.percent / 100) * this.form.number;
            if (globalAllKeysAreNotNull(this.form) && !isNaN(result) && result > 0) {
                return result;
            }
        },
    },
};
</script>
