<template>
    <UiBreadcrumbBand :links="[{ label: 'Home', to: '/' }, { label: 'Terms of Use' }]" />

    <!-- Header -->
    <div class="border-b-3 border-brut bg-brut px-8 py-8 mobile:px-4 mobile:py-6">
        <div class="font-mono text-[10px] font-bold uppercase tracking-[0.15em] text-lavender/50 mb-2">Legal</div>
        <h1 class="font-grotesk text-[52px] font-bold tracking-[-0.05em] leading-none text-cream mobile:text-[36px]">Terms of Use</h1>
    </div>

    <!-- Content -->
    <div class="terms-section">
        <div class="terms-card">

            <!-- Card header -->
            <div class="terms-card-head">
                <div class="terms-eyebrow">Terms of Use Agreement</div>
                <p class="terms-intro">By using this website, you agree to be bound by the following terms. Please read them carefully before using Pretty Calculators.</p>
            </div>

            <!-- Terms list -->
            <div class="terms-body">

                <div class="term-row">
                    <div class="term-num">01</div>
                    <div class="term-content">
                        <h2 class="term-title">Use of Website</h2>
                        <p class="term-text">By using this website, you agree to be bound by these terms of use. You may not use this website if you do not agree to these terms.</p>
                    </div>
                </div>

                <div class="term-row">
                    <div class="term-num">02</div>
                    <div class="term-content">
                        <h2 class="term-title">Accuracy</h2>
                        <p class="term-text">While we make every effort to ensure the accuracy of the calculators and information on this website, we do not guarantee that the results are correct. We are not responsible for any errors or omissions, and we do not accept any liability for any loss or damage that may arise from your reliance on the calculators or information provided on this website.</p>
                    </div>
                </div>

                <div class="term-row">
                    <div class="term-num">03</div>
                    <div class="term-content">
                        <h2 class="term-title">Availability</h2>
                        <p class="term-text">We make every effort to ensure that this website is available and functioning at all times. However, we do not guarantee that the website will always be available or that it will function without interruption or error.</p>
                    </div>
                </div>

                <div class="term-row">
                    <div class="term-num">04</div>
                    <div class="term-content">
                        <h2 class="term-title">Intellectual Property</h2>
                        <p class="term-text">All content on this website, including text, images, graphics, and software, is the property of the website owner and is protected by copyright law. You may not use any content from this website without the express permission of the website owner.</p>
                    </div>
                </div>

                <div class="term-row">
                    <div class="term-num">05</div>
                    <div class="term-content">
                        <h2 class="term-title">Links</h2>
                        <p class="term-text">This website may contain links to other websites. We are not responsible for the content of any linked website, and we do not endorse or guarantee the accuracy of any information on any linked website.</p>
                    </div>
                </div>

                <div class="term-row">
                    <div class="term-num">06</div>
                    <div class="term-content">
                        <h2 class="term-title">Disclaimer of Liability</h2>
                        <p class="term-text">To the fullest extent permitted by law, we disclaim all liability for any loss or damage that may arise from your use of this website, including any loss or damage caused by viruses or other harmful components.</p>
                    </div>
                </div>

                <div class="term-row">
                    <div class="term-num">07</div>
                    <div class="term-content">
                        <h2 class="term-title">Indemnification</h2>
                        <p class="term-text">You agree to indemnify and hold us harmless from any claim or demand, including reasonable attorneys' fees, made by any third party due to or arising out of your use of this website, your violation of these terms of use, or your violation of any rights of another.</p>
                    </div>
                </div>

                <div class="term-row">
                    <div class="term-num">08</div>
                    <div class="term-content">
                        <h2 class="term-title">Modifications</h2>
                        <p class="term-text">We reserve the right to modify these terms of use at any time, without notice to you. Your continued use of this website after any such modification constitutes your acceptance of the modified terms of use.</p>
                    </div>
                </div>

            </div>
        </div>
    </div>
</template>

<script setup>
definePageMeta({ layout: 'brutalist' })

useHead({
    title: 'Pretty Calculators - Terms of Use',
    meta: [
        { hid: 'title',          name: 'title',          content: 'Pretty Calculators - Terms of Use' },
        { hid: 'description',    name: 'description',    content: 'Pretty Calculators - Terms of Use' },
        { hid: 'og-title',       property: 'og:title',   content: 'Pretty Calculators - Terms of Use' },
        { hid: 'og:description', property: 'og:description', content: 'Pretty Calculators - Terms of Use' },
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
