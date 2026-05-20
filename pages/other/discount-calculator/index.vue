<template>
    <UiCalcPage title="Discount Calculator" category="other" description-title="Calculate sale price and how much you save">
        <template #calc>
            <CalculatorsOtherDiscountCalc />
        </template>
        <template #facts>
            <CalcFact label="20% off £80" value="£16 saved" />
            <CalcFact label="50% off" value="Half price" />
            <CalcFact label="Black Friday avg" value="~30% off" />
            <CalcFact label="Formula" value="Price × (1 − %/100)" />
        </template>
        <template #description>
            <p>
                The <strong>Discount Calculator</strong> tells you exactly how much you save and what you'll actually pay after a percentage discount is applied. Useful for shopping, invoicing, and any situation where you need to quickly work out a sale price.
            </p>
            <p>
                Formula: <strong>Final Price = Original Price × (1 − Discount% ÷ 100)</strong>
            </p>
            <p>
                Quick mental shortcuts for common discounts:
            </p>
            <ul>
                <li><strong>10% off</strong> — move the decimal one place left</li>
                <li><strong>25% off</strong> — divide by 4 and subtract</li>
                <li><strong>50% off</strong> — divide by 2</li>
                <li><strong>20% off</strong> — find 10% (÷10) and double it, then subtract</li>
            </ul>
        </template>
        <template #example>
            <p>A jacket originally priced at <strong>$120</strong> is on sale at <strong>35% off</strong>:</p>
            <p>Savings = $120 × 0.35 = <strong>$42.00</strong></p>
            <p>Final price = $120 − $42 = <strong>$78.00</strong></p>
        </template>
        <template #faq>
            <CalcFaq :faqs="faqs" />
        </template>
    </UiCalcPage>
</template>

<script setup>
definePageMeta({ layout: 'brutalist' })

const faqs = [
    { q: "How do I calculate a percentage discount?", a: "Multiply the original price by the discount percentage, then divide by 100 to get the discount amount. Subtract that from the original price to get the final price. Example: 25% off $80 = $80 × 0.25 = $20 saved, final price = $60." },
    { q: "What is 20% off of $50?", a: "20% of $50 = $10. Final price = $50 − $10 = $40. Quick way: find 10% ($5) and double it ($10). Subtract from original." },
    { q: "How do I calculate the original price from a discounted price?", a: "Divide the discounted price by (1 − discount rate). If you paid $75 after a 25% discount: original = $75 ÷ 0.75 = $100." },
    { q: "What is 30% off $200?", a: "30% of $200 = $60. Final price = $200 − $60 = $140. You save $60." },
    { q: "How do stacked discounts work?", a: "Stacked discounts are not simply added together. A 20% discount followed by a 10% discount is not 30% off. First: $100 × 0.80 = $80. Then: $80 × 0.90 = $72. Total saving = $28 = 28%, not 30%." },
    { q: "What is the formula for discount percentage?", a: "Discount % = (Original Price − Sale Price) ÷ Original Price × 100. Example: original $60, sale $45. Discount = ($60 − $45) ÷ $60 × 100 = 25%." },
    { q: "Is a 50% discount the same as half price?", a: "Yes. 50% off means you pay half the original price. 50% of $100 = $50 saved, so you pay $50." },
    { q: "How do I calculate 15% off mentally?", a: "Find 10% (move decimal left), then find 5% (half of 10%), and add them together. On $80: 10% = $8, 5% = $4, 15% = $12. Final price = $80 − $12 = $68." },
    { q: "What is a good discount percentage?", a: "In retail, 10–20% is a typical sale. 30–50% indicates a significant clearance or seasonal sale. Over 50% suggests the original price was inflated or the product is being heavily cleared. Online discounts from 'was/now' pricing should be viewed with scepticism — original prices are sometimes inflated." },
    { q: "How do I calculate tax after a discount?", a: "Apply the discount first, then apply tax to the discounted price. Example: $100 item, 20% off, 10% tax. Discounted = $80. Tax = $80 × 0.10 = $8. Total = $88. Tax is calculated on what you actually pay, not the original price." },
]

useCalcSEO(
    "Discount Calculator — Calculate Sale Price and Savings",
    "Free discount calculator. Enter the original price and discount percentage to instantly find how much you save and your final price.",
    faqs
)
</script>
