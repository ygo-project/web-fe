<script setup>
    import { ref } from "vue";
    import { useStore } from "vuex";
    import { useRouter } from "vue-router";
    import { toast } from "vue3-toastify";

    import YgoButton from "@/components/atom/YgoButton.vue";
    import { apiClient } from "@/common/index.js";

    const store = useStore();
    const router = useRouter();

    const user_id = ref(store.state.userStore.user_id);
    const name = ref('');
    const password = ref('');
    const passwordConfirm = ref('');

    const idMessage = ref('');
    const nameMessage = ref('');
    const passwordMessage = ref('');
    const passwordConfirmMessage = ref('');

    const isIDDone = ref(true);
    const isNameDone = ref(false);
    const isPasswordDone = ref(false);
    const isPasswordConfirmDone = ref(false);

    const isIDDuplicateCheck = ref(true);

    const isActiveFocus = ref({
        idActive: false,
        nameActive: false,
        passwordActive: false,
        passwordConfirmActive: false,
    });

    const handleFocus = (target) => {
        isActiveFocus.value = {
            ...isActiveFocus.value,
            [target]: true,
        };
    }

    const handleBlur = (target) => {
        isActiveFocus.value = {
            ...isActiveFocus.value,
            [target]: false,
        };
    }

    const handleID = () => {
        const regex = /^[a-zA-Z0-9]{4,20}$/;
        if (!regex.test(user_id.value)) {
            idMessage.value = `아이디는 4자 이상 20자 미만의 영어와 숫자로 구성해야합니다.`;
            isIDDone.value = false;
        } else {
            idMessage.value = ``;
            isIDDone.value = true;
        }
        isIDDuplicateCheck.value = false;
    }

    const handleName = () => {
        if (name.value.length < 1) {
            nameMessage.value = `이름을 입력해주세요.`;
            isNameDone.value = false;
        } else {
            nameMessage.value = ``;
            isNameDone.value = true;
        }
    }

    const handlePassword = () => {
        const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d~!@#$%^*+-]{8,30}$/;
        if (!passwordRegex.test(password.value)) {
            passwordMessage.value = `숫자 + 영문자 조합으로 8자 이상 입력해주세요!`;
            isPasswordDone.value = false;
        } else {
            passwordMessage.value = ``;
            isPasswordDone.value = true;
        }
    }

    const handlePasswordConfirm = () => {
        if (password.value === passwordConfirm.value) {
            passwordConfirmMessage.value = ``;
            isPasswordConfirmDone.value = true;
        } else {
            passwordConfirmMessage.value = `비밀번호가 일치하지 않습니다. 다시 확인해주세요!`;
            isPasswordConfirmDone.value = false;
        }
    }

    const onIDDuplicateCheck = async () => {
        try {
            const response = await apiClient.get(`/user/find/${user_id.value}`);

            if (response.status === 200) {
                toast.success(`사용할 수 있는 아이디 입니다.`);
                isIDDuplicateCheck.value = true;
            }
        } catch (error) {
            console.log(error);
            if (error.response?.status === 409) {
                toast.error(`이미 사용 중인 아이디입니다.`);
            }
        }
    }

    const cancelBtn = () => {
        router.replace(`/`);
    }

    const onRegister = async () => {
        const body = {
            userId : user_id.value,
            userPw: password.value,
            userNm: name.value,
        };

        try {
            const response = await apiClient.post('/user/signup', body);

            if (response.status === 200) {
                const { accessToken, refreshToken, auth } = response.data;

                localStorage.setItem('accessToken', accessToken);
                localStorage.setItem('refreshToken', refreshToken);

                await store.dispatch('ACT_AUTH', auth);
                localStorage.setItem('userId', user_id.value);

                await router.replace(`/`);
            }
        } catch (error) {
            console.log(error);
        }
    }
</script>

