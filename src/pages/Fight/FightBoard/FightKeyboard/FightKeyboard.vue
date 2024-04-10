<script setup>
import YgoButton from "@/components/atom/YgoButton.vue";
import IconBase from "@/components/atom/IconBase.vue";
import ChevronUp from "@/assets/svgs/ChevronUp.vue";
import ChevronDown from "@/assets/svgs/ChevronDown.vue";

const props = defineProps({
    amount: Number,
    up: Function,
    down: Function,
    largeUp: Function,
    largeDown: Function,
    front: Function,
    over: Function,
    critical: Function
});
</script>

<template>
    <div class="keyboard-container">
        <div class="amount-wrapper">
            <input type="text" readonly :value="amount" />
            <div>
                <YgoButton color="darkgray" :click-event="up">＋1K</YgoButton>
                <YgoButton color="darkgray" :click-event="down">－1K</YgoButton>
                <YgoButton color="darkgray" :click-event="largeUp">＋5K</YgoButton>
                <YgoButton color="darkgray" :click-event="largeDown">－5K</YgoButton>
            </div>
        </div>
        <div class="btn-wrapper">
            <YgoButton color="darkgray" :click-event="over">옵트</YgoButton>
            <YgoButton color="darkgray" :click-event="front">프론트</YgoButton>
            <YgoButton color="darkgray" :click-event="critical">크리티컬</YgoButton>
        </div>
    </div>
</template>

<style scoped>
    .keyboard-container {
        display: flex;
        align-items: center;
        justify-content: center;

        .amount-wrapper {
            display: flex;
            justify-content: center;

            input {
                display: block;
                width: 40%;
                background: transparent;
                border: none;
                outline: none;
                color: var(--text2);
                line-height: 1.5;
                font-size: 1.5rem;
                transition: all 0.125s ease-in 0s;
                border-bottom: 1px solid var(--border2);
            }

            svg {
                height: 25px;
            }

            div {
                width: 160px;

                button {
                    margin-top: 2px;
                    margin-left: 2px;
                }
            }
        }

        .btn-wrapper {
            width: 290px;

            button {
                width: 140px;
                margin-top: 2px;
                margin-left: 2px;
            }
        }
    }
</style>
