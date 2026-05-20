<template>
    <div>
        <CalcInputStack>
            <CalcInputRow label="Amount" unit="$" v-model="amount" placeholder="e.g. 100" type="number" />
            <CalcInputRow label="VAT Rate" unit="%" v-model="vatRate" placeholder="e.g. 20" type="number" />
        </CalcInputStack>

        <div class="mode-wrap">
            <div class="mode-label">Mode</div>
            <div class="mode-btns">
                <button class="mode-btn" :class="{ 'mode-active': mode === 'add' }" @click="mode = 'add'">Add VAT (excl. → incl.)</button>
                <button class="mode-btn" :class="{ 'mode-active': mode === 'remove' }" @click="mode = 'remove'">Remove VAT (incl. → excl.)</button>
            </div>
        </div>

        <CalcBtn :showClear="calculated" @click="calculate" @clear="clear">Calculate VAT →</CalcBtn>

        <CalcOutput :show="calculated" title="VAT Breakdown" color="#d4edda">
            <CalcOutputCell label="Net (excl. VAT)"  :value="net"    unit="$" />
            <CalcOutputCell label="VAT Amount"        :value="vatAmt" unit="$" />
            <CalcOutputCell label="Gross (incl. VAT)" :value="gross"  unit="$" />
        </CalcOutput>
    </div>
</template>

<script setup>
const amount     = ref('')
const vatRate    = ref('20')
const mode       = ref('add')
const calculated = ref(false)
const net        = ref('')
const vatAmt     = ref('')
const gross      = ref('')

function calculate() {
    const a = parseFloat(amount.value)
    const r = parseFloat(vatRate.value)
    if (isNaN(a) || isNaN(r) || a <= 0 || r < 0) return

    let n, v, g
    if (mode.value === 'add') {
        n = a
        v = a * r / 100
        g = a + v
    } else {
        g = a
        n = a / (1 + r / 100)
        v = g - n
    }

    net.value    = n.toFixed(2)
    vatAmt.value = v.toFixed(2)
    gross.value  = g.toFixed(2)
    calculated.value = true
}

function clear() {
    amount.value = ''
    vatRate.value = '20'
    net.value = vatAmt.value = gross.value = ''
    calculated.value = false
}
</script>

<style scoped>
.mode-wrap {
    border: 3px solid #0a0a0a;
    background: #fff;
    margin-bottom: 18px;
}
.mode-label {
    font-family: 'Space Mono', monospace;
    font-size: 10px;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.14em;
    opacity: 0.4;
    padding: 12px 16px 8px;
}
.mode-btns {
    display: flex;
    border-top: 1px solid rgba(10,10,10,0.1);
}
.mode-btn {
    flex: 1;
    padding: 13px 8px;
    background: #fff;
    border: none;
    border-right: 1.5px solid rgba(10,10,10,0.12);
    cursor: pointer;
    font-family: 'Space Grotesk', sans-serif;
    font-size: 13px;
    font-weight: 700;
    color: rgba(10,10,10,0.45);
    transition: background 0.08s, color 0.08s;
}
.mode-btn:last-child { border-right: none; }
.mode-btn:hover:not(.mode-active) { background: rgba(10,10,10,0.04); color: #0a0a0a; }
.mode-active { background: #0a0a0a !important; color: #d4edda !important; }
</style>
