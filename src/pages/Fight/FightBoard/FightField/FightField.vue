<script setup>
import Guard from "@/pages/Fight/FightBoard/FightField/Guard.vue";
import EnergyCounter from "@/pages/Fight/FightBoard/FightField/EnergyCounter.vue";

const props = defineProps({
    fightPoints: Array,
    criticalPoints: Array,
    setPower: Function,
    isUpSideDown: Boolean,
});
</script>

<template>
    <div class="field-container">
        <div v-if="!isUpSideDown">
            <EnergyCounter />
        </div>
        <div class="guard-container">
            <Guard v-for="(item, idx) in fightPoints" @click="setPower(idx)" :isVanguard="isUpSideDown ? idx === 2 : idx === 3"
                   :critical-point="criticalPoints[idx]">{{ item }}</Guard>
        </div>
        <div v-if="isUpSideDown" class="energy-container">
            <EnergyCounter />
        </div>
    </div>
</template>

<style scoped>
    .field-container {
        display: flex;
        flex-direction: row;

        .guard-container {
            display: flex;
            flex-direction: row;
            justify-content: center;
            flex-wrap: wrap;
        }
    }
</style>
