<script setup>
import { computed } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";

import ThemeMode from "@/components/molecule/Header/RightHeader/ThemeMode.vue";
import YgoButton from "@/components/atom/YgoButton.vue";

const store = useStore();
const router = useRouter();

const isLogin = computed(() => !!store.getters.GET_AUTH );

const props = defineProps({
    popupModal: { type: Function },
});

const logout = () => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('userId');
    store.dispatch('ACT_AUTH', undefined);

    router.replace(`/`);
};
</script>

<template>
    <div class="right-menu-container">
        <ThemeMode />
        <div>
            <YgoButton v-if="!isLogin" :click-event="popupModal">로그인</YgoButton>
            <YgoButton v-else :click-event="logout">로그아웃</YgoButton>
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
