<template>
    <div class="faq-section">
        <div class="faq-card">
            <div class="faq-card-head">
                <div class="faq-eyebrow">FAQ</div>
                <h2 class="faq-headline">Frequently Asked Questions</h2>
            </div>
            <div class="faq-list">
                <details v-for="(item, i) in faqs" :key="i" class="faq-item">
                    <summary class="faq-question">
                        <h3 class="faq-q-text">{{ item.q }}</h3>
                        <span class="faq-icon" aria-hidden="true">+</span>
                    </summary>
                    <div class="faq-answer">
                        <p>{{ item.a }}</p>
                    </div>
                </details>
            </div>
        </div>
    </div>
</template>

<script setup>
defineProps({
    faqs: { type: Array, required: true },
})
</script>

<style scoped>
.faq-section {
    padding: 28px 32px;
    border-bottom: 3px solid #0a0a0a;
    background: #f5e642;
}

.faq-card {
    background: #fff;
    border: 3px solid #0a0a0a;
    box-shadow: 5px 5px 0 #0a0a0a;
}

.faq-card-head {
    background: #0a0a0a;
    padding: 22px 28px 20px;
    border-bottom: 3px solid #0a0a0a;
}

.faq-eyebrow {
    font-family: 'Space Mono', monospace;
    font-size: 10px;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.15em;
    color: #ddd6ff;
    margin-bottom: 6px;
}

.faq-headline {
    font-size: 26px;
    font-weight: 700;
    letter-spacing: -0.04em;
    line-height: 1.1;
    color: #f5e642;
    margin: 0;
}

.faq-list {
    display: flex;
    flex-direction: column;
}

.faq-item {
    border-bottom: 2px solid rgba(10, 10, 10, 0.12);
}

.faq-item:last-child {
    border-bottom: none;
}

.faq-question {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 16px;
    padding: 18px 28px;
    cursor: pointer;
    list-style: none;
    user-select: none;
    transition: background 0.08s;
}

.faq-question::-webkit-details-marker {
    display: none;
}

.faq-item:hover > .faq-question {
    background: rgba(221, 214, 255, 0.35);
}

.faq-item[open] > .faq-question {
    background: #ddd6ff;
    border-bottom: 2px solid rgba(10, 10, 10, 0.12);
}

.faq-q-text {
    font-size: 15px;
    font-weight: 700;
    letter-spacing: -0.01em;
    color: #0a0a0a;
    margin: 0;
    line-height: 1.4;
}

.faq-icon {
    font-family: 'Space Mono', monospace;
    font-size: 20px;
    font-weight: 700;
    color: #0a0a0a;
    flex-shrink: 0;
    transition: transform 0.15s;
    line-height: 1;
}

.faq-item[open] .faq-icon {
    transform: rotate(45deg);
}

.faq-answer {
    padding: 16px 28px 20px;
    background: #fff;
}

.faq-answer p {
    font-size: 15px;
    line-height: 1.65;
    color: #0a0a0a;
    opacity: 0.7;
    margin: 0;
    max-width: 660px;
}

@media (max-width: 900px) {
    .faq-section {
        padding: 20px;
    }

    .faq-question {
        padding: 16px 20px;
    }

    .faq-answer {
        padding: 14px 20px 18px;
    }
}
</style>
