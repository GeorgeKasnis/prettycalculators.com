<template>
    <UiWelcomeModal />

    <!-- Hero band -->
    <div class="border-b-3 border-ink bg-yellow flex items-center gap-8 px-7 h-[52px] overflow-hidden relative mobile:flex-col mobile:items-start mobile:h-auto mobile:px-4 mobile:py-[14px] mobile:gap-1">
        <span class="font-mono text-[11px] font-bold uppercase tracking-[0.12em] opacity-50 whitespace-nowrap">Collection</span>
        <span class="font-mono text-[10px] font-bold bg-ink text-yellow px-2 py-[3px] tracking-widest whitespace-nowrap mobile:hidden">V2</span>
        <span class="text-base font-bold tracking-tight mobile:max-w-[65%]">Find the calculator you need</span>
        <span class="ml-auto font-mono text-[11px] font-bold bg-ink text-yellow px-3 py-1 tracking-widest whitespace-nowrap mobile:ml-0 mobile:absolute mobile:top-[14px] mobile:right-4">{{ totalTools }} TOOLS</span>
    </div>

    <!-- Ad slot: leaderboard -->
    <div class="mx-7 my-5 mobile:mx-4">
        <UiAdSlot variant="leaderboard" />
    </div>

    <!-- Category cards grid -->
    <div class="px-7 pb-7 grid grid-cols-4 tablet:grid-cols-2 mobile:grid-cols-1 mobile:px-4 mobile:pb-4 border-b-3 border-ink">
        <div v-for="(cat, i) in categories" :key="cat.slug" class="cat-card border-3 border-ink -m-[1.5px] bg-cream flex flex-col">
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

    <!-- Bottom row -->
    <div class="bottom-row grid border-b-3 border-ink">
        <!-- Feature block -->
        <div class="px-7 py-8 border-r-3 border-ink mobile:border-r-0 mobile:border-b-3 mobile:px-4 mobile:py-6">
            <div class="feature-inner grid grd">
                <div class="feature-text">
                    <div class="font-mono text-[10px] font-bold uppercase tracking-[0.15em] opacity-40 mb-3">About Pretty Calculators</div>
                    <div class="text-[42px] font-bold tracking-[-0.04em] leading-[1.05] mobile:text-[30px]">Every tool you need.<br /><em class="not-italic text-[#5c3bef]">Right here.</em></div>
                    <p class="mt-4 text-[15px] opacity-60 max-w-sm leading-relaxed mobile:text-sm">Fast, focused calculators for fitness, math, conversions and more. Built to get you the answer quickly.</p>
                </div>
                <div class="tool-marquee">
                    <div class="tool-marquee-row tool-marquee-row--top">
                        <NuxtLink to="/fitness/bmi-calculator">BMI</NuxtLink>
                        <NuxtLink to="/fitness/body-fat-calculator">Body Fat</NuxtLink>
                        <NuxtLink to="/fitness/bmr-calculator">BMR</NuxtLink>
                        <NuxtLink to="/fitness/tdee-calculator">TDEE</NuxtLink>
                        <NuxtLink to="/math/percentage-calculator">Percentage</NuxtLink>
                        <NuxtLink to="/math/manhattan-distance-calculator">Manhattan</NuxtLink>
                        <NuxtLink to="/other/px-to-rem-calculator">Px to Rem</NuxtLink>
                        <NuxtLink to="/other/pizza-calculator">Pizza</NuxtLink>
                        <NuxtLink to="/fitness/bmi-calculator">BMI</NuxtLink>
                        <NuxtLink to="/fitness/body-fat-calculator">Body Fat</NuxtLink>
                        <NuxtLink to="/fitness/bmr-calculator">BMR</NuxtLink>
                        <NuxtLink to="/fitness/tdee-calculator">TDEE</NuxtLink>
                        <NuxtLink to="/math/percentage-calculator">Percentage</NuxtLink>
                        <NuxtLink to="/math/manhattan-distance-calculator">Manhattan</NuxtLink>
                        <NuxtLink to="/other/px-to-rem-calculator">Px to Rem</NuxtLink>
                        <NuxtLink to="/other/pizza-calculator">Pizza</NuxtLink>
                    </div>
                    <div class="tool-marquee-row tool-marquee-row--bottom">
                        <NuxtLink to="/unit/celsius-to-fahrenheit-converter">Celsius</NuxtLink>
                        <NuxtLink to="/unit/fahrenheit-to-celsius-converter">Fahrenheit</NuxtLink>
                        <NuxtLink to="/unit/miles-to-kilometers">Miles</NuxtLink>
                        <NuxtLink to="/unit/kilometers-to-miles">Kilometers</NuxtLink>
                        <NuxtLink to="/other/aqua-calculator">Aqua</NuxtLink>
                        <NuxtLink to="/other/age-calculator">Age</NuxtLink>
                        <NuxtLink to="/fitness/ideal-weight-calculator">Ideal Weight</NuxtLink>
                        <NuxtLink to="/unit/celsius-to-fahrenheit-converter">Celsius</NuxtLink>
                        <NuxtLink to="/unit/fahrenheit-to-celsius-converter">Fahrenheit</NuxtLink>
                        <NuxtLink to="/unit/miles-to-kilometers">Miles</NuxtLink>
                        <NuxtLink to="/unit/kilometers-to-miles">Kilometers</NuxtLink>
                        <NuxtLink to="/other/aqua-calculator">Aqua</NuxtLink>
                        <NuxtLink to="/other/age-calculator">Age</NuxtLink>
                        <NuxtLink to="/fitness/ideal-weight-calculator">Ideal Weight</NuxtLink>
                    </div>
                </div>
            </div>

            <!-- Tool marquee -->

            <!-- Blog section -->
            <div v-if="blogPosts.length" class="mt-7 pt-6 border-t-3 border-ink">
                <div class="flex items-baseline justify-between mb-5">
                    <span class="font-mono text-[10px] font-bold uppercase tracking-[0.15em] opacity-35">From the blog</span>
                    <NuxtLink to="/blog" class="font-mono text-[10px] font-bold uppercase tracking-[0.1em] text-ink opacity-45 hover:opacity-100 no-underline transition-opacity">All posts →</NuxtLink>
                </div>
                <div class="blog-grid gap-4">
                    <NuxtLink v-for="post in blogPosts" :key="post.slug" :to="`/blog/${post.slug}`" class="blog-card border-3 border-ink -m-[1.5px] no-underline">
                        <!-- <div class="blog-card-thumb mobile:hidden bg-ink flex items-center justify-center px-4">
                            <span class="text-[13px] font-bold text-cream text-center tracking-[-0.02em] leading-snug whitespace-pre-line">{{ post.thumb }}</span>
                        </div> -->
                        <div class="bg-cream px-4 py-3 flex flex-col justify-between gap-2 flex-1">
                            <div class="text-xs font-semibold leading-snug text-ink">{{ post.title }}</div>
                            <div class="font-mono text-[9px] font-bold uppercase tracking-[0.1em] opacity-30">{{ post.tag }}</div>
                        </div>
                    </NuxtLink>
                </div>
            </div>
        </div>

        <!-- CTA block -->
        <div class="bg-ink px-7 py-8 flex flex-col gap-5 mobile:px-4 mobile:py-7">
            <div>
                <div class="font-mono text-[10px] font-bold uppercase tracking-[0.15em] text-white/40 mb-1">Total tools</div>
                <div class="text-[96px] font-bold tracking-[-0.06em] text-lavender leading-none mobile:text-[80px]">{{ totalTools }}</div>
                <div class="font-mono text-xs text-white/50 tracking-wide">& growing</div>
            </div>

            <!-- Category breakdown grid -->
            <div class="cta-cats border-3 border-white/20 sticky top-8">
                <NuxtLink v-for="cat in categories" :key="cat.slug" :to="`/${cat.slug}`" class="cta-cat-cell no-underline" :style="{ background: cat.color }">
                    <span class="text-[28px] font-bold tracking-[-0.05em] leading-none text-ink">{{ cat.tools.length }}</span>
                    <span class="font-mono text-[9px] font-bold uppercase tracking-[0.1em] opacity-50 text-ink">{{ cat.title }}</span>
                </NuxtLink>
            </div>

            <UiAdSlot variant="rectangle" :dark="true" />
        </div>
    </div>
