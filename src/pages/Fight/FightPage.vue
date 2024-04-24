<script setup>
import { ref } from "vue";

import FightBoard from "@/pages/Fight/FightBoard/FightBoard.vue";
import YgoButton from "@/components/atom/YgoButton.vue";

const aPlayerFightPointReal = ref([ 0, 0, 0, 0, 0, 0 ]);
const aPlayerFightPoint = ref([ 0, 0, 0, 0, 0, 0 ]);
const aPlayerCriticalPoint = ref([ 0, 0, 0, 0, 0, 0 ]);
const aPlayerLog = ref([]);

const bPlayerFightPointReal = ref([ 0, 0, 0, 0, 0, 0 ]);
const bPlayerFightPoint = ref([ 0, 0, 0, 0, 0, 0 ]);
const bPlayerCriticalPoint = ref([ 0, 0, 0, 0, 0, 0 ]);
const bPlayerLog = ref([]);

const init = () => {
    aPlayerFightPointReal.value = [ 0, 0, 0, 0, 0, 0 ];
    bPlayerFightPointReal.value = [ 0, 0, 0, 0, 0, 0 ];

    aPlayerFightPoint.value = [ 0, 0, 0, 0, 0, 0 ];
    bPlayerFightPoint.value = [ 0, 0, 0, 0, 0, 0 ];

    aPlayerCriticalPoint.value = [ 0, 0, 0, 0, 0, 0 ];
    bPlayerCriticalPoint.value = [ 0, 0, 0, 0, 0, 0 ];

    aPlayerLog.value = [];
    bPlayerLog.value = [];
}
</script>

<template>
    <div class="fight-container">
        <div class="board-container">
            <FightBoard :fight-point-display="aPlayerFightPoint" :fight-point-real="aPlayerFightPointReal"
                        :critical-points="aPlayerCriticalPoint" :log="aPlayerLog" :is-up-side-down="false" />
        </div>
        <div class="util-container">
            <YgoButton :click-event="init">턴 종료</YgoButton>
        </div>
        <div class="board-container">
            <FightBoard :fight-point-display="bPlayerFightPoint" :fight-point-real="bPlayerFightPointReal"
                        :critical-points="bPlayerCriticalPoint" :log="bPlayerLog" :is-up-side-down="true" />
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
