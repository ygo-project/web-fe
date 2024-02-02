<script setup>
import Guard from "@/pages/Fight/FightBoard/FightField/Guard.vue";

const props = defineProps({
    fightPoints: Array,
    setPower: Function,
});
</script>

<template>
    <div class="field-container">
        <Guard v-for="(item, idx) in fightPoints" @click="setPower(idx)">{{ item }}</Guard>
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
