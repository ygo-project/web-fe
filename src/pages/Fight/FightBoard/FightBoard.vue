<script setup>
import { ref } from "vue";

import FightField from "@/pages/Fight/FightBoard/FightField/FightField.vue";
import FightKeyboard from "@/pages/Fight/FightBoard/FightKeyboard/FightKeyboard.vue";

const props = defineProps({
    fightPointDisplay: Array,
    fightPointReal: Array,
    criticalPoints: Array,
    drivePoints: Array,
    isUpSideDown: Boolean,
});

const selectedCircle = ref([]);

const increaseAmount = () => {
    selectedCircle.value.forEach((value, index, array) => {
        const now = props.fightPointReal[value];
        const pur = now + 1000;
        props.fightPointReal[value] = pur;

        const diff = Math.ceil((pur - now) / 21);
        let time = 0;
        for (let start = now; start !== pur; start += diff) {
            setTimeout(() => {
                props.fightPointDisplay[value] = start;
            }, 20 * time);

            if (diff > 0 && start + diff > pur) {
                start = pur - diff;
                setTimeout(() => {
                    props.fightPointDisplay[value] = pur;
                }, 20 * (time + 1));
            }

            if (diff < 0 && start + diff < pur) {
                start = pur - diff;
                setTimeout(() => {
                    props.fightPointDisplay[value] = pur;
                }, 20 * (time + 1));
            }

            time++;
        }
    });
}

const decreaseAmount = () => {
    selectedCircle.value.forEach((value, index, array) => {
        const now = props.fightPointReal[value];
        const pur = now - 1000;
        props.fightPointReal[value] = pur;

        const diff = Math.ceil((pur - now) / 21);
        let time = 0;
        for (let start = now; start !== pur; start += diff) {
            setTimeout(() => {
                props.fightPointDisplay[value] = start;
            }, 20 * time);

            if (diff > 0 && start + diff > pur) {
                start = pur - diff;
                setTimeout(() => {
                    props.fightPointDisplay[value] = pur;
                }, 20 * (time + 1));
            }

            if (diff < 0 && start + diff < pur) {
                start = pur - diff;
                setTimeout(() => {
                    props.fightPointDisplay[value] = pur;
                }, 20 * (time + 1));
            }

            time++;
        }
    });
}

const increaseLarge = () => {
    selectedCircle.value.forEach((value, index, array) => {
        const now = props.fightPointReal[value];
        const pur = now + 5000;
        props.fightPointReal[value] = pur;

        const diff = Math.ceil((pur - now) / 21);
        let time = 0;
        for (let start = now; start !== pur; start += diff) {
            setTimeout(() => {
                props.fightPointDisplay[value] = start;
            }, 20 * time);

            if (diff > 0 && start + diff > pur) {
                start = pur - diff;
                setTimeout(() => {
                    props.fightPointDisplay[value] = pur;
                }, 20 * (time + 1));
            }

            if (diff < 0 && start + diff < pur) {
                start = pur - diff;
                setTimeout(() => {
                    props.fightPointDisplay[value] = pur;
                }, 20 * (time + 1));
            }

            time++;
        }
    });
}

const decreaseLarge = () => {
    selectedCircle.value.forEach((value, index, array) => {
        const now = props.fightPointReal[value];
        const pur = now - 5000;
        props.fightPointReal[value] = pur;

        const diff = Math.ceil((pur - now) / 21);
        let time = 0;
        for (let start = now; start !== pur; start += diff) {
            setTimeout(() => {
                props.fightPointDisplay[value] = start;
            }, 20 * time);

            if (diff > 0 && start + diff > pur) {
                start = pur - diff;
                setTimeout(() => {
                    props.fightPointDisplay[value] = pur;
                }, 20 * (time + 1));
            }

            if (diff < 0 && start + diff < pur) {
                start = pur - diff;
                setTimeout(() => {
                    props.fightPointDisplay[value] = pur;
                }, 20 * (time + 1));
            }

            time++;
        }
    });
}

const increaseOver = () => {
    selectedCircle.value.forEach((value, index, array) => {
        const now = props.fightPointReal[value];
        const pur = now + 100000000;
        props.fightPointReal[value] = pur;

        const diff = Math.ceil((pur - now) / 21);
        let time = 0;
        for (let start = now; start !== pur; start += diff) {
            setTimeout(() => {
                props.fightPointDisplay[value] = start;
            }, 20 * time);

            if (diff > 0 && start + diff > pur) {
                start = pur - diff;
                setTimeout(() => {
                    props.fightPointDisplay[value] = pur;
                }, 20 * (time + 1));
            }

            if (diff < 0 && start + diff < pur) {
                start = pur - diff;
                setTimeout(() => {
                    props.fightPointDisplay[value] = pur;
                }, 20 * (time + 1));
            }

            time++;
        }
    });
}

const decreaseOver = () => {
    selectedCircle.value.forEach((value, index, array) => {
        const now = props.fightPointReal[value];
        const pur = now - 100000000;
        props.fightPointReal[value] = pur;

        const diff = Math.ceil((pur - now) / 21);
        let time = 0;
        for (let start = now; start !== pur; start += diff) {
            setTimeout(() => {
                props.fightPointDisplay[value] = start;
            }, 20 * time);

            if (diff > 0 && start + diff > pur) {
                start = pur - diff;
                setTimeout(() => {
                    props.fightPointDisplay[value] = pur;
                }, 20 * (time + 1));
            }

            if (diff < 0 && start + diff < pur) {
                start = pur - diff;
                setTimeout(() => {
                    props.fightPointDisplay[value] = pur;
                }, 20 * (time + 1));
            }

            time++;
        }
    });
}

const selectCircle = (idx) => {
    if (selectedCircle.value.indexOf(idx) < 0) {
        selectedCircle.value.push(idx);
    } else {
        selectedCircle.value = selectedCircle.value.filter((i) => i !== idx);
    }
}

const setCriticalTrigger = () => {
    selectedCircle.value.forEach((value, index, array) => {
        props.criticalPoints[value] += 1;
    });
}

const setDrive = () => {
    selectedCircle.value.forEach((value, index, array) => {
        props.drivePoints[value] += 1;
    });
}
</script>

<template>
    <div class="board-container">
        <FightField :fight-points="props.fightPointDisplay" :critical-points="criticalPoints" :drive-points="drivePoints"
                    :select-circle="selectCircle" :selected-circle="selectedCircle" :is-up-side-down="isUpSideDown" />
        <FightKeyboard :up="increaseAmount" :down="decreaseAmount" :large-up="increaseLarge" :large-down="decreaseLarge"
                       :over-up="increaseOver" :over-down="decreaseOver" :critical="setCriticalTrigger" :drive="setDrive" />
    </div>
</template>

<style scoped>
    .board-container {
        width: 100%;
        height: 100%;

        div {
            width: 100%;
        }

        > div {
            height: 65%;
        }

        > div + div {
            height: 35%;
        }
    }
</style>
