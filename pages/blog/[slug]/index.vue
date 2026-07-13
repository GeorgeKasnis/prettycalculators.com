<template>
    <!-- Reading progress bar -->
    <div class="progress-bar" :style="{ width: `${readProgress}%` }" />

    <!-- Breadcrumb band -->
    <UiBreadcrumbBand :links="[{ label: 'Home', to: '/' }, { label: 'Blog', to: '/blog' }, { label: fields.title }]" :dark="true" />

    <!-- Article header -->
    <div class="bg-brut border-b-3 border-brut px-8 pt-8 pb-7 mobile:px-5">
        <div class="flex items-center gap-3 mb-5 flex-wrap">
            <span v-if="fields.category" class="font-mono text-[9px] font-bold uppercase tracking-[0.14em] bg-brut-yellow text-brut px-[10px] py-[4px]">{{ fields.category }}</span>
            <span class="font-mono text-[10px] text-lavender opacity-60 tracking-[0.08em]">{{ formatDate(postSys.createdAt, true) }}</span>
            <span class="font-mono text-[10px] text-cream opacity-30 tracking-[0.08em]">{{ readTime }} min read</span>
        </div>
        <h1 class="text-[48px] font-bold tracking-[-0.05em] leading-[1.1] text-cream mobile:text-[30px] max-w-3xl">
            {{ titleStart }}<em class="not-italic text-lavender">{{ titleEnd }}</em>
        </h1>
    </div>

    <!-- Page grid -->
    <div class="post-grid border-b-3 border-brut">

        <!-- Main content -->
        <div class="post-main border-brut">

            <!-- Share bar -->
            <div class="border-b-3 border-brut h-[52px] flex items-stretch bg-cream">
                <div class="px-5 flex items-center border-r-3 border-brut shrink-0">
                    <span class="font-mono text-[10px] font-bold uppercase tracking-[0.12em] opacity-40">Share</span>
                </div>
                <div class="flex items-center px-4 gap-1">
                    <a
                        :href="`https://www.facebook.com/sharer/sharer.php?u=https://prettycalculators.com/blog/${route.params.slug}`"
                        target="_blank" rel="noopener"
                        class="share-btn"
                        title="Share on Facebook"
                    >
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
                    </a>
                    <a
                        :href="`https://twitter.com/intent/tweet?url=https://prettycalculators.com/blog/${route.params.slug}&text=${encodeURIComponent(fields.title ?? '')}`"
                        target="_blank" rel="noopener"
                        class="share-btn"
                        title="Share on X"
                    >
                        <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
                    </a>
                    <button @click="copyLink" class="share-btn" :title="copied ? 'Copied!' : 'Copy link'">
                        <svg v-if="!copied" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>
                        <svg v-else width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                    </button>
                </div>
            </div>

            <!-- Leaderboard ad -->
            <UiAdSlot bordered />

            <!-- Article body -->
            <div class="article-section">
                <div class="article-card">
                    <div class="article-card-head">
                        <div class="article-eyebrow">Article</div>
                        <h2 class="article-headline">{{ fields.title }}</h2>
                    </div>
                    <div class="article-body blog-content" v-html="bodyHtml" />
                </div>
            </div>

            <!-- Related Calculators -->
            <div class="border-t-3 border-brut">
                <div class="px-5 py-4 bg-brut border-b-3 border-brut flex items-center">
                    <span class="font-mono text-[10px] font-bold uppercase tracking-[0.12em] text-lavender">Related Calculators</span>
                </div>
                <div class="related-grid">
                    <NuxtLink
                        v-for="calc in relatedCalcs"
                        :key="calc.to"
                        :to="calc.to"
                        class="related-calc"
                    >
                        <span class="text-[14px] font-medium leading-[1.3]">{{ calc.label }}</span>
                        <span class="text-sm opacity-25 shrink-0 related-arrow">→</span>
                    </NuxtLink>
                </div>
            </div>
        </div>

        <!-- Sidebar -->
        <div class="post-sidebar flex flex-col border-brut">
            <div class="px-5 py-4 border-b-3 border-brut bg-brut flex items-center">
                <span class="font-mono text-[10px] font-bold uppercase tracking-[0.12em] text-lavender">More Articles</span>
            </div>
            <NuxtLink
                v-for="related in sidebarPosts"
                :key="related.fields.slug"
                :to="`/blog/${related.fields.slug}`"
                class="sidebar-article border-b-3 border-brut"
                :class="{ 'active': String(related.fields.slug) === String(route.params.slug) }"
            >
                <span class="text-[13px] font-semibold leading-[1.3] pr-2">{{ related.fields.title }}</span>
                <span class="text-sm opacity-25 shrink-0 sa-arrow">→</span>
            </NuxtLink>
            <div v-if="!sidebarPosts.length" class="px-5 py-4 text-[13px] opacity-40">No other posts yet.</div>
            <UiAdSlot variant="rectangle" bordered class="flex-1" />
        </div>
    </div>
