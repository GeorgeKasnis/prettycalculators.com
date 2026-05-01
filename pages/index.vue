<template>
    <!-- Hero band -->
    <div class="border-b-3 border-ink bg-yellow flex items-center gap-8 px-7 h-[52px] overflow-hidden">
        <span class="font-mono text-[11px] font-bold uppercase tracking-[0.12em] opacity-50 whitespace-nowrap">Collection</span>
        <span class="text-base font-bold tracking-tight">Find the calculator you need</span>
        <span class="ml-auto font-mono text-[11px] font-bold bg-ink text-yellow px-3 py-1 tracking-widest whitespace-nowrap">15 TOOLS</span>
    </div>

    <!-- Ad slot: leaderboard -->
    <div class="mx-7 my-5">
        <UiAdSlot variant="leaderboard" />
    </div>

    <!-- Category cards grid -->
    <div class="px-7 pb-7 grid grid-cols-4 tablet:grid-cols-2 mobile:grid-cols-1 border-b-3 border-ink">
        <div
            v-for="(cat, i) in categories"
            :key="cat.slug"
            class="cat-card border-3 border-ink -m-[1.5px] bg-cream flex flex-col"
        >
            <NuxtLink :to="`/${cat.slug}`" class="px-6 py-5 border-b-3 border-ink flex items-start justify-between gap-2 no-underline text-ink" :style="{ background: cat.color }">
                <div class="text-[32px] font-bold tracking-[-0.04em] leading-none">{{ cat.title }}</div>
                <div class="font-mono text-[11px] font-bold opacity-35 pt-1 tracking-wide">{{ String(i + 1).padStart(2, '0') }}</div>
            </NuxtLink>
            <div class="px-6 py-5 flex flex-col flex-1">
                <NuxtLink
                    v-for="tool in cat.tools"
                    :key="tool.label"
                    :to="tool.to"
                    class="tool-link text-sm font-medium py-2 border-b border-ink/10 last:border-b-0 flex items-center justify-between no-underline text-ink"
                >
                    {{ tool.label }}
                    <span class="tool-link-arrow text-xs opacity-0">→</span>
                </NuxtLink>
            </div>
        </div>
    </div>

    <!-- Bottom row -->
    <div class="bottom-row grid border-b-3 border-ink">

        <!-- Feature block -->
        <div class="px-7 py-8 border-r-3 border-ink mobile:border-r-0 mobile:border-b-3">
            <div class="font-mono text-[10px] font-bold uppercase tracking-[0.15em] opacity-40 mb-3">About Pretty Calculators</div>
            <div class="text-[42px] font-bold tracking-[-0.04em] leading-[1.05] max-w-lg mobile:text-[30px]">
                Every tool<br>you need.<br><em class="not-italic text-[#5c3bef]">Right here.</em>
            </div>
            <p class="mt-4 text-[15px] opacity-60 max-w-sm leading-relaxed">
                Fast, focused calculators for fitness, math, conversions and more. Built to get you the answer quickly.
            </p>

            <!-- Blog section -->
            <div v-if="blogPosts.length" class="mt-7 pt-6 border-t-3 border-ink">
                <div class="flex items-baseline justify-between mb-5">
                    <span class="font-mono text-[10px] font-bold uppercase tracking-[0.15em] opacity-35">From the blog</span>
                    <NuxtLink to="/blog" class="font-mono text-[10px] font-bold uppercase tracking-[0.1em] text-ink opacity-45 hover:opacity-100 no-underline transition-opacity">All posts →</NuxtLink>
                </div>
                <div class="blog-grid">
                    <NuxtLink
                        v-for="post in blogPosts"
                        :key="post.slug"
                        :to="`/blog/${post.slug}`"
                        class="blog-card border-3 border-ink -m-[1.5px] bg-ink flex flex-col no-underline"
                    >
                        <div class="h-[90px] bg-ink flex items-center justify-center px-4 border-b-3 border-ink">
                            <span class="text-[13px] font-bold text-cream text-center tracking-[-0.02em] leading-snug whitespace-pre-line">{{ post.thumb }}</span>
                        </div>
                        <div class="bg-cream px-4 py-3 flex-1">
                            <div class="text-xs font-semibold leading-snug text-ink">{{ post.title }}</div>
                            <div class="mt-2 font-mono text-[9px] font-bold uppercase tracking-[0.1em] opacity-30">{{ post.tag }}</div>
                        </div>
                    </NuxtLink>
                </div>
            </div>
        </div>

        <!-- CTA block -->
        <div class="bg-ink px-7 py-8 flex flex-col justify-between gap-5">
            <div>
                <div class="font-mono text-[10px] font-bold uppercase tracking-[0.15em] text-white/40 mb-1">Total tools</div>
                <div class="text-[96px] font-bold tracking-[-0.06em] text-lavender leading-none">15</div>
                <div class="font-mono text-xs text-white/50 tracking-wide">& growing</div>
            </div>
            <UiAdSlot variant="rectangle" :dark="true" />
        </div>
    </div>
</template>

<script setup>
definePageMeta({ layout: 'brutalist' })

const { otherCategories: categories } = useCategoryConfig('_')

const runtimeConfig = useRuntimeConfig()
const { data: blogData } = await useFetch(
    `${runtimeConfig.public.API_URL}&content_type=blog&limit=5`
)

const { thumbLines } = useBlogUtils()

const blogPosts = computed(() => {
    if (!blogData.value?.items?.length) return []
    return blogData.value.items.map(item => {
        const title = item.fields.title ?? ''
        return {
            slug: item.fields.slug,
            title,
            thumb: thumbLines(title).join('\n'),
            tag: 'Blog',
        }
    })
})

useHead({
    title: 'Pretty Calculators — Find the calculator you need',
    meta: [
        { hid: 'title', name: 'title', content: 'Pretty Calculators — Find the calculator you need' },
        {
            hid: 'description',
            name: 'description',
            content: 'Fast, focused calculators for fitness, math, conversions and more. BMI, BMR, TDEE, Body Fat, Percentage and more — free and beautifully designed.',
        },
        { hid: 'og-title', property: 'og:title', content: 'Pretty Calculators — Find the calculator you need' },
        {
            hid: 'og:description',
            property: 'og:description',
            content: 'Fast, focused calculators for fitness, math, conversions and more. BMI, BMR, TDEE, Body Fat, Percentage and more — free and beautifully designed.',
        },
    ],
})
</script>

<style scoped>
.cat-card {
    transition: transform 0.08s, box-shadow 0.08s;
    position: relative;
}
.cat-card:hover {
    transform: translate(-3px, -3px);
    box-shadow: 8px 8px 0px #0a0a0a;
    z-index: 10;
}

.tool-link:hover {
    padding-left: 6px;
}
.tool-link:hover .tool-link-arrow {
    opacity: 0.5;
}

.blog-grid {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    margin: -1.5px;
}

.blog-card {
    transition: transform 0.08s, box-shadow 0.08s;
    position: relative;
}
.blog-card:hover {
    transform: translate(-3px, -3px);
    box-shadow: 5px 5px 0px #0a0a0a;
    z-index: 10;
}

.bottom-row {
    grid-template-columns: 2fr 1fr;
}

@media (max-width: 900px) {
    .bottom-row {
        grid-template-columns: 1fr;
    }
    .blog-grid {
        grid-template-columns: 1fr 1fr;
    }
}

@media (max-width: 560px) {
    .blog-grid {
        grid-template-columns: 1fr;
    }
}
</style>
