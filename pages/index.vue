<template>
    <UiWelcomeModal />

    <!-- HERO -->
    <header class="hero">
        <div>
            <div class="hero-eyebrow">{{ totalCount }} free tools · No signup · No fluff</div>
            <h1 class="hero-title">The right calculator, <em>in seconds.</em></h1>
            <div class="search-wrap">
                <div class="search-box">
                    <span class="search-icon">⌕</span>
                    <input
                        ref="searchInput"
                        v-model="query"
                        type="text"
                        placeholder='Search calculators… try "BMI" or "compound interest"'
                        autocomplete="off"
                        @keydown="onSearchKeydown"
                    >
                    <span class="search-kbd">/</span>
                </div>
                <div class="search-results" :class="{ open: query.trim().length > 0 }">
                    <template v-if="searchMatches.length">
                        <NuxtLink
                            v-for="(m, i) in searchMatches"
                            :key="m.url"
                            :to="m.url"
                            :class="{ sel: i === selIdx }"
                            :style="{ '--c': m.color }"
                        ><span class="sw"></span>{{ m.name }}<span class="cat">{{ m.cat }}</span></NuxtLink>
                    </template>
                    <div v-else class="search-empty">No calculators match "{{ query.trim() }}"</div>
                </div>
            </div>
            <div class="search-hints">
                <span>Popular:</span>
                <NuxtLink to="/fitness/bmi-calculator">BMI</NuxtLink>
                <NuxtLink to="/finance/compound-interest-calculator">Compound Interest</NuxtLink>
                <NuxtLink to="/math/percentage-calculator">Percentage</NuxtLink>
                <NuxtLink to="/tools/qr-code-generator">QR Code</NuxtLink>
                <NuxtLink to="/fitness/tdee-calculator">TDEE</NuxtLink>
            </div>
        </div>
        <aside class="hero-stat">
            <div class="hero-stat-label">Total tools</div>
            <div class="hero-stat-num">{{ heroCount }}</div>
            <div class="hero-stat-cats">
                <NuxtLink
                    v-for="cat in allCats"
                    :key="cat.slug"
                    :to="`/${cat.slug}`"
                    class="hero-stat-cat"
                    :style="{ '--c': cat.color }"
                ><i></i>{{ cat.title }}<b>{{ cat.tools.length }}</b></NuxtLink>
            </div>
        </aside>
    </header>

    <!-- TICKER -->
    <div class="ticker" aria-hidden="true">
        <div class="ticker-inner">
            <NuxtLink v-for="(t, i) in tickerItems" :key="i" :to="t.to">{{ t.label }}</NuxtLink>
        </div>
    </div>

    <!-- Ad: leaderboard -->
    <div class="mx-7 mt-6 mobile:mx-4">
        <UiAdSlot variant="leaderboard" />
    </div>

    <!-- CATEGORIES -->
    <div id="categories" class="sec-head mobile:flex-col mobile:gap-4">
        <h2 class="sec-head-title">Browse by category</h2>
        <span class="sec-head-sub">{{ allCats.length }} categories · {{ totalCount }} tools</span>
    </div>
    <div class="main">
        <div v-for="cat in allCats" :key="cat.slug" class="cat-card" :style="{ '--c': cat.color }">
            <div class="cat-card-header">
                <NuxtLink :to="`/${cat.slug}`" class="cat-card-title">{{ cat.title }}</NuxtLink>
                <div class="cat-card-count">{{ cat.tools.length }}</div>
            </div>
            <div class="cat-card-links">
                <NuxtLink v-for="tool in cat.tools.slice(0, 5)" :key="tool.to" :to="tool.to">{{ tool.label }}</NuxtLink>
            </div>
            <NuxtLink :to="`/${cat.slug}`" class="cat-card-all">View all {{ cat.tools.length }} <span>→</span></NuxtLink>
        </div>
        <a class="lucky-card" href="#slot" @click.prevent="goLucky">
            <span class="lucky-card-eyebrow">Can't decide?</span>
            <span class="lucky-card-title">Let the machine <em>pick for you.</em></span>
            <span class="lucky-card-btn">Feeling lucky →</span>
        </a>
    </div>

    <!-- SLOT MACHINE -->
    <div id="slot">
        <ClientOnly>
            <UiSlotMachine ref="slotRef" />
        </ClientOnly>
    </div>

    <!-- ABOUT + STATS -->
    <div class="bottom-row">
        <div class="feature-block">
            <div class="feature-block-eyebrow">About Pretty Calculators</div>
            <div class="feature-block-headline">Every tool you need. <em>Right here.</em></div>
            <div class="feature-block-sub">Fast, focused calculators for fitness, math and finance — plus free browser tools for images, text and code. Built to get you the answer quickly.</div>
            <div class="feature-block-stats">
                <div class="fb-stat"><b>{{ totalCount }}</b><span>Tools</span></div>
                <div class="fb-stat"><b>{{ allCats.length }}</b><span>Categories</span></div>
                <div class="fb-stat"><b>0</b><span>Signups</span></div>
                <div class="fb-stat"><b>100%</b><span>Free</span></div>
            </div>
        </div>

        <div ref="ctaBlock" class="cta-block">
            <div>
                <div class="cta-block-label">Total tools</div>
                <div class="cta-block-number">{{ ctaCount }}</div>
                <div class="cta-block-sub">& growing</div>
            </div>
            <div class="cta-cats">
                <NuxtLink
                    v-for="(cat, i) in allCats"
                    :key="cat.slug"
                    :to="`/${cat.slug}`"
                    class="cta-cat-item"
                    :class="{ span2: i === allCats.length - 1 && allCats.length % 2 === 1 }"
                    :style="{ background: cat.color }"
                >
                    <span class="cta-cat-num">{{ ctaCatCounts[cat.slug] }}</span>
                    <span class="cta-cat-name">{{ cat.title }}</span>
                </NuxtLink>
            </div>
            <a class="cta-btn" href="#categories">Browse all →</a>
            <UiAdSlot variant="rectangle" :dark="true" />
        </div>
    </div>

    <!-- BLOG (FULL WIDTH) -->
    <section v-if="blogPosts.length" class="blog-wide">
        <div class="blog-section">
            <div class="blog-section-header">
                <span class="blog-section-title">From the blog</span>
                <NuxtLink to="/blog" class="blog-section-all">All posts →</NuxtLink>
            </div>
            <div class="blog-index">
                <NuxtLink :to="`/blog/${featuredPost.slug}`" class="blog-feature" :style="{ '--c': featuredPost.cat.color }">
                    <span class="blog-feature-badge">Latest post</span>
                    <span class="blog-feature-title">{{ featuredPost.title }}</span>
                    <span class="blog-feature-meta">{{ featuredPost.cat.label }} · Read →</span>
                </NuxtLink>
                <div class="blog-list">
                    <NuxtLink v-for="(post, i) in listPosts" :key="post.slug" :to="`/blog/${post.slug}`" class="blog-row" :style="{ '--c': post.cat.color }">
                        <span class="blog-row-num">{{ String(i + 1).padStart(2, '0') }}</span>
                        <span class="blog-row-title">{{ post.title }}</span>
                        <span class="blog-row-cat">{{ post.cat.label }}</span>
                    </NuxtLink>
                </div>
            </div>
        </div>
    </section>
