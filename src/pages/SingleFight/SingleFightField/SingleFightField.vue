<script setup>
import SingleGuard from "@/pages/SingleFight/SingleFightField/SingleGuard.vue";
import SingleEnergyCounter from "@/pages/SingleFight/SingleFightField/SingleEnergyCounter.vue";

const props = defineProps({
    power: Array,
    energy: Array,
    critical: Array,
    drive: Array,
    selectedCircle: Array,
    selectCircle: Function,
})

const removeCritical = (idx) => {
    props.critical[idx] -= 1;
}

const removeDrive = (idx) => {
    props.drive[idx] -= 1;
}
</script>

<template>
    <div class="single-field-container">
        <div class="energy-container">
            <SingleEnergyCounter />
        </div>
        <div class="guard-container">
            <SingleGuard v-for="(item, idx) in power" @click="() => { selectCircle(idx); }" :is-vanguard="idx === 3"
                         :class="{ active: selectedCircle.indexOf(idx) >= 0 }" :critical-point="critical[idx]" :drive-point="drive[idx]"
                         :remove-critical="() => removeCritical(idx)" :remove-drive="() => removeDrive(idx)"
            >
                {{ item }}
            </SingleGuard>
        </div>
    </div>
</template>

<style scoped>
    .single-field-container {
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
