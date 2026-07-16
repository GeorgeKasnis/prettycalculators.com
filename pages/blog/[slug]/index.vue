<template>
    <!-- Reading progress -->
    <div class="progress">
        <div class="progress-fill" :style="{ width: `${readProgress}%` }" />
    </div>

    <!-- Breadcrumb band -->
    <UiBreadcrumbBand :links="[{ label: 'Home', to: '/' }, { label: 'Blog', to: '/blog' }, { label: fields.title }]" :dark="true" />

    <!-- HERO -->
    <header class="article-hero">
        <div class="article-hero-symbol" aria-hidden="true">{{ catSymbol }}</div>
        <div class="article-hero-inner">
            <NuxtLink to="/blog" class="article-cat" :style="{ background: cat.color }">{{ cat.label }}</NuxtLink>
            <h1 class="article-title">{{ titleStart }}<em>{{ titleEnd }}</em></h1>
            <div class="article-meta">
                <span>By <b>Pretty Calculators</b></span>
                <span>·</span>
                <span>{{ formatDate(postSys.createdAt, true) }}</span>
                <span>·</span>
                <span><b>{{ readTime }} min</b> read</span>
                <span class="article-share">
                    <a
                        :href="`https://www.facebook.com/sharer/sharer.php?u=https://prettycalculators.com/blog/${route.params.slug}`"
                        target="_blank" rel="noopener" class="share-btn" title="Share on Facebook"
                    >
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
                    </a>
                    <a
                        :href="`https://twitter.com/intent/tweet?url=https://prettycalculators.com/blog/${route.params.slug}&text=${encodeURIComponent(fields.title ?? '')}`"
                        target="_blank" rel="noopener" class="share-btn" title="Share on X"
                    >
                        <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
                    </a>
                    <button class="share-btn" :title="copied ? 'Copied!' : 'Copy link'" @click="copyLink">
                        <svg v-if="!copied" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>
                        <svg v-else width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                    </button>
                </span>
            </div>
        </div>
    </header>

    <!-- LAYOUT -->
    <div class="article-layout">
        <article class="article-body" v-html="bodyHtml" />

        <aside class="sidebar">
            <nav v-if="tocItems.length" class="toc">
                <div class="toc-head" :style="{ background: cat.color }">On this page</div>
                <a
                    v-for="(item, i) in tocItems"
                    :key="item.id"
                    :href="`#${item.id}`"
                    :class="{ current: activeToc === item.id }"
                    :style="{ '--c': cat.color }"
                ><i>{{ String(i + 1).padStart(2, '0') }}</i>{{ item.text }}</a>
            </nav>
            <UiAdSlot variant="rectangle" bordered />
        </aside>
    </div>

    <!-- RELATED -->
    <section v-if="relatedPosts.length" class="related">
        <div class="related-head">
            <h2 class="related-title">Keep reading</h2>
            <NuxtLink to="/blog" class="related-all">All posts →</NuxtLink>
        </div>
        <div class="related-grid">
            <NuxtLink
                v-for="rel in relatedPosts"
                :key="rel.fields.slug"
                :to="`/blog/${rel.fields.slug}`"
                class="post-card"
                :style="{ '--cc': postTag(rel).color }"
            >
                <div class="post-card-top"><span class="post-card-cat">{{ postTag(rel).label }}</span></div>
                <div class="post-card-body"><h3 class="post-card-title">{{ rel.fields.title }}</h3></div>
                <div class="post-card-foot"><span>{{ postReadTime(rel) }} min read</span><span>→</span></div>
            </NuxtLink>
        </div>
    </section>
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

/* ── Category from Contentful tag ── */
const TAG_META = {
    fitness: { label: "Fitness", color: "#ddd6ff", symbol: "kcal" },
    math:    { label: "Math",    color: "#f5e642", symbol: "√x" },
    maths:   { label: "Math",    color: "#f5e642", symbol: "√x" },
    finance: { label: "Finance", color: "#d4f5d4", symbol: "€" },
    other:   { label: "Other",   color: "#ffd6d6", symbol: "✱" },
    tools:   { label: "Tools",   color: "#cfe8f7", symbol: "</>" },
}

