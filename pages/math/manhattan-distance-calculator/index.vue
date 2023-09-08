<template>
  <UiBaseContainer>
    <CalculatorsMathManhattanDistanceCalc />
    <UiCalcDescription>
      <template v-slot:description>
        <p>A Manhattan Distance Calculator is a tool that allows you to calculate the Manhattan distance between two points in a grid-like space.</p>
        <p>Manhattan distance, also known as L1 distance, is the sum of the absolute differences between the coordinates of two points. It's commonly used in computer science, robotics, and various applications requiring distance calculations.</p>
        <p>With our Manhattan Distance Calculator, you can input the coordinates of two points in one, two, three, or four dimensions, and it will compute the Manhattan distance for you.</p>
        <p>Whether you're a developer working on algorithms or someone interested in understanding distances in a grid, our Manhattan Distance Calculator is a valuable tool for quick and accurate calculations.</p>
      </template>
      <template v-slot:example>
        Example: In a 2D grid, the Manhattan distance between (3, 5) and (1, 2) is 5.
      </template>
    </UiCalcDescription>
  </UiBaseContainer>
</template>

<script setup>
useHead({
    title: "Manhattan Distance Calculator - Calculate L1 Distance Online",
    meta: [
        {
            hid: "title",
            name: "title",
            content: "Manhattan Distance Calculator - Calculate L1 Distance Online"
        },
        {
            hid: "description",
            name: "description",
            content: "Calculate Manhattan distance (L1 distance) between two points in a grid-like space online. Use our free Manhattan Distance Calculator for quick and accurate distance calculations in one, two, three, or four dimensions."
        },
        {
            hid: "og-title",
            property: "og:title",
            content: "Manhattan Distance Calculator - Calculate L1 Distance Online"
        },
        {
            hid: "og:description",
            property: "og:description",
            content: "Calculate Manhattan distance (L1 distance) between two points in a grid-like space online. Use our free Manhattan Distance Calculator for quick and accurate distance calculations in one, two, three, or four dimensions."
        },
    ],
});
</script>
