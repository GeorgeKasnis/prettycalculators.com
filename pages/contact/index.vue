<template>
    <UiBreadcrumbBand :links="[{ label: 'Home', to: '/' }, { label: 'Contact' }]" />

    <!-- Header -->
    <div class="border-b-3 border-brut bg-brut px-8 py-8 mobile:px-4 mobile:py-6">
        <div class="font-mono text-[10px] font-bold uppercase tracking-[0.15em] text-lavender/50 mb-2">Contact</div>
        <h1 class="font-grotesk text-[52px] font-bold tracking-[-0.05em] leading-none text-cream mobile:text-[36px]">Get in Touch</h1>
    </div>

    <!-- Content -->
    <div class="terms-section">
        <div class="terms-card">

            <div class="terms-card-head">
                <div class="terms-eyebrow">Contact</div>
                <p class="terms-intro">Have a question, spotted a bug, or want to suggest a calculator? Send us a message.</p>
            </div>

            <!-- Success state -->
            <div v-if="submitted" class="success-box">
                <div class="success-icon">✓</div>
                <h2 class="success-title">Message sent!</h2>
                <p class="success-text">Thanks for reaching out. We'll get back to you within a few days.</p>
            </div>

            <!-- Form -->
            <form v-else @submit.prevent="handleSubmit" class="contact-form" name="contact" method="POST">
                <input type="hidden" name="form-name" value="contact" />

                <!-- Honeypot — hidden from real users, traps bots -->
                <div class="bot-field">
                    <label>Don't fill this out <input name="bot-field" v-model="form.botField" /></label>
                </div>

                <div class="form-field">
                    <label class="field-label" for="name">Your name</label>
                    <input
                        id="name"
                        name="name"
                        type="text"
                        v-model="form.name"
                        required
                        class="field-input"
                        placeholder="Jane Smith"
                    />
                </div>

                <div class="form-field">
                    <label class="field-label" for="email">Your email</label>
                    <input
                        id="email"
                        name="email"
                        type="email"
                        v-model="form.email"
                        required
                        class="field-input"
                        placeholder="jane@example.com"
                    />
                </div>

                <div class="form-field">
                    <label class="field-label" for="message">Message</label>
                    <textarea
                        id="message"
                        name="message"
                        v-model="form.message"
                        required
                        rows="5"
                        class="field-input field-textarea"
                        placeholder="Your message..."
                    ></textarea>
                </div>

                <div class="form-footer">
                    <p v-if="error" class="error-text">{{ error }}</p>
                    <button type="submit" :disabled="loading" class="submit-btn">
                        {{ loading ? 'Sending...' : 'Send message' }}
                    </button>
                </div>
            </form>

        </div>
    </div>
</template>

<script setup>
definePageMeta({ layout: 'brutalist' })

useHead({
    title: 'Contact — Pretty Calculators',
    meta: [
        { hid: 'title',          name: 'title',          content: 'Contact — Pretty Calculators' },
        { hid: 'description',    name: 'description',    content: 'Get in touch with Pretty Calculators. Report bugs, suggest new calculators, or ask us anything.' },
        { hid: 'og-title',       property: 'og:title',   content: 'Contact — Pretty Calculators' },
        { hid: 'og:description', property: 'og:description', content: 'Get in touch with Pretty Calculators. Report bugs, suggest new calculators, or ask us anything.' },
    ],
})

const form = reactive({ name: '', email: '', message: '', botField: '' })
const submitted = ref(false)
const loading = ref(false)
const error = ref('')

async function handleSubmit() {
    if (form.botField) return  // bot detected

    loading.value = true
    error.value = ''

    const body = new URLSearchParams({
        'form-name': 'contact',
        name: form.name,
        email: form.email,
        message: form.message,
    }).toString()

    try {
        const res = await fetch('/api/contact', {
            method: 'POST',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            body,
        })
        if (res.ok) {
            submitted.value = true
        } else {
            error.value = 'Something went wrong. Please try again.'
        }
    } catch {
        error.value = 'Something went wrong. Please try again.'
    } finally {
        loading.value = false
    }
}
</script>

<style scoped>
.terms-section {
    padding: 32px;
    background: #ddd6ff;
    border-bottom: 3px solid #0a0a0a;
}

.terms-card {
    background: #fff;
    border: 3px solid #0a0a0a;
    box-shadow: 5px 5px 0 #0a0a0a;
    max-width: 860px;
    margin: 0 auto;
}

.terms-card-head {
    background: #f5e642;
    border-bottom: 3px solid #0a0a0a;
    padding: 24px 32px 22px;
}

.terms-eyebrow {
    font-family: 'Space Mono', monospace;
    font-size: 10px;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.15em;
    opacity: 0.55;
    margin-bottom: 8px;
}

.terms-intro {
    font-size: 18px;
    font-weight: 700;
    letter-spacing: -0.03em;
    line-height: 1.3;
    max-width: 560px;
}

/* Form */
.contact-form {
    padding: 32px;
    display: flex;
    flex-direction: column;
    gap: 24px;
}

.bot-field {
    display: none;
}

.form-field {
    display: flex;
    flex-direction: column;
    gap: 8px;
}

.field-label {
    font-family: 'Space Mono', monospace;
    font-size: 11px;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.1em;
}

.field-input {
    border: 3px solid #0a0a0a;
    padding: 10px 14px;
    font-size: 15px;
    font-family: inherit;
    outline: none;
    width: 100%;
    background: #fff;
    transition: box-shadow 0.15s;
}

.field-input:focus {
    box-shadow: 4px 4px 0 #0a0a0a;
}

.field-textarea {
    resize: vertical;
    min-height: 120px;
}

.form-footer {
    display: flex;
    align-items: center;
    gap: 16px;
    flex-wrap: wrap;
}

.submit-btn {
    font-family: 'Space Mono', monospace;
    font-size: 12px;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.1em;
    background: #0a0a0a;
    color: #ddd6ff;
    border: 3px solid #0a0a0a;
    padding: 12px 24px;
    cursor: pointer;
    transition: opacity 0.15s;
}

.submit-btn:hover:not(:disabled) {
    opacity: 0.8;
}

.submit-btn:disabled {
    opacity: 0.5;
    cursor: not-allowed;
}

.error-text {
    font-size: 14px;
    color: #c00;
    font-weight: 600;
}

/* Success */
.success-box {
    padding: 48px 32px;
    text-align: center;
}

.success-icon {
    font-size: 40px;
    font-weight: 700;
    margin-bottom: 16px;
}

.success-title {
    font-size: 24px;
    font-weight: 700;
    letter-spacing: -0.03em;
    margin-bottom: 8px;
}

.success-text {
    font-size: 15px;
    opacity: 0.6;
}

@media (max-width: 767px) {
    .terms-section {
        padding: 16px;
    }
    .terms-card-head {
        padding: 18px 20px;
    }
    .terms-intro {
        font-size: 16px;
    }
    .contact-form {
        padding: 20px;
    }
}
</style>
