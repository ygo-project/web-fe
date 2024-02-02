<script setup>
import { ref } from "vue";

import FightField from "@/pages/Fight/FightBoard/FightField/FightField.vue";
import FightKeyboard from "@/pages/Fight/FightBoard/FightKeyboard/FightKeyboard.vue";

const props = defineProps({
    fightPoint: Array,
});

const amount = ref(5000);
const isOverTrigger = ref(false);

const increaseAmount = () => {
    amount.value = amount.value + 1000;
}

const decreaseAmount = () => {
    if (amount.value > 0) {
        amount.value = amount.value - 1000;
    }
}

const setPower = (idx) => {
    const now = props.fightPoint[idx];
    const pur = now + amount.value;

    const diff = Math.ceil((pur - now) / 21);
    let time = 0;
    for (let start = now; start !== pur; start += diff) {
        setTimeout(() => {
            props.fightPoint[idx] = start;
        }, 20 * time);

        if (diff > 0 && start + diff > pur) {
            start = pur - diff;
            setTimeout(() => {
                props.fightPoint[idx] = pur;
            }, 20 * (time + 1));
        }

        if (diff < 0 && start + diff < pur) {
            start = pur - diff;
            setTimeout(() => {
                props.fightPoint[idx] = pur;
            }, 20 * (time + 1));
        }

        time++;
    }

    if (isOverTrigger.value) {
        isOverTrigger.value = false;
        amount.value = 5000;
    }
}

const setFrontPower = () => {
    setPower(1);
    setPower(3);
    setPower(5);
}

const setOverTrigger = () => {
    amount.value = 100000000;
    isOverTrigger.value = true;
}
</script>

<template>
    <div class="board-container">
        <FightField :fight-points="props.fightPoint" :set-power="setPower" />
        <FightKeyboard :amount="amount" :up="increaseAmount" :down="decreaseAmount" :front="setFrontPower" :over="setOverTrigger" />
    </div>
</template>

<style scoped>
    .board-container {
        width: 100%;
        height: 100%;

        div {
            width: 100%;
        }

        > div {
            height: 65%;
        }

        > div + div {
            height: 35%;
        }
    }
</style>
