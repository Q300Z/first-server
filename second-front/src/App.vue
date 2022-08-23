<template>
  <v-app>
    <v-app-bar>
      <v-btn v-for="to in routes" :key="to" :to="to.path" stacked>{{
        to.title
      }}</v-btn>
    </v-app-bar>
    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>

<script>
export default {
  name: "App",
  data: () => ({
    routes: [
      { title: "Home", path: "/" },
      { title: "About", path: "/about" },
      { title: "Shop", path: "/shop" },
    ],
    //
  }),
};
</script>
<style scoped>
.router {
  align-content: center;
}
</style>
