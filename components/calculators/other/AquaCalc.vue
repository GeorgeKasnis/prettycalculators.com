<template>
    <UiFormErrorContainer :errors="form.errors">
        <UiFormContainer title="Aqua Calculator">
            <InputsTextInput aria-label="Weight in kg input to calculate Body Mass Index (BMI)" placeholder="Weight" v-model="form.weight" measurementUnit="Kg" />
            <ButtonsCalcBtn @click="calculate" @keyup.enter="calculate" />
            <div class="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-white bg-black w-full h-full grid place-content-center clip-path-circle" :class="form.waterIntake ? 'active' : ''">
                <UiBaseResult v-if="form.waterIntake" text="You must drink daily" :result="`${form.waterIntake} Lt `" />
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
                weight: null,
                waterIntake: null,
                errors: null,
            },
        };
    },
    methods: {
        calculate() {
            if (!this.form.weight) {
                this.form.errors = "All fields is required";
                this.form.waterIntake = null;
                return;
            }

            this.form.waterIntake = (this.form.weight * 30)/1000;
        },
    },
};
</script>
