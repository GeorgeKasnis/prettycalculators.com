<template>
    <div class="w-full">
        <div class="grid grid-cols-3 tablet:grid-cols-1 gap-big">
            <div class="col-span-2 tablet:col-span-3">
                <div class=" top-20 tablet:static">
                    <slot name="main"></slot>
                </div>
            </div>
            <div class="col-span-1 tablet:col-span-3">
                <h2 class="font-bold text-small mb-small">Recommended</h2>
                <div>
                    <slot name="recommended"></slot>
                </div>
            </div>
        </div>
    </div>
</template>

