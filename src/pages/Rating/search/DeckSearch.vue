<script setup>
import { computed, onMounted, ref } from "vue";
import { toast } from "vue3-toastify";

import { apiClient } from "@/common/index.js";
import YgoButton from "@/components/atom/YgoButton.vue";
import NationSelect from "@/pages/League/controller/Input/selectBox/NationSelect.vue";
import DeckSelect from "@/pages/League/controller/Input/selectBox/DeckSelect.vue";

const today = new Date();
const startDate = ref(new Date(today.getFullYear(), today.getMonth() - 1, today.getDate()));
const endDate = ref(new Date(today.getFullYear(), today.getMonth(), today.getDate()));

const deck = ref({});

const deckList = ref([]);
const deckListAll = ref([]);

const startDateView = computed(() => startDate.value.getFullYear() + `-` + (startDate.value.getMonth() + 1) + `-` + startDate.value.getDate());
const endDateView = computed(() => endDate.value.getFullYear() + `-` + (endDate.value.getMonth() + 1) + `-` + endDate.value.getDate());

const onSelectDeck = (value) => {
    deck.value = value;
}

const onSelectNation =(value) => {
    const filtered = [];

    if (value === '전체') {
        deckListAll.value.forEach((item, index, array) => {
            filtered.push(item);
        });
    } else {
        deckListAll.value.forEach((item, index, array) => {
            if (item.nation === value) {
                filtered.push(item);
            }
        });
    }

    deck.value = filtered[0];
    deckList.value = filtered;
}

onMounted(async () => {
    // 뱅가드 덱 목록 조회
    try {
        const response = await apiClient.get(`/deck/list/`);

        if (response.status === 200) {
            deckList.value = [...response.data];
            deckListAll.value = response.data.sort((d1, d2) => d1.seq - d2.seq);
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
    <div class="deck-search-container">
        <table>
            <colgroup>
                <col style="width: 25%"/>
                <col/>
            </colgroup>
            <tbody>
                <tr>
                    <th>기간 설정</th>
                    <td>
                        <VDatePicker v-model="startDate" :color="`gray`">
                            <template #default="{ togglePopover }">
                                <input type="text" :value="startDateView" @click="togglePopover" readonly>
                            </template>
                        </VDatePicker>
                        ~
                        <VDatePicker v-model="endDate" :color="`gray`">
                            <template #default="{ togglePopover }">
                                <input type="text" :value="endDateView" @click="togglePopover" readonly>
                            </template>
                        </VDatePicker>
                    </td>
                </tr>
                <tr>
                    <th>덱 지정</th>
                    <td class="deck-pick">
                        <NationSelect :on-select-nation="onSelectNation" />
                        <DeckSelect :deck="deck" :deckList="deckList" :on-select-deck="onSelectDeck" />
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
    <div class="btn-box">
        <YgoButton color="teal">검색</YgoButton>
    </div>
</template>

<style scoped>
.deck-search-container {
    margin: 1vh 1vw;
    display: flex;
    flex-direction: column;

    table {
        border-spacing: 0;
        border-top: 1px solid #7c858d;
        border-bottom: 1px solid #7c858d;
        margin: 0;

        tr {
            height: 3rem;

            th {
                border: 0 solid #c6c8c6;
                border-top-width: 1px;
                background: var(--bg-element3);
            }

            td {
                border: 1px solid #c6c8c6;
                border-bottom: 0;
                border-right: 0;

                input {
                    margin: 0 5px;
                }

                input[type=text] {
                    border: 0;
                    box-shadow: rgba(0, 0, 0, 0.15) 0 0 4px;
                    padding-left: .375rem;
                    line-height: 1.5rem;
                    font-size: 1.025rem;
                }
            }
        }

        tr:first-child {
            th {
                border-top: 0;
            }

            td {
                border-top: 0;
            }
        }
    }

    .deck-pick {
        position: relative;
        height: 3rem;
        display: flex;
        justify-items: center;
        align-items: center;
        margin: auto 0;

        > div {
            margin-right: 5px;
        }
    }
}

.btn-box {
    display: flex;
    flex-direction: row;
    justify-content: center;

    margin: 1.5rem 0;

    button {
        height: 3rem;
        width: 6rem;
        margin-right: 0.2rem;
    }
}
</style>
