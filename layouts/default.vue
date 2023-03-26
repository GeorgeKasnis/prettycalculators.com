<template>
    <div class="w-screen full-height flex items-center flex-col ">
        <UiTheHeader />
        <div class="flex-1 grid place-items-center w-full p-small">
            <slot />
        </div>
        <UiTheFooter />
    </div>
</template>

<script>
export default {
 
};
</script>
