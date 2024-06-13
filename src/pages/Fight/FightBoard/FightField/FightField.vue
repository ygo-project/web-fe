<script setup>
import Guard from "@/pages/Fight/FightBoard/FightField/Guard.vue";
import EnergyCounter from "@/pages/Fight/FightBoard/FightField/EnergyCounter.vue";

const props = defineProps({
    fightPoints: Array,
    criticalPoints: Array,
    drivePoints: Array,
    selectedCircle: Array,
    selectCircle: Function,
    isUpSideDown: Boolean,
});

const removeCritical = (idx) => {
    props.criticalPoints[idx] -= 1;
}

const removeDrive = (idx) => {
    props.drivePoints[idx] -= 1;
}
</script>

<template>
    <div class="field-container">
        <div v-if="!isUpSideDown">
            <EnergyCounter />
        </div>
        <div class="guard-container">
            <Guard v-for="(item, idx) in fightPoints" @click="() => { selectCircle(idx); }" :isVanguard="isUpSideDown ? idx === 2 : idx === 3"
                   :class="{ active: selectedCircle.indexOf(idx) >= 0 }" :critical-point="criticalPoints[idx]" :drive-point="drivePoints[idx]"
                   :remove-critical="() => removeCritical(idx)" :remove-drive="() => removeDrive(idx)"
            >
                {{ item }}
            </Guard>
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

            .active:before {
                opacity: 0.8;
            }
        }
    }
</style>
