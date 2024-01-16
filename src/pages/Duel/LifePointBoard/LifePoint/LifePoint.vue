<script>
import IconBase from "@/components/atom/IconBase.vue";
import ReplyIcon from "@/assets/svgs/ReplyIcon.vue";

export default {
    components: { ReplyIcon, IconBase },
    props: {
        lifePoint: { type: Number, default: 8000 },
        order: { type: String },
        returnFunc: { type: Function },
    }
}
</script>

<template>
    <div class="life-point-container">
        <div class="display">
            <h1>{{ lifePoint }}</h1>
        </div>
        <div class="order">
            <h5>{{ order }}</h5>
            <div class="setting-hover" @click="returnFunc()">
                <IconBase><ReplyIcon /></IconBase>
            </div>
        </div>
    </div>
</template>

<style scoped>
    .life-point-container {
        display: flex;
        flex-wrap: wrap;
        flex-direction: row;
        justify-content: center;

        > div {
            width: 100%;
            flex: auto;
            display: flex;
        }

        .display {
            justify-content: center;
        }

        .order {
            align-items: center;
            justify-content: flex-end;
            padding-right: 30px;

            h5 {
                margin-right: 30px;
            }

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
    }
</style>
