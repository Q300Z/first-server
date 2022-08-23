import { createStore } from "vuex";
import axios from "axios";
export default createStore({
  state: {
    cards: [],
    current_card: {},
    activeSneak: false,
    messageSneak:
      "bool: <boolean>, text: <string>, type: <string>, icon: <string>",
    typeSneak: "error",
    iconSneak: "mdi-alert-circle-outline",
  },
  getters: {
    getCards(state) {
      return state.cards;
    },
    getOne(state) {
      return state.current_card;
    },
    getCount(state) {
      return state.cards.length;
    },
    activeSneak(state) {
      return state.activeSneak;
    },
    messageSneak(state) {
      return state.messageSneak;
    },
    typeSneak(state) {
      return state.typeSneak;
    },
    iconSneak(state) {
      return state.iconSneak;
    },
  },
  mutations: {
    remove(state, card) {
      state.cards = state.cards.filter((i) => i !== card);
    },
    add_cards(state, cards) {
      state.cards = cards;
    },
    add_current_card(state, card) {
      state.current_card = card;
    },
    add_one_card(state, card) {
      state.cards.push(card);
    },
    activeSneak(state, bool) {
      if (typeof bool === "boolean") {
        state.activeSneak = bool;
      } else {
        console.error("activeSneak : need Boolean");
      }
    },
    messageSneak(state, text) {
      if (typeof text === "string") {
        state.messageSneak = text;
      } else {
        console.error("messageSneak : need String");
      }
    },
    typeSneak(state, type) {
      if (typeof type === "string") {
        state.typeSneak = type;
      } else {
        console.error("typeSneak : need String");
      }
    },
    iconSneak(state, icon) {
      if (typeof icon === "string") {
        state.iconSneak = icon;
      } else {
        console.error("iconSneak : need String");
      }
    },
  },
  actions: {
    /// SNEAK ///
    sneak(state, sneak) {
      //console.log(sneak);
      state.commit("activeSneak", sneak.bool);
      state.commit("messageSneak", sneak.text);
      state.commit("typeSneak", sneak.type);
    },

    /// API ///
    api_get_cards(state) {
      //const api_url = "http://localhost:3000";
      axios
        .get("/api/stuff/get")
        .then((result) => state.commit("add_cards", result.data))
        .catch((error) => {
          console.log(error);
        });
    },
    api_get_card_one(state, id) {
      axios
        .get("/api/stuff/get/" + id)
        .then((result) => state.commit("add_current_card", result.data))
        .catch((error) => {
          console.log(error);
        });
    },
    api_remove_card(state, card) {
      this.commit("remove", card);
      axios.delete("/api/stuff/suppr/" + card._id);
    },
    api_add_card(state, card) {
      axios
        .post("/api/stuff/post", card)
        .then(function (response) {
          console.log(response.statusText);
          state.commit("add_one_card", card);
        })
        .catch(function (error) {
          console.log(error);
        });
    },
  },
  modules: {},
});
