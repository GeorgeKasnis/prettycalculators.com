<template>
    <Teleport to="body">
        <Transition name="welcome">
            <div v-if="visible" class="welcome-overlay" @click.self="dismiss">
                <div class="welcome-modal">

                    <!-- Top bar -->
                    <div class="welcome-topbar">
                        <span class="font-mono text-[10px] font-bold uppercase tracking-[0.15em] opacity-50">What's new</span>
                        <button class="welcome-close" @click="dismiss" aria-label="Close">✕</button>
                    </div>

                    <!-- Body -->
                    <div class="welcome-body">
                        <div class="welcome-badge">V2</div>
                        <h2 class="welcome-headline">
                            Pretty Calculators<br>just got<br><em class="not-italic text-[#5c3bef]">prettier.</em>
                        </h2>
                        <p class="welcome-text">
                            We've completely redesigned the experience — same great calculators, now with a fresh new look built for speed and clarity.
                        </p>
                    </div>

                    <!-- Footer -->
                    <div class="welcome-footer">
                        <button class="welcome-cta" @click="dismiss">Explore the new look →</button>
                        <span class="font-mono text-[9px] opacity-30 tracking-wide">prettycalculators.com</span>
                    </div>

                </div>
            </div>
        </Transition>
    </Teleport>
</template>

<script setup>
const STORAGE_KEY = 'pc_welcome_v2_seen'

const visible = ref(false)

onMounted(() => {
    if (!localStorage.getItem(STORAGE_KEY)) {
        setTimeout(() => { visible.value = true }, 400)
    }
})

function dismiss() {
    visible.value = false
    localStorage.setItem(STORAGE_KEY, '1')
}
</script>

<style scoped>
.welcome-overlay {
    position: fixed;
    inset: 0;
    background: rgba(10, 10, 10, 0.65);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 9999;
    padding: 20px;
}

.welcome-modal {
    background: #fafafa;
    border: 3px solid #0a0a0a;
    box-shadow: 8px 8px 0 #0a0a0a;
    width: 100%;
    max-width: 460px;
    display: flex;
    flex-direction: column;
}

.welcome-topbar {
    background: #f5e642;
    border-bottom: 3px solid #0a0a0a;
    padding: 10px 20px;
    display: flex;
    align-items: center;
    justify-content: space-between;
}

.welcome-close {
    background: none;
    border: none;
    font-size: 13px;
    font-weight: 700;
    cursor: pointer;
    color: #0a0a0a;
    opacity: 0.45;
    line-height: 1;
    padding: 0;
    transition: opacity 0.08s;
}
.welcome-close:hover {
    opacity: 1;
}

.welcome-body {
    padding: 32px 28px 24px;
}

.welcome-badge {
    display: inline-block;
    background: #0a0a0a;
    color: #f5e642;
    font-family: 'Space Mono', monospace;
    font-size: 10px;
    font-weight: 700;
    letter-spacing: 0.15em;
    padding: 4px 10px;
    margin-bottom: 18px;
}

.welcome-headline {
    font-size: 40px;
    font-weight: 700;
    letter-spacing: -0.04em;
    line-height: 1.08;
    margin-bottom: 16px;
}

.welcome-text {
    font-size: 15px;
    line-height: 1.65;
    opacity: 0.6;
    max-width: 360px;
}

.welcome-footer {
    border-top: 3px solid #0a0a0a;
    padding: 16px 28px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 12px;
    background: #f5f5f0;
}

.welcome-cta {
    background: #0a0a0a;
    color: #fafafa;
    font-family: 'Space Grotesk', sans-serif;
    font-size: 14px;
    font-weight: 700;
    letter-spacing: -0.01em;
    padding: 11px 20px;
    border: 3px solid #0a0a0a;
    box-shadow: 4px 4px 0 #0a0a0a;
    cursor: pointer;
    transition: transform 0.08s, box-shadow 0.08s;
}
.welcome-cta:hover {
    transform: translate(-2px, -2px);
    box-shadow: 6px 6px 0 #0a0a0a;
}

/* ── Transition ── */
.welcome-enter-active,
.welcome-leave-active {
    transition: opacity 0.2s, transform 0.2s;
}
.welcome-enter-from,
.welcome-leave-to {
    opacity: 0;
    transform: scale(0.96);
}

@media (max-width: 480px) {
    .welcome-headline { font-size: 30px; }
    .welcome-body { padding: 24px 20px 18px; }
    .welcome-footer { flex-direction: column; align-items: flex-start; gap: 8px; }
}
</style>
