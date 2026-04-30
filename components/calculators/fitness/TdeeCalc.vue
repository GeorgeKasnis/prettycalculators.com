<template>
    <UiFormContainer title="TDEE Calculator" :result="result" @clear-form="clearEverything(form)">
        <InputsBaseRadioButtonGroup v-model:gender="form.gender" :options="genderOptions" />
        <InputsTextInput aria-label="Weight in kg input to calculate Total Daily Energy Expenditure (TDEE)" placeholder="Weight" v-model="form.weight" measurementUnit="Kg" :measurementWidthBig="true" />
        <InputsTextInput aria-label="Height in cm input to calculate Total Daily Energy Expenditure (TDEE)" placeholder="Height" v-model="form.height" measurementUnit="Cm" :measurementWidthBig="true" />
        <InputsTextInput aria-label="Age input to calculate Total Daily Energy Expenditure (TDEE)" placeholder="Age" v-model="form.age" measurementUnit="Years" :measurementWidthBig="true" />
        <select aria-label="Activity level" v-model="form.activityLevel" class="w-full border border-black p-small bg-white text-sm tracking-wide">
            <option :value="null" disabled>Select activity level</option>
            <option value="1.2">Sedentary (little or no exercise)</option>
            <option value="1.375">Lightly active (1–3 days/week)</option>
            <option value="1.55">Moderately active (3–5 days/week)</option>
            <option value="1.725">Very active (6–7 days/week)</option>
            <option value="1.9">Extra active (very hard exercise / physical job)</option>
        </select>
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
                weight: null,
                height: null,
                age: null,
                activityLevel: null,
            },
        };
    },
    computed: {
        result() {
            if (!globalAllKeysAreNotNull(this.form)) return "";
            let bmr;
            if (this.form.gender === "male") {
                bmr = 88.362 + 13.397 * this.form.weight + 4.799 * this.form.height - 5.677 * this.form.age;
            } else {
                bmr = 447.593 + 9.247 * this.form.weight + 3.098 * this.form.height - 4.33 * this.form.age;
            }
            const tdee = bmr * parseFloat(this.form.activityLevel);
            return !isNaN(tdee) && tdee > 0 ? `${tdee.toFixed()} kcal` : "";
        },
    },
};
</script>
