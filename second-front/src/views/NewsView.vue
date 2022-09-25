<template>
  <div>
    <v-row
      ><v-col cols="auto pa-5">
        <AppBarNews />
      </v-col>
      <v-col class="pa-5">
        <router-view></router-view>
      </v-col>
    </v-row>
  </div>
</template>
<script>
import AppBarNews from "@/components/news/AppBarNews.vue";
export default {
  components: { AppBarNews },
  data: () => ({}),
  computed: {
    Rss() {
      return this.$store.getters["rss/getRss"];
    },
    Flux() {
      return this.$store.getters["rss/getFluxRss"];
    },
  },
  methods: {
    refresh() {
      this.$store.dispatch("rss/api_get_rss");
    },
  },
};
</script>

/*
<v-list density="compact">
      <v-list-subheader>FLUX RSS :</v-list-subheader>
      <v-list-item
        v-for="(item, i) in Rss"
        :key="i"
        :value="item"
        active-color="primary"
        :href="item.link"
      >
        <v-list-item-title v-text="item.title"></v-list-item-title>
        <v-list-item-subtitle>
          {{ item.description }} | {{ item.pubDate }}
        </v-list-item-subtitle>
      </v-list-item>
    </v-list>
*/
