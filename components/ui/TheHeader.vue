<template>
    <header>
        <nav class="border-b-3 border-brut bg-brut flex items-stretch h-16 sticky top-0 z-50">
            <NuxtLink to="/" class="text-xl font-bold text-lavender tracking-[-0.03em] px-7 flex items-center border-r border-[#333] whitespace-nowrap no-underline font-grotesk">
                Pretty<span class="text-brut-yellow">&nbsp;Calculators</span>
            </NuxtLink>

            <!-- Desktop nav -->
            <ul class="flex items-stretch ml-auto list-none mobile:hidden">
                <li v-for="link in navLinks" :key="link.to">
                    <NuxtLink
                        :to="link.to"
                        class="flex items-center px-6 font-mono text-[12px] font-bold uppercase tracking-[0.08em] text-cream no-underline border-l border-[#333] h-full transition-colors duration-100"
                        :class="$route.path.startsWith(link.to) ? 'bg-lavender !text-brut' : 'hover:bg-lavender hover:text-brut'"
                    >{{ link.label }}</NuxtLink>
                </li>
            </ul>

            <!-- Search button -->
            <button class="search-btn mobile:hidden" @click="searchOpen = true" aria-label="Search calculators">
                <span class="search-btn-icon">⌕</span>
                <span class="search-btn-text">Search</span>
            </button>

            <!-- Mobile hamburger -->
            <button
                class="hamburger-btn hidden mobile:flex ml-auto"
                :class="{ 'is-open': menuOpen }"
                :aria-expanded="menuOpen"
                aria-label="Toggle navigation menu"
                @click="menuOpen = !menuOpen"
            >
                <span></span>
                <span></span>
                <span></span>
            </button>
        </nav>

        <!-- Mobile dropdown menu -->
        <ul v-show="menuOpen" class="mobile-menu hidden mobile:block fixed z-40 list-none bg-brut w-full border-b-3 border-brut">
            <li v-for="link in navLinks" :key="link.to">
                <NuxtLink
                    :to="link.to"
                    class="flex items-center justify-between px-5 py-[18px] font-mono text-[13px] font-bold uppercase tracking-[0.1em] text-cream no-underline border-b border-[#222]"
                    active-class="bg-lavender !text-brut"
                    @click="menuOpen = false"
                >
                    {{ link.label }}
                    <span class="text-brut-yellow opacity-60 text-base">→</span>
                </NuxtLink>
            </li>
        </ul>

        <!-- Mobile search FAB -->
        <button class="search-fab hidden mobile:flex" @click="searchOpen = true" aria-label="Search calculators">
            <span style="font-size:22px;line-height:1">⌕</span>
        </button>

        <!-- Search modal -->
        <UiSearchModal v-model="searchOpen" />
    </header>
</template>

<script setup>
const menuOpen  = ref(false)
const searchOpen = ref(false)
const route = useRoute()

watch(() => route.path, () => { menuOpen.value = false })

const navLinks = [
    { to: '/fitness', label: 'Fitness' },
    { to: '/math',    label: 'Math' },
    { to: '/unit',    label: 'Unit' },
    { to: '/other',   label: 'Other' },
    { to: '/blog',    label: 'Blog' },
]

onMounted(() => {
    window.addEventListener('keydown', onKey)
})
onUnmounted(() => {
    window.removeEventListener('keydown', onKey)
})

function onKey(e) {
    if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault()
        searchOpen.value = true
    }
}
</script>

<style scoped>
/* Search button */
.search-btn {
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 0 20px;
    background: #0a0a0a;
    border: none;
    border-left: 3px solid #f5e642;
    cursor: pointer;
    color: #f5e642;
    transition: background 0.1s, color 0.1s;
    height: 100%;
    flex-shrink: 0;
}
.search-btn:hover { background: #1a1a1a; }

.search-btn-icon { font-size: 18px; line-height: 1; }

.search-btn-text {
    font-family: 'Space Mono', monospace;
    font-size: 11px;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.08em;
}

/* Mobile search FAB */
.search-fab {
    position: fixed;
    bottom: 24px;
    right: 20px;
    z-index: 90;
    width: 52px;
    height: 52px;
    align-items: center;
    justify-content: center;
    background: #0a0a0a;
    border: 3px solid #f5e642;
    box-shadow: 4px 4px 0 #f5e642;
    color: #f5e642;
    cursor: pointer;
    transition: box-shadow 0.08s, transform 0.08s;
}
.search-fab:active { box-shadow: 2px 2px 0 #f5e642; transform: translate(2px, 2px); }

/* Hamburger button */
.hamburger-btn {
    width: 64px;
    height: 64px;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 5px;
    background: #f5e642;
    border: none;
    border-left: 1px solid #333;
    cursor: pointer;
    padding: 0;
    flex-shrink: 0;
}

.hamburger-btn span {
    display: block;
    width: 22px;
    height: 3px;
    background: #0a0a0a;
    transition: transform 0.18s, opacity 0.18s;
}

.hamburger-btn.is-open span:nth-child(1) { transform: translateY(8px) rotate(45deg); }
.hamburger-btn.is-open span:nth-child(2) { opacity: 0; }
.hamburger-btn.is-open span:nth-child(3) { transform: translateY(-8px) rotate(-45deg); }

/* Mobile menu — positioned below the sticky nav */
.mobile-menu {
    top: 64px; /* nav height */
    left: 0;
    right: 0;
}

.mobile-menu li:last-child a {
    border-bottom: none;
}

@media (max-width: 767px) {
    .search-btn { display: none; }
}

@media (prefers-reduced-motion: reduce) {
    .hamburger-btn span { transition: none; }
}
</style>
