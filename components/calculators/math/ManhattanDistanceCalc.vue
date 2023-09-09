<template>
    <div>
        <UiFormErrorContainer :errors="form.errors">
            <UiFormContainer title="Manhattan Distance Calculator">
                <TabGroup>
                    <TabList class="flex gap-big mt-big">
                        <Tab @click="clearEverything(form)" class="!outline-none wf aria-selected:font-bold transition-all text-start tracking-wider">1D</Tab>
                        <Tab @click="clearEverything(form)" class="!outline-none wf aria-selected:font-bold transition-all text-start tracking-wider">2D</Tab>
                        <Tab @click="clearEverything(form)" class="!outline-none wf aria-selected:font-bold transition-all text-start tracking-wider">3D</Tab>
                        <Tab @click="clearEverything(form)" class="!outline-none wf aria-selected:font-bold transition-all text-start tracking-wider">4D</Tab>
                    </TabList>
                    <TabPanels>
                        <TabPanel>
                            <div class="flex flex-col gap-small relative">
                                <InputsTextInput label="First Point X" aria-label="First Point" v-model="form.firstPointX" measurementUnit="x" />
                                <InputsTextInput label="Second Point X" aria-label="First Point" v-model="form.secondPointX" measurementUnit="x" />
                                <ButtonsCalcBtn @click="calculate('1D')" @keyup.enter="calculate" />
                                <div class="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-white bg-black w-full h-full grid p-big clip-path-circle" :class="form.result != null ? 'active' : ''">
                                    <UiBaseResult :hasHtml="true">
                                        <div class="text-white">Distance: {{ form.result }}</div>
                                    </UiBaseResult>
                                    <button @click="clearEverything(form)" class="absolute right-2 top-2 h-4 w-4 z-10" aria-label="Close Results Button">x</button>
                                </div>
                            </div>
                        </TabPanel>
                        <TabPanel>
                            <div class="flex flex-col gap-small relative">
                                <InputsTextInput label="First Point X" aria-label="First Point" v-model="form.firstPointX" measurementUnit="x" />
                                <InputsTextInput aria-label="First Point Y" v-model="form.firstPointY" measurementUnit="y" />
                                <InputsTextInput label="Second Point X" aria-label="First Point" v-model="form.secondPointX" measurementUnit="x" />
                                <InputsTextInput aria-label="Second Point Y" v-model="form.secondPointY" measurementUnit="y" />
                                <ButtonsCalcBtn @click="calculate('2D')" @keyup.enter="calculate" />
                                <div class="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-white bg-black w-full h-full grid p-big clip-path-circle" :class="form.result != null ? 'active' : ''">
                                    <UiBaseResult :hasHtml="true">
                                        <div class="text-white">Distance: {{ form.result }}</div>
                                    </UiBaseResult>
                                    <button @click="clearEverything(form)" class="absolute right-2 top-2 h-4 w-4 z-10" aria-label="Close Results Button">x</button>
                                </div>
                            </div>
                        </TabPanel>
                        <TabPanel>
                            <div class="flex flex-col gap-small relative">
                                <InputsTextInput label="First Point X" aria-label="First Point" v-model="form.firstPointX" measurementUnit="x" />
                                <InputsTextInput aria-label="First Point Y" v-model="form.firstPointY" measurementUnit="y" />
                                <InputsTextInput aria-label="First Point Z" v-model="form.firstPointZ" measurementUnit="z" />
                                <InputsTextInput label="Second Point X" aria-label="First Point" v-model="form.secondPointX" measurementUnit="x" />
                                <InputsTextInput aria-label="Second Point Y" v-model="form.secondPointY" measurementUnit="y" />
                                <InputsTextInput aria-label="Second Point Z" v-model="form.secondPointZ" measurementUnit="z" />
                                <ButtonsCalcBtn @click="calculate('3D')" @keyup.enter="calculate" />
                                <div class="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-white bg-black w-full h-full grid p-big clip-path-circle" :class="form.result != null ? 'active' : ''">
                                    <UiBaseResult :hasHtml="true">
                                        <div class="text-white">Distance: {{ form.result }}</div>
                                    </UiBaseResult>
                                    <button @click="clearEverything(form)" class="absolute right-2 top-2 h-4 w-4 z-10" aria-label="Close Results Button">x</button>
                                </div>
                            </div>
                        </TabPanel>
                        <TabPanel>
                            <div class="flex flex-col gap-small relative">
                                <InputsTextInput label="First Point X" aria-label="First Point" v-model="form.firstPointX" measurementUnit="x" />
                                <InputsTextInput aria-label="First Point Y" v-model="form.firstPointY" measurementUnit="y" />
                                <InputsTextInput aria-label="First Point Z" v-model="form.firstPointZ" measurementUnit="z" />
                                <InputsTextInput aria-label="First Point T" v-model="form.firstPointT" measurementUnit="t" />
                                <InputsTextInput label="Second Point X" aria-label="First Point" v-model="form.secondPointX" measurementUnit="x" />
                                <InputsTextInput aria-label="Second Point Y" v-model="form.secondPointY" measurementUnit="y" />
                                <InputsTextInput aria-label="Second Point Z" v-model="form.secondPointZ" measurementUnit="z" />
                                <InputsTextInput aria-label="Second Point T" v-model="form.secondPointT" measurementUnit="t" />
                                <ButtonsCalcBtn @click="calculate('4D')" @keyup.enter="calculate" />
                                <div class="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-white bg-black w-full h-full grid p-big clip-path-circle" :class="form.result != null ? 'active' : ''">
                                    <UiBaseResult :hasHtml="true">
                                        <div class="text-white">Distance: {{ form.result }}</div>
                                    </UiBaseResult>
                                    <button @click="clearEverything(form)" class="absolute right-2 top-2 h-4 w-4 z-10" aria-label="Close Results Button">x</button>
                                </div>
                            </div>
                        </TabPanel>
                    </TabPanels>
                </TabGroup>
            </UiFormContainer>
        </UiFormErrorContainer>
    </div>
</template>

<script setup>
import { TabGroup, TabList, Tab, TabPanels, TabPanel } from "@headlessui/vue";
</script>

<script>
export default {
    data() {
        return {
            form: {
                firstPointX: null,
                firstPointY: null,
                firstPointZ: null,
                firstPointT: null,
                secondPointX: null,
                secondPointY: null,
                secondPointZ: null,
                secondPointT: null,

                result: null,
                errors: "",
            },
        };
    },
    methods: {
        calculate(val) {
            this.form.errors = "";

            // Validate input
            if (val === "1D" || val === "2D" || val === "3D" || val === "4D") {
                const dimension = parseInt(val);
                const fields = Array.from({ length: dimension }, (_, i) => `firstPoint${"XYZT"[i]}`);
                if (fields.some((field) => this.form[field] === null)) {
                    this.form.errors = "All fields are required";
                    return;
                }

                // Calculate Manhattan distance
                let manhattanDistance = 0;
                for (const field of fields) {
                    manhattanDistance += Math.abs(this.form[field] - this.form[field.replace("first", "second")]);
                }

                this.form.result = manhattanDistance;
            } else {
                this.form.errors = "Invalid dimension selected";
            }
        },
        clearEverything() {
            for (let key in this.form) {
                this.form[key] = null;
            }
        },
    },
};
</script>
