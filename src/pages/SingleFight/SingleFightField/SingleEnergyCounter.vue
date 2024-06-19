<script setup>
import { ref } from "vue";

const counter = ref(0);

const up = () => {
    if (counter.value === 10) return;
    counter.value = counter.value + 1;
}

const down = () => {
    if (counter.value === 0) return;
    counter.value = counter.value - 1;
}
</script>

<template>
    <div class="energy-container">
        <div @click="up">
            <div :class="[{'energy':true}, {'active':10 - index < counter}]" v-for="index in 5" />
        </div>
        <div @click="down">
            <div :class="[{'energy':true}, {'active':5 - index < counter}]" v-for="index in 5" />
        </div>
    </div>
</template>

<style scoped>
    .energy-container {
        height: 100%;

        > div {
            height: 50%;
            display: flex;
            flex-direction: column;
            justify-content: space-around;

            border-left: 3rem solid transparent;
            border-right: 3rem solid transparent;

            .energy {
                width: 1rem;
                height: 1rem;
                border: 1px solid var(--text1);
            }

            .active {
                background-color: var(--prism-code-4);
            }
        }
    }
</style>