</template>

<script setup>
import { documentToHtmlString } from "@contentful/rich-text-html-renderer"

definePageMeta({ layout: 'brutalist' })

const route = useRoute()
const runtimeConfig = useRuntimeConfig()

const { data: post } = await useFetch(
    `${runtimeConfig.public.API_URL}&content_type=blog&fields.slug=${route.params.slug}`
)
const { data: allBlogData } = await useFetch(
    `${runtimeConfig.public.API_URL}&content_type=blog&limit=10`
)

const fields = computed(() => post.value?.items?.[0]?.fields ?? {})
const postSys = computed(() => post.value?.items?.[0]?.sys ?? {})

const titleStart = computed(() => {
    const t = fields.value.title ?? ''
    const words = t.split(' ')
    if (words.length <= 1) return t
    return words.slice(0, -1).join(' ') + ' '
})

const titleEnd = computed(() => {
    const t = fields.value.title ?? ''
    const words = t.split(' ')
    return words.length > 1 ? words[words.length - 1] : ''
})

const readTime = computed(() => {
    try {
        const content = fields.value.content
        if (!content) return 1
        const wordCount = JSON.stringify(content).split(/\s+/).length
        return Math.max(1, Math.ceil(wordCount / 200))
    } catch { return 1 }
})

const bodyHtml = computed(() => {
    try { return documentToHtmlString(fields.value.content) }
    catch { return '' }
})

const sidebarPosts = computed(() => (allBlogData.value?.items ?? []).slice(0, 8))

const { otherCategories: allCats } = useCategoryConfig('_')
const relatedCalcs = allCats.flatMap(cat => cat.tools.slice(0, 2).map(t => ({ label: t.label, to: t.to })))

const { formatDate } = useBlogUtils()

const readProgress = ref(0)
const updateProgress = () => {
    const el = document.documentElement
    const scrolled = el.scrollTop || document.body.scrollTop
    const total = el.scrollHeight - el.clientHeight
    readProgress.value = total > 0 ? Math.min(100, (scrolled / total) * 100) : 0
}
onMounted(() => window.addEventListener('scroll', updateProgress, { passive: true }))
onUnmounted(() => window.removeEventListener('scroll', updateProgress))

const copied = ref(false)
const copyLink = async () => {
    try {
        await navigator.clipboard.writeText(`https://prettycalculators.com/blog/${route.params.slug}`)
        copied.value = true
        setTimeout(() => { copied.value = false }, 2000)
    } catch {}
}

const imageUrl = computed(() => {
    try {
        const assetId = fields.value.featuredImage?.sys?.id
        if (!assetId) return ''
        const asset = post.value?.includes?.Asset?.find(a => a.sys.id === assetId)
        return asset?.fields?.file?.url ?? ''
    } catch { return '' }
})

const postTitle = `Pretty Calculators — ${fields.value.metaTitle || fields.value.title}`
const postDesc = fields.value.metaDescription ?? ''
const canonical = `https://prettycalculators.com${route.path}`

const articleLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: fields.value.title ?? '',
    description: postDesc,
    url: canonical,
    datePublished: postSys.value.createdAt ?? '',
    dateModified: postSys.value.updatedAt ?? '',
    author: { '@type': 'Organization', name: 'Pretty Calculators', url: 'https://prettycalculators.com' },
    publisher: { '@type': 'Organization', name: 'Pretty Calculators', url: 'https://prettycalculators.com' },
    ...(imageUrl.value ? { image: `https:${imageUrl.value}` } : {}),
}

const breadcrumbLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://prettycalculators.com/' },
        { '@type': 'ListItem', position: 2, name: 'Blog', item: 'https://prettycalculators.com/blog' },
        { '@type': 'ListItem', position: 3, name: fields.value.title ?? '', item: canonical },
    ],
}

useHead({
    title: postTitle,
    link: [
        { rel: 'canonical', href: canonical },
    ],
    script: [
        { type: 'application/ld+json', innerHTML: JSON.stringify(articleLd) },
        { type: 'application/ld+json', innerHTML: JSON.stringify(breadcrumbLd) },
    ],
    meta: [
        { hid: 'title',               name: 'title',               content: postTitle },
        { hid: 'description',         name: 'description',         content: postDesc },
        { hid: 'og:type',             property: 'og:type',         content: 'article' },
        { hid: 'og:url',              property: 'og:url',          content: canonical },
        { hid: 'og-title',            property: 'og:title',        content: postTitle },
        { hid: 'og:description',      property: 'og:description',  content: postDesc },
        { hid: 'twitter:card',        name: 'twitter:card',        content: 'summary_large_image' },
        { hid: 'twitter:title',       name: 'twitter:title',       content: postTitle },
        { hid: 'twitter:description', name: 'twitter:description', content: postDesc },
        ...(imageUrl.value ? [
            { hid: 'og-image',      property: 'og:image',   content: `https:${imageUrl.value}` },
            { hid: 'twitter:image', name: 'twitter:image',  content: `https:${imageUrl.value}` },
        ] : []),
    ],
})
</script>

<style scoped>
/* Reading progress bar */
.progress-bar {
    position: fixed;
    top: 0;
    left: 0;
    height: 3px;
    background: #ddd6ff;
    z-index: 200;
    transition: width 0.1s linear;
    pointer-events: none;
}

/* Layout */
.post-grid {
    display: grid;
    grid-template-columns: 1fr 300px;
}

.post-main {
    border-right: 3px solid #0a0a0a;
    min-width: 0;
}

/* Share bar */
.share-btn {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 36px;
    height: 36px;
    color: #0a0a0a;
    opacity: 0.4;
    border: none;
    background: none;
    cursor: pointer;
    transition: opacity 0.1s, background 0.1s;
    text-decoration: none;
}

.share-btn:hover {
    opacity: 1;
    background: rgba(10, 10, 10, 0.06);
}

/* Article card */
.article-section {
    padding: 28px 32px;
    background: #ddd6ff;
    border-bottom: 3px solid #0a0a0a;
}

.article-card {
    background: #fff;
    border: 3px solid #0a0a0a;
    box-shadow: 5px 5px 0 #0a0a0a;
}

.article-card-head {
    background: #f5e642;
    border-bottom: 3px solid #0a0a0a;
    padding: 22px 28px 20px;
}

.article-eyebrow {
    font-family: 'Space Mono', monospace;
    font-size: 10px;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.15em;
    opacity: 0.55;
    margin-bottom: 6px;
}

.article-headline {
    font-size: 24px;
    font-weight: 700;
    letter-spacing: -0.04em;
    line-height: 1.15;
    max-width: 620px;
}

.article-body {
    padding: 28px 32px;
    overflow-wrap: break-word;
    word-break: break-word;
}

/* Blog prose */
.blog-content :deep(h1),
.blog-content :deep(h2),
.blog-content :deep(h3) {
    font-weight: 700;
    letter-spacing: -0.03em;
    margin-top: 1.75rem;
    margin-bottom: 0.75rem;
    line-height: 1.2;
}

.blog-content :deep(h1) { font-size: 2rem; }
.blog-content :deep(h2) { font-size: 1.5rem; }
.blog-content :deep(h3) { font-size: 1.2rem; }

.blog-content :deep(p) {
    font-size: 16px;
    line-height: 1.75;
    opacity: 0.75;
    margin-bottom: 1.25rem;
    max-width: 680px;
}

.blog-content :deep(p:first-child) {
    font-size: 17px;
    font-weight: 500;
    opacity: 0.85;
    padding-bottom: 24px;
    margin-bottom: 1.5rem;
    border-bottom: 3px solid #0a0a0a;
}

