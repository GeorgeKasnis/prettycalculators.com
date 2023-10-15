<template>
    <UiFormContainer title="Pizza Calculator"  :hide-result="true">
        <TabGroup :selectedIndex="selectedTab" @change="changeTab">
            <TabList class="flex gap-big mt-big">
                <Tab @click="clearEverything(form)" class="!outline-none wf aria-selected:font-bold transition-all text-start tracking-wider">Italian</Tab>
                <Tab @click="clearEverything(form)" class="!outline-none wf aria-selected:font-bold transition-all text-start tracking-wider">American</Tab>
            </TabList>
            <TabPanels>
                <TabPanel>
                    <div class="flex flex-col gap-small relative">
                        <InputsTextInput label="Number of pizzas" aria-label="Number of pizzas" v-model="form.numberOfPizza" placeholder="1" />
                        <InputsTextInput aria-label="Weight of Doughball" v-model="form.weightOrDoughball" label="Weight of Doughball" placeholder="400" measurementUnit="g" />
                        <InputsTextInput aria-label="Amount Of Water (%)" v-model="form.amountOfWater" label="Amount Of Water (%)" placeholder="65" measurementUnit="ml" />
                    </div>

                    <div class="mt-big" v-if="result">
                        <div class="mb-small text-big">Ingredients</div>
                        <ul class="columns-2">
                            <li class="text-sm mb-small" v-if="flour">Flour : {{ flour }} g</li>
                            <li class="text-sm mb-small" v-if="water">Water : {{ water }} ml</li>
                            <li class="text-sm mb-small" v-if="salt">Salt : {{ salt }} g</li>
                            <li class="text-sm mb-small" v-if="yeast">Dry Yeast : {{ yeast }} g</li>
                        </ul>
                    </div>
                   <button class="mt-small" @click="clearEverything(form)" v-if="result">Clear</button>
                </TabPanel>
                <TabPanel>
                    <div class="flex flex-col gap-small relative">
                        <InputsTextInput label="Number of pizzas" aria-label="Number of pizzas" v-model="form.numberOfPizza" placeholder="1" />
                        <InputsTextInput aria-label="Weight of Doughball" v-model="form.weightOrDoughball" label="Weight of Doughball" placeholder="400" measurementUnit="g" />
                        <InputsTextInput aria-label="Amount Of Water (%)" v-model="form.amountOfWater" label="Amount Of Water (%)" placeholder="62" measurementUnit="ml" />
                    </div>
                    <div class="mt-big" v-if="result">
                        <div class="mb-small text-big">Ingredients</div>
                        <ul class="columns-2">
                            <li class="text-sm mb-small" v-if="flour">Flour : {{ flour }} g</li>
                            <li class="text-sm mb-small" v-if="water">Water : {{ water }} ml</li>
                            <li class="text-sm mb-small" v-if="salt">Salt : {{ salt }} g</li>
                            <li class="text-sm mb-small" v-if="yeast">Dry Yeast : {{ yeast }} g</li>
                            <li class="text-sm mb-small" v-if="oil">Oil : {{ oil }} ml</li>
                            <li class="text-sm mb-small" v-if="sugar">Sugar : {{ sugar }} g</li>
                            <li class="text-sm mb-small" v-if="starter">Starter : {{ starter }} g</li>
                        </ul>
                    </div>
                   <button class="mt-small" @click="clearEverything(form)" v-if="result">Clear</button>
                </TabPanel>
            </TabPanels>
        </TabGroup>
    </UiFormContainer>
</template>

<script setup>
import { TabGroup, TabList, Tab, TabPanels, TabPanel } from "@headlessui/vue";
</script>

<script>
export default {
    data() {
        return {
            form: {
                numberOfPizza: null,
                weightOrDoughball: null,
                amountOfWater: null,
            },
            flour: "",
            water: "",
            salt: "",
            yeast: "",
            oil: "",
            sugar: "",
            starter: "",
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
            if (this.selectedTab == 0) {
                this.flour = parseInt((this.form.weightOrDoughball * 59.5) / 100) * this.form.numberOfPizza;
                this.water = ((this.flour * this.form.amountOfWater) / 100).toFixed(0);
                this.salt = (((this.form.weightOrDoughball * 1.8) / 100) * this.form.numberOfPizza).toFixed(1);
                this.yeast = (((this.form.weightOrDoughball * 0.05) / 100) * this.form.numberOfPizza).toFixed(1);

                return globalAllKeysAreNotNull(this.form) ? true : "";
            } else {
                this.flour = parseInt((this.form.weightOrDoughball * 58) / 100) * this.form.numberOfPizza;
                this.water = ((this.flour * this.form.amountOfWater) / 100).toFixed(0);
                this.salt = (((this.form.weightOrDoughball * 1.15) / 100) * this.form.numberOfPizza).toFixed(1);
                this.yeast = (((this.form.weightOrDoughball * 0.235) / 100) * this.form.numberOfPizza).toFixed(1);
                this.oil = (((this.form.weightOrDoughball * 1.8) / 100) * this.form.numberOfPizza).toFixed(1);
                this.sugar = (((this.form.weightOrDoughball * 0.6) / 100) * this.form.numberOfPizza).toFixed(1);
                return globalAllKeysAreNotNull(this.form) ? true : "";
            }
        },
    },
};
</script>