</template>

<script setup>
definePageMeta({ layout: "brutalist" });

const { otherCategories: allCats } = useCategoryConfig("_");

const totalCount = allCats.reduce((sum, c) => sum + c.tools.length, 0);

const ALL_TOOLS = allCats.flatMap((c) =>
    c.tools.map((t) => ({ cat: c.title, name: t.label, url: t.to, color: c.color }))
);

/* ── Search ── */
const query = ref("");
const selIdx = ref(-1);
const searchInput = ref(null);

const searchMatches = computed(() => {
    const q = query.value.trim().toLowerCase();
    if (!q) return [];
    return ALL_TOOLS.filter((t) => t.name.toLowerCase().includes(q) || t.cat.toLowerCase().includes(q)).slice(0, 8);
});

watch(query, () => { selIdx.value = -1; });

const onSearchKeydown = (e) => {
    const n = searchMatches.value.length;
    if (e.key === "ArrowDown" || e.key === "ArrowUp") {
        e.preventDefault();
        if (!n) return;
        selIdx.value = e.key === "ArrowDown" ? (selIdx.value + 1) % n : (selIdx.value - 1 + n) % n;
    } else if (e.key === "Enter" && selIdx.value >= 0 && searchMatches.value[selIdx.value]) {
        navigateTo(searchMatches.value[selIdx.value].url);
    } else if (e.key === "Escape") {
        query.value = "";
        searchInput.value?.blur();
    }
};

const onDocKeydown = (e) => {
    const el = document.activeElement;
    const typing = el && (el.tagName === "INPUT" || el.tagName === "TEXTAREA" || el.isContentEditable);
    if (e.key === "/" && !typing) {
        e.preventDefault();
        searchInput.value?.focus();
    }
};

const onDocClick = (e) => {
    if (!e.target.closest(".search-wrap")) query.value = "";
};

