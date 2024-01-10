<script setup>
    import { computed } from "vue";
    import { useStore } from "vuex";

    import SunIcon from '@/assets/svgs/sun-icon.svg';
    import MoonIcon from '@/assets/svgs/moon-icon.svg';

    const store = useStore();

    const isDarkMode = computed(() => store.getters.GET_IS_DARK_MODE )

    const changeTheme = (e) => {
        store.state.themeModeStore.isDarkMode ? store.dispatch('ACT_LIGHT_MODE') : store.dispatch('ACT_DARK_MODE');
    }
</script>

<template>
    <div class="theme-mode-container" @click="changeTheme">
        <div class="setting-hover">
            <img :src="SunIcon" alt="sun-icon" v-if="!isDarkMode"/>
            <img :src="MoonIcon" alt="moon-icon" v-else />
        </div>
    </div>
</template>

<style scoped>
    @keyframes themeChange {
        from {
            width: 10px;
            height: 10px;
            transform: rotate(180deg);
        }
        to {
            width: 24px;
            height: 24px;
        }
    }

    .theme-mode-container {
        img {
            animation: themeChange 0.2s linear;
        }
    }
</style>