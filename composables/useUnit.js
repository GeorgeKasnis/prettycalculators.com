const UNIT_KEY = 'prettycalculators_unit'

const UNIT_TABS = [
    { label: 'Metric', value: 'metric' },
    { label: 'Imperial', value: 'imperial' },
]

export const useUnit = () => {
    const unit = useState('unit', () => 'metric')

    // Sync from localStorage on mount (client-only)
    onMounted(() => {
        const saved = localStorage.getItem(UNIT_KEY)
        if (saved) unit.value = saved
    })

    // Persist changes to localStorage
    watch(unit, (val) => {
        if (process.client) localStorage.setItem(UNIT_KEY, val)
    })

    return {
        unit,
        UNIT_TABS,
        lbsToKg:  (lbs)    => parseFloat(lbs) * 0.453592,
        kgToLbs:  (kg)     => kg * 2.20462,
        inToCm:   (i)      => parseFloat(i) * 2.54,
        ftInToCm: (ft, i)  => ((parseFloat(ft) || 0) * 12 + (parseFloat(i) || 0)) * 2.54,
    }
}
