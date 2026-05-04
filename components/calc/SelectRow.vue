<template>
    <div class="ci-row cs-row" ref="rootEl">
        <button type="button" class="cs-trigger" @click="open = !open" :class="{ 'cs-open': open }">
            <div class="cs-inner">
                <span class="cs-label">{{ label }}</span>
                <span class="cs-value" :class="{ 'cs-placeholder': !modelValue }">
                    {{ selectedLabel }}
                </span>
            </div>
            <span class="cs-arrow" :class="{ 'cs-arrow--up': open }">&#9660;</span>
        </button>

        <Transition name="cs-drop">
            <div v-if="open" class="cs-dropdown">
                <button
                    v-for="opt in options"
                    :key="opt.value"
                    type="button"
                    class="cs-option"
                    :class="{ 'cs-option--active': modelValue === opt.value }"
                    @click="select(opt.value)"
                >
                    <span>{{ opt.label }}</span>
                    <span v-if="modelValue === opt.value" class="cs-check">✓</span>
                </button>
            </div>
        </Transition>
    </div>
</template>

<script setup>
const props = defineProps({
    label:      String,
    modelValue: String,
    options:    { type: Array, required: true },
})
const emit = defineEmits(['update:modelValue'])

const open   = ref(false)
const rootEl = ref(null)

const selectedLabel = computed(() => {
    if (!props.modelValue) return props.label ? 'Select…' : 'Select…'
    return props.options.find(o => o.value === props.modelValue)?.label ?? 'Select…'
})

function select(value) {
    emit('update:modelValue', value)
    open.value = false
}

function onClickOutside(e) {
    if (rootEl.value && !rootEl.value.contains(e.target)) {
        open.value = false
    }
}

onMounted(() => document.addEventListener('click', onClickOutside, true))
onUnmounted(() => document.removeEventListener('click', onClickOutside, true))
</script>

<style scoped>
.cs-row {
    position: relative;
    background: #fff;
}

.cs-trigger {
    display: flex;
    align-items: center;
    width: 100%;
    padding: 14px 20px 16px;
    background: none;
    border: none;
    cursor: pointer;
    text-align: left;
    gap: 12px;
}
.cs-trigger:focus-visible { outline: 3px solid #5c3bef; outline-offset: -3px; }

.cs-inner {
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: 4px;
    min-width: 0;
}

.cs-label {
    font-family: 'Space Mono', monospace;
    font-size: 10px;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.14em;
    opacity: 0.4;
    line-height: 1;
}

.cs-value {
    font-family: 'Space Grotesk', sans-serif;
    font-size: 16px;
    font-weight: 700;
    letter-spacing: -0.02em;
    color: #0a0a0a;
    line-height: 1.2;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}
.cs-placeholder { color: rgba(10,10,10,0.18); font-weight: 500; }
.cs-open .cs-value:not(.cs-placeholder) { color: #5c3bef; }

.cs-arrow {
    font-size: 10px;
    color: rgba(10,10,10,0.35);
    flex-shrink: 0;
    transition: transform 0.15s;
    display: inline-block;
}
.cs-arrow--up { transform: rotate(180deg); }

/* Dropdown */
.cs-dropdown {
    position: absolute;
    top: calc(100% + 3px);
    left: -3px;
    right: -3px;
    background: #0a0a0a;
    border: 3px solid #0a0a0a;
    z-index: 100;
    box-shadow: 6px 6px 0 rgba(10,10,10,0.15);
}

.cs-option {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    padding: 11px 16px;
    background: none;
    border: none;
    border-bottom: 1px solid rgba(255,255,255,0.07);
    cursor: pointer;
    font-family: 'Space Grotesk', sans-serif;
    font-size: 13px;
    font-weight: 500;
    color: rgba(255,255,255,0.6);
    text-align: left;
    transition: background 0.08s, color 0.08s;
}
.cs-option:last-child { border-bottom: none; }
.cs-option:hover { background: rgba(255,255,255,0.07); color: #fff; }
.cs-option--active {
    color: #f5e642;
    font-weight: 700;
}
.cs-option--active:hover { background: rgba(245,230,66,0.08); }

.cs-check {
    font-size: 12px;
    color: #f5e642;
    flex-shrink: 0;
}

/* Transition */
.cs-drop-enter-active,
.cs-drop-leave-active {
    transition: opacity 0.12s, transform 0.12s;
}
.cs-drop-enter-from,
.cs-drop-leave-to {
    opacity: 0;
    transform: translateY(-6px);
}

@media (max-width: 767px) {
    .cs-trigger { padding: 12px 16px 14px; }
    .cs-value { font-size: 14px; }
}
</style>
