<template>
    <div class="w-screen full-height flex items-center flex-col border-t border-black">
        <UiTheHeader />
        <div class="flex-1 grid place-items-center w-full">
            <slot />
        </div>
        <UiTheFooter />
    </div>
</template>

<script>
export default {
 
};
</script>
