<template>
  <div class="text-center">
    <v-dialog v-model="dialog">
      <template #activator="{ props }">
        <v-btn color="primary" v-bind="props"> Open Dialog </v-btn>
      </template>

      <CardForm />
    </v-dialog>
  </div>
</template>
<script>
import CardForm from "./DynFormComp/cardForm.vue";
export default {
  components: { CardForm },
  data() {
    return {
      dialog: false,
    };
  },
};
</script>
