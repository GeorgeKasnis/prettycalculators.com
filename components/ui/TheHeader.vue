<template>
    <nav class="border-b-3 border-brut bg-brut flex items-stretch h-16 sticky top-0 z-50">
        <NuxtLink to="/" class="text-xl font-bold text-lavender tracking-[-0.03em] px-7 flex items-center border-r border-[#333] whitespace-nowrap no-underline font-grotesk">
            Pretty<span class="text-brut-yellow">&nbsp;Calculators</span>
        </NuxtLink>
        <ul class="flex items-stretch ml-auto list-none">
            <li>
                <NuxtLink
                    to="/fitness"
                    class="flex items-center px-6 font-mono text-[12px] font-bold uppercase tracking-[0.08em] text-cream no-underline border-l border-[#333] h-full transition-colors duration-100"
                    :class="$route.path.startsWith('/fitness') ? 'bg-lavender !text-brut' : 'hover:bg-lavender hover:text-brut'"
                >Fitness</NuxtLink>
            </li>
            <li>
                <NuxtLink
                    to="/math"
                    class="flex items-center px-6 font-mono text-[12px] font-bold uppercase tracking-[0.08em] text-cream no-underline border-l border-[#333] h-full transition-colors duration-100"
                    :class="$route.path.startsWith('/math') ? 'bg-lavender !text-brut' : 'hover:bg-lavender hover:text-brut'"
                >Math</NuxtLink>
            </li>
            <li>
                <NuxtLink
                    to="/unit"
                    class="flex items-center px-6 font-mono text-[12px] font-bold uppercase tracking-[0.08em] text-cream no-underline border-l border-[#333] h-full transition-colors duration-100"
                    :class="$route.path.startsWith('/unit') ? 'bg-lavender !text-brut' : 'hover:bg-lavender hover:text-brut'"
                >Unit</NuxtLink>
            </li>
            <li>
                <NuxtLink
                    to="/other"
                    class="flex items-center px-6 font-mono text-[12px] font-bold uppercase tracking-[0.08em] text-cream no-underline border-l border-[#333] h-full transition-colors duration-100"
                    :class="$route.path.startsWith('/other') ? 'bg-lavender !text-brut' : 'hover:bg-lavender hover:text-brut'"
                >Other</NuxtLink>
            </li>
        </ul>
    </nav>
</template>
