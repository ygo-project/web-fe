<script setup>
import { computed } from "vue";
import { useStore } from "vuex";

import InputController from "@/pages/League/controller/Input/InputController.vue";
import FirstStep from "@/pages/League/viewer/FirstStep.vue";
import SecondStep from "@/pages/League/viewer/SecondStep.vue";
import ThirdStep from "@/pages/League/viewer/ThirdStep.vue";

const store = useStore();

const stage = computed(() => store.getters.GET_STAGE );
</script>

<template>
    <div class="league-container">
        <div class="league-controller">
            <InputController v-if="stage === 0"/>
        </div>
        <div class="league-viewer">
            <FirstStep v-if="stage === 0"/>
            <SecondStep v-else-if="stage === 1"/>
            <ThirdStep v-else-if="stage === 2"/>
        </div>
    </div>
</template>

<style scoped>
    .league-container {
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        width: 90vw;
        height: calc(100vh - 4rem);
        margin: 0 auto;

        .league-controller {
            width: 100%;
            background: var(--bg-element2);
            border-radius: 1rem;
            margin-bottom: 1vh;
        }

        .league-viewer {
            width: 100%;
            background: var(--bg-element2);
            border-radius: 1rem;
        }
    }
</style>
