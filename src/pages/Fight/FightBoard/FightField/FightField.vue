<script setup>
import Guard from "@/pages/Fight/FightBoard/FightField/Guard.vue";

const props = defineProps({
    fightPoints: Array,
    criticalPoints: Array,
    setPower: Function,
    isUpSideDown: Boolean,
});
</script>

<template>
    <div class="field-container">
        <Guard v-for="(item, idx) in fightPoints" @click="setPower(idx)" :isVanguard="isUpSideDown ? idx === 2 : idx === 3"
            :critical-point="criticalPoints[idx]">{{ item }}</Guard>
    </div>
</template>

<style scoped>
    .field-container {
        display: flex;
        flex-direction: row;
        justify-content: center;
        flex-wrap: wrap;
    }
</style>
