<script setup>
    import { ref } from "vue";
    import { useStore } from "vuex";
    import { toast } from "vue3-toastify";

    import { apiClient } from "@/common/index.js";
    import YgoButton from "@/components/atom/YgoButton.vue";

    const store = useStore();

    const props = defineProps({
        onClose: Function,
    });

    const form = ref({
        id: '',
        password: '',
    });

    const onSubmit = async () => {
        const body = {
            userId: form.value.id,
            userPw: form.value.password,
        };

        try {
            const response = await apiClient.post('/user/login', body);

            if (response.status === 200) {
                const { accessToken, refreshToken, auth } = response.data;

                localStorage.setItem('accessToken', accessToken);
                localStorage.setItem('refreshToken', refreshToken);

                await store.dispatch('ACT_AUTH', auth);
                localStorage.setItem('userId', form.value.id);

                form.value.id = '';
                form.value.password = '';
                props.onClose();
            }
        } catch (error) {
            console.log(error);
            toast.error('아이디와 비밀번호가 일치하지 않습니다. 다시 한 번 확인해주세요.');
        }
    };
</script>

<template>
    <div class="login-form">
        <input type="text" name="id" required placeholder="아이디를 입력하세요." v-model="form.id" />
        <input type="password" name="password" required placeholder="비밀번호를 입력하세요." v-model="form.password" autocomplete="on" />
        <YgoButton color="teal" :click-event="onSubmit">로그인</YgoButton>
    </div>
</template>

<style scoped>
    .login-form {
        display: flex;
        flex-direction: column;
        width: 100%;

        input {
            flex: 1 1 0;
            padding: 1rem;
            margin-top: 1rem;
            background: var(--bg-element1);
            border-radius: 2px;
            border: 0.5px solid var(--border3);
            outline: none;
            font-size: 1rem;
            color: var(--text1);

            &:focus {
                outline: 1px solid var(--primary1);
            }
        }

        input + input {
            margin-top: 0.5rem;
        }

        button {
            height: 3rem;
            margin-top: 0.5rem;
            border-top-right-radius: 2px;
            border-bottom-right-radius: 2px;
            word-break: keep-all;
        }
    }
</style>
