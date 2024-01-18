<script setup>
import { ref } from "vue";
import LifePointBoard from "@/pages/Duel/LifePointBoard/LifePointBoard.vue";
import UtilityModal from "@/components/organism/UtilityModal/UtilityModal.vue";
import IconBase from "@/components/atom/IconBase.vue";
import JoystickIcon from "@/assets/svgs/JoystickIcon.vue";

const utilityModalPopup = ref(false);

const utilPopup = () => {
    utilityModalPopup.value = !utilityModalPopup.value;
}
</script>

<template>
    <div class="duel-page-container">
        <div class="board-container">
            <LifePointBoard />
        </div>
        <div class="board-center">
            <div class="setting-hover" @click="utilPopup">
                <IconBase><JoystickIcon /></IconBase>
            </div>
        </div>
        <div class="board-container">
            <LifePointBoard />
        </div>
    </div>
    <div v-if="utilityModalPopup">
        <UtilityModal :close-modal="utilPopup"/>
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

        .board-center {
            display: flex;
            flex-direction: column;
            justify-content: flex-end;
            margin-bottom: 20px;

            .setting-hover {
                display: flex;
                align-items: center;
                justify-content: center;
                width: 40px;
                height: 40px;
                margin-left: 0.3rem;
                border-radius: 40px;
                color: var(--text1);

                svg {
                    width: 24px;
                    height: 24px;
                    pointer-events: none;
                    color: var(--text1);

                    font-size: 24px;
                }

                &:hover {
                    background-color: var(--slight-layer);
                    cursor: pointer;
                }
            }
        }
    }
</style>
