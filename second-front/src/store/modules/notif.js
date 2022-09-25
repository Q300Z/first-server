import axios from "axios";

// state
const state = {
  //NOTIF STATE//
  notif: [],
  tabsNotif: [],
};

// getters
const getters = {
  //NOTIF GETTERS//
  getNotif(state) {
    return state.notif;
  },
  getTabNotif(state) {
    return state.tabsNotif;
  },
};

// mutations
const mutations = {
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
};

// actions
const actions = {
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
    console.log(notif);
    state.commit("removeNotif", notif);
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
    this.commit("notif/removeTabNotif", tab);
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
    state.commit("addTabNotif", tab);
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
        state.dispatch("sneak/sneak", sneak);
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
