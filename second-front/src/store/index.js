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
    tabsNotif: [],
    rss: [],
    fluxRss: [],
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
    // RSS //
    getRss(state) {
      return state.rss;
    },
    getFluxRss(state) {
      return state.fluxRss;
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
        if (state.activeSneak == true) {
          window.setTimeout(function () {
            state.activeSneak = false;
          }, 2000);
        }
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
        //console.log(state.iconSneak);
      } else {
        console.error("iconSneak : need String");
      }
    },
    // NOTIF MUTATION //
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
    // tabNOTIF MUTATION //
    addTabNotif(state, tab) {
      //console.log(typeof tab.id === "number");
      if (typeof tab.id !== "number") {
        for (let obj in tab) {
          //console.log("here");
          state.tabsNotif.push(tab[obj]);
        }
      } else {
        state.tabsNotif.push(tab);
      }
    },
    removeTabNotif(state, tab) {
      state.tabsNotif = state.tabsNotif.filter((i) => i !== tab);
    },
    // RSS //
    addRss(state, rss) {
      state.rss = rss;
      /* for (let f in state.fluxRss) {
        var flux = state.fluxRss[f]._id;
        var set = {
          [flux]: rss.filter((el) => el.flux == state.fluxRss[f]._id),
        };
        var num = { [f]: set };
        state.rss.push(num);
        console.log(set);
      } */

      //console.log(state.rss);
    },
    addFluxRss(state, flux) {
      //console.log(flux.length);
      if (typeof flux.length === "number") {
        for (let obj in flux) {
          //console.log(obj);
          state.fluxRss.push(flux[obj]);
        }
      } else {
        state.fluxRss.push(flux);
      }
    },
    removeFluxRss(state, flux) {
      state.fluxRss = state.fluxRss.filter((i) => i !== flux);
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
      if (sneak === false) {
        state.commit("activeSneak", sneak);
      } else {
        state.commit("activeSneak", sneak.bool);
        state.commit("messageSneak", sneak.text);
        state.commit("typeSneak", sneak.type);
        state.commit("iconSneak", sneak.icon);
      }
    },

    /// API ACTIONS///
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
      this.commit("remove", card);
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
    // NOTIF //
    async api_get_notif(state) {
      await axios
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
    async api_remove_notif(state, notif) {
      //console.log(notif);
      this.commit("removeNotif", notif);
      await axios
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
    async api_add_notif(state, notif) {
      await axios
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
    async api_get_tab_notif(state) {
      await axios
        .get("/api/notif/tab/get")
        .then((result) => state.commit("addTabNotif", result.data))
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
    async api_remove_tab_notif(state, tab) {
      this.commit("removeTabNotif", tab);
      await axios
        .delete("/api/notif/tab/suppr/" + tab._id)
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
    async api_add_tab_notif(state, tab) {
      this.commit("addTabNotif", tab);
      await axios
        .post("/api/notif/tab/post", tab)
        .then(function (response) {
          console.log(response.statusText);
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
    // RSS //
    async api_get_rss(state) {
      await axios
        .get("/api/rss/get")
        .then((result) => state.commit("addRss", result.data))
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
    async api_get_flux(state) {
      await axios
        .get("/api/rss/get/flux")
        .then((result) => state.commit("addFluxRss", result.data))
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
    async api_delete_flux(state, flux) {
      this.commit("removeFluxRss", flux);
      await axios
        .delete("/api/rss/suppr/flux/" + flux._id)
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
    async api_post_flux(state, flux) {
      await axios
        .post("/api/rss/post/flux", flux)
        .then(function (response) {
          console.log(response.statusText);
          state.commit("addFluxRss", flux);
        })
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
    async api_put_flux(state, flux) {
      await axios
        .put("/api/rss/update/flux" + flux._id, flux)
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
  },
  modules: {},
});
