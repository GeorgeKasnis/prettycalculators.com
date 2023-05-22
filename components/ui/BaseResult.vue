<template>
    <p class="mobile:text-center"> {{text}} <span class="text-big  text-center   ml-small mobile:block mobile:ml-0">{{ result }}</span></p>
</template>

<script>
export default {
    props: {
        result: {
            required: true,
        },
        text: {
            required: false,
        },
    },
};
</script>
