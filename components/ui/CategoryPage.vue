<template>
    <!-- Breadcrumb band -->
    <UiBreadcrumbBand :links="[{ label: 'Home', to: '/' }, { label: config.title }]" color="#fafafa" />

    <!-- Hero -->
    <header class="cat-hero" :style="{ '--c': config.color }">
        <div>
            <div class="cat-hero-eyebrow">Category {{ config.hero.num }}</div>
            <h1 class="cat-hero-title">{{ config.hero.titlePre }} <em>{{ config.hero.titleEm }}</em></h1>
            <p class="cat-hero-sub">{{ config.hero.sub }}</p>
        </div>
        <div class="cat-hero-count">{{ config.tools.length }} {{ config.kind }} &middot; Updated weekly</div>
        <span class="cat-hero-mark" aria-hidden="true">{{ config.hero.mark }}</span>
    </header>

    <div class="cat-layout" :style="{ '--c': config.color }">
        <main class="cat-main">
            <!-- Filter -->
            <div v-if="config.tools.length > 6" class="filter-box">
                <span class="filter-icon">⌕</span>
                <input
                    v-model="toolSearch"
                    :placeholder="`Filter ${config.tools.length} ${config.kind}…`"
                    autocomplete="off"
                    spellcheck="false"
                />
                <button v-if="toolSearch" class="filter-clear" @click="toolSearch = ''">Clear</button>
            </div>

            <!-- Tool grid -->
            <div v-if="filteredTools.length" class="tools-grid">
                <NuxtLink
                    v-for="tool in filteredTools"
                    :key="tool.to"
                    :to="tool.to"
                    class="tool-row"
                >
                    <span class="tool-row-num">{{ tool.num }}</span>
                    <span class="tool-row-name">{{ tool.label }}</span>
                    <span class="tool-row-arrow">→</span>
                </NuxtLink>
            </div>
            <div v-else class="no-match">No {{ config.kind }} match your filter.</div>

            <!-- Suggested articles -->
            <div v-if="blogPosts.length" class="suggested">
                <div class="suggested-head">
                    <span class="suggested-title">Suggested articles</span>
                    <NuxtLink to="/blog" class="suggested-all">All posts →</NuxtLink>
                </div>
                <div class="suggested-grid">
                    <NuxtLink
                        v-for="post in blogPosts"
                        :key="post.slug"
                        :to="`/blog/${post.slug}`"
                        class="post-card"
                        :style="{ '--cc': post.color }"
                    >
                        <div class="post-card-top"><span class="post-card-cat">{{ post.cat }}</span></div>
                        <div class="post-card-body"><h3 class="post-card-title">{{ post.title }}</h3></div>
                        <div class="post-card-foot"><span>{{ post.minutes }} min read</span><span class="arrow">→</span></div>
                    </NuxtLink>
                </div>
            </div>
        </main>

        <!-- Sidebar -->
        <aside class="cat-side">
            <div class="side-head">Other categories</div>
            <div
                v-for="other in otherCategories"
                :key="other.slug"
                class="side-cat"
                :style="{ '--cc': other.color }"
            >
                <NuxtLink :to="`/${other.slug}`" class="side-cat-head">
                    <span class="side-cat-name">{{ other.title }}</span>
                    <b>{{ other.tools.length }}</b>
                </NuxtLink>
                <div class="side-cat-links">
                    <NuxtLink v-for="tool in other.tools.slice(0, 3)" :key="tool.to" :to="tool.to">{{ tool.label }}</NuxtLink>
                </div>
            </div>
            <div class="side-ad">
                <UiAdSlot variant="rectangle" />
            </div>
        </aside>
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

const toolSearch = ref('')
const filteredTools = computed(() => {
    const all = config.tools.map((t, i) => ({ ...t, num: String(i + 1).padStart(2, '0') }))
    const q = toolSearch.value.trim().toLowerCase()
    if (!q) return all
    return all.filter(t => t.label.toLowerCase().includes(q))
})

const runtimeConfig = useRuntimeConfig()
const { data: blogData } = await useFetch(
    `${runtimeConfig.public.API_URL}&content_type=blog&limit=3`
)

const { postCategory } = useBlogUtils()

const CAT_COLORS = { fitness: '#ddd6ff', math: '#f5e642', maths: '#f5e642', finance: '#d4f5d4', other: '#ffd6d6', tools: '#cfe8f7' }

const readTime = (post) => {
    try {
        const content = post.fields?.content
        if (!content) return 1
        const wordCount = JSON.stringify(content).split(/\s+/).length
        return Math.max(1, Math.ceil(wordCount / 200))
    } catch { return 1 }
}

const blogPosts = computed(() => {
    if (!blogData.value?.items?.length) return []
    return blogData.value.items.map(item => {
        const cat = postCategory(item)
        return {
            slug: item.fields.slug,
            title: item.fields.title ?? '',
            cat: cat ? cat.charAt(0).toUpperCase() + cat.slice(1) : 'Blog',
            color: CAT_COLORS[cat] ?? '#ddd6ff',
            minutes: readTime(item),
        }
    })
})