const postTag = (item) => TAG_META[item?.metadata?.tags?.[0]?.sys?.id] ?? { label: "Blog", color: "#ddd6ff", symbol: "✱" }

const cat = computed(() => postTag(post.value?.items?.[0]))
const catSymbol = computed(() => cat.value.symbol)

/* ── Title split: last word gets the accent color ── */
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

/* ── Read time ── */
const wordCountOf = (content) => {
    try { return JSON.stringify(content ?? '').split(/\s+/).length } catch { return 0 }
}
const readTime = computed(() => Math.max(1, Math.ceil(wordCountOf(fields.value.content) / 200)))
const postReadTime = (item) => Math.max(1, Math.ceil(wordCountOf(item.fields?.content) / 200))

/* ── Body HTML + table of contents (ids injected into h2s) ── */
const processed = computed(() => {
    let html = ''
    try { html = documentToHtmlString(fields.value.content) } catch { html = '' }
    const headings = []
    let i = 0
    html = html.replace(/<h2>([\s\S]*?)<\/h2>/g, (m, inner) => {
        i++
        headings.push({ id: `s${i}`, text: inner.replace(/<[^>]+>/g, '') })
        return `<h2 id="s${i}">${inner}</h2>`
    })
    return { html, headings }
})

const bodyHtml = computed(() => processed.value.html)
const tocItems = computed(() => processed.value.headings)

/* ── Related posts ── */
const relatedPosts = computed(() =>
    (allBlogData.value?.items ?? [])
        .filter((p) => String(p.fields?.slug) !== String(route.params.slug))
        .slice(0, 3)
)

const { formatDate } = useBlogUtils()

/* ── Scroll: progress bar + TOC highlight ── */
const readProgress = ref(0)
const activeToc = ref('')

const onScroll = () => {
    const el = document.documentElement
    const scrolled = el.scrollTop || document.body.scrollTop
    const total = el.scrollHeight - el.clientHeight
    readProgress.value = total > 0 ? Math.min(100, (scrolled / total) * 100) : 0

    const y = window.scrollY + 150
    let current = tocItems.value[0]?.id ?? ''
    for (const h of tocItems.value) {
        const heading = document.getElementById(h.id)
        if (heading && heading.getBoundingClientRect().top + window.scrollY <= y) current = h.id
    }
    activeToc.value = current
}

onMounted(() => {
    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
})
onUnmounted(() => window.removeEventListener('scroll', onScroll))

/* ── Copy link ── */
const copied = ref(false)
const copyLink = async () => {
    try {
        await navigator.clipboard.writeText(`https://prettycalculators.com/blog/${route.params.slug}`)
        copied.value = true
        setTimeout(() => { copied.value = false }, 2000)
    } catch {}
}

/* ── SEO ── */
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
const canonical = `https://prettycalculators.com${route.path.replace(/\/+$/, '') || '/'}`

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
/* ── Reading progress ── */
.progress {
    position: sticky;
    top: 0;
    z-index: 49;
    height: 6px;
    background: #fafafa;
    border-bottom: 2.5px solid #0a0a0a;
}

.progress-fill {
    height: 100%;
    width: 0;
    background: #5c3bef;
}

/* ── Hero ── */
.article-hero {
    border-bottom: 3px solid #0a0a0a;
    background: #0a0a0a;
    color: #fafafa;
    padding: 52px 28px;
    position: relative;
    overflow: hidden;
}

.article-hero-symbol {
    position: absolute;
    right: -30px;
    bottom: -40px;
    font-size: 180px;
    font-weight: 700;
    color: rgba(221, 214, 255, 0.05);
    letter-spacing: -0.05em;
    pointer-events: none;
    line-height: 1;
    transform: rotate(-6deg);
}

.article-hero-inner {
    max-width: 820px;
    margin: 0 auto;
    position: relative;
    z-index: 1;
}

