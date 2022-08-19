<template>
	<div class="form">
		<v-form ref="form" v-model="valid" lazy-validation>
			<v-text-field v-model="title" label="Titre" required :rules="[v => !!v || 'Titre is required']"></v-text-field>
			<v-text-field v-model="descrip" label="Description" required :rules="[v => !!v || 'Description is required']"></v-text-field>
			<v-text-field v-model="imgurl" label="ImageUrl" required :rules="[v => !!v || 'imageUrl is required']"></v-text-field>
			<v-text-field v-model="price" label="Prix" required :rules="[v => !!v || 'Prix is required']" type="number"></v-text-field>
			<v-btn class="mr-4" :disabled="!valid" @click="validate">
				Validate
			</v-btn>
			<v-btn class="mr-4" @click="random">
				Random
			</v-btn>
		</v-form>
	</div>
</template>

<script>
	
	export default {
		name: 'form-input',
		data: () => ({
			valid: true,
			title: '',
			descrip: '',
			imgurl: 'https://cdn.pixabay.com/photo/2019/06/11/18/56/camera-4267692_1280.jpg',
			price: null,
			a: 1,
		}),

		methods: {
			async validate() {
				if(this.$refs.form.validate()){
					const data = {
					'_id': Math.random().toString(36).substr(2, 18),
					'title': this.title,
					'description': this.descrip,
					'imageUrl':
						this.imgurl,
					'price': this.price,
					'userId': Math.random().toString(36).substr(2, 18),
				};		
				await this.$axios
					.post('http://localhost:3000/api/stuff/post', data)
					.then(function (response) {
						console.log(response);
					})
					.catch(function (error) {
						console.log(error);
					});
				await this.$emit('objet', JSON.stringify(data));
				}
				
			},
			async random() {
					const data = {
					'_id': Math.floor(Math.random() * (10000 - 0)) + 0,
					'title': Math.random().toString(36).substr(2, 18),
					'description': Math.random().toString(36).substr(9, 30),
					'imageUrl':
						'https://cdn.pixabay.com/photo/2019/06/11/18/56/camera-4267692_1280.jpg',
					'price': Math.floor(Math.random() * (10000 - 1000)) + 1000,
					'userId': Math.random().toString(36).substr(2, 18),
				};		
				await this.$axios
					.post('http://localhost:3000/api/stuff/post', data)
					.then(function (response) {
						console.log(response.data);
					})
					.catch(function (error) {
						console.log(error);
					});
				await this.$emit('objet', JSON.stringify(data));
				}
				
			},
	};
</script>
<style>
	.form {
		display: inline-block;
		max-width: 50%;
		min-width: 20%;
		border-color: black;
		border-style: solid;
		border-width: 1px;
		border-radius: 10px;
		padding: 20px;
	}
</style>
