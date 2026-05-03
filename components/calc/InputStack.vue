<template>
    <div class="ci-stack">
        <slot />
    </div>
</template>

<style scoped>
.ci-stack {
    border: 3px solid #0a0a0a;
    margin-bottom: 18px;
}

.ci-stack :deep(.ci-row) {
    border-bottom: 3px solid #0a0a0a;
}

.ci-stack :deep(.ci-row:last-child) {
    border-bottom: none;
}
</style>
