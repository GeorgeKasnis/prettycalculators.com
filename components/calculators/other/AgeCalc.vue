<template>
    <div>
        <UiFormContainer title="Age Calculator" :result="result" @clear-form="clearEverything(form)">
            <InputsTextInput aria-label="Day" placeholder="Day" v-model="form.day" measurementUnit="Day" :measurementWidthBig="true" />
            <InputsTextInput aria-label="Month" placeholder="Month" v-model="form.month" measurementUnit="Month" :measurementWidthBig="true" />
            <InputsTextInput aria-label="Year" placeholder="Year" v-model="form.year" measurementUnit="Year" :measurementWidthBig="true" />
        </UiFormContainer>
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
            },
        };
    },

    computed: {
        result() {
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

            let result = {
                years,
                months,
                days,
            };
            console.log(result);
            return globalAllKeysAreNotNull(this.form)   ? `${result.years} Years ${result.months} Months ${result.days} Days` : "";
        },
    },
};
</script>
