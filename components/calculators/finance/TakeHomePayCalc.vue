<template>
    <div>
        <CalcInputStack>
            <CalcInputRow label="Annual Salary"  unit="$" v-model="salary" placeholder="e.g. 75000" type="number" />
            <CalcSelectRow label="Filing Status" v-model="status" :options="STATUS_OPTIONS" />
            <CalcSelectRow label="State"         v-model="state"  :options="STATE_OPTIONS" />
        </CalcInputStack>
        <CalcBtn :showClear="calculated" @click="calculate" @clear="clear">Calculate →</CalcBtn>
        <CalcOutput :show="calculated" title="Take-Home Pay" :meta="effectiveRate" color="#d4edda">
            <CalcOutputCell label="Federal Income Tax"  :value="fedTax" />
            <CalcOutputCell label="State Income Tax"    :value="staTax" />
            <CalcOutputCell label="Social Security"     :value="ssTax" />
            <CalcOutputCell label="Medicare"            :value="mcTax" />
            <CalcOutputCell label="Monthly Take-Home"   :value="monthly" />
            <CalcOutputCell label="Annual Take-Home"    :value="annual" />
        </CalcOutput>
    </div>
</template>

<script setup>
const salary = ref('')
const status = ref('single')
const state  = ref('TX')
const calculated   = ref(false)
const effectiveRate = ref('')
const fedTax   = ref('')
const staTax   = ref('')
const ssTax    = ref('')
const mcTax    = ref('')
const monthly  = ref('')
const annual   = ref('')

const STATUS_OPTIONS = [
    { value: 'single', label: 'Single' },
    { value: 'mfj',    label: 'Married Filing Jointly' },
    { value: 'hoh',    label: 'Head of Household' },
    { value: 'mfs',    label: 'Married Filing Separately' },
]

const STATE_OPTIONS = [
    { value: 'AL', label: 'Alabama' },          { value: 'AK', label: 'Alaska (no income tax)' },
    { value: 'AZ', label: 'Arizona' },           { value: 'AR', label: 'Arkansas' },
    { value: 'CA', label: 'California' },        { value: 'CO', label: 'Colorado' },
    { value: 'CT', label: 'Connecticut' },       { value: 'DC', label: 'D.C.' },
    { value: 'DE', label: 'Delaware' },          { value: 'FL', label: 'Florida (no income tax)' },
    { value: 'GA', label: 'Georgia' },           { value: 'HI', label: 'Hawaii' },
    { value: 'ID', label: 'Idaho' },             { value: 'IL', label: 'Illinois' },
    { value: 'IN', label: 'Indiana' },           { value: 'IA', label: 'Iowa' },
    { value: 'KS', label: 'Kansas' },            { value: 'KY', label: 'Kentucky' },
    { value: 'LA', label: 'Louisiana' },         { value: 'ME', label: 'Maine' },
    { value: 'MD', label: 'Maryland' },          { value: 'MA', label: 'Massachusetts' },
    { value: 'MI', label: 'Michigan' },          { value: 'MN', label: 'Minnesota' },
    { value: 'MS', label: 'Mississippi' },       { value: 'MO', label: 'Missouri' },
    { value: 'MT', label: 'Montana' },           { value: 'NE', label: 'Nebraska' },
    { value: 'NV', label: 'Nevada (no income tax)' }, { value: 'NH', label: 'New Hampshire (no income tax)' },
    { value: 'NJ', label: 'New Jersey' },        { value: 'NM', label: 'New Mexico' },
    { value: 'NY', label: 'New York' },          { value: 'NC', label: 'North Carolina' },
    { value: 'ND', label: 'North Dakota' },      { value: 'OH', label: 'Ohio' },
    { value: 'OK', label: 'Oklahoma' },          { value: 'OR', label: 'Oregon' },
    { value: 'PA', label: 'Pennsylvania' },      { value: 'RI', label: 'Rhode Island' },
    { value: 'SC', label: 'South Carolina' },    { value: 'SD', label: 'South Dakota (no income tax)' },
    { value: 'TN', label: 'Tennessee (no income tax)' }, { value: 'TX', label: 'Texas (no income tax)' },
    { value: 'UT', label: 'Utah' },              { value: 'VT', label: 'Vermont' },
    { value: 'VA', label: 'Virginia' },          { value: 'WA', label: 'Washington (no income tax)' },
    { value: 'WV', label: 'West Virginia' },     { value: 'WI', label: 'Wisconsin' },
    { value: 'WY', label: 'Wyoming (no income tax)' },
]

// 2025 federal brackets (taxable income after standard deduction)
const FEDERAL = {
    single: { std: 15000, br: [[11925,.10],[48475,.12],[103350,.22],[197300,.24],[250525,.32],[626350,.35],[Infinity,.37]] },
    mfj:    { std: 30000, br: [[23850,.10],[96950,.12],[206700,.22],[394600,.24],[501050,.32],[751600,.35],[Infinity,.37]] },
    hoh:    { std: 22500, br: [[17000,.10],[64850,.12],[103350,.22],[197300,.24],[250500,.32],[626350,.35],[Infinity,.37]] },
    mfs:    { std: 15000, br: [[11925,.10],[48475,.12],[103350,.22],[197300,.24],[250525,.32],[375800,.35],[Infinity,.37]] },
}

