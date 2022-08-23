<template>
  <div class="d-flex flex-wrap justify-center">
    <v-card
      v-for="card in getCards"
      :key="card._id"
      elevation="10"
      class="ma-4 pa-5 card"
    >
      <v-card-title>Titre : {{ card.title }}</v-card-title>
      <v-card-subtitle
        >Sous-Titre : {{ card._id }} | {{ card.userId }}
      </v-card-subtitle>
      <v-img
        :src="card.imageUrl"
        :lazy-src="card.imageUrl"
        max-height="250"
        cover
        class="radius"
      ></v-img>
      <v-card-text>Texte {{ card.description }}</v-card-text>
      <v-card-actions class="d-flex justify-center"
        ><v-btn variant="tonal" @click="go(card._id)"
          >Commander pour : {{ card.price }}€</v-btn
        >
        <v-btn variant="tonal" @click.prevent="remove(card)"
          >Supprimer</v-btn
        ></v-card-actions
      >
    </v-card>
  </div>
</template>
<script>
import store from "@/store";
export default {
  name: "ItemCards",
  store: store,
  computed: {
    getCards() {
      return this.$store.getters.getCards;
    },
  },
  methods: {
    go(id) {
      this.$router.push("/shop/item/" + id);
    },
    remove(id) {
      this.$store.dispatch("api_remove_card", id);
    },
  },
};
</script>
<style scoped>
.radius {
  border-radius: 35px;
}
.card {
  max-height: 500px;
  max-width: 400px;
}
</style>
