<template>
    <div>
        <!-- Course table -->
        <div class="gpa-table">
            <div class="gpa-table-head">
                <span>Course name</span>
                <span>Grade</span>
                <span>Credits</span>
                <span></span>
            </div>
            <div v-for="(course, i) in courses" :key="i" class="gpa-row">
                <input
                    v-model="course.name"
                    class="gpa-input"
                    placeholder="e.g. Calculus I"
                    type="text"
                    maxlength="40"
                />
                <select v-model="course.grade" class="gpa-select">
                    <option v-for="g in GRADES" :key="g.value" :value="g.value">{{ g.value }}</option>
                </select>
                <input
                    v-model="course.credits"
                    class="gpa-input gpa-input--num"
                    placeholder="3"
                    type="number"
                    min="0.5"
                    max="12"
                    step="0.5"
                />
                <button
                    v-if="courses.length > 1"
                    class="gpa-remove"
                    type="button"
                    @click="removeCourse(i)"
                    title="Remove course"
                >×</button>
                <span v-else class="gpa-remove gpa-remove--ghost"></span>
            </div>
        </div>

        <button
            v-if="courses.length < 20"
            class="gpa-add"
            type="button"
            @click="addCourse"
        >+ Add Course</button>

        <CalcBtn :showClear="calculated" @click="calculate" @clear="clear">Calculate GPA →</CalcBtn>

        <CalcOutput :show="calculated" title="Your GPA" :meta="`${outTotalCredits} credit hours`" color="#f5e642">
            <CalcOutputCell label="Cumulative GPA"   :value="outGpa" />
            <CalcOutputCell label="Letter grade"     :value="outLetter" />
            <CalcOutputCell label="Total credits"    :value="outTotalCredits" />
            <CalcOutputCell label="Quality points"   :value="outQPoints" />
        </CalcOutput>

        <!-- Grade breakdown -->
        <div v-if="calculated && breakdown.length" class="gpa-breakdown">
            <div class="gpa-break-head">Grade breakdown</div>
            <div class="gpa-break-row gpa-break-row--header">
                <span>Grade</span>
                <span>Points</span>
                <span>Courses</span>
                <span>Credits</span>
            </div>
            <div v-for="row in breakdown" :key="row.grade" class="gpa-break-row">
                <span class="gb-grade">{{ row.grade }}</span>
                <span class="gb-pts">{{ row.points.toFixed(1) }}</span>
                <span class="gb-count">{{ row.count }}</span>
                <span class="gb-cred">{{ row.credits }}</span>
            </div>
        </div>
    </div>
</template>

<script setup>
const GRADES = [
    { value: 'A+',  points: 4.0 },
    { value: 'A',   points: 4.0 },
    { value: 'A-',  points: 3.7 },
    { value: 'B+',  points: 3.3 },
    { value: 'B',   points: 3.0 },
    { value: 'B-',  points: 2.7 },
    { value: 'C+',  points: 2.3 },
    { value: 'C',   points: 2.0 },
    { value: 'C-',  points: 1.7 },
    { value: 'D+',  points: 1.3 },
    { value: 'D',   points: 1.0 },
    { value: 'D-',  points: 0.7 },
    { value: 'F',   points: 0.0 },
]

const GRADE_MAP = Object.fromEntries(GRADES.map(g => [g.value, g.points]))

function gpaToLetter(gpa) {
    if (gpa >= 3.85) return 'A'
    if (gpa >= 3.5)  return 'A−'
    if (gpa >= 3.15) return 'B+'
    if (gpa >= 2.85) return 'B'
    if (gpa >= 2.5)  return 'B−'
    if (gpa >= 2.15) return 'C+'
    if (gpa >= 1.85) return 'C'
    if (gpa >= 1.5)  return 'C−'
    if (gpa >= 1.15) return 'D+'
    if (gpa >= 0.85) return 'D'
    if (gpa > 0)     return 'D−'
    return 'F'
}

const makeCourse = () => ({ name: '', grade: 'A', credits: '3' })

const courses = ref([makeCourse(), makeCourse(), makeCourse(), makeCourse()])

const calculated    = ref(false)
const outGpa        = ref('')
const outLetter     = ref('')
const outTotalCredits = ref('')
const outQPoints    = ref('')
const breakdown     = ref([])

function addCourse() {
    courses.value.push(makeCourse())
}

function removeCourse(i) {
    courses.value.splice(i, 1)
}

