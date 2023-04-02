<template>
    <p> {{text}} <span class="text-big  text-center text-black bg-white p-small ml-small">{{ result }}</span></p>
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
