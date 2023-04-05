<template>
    <UiFormErrorContainer :errors="form.errors">
        <UiFormContainer title="BMR Calculator">
            <InputsBaseRadioButtonGroup v-model:gender="form.gender" :options="genderOptions" />
            <InputsTextInput aria-label="Weight in kg input to calculate Basal Metabolic Rate (BMR)" placeholder="Weight" v-model="form.weight" measurementUnit="Kg" :rules="[requiredRule, positiveNumberRule]" />
            <InputsTextInput aria-label="Height in cm input to calculate Basal Metabolic Rate (BMR)" placeholder="Height" v-model="form.height" measurementUnit="Cm" :rules="[requiredRule, positiveNumberRule]" />
            <InputsTextInput aria-label="Age input to calculate Basal Metabolic Rate (BMR)" placeholder="Age" v-model="form.age" measurementUnit="Years" :rules="[requiredRule, positiveNumberRule]" />
            <ButtonsCalcBtn @click="calculate" @keyup.enter="calculate" />
            <div class="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-white bg-black w-full h-full grid place-content-center clip-path-circle" :class="form.bmr ? 'active' : ''">
                <UiBaseResult v-if="form.bmr" text="Your BMR is" :result="form.bmr" />
                <button @click="clearEverything(form)" class="absolute right-2 top-2 h-4 w-4 z-10" aria-label="Close Results Button">x</button>
            </div>
        </UiFormContainer>
    </UiFormErrorContainer>
</template>
<script>
export default {
    data() {
        return {
            genderOptions: [
                { label: "Male", value: "male" },
                { label: "Female", value: "female" },
            ],
            form: {
                weight: null,
                height: null,
                age: null,
                gender: null,
                bmr: null,
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
    },
    methods: {
        calculate() {
            if (!this.form.weight || !this.form.height || !this.form.age || !this.form.gender) {
                this.form.errors = "All fields are required";
                this.form.bmr = null;
                return;
            }

            if (this.form.weight <= 0 || this.form.height <= 0 || this.form.age <= 0) {
                this.form.errors = "All fields must be positive numbers";
                this.form.bmr = null;
                return;
            }

            this.form.bmr = null;

            if (this.form.gender === "male") {
                this.form.bmr = 88.362 + 13.397 * this.form.weight + 4.799 * this.form.height - 5.677 * this.form.age;
            } else {
                this.form.bmr = 447.593+(9.247 * this.form.weight) + 3.098 * this.form.height - 4.33 * this.form.age;
            }
            this.form.bmr = this.form.bmr.toFixed();
            this.form.errors = null;
        },
    },
};
</script>
