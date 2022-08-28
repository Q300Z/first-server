<template>
  <div>
    <v-app-bar>
      <template #prepend>
        <v-app-bar-nav-icon
          variant="text"
          @click.stop="drawer = !drawer"
        ></v-app-bar-nav-icon>
      </template>

      <v-spacer></v-spacer>

      <v-btn-toggle color="primary" mandatory>
        <v-btn
          v-for="route in routes"
          :key="route"
          :to="route.path"
          :prepend-icon="route.icon"
          stacked
          >{{ route.title }}
        </v-btn>
      </v-btn-toggle>

      <v-spacer></v-spacer>

      <template #append><Notif /> </template>
    </v-app-bar>

    <v-navigation-drawer v-model="drawer" bottom temporary>
      <v-list :lines="false" nav>
        <v-list-item
          v-for="route in routes"
          :key="route.path"
          :value="route"
          active-color="primary"
          :to="route.path"
        >
          <template #prepend>
            <v-icon :icon="route.icon"></v-icon>
          </template>

          <v-list-item-title v-text="route.title"></v-list-item-title>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
  </div>
</template>
<script>
import Notif from "@/components/Notifi-cation.vue";
export default {
  components: { Notif },
  data: () => ({
    drawer: false,
    group: null,
    routes: [
      { title: "Home", path: "/", icon: "mdi-home" },
      { title: "About", path: "/about", icon: "mdi-information" },
      { title: "Shop", path: "/shop", icon: "mdi-cart" },
      { title: "Admin", path: "/admin", icon: "mdi-cog" },
      { title: "News", path: "/news", icon: "mdi-newspaper-variant" },
    ],
  }),

  watch: {
    group() {
      this.drawer = false;
    },
  },
};
</script>
