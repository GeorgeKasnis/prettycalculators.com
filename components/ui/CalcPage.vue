<template>
    <!-- Breadcrumb band -->
    <UiBreadcrumbBand :links="[{ label: 'Home', to: '/' }, { label: config.title, to: `/${category}` }, { label: title }]" />

    <!-- Page grid -->
    <div class="page-grid border-b-3 border-brut">

        <!-- Main column -->
        <div class="main-col border-brut">

            <!-- Calc header — always lavender so the focus stays on the tool -->
            <div class="border-b-3 border-brut px-8 pt-7 pb-6 flex items-end justify-between gap-4 mobile:px-5 bg-lavender">
                <div>
                    <div class="font-mono text-[10px] font-bold uppercase tracking-[0.12em] opacity-40 mb-[6px]">{{ config.title }}</div>
                    <h1 class="text-[44px] font-bold tracking-[-0.05em] leading-none mobile:text-[32px]">{{ title }}</h1>
                </div>
            </div>

            <!-- Calculator slot -->
            <div class="calc-wrapper px-8 py-7 border-b-3 border-brut mobile:px-5">
                <slot name="calc" />
            </div>

            <!-- Leaderboard ad -->
            <UiAdSlot bordered />

            <!-- Description & example prose -->
            <div v-if="$slots.description || $slots.example" class="px-8 py-7 border-b-3 border-brut mobile:px-5">
                <div class="font-mono text-[10px] font-bold uppercase tracking-[0.15em] opacity-35 mb-[14px]">About this tool</div>
                <div class="prose-brut">
                    <slot name="description" />
                    <template v-if="$slots.example">
                        <h2>Example</h2>
                        <slot name="example" />
                    </template>
                </div>
            </div>
        </div>

        <!-- Sidebar -->
        <div class="sidebar flex flex-col border-brut">

            <!-- Category tools header -->
            <div class="px-5 py-4 border-b-3 border-brut bg-brut flex items-center">
                <span class="font-mono text-[10px] font-bold uppercase tracking-[0.12em] text-lavender">{{ config.title }} Calculators</span>
            </div>

            <!-- Tool links — thin separators, lavender active -->
            <div class="border-b-3 border-brut bg-cream">
                <NuxtLink
                    v-for="tool in config.tools"
                    :key="tool.to"
                    :to="tool.to"
                    class="tool-link"
                    :class="$route.path === tool.to || $route.path === tool.to + '/' ? 'active' : ''"
                >
                    <span class="text-[14px] font-medium">{{ tool.label }}</span>
                    <span class="text-xs opacity-25 tool-arrow">→</span>
                </NuxtLink>
            </div>

            <!-- Other categories header -->
            <div class="px-5 py-4 border-b-3 border-brut bg-brut flex items-center">
                <span class="font-mono text-[10px] font-bold uppercase tracking-[0.12em] text-lavender">Other Categories</span>
            </div>

            <NuxtLink
                v-for="other in otherCategories"
                :key="other.slug"
                :to="`/${other.slug}`"
                class="sidebar-cat border-b-3 border-brut no-underline text-brut block"
            >
                <div class="px-5 py-[14px] pb-[10px] border-b border-[rgba(10,10,10,0.1)] flex items-center justify-between" :style="{ background: other.color }">
                    <span class="text-[20px] font-bold tracking-[-0.03em]">{{ other.title }}</span>
                    <span class="text-sm opacity-25 sidebar-arrow">→</span>
                </div>
                <div class="px-5 pt-2 pb-[14px] flex flex-col gap-[5px] bg-cream">
                    <span v-for="tool in other.tools.slice(0, 3)" :key="tool.to" class="text-[13px] font-medium opacity-65">{{ tool.label }}</span>
                </div>
            </NuxtLink>

            <!-- Rectangle ad -->
            <UiAdSlot variant="rectangle" bordered class="flex-1" />
        </div>
    </div>
</template>

<script setup>
const props = defineProps({
    title: { type: String, required: true },
    category: { type: String, required: true },
})

const { config, otherCategories } = useCategoryConfig(props.category)
</script>

<style scoped>
.page-grid {
    display: grid;
    grid-template-columns: 1fr 300px;
}

.main-col {
    border-right: 3px solid #0a0a0a;
}

/* Remove legacy FormContainer width cap and hide its duplicate h1 */
.calc-wrapper :deep(section) {
    max-width: none;
    width: 100%;
}

.calc-wrapper :deep(section > h1:first-child) {
    display: none;
}

/* Tool links — design uses thin separators between items, not thick brut borders */
.tool-link {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 14px 20px;
    border-bottom: 1.5px solid rgba(10, 10, 10, 0.1);
    text-decoration: none;
    color: #0a0a0a;
    transition: background 0.08s, padding-left 0.08s;
}

.tool-link:last-child {
    border-bottom: none;
}

.tool-link.active {
    background: #ddd6ff;
    font-weight: 700;
}

.tool-link:not(.active):hover {
    background: rgba(221, 214, 255, 0.4);
    padding-left: 24px;
}

.tool-link:not(.active):hover .tool-arrow {
    opacity: 0.6;
}

.tool-arrow {
    flex-shrink: 0;
    transition: opacity 0.08s;
}

/* Prose */
.prose-brut :deep(p) {
    margin-bottom: 1rem;
    line-height: 1.65;
    font-size: 15px;
    opacity: 0.7;
    max-width: 640px;
}

.prose-brut :deep(ul),
.prose-brut :deep(ol) {
    margin-bottom: 1rem;
    padding-left: 1.5rem;
    opacity: 0.7;
}

.prose-brut :deep(li) {
    margin-bottom: 0.4rem;
    line-height: 1.6;
    font-size: 15px;
}

.prose-brut :deep(h2) {
    font-size: 22px;
    font-weight: 700;
    letter-spacing: -0.03em;
    margin-top: 1.5rem;
    margin-bottom: 10px;
    opacity: 1;
}

.prose-brut :deep(h3) {
    font-size: 16px;
    font-weight: 700;
    letter-spacing: -0.02em;
    margin-top: 1.25rem;
    margin-bottom: 8px;
}

.prose-brut :deep(h4) {
    font-size: 14px;
    font-weight: 700;
    margin-top: 1rem;
    margin-bottom: 6px;
}

.prose-brut :deep(b),
.prose-brut :deep(strong) {
    opacity: 1;
}

/* Other-category sidebar cards */
.sidebar-cat {
    transition: background 0.08s;
}

.sidebar-cat:hover {
    background: rgba(10, 10, 10, 0.03);
}

.sidebar-cat:hover .sidebar-arrow {
    opacity: 0.7;
    transform: translateX(2px);
}

.sidebar-arrow {
    transition: opacity 0.08s, transform 0.08s;
}

@media (max-width: 900px) {
    .page-grid {
        grid-template-columns: 1fr;
    }
    .main-col {
        border-right: none;
    }
    .sidebar {
        border-top: 3px solid #0a0a0a;
    }
}
</style>
