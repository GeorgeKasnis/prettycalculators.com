<template>
    <UiWelcomeModal />

    <!-- Hero band -->
    <div class="border-b-3 border-ink bg-yellow flex items-center gap-8 px-7 h-[52px] overflow-hidden relative mobile:flex-col mobile:items-start mobile:h-auto mobile:px-4 mobile:py-[14px] mobile:gap-1">
        <span class="font-mono text-[11px] font-bold uppercase tracking-[0.12em] opacity-50 whitespace-nowrap">Collection</span>
        <span class="font-mono text-[10px] font-bold bg-ink text-yellow px-2 py-[3px] tracking-widest whitespace-nowrap mobile:hidden">V2</span>
        <span class="text-base font-bold tracking-tight mobile:max-w-[65%]">Find the calculator — or tool — you need</span>
        <span class="ml-auto font-mono text-[11px] font-bold bg-ink text-yellow px-3 py-1 tracking-widest whitespace-nowrap mobile:ml-0 mobile:absolute mobile:top-[14px] mobile:right-4">{{ totalCount }} CALCULATORS & TOOLS</span>
    </div>

    <!-- Ad slot: leaderboard -->
    <div class="mx-7 my-5 mobile:mx-4">
        <UiAdSlot variant="leaderboard" />
    </div>

    <!-- Category cards grid -->
    <div class="px-7 pb-7 grid grid-cols-4 tablet:grid-cols-2 mobile:grid-cols-1 mobile:px-4 mobile:pb-4 border-b-3 border-ink">
        <div v-for="(cat, i) in calculatorCategories" :key="cat.slug" class="cat-card border-3 border-ink -m-[1.5px] bg-cream flex flex-col">
            <NuxtLink :to="`/${cat.slug}`" class="px-6 py-5 border-b-3 border-ink flex items-start justify-between gap-2 no-underline text-ink mobile:px-4 mobile:py-4" :style="{ background: cat.color }">
                <div class="text-[32px] font-bold tracking-[-0.04em] leading-none mobile:text-[28px]">{{ cat.title }}</div>
                <div class="font-mono text-[11px] font-bold opacity-35 pt-1 tracking-wide">{{ String(i + 1).padStart(2, "0") }}</div>
            </NuxtLink>
            <div class="px-6 py-4 flex flex-col flex-1 mobile:px-4 mobile:py-3">
                <NuxtLink v-for="tool in cat.tools.slice(0, 6)" :key="tool.label" :to="tool.to" class="tool-link text-sm font-medium py-[11px] border-b border-ink/10 flex items-center justify-between no-underline text-ink">
                    {{ tool.label }}
                    <span class="tool-link-arrow text-xs opacity-0">→</span>
                </NuxtLink>
                <NuxtLink v-if="cat.tools.length > 6" :to="`/${cat.slug}`" class="view-all-link font-mono text-[10px] font-bold uppercase tracking-[0.1em] pt-[10px] mt-1 no-underline text-ink/40 hover:text-ink flex items-center justify-between transition-colors">
                    View all {{ cat.tools.length }} →
                </NuxtLink>
            </div>
        </div>
    </div>

    <!-- Tools band -->
    <div class="tools-band border-b-3 border-ink px-7 py-7 mobile:px-4 mobile:py-6">
        <div class="flex items-end justify-between gap-4 mb-5 mobile:flex-col mobile:items-start mobile:gap-2">
            <div>
                <div class="font-mono text-[10px] font-bold uppercase tracking-[0.15em] opacity-45 mb-2">Tools — private, in your browser</div>
                <h2 class="text-[32px] font-bold tracking-[-0.04em] leading-none mobile:text-[26px]">Quick tools. No uploads.</h2>
            </div>
            <NuxtLink to="/tools" class="font-mono text-[10px] font-bold uppercase tracking-[0.1em] text-ink no-underline opacity-50 hover:opacity-100 transition-opacity whitespace-nowrap">All {{ toolsCat.tools.length }} tools →</NuxtLink>
        </div>
        <div class="flex flex-wrap gap-3 mobile:gap-2">
            <NuxtLink v-for="tool in toolsCat.tools.slice(0, 8)" :key="tool.to" :to="tool.to" class="tools-chip">{{ tool.label }}</NuxtLink>
            <NuxtLink to="/tools" class="tools-chip tools-chip--more">+{{ toolsCat.tools.length - 8 }} more →</NuxtLink>
        </div>
    </div>

    <!-- Slot machine -->
    <ClientOnly>
        <UiSlotMachine />
    </ClientOnly>

    <!-- Bottom row -->
    <div class="bottom-row grid border-b-3 border-ink">
        <!-- Feature block -->
        <div class="px-7 py-8 border-r-3 border-ink mobile:border-r-0 mobile:border-b-3 mobile:px-4 mobile:py-6">
            <div class="feature-inner grid grd">
                <div class="feature-text">
                    <div class="font-mono text-[10px] font-bold uppercase tracking-[0.15em] opacity-40 mb-3">About Pretty Calculators</div>
                    <div class="text-[42px] font-bold tracking-[-0.04em] leading-[1.05] mobile:text-[30px]">Calculators &amp; tools.<br /><em class="not-italic text-[#5c3bef]">Right here.</em></div>
                    <p class="mt-4 text-[15px] opacity-60 max-w-sm leading-relaxed mobile:text-sm">Fast, focused calculators for fitness, math and finance — plus free browser tools for images, text and code. Built to get you the answer quickly.</p>
                </div>
                <div class="tool-marquee">
                    <ClientOnly>
                        <Vue3Marquee class="tool-marquee-row tool-marquee-row--top" :duration="28" :pause-on-hover="true">
                            <NuxtLink to="/fitness/bmi-calculator">BMI</NuxtLink>
                            <NuxtLink to="/fitness/body-fat-calculator">Body Fat</NuxtLink>
                            <NuxtLink to="/fitness/bmr-calculator">BMR</NuxtLink>
                            <NuxtLink to="/fitness/tdee-calculator">TDEE</NuxtLink>
                            <NuxtLink to="/math/percentage-calculator">Percentage</NuxtLink>
                            <NuxtLink to="/math/manhattan-distance-calculator">Manhattan</NuxtLink>
                            <NuxtLink to="/tools/px-to-rem-calculator">Px to Rem</NuxtLink>
                            <NuxtLink to="/tools/image-compressor">Image Compressor</NuxtLink>
                            <NuxtLink to="/tools/qr-code-generator">QR Code</NuxtLink>
                            <NuxtLink to="/other/pizza-calculator">Pizza</NuxtLink>
                        </Vue3Marquee>
                        <Vue3Marquee class="tool-marquee-row tool-marquee-row--bottom" :duration="36" :pause-on-hover="true" direction="reverse">
                            <NuxtLink to="/unit/celsius-to-fahrenheit-converter">Celsius</NuxtLink>
                            <NuxtLink to="/unit/fahrenheit-to-celsius-converter">Fahrenheit</NuxtLink>
                            <NuxtLink to="/unit/miles-to-kilometers">Miles</NuxtLink>
                            <NuxtLink to="/unit/kilometers-to-miles">Kilometers</NuxtLink>
                            <NuxtLink to="/tools/json-formatter">JSON Formatter</NuxtLink>
                            <NuxtLink to="/tools/unix-timestamp-converter">Timestamp</NuxtLink>
                            <NuxtLink to="/other/age-calculator">Age</NuxtLink>
                            <NuxtLink to="/fitness/ideal-weight-calculator">Ideal Weight</NuxtLink>
                        </Vue3Marquee>
                    </ClientOnly>
                </div>
            </div>

            <!-- Tool marquee -->

            <!-- Blog section -->
            <div v-if="blogPosts.length" class="mt-7 pt-6 border-t-3 border-ink">
                <div class="flex items-baseline justify-between mb-5">
                    <span class="font-mono text-[10px] font-bold uppercase tracking-[0.15em] opacity-35">From the blog</span>
                    <NuxtLink to="/blog" class="font-mono text-[10px] font-bold uppercase tracking-[0.1em] text-ink opacity-45 hover:opacity-100 no-underline transition-opacity">All posts →</NuxtLink>
                </div>
                <div class="blog-index border-3 border-ink bg-cream">
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
        </div>

        <!-- CTA block -->
        <div class="bg-ink px-7 py-8 flex flex-col gap-5 mobile:px-4 mobile:py-7">
            <div>
                <div class="font-mono text-[10px] font-bold uppercase tracking-[0.15em] text-white/40 mb-1">Calculators &amp; tools</div>
                <div class="text-[96px] font-bold tracking-[-0.06em] text-lavender leading-none mobile:text-[80px]">{{ totalCount }}</div>
                <div class="font-mono text-xs text-white/50 tracking-wide">& growing</div>
            </div>

            <!-- Category breakdown grid -->
            <div class="cta-cats border-3 border-white/20 sticky top-8">
                <NuxtLink v-for="cat in calculatorCategories" :key="cat.slug" :to="`/${cat.slug}`" class="cta-cat-cell no-underline" :style="{ background: cat.color }">
                    <span class="text-[28px] font-bold tracking-[-0.05em] leading-none text-ink">{{ cat.tools.length }}</span>
                    <span class="font-mono text-[9px] font-bold uppercase tracking-[0.1em] opacity-50 text-ink">{{ cat.title }}</span>
                </NuxtLink>
                <NuxtLink :to="`/${toolsCat.slug}`" class="cta-cat-cell cta-cat-cell--tools no-underline" :style="{ background: toolsCat.color }">
                    <span class="text-[28px] font-bold tracking-[-0.05em] leading-none text-ink">{{ toolsCat.tools.length }}</span>
                    <span class="font-mono text-[9px] font-bold uppercase tracking-[0.1em] opacity-50 text-ink">{{ toolsCat.title }}</span>
                </NuxtLink>
            </div>

            <UiAdSlot variant="rectangle" :dark="true" />
        </div>
    </div>
