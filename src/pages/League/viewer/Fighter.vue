<script setup>
import { useStore } from "vuex";

import IconBase from "@/components/atom/IconBase.vue";
import XCircleIcon from "@/assets/svgs/XCircleIcon.vue";
import {computed} from "vue";

const store = useStore();

const props = defineProps({
    fighter: Object,
});

const nation = computed(() => props.fighter.deckNation === '드래곤 엠파이어' ? 'red' :
                                    props.fighter.deckNation === '다크 스테이츠' ? 'blue' :
                                    props.fighter.deckNation === '브랜트 게이트' ? 'gray' :
                                    props.fighter.deckNation === '케테르 생츄어리' ? 'yellow' :
                                    props.fighter.deckNation === '스토이케이아' ? 'green' :
                                    props.fighter.deckNation === '리리컬 모나스테리오' ? 'pink' : 'white');

const deleteFighter = () => {
    const now = store.getters.GET_FIGHTER_LIST;
    const filtered = [];

    now.forEach((value, index, array) => {
        if (value.fighter !== props.fighter.fighter || value.deck !== props.fighter.deck) {
            filtered.push(value);
        }
    });

    store.dispatch('ACT_FIGHTER_LIST', filtered);
}
</script>

<template>
    <div :class="'fighter-info-container ' + nation">
        <IconBase @click="deleteFighter"><XCircleIcon></XCircleIcon></IconBase>
        <b>{{ fighter.fighter }}</b>
        |
        <span>{{ fighter.deckName }}</span>
    </div>
</template>

<style scoped>
.fighter-info-container {
    position: relative;
    margin: .5rem .875rem;
    padding: .25rem 20px .25rem .625rem;
    border-radius: 5px;
    font-size: 1.125rem;

    svg {
        color: var(--text1);
        position: absolute;
        right: 0;
        top: 0;
        width: 12px;
        height: 12px;
        margin: .125rem;

        cursor: pointer;
    }

    &.red {
        background: #db4455;
    }

    &.blue {
        background: #005cc5;
    }

    &.gray {
        background: #7c858d;
    }

    &.yellow {
        background: goldenrod;
    }

    &.green {
        background: #63a35c;
    }

    &.pink {
        background: #fa8ee5;
    }

    &.white {
        background: #fbfcfd;
    }
}
</style>
