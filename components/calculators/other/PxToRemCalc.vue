<template>
    <UiFormErrorContainer :errors="form.errors">
        <UiFormContainer title="Px to Rem">
            <div class="flex child:w-full mobile:flex-col">
                <InputsTextInput aria-label="Pixels" v-model="form.px" measurementUnit="Px" :measurementWidthBig="true" />
                <InputsTextInput class="copy-text" @click="copyToClipBoard" aria-label="Rem" v-model="remResult" :measurementWidthBig="true" measurementUnit="Rem" />
            </div>
        </UiFormContainer>
    </UiFormErrorContainer>
</template>

<script>
import { useToast } from "vue-toastification";

const toast = useToast();
export default {
    data() {
        return {
            form: {
                px: null,
            },
        };
    },
    methods: {
        copyToClipBoard() {
            navigator.clipboard.writeText(`${this.remResult}rem`);
            toast.success("Text copied to clipboard");
        },
    },
    computed:{
        remResult(){
           return this.form.px ? this.form.px / 16 : '';
        }
    }
};
</script>
