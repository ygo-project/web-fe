<script setup>
import { ref } from "vue";

import SingleFightKeyboard from "@/pages/SingleFight/SingleFightKeyboard/SingleFightKeyboard.vue";
import SingleFightField from "@/pages/SingleFight/SingleFightField/SingleFightField.vue";

const powerCounter = ref([ 0, 0, 0, 0, 0, 0 ]);
const realPowerCounter = ref([ 0, 0, 0, 0, 0, 0 ]);
const energyCounter = ref([ 0, 0, 0, 0, 0, 0 ]);
const criticalCounter = ref([ 0, 0, 0, 0, 0, 0 ]);
const driveCounter = ref([ 0, 0, 0, 0, 0, 0 ]);

const selectedCircle = ref([]);

const increaseAmount = () => {
    selectedCircle.value.forEach((value, index, array) => {
        const now = realPowerCounter.value[value];
        const pur = now + 1000;
        realPowerCounter.value[value] = pur;

        const diff = Math.ceil((pur - now) / 21);
        let time = 0;
        for (let start = now; start !== pur; start += diff) {
            setTimeout(() => {
                powerCounter.value[value] = start;
            }, 20 * time);

            if (diff > 0 && start + diff > pur) {
                start = pur - diff;
                setTimeout(() => {
                    powerCounter.value[value] = pur;
                }, 20 * (time + 1));
            }

            if (diff < 0 && start + diff < pur) {
                start = pur - diff;
                setTimeout(() => {
                    powerCounter.value[value] = pur;
                }, 20 * (time + 1));
            }

            time++;
        }
    });
}

const decreaseAmount = () => {
    selectedCircle.value.forEach((value, index, array) => {
        const now = realPowerCounter.value[value];
        const pur = now - 1000;
        realPowerCounter.value[value] = pur;

        const diff = Math.ceil((pur - now) / 21);
        let time = 0;
        for (let start = now; start !== pur; start += diff) {
            setTimeout(() => {
                powerCounter.value[value] = start;
            }, 20 * time);

            if (diff > 0 && start + diff > pur) {
                start = pur - diff;
                setTimeout(() => {
                    powerCounter.value[value] = pur;
                }, 20 * (time + 1));
            }

            if (diff < 0 && start + diff < pur) {
                start = pur - diff;
                setTimeout(() => {
                    powerCounter.value[value] = pur;
                }, 20 * (time + 1));
            }

            time++;
        }
    });
}

const increaseLarge = () => {
    selectedCircle.value.forEach((value, index, array) => {
        const now = realPowerCounter.value[value];
        const pur = now + 5000;
        realPowerCounter.value[value] = pur;

        const diff = Math.ceil((pur - now) / 21);
        let time = 0;
        for (let start = now; start !== pur; start += diff) {
            setTimeout(() => {
                powerCounter.value[value] = start;
            }, 20 * time);

            if (diff > 0 && start + diff > pur) {
                start = pur - diff;
                setTimeout(() => {
                    powerCounter.value[value] = pur;
                }, 20 * (time + 1));
            }

            if (diff < 0 && start + diff < pur) {
                start = pur - diff;
                setTimeout(() => {
                    powerCounter.value[value] = pur;
                }, 20 * (time + 1));
            }

            time++;
        }
    });
}

const decreaseLarge = () => {
    selectedCircle.value.forEach((value, index, array) => {
        const now = realPowerCounter.value[value];
        const pur = now - 5000;
        realPowerCounter.value[value] = pur;

        const diff = Math.ceil((pur - now) / 21);
        let time = 0;
        for (let start = now; start !== pur; start += diff) {
            setTimeout(() => {
                powerCounter.value[value] = start;
            }, 20 * time);

            if (diff > 0 && start + diff > pur) {
                start = pur - diff;
                setTimeout(() => {
                    powerCounter.value[value] = pur;
                }, 20 * (time + 1));
            }

            if (diff < 0 && start + diff < pur) {
                start = pur - diff;
                setTimeout(() => {
                    powerCounter.value[value] = pur;
                }, 20 * (time + 1));
            }

            time++;
        }
    });
}

const increaseOver = () => {
    selectedCircle.value.forEach((value, index, array) => {
        const now = realPowerCounter.value[value];
        const pur = now + 100000000;
        realPowerCounter.value[value] = pur;

        const diff = Math.ceil((pur - now) / 21);
        let time = 0;
        for (let start = now; start !== pur; start += diff) {
            setTimeout(() => {
                powerCounter.value[value] = start;
            }, 20 * time);

            if (diff > 0 && start + diff > pur) {
                start = pur - diff;
                setTimeout(() => {
                    powerCounter.value[value] = pur;
                }, 20 * (time + 1));
            }

            if (diff < 0 && start + diff < pur) {
                start = pur - diff;
                setTimeout(() => {
                    powerCounter.value[value] = pur;
                }, 20 * (time + 1));
            }

            time++;
        }
    });
}

const decreaseOver = () => {
    selectedCircle.value.forEach((value, index, array) => {
        const now = realPowerCounter.value[value];
        const pur = now - 100000000;
        realPowerCounter.value[value] = pur;

        const diff = Math.ceil((pur - now) / 21);
        let time = 0;
        for (let start = now; start !== pur; start += diff) {
            setTimeout(() => {
                powerCounter.value[value] = start;
            }, 20 * time);

            if (diff > 0 && start + diff > pur) {
                start = pur - diff;
                setTimeout(() => {
                    powerCounter.value[value] = pur;
                }, 20 * (time + 1));
            }

            if (diff < 0 && start + diff < pur) {
                start = pur - diff;
                setTimeout(() => {
                    powerCounter.value[value] = pur;
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
        criticalCounter.value[value] += 1;
    });
}

const setDrive = () => {
    selectedCircle.value.forEach((value, index, array) => {
        driveCounter.value[value] += 1;
    });
}

const deselect = () => {
    selectedCircle.value = [];
}

const turnEnd = () => {
    powerCounter.value = [ 0, 0, 0, 0, 0, 0 ];
    realPowerCounter.value = [ 0, 0, 0, 0, 0, 0 ];
    criticalCounter.value = [ 0, 0, 0, 0, 0, 0 ];
    driveCounter.value = [ 0, 0, 0, 0, 0, 0 ];
}
</script>

<template>
    <div class="single-fight-container">
        <SingleFightKeyboard :up="increaseAmount" :down="decreaseAmount" :large-up="increaseLarge" :large-down="decreaseLarge"
                             :over-up="increaseOver" :over-down="decreaseOver" :critical="setCriticalTrigger" :drive="setDrive"
                             :deselect="deselect" :end="turnEnd" />
        <SingleFightField :power="powerCounter" :energy="energyCounter" :critical="criticalCounter" :drive="driveCounter"
                        :selected-circle="selectedCircle" :select-circle="selectCircle"/>
    </div>
</template>

<style scoped>
    .single-fight-container {
        display: flex;
        width: 90vw;
        height: calc(100vh - 4rem);
        margin: 0 auto;

        >div {
            width: 30%;
        }

        >div + div {
            width: 70%;
        }
    }
</style>
