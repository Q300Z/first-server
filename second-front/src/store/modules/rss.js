import axios from "axios";

// state
const state = {
  rss: [],
  fluxRss: [],
};

// getters
const getters = {
  // RSS //
  getRss(state) {
    return state.rss;
  },
  getFluxRss(state) {
    return state.fluxRss;
  },
};

// mutations
const mutations = {
  // RSS //
  addRss(state, rss) {
    state.rss = rss;
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
};

// actions
const actions = {
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
        state.dispatch("sneak/sneak", sneak);
        console.error(error);
      });
  },
  async api_put_rss(state, rss) {
    //console.log(rss);
    await axios
      .put("/api/rss/put/" + rss._id, rss)
      .then((result) => console.log(result.statusText))
      .catch((error) => {
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
        state.dispatch("sneak/sneak", sneak);
        console.error(error);
      });
  },
  async api_delete_flux(state, flux) {
    state.commit("removeFluxRss", flux);
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
        state.dispatch("sneak/sneak", sneak);
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
        state.dispatch("sneak/sneak", sneak);
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
