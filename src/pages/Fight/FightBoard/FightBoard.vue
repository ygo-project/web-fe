<script setup>
import { ref } from "vue";

import FightField from "@/pages/Fight/FightBoard/FightField/FightField.vue";
import FightKeyboard from "@/pages/Fight/FightBoard/FightKeyboard/FightKeyboard.vue";

const props = defineProps({
    fightPointDisplay: Array,
    fightPointReal: Array,
    criticalPoints: Array,
    isUpSideDown: Boolean,
});

const amount = ref(5000);
const isOverTrigger = ref(false);
const isCriticalTrigger = ref(false);

const increaseAmount = () => {
    amount.value = amount.value + 1000;
}

const decreaseAmount = () => {
    if (amount.value > 0) {
        amount.value = amount.value - 1000;
    }
}

const increaseLarge = () => {
    amount.value = amount.value + 5000;
}

const decreaseLarge = () => {
    if (amount.value >= 5000) {
        amount.value = amount.value - 5000;
    }
}

const setPower = (idx) => {
    if (isCriticalTrigger.value) {
        isCriticalTrigger.value = false;
        // 크리티컬 + 1
        props.criticalPoints[idx] += 1;
        return;
    }

    const now = props.fightPointReal[idx];
    const pur = now + amount.value;
    props.fightPointReal[idx] = pur;

    const diff = Math.ceil((pur - now) / 21);
    let time = 0;
    for (let start = now; start !== pur; start += diff) {
        setTimeout(() => {
            props.fightPointDisplay[idx] = start;
        }, 20 * time);

        if (diff > 0 && start + diff > pur) {
            start = pur - diff;
            setTimeout(() => {
                props.fightPointDisplay[idx] = pur;
            }, 20 * (time + 1));
        }

        if (diff < 0 && start + diff < pur) {
            start = pur - diff;
            setTimeout(() => {
                props.fightPointDisplay[idx] = pur;
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
    amount.value = 10000;
    isOverTrigger.value = false;
    isCriticalTrigger.value = false;

    if (props.isUpSideDown) {
        setPower(0);
        setPower(2);
        setPower(4);
    } else {
        setPower(1);
        setPower(3);
        setPower(5);
    }
}

const setOverTrigger = () => {
    amount.value = 100000000;
    isCriticalTrigger.value = false;

    isOverTrigger.value = true;
}

const setCriticalTrigger = () => {
    amount.value = 10000;
    isOverTrigger.value = false;

    isCriticalTrigger.value = true;
}
</script>

<template>
    <div class="board-container">
        <FightField :fight-points="props.fightPointDisplay" :set-power="setPower" :is-up-side-down="isUpSideDown" :critical-points="criticalPoints" />
        <FightKeyboard :amount="amount" :up="increaseAmount" :down="decreaseAmount" :large-up="increaseLarge" :large-down="decreaseLarge"
                       :front="setFrontPower" :over="setOverTrigger" :critical="setCriticalTrigger" />
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