.article-cat {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    font-family: 'Space Mono', monospace;
    font-size: 10px;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.16em;
    color: #0a0a0a;
    border: 2px solid #fafafa;
    padding: 5px 12px;
    margin-bottom: 20px;
    text-decoration: none;
}

.article-cat:hover { background: #fafafa !important; color: #0a0a0a; }

.article-title {
    font-size: clamp(30px, 4.2vw, 54px);
    font-weight: 700;
    letter-spacing: -0.04em;
    line-height: 1.02;
    text-wrap: pretty;
}

.article-title em {
    font-style: normal;
    color: #ddd6ff;
}

.article-meta {
    margin-top: 22px;
    display: flex;
    align-items: center;
    gap: 18px;
    flex-wrap: wrap;
    font-family: 'Space Mono', monospace;
    font-size: 11px;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.1em;
    color: rgba(255, 255, 255, 0.5);
}

.article-meta b { color: #fafafa; }

.article-share {
    display: inline-flex;
    align-items: center;
    gap: 6px;
}

.share-btn {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 30px;
    height: 30px;
    border: 2px solid rgba(255, 255, 255, 0.25);
    background: transparent;
    color: rgba(255, 255, 255, 0.6);
    cursor: pointer;
    transition: background 0.1s, color 0.1s, border-color 0.1s;
}

.share-btn:hover {
    background: #fafafa;
    color: #0a0a0a;
    border-color: #fafafa;
}

/* ── Layout ── */
.article-layout {
    max-width: 1180px;
    margin: 0 auto;
    padding: 40px 28px 56px;
    display: grid;
    grid-template-columns: minmax(0, 1fr) 300px;
    gap: 44px;
    align-items: start;
}

/* ── Body typography (rendered Contentful rich text) ── */
.article-body {
    max-width: 720px;
    font-size: 17px;
    line-height: 1.7;
}

.article-body :deep(* + *) { margin-top: 22px; }
.article-body :deep(p) { text-wrap: pretty; }

.article-body :deep(> p:first-child) {
    font-size: 20px;
    font-weight: 500;
    line-height: 1.55;
}

.article-body :deep(a) { color: #5c3bef; font-weight: 600; }
.article-body :deep(a:hover) { color: #0a0a0a; }

.article-body :deep(h2) {
    font-size: 30px;
    font-weight: 700;
    letter-spacing: -0.03em;
    line-height: 1.1;
    margin-top: 44px;
    display: flex;
    align-items: center;
    gap: 13px;
    scroll-margin-top: 90px;
}

.article-body :deep(h2)::before {
    content: '';
    width: 12px;
    height: 12px;
    background: #5c3bef;
    flex-shrink: 0;
}

.article-body :deep(h3) {
    font-size: 21px;
    font-weight: 700;
    letter-spacing: -0.02em;
    margin-top: 32px;
}

.article-body :deep(ul),
.article-body :deep(ol) { padding-left: 24px; }
.article-body :deep(li) { margin-top: 8px; }
.article-body :deep(li p) { margin-top: 0; }
.article-body :deep(strong) { font-weight: 700; }

.article-body :deep(blockquote) {
    border: 3px solid #0a0a0a;
    background: #fafafa;
    box-shadow: 5px 5px 0 #0a0a0a;
    padding: 20px 22px;
    font-size: 15px;
    line-height: 1.6;
}

.article-body :deep(hr) {
    border: none;
    border-top: 3px solid #0a0a0a;
    margin-top: 36px;
}

/* Tables from rich text get the data-table treatment */
.article-body :deep(table) {
    border: 3px solid #0a0a0a;
    background: #fafafa;
    box-shadow: 5px 5px 0 #0a0a0a;
    margin-top: 28px;
    width: 100%;
    border-collapse: collapse;
    font-size: 14px;
    display: block;
    overflow-x: auto;
}

.article-body :deep(table p) { margin: 0; }

.article-body :deep(tr:first-child td),
.article-body :deep(th) {
    font-family: 'Space Mono', monospace;
    font-size: 10px;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.1em;
    background: #0a0a0a;
    color: #fafafa;
    padding: 10px 14px;
    text-align: left;
}

.article-body :deep(td) {
    padding: 10px 14px;
    border-top: 1.5px solid rgba(10, 10, 10, 0.12);
    font-weight: 500;
}

.article-body :deep(tr:not(:first-child):hover td) { background: #ddd6ff33; }

.article-body :deep(td:first-child) {
    font-family: 'Space Mono', monospace;
    font-weight: 700;
}

/* ── Sidebar ── */
.sidebar {
    position: sticky;
    top: 32px;
    display: flex;
    flex-direction: column;
    gap: 24px;
}

.toc {
    border: 3px solid #0a0a0a;
    background: #fafafa;
    box-shadow: 5px 5px 0 #0a0a0a;
}

.toc-head {
    font-family: 'Space Mono', monospace;
    font-size: 10px;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.14em;
    padding: 12px 16px;
    border-bottom: 3px solid #0a0a0a;
    color: #0a0a0a;
}

.toc a {
    display: flex;
    align-items: baseline;
    gap: 10px;
    padding: 11px 16px;
    font-size: 13px;
    font-weight: 600;
    line-height: 1.35;
    color: #0a0a0a;
    text-decoration: none;
    border-bottom: 1.5px solid rgba(10, 10, 10, 0.08);
    transition: background 0.1s, color 0.1s;
}

.toc a:last-child { border-bottom: none; }
.toc a:hover { background: var(--c, #ddd6ff); color: #0a0a0a; }
.toc a.current { background: #0a0a0a; color: #fafafa; }
.toc a.current i { opacity: 0.6; }

.toc a i {
    font-family: 'Space Mono', monospace;
    font-size: 10px;
    font-weight: 700;
    font-style: normal;
    opacity: 0.35;
    flex-shrink: 0;
}

/* ── Related ── */
.related {
    border-top: 3px solid #0a0a0a;
    padding: 36px 28px 44px;
}

.related-head {
    display: flex;
    align-items: baseline;
    justify-content: space-between;
    margin-bottom: 20px;
}

.related-title {
    font-size: 28px;
    font-weight: 700;
    letter-spacing: -0.03em;
    display: flex;
    align-items: center;
    gap: 14px;
}

.related-title::before {
    content: '';
    width: 13px;
    height: 13px;
    background: #5c3bef;
}

.related-all {
    font-family: 'Space Mono', monospace;
    font-size: 10px;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.1em;
    color: #0a0a0a;
    text-decoration: none;
    opacity: 0.5;
}

.related-all:hover { opacity: 1; color: #0a0a0a; }

.related-grid {
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
    padding: 14px 18px;
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
    padding: 18px;
    flex: 1;
}

.post-card-title {
    font-size: 17px;
    font-weight: 700;
    letter-spacing: -0.02em;
    line-height: 1.25;
    text-wrap: pretty;
}

.post-card-foot {
    padding: 11px 18px;
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

/* ── Responsive ── */
@media (max-width: 1000px) {
    .article-layout {
        grid-template-columns: 1fr;
        gap: 28px;
    }
    .sidebar {
        position: static;
        flex-direction: row;
        flex-wrap: wrap;
    }
    .toc { flex: 1 1 280px; }
    .sidebar > :last-child { flex: 1 1 280px; }
}

@media (max-width: 900px) {
    .related-grid { grid-template-columns: 1fr 1fr; }
}

@media (max-width: 560px) {
    .article-hero { padding: 36px 20px; }
    .article-layout { padding: 28px 20px 40px; }
    .article-body { font-size: 16px; }
    .article-body :deep(> p:first-child) { font-size: 18px; }
    .article-body :deep(h2) { font-size: 24px; }
    .related-grid { grid-template-columns: 1fr; }
    .related { padding: 28px 16px 36px; }
}
</style>
