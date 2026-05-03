<template>
    <!-- Breadcrumb band -->
    <UiBreadcrumbBand :links="[{ label: 'Home', to: '/' }, { label: config.title }]" />

    <!-- Page grid -->
    <div class="page-grid border-b-3 border-brut">

        <!-- Main column -->
        <div class="main-col border-brut">

            <!-- Category header -->
            <div class="border-b-3 border-brut px-8 pt-8 pb-7 flex items-start justify-between gap-4 mobile:px-5" :style="{ background: config.color }">
                <h1 class="text-[56px] font-bold tracking-[-0.05em] leading-none mobile:text-[40px]">{{ config.title }}</h1>
                <div class="font-mono text-[10px] font-bold uppercase tracking-[0.12em] opacity-40 pt-1 whitespace-nowrap">{{ config.tools.length }} calculators</div>
            </div>

            <!-- Tools section -->
            <div class="px-8 py-7 border-b-3 border-brut mobile:px-5">
                <div class="font-mono text-[10px] font-bold uppercase tracking-[0.15em] opacity-35 mb-4">Calculators</div>
                <div class="tools-grid">
                    <NuxtLink
                        v-for="tool in config.tools"
                        :key="tool.to"
                        :to="tool.to"
                        class="tool-card"
                    >
                        <span class="text-base font-bold tracking-[-0.02em]">{{ tool.label }}</span>
                        <span class="tool-arrow text-lg flex-shrink-0 opacity-30">→</span>
                    </NuxtLink>
                </div>
            </div>

            <!-- Ad slot leaderboard -->
            <UiAdSlot bordered />

            <!-- Blog section -->
            <div v-if="blogPosts.length" class="px-8 py-7 mobile:px-5">
                <div class="flex items-baseline justify-between mb-[18px]">
                    <span class="font-mono text-[10px] font-bold uppercase tracking-[0.15em] opacity-35">Related articles</span>
                    <NuxtLink to="/blog" class="font-mono text-[10px] font-bold uppercase tracking-[0.1em] text-brut no-underline opacity-45 hover:opacity-100 transition-opacity">All posts →</NuxtLink>
                </div>
                <div class="blog-grid">
                    <NuxtLink
                        v-for="post in blogPosts"
                        :key="post.slug"
                        :to="`/blog/${post.slug}`"
                        class="blog-card"
                    >
                        <div class="bg-brut h-20 flex items-center justify-center p-[14px] border-b-3 border-brut">
                            <span class="text-xs font-bold text-cream text-center tracking-[-0.02em] leading-[1.3] whitespace-pre-line">{{ post.thumb }}</span>
                        </div>
                        <div class="bg-cream p-3 flex-1">
                            <div class="text-xs font-semibold leading-[1.4] text-brut">{{ post.title }}</div>
                            <div class="mt-[6px] font-mono text-[9px] font-bold uppercase tracking-[0.1em] opacity-30">Blog</div>
                        </div>
                    </NuxtLink>
                </div>
            </div>
        </div>

        <!-- Sidebar -->
        <div class="sidebar flex flex-col border-brut">

            <div class="px-5 py-4 border-b-3 border-brut bg-brut flex items-center">
                <span class="font-mono text-[10px] font-bold uppercase tracking-[0.12em] text-lavender">Other Categories</span>
            </div>

            <NuxtLink
                v-for="other in otherCategories"
                :key="other.slug"
                :to="`/${other.slug}`"
                class="sidebar-cat border-b-3 border-brut no-underline text-brut block"
            >
                <div class="px-5 py-4 border-b border-[rgba(10,10,10,0.1)] flex items-center justify-between" :style="{ background: other.color }">
                    <span class="text-[22px] font-bold tracking-[-0.03em]">{{ other.title }}</span>
                    <span class="text-sm opacity-25 sidebar-arrow">→</span>
                </div>
                <div class="px-5 pt-3 pb-4 flex flex-col gap-[6px]">
                    <span v-for="tool in other.tools.slice(0, 3)" :key="tool.to" class="text-[13px] font-medium opacity-70">{{ tool.label }}</span>
                </div>
            </NuxtLink>

            <UiAdSlot variant="rectangle" bordered class="flex-1" />
        </div>
    </div>
</template>

<script setup>
const props = defineProps({
    slug: {
        type: String,
        required: true,
    },
})

const { config, otherCategories } = useCategoryConfig(props.slug)

const runtimeConfig = useRuntimeConfig()
const { data: blogData } = await useFetch(
    `${runtimeConfig.public.API_URL}&content_type=blog&limit=3`
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
        }
    })
})

const SITE = 'https://www.prettycalculators.com'
const route = useRoute()
const canonical = `${SITE}${route.path}`

const itemListLd = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: config.seo.title,
    description: config.seo.description,
    url: canonical,
    itemListElement: config.tools.map((tool, i) => ({
        '@type': 'ListItem',
        position: i + 1,
        name: tool.label,
        url: `${SITE}${tool.to}`,
    })),
}

const breadcrumbLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home',         item: `${SITE}/` },
        { '@type': 'ListItem', position: 2, name: config.title,   item: canonical },
    ],
}

useHead({
    title: config.seo.title,
    link: [
        { rel: 'canonical', href: canonical },
    ],
    script: [
        { type: 'application/ld+json', innerHTML: JSON.stringify(itemListLd) },
        { type: 'application/ld+json', innerHTML: JSON.stringify(breadcrumbLd) },
    ],
    meta: [
        { hid: 'title',               name: 'title',               content: config.seo.title },
        { hid: 'description',         name: 'description',         content: config.seo.description },
        { hid: 'og:url',              property: 'og:url',          content: canonical },
        { hid: 'og-title',            property: 'og:title',        content: config.seo.title },
        { hid: 'og:description',      property: 'og:description',  content: config.seo.description },
        { hid: 'twitter:card',        name: 'twitter:card',        content: 'summary_large_image' },
        { hid: 'twitter:title',       name: 'twitter:title',       content: config.seo.title },
        { hid: 'twitter:description', name: 'twitter:description', content: config.seo.description },
    ],
})
</script>

<style scoped>
.page-grid {
    display: grid;
    grid-template-columns: 1fr 300px;
}

.main-col {
    border-right: 3px solid #0a0a0a;
}

.sidebar {
    border-top: 0;
}

.tools-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
}

.tool-card {
    border: 3px solid #0a0a0a;
    margin: -1.5px;
    padding: 20px 22px;
    background: #fafafa;
    text-decoration: none;
    color: #0a0a0a;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 12px;
    transition: transform 0.08s, box-shadow 0.08s, background 0.08s, color 0.08s;
    position: relative;
}

.tool-card:hover {
    background: #0a0a0a;
    color: #fafafa;
    transform: translate(-3px, -3px);
    box-shadow: 5px 5px 0px #0a0a0a;
    z-index: 2;
}

.tool-card:hover .tool-arrow {
    opacity: 1;
    transform: translateX(3px);
}

.tool-arrow {
    transition: opacity 0.08s, transform 0.08s;
}

.blog-grid {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
}

.blog-card {
    border: 3px solid #0a0a0a;
    margin: -1.5px;
    display: flex;
    flex-direction: column;
    text-decoration: none;
    transition: transform 0.08s, box-shadow 0.08s;
    position: relative;
}

.blog-card:hover {
    transform: translate(-3px, -3px);
    box-shadow: 5px 5px 0px #0a0a0a;
    z-index: 2;
}

.sidebar-cat {
    transition: background 0.08s;
}

.sidebar-cat:hover {
    background: rgba(10, 10, 10, 0.04);
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
    .tools-grid {
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
