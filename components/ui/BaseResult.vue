<template>
    <p v-if="hasHtml" class="mobile:text-center">
        <slot></slot>
    </p>
    <p v-else class="mobile:text-center"> {{text}} <span class="text-big  text-center   ml-small mobile:block mobile:ml-0">{{ result }}</span></p>
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
