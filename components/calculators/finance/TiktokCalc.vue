<template>
    <div>
        <CalcInputStack>
            <CalcInputRow label="Monthly Views" unit="views"     v-model="views"     placeholder="e.g. 500000"  type="number" />
            <CalcInputRow label="Followers"     unit="followers" v-model="followers" placeholder="e.g. 50000"   type="number" />
            <CalcSelectRow label="Audience Country" v-model="country" :options="COUNTRY_OPTIONS" />
        </CalcInputStack>
        <CalcBtn :showClear="calculated" @click="calculate" @clear="clear">Calculate →</CalcBtn>
        <CalcOutput :show="calculated" title="Estimated Earnings">
            <CalcOutputCell label="Creator Fund (monthly)" :value="fund" />
            <CalcOutputCell label="Brand Deal (per post)"  :value="brand" />
            <CalcOutputCell label="Monthly Total Est."     :value="total" />
        </CalcOutput>
    </div>
</template>

<script setup>
const views     = ref('')
const followers = ref('')
const country   = ref('')
const calculated = ref(false)
const fund       = ref('')
const brand      = ref('')
const total      = ref('')

const COUNTRY_OPTIONS = [
    { value: 'us',        label: 'United States' },
    { value: 'uk',        label: 'United Kingdom' },
    { value: 'canada',    label: 'Canada' },
    { value: 'australia', label: 'Australia' },
    { value: 'eu',        label: 'Europe (avg)' },
    { value: 'greece',    label: 'Greece' },
    { value: 'other',     label: 'Rest of World' },
]

// Creator Fund RPM [low, high] per 1,000 views in USD
const FUND_RPM = {
    us:        [0.03, 0.05],
    uk:        [0.02, 0.04],
    canada:    [0.02, 0.04],
    australia: [0.02, 0.04],
    eu:        [0.01, 0.03],
    greece:    [0.005, 0.02],
    other:     [0.003, 0.015],
}

// Brand deal rate per sponsored post [low, high] by follower tier in USD
function brandRate(f) {
    if (f >= 1_000_000) return [5000,  25000]
    if (f >= 500_000)   return [3000,  10000]
    if (f >= 100_000)   return [1500,  5000 ]
    if (f >= 50_000)    return [500,   2000 ]
    if (f >= 10_000)    return [200,   800  ]
    if (f >= 1_000)     return [50,    200  ]
    return [0, 0]
}

function fmt(n) {
    return '$' + n.toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 0 })
}

function calculate() {
    const v = parseFloat(views.value)
    const f = parseFloat(followers.value)
    if (!v || v <= 0 || !f || f <= 0 || !country.value) return

    const [rpmLow, rpmHigh] = FUND_RPM[country.value]
    const fundLow  = (v / 1000) * rpmLow
    const fundHigh = (v / 1000) * rpmHigh

    const [brandLow, brandHigh] = brandRate(f)

    // Assume ~2 sponsored posts per month for total estimate
    const totalLow  = fundLow  + brandLow  * 2
    const totalHigh = fundHigh + brandHigh * 2

    fund.value  = `${fmt(fundLow)} – ${fmt(fundHigh)}`
    brand.value = brandLow > 0 ? `${fmt(brandLow)} – ${fmt(brandHigh)}` : 'N/A (< 1K followers)'
    total.value = `${fmt(totalLow)} – ${fmt(totalHigh)}`
    calculated.value = true
}

function clear() {
    views.value = followers.value = ''
    country.value = ''
    calculated.value = false
}
</script>
