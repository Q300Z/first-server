<template>
  <div class="shop">
    <h1 class="d-flex justify-center">This is an item page</h1>
    <div class="ma-5">
      <v-card elevation="10" class="ma-4 pa-5 card">
        <v-card-title>Titre : {{ Card.title }}</v-card-title>
        <v-card-subtitle
          >Sous-Titre : {{ Card._id }} | {{ Card.userId }}
        </v-card-subtitle>
        <v-img
          :src="Card.imageUrl"
          :lazy-src="Card.imageUrl"
          max-height="250"
          cover
          class="radius"
        ></v-img>
        <v-card-text>Texte {{ Card.description }}</v-card-text>
        <v-card-actions class="d-flex justify-center"></v-card-actions>
      </v-card>
    </div>
  </div>
</template>
<script>
import store from "@/store";
export default {
  name: "ItemView",
  store: store,
  props: { id: { type: String, required: true } },
  computed: {
    Card() {
      return this.$store.getters["cards/getOne"];
    },
  },
  beforeMount() {
    this.$store.dispatch("cards/api_get_card_one", this.id);
  },
  beforeUpdate() {
    this.$store.dispatch("cards/api_get_card_one", this.id);
  },
};
</script>
<style scoped></style>
