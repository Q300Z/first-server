<template>
	<div>
		<Multicards :cards="this.cards" :aff="this.aff" />
		<p>{{ nb }}</p>
	</div>
</template>

<script>
	import Multicards from '../components/cards.vue';
	//
	export default {
		name: 'Sho-p',
		components: {
			Multicards,
		},
		props: ['id'],
		data: function () {
			return {
				cards: [],
				nb: 0,
				aff: 0,
			};
		},
		created() {
			fetch('http://localhost:3000/api/stuff/get/' + this.id)
				.then((response) => response.json())
				.then((data) => (this.cards.push(data), (this.nb = this.cards.length)));
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
