<template>
    <div class="min-h-screen flex flex-col bg-lavender">
        <UiTheHeader />
        <div class="flex-1 flex flex-col items-center p-small py-big tablet:py-huge">
            <slot />
        </div>
        <UiTheFooter />
        <UiCookieBanner />
    </div>
</template>

<script setup>
const route = useRoute()
useHead(() => ({
    link: [
        {
            rel: 'canonical',
            href: 'https://prettycalculators.com' + route.path,
        },
    ],
}))
</script>