<template>
    <div class="registry-container">
        <h1>환영합니다!</h1>
        <div class="description">
            기본 회원 정보를 등록해주세요. <span>※는 필수항목 입니다.</span>
        </div>
        <div class="input-container">
            <div :class="isActiveFocus.idActive ? `focus-wrapper wrapper` : `wrapper`">
                <label>아이디 ※</label>
                <div class="input-wrapper">
                    <input
                        type="text"
                        placeholder="아이디를 입력하세요."
                        @keyup="handleID"
                        maxlength="20"
                        @focus="handleFocus(`idActive`)"
                        @blur="handleBlur(`idActive`)"
                        v-model="user_id"
                    />
                    <YgoButton v-if="isIDDuplicateCheck" class-name="checked" disabled color="darkgray">완료</YgoButton>
                    <YgoButton v-else class-name="duplicate" color="teal" :click-event="onIDDuplicateCheck">중복확인</YgoButton>
                </div>
                <div class="validation">{{ idMessage }}</div>
            </div>
            <div :class="isActiveFocus.nameActive ? `focus-wrapper wrapper` : `wrapper`">
                <label>이름 ※</label>
                <div class="input-wrapper">
                    <input
                        type="text"
                        placeholder="이름을 입력하세요."
                        @keyup="handleName"
                        maxlength="20"
                        @focus="handleFocus(`nameActive`)"
                        @blur="handleBlur(`nameActive`)"
                        v-model="name"
                    />
                </div>
                <div class="validation">{{ nameMessage }}</div>
            </div>
            <div :class="isActiveFocus.passwordActive ? `focus-wrapper wrapper` : `wrapper`">
                <label>비밀번호 ※</label>
                <div class="input-wrapper">
                    <input
                        type="password"
                        placeholder="비밀번호를 입력하세요"
                        @keyup="handlePassword"
                        maxlength="30"
                        @focus="handleFocus(`passwordActive`)"
                        @blur="handleBlur(`passwordActive`)"
                        v-model="password"
                    />
                </div>
                <div class="validation">{{ passwordMessage }}</div>
            </div>
            <div :class="isActiveFocus.passwordConfirmActive ? `focus-wrapper wrapper` : `wrapper`">
                <label>비밀번호 확인 ※</label>
                <div class="input-wrapper">
                    <input
                        type="password"
                        placeholder="비밀번호를 한번 더 입력하세요"
                        @keyup="handlePasswordConfirm"
                        maxlength="30"
                        @focus="handleFocus(`passwordConfirmActive`)"
                        @blur="handleBlur(`passwordConfirmActive`)"
                        v-model="passwordConfirm"
                    />
                </div>
                <div class="validation">{{ passwordConfirmMessage }}</div>
            </div>
        </div>
        <div class="form-bottom">
            <div class="all-valid" v-if="!(isNameDone && isIDDone && isPasswordDone && isPasswordConfirmDone)">
                모든 필수 항목을 입력해주세요.
            </div>
            <div class="button-wrapper">
                <YgoButton class-name="cancel" color="gray" :click-event="cancelBtn">취소</YgoButton>
                <YgoButton class-name="next" color="teal" :disabled="!(isNameDone && isIDDone && isPasswordDone && isPasswordConfirmDone)" :click-event="onRegister">등록</YgoButton>
            </div>
        </div>
    </div>
</template>

<style scoped>
    .registry-container {
        width: 768px;
        margin: 100px auto 0;
        line-height: 1.5;

        h1 {
            margin: 0;
            font-size: 4rem;
            color: var(--text1);
            font-weight: bolder;
        }

        .description {
            font-size: 1.5rem;
            color: var(--text1);

            span {
                font-size: 1rem;
            }
        }

        .input-container {
            margin-top: 3rem;
            margin-bottom: 3rem;

            .wrapper {
                margin-bottom: 1.5rem;

                label {
                    display: block;
                    margin-bottom: 1rem;
                    color: var(--text1);
                    line-height: 1.5;
                    font-weight: bold;
                    font-size: 1.125rem;
                    transition: all 0.125s ease-in 0s;
                }

                .input-wrapper {
                    display: flex;
                    justify-content: space-between;
                    -webkit-box-align: center;
                    align-items: center;
                    padding-bottom: 0.5rem;
                    border-bottom: 1px solid var(--border2);

                    input {
                        display: block;
                        width: 100%;
                        background: transparent;
                        border: none;
                        outline: none;
                        color: var(--text2);
                        line-height: 1.5;
                        font-size: 1.5rem;
                        transition: all 0.125s ease-in 0s;
                    }

                    input:disabled {
                        color: var(--text3);
                    }

                    svg {
                        font-size: 1.5rem;
                        color: var(--text3)
                    }

                    .duplicate {
                        display: block;
                        width: 7rem;
                    }

                    .checked {
                        display: block;
                        width: 7rem;
                        pointer-events: none;
                    }
                }

                .validation {
                    margin: 0.25rem 0;
                    font-size: 1rem;
                    line-height: 1.5;
                    color: rgb(255, 107, 107);
                    font-weight: bold;
                }
            }

            .focus-wrapper {
                label {
                    color: var(--primary2);
                }

                .input-wrapper {
                    border-bottom: 1px solid var(--primary2);

                    input {
                        color: var(--primary2);
                    }
                }
            }
        }

        .form-bottom {
            margin-top: 3rem;

            .all-valid {
                font-size: 1.25rem;
                line-height: 1.5;
                color: rgb(255, 107, 107);
                font-weight: bold;
            }

            .button-wrapper {
                button {
                    height: 3rem;
                    font-size: 1.5rem;
                    padding-left: 2rem;
                    padding-right: 2rem;
                    border-radius: 1.5rem;
                    word-break: keep-all;
                    transition: all 0.125s ease-in 0s;
                }

                button + button {
                    margin-left: 1rem;
                }

                .next {
                    &:disabled {
                        opacity: 0.5;
                        cursor: not-allowed;

                        &:hover {
                            background: var(--primary1);
                        }
                    }
                }
            }
        }
    }
</style>
