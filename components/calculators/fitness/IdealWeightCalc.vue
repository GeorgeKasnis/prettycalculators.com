<template>
    <UiFormContainer title="Ideal Weight Calculator" :result="result" @clear-form="clearEverything(form)">
        <InputsBaseRadioButtonGroup v-model:gender="form.gender" :options="genderOptions" />
        <InputsTextInput aria-label="Height in cm input to calculate ideal weight" placeholder="Height" v-model="form.height" measurementUnit="Cm" :measurementWidthBig="true" />
    </UiFormContainer>
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
                gender: null,
                height: null,
            },
        };
    },
    computed: {
        result() {
            if (!globalAllKeysAreNotNull(this.form)) return "";
            const inchesOver5Feet = Math.max(0, (this.form.height - 152.4) / 2.54);
            let idealWeight;
            if (this.form.gender === "male") {
                idealWeight = 48 + 2.7 * inchesOver5Feet;
            } else {
                idealWeight = 45.5 + 2.2 * inchesOver5Feet;
            }
            return !isNaN(idealWeight) && idealWeight > 0 ? `${idealWeight.toFixed(1)} kg` : "";
        },
    },
};
</script>
