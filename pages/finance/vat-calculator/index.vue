<template>
    <UiCalcPage title="VAT Calculator" category="finance" description-title="Add or remove VAT from any price">
        <template #calc>
            <CalculatorsFinanceVatCalc />
        </template>
        <template #facts>
            <CalcFact label="UK standard VAT" value="20%" />
            <CalcFact label="EU average" value="21%" />
            <CalcFact label="US equivalent" value="Sales tax" />
            <CalcFact label="Remove VAT" value="÷ 1.2 (at 20%)" />
        </template>
        <template #description>
            <p>
                <strong>VAT (Value Added Tax)</strong> is a consumption tax applied at each stage of production and distribution. Use this calculator to add VAT to a net price or to extract VAT from a VAT-inclusive gross price.
            </p>
            <ul>
                <li><strong>Add VAT</strong> — you have the ex-VAT (net) price and want the total (gross) customer-facing price</li>
                <li><strong>Remove VAT</strong> — you have the VAT-inclusive price and want to find the net amount and VAT portion</li>
            </ul>
            <p>Common VAT rates by country:</p>
            <ul>
                <li><strong>UK</strong> — 20% standard, 5% reduced (energy, children's car seats)</li>
                <li><strong>Germany</strong> — 19% standard, 7% reduced</li>
                <li><strong>France</strong> — 20% standard, 10% / 5.5% reduced</li>
                <li><strong>Australia (GST)</strong> — 10%</li>
                <li><strong>Canada (GST)</strong> — 5% federal + provincial</li>
            </ul>
        </template>
        <template #example>
            <p><strong>Adding VAT:</strong> A product costs <strong>£80 net</strong>, UK VAT = 20%.</p>
            <p>VAT = £80 × 0.20 = <strong>£16</strong></p>
            <p>Gross = £80 + £16 = <strong>£96</strong></p>
            <p><strong>Removing VAT:</strong> A receipt shows <strong>£96 incl. VAT</strong>.</p>
            <p>Net = £96 ÷ 1.20 = <strong>£80</strong> &nbsp;|&nbsp; VAT = £96 − £80 = <strong>£16</strong></p>
        </template>
        <template #faq>
            <CalcFaq :faqs="faqs" />
        </template>
    </UiCalcPage>
</template>

<script setup>
definePageMeta({ layout: 'brutalist' })

const faqs = [
    { q: "What is VAT?", a: "VAT (Value Added Tax) is an indirect consumption tax levied on the value added at each stage of production and sale. Businesses collect it on behalf of the government and can typically reclaim VAT they've paid on business inputs. End consumers pay the final VAT." },
    { q: "How do I add VAT to a price?", a: "Multiply the net price by (1 + VAT rate). For 20% VAT: Net × 1.20. Example: £200 net × 1.20 = £240 gross. The VAT amount is £40." },
    { q: "How do I remove VAT from a price?", a: "Divide the gross (VAT-inclusive) price by (1 + VAT rate). For 20%: Gross ÷ 1.20. Example: £240 gross ÷ 1.20 = £200 net. The VAT portion is £240 − £200 = £40. Never just subtract 20% from the gross — that gives the wrong answer." },
    { q: "Why can't I just subtract 20% from the VAT-inclusive price to remove VAT?", a: "Because 20% VAT is 20% of the net price, not 20% of the gross. If net = £100, VAT = £20, gross = £120. 20% of £120 = £24, not £20. The correct method is to divide by 1.20, which gives £100." },
    { q: "What is the difference between VAT and sales tax?", a: "Both are consumption taxes but they work differently. VAT is collected at each stage of production — suppliers, manufacturers, and retailers all charge and reclaim it. Sales tax is only charged at the point of final sale to the consumer. In the US, sales tax rates vary by state and are not included in advertised prices." },
    { q: "What VAT rate should I use?", a: "Use the standard rate for your country unless the product qualifies for a reduced or zero rate. UK: 20% standard, 5% reduced, 0% zero-rated (food, children's clothes). EU member states set their own rates within EU minimums — typically 19–25% standard." },
    { q: "Can businesses reclaim VAT?", a: "VAT-registered businesses can reclaim (recover) the VAT they pay on business purchases by offsetting it against the VAT they charge on their sales. The net amount is paid to or refunded by the tax authority. Consumers cannot reclaim VAT." },
    { q: "What is the VAT threshold?", a: "Most countries require businesses to register for VAT only once their taxable turnover exceeds a threshold. In the UK, the VAT registration threshold is £90,000 (2024). Below this, businesses are not required to charge VAT, though they may register voluntarily." },
    { q: "What is a VAT invoice?", a: "A VAT invoice is an official document a VAT-registered business must issue showing the net price, VAT rate applied, VAT amount, and gross total. It's required for the recipient to reclaim VAT as input tax." },
    { q: "Is VAT the same as GST?", a: "GST (Goods and Services Tax) is functionally very similar to VAT and operates on the same principle. Countries like Australia, Canada, India, and New Zealand use GST. The main difference is terminology — the mechanics of tax collection and reclaim are essentially the same." },
]

useCalcSEO(
    "VAT Calculator — Add or Remove VAT From Any Price",
    "Free VAT calculator. Add VAT to a net price or remove VAT from a gross price. Works with any VAT rate.",
    faqs
)
</script>
