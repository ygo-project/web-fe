<script setup>
import { ref } from "vue";

import FightBoard from "@/pages/Fight/FightBoard/FightBoard.vue";
import YgoButton from "@/components/atom/YgoButton.vue";

const aPlayerFightPoint = ref([ 0, 0, 0, 0, 0, 0 ]);
const bPlayerFightPoint = ref([ 0, 0, 0, 0, 0, 0 ]);

const init = () => {
    aPlayerFightPoint.value = [ 0, 0, 0, 0, 0, 0 ];
    bPlayerFightPoint.value = [ 0, 0, 0, 0, 0, 0 ];
}
</script>

<template>
    <div class="fight-container">
        <div class="board-container">
            <FightBoard :fight-point="aPlayerFightPoint"/>
        </div>
        <div class="util-container">
            <YgoButton :click-event="init">턴 종료</YgoButton>
        </div>
        <div class="board-container">
            <FightBoard :fight-point="bPlayerFightPoint"/>
        </div>
    </div>
</template>

<style scoped>
    .fight-container {
        display: flex;
        justify-content: space-evenly;
        width: 90vw;
        height: calc(100vh - 4rem);
        margin: 0 auto;

        > .board-container {
            width: 45%;
            height: 100%;
        }

        .util-container {
            width: 10%;
            display: flex;
            flex-direction: column;
            justify-content: center;
            margin-bottom: 20%;
        }
    }
</style>
