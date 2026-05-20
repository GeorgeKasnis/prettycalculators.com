<template>
    <UiCalcPage title="Break-Even Calculator" category="finance" description-title="Find the point where revenue covers all costs">
        <template #calc>
            <CalculatorsFinanceBreakEvenCalc />
        </template>
        <template #facts>
            <CalcFact label="Formula" value="FC ÷ (P − VC)" />
            <CalcFact label="Key metric" value="Contribution margin" />
            <CalcFact label="Below BEP" value="Loss" />
            <CalcFact label="Above BEP" value="Profit" />
        </template>
        <template #description>
            <p>
                The <strong>Break-Even Point (BEP)</strong> is the number of units you must sell — or the revenue you must generate — to cover all costs with zero profit or loss. It's one of the most fundamental financial metrics for any business or product.
            </p>
            <p>
                The formula is: <strong>Break-Even Units = Fixed Costs ÷ (Price − Variable Cost per Unit)</strong>
            </p>
            <ul>
                <li><strong>Fixed Costs</strong> — costs that don't change with output (rent, salaries, software subscriptions)</li>
                <li><strong>Variable Cost per Unit</strong> — costs that scale with each unit produced (materials, shipping, payment fees)</li>
                <li><strong>Contribution Margin</strong> — what each sale contributes to covering fixed costs (Price − Variable Cost)</li>
            </ul>
            <p>
                A higher contribution margin means you reach break-even faster. A low margin means you need high volume to be profitable.
            </p>
        </template>
        <template #example>
            <p>A candle business: Fixed costs = <strong>$3,000/month</strong>, wax + wick + jar = <strong>$6/candle</strong>, selling price = <strong>$20/candle</strong>.</p>
            <p>Contribution margin = $20 − $6 = <strong>$14</strong></p>
            <p>Break-even = $3,000 ÷ $14 = <strong>215 candles/month</strong></p>
            <p>Break-even revenue = 215 × $20 = <strong>$4,300/month</strong></p>
        </template>
        <template #faq>
            <CalcFaq :faqs="faqs" />
        </template>
    </UiCalcPage>
</template>

<script setup>
definePageMeta({ layout: 'brutalist' })

const faqs = [
    { q: "What is the break-even point?", a: "The break-even point is the level of sales at which total revenue equals total costs — meaning the business makes neither a profit nor a loss. Below this point you're losing money; above it you're profitable." },
    { q: "What is the break-even formula?", a: "Break-Even Units = Fixed Costs ÷ Contribution Margin per Unit. Where Contribution Margin = Selling Price − Variable Cost per Unit. Break-Even Revenue = Break-Even Units × Selling Price." },
    { q: "What are fixed costs?", a: "Fixed costs remain constant regardless of how much you produce or sell. Examples include rent, annual software licences, insurance, salaried employee wages, and loan repayments. They are paid even if you sell nothing." },
    { q: "What are variable costs?", a: "Variable costs change in proportion to output or sales. Examples include raw materials, per-unit shipping costs, payment processing fees, and sales commissions. If you sell twice as many units, your variable costs roughly double." },
    { q: "What is contribution margin?", a: "Contribution margin is the selling price minus the variable cost per unit. It tells you how much each sale contributes toward covering fixed costs and generating profit. A $30 product with $10 variable cost has a $20 contribution margin — every unit sold covers $20 of fixed costs." },
    { q: "How do I lower my break-even point?", a: "You can lower the break-even point by: (1) reducing fixed costs (negotiate rent, cut subscriptions), (2) reducing variable costs (better supplier deals, more efficient production), or (3) increasing your selling price (if the market allows). Higher prices and lower costs both increase contribution margin." },
    { q: "What is a contribution margin ratio?", a: "The contribution margin ratio is the contribution margin divided by the selling price, expressed as a percentage. A 60% margin ratio means that 60 cents of every dollar in sales contributes to covering fixed costs and profit. It's useful for comparing product lines." },
    { q: "Can the break-even calculator be used for services?", a: "Yes. Replace 'units' with service engagements, hours billed, subscriptions, or any other output metric. Fixed costs = overhead (office, tools, salaries). Variable costs = per-project labour, contractor fees, or consumables." },
    { q: "What happens after you pass the break-even point?", a: "Every unit sold beyond the break-even point generates pure profit equal to the contribution margin per unit. If your BEP is 200 units and you sell 250, the extra 50 units each contribute their full contribution margin to profit." },
    { q: "Is break-even analysis enough for business planning?", a: "Break-even analysis is a starting point, not a complete picture. It doesn't account for cash flow timing, working capital needs, taxes, or market demand. Use it alongside cash flow projections, profit targets, and market research for a full financial plan." },
]

useCalcSEO(
    "Break-Even Calculator — Find Your Break-Even Point",
    "Free break-even calculator. Enter fixed costs, variable costs, and selling price to find the units and revenue needed to break even.",
    faqs
)
</script>
