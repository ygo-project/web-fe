<script setup>
import { ref } from "vue";

import Fighter from "@/pages/League/viewer/item/Fighter.vue";
import Versus from "@/pages/League/viewer/item/Versus.vue";

const props = defineProps({
    round: Object,
    doneEvent: Function,
});

const doneCnt = ref(0);

const swissRound = 2;

const win = (stage, winItem, loseItem) => {
    const winSet = [];
    stage.win.forEach((value) => {
        if (value.fighter !== loseItem.fighter || value.deck !== loseItem.deck) winSet.push(value);
    });
    winSet.push(winItem);

    stage.win = winSet;

    const loseSet = [];
    stage.lose.forEach((value) => {
        if (value.fighter !== winItem.fighter || value.deck !== winItem.deck) loseSet.push(value);
    });
    loseSet.push(loseItem);

    stage.lose = loseSet;

    doneCnt.value = winSet.length + loseSet.length;

    if (doneCnt.value === stage.list.length) {
        props.doneEvent();
    }
}
</script>

<template>
    <div class="swiss-container">
        <div v-for="stg in round.stage">
            <h3 v-if="stg.versus.length > 0">{{ `${stg.winCnt} - ${stg.loseCnt}` }}</h3>
            <Versus v-for="(item, index) in stg.versus" v-if="stg.winCnt < swissRound && stg.loseCnt < swissRound"
                    :blue="item.blue" :white="item.white"
                    :blue-win="() => win(stg, item.blue, item.white)" :white-win="() => win(stg, item.white, item.blue)"
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
