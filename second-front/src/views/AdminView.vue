<template>
  <div class="d-flex flex-wrap pa-3">
    <v-row>
      <v-col><AddTabs /></v-col>
      <v-col><AddFlux /></v-col>
    </v-row>
  </div>
</template>
<script>
import AddTabs from "../components/admin/AddTabs.vue";
import AddFlux from "../components/admin/AddFlux.vue";
//import DynForm from "../components/global/DynForm.vue";
export default {
  components: { AddTabs, AddFlux },
  data: () => ({
    tab: "option-1",
  }),
};
</script>
