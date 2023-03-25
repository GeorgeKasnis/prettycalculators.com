<template>
    <header class="p-small w-full">
        <div class="flex justify-between">
            <div>
                <nuxt-link to="/">Pretty Calculators</nuxt-link>
            </div>
            <nav class="child:mx-2">
                <NuxtLink activeClass="active-link"  to="/fitness">Fitness</NuxtLink>
                <NuxtLink activeClass="active-link"  to="/math">Math</NuxtLink>
                <NuxtLink activeClass="active-link"  to="/unit">Unit</NuxtLink>
            </nav>
        </div>
    </header>
</template>
