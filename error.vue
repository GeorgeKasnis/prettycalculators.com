<template>
    <div class="min-h-screen flex flex-col bg-lavender">

        <!-- Header -->
        <header>
            <nav class="border-b-3 border-brut bg-brut flex items-stretch h-16 sticky top-0 z-50">
                <NuxtLink to="/" class="text-xl font-bold text-lavender tracking-[-0.03em] px-7 flex items-center border-r border-[#333] whitespace-nowrap no-underline font-grotesk">
                    Pretty<span class="text-yellow">&nbsp;Calculators</span>
                </NuxtLink>
            </nav>
        </header>

        <!-- Error body -->
        <main class="flex-1">

            <!-- Status band -->
            <div class="border-b-3 border-ink bg-yellow flex items-center gap-8 px-7 h-[52px]">
                <span class="font-mono text-[11px] font-bold uppercase tracking-[0.12em] opacity-50">Error</span>
                <span class="text-base font-bold tracking-tight">Something went wrong</span>
                <span class="ml-auto font-mono text-[11px] font-bold bg-ink text-yellow px-3 py-1 tracking-widest">
                    {{ error?.statusCode ?? '?' }}
                </span>
            </div>

            <!-- Main content -->
            <div class="error-grid border-b-3 border-ink">

                <!-- Left: big error code -->
                <div class="px-10 py-14 border-r-3 border-ink flex flex-col justify-between gap-8 mobile:border-r-0 mobile:border-b-3 mobile:px-6 mobile:py-10">
                    <div>
                        <div class="font-mono text-[10px] font-bold uppercase tracking-[0.15em] opacity-40 mb-4">
                            {{ is404 ? 'Page not found' : 'Server error' }}
                        </div>
                        <div class="text-[120px] font-bold tracking-[-0.06em] leading-none text-ink mobile:text-[80px]">
                            {{ error?.statusCode ?? '?' }}
                        </div>
                        <div class="text-[28px] font-bold tracking-[-0.04em] leading-tight mt-2 mobile:text-[22px]">
                            {{ is404 ? 'This page doesn\'t exist.' : 'Something broke on our end.' }}
                            <br><em class="not-italic text-[#5c3bef]">{{ is404 ? 'But we have calculators.' : 'Try again shortly.' }}</em>
                        </div>
                        <p class="mt-4 text-[15px] opacity-55 max-w-sm leading-relaxed">
                            {{ is404
                                ? 'The page you\'re looking for has moved, been deleted, or never existed. Head back home to find what you need.'
                                : 'An unexpected error occurred. Our team has been notified. Please try refreshing the page.'
                            }}
                        </p>
                    </div>

                    <!-- Actions -->
                    <div class="flex flex-wrap gap-3">
                        <NuxtLink to="/" class="error-btn-primary">
                            ← Back to Homepage
                        </NuxtLink>
                        <button class="error-btn-secondary" @click="handleError">
                            Try again
                        </button>
                    </div>
                </div>

                <!-- Right: quick links -->
                <div class="bg-ink px-7 py-8 flex flex-col gap-0 mobile:px-5 mobile:py-6">
                    <div class="font-mono text-[10px] font-bold uppercase tracking-[0.15em] text-white/40 mb-5">Popular calculators</div>
                    <NuxtLink
                        v-for="link in quickLinks"
                        :key="link.to"
                        :to="link.to"
                        class="quick-link"
                    >
                        <span>{{ link.label }}</span>
                        <span class="opacity-30 group-hover:opacity-100 transition-opacity">→</span>
                    </NuxtLink>
                </div>

            </div>
        </main>

        <!-- Footer -->
        <footer class="border-t-3 border-ink bg-ink px-7 py-4 flex items-center justify-between mobile:px-4">
            <span class="font-mono text-[10px] font-bold text-white/30 uppercase tracking-[0.12em]">Pretty Calculators</span>
            <span class="font-mono text-[10px] text-white/20">prettycalculators.com</span>
        </footer>

    </div>
</template>

<script setup>
const props = defineProps({
    error: Object,
})

const is404 = computed(() => props.error?.statusCode === 404)

const quickLinks = [
    { label: 'BMI Calculator',             to: '/fitness/bmi-calculator' },
    { label: 'TDEE Calculator',            to: '/fitness/tdee-calculator' },
    { label: 'Body Fat Calculator',        to: '/fitness/body-fat-calculator' },
    { label: 'BMR Calculator',             to: '/fitness/bmr-calculator' },
    { label: 'Percentage Calculator',      to: '/math/percentage-calculator' },
    { label: 'Celsius to Fahrenheit',      to: '/unit/celsius-to-fahrenheit-converter' },
    { label: 'Daily Water Intake',         to: '/other/aqua-calculator' },
    { label: 'Pizza Calculator',           to: '/other/pizza-calculator' },
]

const handleError = () => clearError({ redirect: '/' })

useHead({
    title: `${props.error?.statusCode ?? 'Error'} — Pretty Calculators`,
})
</script>

<style scoped>
.error-grid {
    display: grid;
    grid-template-columns: 2fr 1fr;
}

.error-btn-primary {
    display: inline-flex;
    align-items: center;
    background: #0a0a0a;
    color: #fafafa;
    font-size: 14px;
    font-weight: 700;
    letter-spacing: -0.01em;
    padding: 12px 22px;
    border: 3px solid #0a0a0a;
    box-shadow: 5px 5px 0 #0a0a0a;
    text-decoration: none;
    transition: transform 0.08s, box-shadow 0.08s;
}
.error-btn-primary:hover {
    transform: translate(-2px, -2px);
    box-shadow: 7px 7px 0 #0a0a0a;
}

.error-btn-secondary {
    display: inline-flex;
    align-items: center;
    background: transparent;
    color: #0a0a0a;
    font-size: 14px;
    font-weight: 700;
    letter-spacing: -0.01em;
    padding: 12px 22px;
    border: 3px solid #0a0a0a;
    cursor: pointer;
    transition: background 0.08s;
}
.error-btn-secondary:hover {
    background: rgba(10,10,10,0.06);
}

.quick-link {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 11px 0;
    font-size: 13px;
    font-weight: 500;
    color: rgba(255,255,255,0.5);
    border-bottom: 1px solid rgba(255,255,255,0.06);
    text-decoration: none;
    transition: color 0.08s, padding-left 0.08s;
}
.quick-link:last-child { border-bottom: none; }
.quick-link:hover {
    color: #fff;
    padding-left: 6px;
}

@media (max-width: 900px) {
    .error-grid { grid-template-columns: 1fr; }
}
</style>
