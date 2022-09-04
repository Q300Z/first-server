<template>
  <div class="d-flex flex-row">
    <v-tabs v-model="tab" direction="vertical" color="primary">
      <v-tab value="option-1">
        <v-icon start> mdi-bell-ring </v-icon>
        Gestion <br />
        des <br />
        notifications
      </v-tab>
    </v-tabs>
    <v-window v-model="tab">
      <v-window-item value="option-1">
        <v-container fluid>
          <v-row>
            <v-col cols="3"><AddTabs /></v-col>
            <v-col cols="9"><AddFlux /></v-col>
          </v-row>
        </v-container>
      </v-window-item>
    </v-window>
  </div>
</template>
<script>
import AddTabs from "../components/admin/AddTabs.vue";
import AddFlux from "../components/admin/AddFlux.vue";
export default {
  components: { AddTabs, AddFlux },
  data: () => ({
    tab: "option-1",
  }),
};
</script>
