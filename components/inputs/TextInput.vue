<template>
    <div class="flex items-center border border-black bg-white">
        <input :value="modelValue" @input="updateValue" :aria-label="ariaLabel" :placeholder="placeholder" class="w-full h-full p-small placeholder:tracking-[2px] placeholder:text-sm" inputmode="numeric" pattern="[0-9]*" onkeydown="return event.keyCode !== 69" type="number" />
        <div class="p-small bg-black text-white  grid place-items-center" :class="[measurementWidthBig ? 'w-32':'w-16' ]" v-if="measurementUnit">{{ measurementUnit }}</div>
    </div>
</template>

<script>
export default {
    props: ["ariaLabel", "placeholder", "measurementUnit", "modelValue", "measurementWidthBig"],

    methods: {
        updateValue(event) {
            this.$emit("update:modelValue", event.target.value);
        },
    },
};
</script>
