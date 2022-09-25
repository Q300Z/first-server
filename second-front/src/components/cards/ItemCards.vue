<template>
  <div>
    <div>
      <v-pagination
        v-model="page"
        :length="getCount"
        :total-visible="1"
        :disabled="!getCount > 24"
      ></v-pagination>
    </div>
    <div class="compo">
      <v-row>
        <v-col
          v-for="(card, index) in getCards.slice(
            page * maxInPage - maxInPage,
            page * maxInPage
          )"
          :key="index"
          sm="6"
          md="6"
          lg="4"
          xl="2"
          xxl="2"
        >
          <v-sheet
            max-height="650"
            min-height="450"
            min-width="360"
            color="transparent"
          >
            <!-- <v-lazy
            v-model="card.isActive"
            :options="{
              threshold: 0,
            }"
          > -->
            <v-card elevation="10" class="pa-5 justify-center overflow-auto">
              #{{ index }}
              <v-card-title>{{ card.title }}</v-card-title>
              <v-card-subtitle>ID: {{ card._id }} </v-card-subtitle>
              <v-card-subtitle>UserID: {{ card.userId }} </v-card-subtitle>
              <v-img
                :src="card.imageUrl"
                :lazy-src="card.imageUrl"
                max-height="300"
                cover
                class="radius"
              ></v-img>
              <v-card-text class="overflow-auto card">{{
                card.description
              }}</v-card-text>
              <v-card-actions class="d-flex justify-center"
                ><v-btn variant="tonal" @click="go(card)"
                  >Commander pour {{ card.price }}€</v-btn
                >
                <v-btn variant="tonal" @click.prevent="remove(card)"
                  >Supprimer</v-btn
                ></v-card-actions
              >
            </v-card>
            <!-- </v-lazy> -->
          </v-sheet>
        </v-col>
      </v-row>
    </div>
    <div>
      <v-pagination
        v-model="page"
        :length="getCount"
        :total-visible="1"
        @next="next()"
      ></v-pagination>
    </div>
  </div>
</template>
<script>
import store from "@/store";
export default {
  name: "ItemCards",
  store: store,
  data: () => ({
    page: 1,
    maxInPage: 24,
  }),
  computed: {
    getCards() {
      return this.$store.getters["cards/getCards"];
    },
    getCount() {
      var a = this.$store.getters["cards/getCount"];
      if (isNaN(Math.round(a / this.maxInPage))) {
        return 1;
      } else {
        return Math.round(a / this.maxInPage);
      }

      //return Math.round(this.$store.getters["cards/getCount"] / this.maxInPage);
    },
  },
  methods: {
    go(card) {
      var notif = { id: card._id, tab: 0, card: card };
      //console.log(notif);
      this.$store.dispatch("notif/api_add_notif", notif);
      const sneak = {
        bool: true,
        text: "Add successfully !",
        type: "success",
        icon: "mdi-check-circle",
      };
      this.$store.dispatch("sneak/sneak", sneak);
      //this.$router.push("/shop/item/" + card._id);
    },
    remove(id) {
      const sneak = {
        bool: true,
        text: "Delete successfully !",
        type: "success",
        icon: "mdi-check-circle",
      };
      this.$store.dispatch("sneak/sneak", sneak);
      this.$store.dispatch("cards/api_remove_card", id);
    },
    next() {
      self.location.assign("#start");
    },
  },
};
</script>
<style scoped>
.radius {
  border-radius: 35px;
}
.card {
  max-height: 150px;
  padding: 10px;
}
.compo {
  margin-right: 50px;
  margin-left: 50px;
  margin-bottom: 25px;
  margin-top: 25px;
}
::-webkit-scrollbar {
  width: 0px;
}
</style>
