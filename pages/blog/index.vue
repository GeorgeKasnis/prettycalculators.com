<template>
    <!-- Breadcrumb band -->
    <UiBreadcrumbBand :links="[{ label: 'Home', to: '/' }, { label: 'Blog' }]" :dark="true" />

    <!-- Hero -->
    <header class="blog-hero">
        <div>
            <div class="blog-hero-eyebrow">Knowledge base</div>
            <h1 class="blog-hero-title">Guides behind <em>the numbers.</em></h1>
            <p class="blog-hero-sub">Deep dives into the formulas, science and practical use of every calculator on the site.</p>
        </div>
        <div v-if="posts.length" class="blog-hero-count">{{ posts.length }} ARTICLES &middot; {{ topicCount }} TOPICS</div>
    </header>

    <!-- Filter bar -->
    <div v-if="cats.length > 1" class="filter-bar">
        <button
            class="filter-chip"
            :class="{ active: activeFilter === 'All' }"
            @click="activeFilter = 'All'"
        ><i style="background:#0a0a0a;"></i>All posts</button>
        <button
            v-for="cat in cats"
            :key="cat"
            class="filter-chip"
            :class="{ active: activeFilter === cat }"
            :style="{ '--c': catColor(cat) }"
            @click="activeFilter = cat"
        ><i :style="{ background: catColor(cat) }"></i>{{ catLabel(cat) }}</button>
        <span class="filter-count">{{ gridPosts.length }} {{ gridPosts.length === 1 ? 'post' : 'posts' }}</span>
    </div>

    <!-- Featured (latest post) -->
    <NuxtLink
        v-if="featuredPost"
        :to="`/blog/${featuredPost.fields.slug}`"
        class="featured"
        :style="{ '--c': catColor(postCategory(featuredPost)) }"
    >
        <div class="featured-body">
            <span class="featured-badge">★ Latest post</span>
            <h2 class="featured-title">{{ featuredPost.fields.title }}</h2>
            <p v-if="featuredPost.fields.metaDescription" class="featured-excerpt">{{ featuredPost.fields.metaDescription }}</p>
            <span class="featured-meta"><i></i>{{ catLabel(postCategory(featuredPost)) }} &middot; {{ readTime(featuredPost) }} min read &middot; Read →</span>
        </div>
        <div class="featured-visual"><span>{{ catSymbol(postCategory(featuredPost)) }}</span></div>
    </NuxtLink>

    <!-- Posts grid -->
    <main v-if="gridPosts.length" class="posts">
        <NuxtLink
            v-for="(post, i) in gridPosts"
            :key="post.fields.slug"
            :to="`/blog/${post.fields.slug}`"
            class="post-card"
            :style="{ '--c': catColor(postCategory(post)) }"
        >
            <div class="post-card-top">
                <span class="post-card-cat">{{ catLabel(postCategory(post)) }}</span>
                <span class="post-card-num">{{ String(i + 1).padStart(2, '0') }}</span>
            </div>
            <div class="post-card-body">
                <h3 class="post-card-title">{{ post.fields.title }}</h3>
                <p v-if="post.fields.metaDescription" class="post-card-excerpt">{{ post.fields.metaDescription }}</p>
            </div>
            <div class="post-card-foot"><span>{{ readTime(post) }} min read</span><span class="arrow">→</span></div>
        </NuxtLink>
    </main>

    <!-- Empty state -->
    <div v-if="!posts.length" class="px-7 py-14 text-center opacity-40">
        <div class="font-mono text-[11px] uppercase tracking-[0.15em]">No posts yet</div>
    </div>

    <!-- Leaderboard ad -->
    <UiAdSlot bordered />

    <!-- CTA strip -->
    <div class="cta-strip">
        <div class="cta-strip-title">Done reading? <em>Go calculate something.</em></div>
        <NuxtLink to="/" class="cta-btn">Browse {{ totalTools }} tools →</NuxtLink>
    </div>
</template>

<script setup>
definePageMeta({ layout: 'brutalist' })

