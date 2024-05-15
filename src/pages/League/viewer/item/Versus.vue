<script setup>
import { ref } from "vue";

import Fighter from "@/pages/League/viewer/item/Fighter.vue";

const props = defineProps({
    blue: Object,
    white: Object,
    blueWin: Function,
    whiteWin: Function,
});

const blueDisabled = ref(props.blue.isLose);
const whiteDisabled = ref(props.white.isLose);
</script>

<template>
<div class="versus-container">
    <Fighter :fighter="blue" @click="() => { blueWin(); blueDisabled = false; whiteDisabled = true; }" :is-disabled="blueDisabled" />
    <b>VS</b>
    <Fighter :fighter="white" @click="() => { whiteWin(); whiteDisabled = false; blueDisabled = true; }" :is-disabled="whiteDisabled" />
</div>
</template>

<style scoped>
.versus-container {
    flex: 0 0 auto;
    display: flex;
    flex-direction: row;
    align-items: center;

    > div {
        flex: 0 0 auto;
        cursor: pointer;
    }
}
</style>
