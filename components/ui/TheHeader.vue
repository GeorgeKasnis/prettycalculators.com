<template>
    <header class="sticky top-0 z-50">
        <nav class="border-b-3 border-brut bg-brut flex items-stretch h-16 sticky top-0 z-50">
            <NuxtLink to="/" class="text-xl font-bold text-lavender tracking-[-0.03em] px-7 flex items-center border-r border-[#333] whitespace-nowrap no-underline font-grotesk">
                Pretty<span class="text-brut-yellow">&nbsp;Calculators</span>
            </NuxtLink>

            <!-- Desktop nav -->
            <ul class="flex items-stretch ml-auto list-none tablet:hidden">
                <li v-for="link in catLinks" :key="link.to" class="nav-cat" :style="{ '--c': link.color }">
                    <NuxtLink
                        :to="link.to"
                        class="nav-cat-link"
                        :class="{ active: $route.path.startsWith(link.to) }"
                    >{{ link.label }}</NuxtLink>
                </li>
                <li class="nav-divider" aria-hidden="true"></li>
                <li class="nav-blog">
                    <NuxtLink
                        to="/blog"
                        class="nav-blog-link"
                        :class="{ active: $route.path.startsWith('/blog') }"
                    >Blog</NuxtLink>
                </li>
            </ul>

            <!-- Search button -->
            <button class="search-btn tablet:hidden" @click="searchOpen = true" aria-label="Search calculators">
                <span class="search-btn-icon">⌕</span>
                <span class="search-btn-text">Search</span>
            </button>

            <!-- Mobile hamburger -->
            <button
                class="hamburger-btn hidden tablet:flex ml-auto"
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
        <ul v-show="menuOpen" class="mobile-menu hidden tablet:block fixed z-40 list-none bg-brut w-full border-b-3 border-brut">
            <li v-for="link in catLinks" :key="link.to" class="nav-cat" :style="{ '--c': link.color }">
                <NuxtLink
                    :to="link.to"
                    class="mobile-cat-link"
                    :class="{ active: $route.path.startsWith(link.to) }"
                    @click="menuOpen = false"
                >
                    {{ link.label }}
                    <span class="opacity-60 text-base">→</span>
                </NuxtLink>
            </li>
            <li class="nav-blog">
                <NuxtLink
                    to="/blog"
                    class="mobile-blog-link"
                    :class="{ active: $route.path.startsWith('/blog') }"
                    @click="menuOpen = false"
                >
                    Blog
                    <span class="opacity-60 text-base">→</span>
                </NuxtLink>
            </li>
        </ul>

        <!-- Mobile menu overlay -->
        <Transition name="menu-overlay">
            <div v-if="menuOpen" class="menu-overlay-layer" @click="menuOpen = false" />
        </Transition>

        <!-- Mobile search FAB -->
        <button class="search-fab hidden tablet:flex" :class="{ 'search-fab--hidden': fabNearBottom || menuOpen }" @click="searchOpen = true" aria-label="Search calculators">
            <span style="font-size:22px;line-height:1">⌕</span>
        </button>

        <!-- Search modal -->
        <UiSearchModal v-model="searchOpen" />
    </header>
</template>

<script setup>
const menuOpen   = useState('mobileMenuOpen', () => false)
const searchOpen = ref(false)
const route = useRoute()

watch(() => route.path, () => { menuOpen.value = false })

let savedScrollY = 0
watch(menuOpen, (val) => {
    if (!process.client) return
    if (val) {
        savedScrollY = window.scrollY
        document.body.style.position = 'fixed'
        document.body.style.top      = `-${savedScrollY}px`
        document.body.style.width    = '100%'
    } else {
        document.body.style.position = ''
        document.body.style.top      = ''
        document.body.style.width    = ''
        window.scrollTo(0, savedScrollY)
    }
})

const catLinks = [
    { to: '/fitness', label: 'Fitness', color: '#ddd6ff' },
    { to: '/math',    label: 'Math',    color: '#f5e642' },
    { to: '/finance', label: 'Finance', color: '#d4edda' },
    { to: '/other',   label: 'Other',   color: '#ffd6d6' },
]

