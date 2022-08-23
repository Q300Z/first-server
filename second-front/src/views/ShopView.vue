<template>
  <div class="shop">
    <h1 class="d-flex justify-center">This is an shop page {{ countCards }}</h1>
    <div class="d-flex justify-center ma-10">
      <v-btn stacked color="secondary" @click="refresh()"
        ><v-icon icon="mdi-reload"></v-icon>refresh</v-btn
      >
      <v-divider vertical class="mx-4"></v-divider>
      <OverlayForm />
      <SneakBarre />
    </div>
    <div class="ma-5">
      <ItemCards />
    </div>
  </div>
</template>
<script>
import ItemCards from "@/components/ItemCards.vue";
import OverlayForm from "@/components/OverlayForm.vue";
import SneakBarre from "@/components/SneakBarre.vue";
import store from "@/store";
export default {
  name: "ShopView",
  store: store,
  components: { ItemCards, OverlayForm, SneakBarre },
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
