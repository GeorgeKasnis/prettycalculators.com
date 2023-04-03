<template>
    <div class="flex flex-col gap-small relative w-full max-w-3xl ">
        <h2 class="text-big lg:text-huge leading-none my-big">{{title}}</h2>
        <div class="flex flex-col gap-small relative">
            <slot />
        </div>
    </div>
</template>

<script>
export default {
    props:['title']
}
</script>
