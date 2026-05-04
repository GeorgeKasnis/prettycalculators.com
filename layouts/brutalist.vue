<template>
    <div class="min-h-screen flex flex-col bg-lavender">
        <UiTheHeader />
        <main class="flex-1">
            <slot />
        </main>
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
            href: 'https://www.prettycalculators.com' + route.path,
        },
    ],
}))
</script>
