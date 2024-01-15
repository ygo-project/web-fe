<script setup>

</script>

<template>
    <div class="center-menu-container">
        <router-link class="menu" to="/">Home</router-link>
        <router-link class="menu" to="/duel">듀얼</router-link>
    </div>
</template>

<style lang="scss" scoped>
.center-menu-container {
    display: flex;
    align-items: center;

    .menu {
        display: flex;
        align-items: center;
        text-decoration: none;
        letter-spacing: 0.2rem;
        color: var(--text1);

        &:hover {
            background-color: var(--slight-layer);
            cursor: pointer;
        }
    }

    .menu:nth-child(2) {
        margin-left: 1rem;
    }
}
</style>
