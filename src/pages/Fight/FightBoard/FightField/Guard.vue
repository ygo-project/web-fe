<script setup>
const props = defineProps({
    isVanguard: Boolean,
    criticalPoint: Number,
});
</script>

<template>
    <div :class="[{'guard-container':true}, {'vang':isVanguard}]">
        <strong>
            <slot />
        </strong>
        <div class="critical">
            <div v-for="index in criticalPoint"/>
        </div>
    </div>
</template>

<style scoped>
    .guard-container {
        position: relative;
        display: flex;
        align-items: center;
        justify-content: center;

        height: 7vw;
        width: 7vw;
        margin: 1% 10%;

        strong {
            color: var(--text1);
            font-size: 1.3rem;
        }

        .critical {
            position: absolute;
            display: flex;
            flex-direction: row;
            top: 0;
            left: 100%;

            div {
                height: 1vw;
                width: 1vw;
                background: var(--bg-element2) url("@/assets/imgs/critical-symbol.jpeg") center center;
                background-size: cover;
                border-radius: 1rem;
                opacity: 0.8;
            }
        }
    }

    .guard-container:before {
        content: "";
        position: absolute;
        z-index: -1;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;

        background: var(--bg-element2) url("@/assets/imgs/rearguard.jpeg") center center;
        background-size: cover;
        border-radius: 1rem;
        opacity: 0.2;
        width: 100%;
        height: 100%;
    }

    .vang:before {
        background-image: url("@/assets/imgs/vanguard.jpeg");
    }
</style>
