<template>
    <Transition name="ut-fade">
        <div v-if="ready" class="unit-toggle" :class="{ 'unit-toggle--hidden': nearBottom }" role="group" aria-label="Unit system">
            <button
                v-for="tab in UNIT_TABS"
                :key="tab.value"
                class="unit-btn"
                :class="{ 'unit-btn--active': unit === tab.value }"
                @click="unit = tab.value"
            >{{ tab.label }}</button>
        </div>
    </Transition>
</template>

<script setup>
const { unit, UNIT_TABS } = useUnit()
const ready = ref(false)
const nearBottom = ref(false)

let ticking = false
function onScroll() {
    if (ticking) return
    ticking = true
    requestAnimationFrame(() => {
        const distFromBottom = document.documentElement.scrollHeight - window.scrollY - window.innerHeight
        nearBottom.value = distFromBottom < 100
        ticking = false
    })
}

onMounted(() => {
    ready.value = true
    window.addEventListener('scroll', onScroll, { passive: true })
})
onUnmounted(() => window.removeEventListener('scroll', onScroll))
</script>

<style scoped>
.unit-toggle {
    position: fixed;
    bottom: 24px;
    left: 20px;
    z-index: 90;
    display: flex;
    border: 3px solid #0a0a0a;
    box-shadow: 4px 4px 0 #0a0a0a;
    background: #fff;
    transition: opacity 0.3s ease, visibility 0.3s ease;
}

.unit-toggle--hidden {
    opacity: 0;
    visibility: hidden;
}

.unit-btn {
    padding: 0 14px;
    height: 36px;
    background: #fff;
    border: none;
    border-right: 2px solid #0a0a0a;
    cursor: pointer;
    font-family: 'Space Mono', monospace;
    font-size: 10px;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.1em;
    color: rgba(10, 10, 10, 0.35);
    transition: background 0.1s, color 0.1s;
    white-space: nowrap;
}
.unit-btn:last-child { border-right: none; }
.unit-btn:hover:not(.unit-btn--active) { background: #f5f5f5; color: #0a0a0a; }
.unit-btn--active { background: #0a0a0a; color: #ddd6ff; }

.ut-fade-enter-active,
.ut-fade-leave-active { transition: opacity 0.3s ease; }
.ut-fade-enter-from,
.ut-fade-leave-to    { opacity: 0; }
</style>
