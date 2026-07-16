<template>
    <div class="min-h-screen flex flex-col bg-lavender">
        <UiTheHeader />
        <main class="flex-1">
            <slot />
        </main>
        <UiTheFooter />
        <UiCookieBanner />
        <UiBookmarkToast />
        <UiUnitToggle v-if="isCalcPage" />
    </div>
</template>

<script setup>
const route = useRoute()

// only fitness calculators consume useUnit — hide the toggle everywhere else
const isCalcPage = computed(() => {
    const parts = route.path.split('/').filter(Boolean)
    return parts.length >= 2 && parts[0] === 'fitness'
})

useHead(() => ({
    link: [
        {
            rel: 'canonical',
            href: 'https://prettycalculators.com' + (route.path.replace(/\/+$/, '') || '/'),
        },
    ],
}))
</script>
