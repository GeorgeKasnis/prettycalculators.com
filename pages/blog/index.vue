<template>
    <!-- Breadcrumb band -->
    <UiBreadcrumbBand :links="[{ label: 'Home', to: '/' }, { label: 'Blog' }]" :dark="true" />

    <!-- Blog header (black) -->
    <div class="bg-brut border-b-3 border-brut px-7 pt-8 pb-7 flex items-end justify-between gap-5 mobile:flex-col mobile:items-start mobile:gap-4 mobile:px-5">
        <div>
            <div class="font-mono text-[10px] font-bold uppercase tracking-[0.15em] text-lavender opacity-50 mb-2">Knowledge Base</div>
            <h1 class="text-[52px] font-bold tracking-[-0.05em] leading-none text-cream mobile:text-[36px]">
                The<br><em class="not-italic text-lavender">Blog</em>
            </h1>
        </div>
        <div v-if="posts.length" class="font-mono text-[11px] font-bold bg-lavender text-brut px-[14px] py-[5px] tracking-[0.1em] self-start shrink-0">
            {{ posts.length }} POSTS
        </div>
    </div>

    <!-- Filter bar — only shown when posts have categories -->
    <div v-if="filterTags.length > 1" class="border-b-3 border-brut bg-cream flex items-stretch h-12 overflow-x-auto">
        <div class="font-mono text-[10px] font-bold uppercase tracking-[0.12em] opacity-35 px-5 flex items-center border-r-3 border-brut shrink-0">Filter</div>
        <div class="flex items-stretch">
            <button
                v-for="tag in filterTags"
                :key="tag"
                class="filter-tag"
                :class="activeFilter === tag ? 'active' : ''"
                @click="activeFilter = tag"
            >{{ tag }}</button>
        </div>
    </div>

    <!-- Leaderboard ad -->
    <UiAdSlot bordered />

    <!-- Featured post (first in filtered list) -->
    <NuxtLink
        v-if="featuredPost"
        :to="`/blog/${featuredPost.fields.slug}`"
        class="featured-post border-b-3 border-brut"
    >
        <div class="featured-thumb">
            <div class="thumb-grid"></div>
            <div class="featured-thumb-title">
                {{ thumbLines(featuredPost.fields.title)[0] }}<br
                v-if="thumbLines(featuredPost.fields.title)[1]"
                />{{ thumbLines(featuredPost.fields.title)[1] }}
            </div>
            <div v-if="postCategory(featuredPost)" class="thumb-tag">{{ postCategory(featuredPost) }}</div>
        </div>
        <div class="featured-body">
            <div>
                <div class="font-mono text-[10px] font-bold uppercase tracking-[0.14em] opacity-35 mb-3">Featured post</div>
                <div class="text-[28px] font-bold tracking-[-0.04em] leading-[1.15] mb-[14px] mobile:text-[22px]">{{ featuredPost.fields.title }}</div>
                <div v-if="featuredPost.fields.metaDescription" class="text-[14px] leading-[1.65] opacity-60">{{ featuredPost.fields.metaDescription }}</div>
            </div>
            <div class="mt-6 flex items-center justify-between gap-3">
                <span class="featured-btn">Read article →</span>
                <span class="font-mono text-[10px] opacity-30 tracking-[0.06em]">{{ formatDate(featuredPost.sys.createdAt) }}</span>
            </div>
        </div>
    </NuxtLink>

    <!-- Posts grid (remaining posts) -->
    <div v-if="gridPosts.length" class="px-7 py-7 border-b-3 border-brut mobile:px-4">
        <div class="font-mono text-[10px] font-bold uppercase tracking-[0.15em] opacity-35 mb-5">All posts</div>
        <div class="posts-grid">
            <NuxtLink
                v-for="(post, i) in gridPosts"
                :key="post.fields.slug"
                :to="`/blog/${post.fields.slug}`"
                class="post-card"
            >
                <div class="post-card-thumb" :style="{ background: thumbColor(i) }">
                    <div class="thumb-grid"></div>
                    <div class="post-card-thumb-text">
                        {{ thumbLines(post.fields.title)[0] }}<br
                        v-if="thumbLines(post.fields.title)[1]"
                        />{{ thumbLines(post.fields.title)[1] }}
                    </div>
                    <div v-if="postCategory(post)" class="post-card-tag">{{ postCategory(post) }}</div>
                </div>
                <div class="post-card-body">
                    <div class="post-card-title">{{ post.fields.title }}</div>
                    <div v-if="post.fields.metaDescription" class="post-card-excerpt">{{ post.fields.metaDescription }}</div>
                    <div class="post-card-footer">
                        <span class="post-card-date">{{ formatDate(post.sys.createdAt) }}</span>
                        <span class="post-card-arrow">→</span>
                    </div>
                </div>
            </NuxtLink>
        </div>
    </div>

    <!-- Empty state -->
    <div v-if="!posts.length" class="px-7 py-14 text-center opacity-40">
        <div class="font-mono text-[11px] uppercase tracking-[0.15em]">No posts yet</div>
    </div>
