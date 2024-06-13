<script setup>
const props = defineProps({
    isVanguard: Boolean,
    criticalPoint: Number,
    drivePoint: Number,
    removeCritical: Function,
    removeDrive: Function,
});
</script>

<template>
    <div :class="[{'guard-container':true}, {'vang':isVanguard}]">
        <strong>
            <slot />
        </strong>
        <div class="critical">
            <div v-for="index in criticalPoint" @click.capture.stop="removeCritical" />
        </div>
        <div class="drive" v-if="drivePoint > 0" @click.capture.stop="removeDrive" >
<!--            <div />-->
            <span>Drive</span>
            <strong>＋{{ drivePoint }}</strong>
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
                height: 2rem;
                width: 2rem;
                background: var(--bg-element2) url("@/assets/imgs/critical-symbol.jpeg") center center;
                background-size: cover;
                border-radius: 1rem;
                opacity: 0.8;

                cursor: pointer;
            }
        }

        .drive {
            position: absolute;
            display: flex;
            flex-direction: row;
            align-items: center;
            bottom: 0;
            left: 100%;

            color: #005cc5 !important;
            cursor: pointer;

            div {
                display: inline-block;
                height: 2rem;
                width: 2rem;
                background: var(--bg-element2) url("@/assets/imgs/drive-symbol.png") center center;
                background-size: cover;
                border-radius: 1rem;
                opacity: 0.8;
            }

            span {
                white-space: nowrap;
            }

            strong {
                white-space: nowrap;
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
