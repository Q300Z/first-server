<template>
  <v-app>
    <AppBarre />
    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>

<script>
import AppBarre from "@/components/AppBarre.vue";
export default {
  name: "App",
  components: { AppBarre },
  data: () => ({
    //
  }),
  beforeCreate() {
    this.$store.dispatch("api_get_cards");
    this.$store.dispatch("api_get_notif");
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
