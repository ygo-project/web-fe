<script setup>
import { computed, ref } from "vue";

import IconBase from "@/components/atom/IconBase.vue";
import ChevronDoubleLeft from "@/assets/svgs/ChevronDoubleLeft.vue";
import ChevronLeft from "@/assets/svgs/ChevronLeft.vue";
import ChevronRight from "@/assets/svgs/ChevronRight.vue";
import ChevronDoubleRight from "@/assets/svgs/ChevronDoubleRight.vue";

const props = defineProps({
    page: Number,
    setData: Function,
    totalCount: Number,
    dataPerPage: Number,
});

const totalPageCount = computed(() => Math.floor(props.totalCount / props.dataPerPage) + 1);
const isFistPage = computed(() => props.page === 1);
const isLastPage = computed(() => props.page === totalPageCount.value);

const lPage = ref(1);
const rPage = computed(() => Math.min(Number.parseInt(totalPageCount.value), 10));

const range = computed(() => {
    let list = []
    for (let i = lPage.value; i <= rPage.value ; i ++) list.push(i);
    return list;
})
</script>

<template>
<div class="paging-container">
    <div class="paginate">
        <IconBase :class="{disabled : isFistPage}" @click="!isFistPage ? setData(1) : ''"><ChevronDoubleLeft/></IconBase>
        <IconBase :class="{disabled : isFistPage}" @click="!isFistPage ? setData(page - 1) : ''"><ChevronLeft/></IconBase>
        <span v-for="i in range" :class="{active: i === page}" @click="i !== page ? setData(i) : ''">{{ i }}</span>
        <IconBase :class="{disabled : isLastPage}" @click="!isLastPage ? setData(page + 1) : ''"><ChevronRight/></IconBase>
        <IconBase :class="{disabled : isLastPage}" @click="!isLastPage ? setData(totalPageCount) : ''"><ChevronDoubleRight/></IconBase>
    </div>
</div>
</template>

<style scoped>
.paging-container {
    .paginate {
        padding-top: 30px;
        display: flex;
        justify-content: center;

        .active {
            background-color: var(--bg-element4);
            border-color: var(--bg-element4);
            color: var(--text1);
            cursor: default;
        }

        svg {
            width: 24px;
            height: 24px;
            margin: 0 4px;
            cursor: pointer;
        }

        span {
            min-width: 14px;
            height: 24px;
            padding: 0 8px;
            margin: 0 4px;
            border: 1px solid var(--bg-element9);
            color: var(--text1);
            text-align: center;
            line-height: 24px;
            transition: 0.5s;
            cursor: pointer;
        }

        .disabled {
            color: #969896;
            cursor: default;
        }
    }
}
</style>
