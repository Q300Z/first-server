// state
const state = {
  //SNEAK STATE//
  activeSneak: false,
  messageSneak:
    "bool: <boolean>, text: <string>, type: <string>, icon: <string>",
  typeSneak: "error",
  iconSneak: "mdi-alert-circle-outline",
};

// getters
const getters = {
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
};

// mutations
const mutations = {
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
};

// actions
const actions = {
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
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
