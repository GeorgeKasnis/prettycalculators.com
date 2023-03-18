<template>
    <div class="w-full p-small">
        <div class="max-w-xl mx-auto w-full">
            <div class="flex flex-col gap-small relative">
                <div class="">Calculate your BMI</div>
                <div class="flex items-center border border-black">
                    <input aria-label="Height in cm input" placeholder="Height" v-model="height" class="w-full h-full p-small" inputmode="numeric" pattern="[0-9]*"  onkeydown="return event.keyCode !== 69"  type="number" />
                    <div class="p-small bg-black text-white w-16 grid place-items-center">Cm</div>
                </div>
                <div class="flex items-center border border-black">
                    <input aria-label="Weight in kg input" placeholder="Weight" v-model="weight" class="w-full h-full p-small" inputmode="numeric" pattern="[0-9]*"  onkeydown="return event.keyCode !== 69"   type="number" />
                    <div class="p-small bg-black text-white w-16 grid place-items-center">Kg</div>
                </div>
                <button @click="calculateBmi" @keyup.enter="calculateBmi" class="h-14 bg-black duration-300 transition-all" aria-label="Calculate Results Button">Go</button>
                <div class="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-white bg-black w-full h-full grid place-content-center clip-path-circle" :class="bmi ? 'active' : ''">
                    <p v-if="bmi">Your BMI is {{ bmi.toFixed(2) }}</p>
                    <p v-if="bmi">You are {{ bmiCategory }}</p>
                    <button @click="clearEverything" class="absolute right-2 top-2 h-4 w-4 z-10" aria-label="Close Results Button">x</button>
                </div>
            </div>
            <transition name="fade-in">
                <div class="text-red-700 h-14 mt-small transition-all duration-300" :class="errors ? 'opacity-100' : 'opacity-0'">{{ errors }}</div>
            </transition>
        </div>
    </div>
</template>

<script setup>
useHead({
    title: "The Best BMI Calculator",
    meta: [
        { hid: "title", name: "title", content: "The Best BMI Calculator" },
        { hid: "description", name: "description", content: "The Best BMI Calculator" },
        { hid: "og-title", property: "og:title", content: "The Best BMI Calculator" },
        { hid: "og:description", property: "og:description", content: "The Best BMI Calculator" },
    ],
});
</script>

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
            if (this.bmi < 18.5) {
                return "underweight";
            } else if (this.bmi < 25) {
                return "normal weight";
            } else if (this.bmi < 30) {
                return "overweight";
            } else {
                return "obese";
            }
        },
    },
    methods: {
        calculateBmi() {
            if (!this.height || !this.weight) {
                this.errors = "All fields is required";
                this.bmi = null;
            } else if (this.height <= 0 || this.weight <= 0) {
                this.errors = "All fields must be positive numbers";
                this.bmi = null;
            } else if (this.height && this.weight) {
                const heightInMeters = this.height / 100;
                const bmi = this.weight / (heightInMeters * heightInMeters);
                this.bmi = bmi;
                this.errors = "";
            } else {
                this.bmi = null;
            }
        },
        clearEverything() {
            this.bmi = null;
            this.height = null;
            this.weight = null;
        },
    },
};
</script>