const SITE = 'https://prettycalculators.com'
const route = useRoute()
const canonical = `${SITE}${route.path.replace(/\/+$/, '') || '/'}`

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
/* ── Hero ── */
.cat-hero {
    border-bottom: 3px solid #0a0a0a;
    background: #0a0a0a;
    color: #fafafa;
    padding: 52px 28px 44px;
    display: grid;
    grid-template-columns: 1fr auto;
    gap: 32px;
    align-items: end;
    position: relative;
    overflow: hidden;
}

.cat-hero-mark {
    position: absolute;
    right: 200px;
    top: -50px;
    font-family: 'Space Mono', monospace;
    font-size: 220px;
    font-weight: 700;
    color: var(--c);
    opacity: 0.06;
    pointer-events: none;
    user-select: none;
    line-height: 1;
    white-space: nowrap;
}

.cat-hero-eyebrow {
    font-family: 'Space Mono', monospace;
    font-size: 11px;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.18em;
    display: inline-flex;
    align-items: center;
    gap: 10px;
    margin-bottom: 16px;
    color: var(--c);
}

.cat-hero-eyebrow::before {
    content: '';
    width: 9px;
    height: 9px;
    background: var(--c);
    border: 1.5px solid rgba(255, 255, 255, 0.3);
}

.cat-hero-title {
    font-size: clamp(44px, 5.5vw, 76px);
    font-weight: 700;
    letter-spacing: -0.05em;
    line-height: 0.95;
}

.cat-hero-title em {
    font-style: normal;
    color: var(--c);
}

.cat-hero-sub {
    margin-top: 14px;
    font-size: 15px;
    opacity: 0.55;
    max-width: 440px;
    line-height: 1.5;
}

.cat-hero-count {
    font-family: 'Space Mono', monospace;
    font-size: 11px;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.1em;
    background: var(--c);
    color: #0a0a0a;
    border: 3px solid #0a0a0a;
    box-shadow: 6px 6px 0 #5c3bef;
    padding: 14px 18px;
    white-space: nowrap;
    position: relative;
    z-index: 1;
}

/* ── Layout ── */
.cat-layout {
    display: grid;
    grid-template-columns: minmax(0, 1fr) 300px;
    align-items: start;
    border-bottom: 3px solid #0a0a0a;
}

.cat-main {
    padding: 28px;
    border-right: 3px solid #0a0a0a;
    min-height: 100%;
}

/* ── Filter ── */
.filter-box {
    display: flex;
    align-items: stretch;
    border: 3px solid #0a0a0a;
    background: #fafafa;
    box-shadow: 5px 5px 0 #0a0a0a;
    margin-bottom: 24px;
    max-width: 640px;
}

.filter-box:focus-within {
    box-shadow: 5px 5px 0 #5c3bef;
}

.filter-icon {
    display: flex;
    align-items: center;
    padding-left: 16px;
    font-size: 16px;
    opacity: 0.4;
}

.filter-box input {
    flex: 1;
    border: none;
    outline: none;
    background: transparent;
    font-family: 'Space Grotesk', sans-serif;
    font-size: 16px;
    font-weight: 500;
    padding: 14px;
    color: #0a0a0a;
    min-width: 0;
}

.filter-box input::placeholder { color: rgba(10, 10, 10, 0.4); }

.filter-clear {
    border: none;
    border-left: 2px solid #0a0a0a;
    background: #ffd6d6;
    font-family: 'Space Mono', monospace;
    font-size: 10px;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.1em;
    padding: 0 14px;
    cursor: pointer;
    color: #0a0a0a;
}

/* ── Tool grid ── */
.tools-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
}

.tool-row {
    border: 3px solid #0a0a0a;
    margin: -1.5px;
    background: #fafafa;
    display: flex;
    align-items: center;
    gap: 14px;
    padding: 20px 22px;
    text-decoration: none;
    color: #0a0a0a;
    transition: transform 0.08s, box-shadow 0.08s, background 0.08s;
    position: relative;
}

.tool-row:hover {
    transform: translate(-3px, -3px);
    box-shadow: 8px 8px 0 #0a0a0a;
    z-index: 2;
    background: var(--c);
    color: #0a0a0a;
}

.tool-row-num {
    font-family: 'Space Mono', monospace;
    font-size: 10px;
    font-weight: 700;
    opacity: 0.3;
    flex-shrink: 0;
    width: 22px;
}

.tool-row-name {
    font-size: 17px;
    font-weight: 700;
    letter-spacing: -0.01em;
    line-height: 1.2;
}

.tool-row-arrow {
    margin-left: auto;
    font-size: 15px;
    opacity: 0.25;
    transition: opacity 0.1s, transform 0.1s;
}

.tool-row:hover .tool-row-arrow {
    opacity: 1;
    transform: translateX(4px);
}

.no-match {
    border: 3px solid #0a0a0a;
    background: #fafafa;
    padding: 24px;
    font-family: 'Space Mono', monospace;
    font-size: 13px;
    opacity: 0.6;
}

