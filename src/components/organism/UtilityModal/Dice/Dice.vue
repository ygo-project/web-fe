<script setup>
import DiceFace from "@/components/organism/UtilityModal/Dice/DiceFace.vue";
import { computed } from "vue";

const props = defineProps({
    value: { type: Number },
    roll: { type: Boolean, default: false },
});

const diceClass = computed(() => `dice-${props.value}`);
</script>

<template>
    <div class="dice" :class="roll ? diceClass + ' roll-dice' : diceClass">
        <DiceFace :face-value="1"/>
        <DiceFace :face-value="2"/>
        <DiceFace :face-value="3"/>
        <DiceFace :face-value="4"/>
        <DiceFace :face-value="5"/>
        <DiceFace :face-value="6"/>
    </div>
</template>

<style lang="scss">
    .dice {
        width: 100px;
        height: 100px;
        position: relative;
        transform-style: preserve-3d;

        .dice-face {
            position: absolute;
            top: 0;
            left: 0;
        }
    }

    .dice-1 {
        .dice-face {
            &.dice-face-1 {
                transform: rotateY(0deg) translateZ(50px);
            }

            &.dice-face-2 {
                transform: rotateY(90deg) translateZ(50px);
            }

            &.dice-face-3 {
                transform: rotateX(-90deg) translateZ(50px);
            }

            &.dice-face-4 {
                transform: rotateX(90deg) translateZ(50px);
            }

            &.dice-face-5 {
                transform: rotateY(-90deg) translateZ(50px);
            }

            &.dice-face-6 {
                transform: rotateY(180deg) translateZ(50px);
            }
        }
    }

    .dice-2 {
        .dice-face {
            &.dice-face-1 {
                transform: rotateY(-90deg) translateZ(50px);
            }

            &.dice-face-2 {
                transform: rotateY(0deg) translateZ(50px);
            }

            &.dice-face-3 {
                transform: rotateX(-90deg) translateZ(50px);
            }

            &.dice-face-4 {
                transform: rotateX(90deg) translateZ(50px);
            }

            &.dice-face-5 {
                transform: rotateY(180deg) translateZ(50px);
            }

            &.dice-face-6 {
                transform: rotateY(90deg) translateZ(50px);
            }
        }
    }

    .dice-3 {
        .dice-face {
            &.dice-face-1 {
                transform: rotateX(90deg) translateZ(50px);
            }

            &.dice-face-2 {
                transform: rotateY(90deg) translateZ(50px);
            }

            &.dice-face-3 {
                transform: rotateY(0deg) translateZ(50px);
            }

            &.dice-face-4 {
                transform: rotateY(180deg) translateZ(50px);
            }

            &.dice-face-5 {
                transform: rotateY(-90deg) translateZ(50px);
            }

            &.dice-face-6 {
                transform: rotateX(-90deg) translateZ(50px);
            }
        }
    }

    .dice-4 {
        .dice-face {
            &.dice-face-1 {
                transform: rotateX(-90deg) translateZ(50px);
            }

            &.dice-face-2 {
                transform: rotateY(90deg) translateZ(50px);
            }

            &.dice-face-3 {
                transform: rotateY(180deg) translateZ(50px);
            }

            &.dice-face-4 {
                transform: rotateY(0deg) translateZ(50px);
            }

            &.dice-face-5 {
                transform: rotateY(-90deg) translateZ(50px);
            }

            &.dice-face-6 {
                transform: rotateX(90deg) translateZ(50px);
            }
        }
    }

    .dice-5 {
        .dice-face {
            &.dice-face-1 {
                transform: rotateY(90deg) translateZ(50px);
            }

            &.dice-face-2 {
                transform: rotateY(180deg) translateZ(50px);
            }

            &.dice-face-3 {
                transform: rotateX(-90deg) translateZ(50px);
            }

            &.dice-face-4 {
                transform: rotateX(90deg) translateZ(50px);
            }

            &.dice-face-5 {
                transform: rotateY(0deg) translateZ(50px);
            }

            &.dice-face-6 {
                transform: rotateY(-90deg) translateZ(50px);
            }
        }
    }

    .dice-6 {
        .dice-face {
            &.dice-face-1 {
                transform: rotateY(180deg) translateZ(50px);
            }

            &.dice-face-2 {
                transform: rotateY(-90deg) translateZ(50px);
            }

            &.dice-face-3 {
                transform: rotateX(-90deg) translateZ(50px);
            }

            &.dice-face-4 {
                transform: rotateX(90deg) translateZ(50px);
            }

            &.dice-face-5 {
                transform: rotateY(90deg) translateZ(50px);
            }

            &.dice-face-6 {
                transform: rotateY(0deg) translateZ(50px);
            }
        }
    }

    .roll-dice {
        animation: spin .8s linear infinite;
        transition: transform 0.8s;
        transform-origin: center;

        @keyframes spin {
            0% {
                transform: rotateX(0deg) rotateY(0deg) rotateZ(0deg);
            }
            100% {
                transform: rotateX(360deg) rotateY(360deg) rotateZ(360deg);
            }
        }
    }
</style>
