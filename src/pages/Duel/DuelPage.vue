<script setup>
import LifePointBoard from "@/pages/Duel/LifePointBoard/LifePointBoard.vue";
</script>

<template>
    <div class="duel-page-container">
        <div class="board-container">
            <LifePointBoard />
        </div>
        <div class="board-center">

        </div>
        <div class="board-container">
            <LifePointBoard />
        </div>
    </div>
</template>

<style scoped>
    .duel-page-container {
        display: flex;
        justify-content: space-between;
        margin: 0 auto;

        .board-container {
            width: 40%;
        }
    }
</style>
