<template>
    <div>
        <UiFormContainer title="Manhattan Distance Calculator" :result="result" @clear-form="clearEverything(form)">
            <TabGroup :selectedIndex="selectedTab" @change="changeTab">
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
                        </div>
                    </TabPanel>
                    <TabPanel>
                        <div class="flex flex-col gap-small relative">
                            <InputsTextInput label="First Point X" aria-label="First Point" v-model="form.firstPointX" measurementUnit="x" />
                            <InputsTextInput aria-label="First Point Y" v-model="form.firstPointY" measurementUnit="y" />
                            <InputsTextInput label="Second Point X" aria-label="First Point" v-model="form.secondPointX" measurementUnit="x" />
                            <InputsTextInput aria-label="Second Point Y" v-model="form.secondPointY" measurementUnit="y" />
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
                        </div>
                    </TabPanel>
                </TabPanels>
            </TabGroup>
        </UiFormContainer>
    </div>
</template>

<script setup>
import { ref } from "vue";
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
            },
            selectedTab: 0,
        };
    },
    methods: {
        changeTab(index) {
            this.selectedTab = index;
        },
    },
    computed: {
        result() {
            const dimension = this.selectedTab + 1;
            const fields = Array.from({ length: dimension }, (_, i) => `firstPoint${"XYZT"[i]}`);

            // Calculate Manhattan distance
            let manhattanDistance = 0;
            for (const field of fields) {
                manhattanDistance += Math.abs(this.form[field] - this.form[field.replace("first", "second")]);
            }

            let result = manhattanDistance;
            if (dimension == 1) {
                return globalAllKeysAreNotNull(this.form, ["firstPointY", "firstPointZ", "firstPointT", "secondPointY", "secondPointZ", "secondPointT"]) && !isNaN(result) && result >= 0 ? result.toFixed() : "";
            } else if (dimension == 2) {
                return globalAllKeysAreNotNull(this.form, ["firstPointZ", "firstPointT", "secondPointZ", "secondPointT"]) && !isNaN(result) && result >= 0 ? result.toFixed() : "";
            } else if (dimension == 3) {
                return globalAllKeysAreNotNull(this.form, ["firstPointT", "secondPointT"]) && !isNaN(result) && result >= 0 ? result.toFixed() : "";
            } else if (dimension == 4) {
                return globalAllKeysAreNotNull(this.form) && !isNaN(result) && result >= 0 ? result.toFixed() : "";
            }
        },
    },
};
</script>
