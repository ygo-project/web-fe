<script setup>
    import { ref } from "vue";
    import { useStore } from "vuex";
    import { useRouter } from "vue-router";
    import { toast } from "vue3-toastify";

    import YgoButton from "@/components/atom/YgoButton.vue";
    import { apiClient } from "@/common/index.js";

    const props = defineProps({
        onClose: Function,
    });
    const store = useStore();
    const router = useRouter();

    const id = ref('');
    const isValid = ref(false);

    const chkID = () => {
        const regex = /^[a-zA-Z0-9]*$/;
        store.dispatch('ACT_USER_ID', id.value);
        isValid.value = !(!regex.test(id.value) || id.value === '');
    }

    const chkDuplicate = async () => {
        try {
            const response = await apiClient.get(`/user/find/${id.value}`);

            if (isValid.value && response.status === 200) {
                props.onClose();
                await router.push(`/registry`);
            }
        } catch (error) {
            console.log(error);
            if (error.response?.status === 409) {
                toast.error(`이미 사용 중인 아이디입니다.`);
            }
        }
    }

    const error = () => {
        toast.error(`대소문자, 숫자만 허용됩니다!`);
    }

    const btnEvent = () => {
        isValid.value ? chkDuplicate() : error();
    }
</script>

<template>
    <div class="signup-form">
        <div class="input-wrapper">
            <input type="text" required placeholder="아이디를 입력하세요." v-model="id" @change="chkID"/>
            <YgoButton color="teal" :click-event="btnEvent">중복확인</YgoButton>
        </div>
    </div>
</template>

<style scoped>
    .signup-form {
        display: flex;
        flex-direction: column;
        width: 100%;

        .input-wrapper {
            display: flex;
            height: 3rem;
            margin-top: 10vh;

            input {
                flex: 1 1 0;
                padding: 1rem;
                background: var(--bg-element1);
                border: 1px solid var(--border3);
                border-right: none;
                border-top-left-radius: 2px;
                border-bottom-left-radius: 2px;
                color: var(--text1);
                font-size: 1rem;
                outline: none;
            }

            :focus {
                border: 1px solid var(--primary1);
                border-right: none;
            }
        }

        button {
            border-radius: 0 2px 2px 0;
            width: 6rem;
            height: 100%;
            word-break: keep-all;
        }
    }
</style>