</template>

<script setup>
definePageMeta({ layout: "brutalist" });

const { calculatorCategories, toolCategories } = useCategoryConfig("_");
const toolsCat = toolCategories[0];

const totalCount = computed(() => calculatorCategories.reduce((sum, c) => sum + c.tools.length, 0) + toolsCat.tools.length);

const runtimeConfig = useRuntimeConfig();
// select= keeps the payload small — without it every post's full rich-text body is downloaded
const { data: blogData } = await useFetch(`${runtimeConfig.public.API_URL}&content_type=blog&limit=5&order=-sys.createdAt&select=fields.title,fields.slug`);

// Contentful posts carry no category field — infer the swatch from the title
const CAT_RULES = [
    { label: "Fitness", color: "#ddd6ff", re: /bmi|bmr|tdee|body fat|calorie|protein|macro|\bpace\b|running|weight|heart rate|vo2|water intake/i },
    { label: "Math",    color: "#f5e642", re: /percentage|distance|manhattan|euclidean|cosine|fraction|\bratio\b|average|deviation|quadratic|\bgpa\b|\bmath\b/i },
    { label: "Finance", color: "#d4edda", re: /interest|mortgage|loan|salary|\btax\b|invest|retirement|debt|savings|\broi\b|\bvat\b|earnings|money/i },
    { label: "Tools",   color: "#cfe8ff", re: /image|compress|\bqr\b|password|json|base64|uuid|timestamp|\bcsv\b|lorem|\burl\b|diff|contrast|px to rem|word count|encoder/i },
    { label: "Other",   color: "#ffd6d6", re: /pizza|\btip\b|sleep|\bage\b|pregnancy|ovulation|discount|reading time/i },
];

