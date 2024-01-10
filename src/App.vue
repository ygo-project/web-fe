<script setup>
import { onMounted } from "vue";
import { useStore } from "vuex";

import Layout from "@/components/organism/Layout.vue";

const store = useStore();

onMounted(() => {
    let isDarkMode = Boolean(localStorage.getItem('isDarkMode') === 'true');

    isDarkMode ? store.dispatch('ACT_DARK_MODE') : store.dispatch('ACT_LIGHT_MODE');
})
</script>

<template>
  <Layout>
    <router-view></router-view>
  </Layout>
</template>

<style scoped>
</style>
