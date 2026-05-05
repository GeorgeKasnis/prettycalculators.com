<template>
    <div>
        <CalcInputStack>
            <CalcInputRow label="Monthly Views" unit="views" v-model="views" placeholder="e.g. 100000" type="number" />
            <CalcSelectRow label="Content Niche" v-model="niche" :options="NICHE_OPTIONS" />
            <CalcSelectRow label="Audience Country" v-model="country" :options="COUNTRY_OPTIONS" />
        </CalcInputStack>
        <CalcBtn :showClear="calculated" @click="calculate" @clear="clear">Calculate →</CalcBtn>
        <CalcOutput :show="calculated" title="Estimated Earnings">
            <CalcOutputCell label="Monthly Earnings" :value="monthly" />
            <CalcOutputCell label="Yearly Earnings"  :value="yearly" />
        </CalcOutput>
    </div>
</template>

<script setup>
const views    = ref('')
const niche    = ref('')
const country  = ref('')
const calculated = ref(false)
const monthly    = ref('')
const yearly     = ref('')

const NICHE_OPTIONS = [
    { value: 'finance',   label: 'Finance & Business' },
    { value: 'tech',      label: 'Tech & Software' },
    { value: 'travel',    label: 'Travel & Lifestyle' },
    { value: 'education', label: 'Education & How-to' },
    { value: 'beauty',    label: 'Beauty & Fashion' },
    { value: 'food',      label: 'Food & Cooking' },
    { value: 'gaming',    label: 'Gaming' },
    { value: 'entertainment', label: 'Entertainment & Vlogs' },
]

const COUNTRY_OPTIONS = [
    { value: 'us',        label: 'United States' },
    { value: 'uk',        label: 'United Kingdom' },
    { value: 'canada',    label: 'Canada' },
    { value: 'australia', label: 'Australia' },
    { value: 'eu',        label: 'Europe (avg)' },
    { value: 'greece',    label: 'Greece' },
    { value: 'other',     label: 'Rest of World' },
]

// Base RPM range [low, high] in USD per 1,000 views
const BASE_RPM = {
    us:        [4,   8  ],
    uk:        [5,   9  ],
    canada:    [3,   6  ],
    australia: [4,   7  ],
    eu:        [2,   4  ],
    greece:    [1,   3  ],
    other:     [0.5, 2  ],
}

// Niche multiplier on top of base RPM
const NICHE_MULT = {
    finance:      2.5,
    tech:         1.8,
    travel:       1.4,
    education:    1.3,
    beauty:       1.0,
    food:         0.9,
    gaming:       0.8,
    entertainment: 0.7,
}

function fmt(n) {
    return '$' + n.toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 0 })
}

function calculate() {
    const v = parseFloat(views.value)
    if (!v || v <= 0 || !niche.value || !country.value) return

    const [rpmLow, rpmHigh] = BASE_RPM[country.value]
    const mult = NICHE_MULT[niche.value]

    const low  = (v / 1000) * rpmLow  * mult
    const high = (v / 1000) * rpmHigh * mult

    monthly.value = `${fmt(low)} – ${fmt(high)}`
    yearly.value  = `${fmt(low * 12)} – ${fmt(high * 12)}`
    calculated.value = true
}

function clear() {
    views.value = ''
    niche.value = country.value = ''
    calculated.value = false
}
</script>
