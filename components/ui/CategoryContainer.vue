<template>
    <div class="max-w-3xl w-full">
        <slot />
        <div class="text-center">
            <nuxt-link :to="link" class="text-big  font-extralight group-hover:font-medium group"><span v-if="$device.isDesktop" class="group-hover:opacity-100 transition-all duration-300 opacity-0">&#x2192;</span>Details</nuxt-link>
        </div>
    </div>
</template>

<script>
export default {
    props:['link']
}
</script>
