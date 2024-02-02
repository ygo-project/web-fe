<script setup>

</script>

<template>
    <div class="guard-container">
        <span>
            <slot />
        </span>
    </div>
</template>

<style scoped>
    .guard-container {
        display: flex;
        align-items: center;
        justify-content: center;

        height: 7vw;
        width: 7vw;
        background: var(--bg-element3);
        border-radius: 1rem;
        margin: 1% 10%;
    }
</style>
