<script setup>
import ThemeMode from "@/components/molecule/Header/RightHeader/ThemeMode.vue";
import YgoButton from "@/components/atom/YgoButton.vue";

const props = defineProps({
    popupModal: { type: Function },
});
</script>

<template>
    <div class="right-menu-container">
        <ThemeMode />
        <div>
            <YgoButton :click-event="popupModal">유저 추가</YgoButton>
        </div>
    </div>
</template>

<style lang="scss">
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

            svg {
                width: 24px;
                height: 24px;
                pointer-events: none;
                color: var(--text1);

                font-size: 24px;
            }

            &:hover {
                background-color: var(--slight-layer);
                cursor: pointer;
            }
        }
    }
</style>
