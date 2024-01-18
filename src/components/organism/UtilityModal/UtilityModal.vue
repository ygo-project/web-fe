<script setup>
import { ref } from "vue";
import IconBase from "@/components/atom/IconBase.vue";
import XIcon from "@/assets/svgs/XIcon.vue";
import Dice from "@/components/organism/UtilityModal/Dice/Dice.vue";
import Coin from "@/components/organism/UtilityModal/Coin.vue";

const props = defineProps({
    closeModal: { type: Function },
})

const diceValue = ref(1);
const diceRolling = ref(false);

const diceRoll = () => {
    diceRolling.value = true;
    diceValue.value = Math.floor(Math.random() * 6) + 1;

    setTimeout(() => {
        diceRolling.value = false;
    }, 1600);
}

</script>

<template>
    <div>
        <div class="modal-background" />
        <div class="modal-positioner">
            <div class="modal-container">
                <div class="left-block">
                    <div class="wrapper">
                        <Coin />
                    </div>
                </div>
                <div class="right-block">
                    <div class="exit" @click="closeModal">
                        <IconBase><XIcon /></IconBase>
                    </div>
                    <div class="wrapper" @click="diceRoll">
                        <Dice :value="diceValue" :roll="diceRolling"/>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
.modal-background {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: var(--opaque-layer);
    z-index: 10;
    animation: 0.25s ease 0s 1 normal forwards running cJoqxJ;
}

.modal-positioner {
    position: fixed;
    top: 0;
    left: 0;
    display: flex;
    -webkit-box-align: center;
    align-items: center;
    -webkit-box-pack: center;
    justify-content: center;
    width: 100%;
    height: 100%;
    z-index: 20;
}

.modal-container {
    display: flex;
    width: 600px;
    height: 530px;
    animation: 0.4s ease-in-out 0s 1 normal forwards running cptskd;
    box-shadow: rgb(0 0 0 / 9%) 0 2px 12px 0;

    .left-block {
        display: flex;
        flex-direction: column;
        -webkit-box-pack: center;
        justify-content: center;
        -webkit-box-align: center;
        align-items: center;
        width: 50%;
        padding: 1.5rem;
        background: var(--bg-element2);

        .wrapper {
            flex: 1 1 0;
            display: flex;
            flex-direction: column;
            justify-content: center;
        }
    }

    .right-block {
        display: flex;
        flex-direction: column;
        -webkit-box-pack: center;
        justify-content: center;
        -webkit-box-align: center;
        align-items: center;
        width: 50%;
        padding: 1.5rem;
        background: var(--bg-element2);

        .exit {
            width: 100%;
            display: flex;
            -webkit-box-pack: end;
            justify-content: flex-end;
            font-size: 0.5rem;
            color: var(--text3);
            cursor: pointer;

            svg {
                width: 24px;
                height: 24px;
            }
        }

        .wrapper {
            flex: 1 1 0;
            display: flex;
            flex-direction: column;
            justify-content: center;
        }
    }
}
</style>
