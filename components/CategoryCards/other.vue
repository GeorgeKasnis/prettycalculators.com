<template>
    <div class="border-2 border-b brutalist-shadow p-big min-h-[20rem]">
        <h1 v-if="hasH1" class=""><nuxt-link class="text-big font-bold" to="/other">Other</nuxt-link></h1>
        <h2 v-else class=""><nuxt-link class="text-big font-bold" to="/other">Other</nuxt-link></h2>
        <div class="">
            <nuxt-link to="/other/aqua-calculator" class="hover:font-bold">Aqua Calculator</nuxt-link>
        </div>
        <div class="">
            <nuxt-link to="/other/age-calculator" class="hover:font-bold">Age Calculator</nuxt-link>
        </div>
        <div class="">
            <nuxt-link to="/other/px-to-rem-calculator" class="hover:font-bold">Px to Rem Calculator</nuxt-link>
        </div>
        <div>
            <nuxt-link to="/other/pizza-calculator" class="hover:font-bold">Pizza Calculator</nuxt-link>
        </div>
    </div>
</template>

<script>
export default {
    props: ["hasH1"],
};
</script>
