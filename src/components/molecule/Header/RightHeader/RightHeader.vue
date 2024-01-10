<script setup>
import ThemeMode from "@/components/molecule/Header/RightHeader/ThemeMode.vue";
</script>

<template>
    <div class="right-menu-container">
        <ThemeMode />
    </div>
</template>

<style>
    .right-menu-container {
        display: flex;
        align-items: center;

        .setting-hover {
            display: flex;
            align-items: center;
            justify-content: center;
            width: 40px;
            height: 40px;
            margin-left: 0.3rem;
            border-radius: 40px;
            color: var(--text1);

            img {
                width: 24px;
                height: 24px;
                pointer-events: none;
            }

            &:hover {
                background-color: var(--slight-layer);
                cursor: pointer;
            }
        }
    }
</style>