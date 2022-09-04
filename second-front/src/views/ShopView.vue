<template>
  <div class="shop">
    <h1 class="d-flex justify-center">This is an shop page {{ countCards }}</h1>
    <div class="d-flex justify-center ma-10">
      <v-btn stacked color="primary" @click="refresh()"
        ><v-icon icon="mdi-reload"></v-icon>refresh</v-btn
      >
      <v-divider vertical class="mx-3"></v-divider>
      <OverlayFormPost />
      <v-divider vertical class="mx-3"></v-divider>
      <OverlayFormUpdate />
      <SneakBarre />
    </div>
    <div class="ma-5">
      <ItemCards />
    </div>
  </div>
</template>
<script>
import ItemCards from "@/components/cards/ItemCards.vue";
import OverlayFormPost from "@/components/cards/OverlayFormPost.vue";
import OverlayFormUpdate from "@/components/cards/OverlayFormUpdate.vue";
import SneakBarre from "@/components/global/SneakBarre.vue";
import store from "@/store";
export default {
  name: "ShopView",
  store: store,
  components: { ItemCards, OverlayFormPost, OverlayFormUpdate, SneakBarre },
  computed: {
    countCards() {
      return this.$store.getters.getCount;
    },
  },
  beforeMount() {
    this.$store.dispatch("api_get_cards");
  },
  methods: {
    refresh() {
      this.$store.dispatch("api_get_cards");
    },
  },
};
</script>
<style scoped></style>