</template>

<script setup>
definePageMeta({ layout: "brutalist" });

const { otherCategories: categories } = useCategoryConfig("_");

const totalTools = computed(() => categories.reduce((sum, c) => sum + c.tools.length, 0));

const runtimeConfig = useRuntimeConfig();
const { data: blogData } = await useFetch(`${runtimeConfig.public.API_URL}&content_type=blog&limit=6`);

const { thumbLines } = useBlogUtils();

const blogPosts = computed(() => {
    if (!blogData.value?.items?.length) return [];
    return blogData.value.items.map((item) => {
        const title = item.fields.title ?? "";
        return {
            slug: item.fields.slug,
            title,
            thumb: thumbLines(title).join("\n"),
            tag: "Blog",
        };
    });
});

useHead({
    title: "Pretty Calculators — Find the calculator you need",
    link: [
        { rel: 'canonical', href: 'https://www.prettycalculators.com/' },
    ],
    script: [
        {
            type: 'application/ld+json',
            innerHTML: JSON.stringify({
                '@context': 'https://schema.org',
                '@type': 'WebSite',
                name: 'Pretty Calculators',
                url: 'https://www.prettycalculators.com',
                description: 'Fast, focused calculators for fitness, math, conversions and more. Free and beautifully designed.',
            }),
        },
        {
            type: 'application/ld+json',
            innerHTML: JSON.stringify({
                '@context': 'https://schema.org',
                '@type': 'Organization',
                name: 'Pretty Calculators',
                url: 'https://www.prettycalculators.com',
                logo: 'https://www.prettycalculators.com/android-icon-192x192.png',
            }),
        },
    ],
    meta: [
        { hid: "title",               name: "title",               content: "Pretty Calculators — Find the calculator you need" },
        { hid: "description",         name: "description",         content: "Fast, focused calculators for fitness, math, conversions and more. BMI, BMR, TDEE, Body Fat, Percentage and more — free and beautifully designed." },
        { hid: "og:url",              property: "og:url",          content: "https://www.prettycalculators.com/" },
        { hid: "og-title",            property: "og:title",        content: "Pretty Calculators — Find the calculator you need" },
        { hid: "og:description",      property: "og:description",  content: "Fast, focused calculators for fitness, math, conversions and more. BMI, BMR, TDEE, Body Fat, Percentage and more — free and beautifully designed." },
        { hid: "twitter:card",        name: "twitter:card",        content: "summary_large_image" },
        { hid: "twitter:title",       name: "twitter:title",       content: "Pretty Calculators — Find the calculator you need" },
        { hid: "twitter:description", name: "twitter:description", content: "Fast, focused calculators for fitness, math, conversions and more. BMI, BMR, TDEE, Body Fat, Percentage and more — free and beautifully designed." },
    ],
});
</script>