// State income tax: null=none, number=flat, array=[[upTo,rate],...]
const STATE_TAX = {
    AK: null, FL: null, NV: null, NH: null, SD: null, TN: null, TX: null, WA: null, WY: null,
    AZ: 0.025, CO: 0.044, GA: 0.0549, ID: 0.05695, IL: 0.0495, IN: 0.0305,
    KY: 0.040, MA: 0.050, MI: 0.0425, MS: 0.047,   NC: 0.045,  PA: 0.0307, UT: 0.0455,
    AL: [[500,.02],[3000,.04],[Infinity,.05]],
    AR: [[4300,.02],[8500,.04],[Infinity,.049]],
    CA: [[10099,.01],[23942,.02],[37788,.04],[52455,.06],[66295,.08],[338639,.093],[406364,.103],[677275,.113],[Infinity,.123]],
    CT: [[10000,.02],[50000,.045],[100000,.055],[200000,.06],[250000,.065],[500000,.069],[Infinity,.0699]],
    DC: [[10000,.04],[40000,.06],[60000,.065],[350000,.085],[1000000,.0925],[Infinity,.0975]],
    DE: [[2000,0],[5000,.022],[10000,.039],[20000,.048],[25000,.052],[60000,.0555],[Infinity,.066]],
    HI: [[2400,.014],[4800,.032],[9600,.055],[14400,.064],[19200,.068],[24000,.072],[36000,.076],[48000,.079],[150000,.0825],[175000,.09],[200000,.10],[Infinity,.11]],
    IA: [[6000,.044],[30000,.0482],[Infinity,.057]],
    KS: [[15000,.031],[30000,.0525],[Infinity,.057]],
    LA: [[12500,.0185],[Infinity,.035]],
    ME: [[24500,.058],[58050,.0675],[Infinity,.0715]],
    MD: [[1000,.02],[2000,.03],[3000,.04],[100000,.0475],[125000,.05],[150000,.0525],[250000,.055],[Infinity,.0575]],
    MN: [[30070,.0535],[98760,.068],[183340,.0785],[Infinity,.0985]],
    MO: [[1121,.02],[2242,.025],[3363,.03],[4484,.035],[5605,.04],[6726,.045],[7847,.05],[Infinity,.053]],
    MT: [[20500,.047],[Infinity,.059]],
    NE: [[3700,.0246],[22170,.0351],[35730,.0501],[Infinity,.0584]],
    NJ: [[20000,.014],[35000,.0175],[40000,.035],[75000,.05525],[500000,.0637],[1000000,.0897],[Infinity,.1075]],
    NM: [[5500,.017],[11000,.032],[16000,.047],[210000,.049],[Infinity,.059]],
    NY: [[8500,.04],[11700,.045],[13900,.0525],[80650,.0585],[215400,.0625],[1077550,.0685],[5000000,.0965],[25000000,.103],[Infinity,.109]],
    ND: [[44725,.011],[225975,.0204],[Infinity,.029]],
    OH: [[26050,0],[100000,.02765],[Infinity,.03226]],
    OK: [[1000,.0025],[2500,.0075],[3750,.0175],[4900,.0275],[7200,.0375],[Infinity,.0475]],
    OR: [[10200,.0475],[25500,.0675],[125000,.0875],[Infinity,.099]],
    RI: [[73450,.0375],[166950,.0475],[Infinity,.0599]],
    SC: [[3460,0],[6280,.03],[9450,.04],[12820,.05],[16040,.06],[Infinity,.065]],
    VA: [[3000,.02],[5000,.03],[17000,.05],[Infinity,.0575]],
    VT: [[45400,.0335],[110050,.066],[229550,.076],[Infinity,.0875]],
    WI: [[13810,.035],[27630,.044],[304170,.053],[Infinity,.0765]],
    WV: [[10000,.0236],[25000,.0315],[40000,.0354],[60000,.0472],[Infinity,.0512]],
}

function calcBracket(income, data) {
    if (data === null) return 0
    if (typeof data === 'number') return income * data
    let tax = 0, prev = 0
    for (const [limit, rate] of data) {
        if (income <= prev) break
        tax += (Math.min(income, limit) - prev) * rate
        prev = limit
    }
    return tax
}

function fmt(n) {
    return '$' + Math.round(n).toLocaleString('en-US')
}

function calculate() {
    const sal = parseFloat(salary.value)
    if (!sal || sal <= 0) return

    const fed = FEDERAL[status.value]
    const taxable = Math.max(0, sal - fed.std)
    const fedAmount = calcBracket(taxable, fed.br)

    const stateData = STATE_TAX[state.value]
    const staAmount = calcBracket(sal, stateData)

    const SS_BASE = 176100
    const ss = Math.min(sal, SS_BASE) * 0.062
    const mcThreshold = status.value === 'mfj' ? 250000 : 200000
    const mc = sal * 0.0145 + Math.max(0, sal - mcThreshold) * 0.009

    const totalTax = fedAmount + staAmount + ss + mc
    const net = sal - totalTax

    const effRate = ((totalTax / sal) * 100).toFixed(1) + '% effective rate'

    fedTax.value   = fmt(fedAmount)
    staTax.value   = stateData === null ? '$0' : fmt(staAmount)
    ssTax.value    = fmt(ss)
    mcTax.value    = fmt(mc)
    monthly.value  = fmt(net / 12)
    annual.value   = fmt(net)
    effectiveRate.value = effRate
    calculated.value = true
}

function clear() {
    salary.value = ''
    status.value = 'single'
    state.value  = 'TX'
    calculated.value = false
}
</script>
