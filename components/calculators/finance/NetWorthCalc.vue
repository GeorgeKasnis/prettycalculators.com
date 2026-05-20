<template>
    <div>
        <div class="section-label">Assets</div>
        <CalcInputStack>
            <CalcInputRow label="Cash & Savings"    unit="$" v-model="cashSavings"   placeholder="e.g. 10000" type="number" />
            <CalcInputRow label="Investments"        unit="$" v-model="investments"   placeholder="e.g. 25000" type="number" />
            <CalcInputRow label="Real Estate"        unit="$" v-model="realEstate"    placeholder="e.g. 300000" type="number" />
            <CalcInputRow label="Vehicles"           unit="$" v-model="vehicles"      placeholder="e.g. 15000" type="number" />
            <CalcInputRow label="Other Assets"       unit="$" v-model="otherAssets"   placeholder="e.g. 5000" type="number" />
        </CalcInputStack>

        <div class="section-label">Liabilities</div>
        <CalcInputStack>
            <CalcInputRow label="Mortgage Balance"   unit="$" v-model="mortgage"      placeholder="e.g. 220000" type="number" />
            <CalcInputRow label="Car Loans"          unit="$" v-model="carLoans"      placeholder="e.g. 8000" type="number" />
            <CalcInputRow label="Credit Card Debt"   unit="$" v-model="creditCards"   placeholder="e.g. 3000" type="number" />
            <CalcInputRow label="Student Loans"      unit="$" v-model="studentLoans"  placeholder="e.g. 20000" type="number" />
            <CalcInputRow label="Other Debt"         unit="$" v-model="otherDebt"     placeholder="e.g. 0" type="number" />
        </CalcInputStack>

        <CalcBtn :showClear="calculated" @click="calculate" @clear="clear">Calculate Net Worth →</CalcBtn>

        <CalcOutput :show="calculated" title="Net Worth" :color="netWorthColor" :meta="netWorthLabel">
            <CalcOutputCell label="Total Assets"      :value="totalAssets"      unit="$" />
            <CalcOutputCell label="Total Liabilities" :value="totalLiabilities" unit="$" />
            <CalcOutputCell label="Net Worth"         :value="netWorth"         unit="$" />
        </CalcOutput>
    </div>
</template>

<script setup>
const cashSavings  = ref('')
const investments  = ref('')
const realEstate   = ref('')
const vehicles     = ref('')
const otherAssets  = ref('')
const mortgage     = ref('')
const carLoans     = ref('')
const creditCards  = ref('')
const studentLoans = ref('')
const otherDebt    = ref('')
const calculated      = ref(false)
const totalAssets     = ref('')
const totalLiabilities = ref('')
const netWorth        = ref('')
const netWorthColor   = ref('#8FD89B')
const netWorthLabel   = ref('')

function v(r) { return parseFloat(r.value) || 0 }

function calculate() {
    const assets = v(cashSavings) + v(investments) + v(realEstate) + v(vehicles) + v(otherAssets)
    const debts  = v(mortgage)    + v(carLoans)    + v(creditCards) + v(studentLoans) + v(otherDebt)
    const nw     = assets - debts

    totalAssets.value      = assets.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
    totalLiabilities.value = debts.toLocaleString('en-US',  { minimumFractionDigits: 2, maximumFractionDigits: 2 })
    netWorth.value         = nw.toLocaleString('en-US',     { minimumFractionDigits: 2, maximumFractionDigits: 2 })
    netWorthColor.value    = nw >= 0 ? '#8FD89B' : '#FF8E7A'
    netWorthLabel.value    = nw >= 0 ? 'Positive' : 'Negative'
    calculated.value = true
}

function clear() {
    cashSavings.value = investments.value = realEstate.value = vehicles.value = otherAssets.value = ''
    mortgage.value = carLoans.value = creditCards.value = studentLoans.value = otherDebt.value = ''
    totalAssets.value = totalLiabilities.value = netWorth.value = ''
    netWorthColor.value = '#8FD89B'
    netWorthLabel.value = ''
    calculated.value = false
}
</script>

<style scoped>
.section-label {
    font-family: 'Space Mono', monospace;
    font-size: 10px;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.14em;
    opacity: 0.4;
    margin-bottom: 8px;
    margin-top: 4px;
}
</style>
