<template>
    <div
        class="border-b-3 border-brut flex items-center gap-[10px] px-7 h-11"
        :style="{ background: dark ? '#0a0a0a' : color }"
    >
        <template v-for="(link, i) in links" :key="i">
            <span v-if="i > 0" :class="['font-mono text-[11px] opacity-30', dark ? 'text-cream' : 'text-brut']">/</span>
            <NuxtLink
                v-if="link.to"
                :to="link.to"
                :class="['font-mono text-[11px] font-bold uppercase tracking-[0.1em] no-underline opacity-50 hover:opacity-100 transition-opacity', dark ? 'text-cream' : 'text-brut']"
            >{{ link.label }}</NuxtLink>
            <span
                v-else
                :class="['font-mono text-[11px] font-bold uppercase tracking-[0.1em] truncate', dark ? 'text-cream' : 'text-brut']"
            >{{ link.label }}</span>
        </template>
    </div>
</template>

<script setup>
defineProps({
    links: { type: Array, required: true },
    color: { type: String, default: '#f5e642' },
    dark:  { type: Boolean, default: false },
})
</script>
