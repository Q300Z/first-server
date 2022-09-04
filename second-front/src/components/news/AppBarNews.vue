<template>
  <v-card class="mx-auto pa-2" min-width="250">
    <v-list>
      <v-list-subheader>LISTE FLUX :</v-list-subheader>

      <v-list-item
        v-for="route in Flux"
        :key="route._id"
        :value="route"
        active-color="primary"
        :to="'/news/' + route._id"
        prepend-icon="mdi-vuetify"
        :title="route.title"
        nav
      >
      </v-list-item>
    </v-list>
  </v-card>
</template>
<script>
export default {
  data: () => ({}),
  computed: {
    Flux() {
      return this.$store.getters.getFluxRss;
    },
  },
};
</script>