.blog-content :deep(ul),
.blog-content :deep(ol) {
    padding-left: 0;
    margin-bottom: 1.25rem;
    list-style: none;
}

.blog-content :deep(li) {
    font-size: 16px;
    line-height: 1.7;
    padding: 10px 0;
    border-bottom: 1.5px solid rgba(10, 10, 10, 0.08);
    display: flex;
    gap: 10px;
    opacity: 0.8;
}

.blog-content :deep(li::before) {
    content: '→';
    font-weight: 700;
    flex-shrink: 0;
    opacity: 0.4;
}

.blog-content :deep(a) {
    color: #0a0a0a;
    text-decoration: underline;
    text-underline-offset: 3px;
}

.blog-content :deep(img) {
    width: 100%;
    height: auto;
    border: 3px solid #0a0a0a;
    margin: 1.5rem 0;
}

.blog-content :deep(blockquote) {
    border-left: 5px solid #0a0a0a;
    background: #ddd6ff;
    padding: 20px 24px;
    margin: 1.5rem 0;
    font-size: 17px;
    font-style: italic;
    line-height: 1.6;
}

.blog-content :deep(blockquote p) {
    font-size: inherit;
    opacity: 1;
    margin-bottom: 0;
    max-width: none;
    border-bottom: none;
    padding-bottom: 0;
}

.blog-content :deep(pre),
.blog-content :deep(code) {
    font-family: 'Space Mono', monospace;
    font-size: 13px;
    background: #0a0a0a;
    color: #ddd6ff;
    padding: 2px 6px;
}

.blog-content :deep(pre) {
    padding: 16px 20px;
    overflow-x: auto;
    margin-bottom: 1.25rem;
}

.blog-content :deep(pre code) {
    background: none;
    padding: 0;
}

.blog-content :deep(table) {
    display: block;
    overflow-x: auto;
    border-collapse: collapse;
    width: max-content;
    max-width: 100%;
    margin-bottom: 1.25rem;
    font-size: 14px;
}

.blog-content :deep(th),
.blog-content :deep(td) {
    border: 1.5px solid rgba(10,10,10,0.15);
    padding: 9px 14px;
    text-align: left;
    line-height: 1.4;
    white-space: nowrap;
}

.blog-content :deep(th) {
    background: #0a0a0a;
    color: #fafafa;
    font-family: 'Space Mono', monospace;
    font-size: 10px;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.08em;
    white-space: nowrap;
}

.blog-content :deep(tr:nth-child(even) td) {
    background: rgba(10,10,10,0.03);
}

/* Related calcs */
.related-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
}

.related-calc {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 16px 18px;
    border: 1.5px solid rgba(10, 10, 10, 0.08);
    margin: -0.75px;
    text-decoration: none;
    color: #0a0a0a;
    background: #fafafa;
    transition: background 0.08s, color 0.08s;
    gap: 8px;
}

.related-calc:hover {
    background: #0a0a0a;
    color: #fafafa;
}

.related-calc:hover .related-arrow { opacity: 0.7; }

/* Sidebar */
.sidebar-article {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 14px 20px 14px 15px;
    border-left: 5px solid transparent;
    text-decoration: none;
    color: #0a0a0a;
    background: #fafafa;
    transition: background 0.08s, border-color 0.08s;
}

.sidebar-article:hover {
    border-left-color: #ddd6ff;
    background: rgba(221, 214, 255, 0.2);
}

.sidebar-article.active {
    border-left-color: #0a0a0a;
    background: rgba(10, 10, 10, 0.04);
    font-weight: 600;
}

.sidebar-article:hover .sa-arrow,
.sidebar-article.active .sa-arrow { opacity: 0.6; }

/* Responsive */
@media (max-width: 900px) {
    .post-grid { grid-template-columns: 1fr; }
    .post-main { border-right: none; }
    .post-sidebar { border-top: 3px solid #0a0a0a; }
    .related-grid { grid-template-columns: 1fr 1fr; }
    .article-section { padding: 16px; }
    .article-body { padding: 20px; }
    .article-card-head { padding: 18px 20px; }
    .article-headline { font-size: 20px; }
}

@media (max-width: 560px) {
    .related-grid { grid-template-columns: 1fr; }
}
</style>