function calculate() {
    let totalPoints  = 0
    let totalCredits = 0

    const gradeGroups = {}

    for (const course of courses.value) {
        const credits = parseFloat(course.credits) || 3
        const pts     = GRADE_MAP[course.grade] ?? 0
        totalPoints  += pts * credits
        totalCredits += credits

        if (!gradeGroups[course.grade]) {
            gradeGroups[course.grade] = { grade: course.grade, points: pts, count: 0, credits: 0 }
        }
        gradeGroups[course.grade].count++
        gradeGroups[course.grade].credits += credits
    }

    if (totalCredits === 0) return

    const gpa = totalPoints / totalCredits

    outGpa.value          = gpa.toFixed(2)
    outLetter.value       = gpaToLetter(gpa)
    outTotalCredits.value = `${totalCredits} hrs`
    outQPoints.value      = totalPoints.toFixed(1)

    breakdown.value = Object.values(gradeGroups)
        .sort((a, b) => b.points - a.points)

    calculated.value = true
}

function clear() {
    courses.value = [makeCourse(), makeCourse(), makeCourse(), makeCourse()]
    calculated.value = false
    breakdown.value = []
}
</script>

<style scoped>
/* Course table */
.gpa-table {
    border: 3px solid #0a0a0a;
    background: #fff;
    margin-bottom: 0;
}

.gpa-table-head {
    display: grid;
    grid-template-columns: 1fr 90px 80px 36px;
    background: #0a0a0a;
    color: #fff;
    font-family: 'Space Mono', monospace;
    font-size: 9px;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.12em;
    padding: 9px 14px;
    gap: 8px;
}

.gpa-row {
    display: grid;
    grid-template-columns: 1fr 90px 80px 36px;
    border-top: 1px solid rgba(10, 10, 10, 0.1);
    align-items: center;
    gap: 8px;
    padding: 0 14px;
}

.gpa-input {
    font-family: 'Space Grotesk', sans-serif;
    font-size: 14px;
    font-weight: 500;
    color: #0a0a0a;
    background: transparent;
    border: none;
    outline: none;
    padding: 11px 0;
    width: 100%;
    min-width: 0;
    -moz-appearance: textfield;
}
.gpa-input::-webkit-outer-spin-button,
.gpa-input::-webkit-inner-spin-button { -webkit-appearance: none; }
.gpa-input::placeholder { color: rgba(10, 10, 10, 0.2); }
.gpa-input:focus { color: #5c3bef; }

.gpa-input--num {
    font-weight: 700;
    text-align: center;
}

.gpa-select {
    font-family: 'Space Grotesk', sans-serif;
    font-size: 14px;
    font-weight: 700;
    color: #0a0a0a;
    background: transparent;
    border: none;
    outline: none;
    cursor: pointer;
    padding: 11px 4px;
    width: 100%;
    -webkit-appearance: none;
    appearance: none;
}
.gpa-select:focus { color: #5c3bef; }

.gpa-remove {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 28px;
    height: 28px;
    background: none;
    border: none;
    cursor: pointer;
    font-size: 18px;
    color: #0a0a0a;
    opacity: 0.25;
    transition: opacity 0.1s;
    line-height: 1;
    padding: 0;
    flex-shrink: 0;
}
.gpa-remove:hover { opacity: 0.8; }
.gpa-remove--ghost { visibility: hidden; }

/* Add course button */
.gpa-add {
    display: block;
    width: 100%;
    padding: 12px;
    background: #fff;
    color: #0a0a0a;
    border: 3px solid #0a0a0a;
    border-top: none;
    cursor: pointer;
    font-family: 'Space Mono', monospace;
    font-size: 10px;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.12em;
    opacity: 0.5;
    transition: opacity 0.1s, background 0.1s;
    margin-bottom: 4px;
}
.gpa-add:hover { opacity: 1; background: rgba(10, 10, 10, 0.04); }

/* Breakdown table */
.gpa-breakdown {
    margin-top: 16px;
    border: 3px solid #0a0a0a;
}

.gpa-break-head {
    background: #0a0a0a;
    color: #f5e642;
    font-family: 'Space Mono', monospace;
    font-size: 10px;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.14em;
    padding: 10px 16px;
}

.gpa-break-row {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr;
    border-top: 1px solid rgba(10, 10, 10, 0.1);
    padding: 9px 16px;
    font-size: 13px;
    font-weight: 500;
}

.gpa-break-row--header {
    font-family: 'Space Mono', monospace;
    font-size: 9px;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.1em;
    opacity: 0.4;
    background: rgba(10, 10, 10, 0.03);
}

.gb-grade { font-weight: 700; }
.gb-pts   { opacity: 0.6; }
.gb-cred  { font-weight: 600; }
</style>
