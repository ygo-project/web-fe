<script setup>
import { computed, ref } from "vue";
import { useStore } from "vuex";
import { toast } from "vue3-toastify";

import YgoButton from "@/components/atom/YgoButton.vue";
import DeckSearch from "@/pages/Rating/search/DeckSearch.vue";
import UserSearch from "@/pages/Rating/search/UserSearch.vue";
import Paging from "@/components/molecule/Paging/Paging.vue";
import { apiClient } from "@/common/index.js";

const store = useStore();

const auth = computed(() => store.getters.GET_AUTH );

const deckActive = ref(true);
const userActive = ref(false);

const userTotalCount = ref(0);
const userPageSize = ref(10);
const userPage = ref(1);
const userStartDate = ref('');
const userEndDate = ref('');
const userSeq = ref(-1);

const deckTotalCount = ref(0);
const deckPageSize = ref(10);
const deckPage = ref(1);
const deckStartDate = ref('');
const deckEndDate = ref('');
const deckSeq = ref(-1);

const deckLog = ref([]);
const userLog = ref([]);

const setDeckSearchCondition = (start, end, seq) => {
    deckPage.value = 1;

    deckStartDate.value = start;
    deckEndDate.value = end;
    deckSeq.value = seq;

    searchDeckLog();
}

const searchDeckPage = (page) => {
    deckPage.value = page;

    searchDeckLog();
}

const searchDeckLog = async () => {
    try {
        const response = await apiClient.get(
            `/statistics/search/deck?startDate=${deckStartDate.value}&endDate=${deckEndDate.value}&deckSeq=${deckSeq.value}&size=${deckPageSize.value}&page=${deckPage.value}`
        );

        if (response.status === 200) {
            deckLog.value = response.data.data;
            deckTotalCount.value = response.data.totalCnt;
        } else {
            console.log(response);
            toast.error('전적을 불러오던 중 오류가 발생하였습니다. 새로고침을 진행해주세요.');
        }
    } catch (error) {
        console.log(error);
        toast.error('전적을 불러오던 중 오류가 발생하였습니다. 새로고침을 진행해주세요.');
    }
}

const setUserSearchCondition = (start, end, seq) => {
    userPage.value = 1;

    userStartDate.value = start;
    userEndDate.value = end;
    userSeq.value = seq;

    searchUserLog();
}

const searchUserPage = (page) => {
    userPage.value = page;

    searchUserLog();
}

const searchUserLog = async () => {
    try {
        const response = await apiClient.get(
            `/statistics/search/fighter?startDate=${userStartDate.value}&endDate=${userEndDate.value}&fighterSeq=${userSeq.value}&size=${userPageSize.value}&page=${userPage.value}`
        );

        if (response.status === 200) {
            userLog.value = response.data.data;
            userTotalCount.value = response.data.totalCnt;
        } else {
            console.log(response);
            toast.error('전적을 불러오던 중 오류가 발생하였습니다. 새로고침을 진행해주세요.');
        }
    } catch (error) {
        console.log(error);
        toast.error('전적을 불러오던 중 오류가 발생하였습니다. 새로고침을 진행해주세요.');
    }
}
</script>

<template>
    <div class="rating-container">
        <div class="tab-area">
            <YgoButton @click="deckActive = true; userActive = false;" :class="{ active: deckActive }">덱</YgoButton>
            <YgoButton v-if="auth > 1" @click="userActive = true; deckActive = false;" :class="{ active: userActive }">유저</YgoButton>
        </div>
        <div class="tab-content-area" v-if="deckActive">
            <div class="search-area">
                <DeckSearch :set-condition="setDeckSearchCondition" />
            </div>
            <div class="display-area">
                <div class="page-size-selector">
                    <select v-model="deckPageSize" @change="searchDeckPage(1)">
                        <option value="10">10</option>
                        <option value="30">30</option>
                        <option value="100">100</option>
                    </select>
                    개씩 보기
                </div>
                <table>
                    <colgroup>
                        <col style="width: 25%"/>
                        <col/>
                    </colgroup>
                    <thead>
                        <tr>
                            <th>일시</th>
                            <th>덱</th>
                            <th>승리</th>
                            <th>패배</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="item in deckLog">
                            <td>{{ item.date }}</td>
                            <td>{{ item.name }}</td>
                            <td>{{ item.win }}</td>
                            <td>{{ item.lose }}</td>
                        </tr>
                    </tbody>
                </table>
                <Paging :page="deckPage" :set-data="searchDeckPage" :total-count="deckTotalCount" :data-per-page="deckPageSize"/>
            </div>
        </div>
        <div class="tab-content-area" v-else-if="userActive">
            <div class="search-area">
                <UserSearch :set-condition="setUserSearchCondition" />
            </div>
            <div class="display-area">
                <div class="page-size-selector">
                    <select v-model="userPageSize" @change="searchUserPage(1)">
                        <option value="10">10</option>
                        <option value="30">30</option>
                        <option value="100">100</option>
                    </select>
                    개씩 보기
                </div>
                <table>
                    <colgroup>
                        <col style="width: 25%"/>
                        <col/>
                    </colgroup>
                    <thead>
                    <tr>
                        <th>일시</th>
                        <th>유저</th>
                        <th>승리</th>
                        <th>패배</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr v-for="item in userLog">
                        <td>{{ item.date }}</td>
                        <td>{{ item.name }}</td>
                        <td>{{ item.win }}</td>
                        <td>{{ item.lose }}</td>
                    </tr>
                    </tbody>
                </table>
                <Paging :page="userPage" :set-data="searchUserPage" :total-count="userTotalCount" :data-per-page="userPageSize"/>
            </div>
        </div>
    </div>
</template>

<style scoped>
.rating-container {
    display: flex;
    flex-direction: column;
    width: 90vw;
    height: calc(100vh - 4rem);
    margin: 0 auto;

    .tab-area {
        .active {
            color: var(--primary2);
            border: 1px solid var(--primary2);
        }

        button {
            margin-right: 4px;
            border: 1px solid #7c858d;
        }
    }

    .tab-content-area {
        .search-area {
            width: 100%;
            margin-bottom: 1vh;
        }

        .display-area {
            margin: 1vh 1vw;

            table {
                width: 100%;

                border-spacing: 0;
                border-top: 1px solid #7c858d;
                border-bottom: 1px solid #7c858d;

                text-align: center;

                tr {
                    height: 3rem;

                    th {
                        border-bottom: 1px solid #c6c8c6;
                        border-right: 1px solid #c6c8c6;
                        background: var(--bg-element3);
                    }

                    th:first-child {
                        border-left: 0;
                    }

                    th:last-child {
                        border-right: 0;
                    }

                    td {
                        border-bottom: 1px solid #c6c8c6;
                        border-right: 1px solid #c6c8c6;
                    }

                    td:first-child {
                        border-left: 0;
                    }

                    td:last-child {
                        border-right: 0;
                    }
                }
            }

            .page-size-selector {
                margin-bottom: 1vh;
                float: right;

                select {
                    border: 0;
                    box-shadow: rgba(0, 0, 0, 0.15) 0 0 4px;
                    padding-left: .375rem;
                    line-height: 1.5rem;
                    font-size: 1.025rem;
                }
            }
        }
    }
}
</style>
