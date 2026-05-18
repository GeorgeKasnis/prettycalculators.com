<template>
    <div class="min-h-screen flex flex-col bg-lavender">
        <UiTheHeader />
        <main class="flex-1">
            <slot />
        </main>
        <UiTheFooter />
        <UiCookieBanner />
        <UiUnitToggle v-if="isCalcPage" />
    </div>
</template>

<script setup>
const route = useRoute()

const CALC_CATEGORIES = new Set(['fitness', 'math', 'finance', 'unit', 'other'])
const isCalcPage = computed(() => {
    const parts = route.path.split('/').filter(Boolean)
    return parts.length >= 2 && CALC_CATEGORIES.has(parts[0])
})

useHead(() => ({
    link: [
        {
            rel: 'canonical',
            href: 'https://www.prettycalculators.com' + route.path,
        },
    ],
}))
</script>
