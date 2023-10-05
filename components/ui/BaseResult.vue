<template>
    <p v-if="hasHtml" class="mobile:text-center mb-0">
        <slot></slot>
    </p>
    <p v-else class="mobile:text-center text-lightpurple mb-0"> {{text}} :<span class="text-big  text-center  text-black  ml-small mobile:block mobile:ml-0"><span v-if="result">{{ result }}</span></span></p>
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
