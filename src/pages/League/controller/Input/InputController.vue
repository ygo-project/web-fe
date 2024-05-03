<script setup>
import { onMounted, ref } from "vue";
import { useStore } from "vuex";
import { toast } from "vue3-toastify";

import YgoButton from "@/components/atom/YgoButton.vue";
import { apiClient } from "@/common/index.js";
import FighterSelect from "@/pages/League/controller/Input/FighterSelect.vue";
import DeckSelect from "@/pages/League/controller/Input/DeckSelect.vue";
import NationSelect from "@/pages/League/controller/Input/NationSelect.vue";

const store = useStore();

const leagueName = ref('');
const fighter = ref('');
const deck = ref({});

const fighterList = ref([]);
const deckList = ref([]);
const deckListAll = ref([]);

const leagueNameMessage = ref('');

const isActiveFocus = ref({
    leagueNameActive: false,
});

const handleFocus = (target) => {
    isActiveFocus.value = {
        ...isActiveFocus.value,
        [target]: true,
    };
}

const handleBlur = (target) => {
    isActiveFocus.value = {
        ...isActiveFocus.value,
        [target]: false,
    };
}

const handleLeagueName = () => {
    if (leagueName.value.length < 1) {
        leagueNameMessage.value = `대회명을 입력해주세요.`;
    } else {
        leagueNameMessage.value = ``;
    }
}

const onRegister = () => {
    store.dispatch('ACT_LEAGUE_NAME', leagueName.value);
}

const onSelectFighter = (value) => {
    fighter.value = value;
}

const onSelectDeck = (value) => {
    deck.value = value;
}

const onSelectNation =(value) => {
    const filtered = [];

    deckListAll.value.forEach((item, index, array) => {
        if (item.nation === value) {
            filtered.push(item);
        }
    });

    deck.value = filtered[0];
    deckList.value = filtered;
}

const onAdd = () => {
    const list = store.getters.GET_FIGHTER_LIST;

    let isDuplicate = false;
    //중복체크
    list.forEach((item, index) => {
        if (item.fighter === fighter.value && item.deck === deck.value.seq) {
            isDuplicate = true;
        }
    });

    if (isDuplicate) {
        toast.info(`이미 추가된 후보와 덱입니다.`);
        return;
    }

    store.dispatch('ACT_FIGHTER_LIST', [...list, {
        fighter: fighter.value,
        deck: deck.value.seq,
        deckName: deck.value.nickname,
        deckNation: deck.value.nation,
    }]);


    toast.success(`추가되었습니다.`);
}

onMounted(async () => {
    // 후보(파이터) 목록 조회
    try {
        const response = await apiClient.get(`/fighter/validList/${localStorage.getItem('userId')}`);

        if (response.status === 200) {
            fighterList.value = response.data;
            fighter.value = response.data[0].name;
        } else {
            console.log(response);
            toast.error('후보를 불러오던 중 서버 오류가 발생하였습니다. 새로고침을 진행해주세요.');
        }
    } catch (error) {
        console.log(error);
        toast.error('후보를 불러오던 중 오류가 발생하였습니다. 새로고침을 진행해주세요.');
    }

    // 뱅가드 덱 목록 조회
    try {
        const response = await apiClient.get(`/deck/list/`);

        if (response.status === 200) {
            deckList.value = [...response.data];
            deckListAll.value = [...response.data];
            deck.value = response.data[0];
        } else {
            console.log(response);
            toast.error('덱 목록을 불러오던 중 서버 오류가 발생하였습니다. 새로고침을 진행해주세요.');
        }
    } catch (error) {
        console.log(error);
        toast.error('덱 목록을 불러오던 중 오류가 발생하였습니다. 새로고침을 진행해주세요.');
    }
});
</script>

<template>
    <div class="input-controller-container">
        <div class="league-input">
            <div :class="isActiveFocus.leagueNameActive ? `focus-wrapper wrapper` : `wrapper`">
                <label>대회</label>
                <div class="input-wrapper">
                    <input
                        type="text"
                        placeholder="대회 이름을 입력하세요."
                        maxlength="50"
                        @keyup="handleLeagueName"
                        @focus="handleFocus(`nameActive`)"
                        @blur="handleBlur(`nameActive`)"
                        v-model="leagueName"
                    />
                    <YgoButton color="teal" :click-event="onRegister">등록</YgoButton>
                </div>
                <div class="validation">{{ leagueNameMessage }}</div>
            </div>
        </div>
        <div class="fighter-input">
            <FighterSelect :fighter="fighter" :fighter-list="fighterList" :on-select-fighter="onSelectFighter" />
            <NationSelect :on-select-nation="onSelectNation" />
            <DeckSelect :deck="deck" :deckList="deckList" :on-select-deck="onSelectDeck" />
            <YgoButton color="teal" :click-event="onAdd">추가</YgoButton>
        </div>
    </div>
</template>

<style scoped>
    .input-controller-container {
        .league-input {
            flex: 1;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            width: 100%;
            background: var(--bg-element2);

            padding-top: 1rem;
            padding-bottom: 1rem;

            .wrapper {
                width: 768px;
                margin-bottom: 1.5rem;

                label {
                    display: block;
                    margin-bottom: 1rem;
                    color: var(--text1);
                    line-height: 1.5;
                    font-weight: bold;
                    font-size: 1.125rem;
                    transition: all 0.125s ease-in 0s;
                }

                .input-wrapper {
                    display: flex;
                    justify-content: space-between;
                    -webkit-box-align: center;
                    align-items: center;
                    padding-bottom: 0.5rem;
                    border-bottom: 1px solid var(--border2);

                    input {
                        display: block;
                        width: 100%;
                        background: transparent;
                        border: none;
                        outline: none;
                        color: var(--text2);
                        line-height: 1.5;
                        font-size: 1.5rem;
                        transition: all 0.125s ease-in 0s;
                    }

                    input:disabled {
                        color: var(--text3);
                    }

                    button {
                        display: block;
                        width: 7rem;
                    }
                }

                .validation {
                    margin: 0.25rem 0;
                    font-size: 1rem;
                    line-height: 1.5;
                    color: rgb(255, 107, 107);
                    font-weight: bold;
                }
            }

            .focus-wrapper {
                label {
                    color: var(--primary2);
                }

                .input-wrapper {
                    border-bottom: 1px solid var(--primary2);

                    input {
                        color: var(--primary2);
                    }
                }
            }
        }

        .fighter-input {
            position: relative;
            height: 100%;
            display: flex;
            justify-content: center;
            justify-items: center;
            align-items: center;
            margin: 1rem 0;

            > div {
                margin-right: 5px;
            }
        }
    }
</style>
