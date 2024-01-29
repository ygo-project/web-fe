<template>
	<table>
		<tr>
			<td>덱</td>
			<td>{{deck_name}}</td>
			<td>총 횟수</td>
			<td>{{winCount + lossesCount}}</td>
			<td>이긴 횟수</td>
			<td>{{winCount}}</td>
			<td>진 횟수</td>
			<td>{{lossesCount}}</td>
			<td>승률</td>
			<td>{{getWinningRate()}}</td>
		</tr>
	</table>
	<table>
		<thead>
			<tr>
				<th :key="index" v-for="(column, index) in Column">{{column}}</th>
			</tr>
		</thead>
		<tbody>
			<tr :key="index" v-for="(list, index) in List">
				<td>{{list.user_name}}</td>
				<td>{{list.deck_name}}</td>
				<td>{{list.date}}</td>
				<td>{{list.target_name}}</td>
				<td>{{list.target_deck_name}}</td>
				<td>{{list.result}}</td>
			</tr>
		</tbody>
	</table>
</template>

<script>
	export default {
		props: {
			deck_name: String,
			deckNumber: Number
		},
		data() {
			return {
				count:0,
				winCount: 0,
				lossesCount: 0,
				Column: ["사용자", "덱(이름)", "날짜", "상대방", "상대방 덱(이름)", "결과"],
				List: []
			};
		},
		created(){
			this.getList();
		},
		methods: {
			async getList() {
				console.log("test:"+ this.deckNumber);
				this.List = await this.$api("https://ab56a9c8-61f3-4103-ac76-59f1f1e575c3.mock.pstmn.io/api/list?deckNumber="+this.deckNumber, "get");
				this.lossesCount = this.getDataCount(this.List, false);
				this.winCount = this.getDataCount(this.List, true);
			},
			getDataCount(object, boolean){
				this.count = 0;
				for(var idx in object){
					if(object[idx].result == boolean)
						this.count = this.count+1;
				}
				return this.count;
			},
			getWinningRate(){
				return (this.winCount / (this.winCount + this.lossesCount) * 100).toFixed(1) + "%";
			}
		}
	}
</script>
<style scoped>
	container {
		width: 100%;
		height: 200px;
	}
	table {
		font-family: arial, sans-serif;
		border-collapse: collapse;
		width: 100%;
	}
	th, td {
		border: 1px solid #dddddd;
		text-align: left;
		padding: 8px;
	}
</style>
