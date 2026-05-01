<template>
    <div class="bg-brut-yellow border-b-3 border-brut flex items-center gap-[10px] px-7 h-11">
        <template v-for="(link, i) in links" :key="i">
            <span v-if="i > 0" class="font-mono text-[11px] text-brut opacity-30">/</span>
            <NuxtLink
                v-if="link.to"
                :to="link.to"
                class="font-mono text-[11px] font-bold uppercase tracking-[0.1em] text-brut no-underline opacity-50 hover:opacity-100 transition-opacity"
            >{{ link.label }}</NuxtLink>
            <span
                v-else
                class="font-mono text-[11px] font-bold uppercase tracking-[0.1em] text-brut truncate"
            >{{ link.label }}</span>
        </template>
    </div>
</template>

<script setup>
defineProps({
    links: { type: Array, required: true },
})
</script>
