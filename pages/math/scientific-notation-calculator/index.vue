<template>
    <UiCalcPage title="Scientific Notation Calculator" category="math" description-title="Convert between standard and scientific notation">
        <template #calc>
            <CalculatorsMathScientificNotationCalc />
        </template>
        <template #facts>
            <CalcFact label="Speed of light" value="3 × 10⁸ m/s" />
            <CalcFact label="Avogadro's no." value="6.022 × 10²³" />
            <CalcFact label="Electron mass" value="9.109 × 10⁻³¹ kg" />
            <CalcFact label="Format" value="a × 10^n" />
        </template>
        <template #description>
            <p>
                <strong>Scientific notation</strong> expresses very large or very small numbers in the form <em>a × 10<sup>n</sup></em>, where <em>a</em> is a number between 1 and 10, and <em>n</em> is an integer exponent.
            </p>
            <p>
                This calculator converts in both directions:
            </p>
            <ul>
                <li><strong>Standard → Scientific</strong>: Enter any decimal number and get its scientific notation form</li>
                <li><strong>Scientific → Standard</strong>: Enter a coefficient and exponent to get the full number</li>
            </ul>
            <p>
                Scientific notation is essential in physics, chemistry, astronomy, and engineering — anywhere you deal with numbers that would be unwieldy to write out in full, like the distance to the Andromeda galaxy (2.537 × 10<sup>22</sup> m) or the mass of a proton (1.673 × 10<sup>−27</sup> kg).
            </p>
        </template>
        <template #example>
            <p>Convert <strong>0.000045</strong> to scientific notation:</p>
            <p>Move decimal 5 places right → coefficient = 4.5, exponent = −5</p>
            <p>Result: <strong>4.5 × 10<sup>−5</sup></strong></p>
            <p>Convert <strong>3,200,000</strong>: move decimal 6 places left → <strong>3.2 × 10<sup>6</sup></strong></p>
        </template>
        <template #faq>
            <CalcFaq :faqs="faqs" />
        </template>
    </UiCalcPage>
</template>

<script setup>
definePageMeta({ layout: 'brutalist' })

const faqs = [
    { q: "What is scientific notation?", a: "Scientific notation is a way of writing numbers as a product of a coefficient (between 1 and 10) and a power of 10. For example, 5,400,000 = 5.4 × 10⁶ and 0.00032 = 3.2 × 10⁻⁴. It makes very large or very small numbers easier to read and work with." },
    { q: "How do I convert a number to scientific notation?", a: "Move the decimal point until you have a number between 1 and 10. Count how many places you moved it — that's the exponent. Moving left gives a positive exponent; moving right gives a negative one. Example: 0.0056 → move right 3 places → 5.6 × 10⁻³." },
    { q: "How do I convert scientific notation to a standard number?", a: "Multiply the coefficient by 10 raised to the exponent. For 3.7 × 10⁴: multiply 3.7 by 10,000 = 37,000. For 2.1 × 10⁻³: multiply 2.1 by 0.001 = 0.0021. Alternatively, move the decimal point left (negative exponent) or right (positive exponent) by the number of places equal to the exponent." },
    { q: "What is E notation?", a: "E notation is shorthand for scientific notation used in calculators and programming. '3.2E6' means 3.2 × 10⁶ and '4.5E-5' means 4.5 × 10⁻⁵. It's used in Python, JavaScript, and most programming languages. 'E' stands for 'exponent'." },
    { q: "How do you multiply numbers in scientific notation?", a: "Multiply the coefficients and add the exponents. (3 × 10⁴) × (2 × 10³) = (3 × 2) × 10^(4+3) = 6 × 10⁷. If the resulting coefficient is ≥10 or <1, adjust: 15 × 10⁴ = 1.5 × 10⁵." },
    { q: "How do you divide numbers in scientific notation?", a: "Divide the coefficients and subtract the exponents. (9 × 10⁶) ÷ (3 × 10²) = (9÷3) × 10^(6−2) = 3 × 10⁴." },
    { q: "What does a negative exponent mean?", a: "A negative exponent means the number is smaller than 1. 10⁻³ = 1/10³ = 0.001. So 6.5 × 10⁻³ = 0.0065. Negative exponents are common in chemistry (atomic masses, concentrations) and physics (Planck's constant, electron charge)." },
    { q: "Why is scientific notation useful?", a: "It simplifies very large and very small numbers, making them easier to compare, multiply, and divide. It also makes precision explicit — 3.00 × 10⁸ shows three significant figures, whereas '300,000,000' doesn't indicate which digits are significant." },
    { q: "What are significant figures in scientific notation?", a: "The number of digits in the coefficient represents significant figures. 4.50 × 10³ has 3 significant figures. 4.5 × 10³ has 2. Scientific notation makes it unambiguous — unlike 4500, which could have 2, 3, or 4 significant figures." },
    { q: "How is scientific notation used in everyday science?", a: "Astronomy uses it for distances (Earth to Sun: 1.496 × 10¹¹ m). Chemistry uses it for Avogadro's number (6.022 × 10²³ mol⁻¹). Biology uses it for bacteria sizes (~1 × 10⁻⁶ m). Computer science uses it for storage sizes and processor speeds." },
]

useCalcSEO(
    "Scientific Notation Calculator — Convert To and From Scientific Notation",
    "Free scientific notation calculator. Convert any number to scientific notation or from scientific notation back to standard form instantly.",
    faqs
)
</script>
