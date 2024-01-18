<script setup>
import { ref } from "vue";

const isFlip = ref(false);
const coinValue = ref(true);

const coinFlip = () => {
    let i = Math.floor(Math.random() * 2);
    isFlip.value = true;
    if (i) {
        coinValue.value = true;
        setTimeout(() => {
            isFlip.value = false;
        }, 2000);
    } else {
        coinValue.value = false;
        setTimeout(() => {
            isFlip.value = false;
        }, 2000);
    }
}
</script>

<template>
    <div class="coin"  @click="coinFlip">
        <div v-if="coinValue" :class="isFlip ? 'flip' : ''">
            <div class="heads">
                <img src="@/assets/imgs/coin-front.webp" alt="동전 앞면">
            </div>
            <div class="tails">
                <img src="@/assets/imgs/coin-back.webp" alt="동전 뒷면">
            </div>
        </div>
        <div v-else :class="isFlip ? 'flip' : ''">
            <div class="heads">
                <img src="@/assets/imgs/coin-back.webp" alt="동전 뒷면">
            </div>
            <div class="tails">
                <img src="@/assets/imgs/coin-front.webp" alt="동전 앞면">
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
    .coin {
        margin: 32px auto;

        img {
            width: 145px;
        }

        div {
            position: relative;
            height: 150px;
            width: 150px;
            transform-style: preserve-3d;
            -webkit-transform-style: preserve-3d;

            .heads,.tails {
                position: absolute;
                width: 100%;
                height: 100%;
                backface-visibility: hidden;
                -webkit-backface-visibility: hidden;
            }

            .tails {
                transform: rotateX(180deg);
            }
        }
    }

    .flip {
        animation: spin 2s forwards;
    }

    @keyframes spin {
        0% {
            transform: rotateX(0);
        }
        100% {
            transform: rotateX(1800deg);
        }
    }
</style>
