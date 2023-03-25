<template>
    <div class="flex flex-col gap-small relative">
        <div>{{title}}</div>
        <slot />
    </div>
</template>

<script>
export default {
    props:['title']
}
</script>
