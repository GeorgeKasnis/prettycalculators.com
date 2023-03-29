<template>
    <header class="p-small w-full fixed top-0 left-0 z-50 h-16 flex justify-between items-center bg-[#fafad2] border-b mb-huge">
        <div class="flex justify-between w-full">
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