/* ── Ticker ── */
const TICKER = [
    { label: "BMI", to: "/fitness/bmi-calculator" },
    { label: "Compound Interest", to: "/finance/compound-interest-calculator" },
    { label: "Percentage", to: "/math/percentage-calculator" },
    { label: "TDEE", to: "/fitness/tdee-calculator" },
    { label: "QR Code", to: "/tools/qr-code-generator" },
    { label: "Image Compressor", to: "/tools/image-compressor" },
    { label: "Take-Home Pay", to: "/finance/take-home-pay-calculator" },
    { label: "Age", to: "/other/age-calculator" },
    { label: "Ratio", to: "/math/ratio-calculator" },
    { label: "Px to Rem", to: "/tools/px-to-rem-calculator" },
    { label: "Running Pace", to: "/fitness/pace-calculator" },
    { label: "JSON Formatter", to: "/tools/json-formatter" },
];
const tickerItems = [...TICKER, ...TICKER];

/* ── Lucky card → slot machine ── */
const slotRef = ref(null);

const goLucky = () => {
    document.getElementById("slot")?.scrollIntoView({ behavior: "smooth" });
    setTimeout(() => slotRef.value?.spin?.(), 700);
};

/* ── Animated counters ── */
const heroCount = ref(0);
const ctaCount = ref(0);
const ctaCatCounts = reactive(Object.fromEntries(allCats.map((c) => [c.slug, 0])));
const ctaBlock = ref(null);

