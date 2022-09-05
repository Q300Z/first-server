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
        active-color="primary"
        :active="!item.read"
      >
        <div @click="read(item)" class="item">
          <v-list-item-title v-text="item.title"></v-list-item-title>
          <v-list-item-subtitle>{{ item.pubDate }}</v-list-item-subtitle>
        </div>

        <v-tooltip activator="parent" location="start" v-if="item.read">
          Lue le {{ item.readDate }}
        </v-tooltip>

        <!-- <v-list-item-media v-html="item.description"> </v-list-item-media> -->
        <template v-slot:append v-if="item.read">
          <v-btn variant="text" icon @click="unread(item)">
            <v-icon> mdi-eye </v-icon>
          </v-btn>
        </template>
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
  methods: {
    read(item) {
      console.log("READ");
      if (item["read"] == false) {
        item["read"] = true;
        this.$store.dispatch("api_put_rss", item);
      }
      window.open(item.link, "_blank");
    },
    unread(item) {
      console.log("UNREAD");
      if (item["read"] == true) {
        item["read"] = false;
        this.$store.dispatch("api_put_rss", item);
      }
    },
  },
};
/* {{ $route.params.id }} */
</script>
<style scoped>
.item :hover {
  cursor: pointer;
}
</style>
