<script setup>
import { onMounted, ref } from "vue";
import { useStore } from "vuex";
import { toast } from "vue3-toastify";

import Versus from "@/pages/League/viewer/item/Versus.vue";
import YgoButton from "@/components/atom/YgoButton.vue";
import { apiClient } from "@/common/index.js";

const store = useStore();

const leagueName = store.getters.GET_LEAGUE_NAME;
const fighterList = store.getters.GET_FIGHTER_LIST;

const maxRound = ref(0);
const tournamentTree = ref([]);
const isFinish = ref(false);

const win = (round, position, side, versus) => {
    const winDeck = side === 0 ? versus.blue : versus.white; // 0 : blue, 1: white
    if (round === 0 && isValidFinish()) { //우승자 결정
        versus.win = side === 0 ? 'blue' : 'white';
        toast.info(leagueName + " 우승 덱은 " + winDeck.deckName + " 입니다! 축하합니다.", {
            position: "top-center"
        });
        isFinish.value = true;
    } else {
        let left = (1 << (round - 1)) - 1;
        const isBlue = position % 2 === 0;

        const node = tournamentTree.value[left + Math.floor(position / 2)];
        if (isBlue) {
            versus.win = side === 0 ? 'blue' : 'white';
            node.blue = winDeck;
        } else {
            versus.win = side === 0 ? 'blue' : 'white';
            node.white = winDeck;
        }

        tournamentTree.value[left + position / 2] = node;
    }
};

const isValidFinish = () => {
    let valid = true;
    for (let i = 0; i < tournamentTree.value.length; i++) {
        const node = tournamentTree.value[i];

        if (node.round === maxRound.value) continue;

        if (node.blue.deckName === undefined || node.white.deckName === undefined) {
            toast.warning('아직 진행중인 파이트가 남아있습니다.');
            valid = false;
            break;
        }
    }
    return valid;
};

const logLeagueResult = async () => {
    const log = [];

    for (let i = 0; i < tournamentTree.value.length; i++) {
        const node = tournamentTree.value[i];
        const win = node.win === 'blue';

        let winLog, loseLog;
        if (win) {
            winLog = {
                leagueSeq: store.getters.GET_LEAGUE_SEQ,
                fighterSeq: node.blue.fighter,
                deckSeq: node.blue.deck,
                opponentFighterSeq: node.white.fighter,
                opponentDeckSeq: node.white.deck,
                round: "T_" + node.round,
                result: "1",
            };
            loseLog = {
                leagueSeq: store.getters.GET_LEAGUE_SEQ,
                fighterSeq: node.white.fighter,
                deckSeq: node.white.deck,
                opponentFighterSeq: node.blue.fighter,
                opponentDeckSeq: node.blue.deck,
                round: "T_" + node.round,
                result: "0",
            };
        } else {
            winLog = {
                leagueSeq: store.getters.GET_LEAGUE_SEQ,
                fighterSeq: node.white.fighter,
                deckSeq: node.white.deck,
                opponentFighterSeq: node.blue.fighter,
                opponentDeckSeq: node.blue.deck,
                round: "T_" + node.round,
                result: "1",
            };
            loseLog = {
                leagueSeq: store.getters.GET_LEAGUE_SEQ,
                fighterSeq: node.blue.fighter,
                deckSeq: node.blue.deck,
                opponentFighterSeq: node.white.fighter,
                opponentDeckSeq: node.white.deck,
                round: "T_" + node.round,
                result: "0",
            };
        }
        log.push(winLog);
        log.push(loseLog);
    }

    const body = {
        logList: log,
    };

    await apiClient.post(`/log/insert`, body)
        .then((response) => {
            if (response.status === 200) {
                store.dispatch('ACT_STAGE', 0);
                store.dispatch('ACT_LEAGUE_SEQ', -1);
                store.dispatch('ACT_LEAGUE_NAME', '');
                store.dispatch('ACT_FIGHTER_LIST', []);

                toast.success('대회 결과가 기록되었습니다.');
            }
        })
        .catch((error) => {
            console.log(error)
        });
};

onMounted(() => {
    // 대진 뼈대 작성
    let bit = 1;
    let round = 0;
    const tree = [];
    while (true) {
        for (let i = 0; i < bit; i++) {
            tree.push({
                round: round,
                blue: {

                },
                white: {

                },
            });
        }

        if (bit * 2 >= fighterList.length) {
            break;
        }

        bit <<= 1;
        round++;
    }

    //대진표 할당
    let left = (1 << round) - 1;
    let roundSize = left + 1;
    const isAllocated = new Array(fighterList.length);
    isAllocated.fill(false);

    for (let i = 0; i < roundSize; i++) {
        //각 자리 시드 할당
        let player = Math.floor(Math.random() * fighterList.length);

        while (isAllocated[player]) player = Math.floor(Math.random() * fighterList.length);

        isAllocated[player] = true;
        tree[left + i].blue = fighterList[player];

        //남은 플레이어 수가 자리 수보다 많은 경우만 상대 할당, 아닐 경우 해당 시드는 부전승
        let leftPlayer = 0;
        for (let j = 0; j < isAllocated.length; j++) {
            if (!isAllocated[j]) leftPlayer++;
        }

        // 대전상대 할당
        if (leftPlayer >= roundSize - i) {
            let another = Math.floor(Math.random() * fighterList.length);

            while (isAllocated[another]
                || tree[left + i].blue.fighter === fighterList[another].fighter // 대전상대가 자기 자신과 다르면
                ) another = Math.floor(Math.random() * fighterList.length);

            isAllocated[another] = true;
            tree[left + i].white = fighterList[another];
        }
    }

    tournamentTree.value = tree;
    maxRound.value = round;
});
</script>

<template>
    <div class="third-stage-container">
        <h2>토너먼트 스테이지 | {{ leagueName }}</h2>
        <div class="stage">
            <div v-for="(k, i) in maxRound + 1">
                <Versus :key="index" v-for="(item, index) in tournamentTree.filter((v) => v.round === i)"
                        :blue="item.blue" :white="item.white"
                        :blue-win="() => win(i, index, 0, item)" :white-win="() => win(i, index, 1, item)"
                />
            </div>
        </div>
    </div>
    <div class="btn-box">
        <YgoButton v-if="isFinish" color="teal" :click-event="logLeagueResult" >기록</YgoButton>
    </div>
</template>

<style scoped>
.third-stage-container {
    background: var(--bg-element1);

    .stage {
        display: flex;
        flex-direction: column;
        align-items: center;
        background: var(--bg-element2);

        > div {
            display: flex;
            flex-direction: row;
            flex-wrap: nowrap;
            overflow-x: auto;
            margin-bottom: .675rem;
        }
    }
}

.btn-box {
    display: flex;
    flex-direction: row;
    justify-content: center;

    margin: 1.5rem 0;

    .impossible {
        pointer-events: none;
    }

    button {
        margin-right: 0.2rem;
    }
}
</style>