const fabNearBottom = ref(false)
let fabTicking = false
function onFabScroll() {
    if (fabTicking) return
    fabTicking = true
    requestAnimationFrame(() => {
        const distFromBottom = document.documentElement.scrollHeight - window.scrollY - window.innerHeight
        fabNearBottom.value = distFromBottom < 100
        fabTicking = false
    })
}

onMounted(() => {
    window.addEventListener('keydown', onKey)
    window.addEventListener('scroll', onFabScroll, { passive: true })
})
onUnmounted(() => {
    window.removeEventListener('keydown', onKey)
    window.removeEventListener('scroll', onFabScroll)
    document.body.style.position = ''
    document.body.style.top      = ''
    document.body.style.width    = ''
})

function onKey(e) {
    if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault()
        searchOpen.value = true
    }
}
</script>

<style scoped>
/* Category nav links */
.nav-cat-link {
    display: flex;
    align-items: center;
    gap: 9px;
    padding: 0 24px;
    font-family: 'Space Mono', monospace;
    font-size: 12px;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.08em;
    color: #fafafa;
    text-decoration: none;
    border-left: 1px solid #333;
    height: 100%;
    transition: background 0.1s, color 0.1s;
}
.nav-cat-link::before {
    content: '';
    width: 9px;
    height: 9px;
    background: var(--c);
    border: 1.5px solid rgba(255,255,255,0.18);
    flex-shrink: 0;
}
.nav-cat-link:hover,
.nav-cat-link.active { background: var(--c); color: #0a0a0a; }
.nav-cat-link:hover::before,
.nav-cat-link.active::before { border-color: #0a0a0a; }

/* Blog link */
.nav-blog-link {
    display: flex;
    align-items: center;
    padding: 0 24px;
    font-family: 'Space Mono', monospace;
    font-size: 12px;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.08em;
    color: #f5e642;
    text-decoration: none;
    border-left: 1px solid #333;
    height: 100%;
    transition: background 0.1s, color 0.1s;
}
.nav-blog-link:hover,
.nav-blog-link.active { background: #f5e642; color: #0a0a0a; }

/* Divider between categories and blog */
.nav-divider {
    width: 0;
    border-left: 1px solid #333;
    margin: 14px 0;
}

/* Mobile category links */
.mobile-cat-link {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 18px 20px;
    font-family: 'Space Mono', monospace;
    font-size: 13px;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.1em;
    color: #fafafa;
    text-decoration: none;
    border-bottom: 1px solid #222;
    transition: background 0.1s, color 0.1s;
}
.mobile-cat-link:hover,
.mobile-cat-link.active { background: var(--c); color: #0a0a0a; }

/* Mobile blog link */
.mobile-blog-link {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 18px 20px;
    font-family: 'Space Mono', monospace;
    font-size: 13px;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.1em;
    color: #f5e642;
    text-decoration: none;
    transition: background 0.1s, color 0.1s;
}
.mobile-blog-link:hover,
.mobile-blog-link.active { background: #f5e642; color: #0a0a0a; }

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
@media (max-width: 1199px) { .search-btn { display: none; } }

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
    transition: opacity 0.3s ease, visibility 0.3s ease;
    width: 52px;
    height: 52px;
    align-items: center;
    justify-content: center;
    background: #0a0a0a;
    border: 3px solid #f5e642;
    box-shadow: 4px 4px 0 #f5e642;
    color: #f5e642;
    cursor: pointer;
}
.search-fab:active { box-shadow: 2px 2px 0 #f5e642; transform: translate(2px, 2px); }
.search-fab--hidden { opacity: 0; visibility: hidden; }

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

/* Mobile menu overlay */
.menu-overlay-layer {
    position: fixed;
    inset: 0;
    background: rgba(10, 10, 10, 0.55);
    z-index: 35;
    cursor: pointer;
}

.menu-overlay-enter-active,
.menu-overlay-leave-active { transition: opacity 0.25s ease; }
.menu-overlay-enter-from,
.menu-overlay-leave-to { opacity: 0; }

/* Mobile menu — positioned below the sticky nav */
.mobile-menu {
    top: 64px; /* nav height */
    left: 0;
    right: 0;
}

.mobile-menu li:last-child a {
    border-bottom: none;
}

@media (prefers-reduced-motion: reduce) {
    .hamburger-btn span { transition: none; }
}
</style>
