<template>
  <v-card class="mx-auto">
    <v-list density="compact">
      <v-list-subheader>FLUX RSS : {{ id }}</v-list-subheader>
      <!-- <v-sheet
        min-height="30"
        min-width="1300"
        color="transparent"
        v-for="(item, i) in Rss"
        :key="i"
      >
        <v-lazy
          v-model="item.isActive"
          :options="{
            threshold: 0,
          }"
        > -->
      <v-list-item
        v-for="(item, i) in Rss"
        :key="i"
        :value="item"
        active-color="primary"
        :href="item.link"
      >
        <v-list-item-title v-text="item.title"></v-list-item-title>
        <v-list-item-subtitle>{{ item.pubDate }}</v-list-item-subtitle>
        <!--         <v-list-item-media v-html="item.description"> </v-list-item-media> -->
      </v-list-item>
      <!-- </v-lazy>
      </v-sheet> -->
    </v-list>
  </v-card>
</template>
<script>
export default {
  props: { id: { type: String, required: true } },
  data: () => ({}),
  computed: {
    Rss() {
      return this.$store.getters.getRss
        .filter((el) => el.flux == this.id)
        .sort()
        .reverse();
    },
    Flux() {
      return this.$store.getters.getFluxRss;
    },
  },
};
/* {{ $route.params.id }} */
</script>
