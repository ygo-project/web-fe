<script setup>
const props = defineProps({
    value: Number,
});

const convertToPercent = Math.round(props.value * 10000);

const integer = Math.floor(convertToPercent / 100);
const decimal = convertToPercent % 100;
</script>

<template>
{{ `${integer}.${decimal}%` }}
</template>

<style scoped>

</style>
