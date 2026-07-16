<template>
    <Teleport to="body">
        <Transition name="bmk">
            <div v-if="visible" class="bmk-toast" role="dialog" aria-label="Bookmark this site">
                <div class="bmk-topbar">
                    <span class="bmk-topbar-label">★ Handy site?</span>
                    <button class="bmk-close" aria-label="Don't show again" @click="dismiss">✕</button>
                </div>
                <div class="bmk-body">
                    <p class="bmk-title">Keep us one click away.</p>
                    <p v-if="!isMobile" class="bmk-text">
                        Press <kbd>{{ modKey }}</kbd><span class="bmk-plus">+</span><kbd>D</kbd> to bookmark Pretty Calculators.
                    </p>
                    <p v-else class="bmk-text">
                        Tap your browser menu and choose <strong>☆ Add to bookmarks</strong>.
                    </p>
                </div>
                <div class="bmk-footer">
                    <button class="bmk-cta" @click="dismiss">Got it ★</button>
                    <span class="bmk-hint">Shown once — promise.</span>
                </div>
            </div>
        </Transition>
    </Teleport>
</template>

<script setup>
const DONE_KEY = 'pc_bookmark_prompt_done'
const SESSION_KEY = 'pc_bookmark_prompt_shown'
const SHOW_AFTER_MS = 10000
const AUTO_HIDE_MS = 25000

const route = useRoute()
const visible = ref(false)
const isMobile = ref(false)
const modKey = ref('Ctrl')

let showTimer, hideTimer

onMounted(() => {
    if (localStorage.getItem(DONE_KEY)) return
    if (sessionStorage.getItem(SESSION_KEY)) return

    isMobile.value = window.matchMedia('(pointer: coarse)').matches
    modKey.value = /Mac|iPhone|iPad|iPod/.test(navigator.platform || navigator.userAgent) ? '⌘' : 'Ctrl'

    showTimer = setTimeout(() => {
        // never stack on top of the cookie banner or the welcome modal
        if (!localStorage.getItem('prettycalculators_cookie_consent')) return
        if (route.path === '/' && !localStorage.getItem('pc_welcome_v2_seen')) return

        visible.value = true
        sessionStorage.setItem(SESSION_KEY, '1')
        // ignored? slide away quietly and try again another session
        hideTimer = setTimeout(() => { visible.value = false }, AUTO_HIDE_MS)
    }, SHOW_AFTER_MS)
})

onUnmounted(() => {
    clearTimeout(showTimer)
    clearTimeout(hideTimer)
})

function dismiss() {
    visible.value = false
    localStorage.setItem(DONE_KEY, '1')
}
</script>

<style scoped>
.bmk-toast {
    position: fixed;
    left: 20px;
    bottom: 20px;
    z-index: 9998;
    width: 300px;
    max-width: calc(100vw - 40px);
    background: #fafafa;
    border: 3px solid #0a0a0a;
    box-shadow: 6px 6px 0 #0a0a0a;
    color: #0a0a0a;
}

.bmk-topbar {
    background: #ddd6ff;
    border-bottom: 3px solid #0a0a0a;
    padding: 8px 14px;
    display: flex;
    align-items: center;
    justify-content: space-between;
}

.bmk-topbar-label {
    font-family: 'Space Mono', monospace;
    font-size: 10px;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.14em;
}

.bmk-close {
    background: none;
    border: none;
    font-size: 12px;
    font-weight: 700;
    cursor: pointer;
    color: #0a0a0a;
    opacity: 0.45;
    line-height: 1;
    padding: 0;
    transition: opacity 0.08s;
}

.bmk-close:hover { opacity: 1; }

.bmk-body { padding: 16px 16px 4px; }

.bmk-title {
    font-size: 17px;
    font-weight: 700;
    letter-spacing: -0.02em;
    margin-bottom: 6px;
}

.bmk-text {
    font-size: 13px;
    line-height: 1.55;
    opacity: 0.7;
}

.bmk-text kbd {
    display: inline-block;
    font-family: 'Space Mono', monospace;
    font-size: 11px;
    font-weight: 700;
    background: #f5e642;
    border: 2px solid #0a0a0a;
    box-shadow: 2px 2px 0 #0a0a0a;
    padding: 1px 7px;
    margin: 0 2px;
}

.bmk-plus {
    font-family: 'Space Mono', monospace;
    font-weight: 700;
    margin: 0 1px;
}

.bmk-footer {
    padding: 12px 16px 16px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 10px;
}

.bmk-cta {
    background: #0a0a0a;
    color: #fafafa;
    font-family: 'Space Grotesk', sans-serif;
    font-size: 13px;
    font-weight: 700;
    letter-spacing: -0.01em;
    padding: 8px 14px;
    border: 3px solid #0a0a0a;
    box-shadow: 3px 3px 0 #5c3bef;
    cursor: pointer;
    transition: transform 0.08s, box-shadow 0.08s;
}

.bmk-cta:hover {
    transform: translate(-2px, -2px);
    box-shadow: 5px 5px 0 #5c3bef;
}

.bmk-hint {
    font-family: 'Space Mono', monospace;
    font-size: 9px;
    opacity: 0.3;
    letter-spacing: 0.04em;
}

/* ── Transition ── */
.bmk-enter-active,
.bmk-leave-active {
    transition: opacity 0.25s, transform 0.25s;
}

.bmk-enter-from,
.bmk-leave-to {
    opacity: 0;
    transform: translateY(16px);
}

@media (max-width: 560px) {
    .bmk-toast {
        left: 12px;
        right: 12px;
        bottom: 12px;
        width: auto;
        max-width: none;
    }
}
</style>
