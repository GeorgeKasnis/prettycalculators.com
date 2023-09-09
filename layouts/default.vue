<template>
    <div class="w-screen full-height flex items-center flex-col pt-12">
        <UiTheHeader />
        <div class="flex-1 grid place-items-center w-full p-small py-big tablet:py-huge  mt-big mobile:mt-small">
            <slot />
        </div>
        <UiTheFooter />
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
