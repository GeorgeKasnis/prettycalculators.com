const CATEGORIES = {
    fitness: {
        title: 'Fitness',
        color: '#ddd6ff',
        seo: {
            title: 'Pretty Calculators - Fitness Calculators',
            description: 'Free fitness calculators at Pretty Calculators. BMI, BMR, TDEE, Body Fat, Ideal Weight — beautifully designed and fast.',
        },
        tools: [
            { label: 'BMI Calculator',         to: '/fitness/bmi-calculator' },
            { label: 'Body Fat Calculator',     to: '/fitness/body-fat-calculator' },
            { label: 'BMR Calculator',          to: '/fitness/bmr-calculator' },
            { label: 'TDEE Calculator',         to: '/fitness/tdee-calculator' },
            { label: 'Ideal Weight Calculator',  to: '/fitness/ideal-weight-calculator' },
            { label: 'One Rep Max Calculator',   to: '/fitness/one-rep-max-calculator' },
            { label: 'Protein Calculator',       to: '/fitness/protein-calculator' },
        ],
    },
    math: {
        title: 'Math',
        color: '#f5e642',
        seo: {
            title: 'Pretty Calculators - Math Calculators',
            description: 'Free math calculators at Pretty Calculators. Percentage, Manhattan Distance and more — beautifully designed and fast.',
        },
        tools: [
            { label: 'Percentage Calculator',         to: '/math/percentage-calculator' },
            { label: 'Fraction Calculator',          to: '/math/fraction-calculator' },
            { label: 'Average Calculator',           to: '/math/average-calculator' },
            { label: 'Quadratic Formula Calculator', to: '/math/quadratic-formula-calculator' },
            { label: 'Ratio Calculator',             to: '/math/ratio-calculator' },
            { label: 'Manhattan Distance Calculator', to: '/math/manhattan-distance-calculator' },
        ],
    },
    unit: {
        title: 'Unit',
        color: '#d4f5d4',
        seo: {
            title: 'Pretty Calculators - Unit Converters',
            description: 'Free unit converters at Pretty Calculators. Celsius to Fahrenheit, Miles to Kilometers and more — beautifully designed and fast.',
        },
        tools: [
            { label: 'Celsius to Fahrenheit', to: '/unit/celsius-to-fahrenheit-converter' },
            { label: 'Fahrenheit to Celsius', to: '/unit/fahrenheit-to-celsius-converter' },
            { label: 'Miles to Kilometers',   to: '/unit/miles-to-kilometers' },
            { label: 'Kilometers to Miles',   to: '/unit/kilometers-to-miles' },
            { label: 'Inches to CM',          to: '/unit/inches-to-cm-converter' },
            { label: 'KG to LBS',             to: '/unit/kg-to-lbs-converter' },
        ],
    },
    other: {
        title: 'Other',
        color: '#ffd6d6',
        seo: {
            title: 'Pretty Calculators - Other Calculators',
            description: 'Free utility calculators at Pretty Calculators. Aqua, Age, Px to Rem, Pizza and more — beautifully designed and fast.',
        },
        tools: [
            { label: 'Aqua Calculator',      to: '/other/aqua-calculator' },
            { label: 'Age Calculator',       to: '/other/age-calculator' },
            { label: 'Px to Rem Calculator', to: '/other/px-to-rem-calculator' },
            { label: 'Pizza Calculator',     to: '/other/pizza-calculator' },
            { label: 'Tip Calculator',       to: '/other/tip-calculator' },
            { label: 'Sleep Calculator',     to: '/other/sleep-calculator' },
        ],
    },
}

export const useCategoryConfig = (slug) => {
    const config = CATEGORIES[slug] ?? null

    const otherCategories = Object.entries(CATEGORIES)
        .filter(([key]) => key !== slug)
        .map(([key, val]) => ({ slug: key, ...val }))

    return { config, otherCategories }
}
