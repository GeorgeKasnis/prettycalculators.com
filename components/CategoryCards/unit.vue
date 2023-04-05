<template>
    <div class="border-2 border-b brutalist-shadow p-big min-h-[20rem]">
        <h1 v-if="hasH1" class=""><nuxt-link class="text-big font-bold" to="/unit">Unit</nuxt-link></h1>
        <h2 v-else class=""><nuxt-link class="text-big font-bold" to="/unit">Unit</nuxt-link></h2>
        <div class="p-small">
            <div>
                <nuxt-link to="/unit/celsius-to-fahrenheit-converter" class="hover:font-bold">Celsius to Fahrenheit Converter</nuxt-link>
            </div>
            <div>
                <nuxt-link to="/unit/fahrenheit-to-celsius-converter" class="hover:font-bold">Fahrenheit to Celsius Converter</nuxt-link>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props: ["hasH1"],
};
</script>
