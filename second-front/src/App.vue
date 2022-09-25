<template>
  <v-app>
    <AppBarre />
    <v-main>
      <Snackbarre />
      <router-view />
    </v-main>
  </v-app>
</template>

<script>
import AppBarre from "@/components/global/AppBarre.vue";
import Snackbarre from "@/components/global/SneakBarre.vue";
export default {
  name: "App",
  components: { AppBarre, Snackbarre },
  data: () => ({
    //
  }),
  beforeCreate() {
    this.$store.dispatch("cards/api_get_cards");
    //this.$store.dispatch("notif/api_get_notif");
    this.$store.dispatch("notif/api_get_tab_notif");
    this.$store.dispatch("rss/api_get_rss");
    this.$store.dispatch("rss/api_get_flux");
    //console.log(this.$store.getters.getFluxRss);
  },
};
</script>
<style>
:hover.v-btn {
  background-color: #caa1fd2a;
}
:hover.v-list-item--nav {
  background-color: #caa1fd15;
}
</style>
