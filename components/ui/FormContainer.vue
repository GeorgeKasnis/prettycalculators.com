<template>
    <section class="flex flex-col gap-small relative w-full max-w-3xl brutalist-shadow p-huge tablet:px-small tablet:py-big">
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
        <button class="ml-auto bg-main px-4 py-2 text-sm" v-if="embed" @click="globalCopyEmbed(embed)">Copy Embed</button>
    </section>
</template>

<script>
import { useToast } from "vue-toastification";

const toast = useToast();

export default {
    props: ["title", "result","hideResult",'embed'],
    methods: {
        clearEverything() {
            this.$emit("clear-form"); // Emit a custom event
        },
    },
};
</script>
