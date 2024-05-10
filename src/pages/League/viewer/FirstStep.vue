<script setup>
import { computed } from "vue";
import { useStore } from "vuex";
import { toast } from "vue3-toastify";

import Fighter from "@/pages/League/viewer/item/Fighter.vue";
import YgoButton from "@/components/atom/YgoButton.vue";
import {apiClient} from "@/common/index.js";

const store = useStore();

const fighterList = computed(() => store.getters.GET_FIGHTER_LIST);
const isPossible = computed(() => store.getters.GET_FIGHTER_LIST.length >= 16);
const isCanTournament = computed(() => store.getters.GET_FIGHTER_LIST.length >= 2);

const proceed = () => {
    const leagueName = store.getters.GET_LEAGUE_NAME;

    if (leagueName === '') {
        toast.info('대회명을 입력해주세요.');
        return;
    }

    setLeague(leagueName);

    store.dispatch('ACT_STAGE', 1);
}

const skipSwiss = () => {
    const leagueName = store.getters.GET_LEAGUE_NAME;

    if (leagueName === '') {
        toast.info('대회명을 입력해주세요.');
        return;
    }

    setLeague(leagueName);

    store.dispatch('ACT_STAGE', 2);
}

const setLeague = async (leagueName) => {
    const body = {
        userId : localStorage.getItem('userId'),
        name: leagueName,
    };

    try {
        const response = await apiClient.post('/league/insert', body);

        if (response.status === 200) {
            await store.dispatch('ACT_LEAGUE_SEQ', response.data);
        }
    } catch (error) {
        console.log(error);
    }
}
</script>

<template>
    <div class="fighter-list">
        <Fighter v-for="item in fighterList" :fighter="item" />
    </div>
    <div class="btn-box">
        <YgoButton v-if="!isPossible" class="impossible" disabled color="darkgray">진행</YgoButton>
        <YgoButton v-else color="teal" :click-event="proceed">진행</YgoButton>

        <YgoButton v-if="!isCanTournament" class="impossible" disabled color="darkgray">토너먼트 직행</YgoButton>
        <YgoButton v-else color="teal" :click-event="skipSwiss">토너먼트 직행</YgoButton>
    </div>
</template>

<style scoped>
.fighter-list {
    display: flex;
    flex-direction: row;
    justify-content: center;
    flex-wrap: wrap;

    margin: 1.5rem 0;
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
