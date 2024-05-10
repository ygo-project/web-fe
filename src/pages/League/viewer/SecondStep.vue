<script setup>
import { onMounted, ref } from "vue";
import { useStore } from "vuex";
import { toast } from "vue3-toastify";

import Swiss from "@/pages/League/viewer/item/Swiss.vue";
import YgoButton from "@/components/atom/YgoButton.vue";

const store = useStore();

const leagueName = store.getters.GET_LEAGUE_NAME;
const fighterList = store.getters.GET_FIGHTER_LIST;

const swissRound = 2;

const maxRound = ref(0);
const swissTree = ref([]);
const roundReady = ref([]);

const setNextRound = (round) => {
    if (roundReady.value[round]) return;

    const thisRound = swissTree.value[round - 1];
    const nextRound = swissTree.value[round];

    const node = thisRound.stage;
    for (let i = 0; i < node.length; i++) {
        //이기면 다음
        nextRound.stage[i].list = [...node[i].win];
        //지면 + 1
        nextRound.stage[i + 1].list = [...node[i].lose];
    }

    roundReady.value[round] = true;
}

const setRound = (round) => {
    const thisRound = swissTree.value[round];

    let isReady = true;
    const node = thisRound.stage;
    for (let i = 0; i < node.length; i++) {
        const stage = node[i];

        if (stage.list.length === 0) {
            isReady = false;
            break;
        }
    }

    if (!isReady) {
        toast.warning('아직 이전 라운드가 진행중입니다.');
        return;
    }

    for (let i = 0; i < node.length; i++) {
        const list = node[i].list;

        const size = Math.ceil(list.length / 2);
        const isAllocated = new Array(list.length);
        isAllocated.fill(false);
        node[i].versus = [];
        for (let j = 0; j < size; j++) {
            const now = {};

            //각 자리 시드 할당
            let player = Math.floor(Math.random() * list.length);

            while (isAllocated[player]) player = Math.floor(Math.random() * list.length);

            isAllocated[player] = true;
            now.blue = list[player];

            //남은 플레이어 수가 자리 수보다 많은 경우만 상대 할당, 아닐 경우 해당 시드는 부전승
            let leftPlayer = 0;
            for (let j = 0; j < isAllocated.length; j++) {
                if (!isAllocated[j]) leftPlayer++;
            }

            // 대전상대 할당
            if (leftPlayer >= size - j) {
                let another = Math.floor(Math.random() * list.length);

                let loopCounter = 0;

                while (isAllocated[another]
                || now.blue.fighter === list[another].fighter // 대전상대가 자기 자신과 다르면
                    ) {
                    if (loopCounter > 1000) {
                        break;
                    }
                    loopCounter++;
                    another = Math.floor(Math.random() * list.length);
                }

                if (loopCounter > 1000) {
                    //재작업
                    isAllocated.fill(false);
                    node[i].versus = [];
                    j = -1;
                    continue;
                }
                isAllocated[another] = true;
                now.white = list[another];
            }

            node[i].versus.push(now);
        }
    }
}

onMounted(() => {
    //대진 뼈대 작성
    const tree = [];
    const ready = [];
    //첫 라운드
    tree.push({
        round: 0,
        stage: [{
            list: fighterList,
            versus: [],
            win: [],
            lose: []
        }]
    });
    ready.push(true);

    for (let i = 1, subRound = 1; i < swissRound * 2; i++) { // 이후 라운드
        const round = {
            round: i,
            stage: [],
        };

        if (i <= swissRound) subRound++;
        else subRound--;

        for (let j = 0; j < subRound; j++) {
            const sub = {
                list: [],
                versus: [],
                win: [],
                lose: []
            };

            round.stage.push(sub);
        }
        tree.push(round);
        ready.push(false);
    }

    swissTree.value = tree;
    roundReady.value = ready;
    maxRound.value = swissRound * 2;
})
</script>

<template>
    <div class="second-stage-container">
        <h2>스위스 스테이지 | {{ leagueName }}</h2>
        <div class="stage">
            <div v-for="(k, i) in maxRound + 1">
                <YgoButton v-if="roundReady[i]" @click="setRound(i)">진행</YgoButton>
                <Swiss v-for="(item, index) in swissTree.filter((a) => a.round === i)"
                    :round="item" :done-event="() => setNextRound(i + 1)"
                />
            </div>
        </div>
    </div>
</template>

<style scoped>
.second-stage-container {
    background: var(--bg-element1);

    .stage {
        display: flex;
        flex-direction: row;

        > div {
            display: flex;
            flex-direction: row;
            align-items: center;
        }
    }
}
</style>
