<template>
    <div>
        <UiFormContainer title="Miles to Kilometers" :result="result" @clear-form="clearEverything(form)">
            <InputsTextInput aria-label="Distance in Miles" placeholder="Distance in Miles" v-model="form.miles" measurementUnit="Miles" :measurementWidthBig="true" />
        </UiFormContainer>
    </div>
</template>

<script>
export default {
    data() {
        return {
            form: {
                miles: null,
            },
        };
    },
    computed: {
        result() {
            let result = (this.form.miles * 1.60934).toFixed(2);
            console.log(result);
            return globalAllKeysAreNotNull(this.form) && !isNaN(result) && result > 0 ? `${result} Kilometers` : "";
        },
    },
};
</script>
