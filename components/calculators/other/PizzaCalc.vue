<template>
    <UiFormErrorContainer :errors="form.errors">
        <UiFormContainer title="Pizza Calculator">
            <TabGroup>
                <TabList class="flex gap-big  mt-big">
                    <Tab  @click="clearEverything(form)" class="!outline-none wf aria-selected:font-bold transition-all text-start tracking-wider">Italian</Tab>
                    <Tab  @click="clearEverything(form)" class="!outline-none wf aria-selected:font-bold transition-all text-start tracking-wider">American</Tab>
                </TabList>
                <TabPanels>
                    <TabPanel>
                        <div class="flex flex-col gap-small relative">
                            <InputsTextInput label="Number of pizzas" aria-label="Number of pizzas" v-model="numberOfPizza" />
                            <InputsTextInput aria-label="Weight of Doughball" v-model="weightOrDoughball" label="Weight of Doughball" measurementUnit="g" />
                            <InputsTextInput aria-label="Amount Of Water (%)" v-model="amountOfWater" label="Amount Of Water (%)" measurementUnit="ml" />
                            <ButtonsCalcBtn @click="calculate('italian')" @keyup.enter="calculate" />
                            <div class="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-white bg-black w-full h-full grid p-big clip-path-circle" :class="form.result ? 'active' : ''">
                                <UiBaseResult :hasHtml="true" v-if="form.result">
                                    <div class="text-white">
                                        <div class="mb-small text-big">Ingredients</div>
                                        <ul class="columns-2">
                                            <li class="text-sm mb-small" v-if="flour">Flour : {{ flour }} g</li>
                                            <li class="text-sm mb-small" v-if="water">Water : {{ water }} ml</li>
                                            <li class="text-sm mb-small" v-if="salt">Salt : {{ salt }} g</li>
                                            <li class="text-sm mb-small" v-if="yeast">Dry Yeast : {{ yeast }} g</li>
                                        </ul>
                                    </div>
                                </UiBaseResult>
                                <button @click="clearEverything(form)" class="absolute right-2 top-2 h-4 w-4 z-10" aria-label="Close Results Button">x</button>
                            </div>
                        </div>
                    </TabPanel>
                    <TabPanel>
                        <div class="flex flex-col gap-small relative">
                            <InputsTextInput label="Number of pizzas" aria-label="Number of pizzas" v-model="numberOfPizza" />
                            <InputsTextInput aria-label="Weight of Doughball" v-model="weightOrDoughball" label="Weight of Doughball" measurementUnit="g" />
                            <InputsTextInput aria-label="Amount Of Water (%)" v-model="americanAmountOfWater" label="Amount Of Water (%)" measurementUnit="ml" />
                            <ButtonsCalcBtn @click="calculate('american')" @keyup.enter="calculate" />
                            <div class="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-white bg-black w-full h-full grid p-big clip-path-circle" :class="form.result ? 'active' : ''">
                                <UiBaseResult :hasHtml="true" v-if="form.result">
                                    <div class="text-white">
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
                                </UiBaseResult>
                                <button @click="clearEverything(form)" class="absolute right-2 top-2 h-4 w-4 z-10" aria-label="Close Results Button">x</button>
                            </div>
                        </div>
                    </TabPanel>
                </TabPanels>
            </TabGroup>
        </UiFormContainer>
    </UiFormErrorContainer>
</template>

<script setup>
import { TabGroup, TabList, Tab, TabPanels, TabPanel } from "@headlessui/vue";
</script>

<script>
export default {
    data() {
        return {
            form: {
                result: null,
                errors: null,
            },
            italian: {},
            numberOfPizza: 1,
            weightOrDoughball: 400,
            amountOfWater: 65,
            americanAmountOfWater: 62,
            flour: "",
            water: "",
            salt: "",
            yeast: "",
            oil: "",
            sugar: "",
            starter: "",
        };
    },
    methods: {
        calculate(type) {
            // if (!this.form.weight) {
            //     this.form.errors = "All fields is required";
            //     this.form.waterIntake = null;
            //     return;
            // }

            // this.form.waterIntake = (this.form.weight * 30) / 1000;
            this.form.result = true;
            if (type == "italian") {
                this.flour = parseInt((this.weightOrDoughball * 59.5) / 100) * this.numberOfPizza;
                this.water = ((this.flour * this.amountOfWater) / 100).toFixed(0);
                this.salt = (((this.weightOrDoughball * 1.8) / 100) * this.numberOfPizza).toFixed(1);
                this.yeast = (((this.weightOrDoughball * 0.05) / 100) * this.numberOfPizza).toFixed(1);
            } else if (type == "american") {
                this.flour = parseInt((this.weightOrDoughball * 58) / 100) * this.numberOfPizza;
                this.water = ((this.flour * this.americanAmountOfWater) / 100).toFixed(0);
                this.salt = (((this.weightOrDoughball * 1.15) / 100) * this.numberOfPizza).toFixed(1);
                this.yeast = (((this.weightOrDoughball * 0.235) / 100) * this.numberOfPizza).toFixed(1);
                this.oil = (((this.weightOrDoughball * 1.8) / 100) * this.numberOfPizza).toFixed(1);
                this.sugar = (((this.weightOrDoughball * .6) / 100) * this.numberOfPizza).toFixed(1);
            }
        },
    },
};
</script>
