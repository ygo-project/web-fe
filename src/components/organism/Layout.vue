<script setup>
import Header from "@/components/molecule/Header/Header.vue";
</script>

<template>
    <div class="layoutWrapper">
        <div class="layoutContent">
            <Header />
            <slot>no content</slot>
        </div>
    </div>
</template>

<style scoped>
</style>