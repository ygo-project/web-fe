<script setup>
import { onMounted, ref } from "vue";
import { toast } from "vue3-toastify";

import { apiClient } from "@/common/index.js";
import Rate from "@/components/atom/Rate.vue";

const nationRateList = ref([]);
const deckRateList = ref([]);
const championList = ref([]);

onMounted(async () => {
    // 국가별 승률 조회
    try {
        const response = await apiClient.get(`/statistics/nation`);

        if (response.status === 200) {
            nationRateList.value = response.data;
        } else {
            console.log(response);
            toast.error('국가별 정보를 불러오던 중 서버 오류가 발생하였습니다. 새로고침을 진행해주세요.');
        }
    } catch (error) {
        console.log(error);
        toast.error('국가별 정보를 불러오던 중 오류가 발생하였습니다. 새로고침을 진행해주세요.');
    }

    // 덱별 승률 TOP 10 조회
    try {
        const response = await apiClient.get(`/statistics/deck`);

        if (response.status === 200) {
            deckRateList.value = response.data;
        } else {
            console.log(response);
            toast.error('덱별 정보를 불러오던 중 서버 오류가 발생하였습니다. 새로고침을 진행해주세요.');
        }
    } catch (error) {
        console.log(error);
        toast.error('덱별 정보를 불러오던 중 오류가 발생하였습니다. 새로고침을 진행해주세요.');
    }

    //최근 우승자 조회
    try {
        const response = await apiClient.get(`/statistics/champion`);

        if (response.status === 200) {
            championList.value = response.data;
        } else {
            console.log(response);
            toast.error('우승자 정보를 불러오던 중 서버 오류가 발생하였습니다. 새로고침을 진행해주세요.');
        }
    } catch (error) {
        console.log(error);
        toast.error('우승자 정보를 불러오던 중 오류가 발생하였습니다. 새로고침을 진행해주세요.');
    }
});
</script>

<template>
    <div class="root-container">
        <div class="rate">
            <div>
                <h3>국가별 승률</h3>
                <table>
                    <colgroup>
                        <col width="*%" />
                        <col width="15%" />
                        <col width="15%" />
                        <col width="25%" />
                    </colgroup>
                    <thead>
                    <tr>
                        <th>이름</th>
                        <th>승리</th>
                        <th>패배</th>
                        <th>승률</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr v-for="item in nationRateList">
                        <td>{{ item.name }}</td>
                        <td>{{ item.win }}</td>
                        <td>{{ item.lose }}</td>
                        <td><Rate :value="item.rate" /></td>
                    </tr>
                    </tbody>
                </table>
            </div>
            <div>
                <h3>공식전 승률 TOP 10</h3>
                <table>
                    <colgroup>
                        <col width="*%" />
                        <col width="15%" />
                        <col width="15%" />
                        <col width="25%" />
                    </colgroup>
                    <thead>
                    <tr>
                        <th>이름</th>
                        <th>승리</th>
                        <th>패배</th>
                        <th>승률</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr v-for="item in deckRateList">
                        <td>{{ item.name }}</td>
                        <td>{{ item.win }}</td>
                        <td>{{ item.lose }}</td>
                        <td><Rate :value="item.rate" /></td>
                    </tr>
                    </tbody>
                </table>
            </div>
        </div>
        <div class="trophy">
            <div>
                <h3>우승자</h3>
                <table>
                    <colgroup>
                        <col width="25%" />
                        <col width="25%" />
                        <col width="*%" />
                    </colgroup>
                    <thead>
                    <tr>
                        <th>대회명</th>
                        <th>이름</th>
                        <th>덱</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr v-for="item in championList">
                        <td>{{ item.league }}</td>
                        <td>{{ item.fighter }}</td>
                        <td>{{ item.deck }}</td>
                    </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</template>

<style scoped>
.root-container {
    display: flex;
    flex-direction: column;
    width: 90vw;
    height: calc(100vh - 4rem);
    margin: 0 auto;

    > div {
        flex: 1;

        table {
            width: 100%;
            text-align: center;

            background: var(--bg-element2);

            thead {
                th {
                    vertical-align: bottom;
                    border-bottom: 1px solid var(--text1);
                    text-transform: uppercase;
                    font-size: 1.2rem;
                }
            }

            tbody {
                tr:nth-child(odd) {
                    background: var(--bg-element3);
                }
                tr:nth-child(even) {
                    background: var(--bg-element4);
                }
            }
        }
    }

    .rate {
        display: flex;
        flex-direction: row;

        > div {
            flex: 1;
        }
    }
}
</style>
