<template>
    <div class="min-h-screen flex flex-col bg-lavender">
        <UiTheHeader />
        <div class="flex-1 flex flex-col items-center p-small py-big tablet:py-huge">
            <slot />
        </div>
        <UiTheFooter />
        <UiCookieBanner />
        <UiUnitToggle />
    </div>
</template>

<script setup>
const route = useRoute()
useHead(() => ({
    link: [
        {
            rel: 'canonical',
            href: 'https://www.prettycalculators.com' + route.path,
        },
    ],
}))
</script>
