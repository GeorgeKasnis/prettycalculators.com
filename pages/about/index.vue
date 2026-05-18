<template>
    <UiBreadcrumbBand :links="[{ label: 'Home', to: '/' }, { label: 'About' }]" />

    <!-- Header -->
    <div class="border-b-3 border-brut bg-brut px-8 py-8 mobile:px-4 mobile:py-6">
        <div class="font-mono text-[10px] font-bold uppercase tracking-[0.15em] text-lavender/50 mb-2">About</div>
        <h1 class="font-grotesk text-[52px] font-bold tracking-[-0.05em] leading-none text-cream mobile:text-[36px]">Pretty Calculators</h1>
    </div>

    <!-- Content -->
    <div class="terms-section">
        <div class="terms-card">

            <div class="terms-card-head">
                <div class="terms-eyebrow">About</div>
                <p class="terms-intro">Free, fast, and private calculators — no accounts, no data collection, no nonsense.</p>
            </div>

            <div class="terms-body">

                <div class="term-row">
                    <div class="term-num">01</div>
                    <div class="term-content">
                        <h2 class="term-title">What We Do</h2>
                        <p class="term-text">Pretty Calculators is a collection of free online calculators covering fitness, finance, math, unit conversions, and everyday life. Every calculation runs entirely in your browser — nothing is ever sent to a server.</p>
                    </div>
                </div>

                <div class="term-row">
                    <div class="term-num">02</div>
                    <div class="term-content">
                        <h2 class="term-title">Who Built This</h2>
                        <p class="term-text">Pretty Calculators is an independent project built and maintained by a solo developer. The goal is simple: make useful tools that are fast to load, easy to use, and look good doing it.</p>
                    </div>
                </div>

                <div class="term-row">
                    <div class="term-num">03</div>
                    <div class="term-content">
                        <h2 class="term-title">Privacy First</h2>
                        <p class="term-text">We don't require sign-ups or accounts. Any numbers you type into a calculator stay on your device. We use Google Analytics for anonymous traffic statistics and Google AdSense to display ads that help keep the site free. See our <NuxtLink to="/privacy-policy" class="term-link">Privacy Policy</NuxtLink> for full details.</p>
                    </div>
                </div>

                <div class="term-row">
                    <div class="term-num">04</div>
                    <div class="term-content">
                        <h2 class="term-title">Get in Touch</h2>
                        <p class="term-text">Questions, suggestions, or found a bug? We'd love to hear from you. Reach us at <a href="mailto:prettycalculators@gmail.com" class="term-link">prettycalculators@gmail.com</a> or visit our <NuxtLink to="/contact" class="term-link">Contact page</NuxtLink>.</p>
                    </div>
                </div>

            </div>
        </div>
    </div>
</template>

<script setup>
definePageMeta({ layout: 'brutalist' })

useHead({
    title: 'About — Pretty Calculators',
    meta: [
        { hid: 'title',          name: 'title',          content: 'About — Pretty Calculators' },
        { hid: 'description',    name: 'description',    content: 'Learn about Pretty Calculators — free, browser-based calculators for fitness, finance, math, and everyday life.' },
        { hid: 'og-title',       property: 'og:title',   content: 'About — Pretty Calculators' },
        { hid: 'og:description', property: 'og:description', content: 'Learn about Pretty Calculators — free, browser-based calculators for fitness, finance, math, and everyday life.' },
    ],
})
</script>

<style scoped>
.terms-section {
    padding: 32px;
    background: #ddd6ff;
    border-bottom: 3px solid #0a0a0a;
}

.terms-card {
    background: #fff;
    border: 3px solid #0a0a0a;
    box-shadow: 5px 5px 0 #0a0a0a;
    max-width: 860px;
    margin: 0 auto;
}

.terms-card-head {
    background: #f5e642;
    border-bottom: 3px solid #0a0a0a;
    padding: 24px 32px 22px;
}

.terms-eyebrow {
    font-family: 'Space Mono', monospace;
    font-size: 10px;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.15em;
    opacity: 0.55;
    margin-bottom: 8px;
}

.terms-intro {
    font-size: 18px;
    font-weight: 700;
    letter-spacing: -0.03em;
    line-height: 1.3;
    max-width: 560px;
}

.terms-body {
    display: flex;
    flex-direction: column;
}

.term-row {
    display: grid;
    grid-template-columns: 72px 1fr;
    border-bottom: 3px solid #0a0a0a;
}

.term-row:last-child {
    border-bottom: none;
}

.term-num {
    font-family: 'Space Mono', monospace;
    font-size: 11px;
    font-weight: 700;
    letter-spacing: 0.08em;
    opacity: 0.3;
    padding: 22px 0 22px 32px;
    border-right: 3px solid #0a0a0a;
    display: flex;
    align-items: flex-start;
    padding-top: 24px;
}

.term-content {
    padding: 22px 32px;
}

.term-title {
    font-size: 16px;
    font-weight: 700;
    letter-spacing: -0.02em;
    margin-bottom: 8px;
}

.term-text {
    font-size: 15px;
    line-height: 1.65;
    opacity: 0.65;
}

.term-link {
    text-decoration: underline;
    opacity: 1;
}

@media (max-width: 767px) {
    .terms-section {
        padding: 16px;
    }
    .terms-card-head {
        padding: 18px 20px;
    }
    .terms-intro {
        font-size: 16px;
    }
    .term-row {
        grid-template-columns: 48px 1fr;
    }
    .term-num {
        padding: 18px 0 18px 16px;
        font-size: 10px;
    }
    .term-content {
        padding: 18px 20px;
    }
}
</style>
