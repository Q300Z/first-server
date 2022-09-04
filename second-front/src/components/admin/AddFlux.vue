<template>
  <v-card class="pa-5" elevation="5">
    <v-card-title>
      <div class="font-weight-black mb-4">Liste des flux existantes :</div>
    </v-card-title>
    <v-card-text>
      <v-sheet class="overflow-auto" height="200">
        <v-table density="compact" fixed-header>
          <thead>
            <tr>
              <th class="text-left">ID</th>
              <th class="text-left">Nom</th>
              <th class="text-left">Description</th>
              <th class="text-left">Lien</th>
              <th class="text-left">Dernière MAJ</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="tabs in getFluxRss" :key="tabs._id">
              <td>{{ tabs._id }}</td>
              <td>{{ tabs.title }}</td>
              <td>{{ tabs.description }}</td>
              <td>{{ tabs.link }}</td>
              <td>{{ tabs.upadateDate }}</td>
            </tr>
          </tbody>
        </v-table>
      </v-sheet>
    </v-card-text>
    <v-select
      v-if="remove"
      v-model="select"
      label="Selectionez la Tab à supprimer"
      :items="getFluxRss"
      return-object
      variant="outlined"
      density="compact"
    ></v-select>
    <v-form ref="form" lazy-validation>
      <v-row>
        <v-col>
          <v-text-field
            v-if="add"
            v-model="field"
            label="Nom du Flux"
            counter
            maxlength="20"
            density="compact"
            :rules="fieldRule"
            variant="outlined"
          ></v-text-field>
        </v-col>
        <v-col>
          <v-text-field
            v-if="add"
            v-model="numberfield"
            label="Le liens du Flux"
            type="text"
            density="compact"
            :rules="numberRule"
            variant="outlined"
          ></v-text-field>
        </v-col>
      </v-row>
    </v-form>

    <v-card-actions class="justify-center">
      <v-btn
        v-if="remove"
        variant="outlined"
        color="primary"
        @click="ConfirmRemove()"
        >Confirm</v-btn
      >
      <v-btn v-if="remove" variant="outlined" color="primary" @click="Back()"
        >Back</v-btn
      >
      <v-btn v-if="add" variant="outlined" color="primary" @click="ConfirmAdd()"
        >Confirm</v-btn
      >
      <v-btn v-if="add" variant="outlined" color="primary" @click="Back()"
        >Back</v-btn
      >
    </v-card-actions>
    <v-card-actions v-if="!aff" class="justify-center">
      <v-btn
        color="primary"
        prepend-icon="mdi-plus-circle"
        variant="outlined"
        @click="Add()"
      >
        Add
      </v-btn>
      <v-btn
        color="primary"
        prepend-icon="mdi-minus-circle"
        variant="outlined"
        @click="Remove()"
      >
        Remove
      </v-btn>
    </v-card-actions>
  </v-card>
</template>
<script>
import vuex from "vuex";
export default {
  data: () => ({
    aff: false,
    remove: false,
    add: false,
    field: "",
    fieldRule: [
      (v) => !!v || "Un titre est requis",
      (v) =>
        (v && v.length >= 3) || "Le nom doit être supérieur à 3 caractéres",
      (v) =>
        (v && v.length <= 20) || "Le nom doit avoir moins de 20 caractéres",
    ],
    numberfield: null,
    numberRule: [(v) => !!v || "Un ID est requis"],
    select: null,
  }),
  computed: {
    ...vuex.mapGetters(["getFluxRss"]),
  },
  methods: {
    Add() {
      this.aff = true;
      this.add = true;
    },
    ConfirmAdd() {
      if (this.$refs.form.validate()) {
        this.aff = false;
        this.add = false;
        const tab = { link: this.numberfield, title: this.field };
        this.$store.dispatch("api_post_flux", tab);
      }
    },
    Remove() {
      this.aff = true;
      this.remove = true;
    },
    ConfirmRemove() {
      this.aff = false;
      this.remove = false;
      this.$store.dispatch("api_delete_flux", this.select);
    },
    Back() {
      this.aff = false;
      this.add = false;
      this.remove = false;
    },
  },
};
</script>
