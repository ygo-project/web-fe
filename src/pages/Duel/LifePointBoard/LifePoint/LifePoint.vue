<script>
export default {
    props: {
        lifePoint: { type: Number, default: 8000 },
        order: { type: String },
    }
}
</script>

<template>
    <div class="life-point-container">
        <h1>{{ lifePoint }}</h1>
        <h5>{{ order }}</h5>
    </div>
</template>

<style scoped>
    .life-point-container {
        display: flex;
        justify-content: center;
    }
</style>
