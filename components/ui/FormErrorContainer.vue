<template>
    <slot />
    <InputsInputErrors :errors="errors" />
</template>

<script>
export default {
    props:['errors']
}
</script>
