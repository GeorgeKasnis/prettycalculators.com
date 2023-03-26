<template>
    <div class="max-w-lg w-full">
        <slot />
        <div class="text-end">
            <nuxt-link :to="link" class="text-5xl font-extralight group-hover:font-medium group"><span class="group-hover:opacity-100 transition-all duration-300 opacity-0">&#x2192;</span>Details</nuxt-link>
        </div>
    </div>
</template>

<script>
export default {
    props:['link']
}
</script>
