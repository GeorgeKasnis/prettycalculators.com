<template>
    <UiFormErrorContainer :errors="form.errors">
        <UiFormContainer title="BMI Calculator">
            <InputsTextInput aria-label="Height in cm input to calculate Body Mass Index (BMI)" placeholder="Height" v-model="form.height" measurementUnit="Cm" />
            <InputsTextInput aria-label="Weight in kg input to calculate Body Mass Index (BMI)" placeholder="Weight" v-model="form.weight" measurementUnit="Kg" />
            <ButtonsCalcBtn @click="calculate" @keyup.enter="calculate" />
            <div class="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-white bg-black w-full h-full grid place-content-center clip-path-circle" :class="form.bmi ? 'active' : ''">
                <UiBaseResult v-if="form.bmi" text="Your BMI is" :result="form.bmi.toFixed(1)" />
                <button @click="clearEverything(form)" class="absolute right-2 top-2 h-4 w-4 z-10" aria-label="Close Results Button">x</button>
            </div>
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
                bmi: null,
                errors: "",
            },
        };
    },
    computed: {
        positiveNumberRule() {
            return (value) => {
                if (!value || value <= 0) {
                    return "Please enter a positive number";
                }
                return true;
            };
        },
        requiredRule() {
            return [(v) => !!v || "This field is required"];
        },
        bmiCategory() {
            let category = "";

            switch (true) {
                case this.form.bmi < 18.5:
                    category = "Underweight";
                    break;
                case this.form.bmi < 25:
                    category = "Normal weight";
                    break;
                case this.form.bmi < 30:
                    category = "Overweight";
                    break;
                default:
                    category = "Obese";
                    break;
            }

            return category;
        },
    },
    methods: {
        calculate() {
            if (!this.form.height || !this.form.weight) {
                this.form.errors = "All fields is required";
                this.form.bmi = null;
                return;
            }

            if (this.form.height <= 0 || this.form.weight <= 0) {
                this.form.errors = "Height and weight must be positive numbers";
                this.form.bmi = null;
                return;
            }

            const heightInMeters = this.form.height / 100;
            const bmi = this.form.weight / (heightInMeters * heightInMeters);
            this.form.bmi = bmi;
            this.form.errors = "";
        },
    },
};
</script>
