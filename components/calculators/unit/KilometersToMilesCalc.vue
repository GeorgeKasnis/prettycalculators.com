<template>
    <div>
        <UiFormContainer title="Kilometers to Miles" :result="result" @clear-form="clearEverything(form)">
            <InputsTextInput aria-label="Distance in Kilometers" placeholder="Distance in Kilometers" v-model="form.kilometers"  measurementUnit="Km" :measurementWidthBig="true" />
        </UiFormContainer>
    </div>
</template>

<script>
export default {
    data() {
        return {
            form: {
                kilometers: null,
            },
        };
    },
    computed: {
        result() {
            let result = (this.form.kilometers / 1.60934).toFixed(2);
            console.log(result);
            return globalAllKeysAreNotNull(this.form) && !isNaN(result) && result > 0 ? `${result} Miles` : "";
        },
    },
};
</script>
