<template>
    <CalcInputStack>
        <CalcInputRow label="Bill Amount" unit="$" v-model="bill" placeholder="e.g. 48.50" type="number" />
        <CalcInputRow label="Number of People" unit="ppl" v-model="people" placeholder="e.g. 4" type="number" />
    </CalcInputStack>

    <!-- Tip % quick-select -->
    <div class="tip-pct-wrap">
        <div class="tip-pct-label">Tip Percentage</div>
        <div class="tip-pct-btns">
            <button
                v-for="pct in PRESETS"
                :key="pct"
                class="tip-pct-btn"
                :class="{ 'tip-pct-active': tipPct === pct && !customMode }"
                @click="setPreset(pct)"
            >{{ pct }}%</button>
            <input
                v-model="customPct"
                class="tip-pct-custom"
                :class="{ 'tip-pct-active': customMode }"
                type="number"
                inputmode="decimal"
                placeholder="Custom"
                @focus="customMode = true"
                @input="customMode = true"
            />
        </div>
    </div>

    <CalcBtn :showClear="calculated" @click="calculate" @clear="clear">Calculate Tip →</CalcBtn>

    <CalcOutput :show="calculated" title="Tip Breakdown">
        <CalcOutputCell label="Tip Amount"       :value="tipAmt"       unit="$" />
        <CalcOutputCell label="Total Bill"       :value="totalAmt"     unit="$" />
        <CalcOutputCell label="Tip per Person"   :value="tipPerPerson"  unit="$" />
        <CalcOutputCell label="Total per Person" :value="totalPerPerson" unit="$" />
    </CalcOutput>
</template>

<script setup>
const bill       = ref('')
const people     = ref('1')
const tipPct     = ref(18)
const customPct  = ref('')
const customMode = ref(false)
const calculated = ref(false)

const tipAmt        = ref('')
const totalAmt      = ref('')
const tipPerPerson  = ref('')
const totalPerPerson = ref('')

const PRESETS = [10, 15, 18, 20, 25]

function setPreset(pct) {
    tipPct.value = pct
    customMode.value = false
    customPct.value = ''
}

function calculate() {
    const b = parseFloat(bill.value)
    const n = parseInt(people.value) || 1
    const pct = customMode.value ? parseFloat(customPct.value) : tipPct.value
    if (isNaN(b) || b <= 0 || isNaN(pct)) return

    const tip   = b * pct / 100
    const total = b + tip
    tipAmt.value         = tip.toFixed(2)
    totalAmt.value       = total.toFixed(2)
    tipPerPerson.value   = (tip / n).toFixed(2)
    totalPerPerson.value = (total / n).toFixed(2)
    calculated.value = true
}

function clear() {
    bill.value = ''
    people.value = '1'
    tipPct.value = 18
    customPct.value = ''
    customMode.value = false
    tipAmt.value = totalAmt.value = tipPerPerson.value = totalPerPerson.value = ''
    calculated.value = false
}
</script>

<style scoped>
.tip-pct-wrap {
    border: 3px solid #0a0a0a;
    background: #fff;
    margin-bottom: 18px;
}

.tip-pct-label {
    font-family: 'Space Mono', monospace;
    font-size: 10px;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.14em;
    opacity: 0.4;
    padding: 12px 16px 8px;
}

.tip-pct-btns {
    display: flex;
    border-top: 1px solid rgba(10,10,10,0.1);
}

.tip-pct-btn {
    flex: 1;
    padding: 14px 8px;
    background: #fff;
    border: none;
    border-right: 1.5px solid rgba(10,10,10,0.12);
    cursor: pointer;
    font-family: 'Space Grotesk', sans-serif;
    font-size: 15px;
    font-weight: 700;
    color: rgba(10,10,10,0.45);
    transition: background 0.08s, color 0.08s;
}
.tip-pct-btn:hover:not(.tip-pct-active) { background: rgba(10,10,10,0.04); color: #0a0a0a; }
.tip-pct-active { background: #0a0a0a !important; color: #f5e642 !important; }

.tip-pct-custom {
    flex: 1;
    padding: 14px 10px;
    background: #fff;
    border: none;
    border-left: 1.5px solid rgba(10,10,10,0.12);
    font-family: 'Space Grotesk', sans-serif;
    font-size: 15px;
    font-weight: 700;
    color: #0a0a0a;
    text-align: center;
    outline: none;
    -moz-appearance: textfield;
    transition: background 0.08s;
}
.tip-pct-custom::-webkit-outer-spin-button,
.tip-pct-custom::-webkit-inner-spin-button { -webkit-appearance: none; }
.tip-pct-custom::placeholder { color: rgba(10,10,10,0.25); font-weight: 400; font-size: 12px; }
</style>
