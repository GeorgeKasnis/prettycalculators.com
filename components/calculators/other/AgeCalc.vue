<template>
    <div>
        <UiFormErrorContainer :errors="form.errors">
            <UiFormContainer title="Age Calculator">
                <InputsTextInput aria-label="Day" placeholder="Day" v-model="form.day" />
                <InputsTextInput aria-label="Month" placeholder="Month" v-model="form.month" />
                <InputsTextInput aria-label="Year" placeholder="Year" v-model="form.year" />
                <ButtonsCalcBtn @click="calculate" @keyup.enter="calculate" />
                <div class="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-white bg-black w-full h-full grid place-content-center clip-path-circle" :class="age ? 'active' : ''">
                    <UiBaseResult v-if="age" text="Age:" :result="`${age.years} years ${age.months} months ${age.days} days`" />
                    <button @click="clearEverything" class="absolute right-2 top-2 h-4 w-4 z-10" aria-label="Close Results Button">x</button>
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
                day: "",
                month: "",
                year: "",
                errors: null,
            },
            age: null,
        };
    },
    methods: {
        calculate() {
            const { day, month, year } = this.form;
            const birthdate = new Date(`${year}-${month}-${day}`);
            if (isNaN(birthdate)) {
                this.age = null;
                return;
            }

            const currentDate = new Date();
            const diffInMilliseconds = currentDate - birthdate;
            const ageDate = new Date(diffInMilliseconds);

            const years = ageDate.getUTCFullYear() - 1970;
            const months = ageDate.getUTCMonth();
            const days = ageDate.getUTCDate() - 1;

            const totalMonths = years * 12 + months;
            const totalWeeks = Math.floor(diffInMilliseconds / (1000 * 60 * 60 * 24 * 7));
            const totalDays = Math.floor(diffInMilliseconds / (1000 * 60 * 60 * 24));
            const totalHours = Math.floor(diffInMilliseconds / (1000 * 60 * 60));
            const totalMinutes = Math.floor(diffInMilliseconds / (1000 * 60));
            const totalSeconds = Math.floor(diffInMilliseconds / 1000);

            this.age = {
                years,
                months,
                days,
                totalMonths,
                totalWeeks,
                totalDays,
                totalHours,
                totalMinutes,
                totalSeconds,
            };
        },
        clearEverything() {
            this.form.day = "";
            this.form.month = "";
            this.form.year = "";
            this.age = null;
        },
    },
};
</script>
