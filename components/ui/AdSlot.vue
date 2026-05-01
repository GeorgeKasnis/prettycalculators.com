<template>
    <div
        class="flex flex-col items-center justify-center gap-1"
        :class="[sizeClass, bordered ? 'border-b-3 border-brut' : '', dark ? 'bg-white/[0.04]' : 'bg-ink/[0.03]']"
        :style="bordered ? '' : (dark ? 'border: 2px dashed rgba(255,255,255,0.15);' : 'border: 2px dashed rgba(10,10,10,0.2);')"
    >
        <span class="font-mono text-[9px] font-bold uppercase tracking-[0.14em]" :class="dark ? 'text-white/20' : 'text-[rgba(10,10,10,0.2)]'">Advertisement</span>
        <span class="font-mono text-[9px]" :class="dark ? 'text-white/10' : 'text-[rgba(10,10,10,0.13)]'">{{ size }}</span>
    </div>
</template>

<script setup>
const props = defineProps({
    variant: { type: String, default: 'leaderboard' },
    dark: { type: Boolean, default: false },
    bordered: { type: Boolean, default: false },
})

const size = computed(() => props.variant === 'rectangle' ? '300 × 250' : '728 × 90')
const sizeClass = computed(() => props.variant === 'rectangle' ? 'min-h-[250px]' : 'h-[90px]')
</script>
