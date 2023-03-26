<template>
    <div class="flex flex-col gap-small relative w-full max-w-lg m-small">
        <div>{{title}}</div>
        <slot />
    </div>
</template>

<script>
export default {
    props:['title']
}
</script>
