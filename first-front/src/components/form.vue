<template>
	<v-form ref="form" v-model="valid" lazy-validation>
		<v-text-field
			v-model="name"
			:counter="10"
			label="Name"
			required
		></v-text-field>

		<v-text-field v-model="email" label="E-mail" required></v-text-field>

		<v-select v-model="select" :items="items" label="Item" required></v-select>

		<v-checkbox
			v-model="checkbox"
			:rules="[(v) => !!v || 'You must agree to continue!']"
			label="Do you agree?"
			required
		></v-checkbox>

		<v-btn :disabled="!valid" color="success" class="mr-4" @click="validate">
			Validate
		</v-btn>
	</v-form>
</template>

<script>
	export default {
		name: 'form-input',
		data: () => ({
			valid: true,
			name: '',
			email: '',
			select: null,
			items: ['Item 1', 'Item 2', 'Item 3', 'Item 4'],
			checkbox: false,
		}),

		methods: {
			validate() {
				const requestoption = {
					method: 'POST',
					headers: {
						'Content-type': 'application/json;',
					},
					body: JSON.stringify({
						id: 0,
						title: 'Mon troisième objets',
						description: 'Les infos de mon troisième objet',
					}),
				};
				fetch('http://localhost:3000/api/stuff/post', requestoption)
					// Converting to JSON
					.then((response) => response.json())

					// Displaying results to console
					.then((json) => console.log(json));
			},
		},
	};
</script>
