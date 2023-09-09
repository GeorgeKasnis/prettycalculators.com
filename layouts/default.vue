<template>
    <div class="w-screen full-height flex items-center flex-col pt-12">
        <UiTheHeader />
        <div class="flex-1 grid place-items-center w-full p-small py-big tablet:py-huge ">
            <slot />
        </div>
        <UiTheFooter />
    </div>
</template>

<script>
export default {
 head() {
    return {
      link: [
        {
          rel: 'canonical',
          href: 'https://www.prettycalculators.com' + this.$route.path
        }
      ]
    }
  }
};
</script>
