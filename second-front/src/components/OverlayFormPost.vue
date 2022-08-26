<template>
  <div class="text-center">
    <v-btn stacked @click="dialog = true">
      <v-badge color="error" dot>
        <v-icon icon="mdi-plus"></v-icon>
      </v-badge>
      New
    </v-btn>

    <v-dialog v-model="dialog" persistent>
      <v-card class="size pa-5">
        <v-btn variant="tonal" class="ma-5" @click="dialog = false"
          ><v-icon icon="mdi-close"></v-icon
        ></v-btn>
        <v-form ref="form">
          <v-text-field
            v-model="titre"
            :rules="titreRule"
            :counter="50"
            clearable
            label="Titre"
            required
          ></v-text-field>
          <v-text-field
            v-model="image"
            :rules="imageRule"
            hint="www.example.com/monImage.png"
            clearable
            label="URL d'une Image"
            required
          ></v-text-field>
          <v-textarea
            v-model="description"
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
            v-model="prix"
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
  name: "OverlayForm",
  data() {
    return {
      dialog: false,
      sneakbarre: false,
      sneakberText: "Error",
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
    };
  },
  methods: {
    validate() {
      if (this.$refs.form.validate()) {
        const data = {
          _id: Math.random().toString(36).substr(2, 18),
          title: this.titre,
          description: this.description,
          imageUrl: this.image,
          price: this.prix,
          userId: Math.random().toString(36).substr(2, 18),
        };
        this.$store.dispatch("api_add_card", data);
        const sneak = { bool: true, text: "Success !", type: "success" };
        this.$store.dispatch("sneak", sneak);
        this.dialog = false;
      }
    },
    reset() {
      this.$refs.form.reset();
      const sneak = { bool: true, text: "Reset Form !", type: "error" };
      this.$store.dispatch("sneak", sneak);
    },
    resetValidation() {
      this.$refs.form.resetValidation();
      const sneak = { bool: true, text: "Reset Validation !", type: "warning" };
      this.$store.dispatch("sneak", sneak);
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
