<script setup>
    import { ref } from "vue";
    import { toast } from "vue3-toastify";

    import { apiClient } from "@/common/index.js";
    import YgoButton from "@/components/atom/YgoButton.vue";

    const form = ref({
        id: '',
        password: '',
    });

    const onSubmit = async () => {
        const body = {
            id: form.value.id,
            password: form.value.password,
        };

        try {
            const response = await apiClient.post('/user/validate', body);

            if (response.status === 200) {
                console.log("login 성공")
            }
        } catch (error) {
            console.log(error);
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
