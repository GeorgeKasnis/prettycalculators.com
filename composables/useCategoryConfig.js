const CATEGORIES = {
    fitness: {
        title: "Fitness",
        color: "#ddd6ff",
        seo: {
            title: "Pretty Calculators - Fitness Calculators",
            description: "Free fitness calculators at Pretty Calculators. BMI, BMR, TDEE, Body Fat, Ideal Weight — beautifully designed and fast.",
        },
        tools: [
            { label: "BMI Calculator", to: "/fitness/bmi-calculator" },
            { label: "Body Fat Calculator", to: "/fitness/body-fat-calculator" },
            { label: "BMR Calculator", to: "/fitness/bmr-calculator" },
            { label: "TDEE Calculator", to: "/fitness/tdee-calculator" },
            { label: "Ideal Weight Calculator", to: "/fitness/ideal-weight-calculator" },
            { label: "One Rep Max Calculator", to: "/fitness/one-rep-max-calculator" },
            { label: "Protein Calculator", to: "/fitness/protein-calculator" },
            { label: "Macro Calculator",   to: "/fitness/macro-calculator" },
            { label: "Pace Calculator",            to: "/fitness/pace-calculator" },
            { label: "Calories Burned Calculator", to: "/fitness/calories-burned-calculator" },
        ],
    },
    math: {
        title: "Math",
        color: "#f5e642",
        seo: {
            title: "Pretty Calculators - Math Calculators",
            description: "Free math calculators at Pretty Calculators. Percentage, Manhattan Distance and more — beautifully designed and fast.",
        },
        tools: [
            { label: "Percentage Calculator", to: "/math/percentage-calculator" },
            { label: "Fraction Calculator", to: "/math/fraction-calculator" },
            { label: "Average Calculator", to: "/math/average-calculator" },
            { label: "Quadratic Formula Calculator", to: "/math/quadratic-formula-calculator" },
            { label: "Ratio Calculator", to: "/math/ratio-calculator" },
            { label: "Manhattan Distance Calculator",  to: "/math/manhattan-distance-calculator" },
            { label: "Euclidean Distance Calculator",  to: "/math/euclidean-distance-calculator" },
            { label: "Chebyshev Distance Calculator",  to: "/math/chebyshev-distance-calculator" },
            { label: "Hamming Distance Calculator",    to: "/math/hamming-distance-calculator" },
            { label: "Minkowski Distance Calculator",  to: "/math/minkowski-distance-calculator" },
            { label: "GPA Calculator",                 to: "/math/gpa-calculator" },
        ],
    },
    finance: {
        title: "Finance",
        color: "#d4edda",
        seo: {
            title: "Pretty Calculators - Finance Calculators",
            description: "Free finance calculators at Pretty Calculators. YouTube earnings, TikTok income, compound interest, debt payoff, savings goals and take-home pay — practical money tools.",
        },
        tools: [
            { label: "YouTube Earnings Calculator",  to: "/finance/youtube-earnings-calculator" },
            { label: "TikTok Earnings Calculator",   to: "/finance/tiktok-earnings-calculator" },
            { label: "Compound Interest Calculator", to: "/finance/compound-interest-calculator" },
            { label: "Debt Payoff Calculator",       to: "/finance/debt-payoff-calculator" },
            { label: "Savings Goal Calculator",      to: "/finance/savings-goal-calculator" },
            { label: "Take-Home Pay Calculator",     to: "/finance/take-home-pay-calculator" },
            { label: "Mortgage Calculator",             to: "/finance/mortgage-calculator" },
            { label: "Loan Calculator",                 to: "/finance/loan-calculator" },
            { label: "Credit Card Payoff Calculator",   to: "/finance/credit-card-payoff-calculator" },
            { label: "Investment Calculator",           to: "/finance/investment-calculator" },
            { label: "Retirement Calculator",           to: "/finance/retirement-calculator" },
            { label: "Income Tax Calculator",           to: "/finance/income-tax-calculator" },
            { label: "Salary to Hourly Calculator",     to: "/finance/salary-to-hourly-calculator" },
        ],
    },
    other: {
        title: "Other",
        color: "#ffd6d6",
        seo: {
            title: "Pretty Calculators - Other Calculators & Converters",
            description: "Free utility calculators and unit converters at Pretty Calculators. Age, Sleep, Tip, Pizza, and temperature/distance/weight converters — fast and free.",
        },
        tools: [
            { label: "Aqua Calculator", to: "/other/aqua-calculator" },
            { label: "Age Calculator", to: "/other/age-calculator" },
            { label: "Px to Rem Calculator", to: "/other/px-to-rem-calculator" },
            { label: "Pizza Calculator", to: "/other/pizza-calculator" },
            { label: "Tip Calculator", to: "/other/tip-calculator" },
            { label: "Sleep Calculator", to: "/other/sleep-calculator" },
            { label: "Celsius to Fahrenheit", to: "/unit/celsius-to-fahrenheit-converter" },
            { label: "Fahrenheit to Celsius", to: "/unit/fahrenheit-to-celsius-converter" },
            { label: "Miles to Kilometers", to: "/unit/miles-to-kilometers" },
            { label: "Kilometers to Miles", to: "/unit/kilometers-to-miles" },
            { label: "Inches to CM", to: "/unit/inches-to-cm-converter" },
            { label: "KG to LBS", to: "/unit/kg-to-lbs-converter" },
            { label: "Pregnancy Due Date Calculator", to: "/other/pregnancy-due-date-calculator" },
            { label: "Ovulation Calculator",          to: "/other/ovulation-calculator" },
        ],
    },
};

export const useCategoryConfig = (slug) => {
    const config = CATEGORIES[slug] ?? null;

    const otherCategories = Object.entries(CATEGORIES)
        .filter(([key]) => key !== slug)
        .map(([key, val]) => ({ slug: key, ...val }));

    return { config, otherCategories };
};
