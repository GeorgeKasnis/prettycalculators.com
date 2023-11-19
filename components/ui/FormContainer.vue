<template>
    <section class="flex flex-col gap-small relative w-full max-w-3xl brutalist-shadow p-huge pb-small tablet:px-small tablet:py-big">
        <h1 class="text-big leading-none">{{ title }}</h1>
        <div class="flex flex-col gap-small relative">
            <slot />
            <div class="flex justify-between items-center mobile:flex-wrap gap-x-8" v-if="!hideResult">
                <UiBaseResult text="Result" :result="result" />
                <transition name="fade">
                    <button v-if="result" @click="clearEverything(form)">Clear</button>
                </transition>
            </div>
        </div>
    </section>
    <button class="mr-auto underline pt-8 text-sm hover:font-bold transition-all" v-if="embed" @click="globalCopyEmbed(embed)"><font-awesome-icon :icon="['far', 'copy']" /> Add this calculator to your website</button>
</template>

<script>
import { useToast } from "vue-toastification";

const toast = useToast();

export default {
    props: ["title", "result", "hideResult", "embed"],
    methods: {
        clearEverything() {
            this.$emit("clear-form"); // Emit a custom event
        },
    },
};
</script>
