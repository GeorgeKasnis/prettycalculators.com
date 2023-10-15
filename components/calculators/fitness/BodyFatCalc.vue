<template>
    <div>
        <UiFormContainer title="Body Fat Calculator" :result="result" @clear-form="clearEverything(form)">
            <InputsBaseRadioButtonGroup v-model:gender="form.gender" :options="genderOptions" />
            <InputsTextInput aria-label="Weight in kg" placeholder="Weight" v-model="form.weight" measurementUnit="Kg" />
            <InputsTextInput aria-label="Height in cm" placeholder="Height" v-model="form.height" measurementUnit="Cm" />
            <InputsTextInput aria-label="Neck circumference" placeholder="Neck circumference" v-model="form.neck" measurementUnit="Cm" />
            <InputsTextInput aria-label="Waist circumference" placeholder="Waist circumference" v-model="form.waist" measurementUnit="Cm" />
            <InputsTextInput aria-label="Hip circumference" placeholder="Hip circumference" v-if="form.gender === 'female'" v-model="form.hip" measurementUnit="Cm" />
        </UiFormContainer>
    </div>
</template>

<script>
export default {
    data() {
        return {
            form: {
                gender: null,
                weight: null,
                height: null,
                neck: null,
                waist: null,
                hip: null,
            },
            genderOptions: [
                { label: "Male", value: "male" },
                { label: "Female", value: "female" },
            ],
        };
    },
    computed: {
        result() {
            if (this.form.gender === "male") {
                let result = 495 / (1.0324 - 0.19077 * Math.log10(this.form.waist - this.form.neck) + 0.15456 * Math.log10(this.form.height)) - 450;
                return globalAllKeysAreNotNull(this.form, "hip") && !isNaN(result) && result > 0 ? `${result.toFixed()} %` : "";
            } else {
                let result = 495 / (1.29579 - 0.35004 * Math.log10(this.form.waist + this.form.hip - this.form.neck) + 0.221 * Math.log10(this.form.height)) - 450;
                return globalAllKeysAreNotNull(this.form) && !isNaN(result) && result > 0 ? `${result.toFixed()} %` : "";
            }
        },
    },
};
</script>
