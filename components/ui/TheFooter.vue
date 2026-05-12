<template>
    <footer class="flex items-center justify-between px-7 py-4 border-t-3 border-brut">
        <span class="font-mono text-[11px] tracking-[0.04em] opacity-40">© {{ new Date().getFullYear() }} Pretty Calculators</span>
        <div class="flex gap-3">
            <NuxtLink to="/privacy-policy" class="font-mono text-[10px] font-bold uppercase tracking-[0.12em] bg-brut text-lavender px-[10px] py-1 no-underline hover:opacity-80 transition-opacity">
                Privacy
            </NuxtLink>
            <NuxtLink to="/terms-of-use" class="font-mono text-[10px] font-bold uppercase tracking-[0.12em] bg-brut text-lavender px-[10px] py-1 no-underline hover:opacity-80 transition-opacity">
                Terms
            </NuxtLink>
        </div>
    </footer>
</template>
