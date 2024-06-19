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
    deselect: Function,
    end: Function,
});
</script>

<template>
    <div class="single-keyboard-container">
        <div class="power-wrapper">
            <YgoButton color="darkgray" :click-event="up">＋1K</YgoButton>
            <YgoButton color="darkgray" :click-event="down">－1K</YgoButton>
            <YgoButton color="darkgray" :click-event="largeUp">＋5K</YgoButton>
            <YgoButton color="darkgray" :click-event="largeDown">－5K</YgoButton>
            <YgoButton color="darkgray" :click-event="overUp">＋over</YgoButton>
            <YgoButton color="darkgray" :click-event="overDown">－over</YgoButton>
        </div>
        <div class="ability-wrapper">
            <YgoButton color="darkgray" :click-event="critical">크리티컬 ＋ 1</YgoButton>
            <YgoButton color="darkgray" :click-event="drive">드라이브 ＋ 1</YgoButton>
        </div>
        <div class="utility-wrapper">
            <YgoButton color="darkgray" :click-event="deselect">선택해제</YgoButton>
            <YgoButton color="darkgray" :click-event="end">턴 종료</YgoButton>
        </div>
    </div>
</template>

<style scoped>
    .single-keyboard-container {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;

        .power-wrapper {
            display: flex;
            flex-direction: row;
            flex-wrap: wrap;
            align-items: center;
            justify-content: center;
            margin-bottom: 1rem;
            width: 190px;

            button {
                margin-bottom: 3px;
                margin-right: 3px;
            }
        }

        .ability-wrapper {
            display: flex;
            flex-direction: column;
            align-items: center;
            margin-bottom: 1rem;

            button {
                margin-bottom: 3px;
            }
        }

        .utility-wrapper {
            display: flex;
            flex-direction: column;
            align-items: center;

            button {
                margin-bottom: 3px;
            }
        }
    }
</style>
