<template>
	<div class="form">
		<v-form ref="form" v-model="valid" lazy-validation>
			<v-text-field v-if="this.a" v-model="name" label="Name"></v-text-field>
			<v-text-field v-if="this.a" v-model="email" label="E-mail"></v-text-field>
			<v-btn :disabled="!valid" class="mr-4" @click="validate">
				Validate
			</v-btn>
		</v-form>
	</div>
</template>

<script>
	import axios from 'axios';
	export default {
		name: 'form-input',
		data: () => ({
			valid: true,
			name: '',
			email: '',
			a: 0,
		}),

		methods: {
			validate() {
				const data = {
					'id': Math.floor(Math.random() * (10000 - 0)) + 0,
					'title': Math.random().toString(36).substr(2, 18),
					'description': Math.random().toString(36).substr(9, 30),
					'imageUrl':
						'https://cdn.pixabay.com/photo/2019/06/11/18/56/camera-4267692_1280.jpg',
					'price': Math.floor(Math.random() * (10000 - 1000)) + 1000,
					'userId': Math.random().toString(36).substr(2, 18),
				};		
				axios
					.post('http://localhost:3000/api/stuff/post', data)
					.then(function (response) {
						console.log(response);
					})
					.catch(function (error) {
						console.log(error);
					});
				this.$emit('objet', JSON.stringify(data));
				console.log(data);
			},
		},
	};
</script>
<style>
	.form {
		display: inline-block;
		max-width: 50%;
		min-width: 20%;
	}
</style>
