<template>
  <div>
    <div class="d-flex flex-row">
      <v-tabs v-model="tab" direction="vertical" color="primary">
        <v-tab value="option-1">
          <v-icon start> mdi-bell-ring </v-icon>
          Gestion des notifications
        </v-tab>
      </v-tabs>
      <v-window v-model="tab">
        <v-window-item value="option-1">
          <v-container fluid>
            <v-row no-gutters>
              <v-col>
                <v-card
                  class="pa-5 overflow-auto"
                  min-width="300"
                  max-width="700"
                  max-height="500"
                  elevation="5"
                >
                  <v-card-title>
                    <div class="font-weight-black mb-4">
                      Liste des tabs existantes :
                    </div>
                  </v-card-title>
                  <v-card-text>
                    <v-sheet class="overflow-auto" height="200">
                      <v-table density="compact" fixed-header>
                        <thead>
                          <tr>
                            <th class="text-left">ID</th>
                            <th class="text-left">Nom</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr v-for="tabs in getTabNotif" :key="tabs.id">
                            <td>{{ tabs.id }}</td>
                            <td>{{ tabs.title }}</td>
                          </tr>
                        </tbody>
                      </v-table>
                    </v-sheet>
                  </v-card-text>
                  <v-select
                    v-if="remove"
                    v-model="select"
                    label="Selectionez la Tab à supprimer"
                    :items="getTabNotif"
                    return-object
                    variant="outlined"
                  ></v-select>
                  <v-form ref="form" lazy-validation>
                    <v-row>
                      <v-col>
                        <v-text-field
                          v-if="add"
                          v-model="field"
                          label="Nom de la Tab"
                          counter
                          maxlength="10"
                          density="compact"
                          :rules="fieldRule"
                          variant="outlined"
                        ></v-text-field>
                      </v-col>
                      <v-col>
                        <v-text-field
                          v-if="add"
                          v-model="numberfield"
                          label="ID de la Tab"
                          type="number"
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
                    <v-btn
                      v-if="remove"
                      variant="outlined"
                      color="primary"
                      @click="Back()"
                      >Back</v-btn
                    >
                    <v-btn
                      v-if="add"
                      variant="outlined"
                      color="primary"
                      @click="ConfirmAdd()"
                      >Confirm</v-btn
                    >
                    <v-btn
                      v-if="add"
                      variant="outlined"
                      color="primary"
                      @click="Back()"
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
              </v-col>
            </v-row>
          </v-container>
        </v-window-item>
      </v-window>
    </div>
  </div>
</template>
<script>
import vuex from "vuex";
export default {
  data: () => ({
    tab: "option-1",
    aff: false,
    remove: false,
    add: false,
    field: "",
    fieldRule: [
      (v) => !!v || "Un titre est requis",
      (v) =>
        (v && v.length >= 3) || "Le nom doit être supérieur à 3 caractéres",
      (v) =>
        (v && v.length <= 10) || "Le nom doit avoir moins de 10 caractéres",
    ],
    numberfield: 0,
    numberRule: [(v) => !!v || "Un ID est requis"],
    select: null,
  }),
  computed: {
    ...vuex.mapGetters(["getTabNotif"]),
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
        const tab = { id: this.numberfield, title: this.field };
        this.$store.dispatch("api_add_tab_notif", tab);
      }
    },
    Remove() {
      this.aff = true;
      this.remove = true;
    },
    ConfirmRemove() {
      this.aff = false;
      this.remove = false;
      this.$store.dispatch("api_remove_tab_notif", this.select);
    },
    Back() {
      this.aff = false;
      this.add = false;
      this.remove = false;
    },
  },
};
</script>
