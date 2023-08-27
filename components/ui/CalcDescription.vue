<template>
    <div class="brutalist-shadow p-huge tablet:px-small tablet:py-big mt-big">
        <div class="mb-huge">
            <h2 class="text-big leading-5 mb-small">Description</h2>
            <slot name="description" />
        </div>
        <div>
            <h3 class="text-big leading-5 mb-small">Example</h3>
            <slot name="example" />
        </div>
    </div>
</template>
