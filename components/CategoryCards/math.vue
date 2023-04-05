<template>
    <div class="border-2 border-b brutalist-shadow p-big min-h-[20rem]">
        <h1 v-if="hasH1" class=""><nuxt-link class="text-big font-bold" to="/math">Math</nuxt-link></h1>
        <h2 v-else class=""><nuxt-link class="text-big font-bold" to="/math">Math</nuxt-link></h2>
        <div class="p-small">
            <nuxt-link to="/math/percentage-calculator" class="hover:font-bold">Percentage Calculator</nuxt-link>
        </div>
    </div>
</template>

<script>
export default {
    props: ["hasH1"],
};
</script>
