<script setup>
import { useStore } from "vuex";
import { computed } from "vue";

const store = useStore();

const auth = computed(() => store.getters.GET_AUTH );

</script>

<template>
    <div class="center-menu-container">
        <router-link class="menu" to="/">Home</router-link>
<!--        <router-link class="menu" to="/duel">듀얼</router-link>-->
        <router-link class="menu" to="/fight">파이트(2p)</router-link>
        <router-link class="menu" to="/singleFight">파이트(1p)</router-link>
        <router-link v-if="auth > 0" class="menu" to="/candidate">유저등록</router-link>
        <router-link v-if="auth > 0" class="menu" to="/league">대진표</router-link>
        <router-link class="menu" to="/rating">전적</router-link>
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

    .menu:not(:nth-child(1)) {
        margin-left: 1rem;
    }
}
</style>