const runtimeConfig = useRuntimeConfig()
const { data: blogData } = await useFetch(`${runtimeConfig.public.API_URL}&content_type=blog`)

const posts = computed(() => blogData.value?.items ?? [])

const activeFilter = ref('All')
const { postCategory } = useBlogUtils()

const CAT_COLORS = { fitness: '#ddd6ff', math: '#f5e642', maths: '#f5e642', finance: '#d4f5d4', other: '#ffd6d6', tools: '#cfe8f7' }
const CAT_SYMBOLS = { fitness: 'kcal', math: '√x', maths: '√x', finance: '€', other: '✱', tools: '</>' }
const CAT_ORDER = ['fitness', 'math', 'maths', 'finance', 'other', 'tools']

const catColor = (cat) => CAT_COLORS[cat] ?? '#ddd6ff'
const catSymbol = (cat) => CAT_SYMBOLS[cat] ?? '✱'
const catLabel = (cat) => (cat ? cat.charAt(0).toUpperCase() + cat.slice(1) : '')

const cats = computed(() => {
    const unique = [...new Set(posts.value.map((p) => postCategory(p)).filter(Boolean))]
    return unique.sort((a, b) => CAT_ORDER.indexOf(a) - CAT_ORDER.indexOf(b))
})

const topicCount = computed(() => cats.value.length)

// Featured = newest post, always pinned; the filter drives the grid below it
const featuredPost = computed(() => posts.value[0] ?? null)

const gridPosts = computed(() => {
    const rest = posts.value.slice(1)
    if (activeFilter.value === 'All') return rest
    return rest.filter((p) => postCategory(p) === activeFilter.value)
})

const readTime = (post) => {
    try {
        const content = post.fields?.content
        if (!content) return 1
        const wordCount = JSON.stringify(content).split(/\s+/).length
        return Math.max(1, Math.ceil(wordCount / 200))
    } catch { return 1 }
}

const { otherCategories: allCats } = useCategoryConfig('_')
const totalTools = allCats.reduce((n, c) => n + c.tools.length, 0)

const BLOG_TITLE = 'Pretty Calculators — Blog'
const BLOG_DESC = 'Tips, guides and insights on fitness, math, unit conversions and more — from the Pretty Calculators team.'

useHead({
    title: BLOG_TITLE,
    link: [
        { rel: 'canonical', href: 'https://prettycalculators.com/blog' },
    ],
    meta: [
        { hid: 'title',               name: 'title',               content: BLOG_TITLE },
        { hid: 'description',         name: 'description',         content: BLOG_DESC },
        { hid: 'og:url',              property: 'og:url',          content: 'https://prettycalculators.com/blog' },
        { hid: 'og-title',            property: 'og:title',        content: BLOG_TITLE },
        { hid: 'og:description',      property: 'og:description',  content: BLOG_DESC },
        { hid: 'twitter:card',        name: 'twitter:card',        content: 'summary_large_image' },
        { hid: 'twitter:title',       name: 'twitter:title',       content: BLOG_TITLE },
        { hid: 'twitter:description', name: 'twitter:description', content: BLOG_DESC },
    ],
})
</script>

<style scoped>
/* ── Hero ── */
.blog-hero {
    border-bottom: 3px solid #0a0a0a;
    background: #0a0a0a;
    color: #fafafa;
    padding: 56px 28px 48px;
    display: grid;
    grid-template-columns: 1fr auto;
    gap: 40px;
    align-items: end;
    position: relative;
    overflow: hidden;
}

.blog-hero::before {
    content: '✳';
    position: absolute;
    right: 180px;
    top: -70px;
    font-size: 280px;
    color: rgba(221, 214, 255, 0.05);
    pointer-events: none;
    line-height: 1;
}

.blog-hero-eyebrow {
    font-family: 'Space Mono', monospace;
    font-size: 11px;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.18em;
    color: #f5e642;
    display: inline-flex;
    align-items: center;
    gap: 10px;
    margin-bottom: 16px;
}

.blog-hero-eyebrow::before {
    content: '';
    width: 6px;
    height: 6px;
    background: #f5e642;
}

