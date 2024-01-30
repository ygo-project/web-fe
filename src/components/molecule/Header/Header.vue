<script setup>
  import { ref } from "vue";
  import RightHeader from "@/components/molecule/Header/RightHeader/RightHeader.vue";
  import CenterHeader from "@/components/molecule/Header/CenterHeader/CenterHeader.vue";

  const props = defineProps({
      popupModal: { type: Function },
  });

  const headerLenderCondition = window.location.pathname === '/registry';
  const scrollActive = ref(false);
</script>

<template>
    <div v-if="headerLenderCondition"></div>
    <div v-else class="header-container" :class="scrollActive ? 'scroll-active' : ''">
        <div :class="scrollActive ? 'header-fixed' : 'header'">
            <div class='header-content'>
                <span class="logo-box">
                    <router-link
                        class="logo"
                        to="/"
                    >
                        <span>YGO-LOG</span>
                    </router-link>
                </span>
                <CenterHeader />
                <RightHeader :popup-modal="popupModal"/>
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.header-container {
    position: relative;
    margin-left: auto;
    margin-right: auto;
    max-width: 1728px;

    @keyframes header-slidein {
        from {
            transform: translate(-50%, -50%);
        }
        to {
            transform: translate(-50%, 0%);
        }
    }

    .header-fixed {
        position: fixed;
        top: 0;
        left: 50%;
        z-index: 1;
        width: 100%;
        background: var(--bg-element1);
        transform: translate(-50%, 0%);
        animation: header-slidein 0.1s;
    }

    .header {
        .header-content {
          width: 100%;
        }
    }

    .header,
    .header-fixed {
        .header-content {
            display: flex;
            justify-content: space-between;
            margin: 0 auto;
            padding: 0;
            max-width: 1728px;
            height: 4rem;

            &.scroll-active {
                padding: 0 1rem;
                height: 3rem;
            }

            .logo-box {
                display: flex;
                .logo,
                .header-title {
                    display: flex;
                    align-items: center;
                    letter-spacing: 0.2rem;

                    :nth-child(2) {
                        margin-left: 1rem;
                    }

                    .logo-png {
                        width: 70px;
                    }
                }
                .header-title {
                    font-size: 1.2rem;
                    font-family: IndieFlowerTTFRegular, sans-serif, Arial;
                }
            }
        }
    }

    @include maxWidth1920px;
    @include maxWidth1440px;
    @include maxWidth1056px;
    @include maxWidth1024px;
    @include minWidth250px;
}
</style>