const animateCount = (setter, target, duration) => {
    const start = performance.now();
    const step = (now) => {
        const p = Math.min((now - start) / duration, 1);
        const eased = p === 1 ? 1 : 1 - Math.pow(2, -10 * p);
        setter(Math.round(eased * target));
        if (p < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
};

let ctaObs;
onMounted(() => {
    document.addEventListener("keydown", onDocKeydown);
    document.addEventListener("click", onDocClick);

    animateCount((v) => { heroCount.value = v; }, totalCount, 1200);

    ctaObs = new IntersectionObserver((entries) => {
        entries.forEach((en) => {
            if (!en.isIntersecting) return;
            animateCount((v) => { ctaCount.value = v; }, totalCount, 1200);
            for (const cat of allCats) {
                animateCount((v) => { ctaCatCounts[cat.slug] = v; }, cat.tools.length, 900);
            }
            ctaObs.disconnect();
        });
    }, { threshold: 0.3 });
    if (ctaBlock.value) ctaObs.observe(ctaBlock.value);
});

onUnmounted(() => {
    document.removeEventListener("keydown", onDocKeydown);
    document.removeEventListener("click", onDocClick);
    ctaObs?.disconnect();
});

/* ── Blog ── */
const runtimeConfig = useRuntimeConfig();
// select= keeps the payload small — without it every post's full rich-text body is downloaded
const { data: blogData } = await useFetch(`${runtimeConfig.public.API_URL}&content_type=blog&limit=5&order=-sys.createdAt&select=fields.title,fields.slug`);

const TAG_META = {
    fitness: { label: "Fitness", color: "#ddd6ff" },
    math:    { label: "Math",    color: "#f5e642" },
    maths:   { label: "Math",    color: "#f5e642" },
    finance: { label: "Finance", color: "#d4f5d4" },
    other:   { label: "Other",   color: "#ffd6d6" },
    tools:   { label: "Tools",   color: "#cfe8f7" },
};

// Fallback for posts without a Contentful tag — infer the category from the title
const CAT_RULES = [
    { label: "Fitness", color: "#ddd6ff", re: /bmi|bmr|tdee|body fat|calorie|protein|macro|\bpace\b|running|weight|heart rate|vo2|water intake|sleep/i },
    { label: "Math",    color: "#f5e642", re: /percentage|distance|manhattan|euclidean|cosine|fraction|\bratio\b|average|deviation|quadratic|\bgpa\b|\bmath\b/i },
    { label: "Finance", color: "#d4f5d4", re: /interest|mortgage|loan|salary|\btax\b|invest|retirement|debt|savings|\broi\b|\bvat\b|earnings|money/i },
    { label: "Tools",   color: "#cfe8f7", re: /image|compress|\bqr\b|password|json|base64|uuid|timestamp|\bcsv\b|lorem|\burl\b|diff|contrast|px to rem|word count|encoder/i },
    { label: "Other",   color: "#ffd6d6", re: /pizza|\btip\b|sleep|\bage\b|pregnancy|ovulation|discount|reading time/i },
];

const postCategory = (item) => {
    const tagId = item.metadata?.tags?.[0]?.sys?.id;
    if (tagId && TAG_META[tagId]) return TAG_META[tagId];
    const title = item.fields.title ?? "";
    return CAT_RULES.find((r) => r.re.test(title)) ?? { label: "Blog", color: "#ddd6ff" };
};

const blogPosts = computed(() => {
    if (!blogData.value?.items?.length) return [];
    return blogData.value.items.map((item) => ({
        slug: item.fields.slug,
        title: item.fields.title ?? "",
        cat: postCategory(item),
    }));
});

const featuredPost = computed(() => blogPosts.value[0]);
const listPosts = computed(() => blogPosts.value.slice(1, 5));

useHead({
    title: "Pretty Calculators — Free Calculators & Tools",
    link: [
        { rel: 'canonical', href: 'https://prettycalculators.com/' },
    ],
    script: [
        {
            type: 'application/ld+json',
            innerHTML: JSON.stringify({
                '@context': 'https://schema.org',
                '@type': 'WebSite',
                name: 'Pretty Calculators',
                url: 'https://prettycalculators.com',
                description: 'Fast, focused calculators and free browser tools — fitness, math, finance, images, text and code.',
            }),
        },
        {
            type: 'application/ld+json',
            innerHTML: JSON.stringify({
                '@context': 'https://schema.org',
                '@type': 'Organization',
                name: 'Pretty Calculators',
                url: 'https://prettycalculators.com',
                logo: 'https://prettycalculators.com/android-icon-192x192.png',
            }),
        },
    ],
    meta: [
        { hid: "title",               name: "title",               content: "Pretty Calculators — Free Calculators & Tools" },
        { hid: "description",         name: "description",         content: "Fast, focused calculators for fitness, math and finance — plus free browser tools: image compressor, QR code generator, JSON formatter and more." },
        { hid: "og:url",              property: "og:url",          content: "https://prettycalculators.com/" },
        { hid: "og-title",            property: "og:title",        content: "Pretty Calculators — Free Calculators & Tools" },
        { hid: "og:description",      property: "og:description",  content: "Fast, focused calculators for fitness, math and finance — plus free browser tools: image compressor, QR code generator, JSON formatter and more." },
        { hid: "twitter:card",        name: "twitter:card",        content: "summary_large_image" },
        { hid: "twitter:title",       name: "twitter:title",       content: "Pretty Calculators — Free Calculators & Tools" },
        { hid: "twitter:description", name: "twitter:description", content: "Fast, focused calculators for fitness, math and finance — plus free browser tools: image compressor, QR code generator, JSON formatter and more." },
    ],
});
</script>

<style scoped>
/* ── Hero ── */
.hero {
    border-bottom: 3px solid #0a0a0a;
    padding: 72px 28px 60px;
    display: grid;
    grid-template-columns: 1fr auto;
    gap: 48px;
    align-items: center;
    position: relative;
    overflow: hidden;
}

.hero::before {
    content: '÷ × − +';
    position: absolute;
    right: 220px;
    top: -60px;
    font-size: 220px;
    font-weight: 700;
    color: rgba(92, 59, 239, 0.06);
    letter-spacing: -0.02em;
    pointer-events: none;
    white-space: nowrap;
}

@media (min-width: 1200px) {
    .hero {
        grid-template-columns: auto auto;
        justify-content: center;
        gap: clamp(72px, 9vw, 150px);
        padding-left: clamp(32px, 6vw, 90px);
        padding-right: clamp(32px, 6vw, 90px);
    }
    .hero::before { right: auto; left: 52%; top: -70px; }
    .hero-stat { min-width: 290px; }
}

.hero-eyebrow {
    font-family: 'Space Mono', monospace;
    font-size: 11px;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.18em;
    display: inline-flex;
    align-items: center;
    gap: 10px;
    margin-bottom: 18px;
    background: #0a0a0a;
    color: #ddd6ff;
    padding: 5px 12px;
    width: max-content;
}

.hero-title {
    font-size: clamp(40px, 5.5vw, 76px);
    font-weight: 700;
    letter-spacing: -0.045em;
    line-height: 0.98;
    max-width: 680px;
    text-wrap: pretty;
}

.hero-title em {
    font-style: normal;
    color: #5c3bef;
}

/* ── Search ── */
.search-wrap {
    margin-top: 34px;
    max-width: 640px;
    position: relative;
}

.search-box {
    display: flex;
    align-items: stretch;
    border: 3px solid #0a0a0a;
    background: #fafafa;
    box-shadow: 8px 8px 0 #0a0a0a;
}

.search-box:focus-within { box-shadow: 8px 8px 0 #5c3bef; }

.search-icon {
    display: flex;
    align-items: center;
    padding: 0 0 0 18px;
    font-size: 18px;
    opacity: 0.4;
}

.search-box input {
    flex: 1;
    border: none;
    outline: none;
    background: transparent;
    font-family: 'Space Grotesk', sans-serif;
    font-size: 17px;
    font-weight: 500;
    padding: 18px 16px;
    color: #0a0a0a;
    min-width: 0;
}

.search-box input::placeholder { opacity: 0.4; }

.search-kbd {
    align-self: center;
    margin-right: 14px;
    font-family: 'Space Mono', monospace;
    font-size: 10px;
    font-weight: 700;
    border: 2px solid rgba(10, 10, 10, 0.25);
    padding: 3px 7px;
    opacity: 0.45;
    white-space: nowrap;
}

.search-results {
    display: none;
    position: absolute;
    top: calc(100% + 8px);
    left: 0;
    right: 0;
    background: #fafafa;
    border: 3px solid #0a0a0a;
    box-shadow: 8px 8px 0 #0a0a0a;
    z-index: 20;
    max-height: 320px;
    overflow-y: auto;
}

.search-results.open { display: block; }

.search-results a {
    display: flex;
    align-items: center;
    gap: 12px;
    padding: 12px 18px;
    text-decoration: none;
    font-size: 15px;
    font-weight: 500;
    color: #0a0a0a;
    border-bottom: 1.5px solid rgba(10, 10, 10, 0.08);
}

.search-results a:last-child { border-bottom: none; }
.search-results a:hover,
.search-results a.sel { background: #ddd6ff; }

.search-results .sw {
    width: 12px;
    height: 12px;
    background: var(--c);
    border: 2px solid #0a0a0a;
    flex-shrink: 0;
}

.search-results .cat {
    margin-left: auto;
    font-family: 'Space Mono', monospace;
    font-size: 9px;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.12em;
    opacity: 0.4;
}

.search-empty {
    padding: 16px 18px;
    font-family: 'Space Mono', monospace;
    font-size: 12px;
    opacity: 0.5;
}

.search-hints {
    margin-top: 14px;
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
    align-items: center;
}

.search-hints span {
    font-family: 'Space Mono', monospace;
    font-size: 10px;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.12em;
    opacity: 0.4;
    margin-right: 2px;
}

.search-hints a {
    font-family: 'Space Mono', monospace;
    font-size: 11px;
    font-weight: 700;
    text-decoration: none;
    color: #0a0a0a;
    background: #fafafa;
    border: 2px solid #0a0a0a;
    padding: 5px 10px;
    transition: transform 0.08s, box-shadow 0.08s;
}

.search-hints a:hover {
    transform: translate(-2px, -2px);
    box-shadow: 3px 3px 0 #0a0a0a;
    color: #0a0a0a;
}

/* ── Hero stat ── */
.hero-stat {
    border: 3px solid #0a0a0a;
    background: #0a0a0a;
    color: #fafafa;
    padding: 28px 30px;
    box-shadow: 8px 8px 0 #0a0a0a;
    min-width: 250px;
    position: relative;
    z-index: 1;
}

.hero-stat-num {
    font-size: 84px;
    font-weight: 700;
    letter-spacing: -0.06em;
    line-height: 1;
    color: #ddd6ff;
    font-variant-numeric: tabular-nums;
}

.hero-stat-label {
    font-family: 'Space Mono', monospace;
    font-size: 10px;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.15em;
    color: rgba(255, 255, 255, 0.4);
    margin-bottom: 8px;
}

.hero-stat-cats {
    margin-top: 18px;
    display: grid;
    gap: 8px;
}

.hero-stat-cat {
    display: flex;
    align-items: center;
    gap: 10px;
    font-family: 'Space Mono', monospace;
    font-size: 11px;
    font-weight: 700;
    letter-spacing: 0.08em;
    color: rgba(255, 255, 255, 0.75);
    text-decoration: none;
}

.hero-stat-cat:hover { color: #fafafa; }

.hero-stat-cat i {
    width: 10px;
    height: 10px;
    background: var(--c);
    border: 1.5px solid rgba(255, 255, 255, 0.2);
}

.hero-stat-cat b { margin-left: auto; color: #fafafa; }

/* ── Ticker ── */
.ticker {
    border-bottom: 3px solid #0a0a0a;
    background: #0a0a0a;
    overflow: hidden;
    padding: 12px 0;
    white-space: nowrap;
}

.ticker-inner {
    display: inline-flex;
    gap: 32px;
    animation: marq 45s linear infinite;
}

.ticker:hover .ticker-inner { animation-play-state: paused; }

.ticker a {
    font-family: 'Space Mono', monospace;
    font-size: 12px;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.1em;
    text-decoration: none;
    color: #ddd6ff;
    display: inline-flex;
    align-items: center;
    gap: 32px;
}

.ticker a:hover { color: #f5e642; }
.ticker a::after { content: '✦'; color: #5c3bef; }

@keyframes marq {
    from { transform: translateX(0); }
    to   { transform: translateX(-50%); }
}

/* ── Section header ── */
.sec-head {
    display: flex;
    align-items: baseline;
    justify-content: space-between;
    padding: 0 28px;
    margin: 40px 0 20px;
}

.sec-head-title {
    font-size: 28px;
    font-weight: 700;
    letter-spacing: -0.03em;
    display: flex;
    align-items: center;
    gap: 14px;
}

.sec-head-title::before {
    content: '';
    width: 13px;
    height: 13px;
    background: #5c3bef;
}

.sec-head-sub {
    font-family: 'Space Mono', monospace;
    font-size: 11px;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.1em;
    opacity: 0.45;
}

/* ── Category grid ── */
.main {
    padding: 0 28px 44px;
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 0;
}

.cat-card {
    border: 3px solid #0a0a0a;
    margin: -1.5px;
    background: #fafafa;
    display: flex;
    flex-direction: column;
    position: relative;
    transition: transform 0.08s, box-shadow 0.08s;
}

.cat-card:hover {
    transform: translate(-3px, -3px);
    box-shadow: 8px 8px 0 #0a0a0a;
    z-index: 2;
}

.cat-card-header {
    padding: 18px 22px 14px;
    border-bottom: 3px solid #0a0a0a;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 8px;
    position: relative;
}

.cat-card-header::before {
    content: '';
    position: absolute;
    left: 0;
    top: 0;
    bottom: 0;
    width: 10px;
    background: var(--c);
    border-right: 2.5px solid #0a0a0a;
}

.cat-card-title {
    font-size: 26px;
    font-weight: 700;
    letter-spacing: -0.04em;
    line-height: 1;
    padding-left: 14px;
    text-decoration: none;
    color: #0a0a0a;
}

.cat-card-count {
    font-family: 'Space Mono', monospace;
    font-size: 11px;
    font-weight: 700;
    background: var(--c);
    border: 2px solid #0a0a0a;
    padding: 3px 9px;
    letter-spacing: 0.05em;
}

.cat-card-links {
    padding: 14px 22px 18px;
    display: flex;
    flex-direction: column;
    flex: 1;
}

.cat-card-links a {
    font-size: 14px;
    font-weight: 500;
    color: #0a0a0a;
    text-decoration: none;
    padding: 9px 0;
    border-bottom: 1.5px solid rgba(10, 10, 10, 0.1);
    display: flex;
    align-items: center;
    justify-content: space-between;
    transition: padding-left 0.1s;
}

.cat-card-links a:last-child { border-bottom: none; }

.cat-card-links a::after {
    content: '→';
    font-size: 12px;
    opacity: 0;
    transition: opacity 0.1s, transform 0.1s;
    transform: translateX(-4px);
}

.cat-card-links a:hover { padding-left: 6px; color: #0a0a0a; }
.cat-card-links a:hover::after { opacity: 0.5; transform: translateX(0); }

.cat-card-all {
    margin-top: auto;
    padding: 12px 22px;
    border-top: 3px solid #0a0a0a;
    font-family: 'Space Mono', monospace;
    font-size: 11px;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.1em;
    text-decoration: none;
    color: #0a0a0a;
    display: flex;
    justify-content: space-between;
    background: rgba(10, 10, 10, 0.03);
    transition: background 0.1s;
}

.cat-card-all:hover { background: var(--c); color: #0a0a0a; }

/* ── Lucky card ── */
.lucky-card {
    border: 3px solid #0a0a0a;
    margin: -1.5px;
    background: #0a0a0a;
    color: #fafafa;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: center;
    gap: 14px;
    padding: 28px;
    position: relative;
    overflow: hidden;
    text-decoration: none;
    transition: transform 0.08s, box-shadow 0.08s;
    cursor: pointer;
}

.lucky-card:hover {
    transform: translate(-3px, -3px);
    box-shadow: 8px 8px 0 #0a0a0a;
    z-index: 2;
    color: #fafafa;
}

.lucky-card::after {
    content: '?';
    position: absolute;
    right: -20px;
    bottom: -50px;
    font-size: 200px;
    font-weight: 700;
    line-height: 1;
    color: rgba(255, 255, 255, 0.06);
    pointer-events: none;
}

.lucky-card-eyebrow {
    font-family: 'Space Mono', monospace;
    font-size: 10px;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.16em;
    color: #f5e642;
    display: flex;
    align-items: center;
    gap: 8px;
}

.lucky-card-eyebrow::before {
    content: '';
    width: 6px;
    height: 6px;
    background: #f5e642;
}

.lucky-card-title {
    font-size: 26px;
    font-weight: 700;
    letter-spacing: -0.03em;
    line-height: 1.1;
}

.lucky-card-title em {
    font-style: normal;
    color: #ddd6ff;
}

.lucky-card-btn {
    font-family: 'Space Mono', monospace;
    font-size: 11px;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.12em;
    background: #f5e642;
    color: #0a0a0a;
    border: 2.5px solid #fafafa;
    padding: 10px 16px;
    display: inline-flex;
    align-items: center;
    gap: 8px;
}

.lucky-card:hover .lucky-card-btn { background: #fafafa; }

/* ── Bottom row ── */
.bottom-row {
    display: grid;
    grid-template-columns: 2fr 1fr;
}

.bottom-row > * { min-width: 0; }

.feature-block {
    padding: 40px 28px;
    border-right: 3px solid #0a0a0a;
    display: flex;
    flex-direction: column;
    justify-content: center;
}

.feature-block-eyebrow {
    font-family: 'Space Mono', monospace;
    font-size: 10px;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.15em;
    opacity: 0.4;
    margin-bottom: 14px;
}

.feature-block-headline {
    font-size: clamp(42px, 4vw, 60px);
    font-weight: 700;
    letter-spacing: -0.04em;
    line-height: 1.02;
    max-width: 560px;
    text-wrap: pretty;
}

.feature-block-headline em {
    font-style: normal;
    color: #5c3bef;
}

.feature-block-sub {
    margin-top: 18px;
    font-size: 17px;
    opacity: 0.6;
    max-width: 460px;
    line-height: 1.6;
}

.feature-block-stats {
    margin-top: 30px;
    display: flex;
    border: 3px solid #0a0a0a;
    background: #fafafa;
    box-shadow: 5px 5px 0 #0a0a0a;
    max-width: max-content;
}

.fb-stat {
    padding: 14px 22px;
    display: flex;
    flex-direction: column;
    gap: 2px;
}

.fb-stat + .fb-stat { border-left: 2.5px solid #0a0a0a; }

.fb-stat b {
    font-size: 26px;
    font-weight: 700;
    letter-spacing: -0.04em;
    line-height: 1;
    font-variant-numeric: tabular-nums;
}

.fb-stat span {
    font-family: 'Space Mono', monospace;
    font-size: 9px;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.12em;
    opacity: 0.45;
}

/* ── Blog index ── */
.blog-wide {
    padding: 36px 28px 44px;
    border-top: 3px solid #0a0a0a;
}

.blog-wide .blog-section { margin-top: 0; }
.blog-wide .blog-index { grid-template-columns: 1.35fr 1fr; }
.blog-wide .blog-feature-title { font-size: clamp(22px, 2.4vw, 32px); }
.blog-wide .blog-row-title { font-size: 14px; }

.blog-section { margin-top: 32px; }

.blog-section-header {
    display: flex;
    align-items: baseline;
    justify-content: space-between;
    margin-bottom: 16px;
}

.blog-section-title {
    font-family: 'Space Mono', monospace;
    font-size: 10px;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.15em;
    opacity: 0.4;
}

.blog-section-all {
    font-family: 'Space Mono', monospace;
    font-size: 10px;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.1em;
    color: #0a0a0a;
    text-decoration: none;
    opacity: 0.5;
}

.blog-section-all:hover { opacity: 1; color: #0a0a0a; }

.blog-index {
    display: grid;
    grid-template-columns: 1.1fr 1fr;
    border: 3px solid #0a0a0a;
    background: #fafafa;
    box-shadow: 5px 5px 0 #0a0a0a;
}

.blog-feature {
    padding: 24px;
    border-right: 3px solid #0a0a0a;
    display: flex;
    flex-direction: column;
    gap: 14px;
    text-decoration: none;
    color: #0a0a0a;
    transition: background 0.1s;
}

.blog-feature:hover { background: var(--c, #ddd6ff); color: #0a0a0a; }

.blog-feature-badge {
    font-family: 'Space Mono', monospace;
    font-size: 9px;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.14em;
    background: #0a0a0a;
    color: #fafafa;
    padding: 4px 8px;
    max-width: max-content;
}

.blog-feature-title {
    font-size: 22px;
    font-weight: 700;
    letter-spacing: -0.02em;
    line-height: 1.2;
    text-wrap: pretty;
}

.blog-feature-meta {
    margin-top: auto;
    display: flex;
    align-items: center;
    gap: 8px;
    font-family: 'Space Mono', monospace;
    font-size: 9px;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.12em;
    opacity: 0.5;
}

.blog-feature-meta::before {
    content: '';
    width: 8px;
    height: 8px;
    background: var(--c, #ddd6ff);
    border: 1.5px solid #0a0a0a;
}

.blog-list {
    display: flex;
    flex-direction: column;
}

.blog-row {
    display: flex;
    align-items: center;
    gap: 14px;
    padding: 14px 18px;
    text-decoration: none;
    color: #0a0a0a;
    border-bottom: 1.5px solid rgba(10, 10, 10, 0.12);
    flex: 1;
    transition: background 0.1s;
}

.blog-row:last-child { border-bottom: none; }
.blog-row:hover { background: var(--c, #ddd6ff); color: #0a0a0a; }

.blog-row-num {
    font-family: 'Space Mono', monospace;
    font-size: 10px;
    font-weight: 700;
    opacity: 0.3;
    flex-shrink: 0;
}

.blog-row-title {
    font-size: 13px;
    font-weight: 600;
    line-height: 1.35;
    text-wrap: pretty;
    overflow: hidden;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    line-clamp: 2;
    -webkit-box-orient: vertical;
}

.blog-row-cat {
    margin-left: auto;
    flex-shrink: 0;
    display: flex;
    align-items: center;
    gap: 6px;
    font-family: 'Space Mono', monospace;
    font-size: 9px;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.1em;
    opacity: 0.45;
}

.blog-row-cat::before {
    content: '';
    width: 8px;
    height: 8px;
    background: var(--c, #ddd6ff);
    border: 1.5px solid #0a0a0a;
}

/* ── CTA block ── */
.cta-block {
    display: flex;
    flex-direction: column;
    padding: 40px 28px;
    background: #0a0a0a;
    gap: 20px;
}

.cta-block-label {
    font-family: 'Space Mono', monospace;
    font-size: 10px;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.15em;
    color: rgba(255, 255, 255, 0.35);
}

.cta-block-number {
    font-size: 96px;
    font-weight: 700;
    letter-spacing: -0.06em;
    color: #ddd6ff;
    line-height: 1;
    font-variant-numeric: tabular-nums;
}

.cta-block-sub {
    font-family: 'Space Mono', monospace;
    font-size: 12px;
    color: rgba(255, 255, 255, 0.5);
    letter-spacing: 0.05em;
}

.cta-cats {
    display: grid;
    grid-template-columns: 1fr 1fr;
    border: 3px solid #0a0a0a;
}

.cta-cat-item {
    padding: 14px 16px;
    border-right: 3px solid #0a0a0a;
    border-bottom: 3px solid #0a0a0a;
    display: flex;
    flex-direction: column;
    gap: 2px;
    text-decoration: none;
    color: #0a0a0a;
    transition: filter 0.08s;
}

.cta-cat-item:hover { filter: brightness(0.92); color: #0a0a0a; }
.cta-cat-item:nth-child(even) { border-right: none; }
.cta-cat-item:nth-last-child(-n+2) { border-bottom: none; }

.cta-cat-item.span2 {
    grid-column: 1 / -1;
    border-right: none;
    border-bottom: none;
}

.cta-cat-num {
    font-size: 32px;
    font-weight: 700;
    letter-spacing: -0.05em;
    line-height: 1;
    font-variant-numeric: tabular-nums;
}

.cta-cat-name {
    font-family: 'Space Mono', monospace;
    font-size: 9px;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.1em;
    opacity: 0.5;
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
    box-shadow: 5px 5px 0 #0a0a0a;
    text-decoration: none;
    letter-spacing: -0.01em;
    transition: transform 0.08s, box-shadow 0.08s;
    width: max-content;
}

.cta-btn:hover {
    transform: translate(-2px, -2px);
    box-shadow: 7px 7px 0 #ddd6ff;
    color: #0a0a0a;
}

/* ── Responsive ── */
@media (max-width: 1100px) {
    .hero { grid-template-columns: 1fr; }
    .hero-stat { display: none; }
    .hero::before { display: none; }
}

@media (max-width: 900px) {
    .main { grid-template-columns: 1fr 1fr; padding: 0 16px 28px; }
    .sec-head { padding: 0 16px; }
    .bottom-row { grid-template-columns: 1fr; }
    .feature-block { border-right: none; border-bottom: 3px solid #0a0a0a; }
    .cta-block-number { font-size: 64px; }
    .blog-wide { padding: 28px 16px 32px; }
    .blog-index { grid-template-columns: 1fr; }
    .blog-wide .blog-index { grid-template-columns: 1fr; }
    .blog-feature { border-right: none; border-bottom: 3px solid #0a0a0a; }
}

@media (max-width: 560px) {
    .main { grid-template-columns: 1fr; }
    .hero { padding: 44px 20px 40px; }
    .search-kbd { display: none; }
    .feature-block-headline { font-size: 32px; }
    .feature-block-stats { flex-wrap: wrap; }
    .fb-stat { padding: 12px 16px; }
    .blog-feature-title { font-size: 18px; }
    .blog-row { padding: 12px 14px; gap: 10px; }
    .blog-row-cat { display: none; }
    .cat-card:hover { transform: none; box-shadow: none; }
}
</style>
