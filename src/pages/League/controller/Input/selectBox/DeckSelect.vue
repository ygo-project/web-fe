<script setup>
import { ref } from "vue";

import ChevronDown from "@/assets/svgs/ChevronDown.vue";
import IconBase from "@/components/atom/IconBase.vue";

const props = defineProps({
    deck: Object,
    deckList: Array,
    onSelectDeck: Function,
});

const isToggle = ref(false);

const setIsToggle = () => {
    isToggle.value = !isToggle.value;
}
</script>

<template>
    <div class="deck-list-select-container">
        <div class="selected" @click="setIsToggle">
            {{ deck.nickname }} <IconBase><ChevronDown></ChevronDown></IconBase>
        </div>
        <div :class="isToggle ? 'deck-list-select toggle' : 'deck-list-select'">
            <ul>
                <li
                    v-for="item in deckList"
                    :key="item.seq"
                    :class="item.seq === deck.seq ? 'active' : ''"
                    @click="() => {
                        onSelectDeck(item);
                        setIsToggle();
                    }"
                >
                    {{ item.nickname }}
                </li>
            </ul>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.deck-list-select-container {
    position: relative;
    display: flex;
    align-items: center;

    .selected {
        display: flex;
        justify-content: space-between;
        align-items: center;
        width: 8rem;
        height: 2rem;
        padding: 0 0.5rem;
        border-radius: 4px;
        box-shadow: rgb(0 0 0 / 5%) 0 0 4px;
        background-color: var(--bg-element1);
        color: var(--text2);
        font-size: 0.875rem;
        font-weight: 600;
        cursor: pointer;

        svg {
            width: 23px;
            height: 20px;
        }

        &:hover {
            opacity: 0.7;
        }
    }

    .deck-list-select {
        @include tabStyle;

        opacity: 0;
        transform: scale(0);
        top: 100%;
        &.toggle {
            opacity: 1;
            transform: scale(1);
        }

        ul {
            @include removeMarker;

            li {
                padding: 0.9rem 1rem;
                border-top: 1px solid var(--border4);
                background-color: var(--bg-element1);
                font-weight: 600;
                font-size: 0.875rem;
                cursor: pointer;

                &:nth-child(1) {
                    border: none;
                }

                &:hover {
                    background-color: var(--bg-element2);
                }
            }

            .active {
                color: var(--primary1);
            }
        }
    }
}
</style>
