<template>
    <section class="flex flex-col gap-small relative w-full max-w-3xl brutalist-shadow p-huge tablet:px-small tablet:py-big">
        <h1 class="text-big leading-none">{{ title }}</h1>
        <div class="flex flex-col gap-small relative">
            <slot />
            <div class="flex justify-between items-center">
                <UiBaseResult text="Result" :result="result" />
                <transition name="fade"> 
                    <button v-if="result" @click="clearEverything(form)">Clear</button>
                </transition>
            </div>
        </div>
    </section>
</template>

<script>
export default {
    props: ["title", "result"],
    methods: {
        clearEverything() {
            this.$emit("clear-form"); // Emit a custom event
        },
    },
};
</script>