.blog-hero-title {
    font-size: clamp(40px, 5vw, 68px);
    font-weight: 700;
    letter-spacing: -0.045em;
    line-height: 0.98;
}

.blog-hero-title em {
    font-style: normal;
    color: #ddd6ff;
}

.blog-hero-sub {
    margin-top: 14px;
    font-size: 15px;
    opacity: 0.55;
    max-width: 420px;
    line-height: 1.5;
}

.blog-hero-count {
    font-family: 'Space Mono', monospace;
    font-size: 11px;
    font-weight: 700;
    letter-spacing: 0.1em;
    background: #ddd6ff;
    color: #0a0a0a;
    border: 3px solid #0a0a0a;
    box-shadow: 6px 6px 0 #5c3bef;
    padding: 14px 18px;
    white-space: nowrap;
    position: relative;
    z-index: 1;
}

/* ── Filter bar ── */
.filter-bar {
    display: flex;
    align-items: stretch;
    border-bottom: 3px solid #0a0a0a;
    background: #fafafa;
    overflow-x: auto;
}

.filter-chip {
    display: flex;
    align-items: center;
    gap: 9px;
    padding: 14px 22px;
    font-family: 'Space Mono', monospace;
    font-size: 11px;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.1em;
    border: none;
    border-right: 1.5px solid rgba(10, 10, 10, 0.12);
    background: transparent;
    color: #0a0a0a;
    cursor: pointer;
    white-space: nowrap;
    transition: background 0.1s;
}

