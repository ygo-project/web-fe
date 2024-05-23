<script setup>
import { ref } from "vue";

import YgoButton from "@/components/atom/YgoButton.vue";
import DeckSearch from "@/pages/Rating/search/DeckSearch.vue";

const deckActive = ref(true);
const userActive = ref(false);
</script>

<template>
    <div class="rating-container">
        <div class="tab-area">
            <YgoButton @click="deckActive = true; userActive = false;" :class="{ active: deckActive }">덱</YgoButton>
            <YgoButton @click="userActive = true; deckActive = false;" :class="{ active: userActive }">유저</YgoButton>
        </div>
        <div class="tab-content-area" v-if="deckActive">
            <div class="search-area">
                <DeckSearch />
            </div>
            <div class="display-area">

            </div>
        </div>
        <div class="tab-content-area" v-else-if="userActive">

        </div>
    </div>
</template>

<style scoped>
.rating-container {
    display: flex;
    flex-direction: column;
    width: 90vw;
    height: calc(100vh - 4rem);
    margin: 0 auto;

    .tab-area {
        .active {
            color: var(--primary2);
            border: 1px solid var(--primary2);
        }

        button {
            margin-right: 4px;
            border: 1px solid #7c858d;
        }
    }

    .tab-content-area {
        .search-area {
            width: 100%;
            border-radius: 1rem;
            margin-bottom: 1vh;
        }

        .display-area {
            width: 100%;
            background: var(--bg-element2);
            border-radius: 1rem;
        }
    }
}
</style>
