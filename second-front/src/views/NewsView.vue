<template>
  <div>
    <div class="d-flex flex-row">
      <v-tabs v-model="tabs" direction="vertical" color="primary">
        <v-tab v-for="f in Flux" :key="f._id" :value="f.title">
          <v-icon start> mdi-robot </v-icon>
          {{ f.title }}
        </v-tab>
      </v-tabs>
      <v-window v-model="tabs">
        <v-btn block color="primary" prepend-icon="mdi-refresh" @click="refresh"
          >Refresh</v-btn
        >
        <v-window-item v-for="f in Flux" :key="f._id" :value="f.title">
          <div class="mx-auto">
            <v-list density="compact">
              <v-list-subheader>FLUX RSS :</v-list-subheader>
              <v-list-item
                v-for="item in Rss"
                :key="item._id"
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
          </div>
        </v-window-item>
      </v-window>
    </div>
  </div>
</template>
<script>
export default {
  data: () => ({
    tabs: null,
  }),
  computed: {
    Rss() {
      return this.$store.getters.getRss;
    },
    Flux() {
      return this.$store.getters.getFluxRss;
    },
  },
  methods: {
    refresh() {
      this.$store.dispatch("api_get_rss");
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
