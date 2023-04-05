<template>
    <div class="brutalist-shadow p-huge tablet:p-small">
        <slot />
        <InputsInputErrors :errors="errors" />
    </div>
</template>

<script>
export default {
    props:['errors']
}
</script>
