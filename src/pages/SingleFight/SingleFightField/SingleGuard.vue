<script setup>
const props = defineProps({
    isVanguard: Boolean,
    criticalPoint: Number,
    drivePoint: Number,
});
</script>

<template>
    <div :class="[{'guard-container':true}, {'vang':isVanguard}]">
        <strong>
            <slot />
        </strong>
        <div class="ability">
            <div class="critical" v-if="criticalPoint !== 0">
                <span>Critical</span>
                <strong>{{ (criticalPoint > 0 ? '＋' : '－') + Math.abs(criticalPoint) }}</strong>
            </div>
            <div class="drive" v-if="drivePoint !== 0">
                <span>Drive</span>
                <strong>{{ (drivePoint > 0 ? '＋' : '－') + Math.abs(drivePoint) }}</strong>
            </div>
        </div>
    </div>
</template>

<style scoped>
.guard-container {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;

    height: 10vw;
    width: 10vw;
    margin: 1% 7% auto 7%;

    strong {
        color: var(--text1);
    }

    .ability {
        position: absolute;
        display: flex;
        flex-direction: column;
        top: 100%;
        left: 0;

        .critical {
            display: flex;
            flex-direction: row;
            align-items: center;
            color: #ca8a04 !important;

            span {
                white-space: nowrap;
            }

            strong {
                white-space: nowrap;
            }
        }

        .drive {
            display: flex;
            flex-direction: row;
            align-items: center;
            color: #005cc5 !important;

            span {
                white-space: nowrap;
            }

            strong {
                white-space: nowrap;
            }
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
