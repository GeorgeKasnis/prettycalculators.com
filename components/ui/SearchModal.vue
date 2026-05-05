<template>
    <Teleport to="body">
        <Transition name="sm-fade">
            <div v-if="modelValue" class="sm-overlay" @click.self="close">
                <div class="sm-modal" role="dialog" aria-modal="true" aria-label="Search calculators">

                    <!-- Input row -->
                    <div class="sm-input-row">
                        <span class="sm-icon">⌕</span>
                        <input
                            ref="inputEl"
                            v-model="query"
                            class="sm-input"
                            placeholder="Search calculators…"
                            autocomplete="off"
                            spellcheck="false"
                            @keydown.escape="close"
                            @keydown.arrow-down.prevent="moveActive(1)"
                            @keydown.arrow-up.prevent="moveActive(-1)"
                            @keydown.enter.prevent="go"
                        />
                        <button class="sm-esc" @click="close">ESC</button>
                    </div>

                    <!-- Results -->
                    <div class="sm-body">
                        <!-- Empty query: show hint -->
                        <div v-if="!query.trim()" class="sm-hint">
                            <span class="sm-hint-count">{{ allCalcs.length }} calculators</span> across 4 categories
                        </div>

                        <!-- No match -->
                        <div v-else-if="results.length === 0" class="sm-empty">
                            No results for <strong>"{{ query }}"</strong>
                        </div>

                        <!-- Results list -->
                        <template v-else>
                            <NuxtLink
                                v-for="(item, i) in results"
                                :key="item.to"
                                :to="item.to"
                                class="sm-result"
                                :class="{ 'sm-result--active': activeIndex === i }"
                                @click="close"
                                @mouseenter="activeIndex = i"
                            >
                                <span class="sm-result-name">{{ item.label }}</span>
                                <span class="sm-result-cat" :style="{ background: item.color }">{{ item.category }}</span>
                            </NuxtLink>
                        </template>
                    </div>

                    <!-- Footer -->
                    <div class="sm-footer">
                        <span><kbd>↑</kbd><kbd>↓</kbd> navigate</span>
                        <span><kbd>↵</kbd> open</span>
                        <span><kbd>ESC</kbd> close</span>
                    </div>
                </div>
            </div>
        </Transition>
    </Teleport>
</template>

<script setup>
const props = defineProps({ modelValue: Boolean })
const emit  = defineEmits(['update:modelValue'])

const query       = ref('')
const activeIndex = ref(0)
const inputEl     = ref(null)
const router      = useRouter()

const allCalcs = useAllCalculators()

const results = computed(() => {
    const q = query.value.trim().toLowerCase()
    if (!q) return []
    return allCalcs
        .filter(c => c.label.toLowerCase().includes(q) || c.category.toLowerCase().includes(q))
        .slice(0, 12)
})

watch(() => props.modelValue, val => {
    if (val) {
        query.value   = ''
        activeIndex.value = 0
        nextTick(() => inputEl.value?.focus())
        document.body.style.overflow = 'hidden'
    } else {
        document.body.style.overflow = ''
    }
})

watch(results, () => { activeIndex.value = 0 })

function moveActive(dir) {
    if (!results.value.length) return
    activeIndex.value = (activeIndex.value + dir + results.value.length) % results.value.length
}

function go() {
    const target = results.value[activeIndex.value]
    if (target) {
        router.push(target.to)
        close()
    }
}

function close() {
    emit('update:modelValue', false)
}
</script>

<style scoped>
.sm-overlay {
    position: fixed;
    inset: 0;
    background: rgba(10, 10, 10, 0.65);
    z-index: 200;
    display: flex;
    align-items: flex-start;
    justify-content: center;
    padding-top: 80px;
    padding-inline: 16px;
}

.sm-modal {
    width: 100%;
    max-width: 580px;
    background: #fff;
    border: 3px solid #0a0a0a;
    box-shadow: 8px 8px 0 #0a0a0a;
    display: flex;
    flex-direction: column;
    max-height: calc(100vh - 120px);
}

