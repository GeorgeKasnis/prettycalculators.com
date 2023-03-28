<template>
    <UiBaseContainer>
        <CalculatorsFitnessBmiCalc />
        <UiCalcDescription>
            <template v-slot:description>
                <p>
                    A BMI calculator is a tool that can help you estimate your body fat based on your height and weight. It works by calculating your BMI, which is a measurement of your body fat based on your height and weight. The BMI formula divides your weight in kilograms by your height in
                    meters squared.
                </p>
                <div class="mb-small">
                    <div><b>Below 18.5</b> - underweight</div>
                    <div><b>18.5 to 24.9</b> - healthy weight</div>
                    <div><b>25 to 29.9</b> - overweight</div>
                    <div><b>30 or higher</b> - obese</div>
                </div>
                Keep in mind that BMI is just a rough estimate of body fat, and it may not be accurate for everyone. Factors such as muscle mass and body composition can affect your BMI, so it's best to use it as a starting point for discussing your weight and health with a healthcare professional.
            </template>
            <template v-slot:example>
                <p>Let's say you weigh 70 kilograms and your height is 1.75 meters. </p>
                <p>To calculate your BMI, you would use the following formula: BMI = weight (kg) / height (m)^2 Substituting the values, you get: BMI = 70 / (1.75)^2 </p>
                <p>Simplifying, you get: BMI = 22.86 </p>
                <p>So, your BMI is 22.86. </p>
            </template>
        </UiCalcDescription>
    </UiBaseContainer>
</template>