</template>

<script setup>
definePageMeta({ layout: 'brutalist' })

const runtimeConfig = useRuntimeConfig()
const { data: blogData } = await useFetch(`${runtimeConfig.public.API_URL}&content_type=blog`)

const posts = computed(() => blogData.value?.items ?? [])

const activeFilter = ref('All')
const { thumbLines, thumbColor, formatDate, postCategory } = useBlogUtils()

const filterTags = computed(() => {
    const cats = posts.value.map(p => postCategory(p)).filter(Boolean)
    const unique = [...new Set(cats)]
    return unique.length ? ['All', ...unique] : []
})

const filteredPosts = computed(() => {
    if (activeFilter.value === 'All') return posts.value
    return posts.value.filter(p => postCategory(p) === activeFilter.value)
})

const featuredPost = computed(() => filteredPosts.value[0] ?? null)
const gridPosts = computed(() => filteredPosts.value.slice(1))

const BLOG_TITLE = 'Pretty Calculators — Blog'
const BLOG_DESC = 'Tips, guides and insights on fitness, math, unit conversions and more — from the Pretty Calculators team.'

useHead({
    title: BLOG_TITLE,
    link: [
        { rel: 'canonical', href: 'https://www.prettycalculators.com/blog' },
    ],
    meta: [
        { hid: 'title',               name: 'title',               content: BLOG_TITLE },
        { hid: 'description',         name: 'description',         content: BLOG_DESC },
        { hid: 'og:url',              property: 'og:url',          content: 'https://www.prettycalculators.com/blog' },
        { hid: 'og-title',            property: 'og:title',        content: BLOG_TITLE },
        { hid: 'og:description',      property: 'og:description',  content: BLOG_DESC },
        { hid: 'twitter:card',        name: 'twitter:card',        content: 'summary_large_image' },
        { hid: 'twitter:title',       name: 'twitter:title',       content: BLOG_TITLE },
        { hid: 'twitter:description', name: 'twitter:description', content: BLOG_DESC },
    ],
})
</script>

<style scoped>
/* ── Featured post ── */
.featured-post {
    display: grid;
    grid-template-columns: 1fr 1fr;
    text-decoration: none;
    color: #0a0a0a;
}

.featured-thumb {
    background: #0a0a0a;
    border-right: 3px solid #0a0a0a;
    min-height: 260px;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 32px;
    position: relative;
    overflow: hidden;
}

.featured-thumb-title {
    font-size: 28px;
    font-weight: 700;
    color: #fafafa;
    text-align: center;
    letter-spacing: -0.03em;
    line-height: 1.2;
    position: relative;
    z-index: 1;
}

.featured-body {
    background: #fafafa;
    padding: 32px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
}

