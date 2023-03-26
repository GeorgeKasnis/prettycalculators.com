<template>
    <UiFormErrorContainer :errors="errors">
        <UiFormContainer title="BMI Calculator">
            <InputsTextInput aria-label="Height in cm input to calculate Body Mass Index (BMI)" placeholder="Height" v-model="height" measurementUnit="Cm" />
            <InputsTextInput aria-label="Weight in kg input to calculate Body Mass Index (BMI)" placeholder="Weight" v-model="weight" measurementUnit="Kg" />
            <ButtonsCalcBtn @click="calculate" @keyup.enter="calculate" />
            <div class="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-white bg-black w-full h-full grid place-content-center clip-path-circle" :class="bmi ? 'active' : ''">
                <p v-if="bmi">Your BMI is {{ bmi.toFixed(1) }}</p>
                <p v-if="bmi">You are {{ bmiCategory }}</p>
                <button @click="clearEverything" class="absolute right-2 top-2 h-4 w-4 z-10" aria-label="Close Results Button">x</button>
            </div>
        </UiFormContainer>
    </UiFormErrorContainer>
</template>

<script>
export default {
    data() {
        return {
            height: null,
            weight: null,
            bmi: null,
            errors: "",
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
                case this.bmi < 18.5:
                    category = "Underweight";
                    break;
                case this.bmi < 25:
                    category = "Normal weight";
                    break;
                case this.bmi < 30:
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
            if (!this.height || !this.weight) {
                this.errors = "All fields is required";
                this.bmi = null;
                return;
            }

            if (this.height <= 0 || this.weight <= 0) {
                this.errors = "Height and weight must be positive numbers";
                this.bmi = null;
                return;
            }

            const heightInMeters = this.height / 100;
            const bmi = this.weight / (heightInMeters * heightInMeters);
            this.bmi = bmi;
            this.errors = "";
        },
        clearEverything() {
            this.bmi = null;
            this.height = null;
            this.weight = null;
        },
    },
};
</script>
