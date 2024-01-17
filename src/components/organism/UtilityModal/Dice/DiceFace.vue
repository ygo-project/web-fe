<script setup>
const props = defineProps({
    faceValue: { type: Number },
});

const faceClass = `dice-face-${props.faceValue}`;
</script>

<template>
    <div class="dice-face" :class="faceClass">
        <div class="dice-face-dot" v-for="n in faceValue" />
    </div>
</template>

<style scoped>
    .dice-face {
        width: 100px;
        height: 100px;
        background-color: var(--bg-element3);
        object-fit: contain;
        border: 1px solid #333;
        display: flex;
        justify-content: space-between;

        .dice-face-dot {
            display: block;
            width: 10px;
            height: 10px;
            background-color: var(--text3);
            box-shadow: inset -0.15rem 0.15rem 0.25rem rgba(0, 0, 0, 0.5);
            border-radius: 50%;
        }

        &.dice-face-1 {
            align-items: center;
            justify-content: center;
        }

        &.dice-face-2 {
            padding: 10px;
            div {
                &:last-child {
                    align-self: flex-end;
                }
            }
        }

        &.dice-face-3 {
            padding: 10px;
            div {
                &:nth-child(2) {
                    align-self: center;
                }
                &:last-child {
                    align-self: flex-end;
                }
            }
        }

        &.dice-face-4 {
            padding: 5px;
            display: grid;
            grid-template-columns: 20px 20px;
            align-items: center;
            justify-items: center;
        }

        &.dice-face-5 {
            padding: 10px;
            display: grid;
            align-items: center;
            justify-items: center;

            div {
                &:nth-child(1) {
                    grid-column: 1;
                }
                &:nth-child(2) {
                    grid-column: 3;
                }
                &:nth-child(3) {
                    grid-column: 2;
                }
                &:nth-child(4) {
                    grid-column: 1;
                }
                &:nth-child(5) {
                    grid-column: 3;
                }
            }
        }

        &.dice-face-6 {
            padding: 5px;
            display: grid;
            grid-template-columns: 20px 20px;
            align-items: center;
            justify-items: center;
        }
    }
</style>
