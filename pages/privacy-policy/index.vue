<template>
    <UiBreadcrumbBand :links="[{ label: 'Home', to: '/' }, { label: 'Privacy Policy' }]" />

    <!-- Header -->
    <div class="border-b-3 border-brut bg-brut px-8 py-8 mobile:px-4 mobile:py-6">
        <div class="font-mono text-[10px] font-bold uppercase tracking-[0.15em] text-lavender/50 mb-2">Legal</div>
        <h1 class="font-grotesk text-[52px] font-bold tracking-[-0.05em] leading-none text-cream mobile:text-[36px]">Privacy Policy</h1>
    </div>

    <!-- Content -->
    <div class="terms-section">
        <div class="terms-card">

            <!-- Card header -->
            <div class="terms-card-head">
                <div class="terms-eyebrow">Privacy Policy</div>
                <p class="terms-intro">This policy explains what data we collect when you use Pretty Calculators and how we use it.</p>
            </div>

            <!-- Terms list -->
            <div class="terms-body">

                <div class="term-row">
                    <div class="term-num">01</div>
                    <div class="term-content">
                        <h2 class="term-title">Information We Collect</h2>
                        <p class="term-text">We do not collect any personally identifiable information directly. However, we use Google Analytics to collect anonymous usage data such as pages visited, time spent on site, browser type, device type, and general geographic location (country/city level). This data cannot be used to identify you personally.</p>
                    </div>
                </div>

                <div class="term-row">
                    <div class="term-num">02</div>
                    <div class="term-content">
                        <h2 class="term-title">Google Analytics</h2>
                        <p class="term-text">We use Google Analytics to understand how visitors use our site. Google Analytics uses cookies to collect information about your visit. This information is transmitted to and stored by Google on servers in the United States. Google may use this data to evaluate your use of the website and compile reports on website activity. You can opt out of Google Analytics by installing the <a href="https://tools.google.com/dlpage/gaoptout" target="_blank" rel="noopener noreferrer" class="term-link">Google Analytics opt-out browser add-on</a>.</p>
                    </div>
                </div>

                <div class="term-row">
                    <div class="term-num">03</div>
                    <div class="term-content">
                        <h2 class="term-title">Cookies</h2>
                        <p class="term-text">We use cookies solely through Google Analytics to distinguish users and analyse site traffic. These cookies do not store any personally identifiable information. You can control cookies through your browser settings and delete them at any time.</p>
                    </div>
                </div>

                <div class="term-row">
                    <div class="term-num">04</div>
                    <div class="term-content">
                        <h2 class="term-title">Calculator Data</h2>
                        <p class="term-text">Any values you enter into our calculators are processed entirely in your browser. We do not transmit, store, or log any calculator inputs or results on our servers.</p>
                    </div>
                </div>

                <div class="term-row">
                    <div class="term-num">05</div>
                    <div class="term-content">
                        <h2 class="term-title">Third-Party Links</h2>
                        <p class="term-text">Our website may contain links to third-party websites. We are not responsible for the privacy practices of those sites and encourage you to review their privacy policies.</p>
                    </div>
                </div>

                <div class="term-row">
                    <div class="term-num">06</div>
                    <div class="term-content">
                        <h2 class="term-title">Your Rights (GDPR / CCPA)</h2>
                        <p class="term-text">If you are located in the European Economic Area or California, you have the right to access, correct, or request deletion of any personal data we hold about you. Because we do not collect personally identifiable information directly, the primary data controller for analytics data is Google. You may exercise your rights regarding that data via Google's privacy controls at <a href="https://myaccount.google.com/data-and-privacy" target="_blank" rel="noopener noreferrer" class="term-link">myaccount.google.com</a>.</p>
                    </div>
                </div>

                <div class="term-row">
                    <div class="term-num">07</div>
                    <div class="term-content">
                        <h2 class="term-title">Changes to This Policy</h2>
                        <p class="term-text">We may update this privacy policy from time to time. Any changes will be posted on this page. Your continued use of Pretty Calculators after any update constitutes your acceptance of the revised policy.</p>
                    </div>
                </div>


            </div>
        </div>
    </div>
</template>

<script setup>
definePageMeta({ layout: 'brutalist' })

useHead({
    title: 'Pretty Calculators - Privacy Policy',
    meta: [
        { hid: 'title',          name: 'title',          content: 'Pretty Calculators - Privacy Policy' },
        { hid: 'description',    name: 'description',    content: 'Pretty Calculators - Privacy Policy' },
        { hid: 'og-title',       property: 'og:title',   content: 'Pretty Calculators - Privacy Policy' },
        { hid: 'og:description', property: 'og:description', content: 'Pretty Calculators - Privacy Policy' },
    ],
})
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

.terms-body {
    display: flex;
    flex-direction: column;
}

.term-row {
    display: grid;
    grid-template-columns: 72px 1fr;
    border-bottom: 3px solid #0a0a0a;
}

.term-row:last-child {
    border-bottom: none;
}

.term-num {
    font-family: 'Space Mono', monospace;
    font-size: 11px;
    font-weight: 700;
    letter-spacing: 0.08em;
    opacity: 0.3;
    padding: 22px 0 22px 32px;
    border-right: 3px solid #0a0a0a;
    display: flex;
    align-items: flex-start;
    padding-top: 24px;
}

.term-content {
    padding: 22px 32px;
}

.term-title {
    font-size: 16px;
    font-weight: 700;
    letter-spacing: -0.02em;
    margin-bottom: 8px;
}

.term-text {
    font-size: 15px;
    line-height: 1.65;
    opacity: 0.65;
}

.term-link {
    text-decoration: underline;
    opacity: 1;
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
    .term-row {
        grid-template-columns: 48px 1fr;
    }
    .term-num {
        padding: 18px 0 18px 16px;
        font-size: 10px;
    }
    .term-content {
        padding: 18px 20px;
    }
}
</style>
