<template>
    <section class="flex flex-col gap-small relative w-full max-w-3xl ">
        <h1 class="text-big lg:text-huge leading-none ">{{title}}</h1>
        <div class="flex flex-col gap-small relative">
            <slot />
        </div>
    </section>
</template>

<script>
export default {
    props:['title']
}
</script>
