<script setup>
const emit = defineEmits(['setOrder', 'run']);
const props = defineProps({
    order: String,
});

const setOperator = (operator) => {
    emit('setOrder', operator);
}

const setNumber = (number) => {
    if (props.order === '') number = '-' + number;
    emit('setOrder', props.order + number);
}

const removeOrder = () => {
    emit('setOrder', props.order.substring(0, props.order.length - 1));
}

const runOperation = () => {
    emit('run');
}
</script>

<template>
    <div class="keyboard-container">
        <div class="number-row">
            <div>
                <input type="button" value="1" @click="setNumber('1')" >
                <input type="button" value="2" @click="setNumber('2')" >
                <input type="button" value="3" @click="setNumber('3')" >
            </div>
            <div>
                <input type="button" value="4" @click="setNumber('4')" >
                <input type="button" value="5" @click="setNumber('5')" >
                <input type="button" value="6" @click="setNumber('6')" >
            </div>
            <div>
                <input type="button" value="7" @click="setNumber('7')" >
                <input type="button" value="8" @click="setNumber('8')" >
                <input type="button" value="9" @click="setNumber('9')" >
            </div>
            <div>
                <input type="button" value="0" @click="setNumber('0')" >
                <input type="button" value="00" @click="setNumber('00')" >
                <input type="button" value="000" @click="setNumber('000')" >
            </div>
        </div>
        <div class="operator-row">
            <input type="button" value="CLR" @click="removeOrder()" >
            <input type="button" value="+" @click="setOperator('+')" >
            <input type="button" value="-" @click="setOperator('-')" >
            <input type="button" value="/" @click="setOperator('/')" >
            <input type="button" value="=" @click="runOperation()" >
        </div>
    </div>
</template>

<style scoped>
    .keyboard-container {
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 20px;
        border-radius: 10px;
        //background-color: var(--bg-element2);

        input {
            border: 0;
            outline: 0;
            border-radius: 10px;
            box-shadow: -8px -8px 20px var(--bg-element3), 5px 5px 10px var(--bg-element3);
            background: var(--bg-element2);
            font-size: 20px;
            cursor: pointer;
            margin: 10px;
            color: var(--text1);

            &:hover {
                background-color: var(--bg-element4);
            }
        }

        .operator-row {
            width: 20%;
            height: 100%;
            display: flex;
            flex-direction: column;

            input {
                width: 80%;
                height: 20%;
            }
        }

        .number-row {
            width: 80%;
            height: 100%;
            display: flex;
            flex-direction: column;
            justify-content: space-evenly;

            div {
                height: 25%;
                display: flex;
                justify-content: space-around;

                input {
                    width: 25%;
                    height: 95%;
                }
            }
        }
    }
</style>
