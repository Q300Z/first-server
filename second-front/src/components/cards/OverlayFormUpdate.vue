<template>
  <div class="text-center">
    <v-btn stacked @click="dialog = true">
      <v-badge color="error" dot>
        <v-icon icon="mdi-pencil"></v-icon>
      </v-badge>
      Modify
    </v-btn>

    <v-dialog v-model="dialog" persistent>
      <v-card class="size pa-5">
        <v-btn variant="tonal" class="ma-5" @click="dialog = false"
          ><v-icon icon="mdi-close"></v-icon
        ></v-btn>
        <v-select
          v-model="select"
          :items="getCards"
          item-title="_id"
          label="Select"
          return-object
        ></v-select>
        <v-form ref="form">
          <v-text-field
            v-model="select.title"
            :rules="titreRule"
            :counter="50"
            clearable
            label="Titre"
            required
          ></v-text-field>
          <v-text-field
            v-model="select.imageUrl"
            :rules="imageRule"
            hint="www.example.com/monImage.png"
            clearable
            label="URL d'une Image"
            required
          ></v-text-field>
          <v-textarea
            v-model="select.description"
            :rules="descriptionRule"
            auto-grow
            clearable
            counter
            rows="1"
            row-height="15"
            label="Description"
            required
          ></v-textarea>
          <v-text-field
            v-model="select.price"
            :rules="prixRule"
            suffix="€"
            clearable
            label="Prix"
            type="number"
            required
          ></v-text-field>
          <v-divider class="ma-2"></v-divider>
          <v-btn color="success" class="mr-4" @click="validate">
            Validate
          </v-btn>

          <v-btn color="error" class="mr-4" @click="reset"> Reset Form </v-btn>

          <v-btn color="warning" @click="resetValidation">
            Reset Validation
          </v-btn>
        </v-form>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
export default {
  name: "OverlayFormUpdate",
  data() {
    return {
      dialog: false,
      titre: "Mon titre",
      titreRule: [
        (v) => !!v || "Un titre est requis",
        (v) =>
          (v && v.length >= 3) ||
          "Le titre doit être supérieur à 10 caractéres",
        (v) =>
          (v && v.length <= 50) || "Le titre doit avoir moins de 50 caractéres",
      ],
      image:
        "https://cdn.pixabay.com/photo/2014/12/27/15/31/camera-581126_960_720.jpg",
      imageRule: [(v) => !!v || "Une image est requis"],
      description: "Ma description",
      descriptionRule: [(v) => !!v || "Une description est requis"],
      prix: 500,
      prixRule: [(v) => !!v || "Un prix est requis"],
      select: {
        _id: "Example ID",
        title: Math.random().toString(36).substr(2, 18),
        description: Math.random().toString(36).substr(2, 18),
        imageUrl: Math.random().toString(36).substr(2, 18),
        price: 500,
        userId: Math.random().toString(36).substr(2, 18),
      },
    };
  },
  computed: {
    getCards() {
      return this.$store.getters["cards/getCards"];
    },
  },
  methods: {
    validate() {
      if (this.$refs.form.validate()) {
        this.$store.dispatch("cards/api_update_card", this.select);
        const sneak = {
          bool: true,
          text: "UPDATE : Success !",
          type: "success",
          icon: "mdi-check-circle",
        };
        this.$store.dispatch("sneak/sneak", sneak);
        this.dialog = false;
      }
    },
    reset() {
      this.select = {
        _id: "Example ID",
        title: Math.random().toString(36).substr(2, 18),
        description: Math.random().toString(36).substr(2, 18),
        imageUrl: Math.random().toString(36).substr(2, 18),
        price: 500,
        userId: Math.random().toString(36).substr(2, 18),
      };
      const sneak = {
        bool: true,
        text: "Reset Form !",
        type: "error",
        icon: "mdi-alert",
      };
      this.$store.dispatch("sneak/sneak", sneak);
    },
    resetValidation() {
      this.$refs.form.resetValidation();
      const sneak = {
        bool: true,
        text: "Reset Validation !",
        type: "warning",
        icon: "mdi-alert",
      };
      this.$store.dispatch("sneak/sneak", sneak);
    },
  },
};
</script>
<style scoped>
.size {
  min-width: 500px;
  border-radius: 10 px;
}
</style>
