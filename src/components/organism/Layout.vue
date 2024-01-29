<script setup>
import { ref } from "vue";
import 'vue3-toastify/dist/index.css'; // toastify css global import

import Header from "@/components/molecule/Header/Header.vue";
import AuthModal from "@/components/organism/AuthModal/AuthModal.vue";

const loginModalPopup = ref(false);

const loginPopup = () => {
    loginModalPopup.value = !loginModalPopup.value;
}
</script>

<template>
    <div>
        <div class="layoutWrapper">
            <div class="layoutContent">
                <Header :popup-modal="loginPopup"/>
                <slot>no content</slot>
            </div>

            <div v-if="loginModalPopup">
                <AuthModal :close-modal="loginPopup"/>
            </div>
        </div>
    </div>
</template>

<style scoped>
</style>