/* Input row */
.sm-input-row {
    display: flex;
    align-items: center;
    gap: 0;
    border-bottom: 3px solid #0a0a0a;
    flex-shrink: 0;
}

.sm-icon {
    padding: 0 14px;
    font-size: 22px;
    color: rgba(10, 10, 10, 0.3);
    line-height: 1;
    flex-shrink: 0;
}

.sm-input {
    flex: 1;
    font-family: 'Space Grotesk', sans-serif;
    font-size: 18px;
    font-weight: 600;
    color: #0a0a0a;
    background: transparent;
    border: none;
    outline: none;
    padding: 16px 0;
    letter-spacing: -0.02em;
    min-width: 0;
}
.sm-input::placeholder { color: rgba(10, 10, 10, 0.25); font-weight: 400; }

.sm-esc {
    flex-shrink: 0;
    margin: 10px 12px;
    padding: 4px 10px;
    background: none;
    border: 2px solid rgba(10, 10, 10, 0.2);
    font-family: 'Space Mono', monospace;
    font-size: 10px;
    font-weight: 700;
    letter-spacing: 0.08em;
    color: rgba(10, 10, 10, 0.4);
    cursor: pointer;
    transition: border-color 0.08s, color 0.08s;
}
.sm-esc:hover { border-color: #0a0a0a; color: #0a0a0a; }

/* Body */
.sm-body {
    overflow-y: auto;
    flex: 1;
    min-height: 56px;
}

.sm-hint {
    padding: 20px;
    font-family: 'Space Mono', monospace;
    font-size: 11px;
    color: rgba(10, 10, 10, 0.4);
    text-align: center;
}
.sm-hint-count {
    font-weight: 700;
    color: #0a0a0a;
}

.sm-empty {
    padding: 20px;
    font-size: 14px;
    color: rgba(10, 10, 10, 0.5);
    text-align: center;
}

/* Result rows */
.sm-result {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 13px 20px;
    border-bottom: 1.5px solid rgba(10, 10, 10, 0.07);
    text-decoration: none;
    color: #0a0a0a;
    transition: background 0.06s;
    gap: 12px;
}
.sm-result:last-child { border-bottom: none; }
.sm-result--active { background: #ddd6ff; }

.sm-result-name {
    font-size: 15px;
    font-weight: 600;
    letter-spacing: -0.01em;
    min-width: 0;
}

.sm-result-cat {
    font-family: 'Space Mono', monospace;
    font-size: 9px;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.1em;
    padding: 3px 8px;
    border: 1.5px solid rgba(10, 10, 10, 0.15);
    white-space: nowrap;
    flex-shrink: 0;
    color: #0a0a0a;
}

/* Footer */
.sm-footer {
    border-top: 3px solid #0a0a0a;
    background: #0a0a0a;
    padding: 8px 20px;
    display: flex;
    gap: 20px;
    flex-shrink: 0;
}

.sm-footer span {
    font-family: 'Space Mono', monospace;
    font-size: 10px;
    color: rgba(255, 255, 255, 0.35);
    display: flex;
    align-items: center;
    gap: 5px;
}

.sm-footer kbd {
    background: rgba(255, 255, 255, 0.1);
    border: 1px solid rgba(255, 255, 255, 0.2);
    padding: 1px 5px;
    font-family: 'Space Mono', monospace;
    font-size: 9px;
    color: rgba(255, 255, 255, 0.6);
}

/* Transition */
.sm-fade-enter-active,
.sm-fade-leave-active { transition: opacity 0.15s; }
.sm-fade-enter-active .sm-modal,
.sm-fade-leave-active .sm-modal { transition: transform 0.15s, opacity 0.15s; }
.sm-fade-enter-from,
.sm-fade-leave-to { opacity: 0; }
.sm-fade-enter-from .sm-modal,
.sm-fade-leave-to .sm-modal { transform: translateY(-12px); opacity: 0; }

@media (max-width: 767px) {
    .sm-overlay { padding-top: 0; padding-inline: 0; align-items: flex-start; }
    .sm-modal   { max-width: 100%; border-left: none; border-right: none; border-top: none; box-shadow: none; }
}
</style>
