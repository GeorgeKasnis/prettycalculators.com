<template>
    <footer class="flex items-center justify-between px-7 py-4 border-t-3 border-brut mobile:flex-col mobile:gap-3 mobile:py-5">
        <span class="font-mono text-[11px] tracking-[0.04em] opacity-40">© {{ new Date().getFullYear() }} Pretty Calculators</span>
        <div class="flex gap-3">
            <NuxtLink to="/about" class="font-mono text-[10px] font-bold uppercase tracking-[0.12em] text-brut-purple px-[10px] py-1 no-underline hover:opacity-70 transition-opacity">
                About
            </NuxtLink>
            <NuxtLink to="/contact" class="font-mono text-[10px] font-bold uppercase tracking-[0.12em] text-brut-purple px-[10px] py-1 no-underline hover:opacity-70 transition-opacity">
                Contact
            </NuxtLink>
            <NuxtLink to="/privacy-policy" class="font-mono text-[10px] font-bold uppercase tracking-[0.12em] text-brut-purple px-[10px] py-1 no-underline hover:opacity-70 transition-opacity">
                Privacy
            </NuxtLink>
            <NuxtLink to="/terms-of-use" class="font-mono text-[10px] font-bold uppercase tracking-[0.12em] text-brut-purple px-[10px] py-1 no-underline hover:opacity-70 transition-opacity">
                Terms
            </NuxtLink>
        </div>
    </footer>
</template>