const postCategory = (title) => CAT_RULES.find((r) => r.re.test(title)) ?? { label: "Blog", color: "#ddd6ff" };

const blogPosts = computed(() => {
    if (!blogData.value?.items?.length) return [];
    return blogData.value.items.map((item) => {
        const title = item.fields.title ?? "";
        return {
            slug: item.fields.slug,
            title,
            cat: postCategory(title),
        };
    });
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
/* ── Tools band ── */
.tools-band {
    background: #cfe8ff;
}
.tools-chip {
    border: 3px solid #0a0a0a;
    background: #fafafa;
    color: #0a0a0a;
    text-decoration: none;
    font-weight: 700;
    font-size: 14px;
    letter-spacing: -0.01em;
    padding: 10px 16px;
    transition: transform 0.08s, box-shadow 0.08s;
}
.tools-chip:hover {
    transform: translate(-2px, -2px);
    box-shadow: 4px 4px 0 #0a0a0a;
}
.tools-chip--more {
    background: #0a0a0a;
    color: #cfe8ff;
}

/* ── Category cards ── */
.cat-card {
    transition:
        transform 0.08s,
        box-shadow 0.08s;
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

/* ── Blog index: featured post + numbered list ── */
.blog-index {
    display: grid;
    grid-template-columns: 1.1fr 1fr;
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
.blog-feature:hover { background: var(--c, #ddd6ff); }

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
.blog-row:hover { background: var(--c, #ddd6ff); }

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

/* ── CTA breakdown grid ── */
.cta-cats {
    display: grid;
    grid-template-columns: 1fr 1fr;
}

.cta-cat-cell--tools {
    grid-column: 1 / -1;
    border-top: 3px solid #0a0a0a;
}

.cta-cat-cell {
    padding: 14px;
    display: flex;
    flex-direction: column;
    gap: 3px;
    border-right: 3px solid #0a0a0a;
    border-bottom: 3px solid #0a0a0a;
    transition: filter 0.08s;
}
.cta-cat-cell:hover {
    filter: brightness(0.92);
}
.cta-cat-cell:nth-child(2) {
    border-right: none;
}
.cta-cat-cell:nth-child(3) {
    border-bottom: none;
}
.cta-cat-cell:nth-child(4) {
    border-right: none;
    border-bottom: none;
}

/* ── Browse all button ── */
.cta-browse-btn {
    display: flex;
    align-items: center;
    justify-content: center;
    background: #f5e642;
    color: #0a0a0a;
    font-family: "Space Grotesk", sans-serif;
    font-size: 15px;
    font-weight: 700;
    padding: 14px 20px;
    border: 3px solid #0a0a0a;
    box-shadow: 4px 4px 0 #0a0a0a;
    text-decoration: none;
    letter-spacing: -0.01em;
    transition:
        transform 0.08s,
        box-shadow 0.08s;
}
.cta-browse-btn:hover {
    transform: translate(-2px, -2px);
    box-shadow: 6px 6px 0 #0a0a0a;
}

/* ── Tool marquee ── */
.tool-marquee {
    width: 100%;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    gap: 6px;
    padding: 20px 0 4px;
    margin-top: 24px;
    border-top: 3px solid #0a0a0a;
}

.tool-marquee-row {
    font-weight: 700;
    letter-spacing: -0.04em;
    line-height: 1;
    color: #0a0a0a;
}

.tool-marquee-row--top {
    font-size: 36px;
}

.tool-marquee-row--bottom {
    font-size: 28px;
    opacity: 0.45;
}

.tool-marquee-row :deep(a) {
    display: inline-flex;
    align-items: center;
    gap: 12px;
    margin-right: 32px;
    color: inherit;
    text-decoration: none;
}

.tool-marquee-row :deep(a)::after {
    content: "✦";
    font-size: 16px;
    color: #5c3bef;
}

.tool-marquee-row :deep(a):hover {
    color: #5c3bef;
}

/* ── Bottom row layout ── */
.bottom-row {
    grid-template-columns: 2fr 1fr;
}

@media (max-width: 900px) {
    .bottom-row {
        grid-template-columns: 1fr;
    }

    .blog-index {
        grid-template-columns: 1fr;
    }
    .blog-feature {
        border-right: none;
        border-bottom: 3px solid #0a0a0a;
    }
}

/* ── Mobile (≤767px) ── */
@media (max-width: 767px) {
    .blog-feature-title {
        font-size: 18px;
    }

    .blog-row {
        padding: 12px 14px;
        gap: 10px;
    }

    .blog-row-cat {
        display: none;
    }

    .cat-card:hover {
        transform: none;
        box-shadow: none;
    }
}
</style>
