<template>
    <section class="flex flex-col gap-small relative w-full max-w-3xl brutalist-shadow p-huge tablet:px-small tablet:py-big">
        <h1 class="text-big leading-none ">{{title}}</h1>
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
