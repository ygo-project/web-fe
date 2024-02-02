<script setup>
import YgoButton from "@/components/atom/YgoButton.vue";
import IconBase from "@/components/atom/IconBase.vue";
import ChevronUp from "@/assets/svgs/ChevronUp.vue";
import ChevronDown from "@/assets/svgs/ChevronDown.vue";

const props = defineProps({
    amount: Number,
    up: Function,
    down: Function,
    front: Function,
    over: Function,
});
</script>

<template>
    <div class="keyboard-container">
        <div class="amount-wrapper">
            <input type="text" readonly :value="amount" />
            <div>
                <YgoButton color="darkgray" :click-event="up"><IconBase><ChevronUp /></IconBase></YgoButton>
                <YgoButton color="darkgray" :click-event="down"><IconBase><ChevronDown /></IconBase></YgoButton>
            </div>
        </div>
        <div class="btn-wrapper">
            <YgoButton color="darkgray" :click-event="over">오버 트리거</YgoButton>
            <YgoButton color="darkgray" :click-event="front">전열</YgoButton>
            <YgoButton color="darkgray">크리티컬</YgoButton>
            <YgoButton color="darkgray">되돌리기</YgoButton>
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
                width: 120px;
            }
        }

        .btn-wrapper {
            width: 270px;

            button {
                width: 120px;
                margin-bottom: 5px;
                margin-left: 5px;
            }
        }
    }
</style>