<style scoped>
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

/* ── Blog grid ── */
.blog-grid {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    margin: -1.5px;
}

.blog-card {
    display: flex;
    flex-direction: column;
    transition:
        transform 0.08s,
        box-shadow 0.08s;
    position: relative;
    color: #0a0a0a;
}
.blog-card:hover {
    transform: translate(-3px, -3px);
    box-shadow: 5px 5px 0px #0a0a0a;
    z-index: 10;
}

.blog-card-thumb {
    height: 90px;
    border-bottom: 3px solid #0a0a0a;
}

/* ── CTA breakdown grid ── */
.cta-cats {
    display: grid;
    grid-template-columns: 1fr 1fr;
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
    display: flex;
    gap: 32px;
    white-space: nowrap;
    font-weight: 700;
    letter-spacing: -0.04em;
    line-height: 1;
    color: #0a0a0a;
    flex-shrink: 0;
    width: max-content;
}

.tool-marquee-row--top {
    font-size: 36px;
    animation: tool-marquee-scroll 28s linear infinite;
}

.tool-marquee-row--bottom {
    font-size: 28px;
    opacity: 0.45;
    animation: tool-marquee-scroll 36s linear infinite;
    animation-direction: reverse;
}

.tool-marquee-row a {
    display: inline-flex;
    align-items: center;
    gap: 12px;
    color: inherit;
    text-decoration: none;
}

.tool-marquee-row a::after {
    content: "✦";
    font-size: 16px;
    color: #5c3bef;
}

.tool-marquee-row a:hover {
    color: #5c3bef;
}

.tool-marquee:hover .tool-marquee-row {
    animation-play-state: paused;
}

@keyframes tool-marquee-scroll {
    from {
        transform: translateX(0);
    }
    to {
        transform: translateX(-50%);
    }
}

@media (prefers-reduced-motion: reduce) {
    .tool-marquee-row {
        animation: none;
    }
}

/* ── Bottom row layout ── */
.bottom-row {
    grid-template-columns: 2fr 1fr;
}

/* ── Tablet (768–1199px) ── */
@media (max-width: 1199px) {
    .blog-grid {
        grid-template-columns: 1fr 1fr;
    }
}

@media (max-width: 900px) {
    .bottom-row {
        grid-template-columns: 1fr;
    }
}

/* ── Mobile (≤767px) ── */
@media (max-width: 767px) {
    .blog-grid {
        grid-template-columns: 1fr;
        margin: 0;
    }

    /* Horizontal blog card on mobile */
    .blog-card {
        flex-direction: row;
        min-height: 96px;
        margin: -1.5px;
    }

    .blog-card-thumb {
        width: 110px;
        height: auto;
        flex-shrink: 0;
        border-bottom: none;
        border-right: 3px solid #0a0a0a;
    }

    .cat-card:hover {
        transform: none;
        box-shadow: none;
    }
}
</style>
