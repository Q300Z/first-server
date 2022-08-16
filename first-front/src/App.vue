<template>
	<div id="app">
		<Multicards :cards="this.cards" />
		<Forms v-on:objet="random" />
		<p>{{ nb }}</p>
	</div>
</template>

<script>
	import Multicards from './components/cards.vue';
	import Forms from './components/form.vue';
	//
	export default {
		name: 'App',
		components: {
			Multicards,
			Forms,
		},
		data: function () {
			return {
				cards: [],
				nb: 0,
			};
		},
		created() {
			fetch('http://localhost:3000/api/stuff/get')
				.then((response) => response.json())
				.then((data) => ((this.cards = data), (this.nb = this.cards.length)));
		},
		methods: {
			random(objets) {
				var objet = JSON.parse(objets);
				this.cards.push({
					id: objet.id,
					title: objet.title,
					description: objet.description,
					imageUrl: objet.imageUrl,
					price: objet.price,
					userId: objet.userId,
				});
				this.nb = this.cards.length;
			},
		},
	};
</script>

<style>
	#app {
		font-family: Avenir, Helvetica, Arial, sans-serif;
		-webkit-font-smoothing: antialiased;
		-moz-osx-font-smoothing: grayscale;
		text-align: center;
		color: #2c3e50;
		margin-top: 60px;
	}
</style>
