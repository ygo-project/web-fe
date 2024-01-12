<script setup>
	import RatingTable from '@/components/molecule/Boody/Container/RatingTable.vue'
</script>

<template>
	Rating
	<div class="container mt-5">
		<div class="btn-group">
			<button v-for="(tab, index) in tabs" :key="index" @click="changeTab(index)" :class="{ 'btn-primary': currentTab === index, 'btn-secondary': currentTab !== index }" class="btn">{{ tab.deck_name }}</button>
		</div>
		<div class="mt-3">
			<div v-for="(tab, index) in tabs" :key="index" v-show="currentTab == index">
				<RatingTable :deck_name="tab.deck_name" :deckNumber="tab.deckNumber" ref="rating_table"/>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				tabs: [],
				currentTab:null,
				deck_name:null,
				deckNumber:null,
			}
		},
		components: {
			RatingTable
		},
		created(){
			this.getDeck();
			console.log(this.tabs);
		},
		methods: {
			changeTab(index) {
				this.currentTab = index;
				this.deck_name = this.tabs[index].deck_name;
				this.deckNumber = this.tabs[index].deckNumber;

				console.log("deck_name : " + this.tabs[index].deck_name);
				console.log("deckNumber : " + this.tabs[index].deckNumber);

			},
			async getDeck() {
				this.tabs = await this.$api("https://ab56a9c8-61f3-4103-ac76-59f1f1e575c3.mock.pstmn.io/api/list?user="+0, "get");
			},
	    }
	}
</script>
<style scoped>
	.btn-primary {
		font-weight: bold;
	}
</style>
