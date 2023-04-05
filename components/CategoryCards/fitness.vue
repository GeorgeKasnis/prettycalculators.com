<template>
    <div class="border-2 border-b brutalist-shadow p-big min-h-[20rem]">
        <h1 v-if="hasH1"><nuxt-link class="text-big font-bold" to="/fitness">Fitness</nuxt-link></h1>
        <h2 v-else><nuxt-link class="text-big font-bold" to="/fitness">Fitness</nuxt-link></h2>
        <div class="p-small">
            <div>
                <nuxt-link to="/fitness/bmi-calculator" class="hover:font-bold">BMI Calculator</nuxt-link>
            </div>
            <div>
                <nuxt-link to="/fitness/body-fat-calculator" class="hover:font-bold">Body Fat Calculator</nuxt-link>
            </div>
            <div>
                <nuxt-link to="/fitness/bmr-calculator" class="hover:font-bold">BMR Calculator</nuxt-link>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props:['hasH1']
}
</script>
