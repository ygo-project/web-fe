<script setup>
import { ref } from "vue";

import Fighter from "@/pages/League/viewer/item/Fighter.vue";
import Versus from "@/pages/League/viewer/item/Versus.vue";

const props = defineProps({
    round: Object,
    doneEvent: Function,
    isActive: Boolean,
});

const swissRound = 2;

const win = (stage, winItem, loseItem, index, stgIdx) => {
    let winDeck = { }, loseDeck = { };
    for (let key in winItem) {
        winDeck[key] = winItem[key];
    }
    winDeck.isLose = false;
    for (let key in loseItem) {
        loseDeck[key] = loseItem[key];
    }
    loseDeck.isLose = false;

    stage.win[index] = winDeck;
    stage.lose[index] = loseDeck;

    winItem.isLose = false;
    loseItem.isLose = true;

    let done = 0;
    stage.win.forEach((value) => {
        if (value) done++;
    });
    stage.lose.forEach((value) => {
        if (value) done++;
    });

    if (done === stage.list.length) {
        props.doneEvent(stgIdx);
    }
}
</script>

<template>
    <div class="swiss-container">
        <div v-for="(stg, stgIdx) in round.stage">
            <h3 v-if="stg.versus.length > 0">{{ `${stg.winCnt} - ${stg.loseCnt}` }}</h3>
            <Versus v-for="(item, index) in stg.versus" v-if="stg.winCnt < swissRound && stg.loseCnt < swissRound"
                    :blue="item.blue" :white="item.white"
                    :blue-win="() => win(stg, item.blue, item.white, index, stgIdx)" :white-win="() => win(stg, item.white, item.blue, index, stgIdx)"
                    :is-disabled="!isActive"
            />
            <div class="win" v-else-if="stg.winCnt >= swissRound" v-for="(item, index) in stg.versus">
                <Fighter :fighter="item.blue" />
                <Fighter :fighter="item.white" />
            </div>
            <div class="lose" v-else v-for="(item, index) in stg.versus">
                <Fighter :fighter="item.blue" />
                <Fighter :fighter="item.white" />
            </div>
        </div>
    </div>
</template>

<style scoped>
.swiss-container {
    flex: 0 0 auto;
    display: flex;
    flex-direction: column;
    align-items: center;

    > div {
        display: flex;
        flex-direction: column;
        align-items: center;
        background: var(--bg-element2);

        margin: 1rem 0;
    }

    .win {
        flex-direction: row;
    }

    .lose {
        > div {
            background: var(--slight-layer);
        }
    }
}
</style>
