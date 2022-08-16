<template>
	<div class="cards">
		<div class="card" v-for="card in cards" :key="card.id">
			<v-card elevation="5">
				<v-card-title>{{ card.title }}</v-card-title>
				<v-card-text>{{ card.description }}</v-card-text>
				{{ card.price }}€
				<v-card-subtitle>{{ card.id }} - {{ card.userId }}</v-card-subtitle>
			</v-card>
		</div>
	</div>
</template>

<script>
	export default {
		name: 'Multi-cards',
		props: ['cards'],
	};
</script>
<style>
	.card {
		max-width: 300px;
		min-width: 200px;
		margin: 10px;
		display: inline-block;
	}
	.cards {
		max-height: 400px;
		min-height: 400px;
		overflow: auto;
		border-color: black;
		border-style: solid;
		border-width: 1px;
		border-radius: 10px;
		padding: 20px;
		margin: 25px;
	}
</style>
