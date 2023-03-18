<template>
  <div class="w-screen h-screen flex items-center flex-col">
       <UiTheHeader />
    <div class="flex-1 grid place-items-center w-full">
      <slot />
    </div>
    <UiTheFooter />
  </div>
</template>
