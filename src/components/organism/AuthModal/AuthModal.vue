<script setup>
import { ref } from "vue";

import IconBase from "@/components/atom/IconBase.vue";
import XIcon from "@/assets/svgs/XIcon.vue";
import LoginForm from "@/components/organism/AuthModal/LoginForm.vue";
import YgoButton from "@/components/atom/YgoButton.vue";
import SignUpForm from "@/components/organism/AuthModal/SignUpForm.vue";

const props = defineProps({
    closeModal: { type: Function },
});

const isSignUp = ref(false);

const convertIsSignUp = () => {
    isSignUp.value = !isSignUp.value;
}
</script>

<template>
    <div>
        <div class="modal-background" />
        <div class="modal-positioner">
            <div class="modal-container">
                <div class="left-block">
                    <img src="@/assets/imgs/deck.jpeg" alt="welcome" />
                    <div class="welcome">환영합니다!</div>
                </div>
                <div class="right-block">
                    <div class="exit" @click="closeModal">
                        <IconBase><XIcon /></IconBase>
                    </div>
                    <div class="wrapper" v-if="isSignUp">
                        <h2>회원가입</h2>
                        <section>
                            <h4>신규 회원가입</h4>
                            <SignUpForm :on-close="closeModal" />
                        </section>
                    </div>
                    <div class="wrapper" v-else>
                        <h2>로그인</h2>
                        <section>
                            <h4>기존 아이디로 로그인</h4>
                            <LoginForm />
                        </section>
                    </div>
                    <div class="foot" v-if="isSignUp">
                        <span>계정이 이미 있으신가요?</span>
                        <YgoButton :click-event="convertIsSignUp">로그인</YgoButton>
                    </div>
                    <div class="foot" v-else>
                        <span>아직 회원이 아니신가요?</span>
                        <YgoButton :click-event="convertIsSignUp">회원가입</YgoButton>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
.modal-background {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: var(--opaque-layer);
    z-index: 10;
    animation: 0.25s ease 0s 1 normal forwards running cJoqxJ;
}

.modal-positioner {
    position: fixed;
    top: 0;
    left: 0;
    display: flex;
    -webkit-box-align: center;
    align-items: center;
    -webkit-box-pack: center;
    justify-content: center;
    width: 100%;
    height: 100%;
    z-index: 20;
}

.modal-container {
    display: flex;
    width: 600px;
    height: 530px;
    animation: 0.4s ease-in-out 0s 1 normal forwards running cptskd;
    box-shadow: rgb(0 0 0 / 9%) 0 2px 12px 0;

    @media screen and (max-width: 768px) {
        flex: 1 1 0;
        width: auto;
        height: 100%;
    }

    .left-block {
        display: flex;
        flex-direction: column;
        -webkit-box-pack: center;
        justify-content: center;
        -webkit-box-align: center;
        align-items: center;
        width: 216px;
        padding: 1.5rem;
        background: var(--bg-element2);

        @media screen and (max-width: 768px) {
            display: none;
        }

        img {
            width: 100%;
            height: auto;
            display: block;
        }

        .welcome {
            margin-top: 1.5rem;
            color: var(--text2);
            text-align: center;
            font-weight: 600;
            font-size: 1.75rem;
        }
    }

    .right-block {
        flex: 1 1 0;
        display: flex;
        flex-direction: column;
        padding: 1.5rem;
        background: var(--bg-element2);

        .exit {
            display: flex;
            -webkit-box-pack: end;
            justify-content: flex-end;
            margin-bottom: 2.25rem;
            font-size: 1.5rem;
            color: var(--text3);
            cursor: pointer;

            svg {
                width: 24px;
                height: 24px;
            }
        }

        .wrapper {
            flex: 1 1 0;
            display: flex;
            flex-direction: column;

            h2 {
                color: var(--text1);
            }

            section {
                display: block;
            }

            section + section {
                margin-top: 1.5rem;
            }
        }
    }
}
</style>
