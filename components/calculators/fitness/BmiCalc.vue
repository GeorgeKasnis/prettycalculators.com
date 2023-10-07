<template>
    <UiFormContainer title="BMI Calculator">
        <InputsTextInput aria-label="Height in cm input to calculate Body Mass Index (BMI)" placeholder="Height" v-model="form.height" measurementUnit="Cm" />
        <InputsTextInput aria-label="Weight in kg input to calculate Body Mass Index (BMI)" placeholder="Weight" v-model="form.weight" measurementUnit="Kg" />
        <UiBaseResult text="Result" :result="result" />
        <ButtonsClearBtn @click="clearEverything(form)" />
    </UiFormContainer>
    <div class="brutalist-shadow mt-small w-full h-10 bg-white overflow-hidden flex">
        <div class="w-10 font-bold grid place-items-center bg-black text-white border-2 border-main">0</div>
        <div class="flex-1 border-t-2 border-b-2 border-main">
            <div v-if="result" :style="{ width: barResult * 3.3333 + '%' }" class="bg-black h-full flex-1 flex items-center pl-small text transition-all"><span class="mix-blend-difference whitespace-nowrap">{{ barText }}</span></div>
        </div>
        <div class="w-10 font-bold grid place-items-center bg-black text-white border-2 border-main">30</div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            form: {
                height: null,
                weight: null,
                errors: "",
            },
            barResult: null,
            barText: null,
        };
    },
    computed: {
        result() {
            const heightInMeters = this.form.height / 100;
            const bmi = this.form.weight / (heightInMeters * heightInMeters);
            if (bmi > 0 && !isNaN(bmi) && isFinite(bmi)) {
                this.barResult = bmi;
                return bmi.toFixed(1);
            }
        },
        barText() {
            if (this.result < 18.5) {
                return "Underweight";
            } else if (this.result < 25) {
                return "Healthy Weight";
            } else if (this.result < 30) {
                return "Overweight";
            } else {
                return "Obesity";
            }
        },
    },
};
</script>
