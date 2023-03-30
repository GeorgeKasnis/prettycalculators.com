<template>
    <div class="w-screen full-height flex items-center flex-col  pt-16">
        <UiTheHeader />
        <div class="flex-1  w-full p-small mt-big">
             <div class="brutalist-shadow p-big">
                 <div>
                     <h1 class="text-huge font-bold">Error 404</h1>
                     <h2>Page not found</h2>
                 </div>
                 <nuxt-link to="/" class="border-2 p-small inline-block mt-small border-black">Go to back to Homepage</nuxt-link>
             </div>
        </div>
        <UiTheFooter />
    </div>
</template>

<script>
export default {
 
};
</script>
