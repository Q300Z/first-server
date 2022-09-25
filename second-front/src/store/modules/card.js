import axios from "axios";

// state
const state = {
  //CARDS STATE//
  cards: [],
  current_card: {},
};

// getters
const getters = {
  //CARD GETTERS//
  getCards(state) {
    return state.cards;
  },
  getOne(state) {
    return state.current_card;
  },
  getCount(state) {
    return state.cards.length;
  },
};

// mutations
const mutations = {
  //CARDS MUTATION//
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
};

// actions
const actions = {
  // CARDS //
  async api_get_cards(state) {
    //const api_url = "http://localhost:3000";
    await axios
      .get("/api/stuff/get")
      .then((result) => state.commit("add_cards", result.data))
      .catch((error) => {
        const sneak = {
          bool: true,
          text: "Une erreur s'est produit !",
          type: "error",
          icon: "mdi-alert",
        };
        state.dispatch("sneak", sneak);
        console.error(error);
      });
  },
  async api_get_card_one(state, id) {
    await axios
      .get("/api/stuff/get/" + id)
      .then((result) => state.commit("add_current_card", result.data))
      .catch((error) => {
        const sneak = {
          bool: true,
          text: "Une erreur s'est produit !",
          type: "error",
          icon: "mdi-alert",
        };
        state.dispatch("sneak", sneak);
        console.error(error);
      });
  },
  async api_remove_card(state, card) {
    state.commit("remove", card);
    await axios
      .delete("/api/stuff/suppr/" + card._id)
      .then((result) => console.log(result.statusText))
      .catch((error) => {
        const sneak = {
          bool: true,
          text: "Une erreur s'est produit !",
          type: "error",
          icon: "mdi-alert",
        };
        state.dispatch("sneak", sneak);
        console.error(error);
      });
  },
  async api_add_card(state, card) {
    await axios
      .post("/api/stuff/post", card)
      .then(function (response) {
        console.log(response.statusText);
        state.commit("add_one_card", card);
      })
      .catch(function (error) {
        const sneak = {
          bool: true,
          text: "Une erreur s'est produit !",
          type: "error",
          icon: "mdi-alert",
        };
        state.dispatch("sneak", sneak);
        console.log(error);
      });
  },
  async api_update_card(state, card) {
    //console.log(card);
    await axios
      .put("/api/stuff/update/" + card._id, card)
      .then((result) => console.log(result.statusText))
      .catch((error) => {
        const sneak = {
          bool: true,
          text: "Une erreur s'est produit !",
          type: "error",
          icon: "mdi-alert",
        };
        state.dispatch("sneak", sneak);
        console.error(error);
      });
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
