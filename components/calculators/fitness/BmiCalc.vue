<template>
    <UiFormContainer  title="BMI Calculator" :result="result" @clear-form="clearEverything(form)">
        <InputsTextInput aria-label="Height in cm input to calculate Body Mass Index (BMI)" placeholder="Height" v-model="form.height" measurementUnit="Cm" />
        <InputsTextInput aria-label="Weight in kg input to calculate Body Mass Index (BMI)" placeholder="Weight" v-model="form.weight" measurementUnit="Kg" />
        <div class="brutalist-shadow mt-small w-full h-10 bg-white overflow-hidden flex">
            <div class="w-10 font-bold grid place-items-center bg-black text-white border-2 border-main">0</div>
            <div class="flex-1 border-t-2 border-b-2 border-main">
                <div v-if="result" :style="{ width: barResult * 3.3333 + '%' }" class="bg-black h-full flex-1 flex items-center pl-small text transition-all">
                    <span class="mix-blend-difference whitespace-nowrap">{{ barText }}</span>
                </div>
            </div>

            <div class="w-10 font-bold grid place-items-center bg-black text-white border-2 border-main">30</div>
        </div>
    </UiFormContainer>
</template>

<script>
export default {
    data() {
        return {
            form: {
                height: null,
                weight: null,
            },
            barResult: null,
            barText: null,
            embed: `<iframe src="https://www.prettycalculators.com/fitness/bmi-calculator" style="border: 3px solid #000000; height: 530px; width: 350px; padding: 0.5rem" name="myiFrame" scrolling="no" frameborder="1" allowfullscreen> </iframe>`,
        };
    },
    computed: {
        result() {
            const heightInMeters = this.form.height / 100;
            let result = this.form.weight / (heightInMeters * heightInMeters);
            if (globalAllKeysAreNotNull(this.form) && !isNaN(result) && result > 0) {
                this.barResult = result;
                return result.toFixed(1);
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
