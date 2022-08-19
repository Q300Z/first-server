<template>
	<div class="cards">
		<div class="card" v-for="card in cards" :key="card._id">
			<v-card elevation="5" >
				<v-card-title>{{ card.title }}</v-card-title>
				<v-img contain :lazy-src="card.imageUrl" max-height="150" max-width="300" :src="card.imageUrl"></v-img>
				<v-card-text>{{ card.description }}</v-card-text>
				{{ card.price }}€
				<v-card-actions v-if="aff" ><v-btn small elevation="5" @click="click_commande(card._id)" class="btn">Commander</v-btn><v-btn small elevation="5" @click="click_suppr(card._id)" class="btn">Supprimer</v-btn></v-card-actions>
				<v-card-subtitle>{{ card._id }} - {{ card.userId }}</v-card-subtitle>
			</v-card>
		</div>
	</div>
</template>

<script>
	export default {
		
		name: 'Multi-cards',
		props: ['cards', 'aff'],
		methods: {
		click_commande(id) {
			this.$router.push('/shop/objet/' + id)
		},
		click_suppr(id){
			this.$axios.delete('http://localhost:3000/api/stuff/suppr/' + id),
			this.$emit('delete', id)
		}
	},
	};
	
</script>
<style>
	.card {
		max-width: 350px;
		min-width: 200px;
		max-height: 400px;
		min-height: 200px;
		margin: 10px;
		margin-top: 15px;
		display: inline-block;
	}
	.cards {
		max-height: 500px;
		min-height: 400px;
		overflow: auto;
		border-color: black;
		border-style: solid;
		border-width: 1px;
		border-radius: 10px;
		padding: 20px;
		margin: 25px;
	}
	.btn{
		margin: auto;
	}
</style>
