<template>
    <p v-if="hasHtml" class="mb-0">
        <slot></slot>
    </p>
    <p v-else class="text-lightpurple mb-0"> {{text}} :<span class="text-big  text-center  text-black  ml-small "><span v-if="result">{{ result }}</span></span></p>
</template>

<script>
export default {
    props: {
        result: {
            required: false,
        },
        text: {
            required: false,
        },
        hasHtml:{
            required:false
        }
    },
};
</script>
