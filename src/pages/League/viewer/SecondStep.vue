<script setup>
import {computed, onMounted, ref} from "vue";
import { useStore } from "vuex";
import { toast } from "vue3-toastify";

import Swiss from "@/pages/League/viewer/item/Swiss.vue";
import YgoButton from "@/components/atom/YgoButton.vue";
import { apiClient } from "@/common/index.js";

const store = useStore();

const leagueName = store.getters.GET_LEAGUE_NAME;
const fighterList = store.getters.GET_FIGHTER_LIST;

const promotionList = [];
const swissRound = 2;

const maxRound = ref(0);
const swissTree = computed(() => store.getters.GET_SWISS_LIST);
const roundReady = computed(() => store.getters.GET_SWISS_ROUND_READY);
const isFinish = ref(false);

const setNextRound = (round, index) => {
    roundReady.value[round][index] = true;
}

const setRound = (round) => {
    const prevRound = swissTree.value[round - 1];
    const thisRound = swissTree.value[round];

    if (round > 0) {
        // 이전 진행 버튼 hide
        roundReady.value[round - 1][0] = false;
        console.log(roundReady);

        // 스테이지에 후보 세팅
        let pivot = 0;
        let topStagePivot = 0;
        let bottomStagePivot = 0;
        const node = prevRound.stage;

        const next = [];
        for (const stg in thisRound.stage) {
            next.push([]);
        }

        for (let i = 0; i < node.length; i++) {
            if (node[i].win.length === 0) {
                pivot++;
                continue;
            }

            //이긴 후보는 위로
            const topStage = next[i - pivot];
            for (let j = 0; j < node[i].win.length; j++) {
                topStage[topStagePivot + j] = node[i].win[j];
            }
            topStagePivot += node[i].win.length;
            //진 후보는 아래로
            const bottomStage = next[i - pivot + 1];
            for (let j = 0; j < node[i].lose.length; j++) {
                bottomStage[bottomStagePivot + j] = node[i].lose[j];
            }
            bottomStagePivot += node[i].lose.length;

            next[i - pivot] = topStage.filter(data => data !== undefined);
            next[i - pivot + 1] = bottomStage.filter(data => data !== undefined);
        }

        for (let i = 0; i < thisRound.stage.length; i++) {
            thisRound.stage[i].list = next[i];
        }

        for (let i = 0; i < thisRound.stage.length; i++) {
            if (thisRound.stage[i].winCnt >= swissRound) {
                for (let k = 0; k < thisRound.stage[i].list.length; k++) {
                    promotionList.push(thisRound.stage[i].list[k]);
                }
                roundReady.value[round + 1][i] = true;
            }
            if (thisRound.stage[i].loseCnt >= swissRound) {
                roundReady.value[round + 1][i] = true;
            }
        }
    }

    // 배치
    const node = thisRound.stage;
    for (let i = 0; i < node.length; i++) {
        if (node[i].winCnt >= swissRound || node[i].loseCnt >= swissRound) { // 진출 및 탈락조
            const list = node[i].list;

            node[i].versus = [];
            for (let j = 0; j < list.length; j += 2) {
                const now = {};
                now.blue = list[j];
                now.white = list[j + 1];

                node[i].versus.push(now);
            }
        } else {
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
                        if (loopCounter > 10000) {
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
    }

    if (round === maxRound.value - 1) {
        swissDone();
    }
}

const swissDone = () => {
    toast.info("토너먼트 진출 덱이 결정되었습니다.", {
        position: "top-center"
    });
    isFinish.value = true;
}

const proceedNextStage = async () => {
    const log = [];

    //전적 기록
    for (let i = 0; i < swissTree.value.length; i++) {
        const node = swissTree.value[i];
        for (let j = 0; j < node.stage.length; j++) {
            const stage = node.stage[j];

            for (let k = 0; k < stage.win.length; k++) {
                const win = stage.win[j];
                const lose = stage.lose[j];

                const winLog = {
                    leagueSeq: store.getters.GET_LEAGUE_SEQ,
                    fighterSeq: win.fighter,
                    deckSeq: win.deck,
                    opponentFighterSeq: lose.fighter,
                    opponentDeckSeq: lose.deck,
                    round: "S_" + (node.round + 1),
                    result: "1",
                }
                const loseLog = {
                    leagueSeq: store.getters.GET_LEAGUE_SEQ,
                    fighterSeq: lose.fighter,
                    deckSeq: lose.deck,
                    opponentFighterSeq: win.fighter,
                    opponentDeckSeq: win.deck,
                    round: "S_" + (node.round + 1),
                    result: "0",
                }

                log.push(winLog);
                log.push(loseLog);
            }
        }
    }

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

onMounted(() => {
    maxRound.value = swissRound * 2;

    if (swissTree.value.length === 0) {
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
        ready.push([ true ]);
        ready.push([ false ]);

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

            const readyNode = [];
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
                readyNode.push(false);
            }
            tree.push(round);
            ready.push(readyNode);
        }

        store.dispatch('ACT_SWISS_LIST', tree);
        store.dispatch('ACT_SWISS_ROUND_READY', ready);
    }
})
</script>

<template>
    <div class="second-stage-container">
        <h2>스위스 스테이지 | {{ leagueName }}</h2>
        <div class="stage">
            <div v-for="(k, i) in maxRound">
                <YgoButton v-if="roundReady[i] && !roundReady[i].includes(false)" @click="setRound(i)">진행</YgoButton>
                <Swiss v-for="(item, index) in swissTree.filter((a) => a.round === i)"
                    :round="item" :done-event="(stg) => setNextRound(i + 1, stg)"
                    :is-active="roundReady[i] && !roundReady[i].includes(false)"
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
