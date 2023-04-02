<template>
    <ul class="flex gap-small">
        <li v-for="(opt, index) in options" :key="index" class="flex items-center relative overflow-hidden">
            <input type="radio" :id="options[index].value" :value="options[index].value" v-model="picked" @change="handleChange" />
            <div class="check"></div>
            <label class="ml-small" :for="options[index].value">{{ options[index].label }}</label>
        </li>
    </ul>
</template>

<script>
export default {
    props: {
        options: {
            required: true,
            type: Array,
        },
        gender: {
            required: true,
        },
    },
    data() {
        return {
            picked: this.gender,
        };
    },
    methods: {
        handleChange() {
            this.$emit("update:gender", this.picked);
        },
    },
    watch: {
        gender(newVal) {
            this.picked = newVal;
        },
    },
};
</script>

<style>
input[type="radio"] {
    /* visibility: hidden; */
    opacity: 0;
    display: block;
    position: absolute;
    width: 10rem;
    height: 10rem;
    left: 0;
    cursor: pointer;
}

.check {
    width: 2rem;
    height: 2rem;
    border: 1px solid rgb(0, 0, 0);
    /* cursor: pointer; */
}

input[type="radio"] + .check {
    background: white;
}
input[type="radio"]:checked + .check {
    position: relative;
}

input[type="radio"] + .check::after {
    content: "";
    position: absolute;
    inset: 8px;
    background: black;
    transform: scale(0);
}
input[type="radio"]:checked + .check::after {
    content: "";
    position: absolute;
    inset: 8px;
    background: black;
    transform: scale(1);
}
</style>
