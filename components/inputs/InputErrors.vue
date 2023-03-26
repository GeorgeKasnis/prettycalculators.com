<template>
    <transition name="fade-in">
        <div class="text-red-700 h-14 mt-small transition-all duration-300" :class="errors ? 'opacity-100' : 'opacity-0'">{{ errors }}</div>
    </transition>
</template>

<script>
export default {
    props: ["errors"],
};
</script>