.featured-btn {
    display: inline-flex;
    align-items: center;
    background: #0a0a0a;
    color: #fafafa;
    font-size: 13px;
    font-weight: 700;
    padding: 10px 18px;
    border: 3px solid #0a0a0a;
    box-shadow: 5px 5px 0px #0a0a0a;
    letter-spacing: -0.01em;
    transition: transform 0.08s, box-shadow 0.08s;
}

.featured-post:hover .featured-btn {
    transform: translate(-2px, -2px);
    box-shadow: 8px 8px 0px #0a0a0a;
}

/* ── Shared thumbnail grid overlay ── */
.thumb-grid {
    position: absolute;
    inset: 0;
    background-image:
        linear-gradient(rgba(255, 255, 255, 0.05) 1px, transparent 1px),
        linear-gradient(90deg, rgba(255, 255, 255, 0.05) 1px, transparent 1px);
    background-size: 25% 33.33%;
    pointer-events: none;
}

.thumb-tag {
    position: absolute;
    top: 20px;
    left: 20px;
    font-family: 'Space Mono', monospace;
    font-size: 9px;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.12em;
    background: #f5e642;
    color: #0a0a0a;
    padding: 4px 10px;
    z-index: 1;
}

/* ── Posts grid ── */
.posts-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 1rem;
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
    box-shadow: 8px 8px 0px #0a0a0a;
    z-index: 2;
}

.post-card-thumb {
    height: 140px;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 20px;
    border-bottom: 3px solid #0a0a0a;
    position: relative;
    overflow: hidden;
}

.post-card-thumb-text {
    font-size: 16px;
    font-weight: 700;
    color: #fafafa;
    text-align: center;
    letter-spacing: -0.02em;
    line-height: 1.25;
    position: relative;
    z-index: 1;
}

.post-card-tag {
    position: absolute;
    top: 12px;
    left: 12px;
    font-family: 'Space Mono', monospace;
    font-size: 8px;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.1em;
    padding: 3px 8px;
    z-index: 1;
    border: 1.5px solid rgba(255, 255, 255, 0.25);
    color: rgba(255, 255, 255, 0.6);
}

.post-card-body {
    padding: 18px 20px 20px;
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: 8px;
}

.post-card-title {
    font-size: 15px;
    font-weight: 700;
    letter-spacing: -0.02em;
    line-height: 1.3;
}

.post-card-excerpt {
    font-size: 13px;
    opacity: 0.55;
    line-height: 1.55;
    flex: 1;
}

.post-card-footer {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding-top: 12px;
    border-top: 1.5px solid rgba(10, 10, 10, 0.08);
    margin-top: auto;
}

.post-card-date {
    font-family: 'Space Mono', monospace;
    font-size: 9px;
    opacity: 0.3;
    letter-spacing: 0.06em;
}

.post-card-arrow {
    font-size: 14px;
    opacity: 0.2;
    transition: opacity 0.08s, transform 0.08s;
}

.post-card:hover .post-card-arrow {
    opacity: 0.7;
    transform: translateX(3px);
}

/* ── Filter bar ── */
.filter-tag {
    padding: 0 20px;
    font-family: 'Space Mono', monospace;
    font-size: 11px;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.08em;
    color: #0a0a0a;
    background: none;
    border: none;
    border-right: 1px solid rgba(10, 10, 10, 0.1);
    cursor: pointer;
    opacity: 0.45;
    transition: opacity 0.1s, background 0.1s, color 0.1s;
    white-space: nowrap;
    height: 100%;
}

.filter-tag:hover {
    opacity: 1;
    background: #ddd6ff;
}

.filter-tag.active {
    opacity: 1;
    background: #0a0a0a;
    color: #fafafa;
}

/* ── Responsive ── */
@media (max-width: 900px) {
    .featured-post { grid-template-columns: 1fr; }
    .featured-thumb { border-right: none; border-bottom: 3px solid #0a0a0a; min-height: 200px; }
    .featured-body { padding: 24px; }
    .posts-grid { grid-template-columns: 1fr 1fr; }
}

@media (max-width: 560px) {
    .posts-grid { grid-template-columns: 1fr; }
}
</style>