.filter-chip i {
    width: 9px;
    height: 9px;
    background: var(--c, #0a0a0a);
    border: 1.5px solid #0a0a0a;
    flex-shrink: 0;
}

.filter-chip:hover { background: var(--c, #ddd6ff); }

.filter-chip.active {
    background: #0a0a0a;
    color: #fafafa;
}

.filter-chip.active i { border-color: rgba(255, 255, 255, 0.3); }

.filter-count {
    margin-left: auto;
    display: flex;
    align-items: center;
    padding: 0 22px;
    font-family: 'Space Mono', monospace;
    font-size: 10px;
    font-weight: 700;
    letter-spacing: 0.1em;
    opacity: 0.4;
    white-space: nowrap;
}

/* ── Featured post ── */
.featured {
    margin: 28px;
    display: grid;
    grid-template-columns: 1.2fr 1fr;
    border: 3px solid #0a0a0a;
    background: #0a0a0a;
    box-shadow: 8px 8px 0 #0a0a0a;
    text-decoration: none;
    color: #fafafa;
    transition: transform 0.08s, box-shadow 0.08s;
}

.featured:hover {
    transform: translate(-3px, -3px);
    box-shadow: 11px 11px 0 #0a0a0a;
    color: #fafafa;
}

.featured-body {
    padding: 36px 32px;
    display: flex;
    flex-direction: column;
    gap: 16px;
}

.featured-badge {
    font-family: 'Space Mono', monospace;
    font-size: 10px;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.16em;
    background: #f5e642;
    color: #0a0a0a;
    border: 2px solid #fafafa;
    padding: 5px 10px;
    max-width: max-content;
}

.featured-title {
    font-size: clamp(24px, 3vw, 38px);
    font-weight: 700;
    letter-spacing: -0.03em;
    line-height: 1.08;
    text-wrap: pretty;
}

.featured-excerpt {
    font-size: 15px;
    line-height: 1.55;
    color: rgba(255, 255, 255, 0.55);
    max-width: 480px;
}

.featured-meta {
    margin-top: auto;
    display: flex;
    align-items: center;
    gap: 10px;
    font-family: 'Space Mono', monospace;
    font-size: 10px;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.12em;
    color: rgba(255, 255, 255, 0.5);
}

.featured-meta i {
    width: 9px;
    height: 9px;
    background: var(--c, #ddd6ff);
    border: 1.5px solid rgba(255, 255, 255, 0.3);
}

.featured-visual {
    border-left: 3px solid #0a0a0a;
    background: var(--c, #ddd6ff);
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    overflow: hidden;
    min-height: 240px;
}

.featured-visual span {
    font-size: 120px;
    font-weight: 700;
    color: #0a0a0a;
    letter-spacing: -0.05em;
    line-height: 1;
    transform: rotate(-6deg);
}

.featured-visual::after {
    content: '';
    position: absolute;
    inset: 14px;
    border: 2.5px dashed rgba(10, 10, 10, 0.25);
    pointer-events: none;
}

/* ── Posts grid ── */
.posts {
    padding: 0 28px 44px;
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 0;
}

.post-card {
    border: 3px solid #0a0a0a;
    margin: -1.5px;
    background: #fafafa;
    display: flex;
    flex-direction: column;
    text-decoration: none;
    color: #0a0a0a;
    position: relative;
    transition: transform 0.08s, box-shadow 0.08s;
}

.post-card:hover {
    transform: translate(-3px, -3px);
    box-shadow: 8px 8px 0 #0a0a0a;
    z-index: 2;
    color: #0a0a0a;
}

.post-card-top {
    padding: 16px 20px;
    border-bottom: 3px solid #0a0a0a;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 10px;
    background: var(--c, #ddd6ff);
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

.post-card-num {
    font-family: 'Space Mono', monospace;
    font-size: 10px;
    font-weight: 700;
    opacity: 0.4;
}

.post-card-body {
    padding: 20px;
    display: flex;
    flex-direction: column;
    gap: 12px;
    flex: 1;
}

.post-card-title {
    font-size: 19px;
    font-weight: 700;
    letter-spacing: -0.02em;
    line-height: 1.2;
    text-wrap: pretty;
}

.post-card-excerpt {
    font-size: 13px;
    line-height: 1.5;
    opacity: 0.55;
    overflow: hidden;
    display: -webkit-box;
    -webkit-line-clamp: 3;
    line-clamp: 3;
    -webkit-box-orient: vertical;
}

.post-card-foot {
    margin-top: auto;
    padding: 12px 20px;
    border-top: 1.5px solid rgba(10, 10, 10, 0.12);
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-family: 'Space Mono', monospace;
    font-size: 10px;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.1em;
    opacity: 0.45;
}

.post-card-foot .arrow {
    font-size: 13px;
    transition: transform 0.1s;
}

.post-card:hover .post-card-foot .arrow { transform: translateX(4px); }

/* ── CTA strip ── */
.cta-strip {
    border-top: 3px solid #0a0a0a;
    background: #0a0a0a;
    color: #fafafa;
    padding: 40px 28px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 24px;
    flex-wrap: wrap;
}

.cta-strip-title {
    font-size: 28px;
    font-weight: 700;
    letter-spacing: -0.03em;
}

.cta-strip-title em {
    font-style: normal;
    color: #ddd6ff;
}

.cta-btn {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    background: #f5e642;
    color: #0a0a0a;
    font-size: 14px;
    font-weight: 700;
    padding: 12px 20px;
    border: 3px solid #0a0a0a;
    box-shadow: 5px 5px 0 #5c3bef;
    text-decoration: none;
    transition: transform 0.08s, box-shadow 0.08s;
}

.cta-btn:hover {
    transform: translate(-2px, -2px);
    box-shadow: 7px 7px 0 #5c3bef;
    color: #0a0a0a;
}

/* ── Responsive ── */
@media (max-width: 900px) {
    .posts { grid-template-columns: 1fr 1fr; padding: 0 16px 28px; }
    .featured { margin: 16px; grid-template-columns: 1fr; }
    .featured-visual { border-left: none; border-top: 3px solid #0a0a0a; min-height: 150px; }
    .featured-visual span { font-size: 80px; }
    .blog-hero { grid-template-columns: 1fr; align-items: start; padding: 40px 24px 36px; }
    .blog-hero-count { max-width: max-content; }
    .blog-hero::before { display: none; }
}

@media (max-width: 560px) {
    .posts { grid-template-columns: 1fr; }
    .featured-body { padding: 24px 20px; }
    .blog-hero-title { font-size: 36px; }
}
</style>
