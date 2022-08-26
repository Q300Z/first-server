import { createStore } from "vuex";
import axios from "axios";
export default createStore({
  state: {
    //CARDS STATE//
    cards: [],
    current_card: {},
    //SNEAK STATE//
    activeSneak: false,
    messageSneak:
      "bool: <boolean>, text: <string>, type: <string>, icon: <string>",
    typeSneak: "error",
    iconSneak: "mdi-alert-circle-outline",
    //NOTIF STATE//
    notif: [],
    tabsNotif: [{ id: 0, title: "commande" }],
  },
  getters: {
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
    //SNEAK GETTERS//
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
    //NOTIF GETTERS//
    getNotif(state) {
      return state.notif;
    },
    getTabNotif(state) {
      return state.tabsNotif;
    },
  },
  mutations: {
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
    //SNEAK MUTATION//
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
        //console.log(icon);
        state.iconSneak = icon;
      } else {
        console.error("iconSneak : need String");
      }
    },
    //NOTIF MUTATION//
    addNotif(state, notif) {
      if (!notif.id) {
        for (let obj in notif) {
          state.notif.push(notif[obj]);
        }
      } else {
        state.notif.push(notif);
      }
    },
    removeNotif(state, notif) {
      state.notif = state.notif.filter((i) => i !== notif);
    },
    addTabNotif(state, tab) {
      state.tabsNotif.push(tab);
    },
    removeTabNotif(state, tab) {
      state.tabsNotif = state.tabsNotif.filter((i) => i !== tab);
    },
  },
  actions: {
    /// NOTIF ACTIONS ///
    add_notif(state, notif) {
      state.commit("addNotif", notif);
    },
    remove_notif(state, notif) {
      state.commit("removeNotif", notif);
    },
    add_tab(state, tab) {
      state.commit("addNotif", tab);
    },
    remove_tab(state, tab) {
      state.commit("removeTabNotif", tab);
    },
    /// SNEAK ACTIONS///
    sneak(state, sneak) {
      //console.log(sneak);
      if (sneak.bool === false) {
        state.commit("activeSneak", sneak.bool);
      } else {
        state.commit("activeSneak", sneak.bool);
        state.commit("messageSneak", sneak.text);
        state.commit("typeSneak", sneak.type);
        state.commit("iconSneak", sneak.icon);
      }
    },

    /// API ACTIONS///
    // CARDS //
    api_get_cards(state) {
      //const api_url = "http://localhost:3000";
      axios
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
    api_get_card_one(state, id) {
      axios
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
    api_remove_card(state, card) {
      this.commit("remove", card);
      axios
        .delete("/api/stuff/suppr/" + card._id)
        .then((result) => console.log(result))
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
    api_add_card(state, card) {
      axios
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
    api_update_card(state, card) {
      //console.log(card);
      axios
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
    // NOTIF //
    api_get_notif(state) {
      axios
        .get("/api/notif/get")
        .then((result) => state.commit("addNotif", result.data))
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
    api_remove_notif(state, notif) {
      this.commit("removeNotif", notif);
      axios
        .delete("/api/notif/suppr/" + notif._id)
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
    api_add_notif(state, notif) {
      axios
        .post("/api/notif/post", notif)
        .then(function (response) {
          console.log(response.statusText);
          state.commit("addNotif", notif);
        })
        .catch(function (error) {
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
    // NOTIF: TAB //
    api_get_tab_notif(state) {
      axios
        .get("/api/notif/get")
        .then((result) => state.commit("addNotif", result.data))
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
    api_remove_tab_notif(state, notif) {
      this.commit("removeNotif", notif);
      axios
        .delete("/api/notif/suppr/" + notif.id)
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
    api_add_tab_notif(state, notif) {
      axios
        .post("/api/notif/post", notif)
        .then(function (response) {
          console.log(response.statusText);
          state.commit("addNotif", notif);
        })
        .catch(function (error) {
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
  },
  modules: {},
});
