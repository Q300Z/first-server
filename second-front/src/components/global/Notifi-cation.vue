<template>
  <div class="text-center">
    <v-menu
      v-model="menu"
      :close-on-content-click="false"
      location="start"
      transition="slide-y-transition"
    >
      <template #activator="{ props }">
        <v-btn v-bind="props" stacked>
          <v-badge
            v-if="$store.state.notif.notif.length"
            :content="$store.state.notif.notif.length"
            color="primary"
            floating
          >
            <v-icon>mdi-bell-ring</v-icon>
          </v-badge>
          <v-icon v-if="$store.state.notif.notif.length == 0">mdi-bell</v-icon>
        </v-btn>
      </template>

      <v-card min-width="400" min-height="600">
        <v-card-title class="text-center">Notification</v-card-title>
        <v-divider class="ma-2"></v-divider>
        <v-tabs v-model="tabs" fixed-tabs grow>
          <v-tab v-for="tab in getTabNotif" :key="tab.id" :value="tab.id">{{
            tab.title
          }}</v-tab>
        </v-tabs>

        <v-window v-model="tabs">
          <v-window-item
            v-for="notif in getNotif.slice(0, 10)"
            :key="notif._id"
            :value="notif.tab"
          >
            <v-list avatar>
              <v-list-item width="400" height="50">
                <!-- :prepend-avatar="notif.card.imageUrl" -->
                <template #prepend>
                  <div>
                    <v-list-item-title>{{
                      notif.card.title
                    }}</v-list-item-title>
                    <div class="text">
                      <v-list-item-subtitle>{{
                        notif.card.description
                      }}</v-list-item-subtitle>
                    </div>
                  </div>
                </template>
                <template #append>
                  <div>
                    <v-btn icon="mdi-delete" @click="remove(notif)"></v-btn>
                    <v-btn
                      icon="mdi-arrow-right-bold-box"
                      @click="go(notif)"
                    ></v-btn>
                  </div>
                </template>
              </v-list-item> </v-list
          ></v-window-item>
        </v-window>
      </v-card>
    </v-menu>
  </div>
</template>

<script>
import vuex from "vuex";
export default {
  data: () => ({
    menu: false,
    tabs: null,
  }),
  computed: {
    ...vuex.mapGetters("notif", ["getNotif", "getTabNotif"]),
  },
  methods: {
    remove(notif) {
      const sneak = {
        bool: true,
        text: "Delete successfully !",
        type: "success",
        icon: "mdi-check-circle",
      };
      this.$store.dispatch("sneak/sneak", sneak);
      this.$store.dispatch("notif/api_remove_notif", notif);
    },
    go(notif) {
      this.$router.push("/shop/item/" + notif.id);
    },
  },
};
</script>
<style scoped>
.text {
  max-width: 230px;
}
</style>
