<script setup>
import YgoButton from "@/components/atom/YgoButton.vue";

const props = defineProps({
    up: Function,
    down: Function,
    largeUp: Function,
    largeDown: Function,
    overUp: Function,
    overDown: Function,
    critical: Function,
    drive: Function,
});
</script>

<template>
    <div class="keyboard-container">
        <div class="amount-wrapper">
            <YgoButton color="darkgray" :click-event="up">＋1K</YgoButton>
            <YgoButton color="darkgray" :click-event="down">－1K</YgoButton>
            <YgoButton color="darkgray" :click-event="largeUp">＋5K</YgoButton>
            <YgoButton color="darkgray" :click-event="largeDown">－5K</YgoButton>
            <YgoButton color="darkgray" :click-event="overUp">＋over</YgoButton>
            <YgoButton color="darkgray" :click-event="overDown">－over</YgoButton>
        </div>
        <div class="btn-wrapper">
            <YgoButton color="darkgray" :click-event="critical">크리티컬</YgoButton>
            <YgoButton color="darkgray" :click-event="drive">드라이브</YgoButton>
        </div>
    </div>
</template>

<style scoped>
    .keyboard-container {
        display: flex;
        align-items: center;
        justify-content: center;

        >div {
            margin: 0 auto;
        }

        button {
            padding: 0 1rem;
            margin-top: 2px;
            margin-left: 2px;
        }

        .amount-wrapper {
            display: flex;
            flex-direction: column;
            flex-wrap: wrap;
            justify-content: center;
            height: 70px;

            svg {
                height: 25px;
            }
        }

        .btn-wrapper {
            display: flex;
            flex-direction: column;
        }
    }
</style>
