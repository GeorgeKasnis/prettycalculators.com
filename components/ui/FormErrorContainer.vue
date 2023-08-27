<template>
    <div class="brutalist-shadow p-huge tablet:px-small tablet:py-big">
        <slot />
        <InputsInputErrors :errors="errors" />
    </div>
</template>

<script>
export default {
    props:['errors']
}
</script>
