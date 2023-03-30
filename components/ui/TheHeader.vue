<template>
    <header class="p-small w-full fixed top-0 left-0 z-50 h-16 flex justify-between mobile:h-auto items-center bg-[#fafad2] border-b-2 border-transparent mb-huge transition-all" :class="isScrolled ? '!border-black' : ''">
        <div class="flex justify-between w-full items-center mobile:flex-col">
            <div>
                <nuxt-link class="text-big" to="/">Pretty Calculators</nuxt-link>
            </div>
            <nav class="child:mx-2">
                <NuxtLink activeClass="active-link" to="/fitness">Fitness</NuxtLink>
                <NuxtLink activeClass="active-link" to="/math">Math</NuxtLink>
                <NuxtLink activeClass="active-link" to="/unit">Unit</NuxtLink>
            </nav>
        </div>
    </header>
</template>

<script>
export default {
    data() {
        return {
            isScrolled: false,
        };
    },
    mounted() {
        window.addEventListener("scroll", this.handleScroll);
    },
    methods: {
        handleScroll() {
            this.isScrolled = window.scrollY > 10 ? true : false;
        },
    },
    beforeUnmount() {
        window.removeEventListener("scroll", this.handleScroll);
    },
};
</script>
