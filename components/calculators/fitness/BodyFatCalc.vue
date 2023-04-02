<template>
    <div>
        <UiFormErrorContainer :errors="form.errors">
            <UiFormContainer title="Body Fat Calculator">
                <InputsBaseRadioButtonGroup v-model:gender="form.gender" :options="genderOptions" />
                <InputsTextInput aria-label="Weight in kg" placeholder="Weight" v-model="form.weight" measurementUnit="Kg" />
                <InputsTextInput aria-label="Height in cm" placeholder="Height" v-model="form.height" measurementUnit="Cm" />
                <InputsTextInput aria-label="Neck circumference" placeholder="Neck circumference" v-model="form.neck" measurementUnit="Cm" />
                <InputsTextInput aria-label="Waist circumference" placeholder="Waist circumference" v-model="form.waist" measurementUnit="Cm" />
                <InputsTextInput aria-label="Hip circumference" placeholder="Hip circumference" v-if="form.gender === 'female'" v-model="form.hip" measurementUnit="Cm" />
                <ButtonsCalcBtn @click="calculate" @keyup.enter="calculate" />
                <div class="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-white bg-black w-full h-full grid place-content-center clip-path-circle" :class="form.result ? 'active' : ''">
                    <p v-if="form.result">
                        Your Body Fat is <span class="text-big block">{{ form.result }}%</span>
                    </p>
                    <button @click="clearEverything(form)" class="absolute right-2 top-2 h-4 w-4 z-10" aria-label="Close Results Button">x</button>
                </div>
            </UiFormContainer>
        </UiFormErrorContainer>
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
                result: null,
                errors: "",
            },
            genderOptions: [
                { label: "Male", value: "male" },
                { label: "Female", value: "female" },
            ],
        };
    },
    methods: {
        calculate() {
            this.form.weight = Number(this.form.weight);
            this.form.height = Number(this.form.height);
            this.form.neck = Number(this.form.neck);
            this.form.waist = Number(this.form.waist);
            this.form.hip = Number(this.form.hip);
            this.form.errors = "";
            this.form.result = "";

            if (!this.form.gender) {
                this.form.errors = "All fields is required";
                return;
            }

            if (this.form.gender === "male") {
                if (!this.form.height || !this.form.weight || !this.form.waist || !this.form.neck) {
                    this.form.errors = "All fields is required";
                    return;
                }

                this.form.result = 495 / (1.0324 - 0.19077 * Math.log10(this.form.waist - this.form.neck) + 0.15456 * Math.log10(this.form.height)) - 450;

            } else if (this.form.gender === "female") {
                if (!this.form.height || !this.form.weight || !this.form.waist || !this.form.neck || !this.form.hip) {
                    this.form.errors = "All fields is required";
                    return;
                }
                this.form.result = 495 / (1.29579 - 0.35004 * Math.log10(this.form.waist + this.form.hip - this.form.neck) + 0.221 * Math.log10(this.form.height)) - 450;
                console.log(this.form.weight, this.form.height, this.form.neck, this.form.waist, this.form.hip);
   
            }
            this.form.result = this.form.result.toFixed(1);
        },
        // clearEverything() {
        //     for (let key in this.form) {
        //         this.form[key] = null;
        //     }
        // },
    },
};
</script>
