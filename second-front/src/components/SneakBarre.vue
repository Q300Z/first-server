<template>
  <div class="text-center ma-2">
    <v-snackbar
      v-model="activeSneak"
      :color="typeSneak"
      location="bottom right"
    >
      <v-icon icon="mdi-alert-circle-outline" size="x-large" start></v-icon>
      {{ messageSneak }}

      <template #actions>
        <v-btn variant="text" @click="close">
          <v-icon icon="mdi-close" size="small"></v-icon> Close
        </v-btn>
      </template>
    </v-snackbar>
  </div>
</template>
<script>
import vuex from "vuex";
export default {
  computed: {
    ...vuex.mapGetters(["messageSneak", "activeSneak", "typeSneak"]),
  },
  methods: {
    close() {
      this.$store.dispatch("sneak", false);
    },
  },
};
</script>
