<template>
    <Transition name="co-fade">
        <div v-if="show" class="co-block">
            <div class="co-header" :style="{ background: color || '#ddd6ff' }">
                <span class="co-title">{{ title || 'Result' }}</span>
                <span v-if="meta" class="co-meta">{{ meta }}</span>
            </div>
            <div class="co-grid" :class="{ 'co-single': single }">
                <slot />
            </div>
        </div>
    </Transition>
</template>

<script setup>
defineProps({
    show:   { type: Boolean, required: true },
    title:  String,
    meta:   String,
    color:  String,
    single: Boolean,
})
</script>

<style scoped>
.co-block {
    margin-top: 22px;
    border: 3px solid #0a0a0a;
    background: #fff;
}

.co-header {
    border-bottom: 3px solid #0a0a0a;
    padding: 16px 20px;
    display: flex;
    align-items: baseline;
    justify-content: space-between;
    gap: 12px;
}
.co-title {
    font-size: 24px;
    font-weight: 700;
    letter-spacing: -0.04em;
    line-height: 1;
}
.co-meta {
    font-family: 'Space Mono', monospace;
    font-size: 10px;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.14em;
    opacity: 0.5;
}

.co-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
}
.co-single {
    grid-template-columns: 1fr;
}

/* Internal cell borders via deep */
.co-grid :deep(.co-cell) {
    border-right: 3px solid #0a0a0a;
    border-bottom: 3px solid #0a0a0a;
}
.co-grid :deep(.co-cell:nth-child(2n)) { border-right: none; }
.co-grid :deep(.co-cell:last-child)    { border-bottom: none; }
.co-grid :deep(.co-cell:nth-last-child(2):nth-child(odd)) { border-bottom: none; }
.co-single :deep(.co-cell) { border-right: none; border-bottom: none; }

.co-fade-enter-active,
.co-fade-leave-active { transition: opacity 0.15s ease; }
.co-fade-enter-from,
.co-fade-leave-to { opacity: 0; }

@media (max-width: 767px) {
    .co-header { padding: 12px 16px; }
    .co-title  { font-size: 20px; }
    .co-grid   { grid-template-columns: 1fr 1fr; }
}
</style>
