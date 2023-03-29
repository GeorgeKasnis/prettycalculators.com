<template>
    <div class="w-screen full-height flex items-center flex-col  pt-16">
        <UiTheHeader />
        <div class="flex-1 grid place-items-center w-full p-small mt-big">
            <slot />
        </div>
        <UiTheFooter />
    </div>
</template>

<script>
export default {
 
};
</script>
