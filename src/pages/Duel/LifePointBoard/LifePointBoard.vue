<script setup>
import {onMounted, ref} from "vue";

    import LifePoint from "@/pages/Duel/LifePointBoard/LifePoint/LifePoint.vue";
    import KeyBoard from "@/pages/Duel/LifePointBoard/Keyboard/KeyBoard.vue";

    const lp = ref(8000);
    const order = ref('');

    const changeLP = (operator, amount) => {
        if (operator === '+') {
            lp.value = lp.value + amount * 1;
        }

        if (operator === '-') {
            lp.value = lp.value - amount * 1;
        }

        if (operator === '/') {
            lp.value = lp.value / (amount * 1);
        }
    }

    const runOperation = () => {
        const operator = order.value.substring(0, 1);
        const amount = order.value.substring(1);

        changeLP(operator, amount);
        order.value = '';
    }

    onMounted(() => {
        lp.value = 8000;
    })
</script>

<template>
    <div class="lp-board-container">
        <LifePoint :life-point="lp" :order="order" />
        <KeyBoard :order="order" @setOrder="(nextOrd) => order = nextOrd" @run="() => runOperation()" />
    </div>
</template>

<style scoped>
    .lp-board-container {
        display: flex;
        justify-content: center;
        flex-direction: column;
        height: calc(100vh - 4rem);

        div {
            display: flex;

        }

        div:nth-child(1) {
            height: 15%;
        }

        div:nth-child(2) {
            height: 85%;
        }
    }
</style>
