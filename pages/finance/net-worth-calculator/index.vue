<template>
    <UiCalcPage title="Net Worth Calculator" category="finance" description-title="Calculate your total assets minus liabilities">
        <template #calc>
            <CalculatorsFinanceNetWorthCalc />
        </template>
        <template #facts>
            <CalcFact label="Formula" value="Assets − Liabilities" />
            <CalcFact label="US median" value="~$192,700" />
            <CalcFact label="Track yearly" value="Measures progress" />
            <CalcFact label="Goal" value="Positive & growing" />
        </template>
        <template #description>
            <p>
                <strong>Net worth</strong> is the single most comprehensive snapshot of your financial health. It equals everything you own (assets) minus everything you owe (liabilities). A positive net worth means your assets exceed your debts — a negative net worth means the reverse.
            </p>
            <p>
                <strong>Assets</strong> include anything with financial value: cash, savings accounts, investment portfolios, real estate, and vehicles.
            </p>
            <p>
                <strong>Liabilities</strong> include all debts: mortgage balance, car loans, credit card balances, student loans, and any other money owed.
            </p>
            <p>
                Track your net worth annually. The year-over-year change is more meaningful than the absolute number — consistent growth indicates good financial momentum.
            </p>
        </template>
        <template #example>
            <p>Assets: Savings $15,000 + Investments $40,000 + Home $350,000 + Car $18,000 = <strong>$423,000</strong></p>
            <p>Liabilities: Mortgage $280,000 + Car loan $9,000 + Credit card $2,500 = <strong>$291,500</strong></p>
            <p>Net Worth = $423,000 − $291,500 = <strong>$131,500</strong></p>
        </template>
        <template #faq>
            <CalcFaq :faqs="faqs" />
        </template>
    </UiCalcPage>
</template>

<script setup>
definePageMeta({ layout: 'brutalist' })

const faqs = [
    { q: "What is net worth?", a: "Net worth is the total value of everything you own (assets) minus everything you owe (liabilities). It's the most complete single-number summary of your financial position. A positive net worth means your assets outweigh your debts." },
    { q: "What counts as an asset?", a: "Assets include: bank account balances, savings, cash, investment accounts (stocks, bonds, ETFs, 401k, IRA), real estate (current market value), vehicles, business equity, valuable personal property (jewellery, art), and money owed to you." },
    { q: "What counts as a liability?", a: "Liabilities are debts and financial obligations: mortgage balance (not the property value — that's an asset), car loans, credit card balances, student loans, personal loans, medical debt, tax debt, and any other money you owe." },
    { q: "Is it bad to have a negative net worth?", a: "A negative net worth is common, especially early in adulthood when student loans and mortgages outweigh savings. What matters is the direction — a net worth increasing year over year is a healthy sign, even if it's currently negative." },
    { q: "What is a good net worth by age?", a: "A common benchmark is 1× your annual income by age 30, 3× by 40, 6× by 50, and 8× by 60. The median US net worth is around $192,700. But context matters — cost of living, income, family situation, and country all affect what's 'normal'." },
    { q: "Should I include my home in net worth?", a: "Yes, include the current market value as an asset and the outstanding mortgage balance as a liability. The difference (home equity) is part of your net worth. However, your home is illiquid — you can't easily access that value, so some financial planners calculate net worth both with and without the home." },
    { q: "How often should I calculate my net worth?", a: "Once or twice a year is sufficient for most people. Monthly tracking can be motivating if you're aggressively paying down debt or building savings. The goal is to observe a trend over years, not react to short-term fluctuations in investment values." },
    { q: "Do I include my retirement accounts in net worth?", a: "Yes. 401(k), IRA, pension values, and other retirement accounts are assets. Note that you'll owe income tax on traditional pre-tax retirement withdrawals, so your actual spending power from those accounts is somewhat less than the stated balance." },
    { q: "What's the fastest way to increase net worth?", a: "The two levers are: grow assets (invest consistently, increase income) and reduce liabilities (pay down high-interest debt first). Eliminating credit card debt has an immediate guaranteed return equal to the interest rate, often 20%+." },
    { q: "Is net worth the same as wealth?", a: "They're related but not identical. Net worth is a point-in-time balance sheet calculation. Wealth is a broader concept that also includes income-generating capacity, human capital (future earning potential), and factors like health and social capital that don't appear on a balance sheet." },
]

useCalcSEO(
    "Net Worth Calculator — Calculate Your Assets Minus Liabilities",
    "Free net worth calculator. Add your assets and liabilities to instantly calculate your total net worth and financial position.",
    faqs
)
</script>
