<template>
    <Transition name="cookie-banner">
        <section v-if="ready && status === 'pending'" class="cookie-banner" aria-label="Cookie consent">
            <div class="cookie-banner__copy">
                <div class="cookie-banner__eyebrow">Privacy</div>
                <p>We use analytics cookies to understand which calculators people use and improve the site.</p>
            </div>
            <div class="cookie-banner__actions">
                <button type="button" class="cookie-banner__button cookie-banner__button--ghost" @click="rejectCookies">Reject</button>
                <button type="button" class="cookie-banner__button" @click="acceptCookies">Accept</button>
            </div>
        </section>
    </Transition>
</template>

<script setup>
const { status, ready, initConsent, acceptCookies, rejectCookies } = useCookieConsent();

onMounted(() => {
    initConsent();
});
</script>

<style scoped>
.cookie-banner {
    position: fixed;
    right: 18px;
    bottom: 18px;
    z-index: 80;
    display: flex;
    align-items: center;
    gap: 18px;
    width: min(560px, calc(100vw - 32px));
    padding: 16px;
    background: #e3d2fa;
    color: #0a0a0a;
    border: 3px solid #0a0a0a;
    box-shadow: 8px 8px 0 #0a0a0a;
}

.cookie-banner__copy {
    min-width: 0;
}

.cookie-banner__eyebrow {
    margin-bottom: 6px;
    font-family: "Space Mono", monospace;
    font-size: 10px;
    font-weight: 700;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    opacity: 0.55;
}

.cookie-banner p {
    margin: 0;
    font-size: 14px;
    line-height: 1.45;
}

.cookie-banner__actions {
    display: flex;
    gap: 8px;
    flex-shrink: 0;
}

.cookie-banner__button {
    min-width: 86px;
    padding: 10px 14px;
    border: 2px solid #0a0a0a;
    background: #0a0a0a;
    color: #e3d2fa;
    font-family: "Space Mono", monospace;
    font-size: 11px;
    font-weight: 700;
    text-transform: uppercase;
    cursor: pointer;
}

.cookie-banner__button--ghost {
    background: transparent;
    color: #0a0a0a;
}

.cookie-banner-enter-active,
.cookie-banner-leave-active {
    transition: opacity 0.2s ease, transform 0.2s ease;
}

.cookie-banner-enter-from,
.cookie-banner-leave-to {
    opacity: 0;
    transform: translateY(10px);
}

@media (max-width: 640px) {
    .cookie-banner {
        right: 12px;
        bottom: 12px;
        flex-direction: column;
        align-items: stretch;
        width: calc(100vw - 24px);
    }

    .cookie-banner__actions {
        display: grid;
        grid-template-columns: 1fr 1fr;
    }

    .cookie-banner__button {
        min-width: 0;
    }
}
</style>