/* ── Suggested articles ── */
.suggested { margin-top: 36px; }

.suggested-head {
    display: flex;
    align-items: baseline;
    justify-content: space-between;
    margin-bottom: 16px;
}

.suggested-title {
    font-family: 'Space Mono', monospace;
    font-size: 10px;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.15em;
    opacity: 0.4;
}

.suggested-all {
    font-family: 'Space Mono', monospace;
    font-size: 10px;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.1em;
    color: #0a0a0a;
    text-decoration: none;
    opacity: 0.5;
    transition: opacity 0.1s;
}

.suggested-all:hover { opacity: 1; color: #0a0a0a; }

.suggested-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
}

.post-card {
    border: 3px solid #0a0a0a;
    margin: -1.5px;
    background: #fafafa;
    display: flex;
    flex-direction: column;
    text-decoration: none;
    color: #0a0a0a;
    transition: transform 0.08s, box-shadow 0.08s;
    position: relative;
}

.post-card:hover {
    transform: translate(-3px, -3px);
    box-shadow: 8px 8px 0 #0a0a0a;
    z-index: 2;
    color: #0a0a0a;
}

.post-card-top {
    padding: 13px 16px;
    border-bottom: 3px solid #0a0a0a;
    display: flex;
    align-items: center;
    justify-content: space-between;
    background: var(--cc, #ddd6ff);
}

.post-card-cat {
    display: flex;
    align-items: center;
    gap: 8px;
    font-family: 'Space Mono', monospace;
    font-size: 10px;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.12em;
}

.post-card-cat::before {
    content: '';
    width: 9px;
    height: 9px;
    background: #fafafa;
    border: 2px solid #0a0a0a;
}

.post-card-body {
    padding: 16px;
    flex: 1;
}

.post-card-title {
    font-size: 16px;
    font-weight: 700;
    letter-spacing: -0.02em;
    line-height: 1.25;
    text-wrap: pretty;
}

.post-card-foot {
    padding: 10px 16px;
    border-top: 1.5px solid rgba(10, 10, 10, 0.12);
    display: flex;
    justify-content: space-between;
    font-family: 'Space Mono', monospace;
    font-size: 10px;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.1em;
    opacity: 0.45;
}

.post-card-foot .arrow { transition: transform 0.1s; }
.post-card:hover .post-card-foot .arrow { transform: translateX(4px); }

/* ── Sidebar ── */
.cat-side {
    position: sticky;
    top: 64px;
    display: flex;
    flex-direction: column;
}

.side-head {
    font-family: 'Space Mono', monospace;
    font-size: 10px;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.14em;
    padding: 14px 20px;
    background: #0a0a0a;
    color: #fafafa;
    border-bottom: 3px solid #0a0a0a;
}

.side-cat {
    border-bottom: 3px solid #0a0a0a;
    background: #fafafa;
}

.side-cat-head {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 14px 20px;
    background: var(--cc);
    border-bottom: 1.5px solid rgba(10, 10, 10, 0.15);
    text-decoration: none;
    color: #0a0a0a;
    transition: filter 0.1s;
}

.side-cat-head:hover {
    filter: brightness(0.96);
    color: #0a0a0a;
}

.side-cat-name {
    font-size: 19px;
    font-weight: 700;
    letter-spacing: -0.02em;
}

.side-cat-head b {
    font-family: 'Space Mono', monospace;
    font-size: 10px;
    font-weight: 700;
    background: #0a0a0a;
    color: #fafafa;
    padding: 2px 8px;
}

.side-cat-links {
    display: flex;
    flex-direction: column;
    padding: 8px 0;
}

.side-cat-links a {
    font-size: 13px;
    font-weight: 600;
    color: #0a0a0a;
    text-decoration: none;
    padding: 7px 20px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    transition: background 0.1s;
}

.side-cat-links a::after {
    content: '→';
    font-size: 11px;
    opacity: 0;
    transition: opacity 0.1s;
}

.side-cat-links a:hover {
    background: var(--cc);
    color: #0a0a0a;
}

.side-cat-links a:hover::after { opacity: 0.5; }

.side-ad {
    padding: 20px;
    background: #fafafa;
    flex: 1;
}

/* ── Responsive ── */
@media (max-width: 1000px) {
    .cat-layout { grid-template-columns: 1fr; }
    .cat-main { border-right: none; }
    .cat-side { position: static; border-top: 3px solid #0a0a0a; }
}

@media (max-width: 900px) {
    .cat-hero {
        grid-template-columns: 1fr;
        align-items: start;
        padding: 40px 24px 36px;
    }
    .cat-hero-mark { display: none; }
    .cat-hero-count { max-width: max-content; }
    .suggested-grid { grid-template-columns: 1fr; }
}

@media (max-width: 720px) {
    .tools-grid { grid-template-columns: 1fr; }
}

@media (max-width: 560px) {
    .cat-main { padding: 16px; }
    .cat-hero-title { font-size: 40px; }
    .tool-row { padding: 16px; }
    .tool-row-name { font-size: 15px; }
}
</style>
