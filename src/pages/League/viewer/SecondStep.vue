<script setup>
import { onMounted, ref } from "vue";
import { useStore } from "vuex";
import { toast } from "vue3-toastify";

import Swiss from "@/pages/League/viewer/item/Swiss.vue";
import YgoButton from "@/components/atom/YgoButton.vue";
import {apiClient} from "@/common/index.js";

const store = useStore();

const leagueName = store.getters.GET_LEAGUE_NAME;
const fighterList = store.getters.GET_FIGHTER_LIST;

const promotionList = [];
const log = [];
const swissRound = 2;

const maxRound = ref(0);
const swissTree = ref([]);
const roundReady = ref([]);
const isFinish = ref(false);

const setNextRound = (round) => {
    roundReady.value[round] += 1;

    const thisRound = swissTree.value[round - 1];
    const nextRound = swissTree.value[round];

    if (roundReady.value[round] < thisRound.stage.length) return;

    let pivot = 0;
    const node = thisRound.stage;
    for (let i = 0; i < node.length; i++) {
        if (node[i].win.length === 0) {
            pivot++;
            continue;
        }
        //이기면 다음
        nextRound.stage[i - pivot].list = [...nextRound.stage[i - pivot].list, ...node[i].win];
        //지면 + 1
        nextRound.stage[i - pivot + 1].list = [...nextRound.stage[i - pivot + 1].list, ...node[i].lose];

        //전적 기록
        for (let j = 0; j < node[i].win.length; j++) {
            const win = node[i].win[j];
            const lose = node[i].lose[j];

            const winLog = {
                leagueSeq: store.getters.GET_LEAGUE_SEQ,
                fighterSeq: win.fighter,
                deckSeq: win.deck,
                opponentFighterSeq: lose.fighter,
                opponentDeckSeq: lose.deck,
                round: "S_" + round,
                result: "1",
            }
            const loseLog = {
                leagueSeq: store.getters.GET_LEAGUE_SEQ,
                fighterSeq: lose.fighter,
                deckSeq: lose.deck,
                opponentFighterSeq: win.fighter,
                opponentDeckSeq: win.deck,
                round: "S_" + round,
                result: "0",
            }

            log.push(winLog);
            log.push(loseLog);
        }
    }

    for (let i = 0; i < nextRound.stage.length; i++) {
        if (nextRound.stage[i].winCnt >= swissRound) {
            for (let k = 0; k < nextRound.stage[i].list.length; k++) {
                promotionList.push(nextRound.stage[i].list[k]);
            }
            roundReady.value[round + 1] += 1;
        }
        if (nextRound.stage[i].loseCnt >= swissRound) {
            roundReady.value[round + 1] += 1;
        }
    }
}

const swissDone = () => {
    toast.info("토너먼트 진출 덱이 결정되었습니다.", {
        position: "top-center"
    });
    isFinish.value = true;
}

const proceedNextStage = async () => {
    const body = {
        logList: log,
    };

    await apiClient.post(`/log/insert`, body)
        .then((response) => {
            if (response.status === 200) {
                store.dispatch('ACT_STAGE', 2);
                store.dispatch('ACT_FIGHTER_LIST', promotionList);

                toast.success('대회 결과가 기록되었습니다.');
            }
        })
        .catch((error) => {
            console.log(error)
        });
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

                while (isAllocated[another]) another = Math.floor(Math.random() * list.length);

                isAllocated[another] = true;
                now.white = list[another];
            }

            node[i].versus.push(now);
        }
    }

    if (round === maxRound.value - 1) {
        swissDone();
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
            lose: [],
            winCnt: 0,
            loseCnt: 0,
        }]
    });
    ready.push(1);

    for (let i = 1, subRound = 1, win = 0, lose = 0; i < swissRound * 2; i++) { // 이후 라운드
        const round = {
            round: i,
            stage: [],
        };

        if (i <= swissRound) {
            win++;
            subRound++;
        } else {
            lose++;
            subRound--;
        }

        for (let j = 0; j < subRound; j++) {
            const sub = {
                list: [],
                versus: [],
                win: [],
                lose: [],
                winCnt: win - j,
                loseCnt: lose + j,
            };

            round.stage.push(sub);
        }
        tree.push(round);
        ready.push(0);
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
                <YgoButton v-if="i === 0 || swissTree[i - 1] && roundReady[i] >= swissTree[i - 1].stage.length" @click="setRound(i)">진행</YgoButton>
                <Swiss v-for="(item, index) in swissTree.filter((a) => a.round === i)"
                    :round="item" :done-event="() => setNextRound(i + 1)"
                />
            </div>
        </div>
    </div>
    <div class="btn-box">
        <YgoButton v-if="isFinish" color="teal" :click-event="proceedNextStage">토너먼트 진행</YgoButton>
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

.btn-box {
    display: flex;
    flex-direction: row;
    justify-content: center;

    background: var(--bg-element1);
    margin: 1.5rem 0;

    button {
        margin-right: 0.2rem;
    }
}
</style>
